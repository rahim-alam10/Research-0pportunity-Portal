import 'dotenv/config';
import connectDB from '../config/connectDB.js';
import Department from '../models/Departments.js';
import User from '../models/User.js';
import ResearchOpportunity from '../models/ResearchOpportunity.js';


async function seed() {
  await connectDB();

  for (const item of opportunities) {
    const department = await Department.findOneAndUpdate(
      { name: item.department.name },
      item.department,
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
    const supervisor = await User.findOneAndUpdate(
      { email: item.supervisor.email },
      { ...item.supervisor, role: 'supervisor', department: department._id },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    await ResearchOpportunity.findOneAndUpdate(
      { title: item.title, department: department._id },
      { ...item, department: department._id, supervisor: supervisor._id },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
  }

  console.log(`Seeded ${opportunities.length} research opportunities`);
  process.exit(0);
}

seed().catch((error) => {
  console.error('Seeding failed:', error.message);
  process.exit(1);
});
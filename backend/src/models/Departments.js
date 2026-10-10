// models/Department.js
import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    code: {
      type: String,
      required: [true, 'Department code is required'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    faculty: { type: String },
  },
  { timestamps: true }
);

const Department = mongoose.model('Department', departmentSchema);
export default Department;
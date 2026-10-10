import ResearchOpportunity from '../models/ResearchOpportunity.js';
import Department from '../models/Departments.js';
import User from '../models/User.js';

function supervisorEmail(name) {
  return `${name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '.')}@example.com`;
}

function departmentCode(name) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const code = words.length > 1
    ? words.map((word) => word[0]).join('')
    : words[0].slice(0, 3);
  return code.toUpperCase();
}

function normalizeDescription(description) {
  if (typeof description !== 'string') return description;

  try {
    const parsed = JSON.parse(description);
    return typeof parsed.description === 'string' ? parsed.description : description;
  } catch {
    return description;
  }
}

async function resolveOpportunityReferences(body) {
  const payload = { ...body };
  payload.description = normalizeDescription(payload.description);

  if (typeof payload.department === 'string') {
    const department = await Department.findOneAndUpdate(
      { name: payload.department.trim() },
      {
        name: payload.department.trim(),
        code: departmentCode(payload.department),
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
    payload.department = department._id;
  }

  if (typeof payload.supervisor === 'string') {
    const name = payload.supervisor.trim();
    const supervisor = await User.findOneAndUpdate(
      { name },
      { name, email: supervisorEmail(name), role: 'supervisor', department: payload.department },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
    payload.supervisor = supervisor._id;
  }

  if (typeof payload.requiredSkills === 'string') {
    payload.requiredSkills = payload.requiredSkills
      .split(',')
      .map((skill) => skill.trim())
      .filter(Boolean);
  }

  return payload;
}

export const getAllOpportunities = async (req, res) => {
  try {
    const { status, department, search } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (department) filter.department = department;
    if (search) filter.$text = { $search: search };

    const opportunities = await ResearchOpportunity.find(filter)
      .populate('department', 'name code')
      .populate('supervisor', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: opportunities.length, data: opportunities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOpportunityById = async (req, res) => {
  try {
    const opportunity = await ResearchOpportunity.findById(req.params.id)
      .populate('department', 'name code')
      .populate('supervisor', 'name email')
      .populate('createdBy', 'name email');

    if (!opportunity) {
      return res.status(404).json({ success: false, message: 'Opportunity not found' });
    }
    res.status(200).json({ success: true, data: opportunity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createOpportunity = async (req, res) => {
  try {
    const opportunity = await ResearchOpportunity.create(await resolveOpportunityReferences(req.body));
    res.status(201).json({ success: true, message: 'Research opportunity created successfully', data: opportunity });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, errors: Object.values(error.errors).map((item) => item.message) });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateOpportunity = async (req, res) => {
  try {
    const opportunity = await ResearchOpportunity.findByIdAndUpdate(
      req.params.id,
      await resolveOpportunityReferences(req.body),
      { new: true, runValidators: true },
    );
    if (!opportunity) {
      return res.status(404).json({ success: false, message: 'Opportunity not found' });
    }
    res.status(200).json({ success: true, message: 'Research opportunity updated successfully', data: opportunity });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, errors: Object.values(error.errors).map((item) => item.message) });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

export const toggleStatus = async (req, res) => {
  try {
    const opportunity = await ResearchOpportunity.findById(req.params.id);
    if (!opportunity) {
      return res.status(404).json({ success: false, message: 'Opportunity not found' });
    }
    opportunity.status = opportunity.status === 'Open' ? 'Closed' : 'Open';
    await opportunity.save();
    res.status(200).json({ success: true, message: `Status changed to ${opportunity.status}`, data: opportunity });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteOpportunity = async (req, res) => {
  try {
    const opportunity = await ResearchOpportunity.findByIdAndDelete(req.params.id);
    if (!opportunity) {
      return res.status(404).json({ success: false, message: 'Opportunity not found' });
    }
    res.status(200).json({ success: true, message: 'Research opportunity deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
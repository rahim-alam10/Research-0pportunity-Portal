import ResearchOpportunity from '../models/ResearchOpportunity.js';

// 1. List all
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

    res.status(200).json({
      success: true,
      count: opportunities.length,
      data: opportunities,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 2. Get single
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
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 3. Create
export const createOpportunity = async (req, res) => {
  try {
    const opportunity = await ResearchOpportunity.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Research opportunity created successfully',
      data: opportunity,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, errors });
    }
    res.status(400).json({ success: false, message: err.message });
  }
};

// 4. Update
export const updateOpportunity = async (req, res) => {
  try {
    const opportunity = await ResearchOpportunity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!opportunity) {
      return res.status(404).json({ success: false, message: 'Opportunity not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Research opportunity updated successfully',
      data: opportunity,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, errors });
    }
    res.status(400).json({ success: false, message: err.message });
  }
};

// 5. Toggle status Open <-> Closed
export const toggleStatus = async (req, res) => {
  try {
    const opportunity = await ResearchOpportunity.findById(req.params.id);
    if (!opportunity) {
      return res.status(404).json({ success: false, message: 'Opportunity not found' });
    }
    opportunity.status = opportunity.status === 'Open' ? 'Closed' : 'Open';
    await opportunity.save();
    res.status(200).json({
      success: true,
      message: `Status changed to ${opportunity.status}`,
      data: opportunity,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// 6. Delete
export const deleteOpportunity = async (req, res) => {
  try {
    const opportunity = await ResearchOpportunity.findByIdAndDelete(req.params.id);
    if (!opportunity) {
      return res.status(404).json({ success: false, message: 'Opportunity not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Research opportunity deleted successfully',
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
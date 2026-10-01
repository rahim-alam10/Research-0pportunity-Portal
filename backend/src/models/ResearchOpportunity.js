import mongoose from 'mongoose';

const researchOpportunitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [5, 'Title must be at least 5 characters'],
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [20, 'Description must be at least 20 characters'],
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: [true, 'Department is required'],
    },
    supervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Supervisor is required'],
    },
    researchArea: { type: String, required: true, trim: true },
    eligibility: { type: String, default: 'Open to all students' },
    requiredSkills: { type: [String], default: [] },
    positionsAvailable: {
      type: Number,
      required: true,
      min: [1, 'At least 1 position'],
      max: [100, 'Cannot exceed 100'],
      default: 1,
    },
    duration: String,
    location: { type: String, default: 'On-campus' },
    stipend: { type: String, default: 'Unpaid' },
    deadline: {
      type: Date,
      validate: {
        validator(value) {
          return !value || value > new Date();
        },
        message: 'Deadline must be a future date',
      },
    },
    status: {
      type: String,
      enum: {
        values: ['Open', 'Closed'],
        message: '{VALUE} is not a valid status',
      },
      default: 'Open',
    },
    tags: { type: [String], default: [] },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ---- Virtuals ----
researchOpportunitySchema.virtual('isExpired').get(function () {
  return this.deadline ? this.deadline < new Date() : false;
});

researchOpportunitySchema.virtual('isAcceptingApplications').get(function () {
  return (
    this.status === 'Open' &&
    (!this.deadline || this.deadline > new Date()) &&
    this.positionsAvailable > 0
  );
});

// ---- Indexes ----
researchOpportunitySchema.index({ status: 1, department: 1 });
researchOpportunitySchema.index({ title: 'text', description: 'text' });

// ---- Instance Methods ----
researchOpportunitySchema.methods.close = function () {
  this.status = 'Closed';
  return this.save();
};

researchOpportunitySchema.methods.reopen = function () {
  this.status = 'Open';
  return this.save();
};

// ---- Static Methods ----
researchOpportunitySchema.statics.findOpen = function () {
  return this.find({ status: 'Open' }).sort({ createdAt: -1 });
};

// ---- Hook (uses mongoose.model to avoid circular imports) ----
researchOpportunitySchema.pre('save', async function (next) {
  if (this.isModified('title') || this.isNew) {
    const Model = mongoose.model('ResearchOpportunity');
    const existing = await Model.findOne({
      title: this.title,
      department: this.department,
      _id: { $ne: this._id },
    });
    if (existing) {
      return next(new Error('Opportunity with this title already exists in this department'));
    }
  }
  next();
});

const ResearchOpportunity = mongoose.model(
  'ResearchOpportunity',
  researchOpportunitySchema
);

export default ResearchOpportunity;
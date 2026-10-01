import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    opportunity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ResearchOpportunity',
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected'],
      default: 'Pending',
    },
    coverLetter: String,
  },
  { timestamps: true }
);

applicationSchema.index({ opportunity: 1, student: 1 }, { unique: true });

const Application = mongoose.model('Application', applicationSchema);
export default Application;
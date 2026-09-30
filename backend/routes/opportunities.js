import express from 'express';
import {
  getAllOpportunities,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  toggleStatus,
  deleteOpportunity,
} from '../controllers/opportunityController.js';

const router = express.Router();

router.get('/', getAllOpportunities);           // 1. List all
router.get('/:id', getOpportunityById);         // 2. Details
router.post('/', createOpportunity);            // 3. Create
router.put('/:id', updateOpportunity);          // 4. Update
router.patch('/:id/status', toggleStatus);      // 5. Open <-> Closed
router.delete('/:id', deleteOpportunity);       // 6. Delete

export default router;
import express from 'express';
import {
  getTrainingPrograms,
  getTrainingBySlug,
  createTraining,
  updateTraining,
  deleteTraining,
} from '../controllers/trainingController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getTrainingPrograms);
router.get('/:slug', getTrainingBySlug);
router.post('/', protect, createTraining);
router.put('/:id', protect, updateTraining);
router.delete('/:id', protect, deleteTraining);

export default router;

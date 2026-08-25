import express from 'express';
import {
  getSectionsByPage,
  getAllSections,
  getArchivedSections,
  createSection,
  updateSection,
  deleteSection,
  restoreSection,
  permanentDeleteSection,
  restoreDefaults,
} from '../controllers/sectionController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getSectionsByPage);
router.get('/public', getSectionsByPage);
router.get('/all', protect, getAllSections);
router.get('/trash', protect, getArchivedSections);
router.post('/', protect, createSection);
router.post('/restore-defaults', protect, restoreDefaults);
router.put('/:id', protect, updateSection);
router.put('/restore/:id', protect, restoreSection);
router.delete('/:id', protect, deleteSection);
router.delete('/permanent/:id', protect, permanentDeleteSection);

export default router;

import express from 'express';
import {
  submitContactMessage,
  getContactMessages,
  updateMessageStatus,
  deleteContactMessage,
} from '../controllers/contactController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', submitContactMessage);
router.get('/', protect, getContactMessages);
router.put('/:id', protect, updateMessageStatus);
router.delete('/:id', protect, deleteContactMessage);

export default router;

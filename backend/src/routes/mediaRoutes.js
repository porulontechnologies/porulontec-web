import express from 'express';
import { uploadMedia, getMedia, deleteMedia } from '../controllers/mediaController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getMedia);
router.post('/upload', protect, upload.single('image'), uploadMedia);
router.delete('/:id', protect, deleteMedia);

export default router;

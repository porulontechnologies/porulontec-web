import express from 'express';
import {
  getBlogs,
  getBlogBySlug,
  getAllBlogsAdmin,
  createBlog,
  updateBlog,
  deleteBlog,
  restoreDefaultBlogsController,
} from '../controllers/blogController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getBlogs);
router.get('/article/:slug', getBlogBySlug);

// Admin routes
router.get('/admin/all', protect, getAllBlogsAdmin);
router.post('/admin/restore-defaults', protect, restoreDefaultBlogsController);
router.post('/', protect, createBlog);
router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlog);

export default router;

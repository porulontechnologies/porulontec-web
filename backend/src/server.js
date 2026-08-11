import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB, sequelize } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import settingRoutes from './routes/settingRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import trainingRoutes from './routes/trainingRoutes.js';
import sectionRoutes from './routes/sectionRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';
import blogRoutes from './routes/blogRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads, images, and videos
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
const frontendPublicDir = path.join(process.cwd(), '../frontend/public');
app.use('/images', express.static(path.join(frontendPublicDir, 'images')));
app.use('/videos', express.static(path.join(frontendPublicDir, 'videos')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'PorulonStack API',
    database: 'PostgreSQL (porulonstack)',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/training', trainingRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/blogs', blogRoutes);

// Fallback Route
app.use((req, res) => {
  res.status(404).json({ message: 'API Endpoint Not Found' });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  const isConnected = await connectDB();
  if (isConnected) {
    try {
      await sequelize.sync({ alter: true });
      console.log(`[PostgreSQL] Sequelize Models Synced Successfully`);
    } catch (err) {
      console.warn(`[PostgreSQL Sync Notice]: ${err.message}`);
    }
  }
  
  app.listen(PORT, () => {
    console.log(`=================================================`);
    console.log(`🚀 PorulonStack Server running on port ${PORT}`);
    console.log(`🌐 API Endpoint: http://localhost:${PORT}/api`);
    console.log(`=================================================`);
  });
};

startServer();

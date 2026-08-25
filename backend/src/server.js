import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
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

// Global error handlers to prevent unhandled node process crashes
process.on('uncaughtException', (err) => {
  console.error('[Porulon Backend Uncaught Exception]:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('[Porulon Backend Unhandled Rejection at]:', promise, 'reason:', reason);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS Configuration with Allowed Origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000',
  'https://porulon-frontend.onrender.com',
  'https://porulon-backend.onrender.com',
  'https://www.porulontech.com',
  'https://porulontech.com',
];

if (process.env.ALLOWED_ORIGINS) {
  const customOrigins = process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim());
  allowedOrigins.push(...customOrigins);
}
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL.trim());
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. Mobile apps, Postman, cURL) or listed origins
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        return callback(null, true);
      }
      // Return true to allow or log notice
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads, images, and videos
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
const frontendPublicDir = path.join(process.cwd(), '../frontend/public');
if (fs.existsSync(frontendPublicDir)) {
  app.use('/images', express.static(path.join(frontendPublicDir, 'images')));
  app.use('/videos', express.static(path.join(frontendPublicDir, 'videos')));
}

// Root SEO Files Fallbacks (robots.txt & sitemap.xml)
app.get('/robots.txt', (req, res) => {
  const robotsPath = path.join(process.cwd(), '../robots.txt');
  const frontendRobots = path.join(process.cwd(), '../frontend/public/robots.txt');
  if (fs.existsSync(robotsPath)) return res.sendFile(robotsPath);
  if (fs.existsSync(frontendRobots)) return res.sendFile(frontendRobots);
  return res.type('text/plain').send('User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: https://porulontech.com/sitemap.xml');
});

app.get('/sitemap.xml', (req, res) => {
  const sitemapPath = path.join(process.cwd(), '../sitemap.xml');
  const frontendSitemap = path.join(process.cwd(), '../frontend/public/sitemap.xml');
  if (fs.existsSync(sitemapPath)) return res.sendFile(sitemapPath);
  if (fs.existsSync(frontendSitemap)) return res.sendFile(frontendSitemap);
  return res.status(404).send('Sitemap not found');
});

// Root API Gateway status
app.get(['/api', '/api/'], (req, res) => {
  res.json({
    status: 'active',
    app: 'PorulonStack API Gateway',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

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

// Fallback 404 Route
app.use((req, res) => {
  res.status(404).json({ message: 'API Endpoint Not Found' });
});

// Global Express Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('[Porulon Express Error]:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

const PORT = parseInt(process.env.PORT || '5000', 10);
const HOST = '0.0.0.0';

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
  
  const server = app.listen(PORT, HOST, () => {
    console.log(`=================================================`);
    console.log(`🚀 PorulonStack Server running on http://${HOST}:${PORT}`);
    console.log(`🌐 API Endpoint: http://${HOST}:${PORT}/api`);
    console.log(`=================================================`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`❌ [Port Conflict]: Port ${PORT} is already in use by another process.`);
      console.error(`   To free port ${PORT}, terminate the process using it or change PORT in .env.`);
    } else {
      console.error(`❌ [Server Listen Error]:`, err.message);
    }
  });
};

startServer();

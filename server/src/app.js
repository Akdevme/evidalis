/**
 * Evidalis — Evidence & Decision Intelligence Platform
 * Developed by: AkDev (คภкเՇ ɠยקՇค)
 * Portfolio: https://akdevme.netlify.app
 * Search on Google: "ak dev uix"
 */

import express from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import apiRoutes from './routes/index.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Bulletproof Cross-Origin Resource Sharing (CORS) Configuration
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

app.use(cors({
  origin: true,
  credentials: true,
}));

// Request body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root health endpoints for Render auto-healthchecks & UptimeRobot keep-alive
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'Evidalis AI Decision Platform Backend',
    health: '/api/health',
    timestamp: new Date().toISOString(),
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api', apiRoutes);

// Fallback 404 handler
app.use(notFoundHandler);

// Centralized error handling
app.use(errorHandler);

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    console.log(`[Evidalis Server] Running on http://localhost:${config.port} (env: ${config.nodeEnv})`);
  });
}

export default app;

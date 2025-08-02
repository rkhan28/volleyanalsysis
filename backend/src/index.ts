// backend/src/index.ts

import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';            // ← import cors
import { createServer } from 'http';

import uploadVideoRouter from './routes/uploadVideo';
import matchRouter       from './routes/matches';
import playersRouter     from './routes/players';
import metricsRouter     from './routes/metrics';
import { initRealtime }  from './routes/websocket';

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3001;

// ─── CORS ──────────────────────────────────────────────
// Allow your front-end dev server to call this API:
app.use(cors({
  origin: 'http://localhost:5173',   // adjust if your Vite port differs
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true,
}));

// ─── JSON parsing ───────────────────────────────────────
app.use(json());

// ─── REST endpoints ─────────────────────────────────────
app.use('/api', uploadVideoRouter);
app.use('/api', matchRouter);
app.use('/api', playersRouter);
app.use('/api', metricsRouter);

// ─── Health‐check ───────────────────────────────────────
app.get('/api/health', (_req, res) => res.status(200).json({ status: 'ok' }));

// ─── WebSocket + Realtime ───────────────────────────────
initRealtime(httpServer);

// ─── Start server ───────────────────────────────────────
httpServer.listen(PORT, () => {
  console.log(`Backend (HTTP + WebSocket) running on http://localhost:${PORT}`);
});

// backend/src/routes/players.ts

import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabaseClient';

const router = Router();

/**
 * GET /api/players
 * Returns all players.
 */
router.get('/players', async (_req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('players')
    .select('id, full_name, position');
  if (error) {
    console.error('[GET /api/players] Error:', error);
    return res.status(500).json({ error: error.message });
  }
  res.status(200).json(data);
});

/**
 * POST /api/players
 * Body JSON:
 *   { "full_name": "Jane Doe", "position": "Outside" }
 * Returns: { "id": "<new-player-uuid>" }
 */
router.post('/players', async (req: Request, res: Response) => {
  const { full_name, position } = req.body;
  if (!full_name || !position) {
    return res
      .status(400)
      .json({ error: 'Missing required fields: full_name, position' });
  }

  const { data, error } = await supabase
    .from('players')
    .insert({ full_name, position })
    .select('id')
    .single();

  if (error) {
    console.error('[POST /api/players] Error:', error);
    return res.status(500).json({ error: error.message });
  }
  res.status(201).json({ id: data.id });
});

export default router;

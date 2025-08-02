// backend/src/routes/matches.ts

import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabaseClient';

const router = Router();

/**
 * GET /api/matches
 * Fetch all matches.
 */
router.get('/matches', async (_req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('matches')
    .select('id, opponent, match_date, location')
    .order('match_date', { ascending: false });

  if (error) {
    console.error('[GET /api/matches] Error:', error);
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data);
});

/**
 * POST /api/matches
 * Create a new match.
 * Body JSON:
 *   {
 *     "opponent": "Wildcats",
 *     "match_date": "2025-07-30",
 *     "location": "Gym A",
 *     "created_by": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 *   }
 *
 * Returns:
 *   { "id": "<new-match-uuid>" }
 */
router.post('/matches', async (req: Request, res: Response) => {
  const { opponent, match_date, location, created_by } = req.body;

  if (!opponent || !match_date || !created_by) {
    return res
      .status(400)
      .json({ error: 'Missing required fields: opponent, match_date, created_by' });
  }

  const { data, error } = await supabase
    .from('matches')
    .insert({ opponent, match_date, location, created_by })
    .select('id')
    .single();

  if (error) {
    console.error('[POST /api/matches] Error:', error);
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json({ id: data.id });
});

export default router;


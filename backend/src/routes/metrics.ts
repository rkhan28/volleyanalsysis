// backend/src/routes/metrics.ts

import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabaseClient';

const router = Router();

/**
 * POST /api/metrics
 * Body JSON:
 *   {
 *     "matchId": "<match-uuid>",
 *     "playerId": "<player-uuid>",
 *     "serveAccuracy": 0.85,
 *     "spikeSuccess": 0.78,
 *     "blockEff": 0.65
 *   }
 */
router.post('/metrics', async (req: Request, res: Response) => {
  const { matchId, playerId, serveAccuracy, spikeSuccess, blockEff } = req.body;

  // Basic validation
  if (
    !matchId || !playerId ||
    serveAccuracy == null ||
    spikeSuccess == null ||
    blockEff == null
  ) {
    return res.status(400).json({
      error: 'Required fields: matchId, playerId, serveAccuracy, spikeSuccess, blockEff'
    });
  }

  // Insert into Supabase
  const { data, error } = await supabase
    .from('metrics')
    .insert({
      match_id: matchId,
      player_id: playerId,
      serve_accuracy: serveAccuracy,
      spike_success: spikeSuccess,
      block_eff: blockEff
    })
    .select('*')
    .single();

  if (error) {
    console.error('[POST /api/metrics] Error:', error);
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json(data);
});

/**
 * GET /api/metrics/:matchId
 * Returns all metrics for a given match.
 */
router.get('/metrics/:matchId', async (req: Request, res: Response) => {
  const { matchId } = req.params;

  const { data, error } = await supabase
    .from('metrics')
    .select('id, player_id, serve_accuracy, spike_success, block_eff, updated_at')
    .eq('match_id', matchId);

  if (error) {
    console.error('[GET /api/metrics] Error:', error);
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data);
});

export default router;


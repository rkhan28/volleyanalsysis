// backend/src/routes/uploadVideo.ts

import { Router, Request, Response } from 'express';
import formidable, { File as FormidableFile } from 'formidable';
import fs from 'fs';
import { supabase } from '../lib/supabaseClient';

const router = Router();

/**
 * POST /api/uploadVideo
 * multipart/form-data:
 *   - fields.matchId
 *   - files.file
 */
router.post('/uploadVideo', (req: Request, res: Response) => {
  // Use the function-style API
  const form = formidable({ keepExtensions: true, multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parse error:', err);
      return res.status(400).json({ error: 'Invalid form data' });
    }

    // ── 1. Normalize & validate matchId ─────────────────────────────
    const raw = fields.matchId;
    const matchId = Array.isArray(raw) ? raw[0] : raw;
    if (!matchId || typeof matchId !== 'string') {
      return res.status(400).json({ error: 'matchId is required' });
    }

    // ── 2. Normalize & validate file ───────────────────────────────
    let file = files.file as FormidableFile | FormidableFile[] | undefined;
    if (Array.isArray(file)) file = file[0];
    if (!file) {
      return res.status(400).json({ error: 'file is required' });
    }

    // ── 3. Build a storage key ─────────────────────────────────────
    const tempPath     = file.filepath;
    const originalName = file.originalFilename ?? 'video.mp4';
    const ext          = originalName.split('.').pop() ?? 'mp4';
    const key          = `${matchId}/${Date.now()}.${ext}`;

    try {
      // ── 4. Read the entire file into a Buffer ────────────────────
      const buffer = await fs.promises.readFile(tempPath);

      // ── 5. Upload the Buffer (no streaming) ────────────────────
      const { error: uploadError } = await supabase.storage
        .from('videos')
        .upload(key, buffer, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.mimetype ?? undefined,
        });

      if (uploadError) {
        console.error('Supabase upload error:', uploadError);
        return res.status(500).json({ error: uploadError.message });
      }

      // ── 6. Return success ────────────────────────────────────────
      return res.status(200).json({ bucket: 'videos', key });
    } catch (e) {
      console.error('Upload failed:', e);
      return res.status(500).json({ error: 'Upload failed' });
    }
  });
});

export default router;


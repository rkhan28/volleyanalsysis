import { Server as IOServer } from 'socket.io';
import { createServer } from 'http';
import { supabase } from '../lib/supabaseClient'; // ← fixed path

/**
 * Attach Socket.io and Supabase Realtime to your HTTP server
 */
export function initRealtime(httpServer: ReturnType<typeof createServer>) {
  const io = new IOServer(httpServer, {
    path: '/socket',
    cors: { origin: '*' },
  });

  // Listen for INSERTs on the public.metrics table
  supabase
    .channel('public:metrics')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'metrics' },
      (payload: any) => {               // ← explicit any
        io.emit('metric_inserted', payload.new);
      }
    )
    .subscribe((status: any) => {       // ← explicit any
      console.log('Supabase Realtime status:', status);
    });

  io.on('connection', socket => {
    console.log('Socket connected:', socket.id);
    socket.on('disconnect', () => console.log('Socket disconnected:', socket.id));
  });
}



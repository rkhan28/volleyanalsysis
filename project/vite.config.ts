import { defineConfig } from 'vite';
import react           from '@vitejs/plugin-react';
import dotenv          from 'dotenv';

// Load `.env` into `process.env`
dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy auth calls to Supabase Auth
      '/auth': {
        target: process.env.VITE_SUPABASE_URL,  // use process.env here
        changeOrigin: true,
        rewrite: path => path.replace(/^\/auth/, '/auth/v1'),
      },
      // Proxy your own backend REST API
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      // Proxy socket.io
      '/socket': {
        target: 'http://localhost:3001',
        ws: true,
      },
    },
  },
});


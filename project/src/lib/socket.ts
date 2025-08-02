import { io } from 'socket.io-client';

// Point this at wherever your backend is running
const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

export const socket = io(BACKEND, {
  path: '/socket',
});



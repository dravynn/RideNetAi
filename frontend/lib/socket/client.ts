import { io, Socket } from 'socket.io-client';
import { supabase } from '../supabase/client';

let socket: Socket | null = null;

export async function getSocket(): Promise<Socket> {
  if (socket?.connected) {
    return socket;
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error('Not authenticated');
  }

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  socket = io(API_URL, {
    auth: {
      token: session.access_token,
    },
    transports: ['websocket'],
  });

  return socket;
}

export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

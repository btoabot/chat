import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { v4 as uuid } from 'uuid';

type User = { id: string; name: string; ws: any };
type Message = {
  id: string;
  roomId: string;
  userId: string;
  text: string;
  ts: number;
  name?: string;
  avatar?: string;
};
type Room = { id: string; name: string; messages: Message[]; users: string[] };

const users = new Map<string, User>();
const rooms = new Map<string, Room>();

const roomNames = [
  'Team updates',
  'Daily standup',
  'Product ideas',
  'Bug reports',
  'Design review',
  'Release notes',
];

roomNames.forEach((name, index) => {
  const roomId = `room-${index + 1}`;
  const room: Room = {
    id: roomId,
    name,
    messages: [],
    users: [],
  };
  rooms.set(roomId, room);
});

const server = createServer();
const wss = new WebSocketServer({ server });

function broadcast(json: any) {
  const s = JSON.stringify(json);
  for (const [, u] of users) {
    try {
      u.ws.send(s);
    } catch (e) {}
  }
}

wss.on('connection', (ws) => {
  let userId: string | null = null;
  let user: User | null = null;

  console.log('🟢 New WS connection — waiting for INIT...');

  ws.on('message', (raw) => {
    let msg;
    try {
      msg = JSON.parse(String(raw));
    } catch {
      return;
    }

    switch (msg.type) {
      case 'INIT': {
        const incomingId = msg.data?.userId ?? undefined;
        const incomingName = msg.data?.name?.trim() || null;

        if (incomingId && users.has(incomingId)) {
          const newUserId = incomingId ?? uuid();
          userId = newUserId;
          user = { ...users.get(newUserId)!, ws } as User;
          users.set(newUserId, user);
          console.log(`♻️ Reconnected existing user ${userId} (${user?.name})`);
        } else {
          userId = (incomingId || uuid()) as string;
          const name = incomingName || `user-${userId.slice(0, 4)}`;
          user = {
            id: userId,
            avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${userId}`,
            name,
            ws,
          } as User;
          users.set(userId, user);
          console.log(`🧍 New user connected: ${name} (${userId})`);
        }

        const payload = {
          type: 'INITIAL_STATE',
          data: {
            userId,
            rooms: Array.from(rooms.values()).map((r) => ({
              id: r.id,
              name: r.name,
              messages: r.messages,
            })),
          },
        };
        ws.send(JSON.stringify(payload));

        broadcast({
          type: 'USER_LIST',
          data: Array.from(users.values()).map((u) => ({
            id: u.id,
            name: u.name,
            avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${u.id}`,
          })),
        });
        break;
      }

      case 'SET_NAME': {
        if (!userId) break;
        const u = users.get(userId);
        if (u) {
          const oldName = u.name;
          const newName = msg.data.name.trim();
          u.name = newName;

          for (const [, room] of rooms) {
            if (room.users.includes(userId)) {
              const systemMsg: Message = {
                id: uuid(),
                roomId: room.id,
                userId: 'system',
                text: `🟢 ${oldName} змінив ім’я на ${newName}`,
                ts: Date.now(),
                name: 'System',
              };
              room.messages.push(systemMsg);
              broadcast({ type: 'NEW_MESSAGE', data: systemMsg });
            }
          }

          broadcast({
            type: 'USER_LIST',
            data: Array.from(users.values()).map((u) => ({
              id: u.id,
              name: u.name,
              avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${u.id}`,
            })),
          });

          console.log(`✏️ ${oldName} → ${newName}`);
        }
        break;
      }

      case 'CREATE_MESSAGE': {
        if (!userId) break;
        const room = rooms.get(msg.data.roomId);
        const u = users.get(userId);
        if (room && u) {
          const m: Message = {
            id: uuid(),
            roomId: room.id,
            userId,
            text: msg.data.text,
            ts: Date.now(),
            name: u.name,
            avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${u.id}`,
          };
          room.messages.push(m);
          broadcast({ type: 'NEW_MESSAGE', data: m });
        }
        break;
      }

      case 'JOIN_ROOM': {
        if (!userId) break;
        const room = rooms.get(msg.data.roomId);
        if (room && !room.users.includes(userId)) {
          room.users.push(userId);
          ws.send(
            JSON.stringify({
              type: 'ROOM_JOINED',
              data: { roomId: room.id, messages: room.messages },
            }),
          );
        }
        break;
      }
    }
  });

  ws.on('close', () => {
    if (userId) {
      users.delete(userId);
      broadcast({
        type: 'USER_LIST',
        data: Array.from(users.values()).map((u) => ({
          id: u.id,
          name: u.name,
        })),
      });
      console.log(`🔴 disconnect ${userId}`);
    }
  });
});

server.listen(4000, () => console.log('ws server 4000'));

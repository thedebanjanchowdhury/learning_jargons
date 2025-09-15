import WebSocket, { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";

interface Client extends WebSocket {
  roomId?: string;
}

interface Message {
  type: string;
  roomId?: string;
  text?: string;
}

const rooms: Map<string, Set<Client>> = new Map();
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket: Client) => {
  socket.on("message", (rawMsg: string) => {
    let data: Message;
    try {
      data = JSON.parse(rawMsg);
    } catch (error) {
      console.log("Invalid JSON", rawMsg);
      return;
    }

    if (data.type === "createRoom") {
      const roomId = uuidv4();
      rooms.set(roomId, new Set([socket]));
      socket.roomId = roomId;
      socket.send(JSON.stringify({ type: "roomCreated", roomId }));
    }

    if (data.type === "joinRoom" && data.roomId) {
      const roomId = data.roomId;
      if (rooms.has(roomId)) {
        rooms.get(roomId)!.add(socket);
        socket.roomId = roomId;
        socket.send(JSON.stringify({ type: "roomJoined", roomId }));
      } else {
        socket.send(
          JSON.stringify({ type: "error", message: "Room not found" })
        );
      }
    }

    if (data.type === "message" && data.roomId && data.text) {
      const { roomId, text } = data;
      if (rooms.has(roomId)) {
        for (const client of rooms.get(roomId)!) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "message", text }));
          }
        }
      }
    }

    socket.on("close", () => {
      if (socket.roomId && rooms.has(socket.roomId)) {
        const clients = rooms.get(socket.roomId);
        clients?.delete(socket);
        if (clients?.size === 0) {
          rooms.delete(socket.roomId);
        }
      }
    });
  });
});

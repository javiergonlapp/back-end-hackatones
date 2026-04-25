import { Server as SocketIOServer, Socket } from "socket.io";
import { httpServer } from "./app.ts";
import type {
  ServerToClientEvents,
  ClientToServerEvents,
  SocketData,
  ChatMessage,
} from "./interface/ISocket.ts";

const connectedUsers = new Map<string, string>();

export const io = new SocketIOServer<
  ClientToServerEvents,
  ServerToClientEvents,
  {},
  SocketData
>(httpServer, {
  cors: { origin: process.env.CORS_ORIGIN || "*" },
});

io.on(
  "connection",
  (
    socket: Socket<ClientToServerEvents, ServerToClientEvents, {}, SocketData>,
  ) => {
    console.log("Lista de usuarios conectados: ", connectedUsers);
    socket.on("setUsername", (username: string) => {
      socket.data.username = username;
      connectedUsers.set(socket.id, username);
      socket.broadcast.emit("userJoined", username);
    });

    socket.on("sendMessage", (text) => {
      const message: ChatMessage = {
        id: `${socket.id}-${Date.now()}`,
        user: socket.data.username ?? "anonimo",
        text,
        timestamp: Date.now(),
      };

      io.emit("message", message);
    });

    socket.on("disconnect", () => {
      const username = connectedUsers.get(socket.id) ?? socket.id;
      connectedUsers.delete(username);

      io.emit("userLeft", username);
    });
  },
);

// infrastructure/external-services/SocketService.ts
import { Server } from "socket.io";
import { Server as HTTPServer } from "http";
import IMessage from "../../core/entities/IMessage";

export const initializeSocket = (httpServer: HTTPServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:4000"],
      methods: ["GET", "POST"],
      credentials: true,
      allowedHeaders: ["my-custom-header"],
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("joinRoom", (chatId: string) => {
      socket.join(chatId);
      console.log(`Client joined room: ${chatId}`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  return io;
};

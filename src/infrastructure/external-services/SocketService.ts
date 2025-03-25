import { Server } from "socket.io";
import { Server as HTTPServer } from "http";
import { comments } from "../../shared/constants/comments";
import dotenv from "dotenv";
dotenv.config();

export const initializeSocket = (httpServer: HTTPServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: [
        process.env.BASE_URL_FE as string,
        process.env.BASE_URL_BE as string,
      ],
      methods: ["GET", "POST"],
      credentials: true,
      allowedHeaders: ["my-custom-header"],
    },
  });

  io.on(comments.IO_CONNECTION, (socket) => {
    console.log(comments.IO_CLIENT_CONNECT);

    socket.on(comments.IO_JOINROOM, (chatId: string) => {
      socket.join(chatId);
    });

    // socket.on("joinUserRoom", (userId: string) => {
    //   console.log(`Socket ${socket.id} joined user room ${userId}`);
    //   socket.join(userId);
    // });

    socket.on(comments.IO_DISCONNECT, () => {
      console.log(comments.IO_CLIENT_DISCONNECT);
    });
  });

  return io;
};

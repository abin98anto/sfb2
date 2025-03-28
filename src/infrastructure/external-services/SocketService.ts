import { Server } from "socket.io";
import { Server as HTTPServer } from "http";
import { comments } from "../../shared/constants/comments";
import dotenv from "dotenv";
import IMessage from "../../core/entities/IMessage";
dotenv.config();

interface messageReadData {
  messageIds: string[];
  chatId: string;
  receiverId: string;
  senderId: string;
}

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

    socket.on("send-message", (data: IMessage) => {
      io.to(data.senderId)
        .to(data.receiverId)
        .emit(comments.IO_RECIEVE_MSG, data);
    });

    socket.on("msg-read", (data: messageReadData) => {
      // console.log("message read event triggered", data);
      socket.to(data.senderId).emit("msg-read", data);
    });

    socket.on(comments.IO_DISCONNECT, () => {
      console.log(comments.IO_CLIENT_DISCONNECT);
    });
  });

  return io;
};

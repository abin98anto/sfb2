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

    socket.on("send_message", (message: IMessage) => {
      socket.broadcast.emit("receive_message", message);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });

    socket.on("video-call-invitation", (data) => {
      socket.to(data.to).emit("video-call-invitation", {
        roomID: data.roomID,
        from: data.from,
        fromName: data.fromName,
      });
    });

    socket.on("video-call-rejected", (data) => {
      socket.to(data.to).emit("video-call-rejected");
    });
  });

  return io;
};

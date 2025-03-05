import { Server } from "socket.io";
import { Server as HTTPServer } from "http";

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
    });

    // Handle tutor-initiated video call invitation
    // socket.on("videoCallInvite", (data) => {
    //   const { chatId, senderId, receiverId, roomId } = data;
    //   console.log(
    //     `Video call invitation from ${senderId} to ${receiverId} for room ${roomId}`
    //   );
    //   io.to(receiverId).emit("videoCallInvitation", {
    //     chatId,
    //     senderId,
    //     receiverId,
    //     roomId,
    //     timestamp: new Date().toISOString(),
    //   });
    // });

    // socket.on("acceptVideoCall", ({ roomId, userId }) => {
    //   io.to(roomId).emit("callAccepted", { userId });
    // });

    // socket.on("rejectVideoCall", ({ roomId, userId }) => {
    //   io.to(roomId).emit("callRejected", { userId });
    // });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  return io;
};

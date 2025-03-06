import { Request, Response } from "express";
import CreateChatUseCase from "../../../core/use-cases/chat-usecases/CreateChatUseCase";
import SendMessageUseCase from "../../../core/use-cases/chat-usecases/SendMessageUseCase";
import GetAllChatsUseCase from "../../../core/use-cases/chat-usecases/GetAllChatsUseCase";
import IChat from "../../../core/entities/IChat";
import IMessage from "../../../core/entities/IMessage";
import { comments } from "../../../shared/constants/comments";
import FindChatUseCase from "../../../core/use-cases/chat-usecases/FindChatUseCase";
import GetByUserIdAndCourseId from "../../../core/use-cases/chat-usecases/GetByUserIdAndCourseId";
import MarkAsReadUseCase from "../../../core/use-cases/chat-usecases/MarkAsReadUseCase";
import GetStudentList from "../../../core/use-cases/chat-usecases/GetStudentListUseCase";

class ChatController {
  constructor(
    private createChatUseCase: CreateChatUseCase,
    private sendMessageUseCase: SendMessageUseCase,
    private GetAllChatsUseCase: GetAllChatsUseCase,
    private findChatUseCase: FindChatUseCase,
    private getByUserIdAndCourseIdUseCase: GetByUserIdAndCourseId,
    private markAsReadUseCase: MarkAsReadUseCase,
    private getStudentList: GetStudentList
  ) {}

  createChat = async (req: Request, res: Response) => {
    const chat: IChat = req.body;
    try {
      const newChat = await this.createChatUseCase.execute(chat);
      res.status(201).json(newChat);
    } catch (error) {
      res.status(500).json({ message: "error creating chat" });
    }
  };

  sendMessage = async (req: Request, res: Response) => {
    const message: IMessage = req.body;
    try {
      await this.sendMessageUseCase.execute(message);
      const io = req.app.get("io");
      io.to(message.chatId).emit("receive_message", message);

      // console.log("the message", message);
      io.emit("messageNotification", {
        chatId: message.chatId,
        sender: req.user.name,
        senderId: req.user._id,
        receiverId: message.receiverId,
        content: message.content,
        timestamp: message.timestamp,
      });
      res.status(200).json({ message: comments.MSG_SENT_SUCC });
    } catch (error) {
      res.status(500).json({ message: comments.MSG_SENT_FAIL });
    }
  };

  getMessages = async (req: Request, res: Response) => {
    try {
      const chatId = req.params.chatId;
      const messages = await this.findChatUseCase.execute(chatId);
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: "error fetching messages in the chat" });
    }
  };

  getByUserIdAndCourseId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { courseId, userId } = req.body;
      const result = await this.getByUserIdAndCourseIdUseCase.execute(
        courseId,
        userId
      );
      res.status(200).json(result);
    } catch (error) {
      console.log("error fetching messages for the chat", error);
      res.status(500).json({ message: "error fetching messages for the chat" });
    }
  };

  getChatList = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.query;
      const result = await this.GetAllChatsUseCase.execute(userId as string);
      res.status(200).json(result);
    } catch (error) {
      console.log("error fetching chat list", error);
      res.status(500).json({ message: "error fetching chat list" });
    }
  };

  markAsRead = async (req: Request, res: Response): Promise<void> => {
    try {
      const { messageId } = req.body;
      const result = await this.markAsReadUseCase.execute(messageId);
      res.status(200).json(result);
    } catch (error) {
      console.log("error in mark as read", error);
      res.status(500).json({ message: "error in mark as read" });
    }
  };

  videoCallInvitation = async (req: Request, res: Response): Promise<void> => {
    try {
      // console.log("sending invite", req.body);
      const { roomID, userId, studentId } = req.body;
      const io = req.app.get("io");
      io.emit("callInvite", { roomID, userId, studentId });
      res.status(200).json({ message: "call invite sent." });
    } catch (error) {
      console.log("error sending video call invite", error);
      res.status(500).json({ message: "error sending video call invite" });
    }
  };

  studentList = async (req: Request, res: Response): Promise<void> => {
    try {
      // console.log("the id ", req.user);
      const tutorId = req.user._id?.toString();
      // console.log("the turo", tutorId);
      const result = await this.getStudentList.execute(tutorId as string);
      // console.log("contorller data", result);
      res.status(200).json(result);
    } catch (error) {
      console.log("error fetching studnet details", error);
      res.status(500).json({ message: "error fetching student details" });
    }
  };
}

export default ChatController;

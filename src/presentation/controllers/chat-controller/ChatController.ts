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
      console.log(comments.CHAT_ADD_C_ERR, error);
      res.status(500).json({ message: comments.CHAT_ADD_C_ERR, err: error });
    }
  };

  sendMessage = async (req: Request, res: Response) => {
    const message: IMessage = req.body;
    try {
      await this.sendMessageUseCase.execute(message);
      const io = req.app.get("io");
      io.to(message.chatId).emit(comments.IO_RECIEVE_MSG, message);

      io.emit(comments.IO_MSG_NOTIFICATION, {
        chatId: message.chatId,
        sender: req.user.name,
        senderId: req.user._id,
        receiverId: message.receiverId,
        content: message.content,
        timestamp: message.timestamp,
      });
      res.status(200).json({ message: comments.MSG_SENT_SUCC });
    } catch (error) {
      console.log(comments.MSG_SENT_FAIL, error);
      res.status(500).json({ message: comments.MSG_SENT_FAIL });
    }
  };

  getMessages = async (req: Request, res: Response) => {
    try {
      const chatId = req.params.chatId;
      const messages = await this.findChatUseCase.execute(chatId);
      res.status(200).json(messages);
    } catch (error) {
      console.log(comments.MSG_FETCH_C_ERR, error);
      res.status(500).json({ message: comments.MSG_FETCH_C_ERR });
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
      console.log(comments.MSG_FETCH2_C_ERR, error);
      res.status(500).json({ message: comments.MSG_FETCH2_C_ERR });
    }
  };

  getChatList = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.query;
      const result = await this.GetAllChatsUseCase.execute(userId as string);
      res.status(200).json(result);
    } catch (error) {
      console.log(comments.CHAT_LIST_FETCH_FAIL, error);
      res.status(500).json({ message: comments.CHAT_LIST_FETCH_FAIL });
    }
  };

  markAsRead = async (req: Request, res: Response): Promise<void> => {
    try {
      const { messageId } = req.body;
      const result = await this.markAsReadUseCase.execute(messageId);
      res.status(200).json(result);
    } catch (error) {
      console.log(comments.MSG_READ_ERR, error);
      res.status(500).json({ message: comments.MSG_READ_ERR });
    }
  };

  videoCallInvitation = async (req: Request, res: Response): Promise<void> => {
    try {
      const { roomID, userId, studentId } = req.body;
      const io = req.app.get("io");
      io.emit(comments.IO_CALL_INVITE, { roomID, userId, studentId });
      res.status(200).json({ message: comments.CALL_INVITE_SENT });
    } catch (error) {
      console.log(comments.CALL_INVITE_FAIL, error);
      res.status(500).json({ message: comments.CALL_INVITE_FAIL });
    }
  };

  studentList = async (req: Request, res: Response): Promise<void> => {
    try {
      const tutorId = req.user._id?.toString();
      const result = await this.getStudentList.execute(tutorId as string);
      res.status(200).json(result);
    } catch (error) {
      console.log(comments.STUDENT_LIST_FETCH_FAIL, error);
      res.status(500).json({ message: comments.STUDENT_LIST_FETCH_FAIL });
    }
  };
}

export default ChatController;

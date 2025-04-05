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
import UnreadCountUseCase from "../../../core/use-cases/chat-usecases/UnreadCountUseCase";
import LastMessageUseCase from "../../../core/use-cases/chat-usecases/LastMessageUseCase";
import UnreadCountByChatUseCase from "../../../core/use-cases/chat-usecases/GetUnreadCountByChatUseCase";
import { UseCaseResponse } from "../../../core/entities/misc/useCaseResponse";
import ClearUnreadMessageCountUseCase from "../../../core/use-cases/chat-usecases/ClearUnreadMessageCountUseCase";

class ChatController {
  constructor(
    private createChatUseCase: CreateChatUseCase,
    private sendMessageUseCase: SendMessageUseCase,
    private GetAllChatsUseCase: GetAllChatsUseCase,
    private findChatUseCase: FindChatUseCase,
    private getByUserIdAndCourseIdUseCase: GetByUserIdAndCourseId,
    private markAsReadUseCase: MarkAsReadUseCase,
    private getStudentList: GetStudentList,
    private unreadCountUseCase: UnreadCountUseCase,
    private lastMessageUseCase: LastMessageUseCase,
    private unreadCountByChatUseCase: UnreadCountByChatUseCase,
    private clearUnreadMessageCountUseCase: ClearUnreadMessageCountUseCase
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
      const result: UseCaseResponse = await this.sendMessageUseCase.execute(
        message
      );
      if (!result.success || !result.data) {
        throw new Error(comments.MSG_SENT_FAIL);
      }
      const savedMessage = result.data;

      res.status(200).json({ success: true, data: savedMessage });
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
      const { messageIds } = req.body;
      const result = await this.markAsReadUseCase.execute(messageIds);
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

  getUnreadMessageCount = async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const unreadCount = await this.unreadCountUseCase.execute(userId);

      res.status(200).json({
        success: true,
        data: { unreadCount },
      });
    } catch (error) {
      console.error(comments.MSG_UNREAD_COUNT_FETCH_FAIL, error);
      res.status(500).json({
        success: false,
        message: comments.MSG_UNREAD_COUNT_FETCH_FAIL,
      });
    }
  };

  getLastMessages = async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;
      const lastMessages = await this.lastMessageUseCase.execute(userId);

      res.status(200).json({
        success: true,
        data: { lastMessages },
      });
    } catch (error) {
      console.error(comments.LAST_MSG_FETCH_FAIL, error);
      res.status(500).json({
        success: false,
        message: comments.LAST_MSG_FETCH_FAIL,
      });
    }
  };

  getUnreadCountByChatId = async (req: Request, res: Response) => {
    try {
      const { chatId, userId } = req.body;
      const unreadCount = await this.unreadCountByChatUseCase.execute(
        chatId,
        userId
      );
      res.status(200).json({
        success: true,
        data: { unreadCount },
      });
    } catch (error) {
      console.error(comments.MSG_UNREAD_COUNT_FETCH_FAIL, error);
      res.status(500).json({
        success: false,
        message: comments.MSG_UNREAD_COUNT_FETCH_FAIL,
      });
    }
  };

  clearUnreadCount = async (req: Request, res: Response) => {
    try {
      const { chatId } = req.body;
      const data = await this.clearUnreadMessageCountUseCase.execute(chatId);
      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.error(comments.CLEAR_UNREAD_MSG_COUNT_FAIL, error);
      res.status(500).json({
        success: false,
        message: comments.CLEAR_UNREAD_MSG_COUNT_FAIL,
      });
    }
  };
}

export default ChatController;

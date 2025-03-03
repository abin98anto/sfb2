import { Request, Response } from "express";
import CreateChatUseCase from "../../../core/use-cases/chat-usecases/CreateChatUseCase";
import SendMessageUseCase from "../../../core/use-cases/chat-usecases/SendMessageUseCase";
import MessageRepository from "../../../infrastructure/repositories/MessageRepository";
import ChatRepository from "../../../infrastructure/repositories/ChatRepository";
import GetAllChatsUseCase from "../../../core/use-cases/chat-usecases/GetAllChatsUseCase";
import IChat from "../../../core/entities/IChat";
import IMessage from "../../../core/entities/IMessage";
import { comments } from "../../../shared/constants/comments";

class ChatController {
  constructor(
    private messageRepository: MessageRepository,
    private chatRepository: ChatRepository,
    private createChatUseCase: CreateChatUseCase,
    private sendMessageUseCase: SendMessageUseCase,
    private GetAllChatsUseCase: GetAllChatsUseCase
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
      io.emit("receive_message", message);
      res.status(200).json({ message: comments.MSG_SENT_SUCC });
    } catch (error) {
      res.status(500).json({ message: comments.MSG_SENT_FAIL });
    }
  };

  getMessages = async (req: Request, res: Response) => {
    const chatId = req.params.chatId;
    try {
      const messages = await this.messageRepository.getMessagesForChat(chatId);
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: "error fetching messages in the chat" });
    }
  };

  getUserChats = async (req: Request, res: Response): Promise<void> => {
    try {
      const { courseId, userId } = req.body;
      const result = await this.chatRepository.getChatByCourseAndUser(
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
}

export default ChatController;

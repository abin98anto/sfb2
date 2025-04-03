import { Router } from "express";
const chatRouter = Router();

import ChatRepository from "../../infrastructure/repositories/ChatRepository";
import MessageRepository from "../../infrastructure/repositories/MessageRepository";
import CreateChatUseCase from "../../core/use-cases/chat-usecases/CreateChatUseCase";
import SendMessageUseCase from "../../core/use-cases/chat-usecases/SendMessageUseCase";
import GetAllChatsUseCase from "../../core/use-cases/chat-usecases/GetAllChatsUseCase";
import ChatController from "../controllers/chat-controller/ChatController";
import FindChatUseCase from "../../core/use-cases/chat-usecases/FindChatUseCase";
import GetByUserIdAndCourseId from "../../core/use-cases/chat-usecases/GetByUserIdAndCourseId";
import MarkAsReadUseCase from "../../core/use-cases/chat-usecases/MarkAsReadUseCase";
import { JwtService } from "../../infrastructure/external-services/JwtService";
import { AuthMiddleware } from "../middleware/authMiddleware";
import { MessageInterface } from "../../core/interfaces/MessageInterface";
import ChatInterface from "../../core/interfaces/ChatInterface";
import { UserInterface } from "../../core/interfaces/UserInterface";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { GetUserDetailsUseCase } from "../../core/use-cases/user-usecases/GetUserDetailsUseCase";
import GetStudentList from "../../core/use-cases/chat-usecases/GetStudentListUseCase";
import LastMessageUseCase from "../../core/use-cases/chat-usecases/LastMessageUseCase";
import UnreadCountUseCase from "../../core/use-cases/chat-usecases/UnreadCountUseCase";
import UnreadCountByChatUseCase from "../../core/use-cases/chat-usecases/GetUnreadCountByChatUseCase";
import ClearUnreadMessageCountUseCase from "../../core/use-cases/chat-usecases/ClearUnreadMessageCountUseCase";

const chatRepository: ChatInterface = new ChatRepository();
const messageRepository: MessageInterface = new MessageRepository();
const userRepository: UserInterface = new UserRepository();

const createChatUseCase = new CreateChatUseCase(chatRepository);
const sendMessageUseCase = new SendMessageUseCase(messageRepository);
const getAllChatsUseCase = new GetAllChatsUseCase(chatRepository);
const findChatUseCase = new FindChatUseCase(messageRepository);
const markAsReadUseCase = new MarkAsReadUseCase(messageRepository);
const getByUserIdAndCourseIdUseCase = new GetByUserIdAndCourseId(
  chatRepository
);
const getUserDetailsUseCase = new GetUserDetailsUseCase(userRepository);
const getStudentList = new GetStudentList(chatRepository);
const lastMessageUseCase = new LastMessageUseCase(messageRepository);
const unreadCountUseCase = new UnreadCountUseCase(messageRepository);
const unreadCountByChatId = new UnreadCountByChatUseCase(messageRepository);
const clearUnreadMessageCountUseCase = new ClearUnreadMessageCountUseCase(
  messageRepository
);

const chatController = new ChatController(
  createChatUseCase,
  sendMessageUseCase,
  getAllChatsUseCase,
  findChatUseCase,
  getByUserIdAndCourseIdUseCase,
  markAsReadUseCase,
  getStudentList,
  unreadCountUseCase,
  lastMessageUseCase,
  unreadCountByChatId,
  clearUnreadMessageCountUseCase
);

const jwtService = new JwtService();
const authMiddleware = AuthMiddleware.create(jwtService, getUserDetailsUseCase);

chatRouter.get("/messages/:chatId", chatController.getMessages);
chatRouter.get("/list", chatController.getChatList);
chatRouter.post("/send", chatController.sendMessage);
chatRouter.put("/mark-as-read", chatController.markAsRead);
chatRouter.post("/video-call", chatController.videoCallInvitation);
chatRouter.get("/student-list", chatController.studentList);
chatRouter.get("/unread-count/:userId", chatController.getUnreadMessageCount);
chatRouter.get("/last-messages/:userId", chatController.getLastMessages);
chatRouter.post("/unread-count-by-chat", chatController.getUnreadCountByChatId);

chatRouter.post("/clear-unread-count", chatController.clearUnreadCount);

export default chatRouter;

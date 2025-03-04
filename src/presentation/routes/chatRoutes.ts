import { Router } from "express";
import ChatRepository from "../../infrastructure/repositories/ChatRepository";
import MessageRepository from "../../infrastructure/repositories/MessageRepository";
import CreateChatUseCase from "../../core/use-cases/chat-usecases/CreateChatUseCase";
import SendMessageUseCase from "../../core/use-cases/chat-usecases/SendMessageUseCase";
import GetAllChatsUseCase from "../../core/use-cases/chat-usecases/GetAllChatsUseCase";
import ChatController from "../controllers/chat-controller/ChatController";
import FindChatUseCase from "../../core/use-cases/chat-usecases/FindChatUseCase";
import GetByUserIdAndCourseId from "../../core/use-cases/chat-usecases/GetByUserIdAndCourseId";

const chatRouter = Router();

const chatRepository = new ChatRepository();
const messageRepository = new MessageRepository();
const createChatUseCase = new CreateChatUseCase(chatRepository);
const sendMessageUseCase = new SendMessageUseCase(messageRepository);
const getAllChatsUseCase = new GetAllChatsUseCase(chatRepository);
const findChatUseCase = new FindChatUseCase(chatRepository);
const getByUserIdAndCourseIdUseCase = new GetByUserIdAndCourseId(
  chatRepository
);

const chatController = new ChatController(
  createChatUseCase,
  sendMessageUseCase,
  getAllChatsUseCase,
  findChatUseCase,
  getByUserIdAndCourseIdUseCase
);

chatRouter.get("/messages/:chatId", chatController.getMessages);
chatRouter.get("/list", chatController.getChatList);
chatRouter.post("/send", chatController.sendMessage);

export default chatRouter;

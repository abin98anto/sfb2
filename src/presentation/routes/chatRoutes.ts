import { Router } from "express";
import ChatRepository from "../../infrastructure/repositories/ChatRepository";
import MessageRepository from "../../infrastructure/repositories/MessageRepository";
import CreateChatUseCase from "../../core/use-cases/chat-usecases/CreateChatUseCase";
import SendMessageUseCase from "../../core/use-cases/chat-usecases/SendMessageUseCase";
import GetAllChatsUseCase from "../../core/use-cases/chat-usecases/GetAllChatsUseCase";
import ChatController from "../controllers/chat-controller/ChatController";

const chatRouter = Router();

const chatRepository = new ChatRepository();
const messageRepository = new MessageRepository();
const createChatUseCase = new CreateChatUseCase(chatRepository);
const sendMessageUseCase = new SendMessageUseCase(messageRepository);
const getAllChatsUseCase = new GetAllChatsUseCase(chatRepository);

const chatController = new ChatController(
  messageRepository,
  chatRepository,
  createChatUseCase,
  sendMessageUseCase,
  getAllChatsUseCase
);

chatRouter.post("/send", chatController.sendMessage);
chatRouter.post("/history", chatController.getUserChats);
chatRouter.get("/list", chatController.getChatList);

export default chatRouter;

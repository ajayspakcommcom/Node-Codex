import { ChatMetrics, cloneSeedRooms } from "../../shared/chat-runtime.js";
import { RedisLikeChatBroker } from "../broker/redis-like-chat-broker.js";
import { InMemoryMessageHistoryRepository } from "../repositories/in-memory-message-history-repository.js";
import { InMemoryRoomRepository } from "../repositories/in-memory-room-repository.js";
import { AuthService } from "../services/auth-service.js";
import { DeliveryService } from "../services/delivery-service.js";
import { MessageService } from "../services/message-service.js";
import { ModerationService } from "../services/moderation-service.js";
import { RoomService } from "../services/room-service.js";
import { ChatGateway } from "../server/chat-gateway.js";

export function createChatPlatform(broker?: RedisLikeChatBroker) {
  const roomRepository = new InMemoryRoomRepository(cloneSeedRooms());
  const messageHistoryRepository = new InMemoryMessageHistoryRepository();
  const authService = new AuthService();
  const roomService = new RoomService(roomRepository);
  const moderationService = new ModerationService(roomRepository);
  const messageService = new MessageService(roomService, messageHistoryRepository);
  const deliveryService = new DeliveryService();
  const metrics = new ChatMetrics();
  const gateway = new ChatGateway(
    authService,
    roomService,
    messageService,
    moderationService,
    deliveryService,
    metrics,
    broker,
  );

  return {
    gateway,
    broker,
    roomRepository,
    messageHistoryRepository,
    metrics,
  };
}

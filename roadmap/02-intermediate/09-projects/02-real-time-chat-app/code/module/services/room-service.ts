import type { ChatIdentity, RoomRecord } from "../../shared/chat-types.js";
import { InMemoryRoomRepository } from "../repositories/in-memory-room-repository.js";

export class RoomService {
  public constructor(private readonly roomRepository: InMemoryRoomRepository) {}

  public getRoom(roomId: string): RoomRecord {
    return this.roomRepository.getRequired(roomId);
  }

  public authorizeRoomAccess(identity: ChatIdentity, roomId: string): RoomRecord {
    const room = this.roomRepository.getRequired(roomId);

    if (room.tenantId !== identity.tenantId) {
      throw new Error("Cross-tenant room access is not allowed.");
    }

    if (!room.participantUserIds.includes(identity.userId)) {
      throw new Error(`User ${identity.userId} is not a participant in room ${roomId}.`);
    }

    return room;
  }
}

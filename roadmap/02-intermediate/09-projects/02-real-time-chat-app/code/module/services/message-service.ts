import { randomUUID } from "node:crypto";

import type { ChatIdentity, ChatMessageRecord } from "../../shared/chat-types.js";
import { InMemoryMessageHistoryRepository } from "../repositories/in-memory-message-history-repository.js";
import { RoomService } from "./room-service.js";

export class MessageService {
  private readonly nextSequenceByRoom = new Map<string, number>();

  public constructor(
    private readonly roomService: RoomService,
    private readonly messageHistoryRepository: InMemoryMessageHistoryRepository,
  ) {}

  public createMessage(input: {
    readonly roomId: string;
    readonly author: ChatIdentity;
    readonly body: string;
    readonly nowEpochSeconds: number;
  }): ChatMessageRecord {
    const room = this.roomService.authorizeRoomAccess(input.author, input.roomId);

    if (room.mutedUserIds.includes(input.author.userId)) {
      throw new Error(`User ${input.author.userId} is muted in room ${input.roomId}.`);
    }

    const sequence = (this.nextSequenceByRoom.get(room.roomId) ?? 0) + 1;
    this.nextSequenceByRoom.set(room.roomId, sequence);

    const message: ChatMessageRecord = {
      messageId: `msg_${randomUUID()}`,
      roomId: room.roomId,
      tenantId: room.tenantId,
      authorUserId: input.author.userId,
      body: input.body,
      createdAtEpochSeconds: input.nowEpochSeconds,
      sequence,
    };

    return this.messageHistoryRepository.append(message);
  }

  public historyFor(identity: ChatIdentity, roomId: string): readonly ChatMessageRecord[] {
    this.roomService.authorizeRoomAccess(identity, roomId);
    return this.messageHistoryRepository.listByRoom(roomId);
  }
}

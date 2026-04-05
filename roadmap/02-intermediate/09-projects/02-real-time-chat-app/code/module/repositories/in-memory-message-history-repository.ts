import type { ChatMessageRecord } from "../../shared/chat-types.js";

export class InMemoryMessageHistoryRepository {
  private readonly messagesByRoom = new Map<string, ChatMessageRecord[]>();

  public append(message: ChatMessageRecord): ChatMessageRecord {
    const existing = this.messagesByRoom.get(message.roomId) ?? [];
    const next = [...existing, message];
    this.messagesByRoom.set(message.roomId, next);
    return message;
  }

  public listByRoom(roomId: string): readonly ChatMessageRecord[] {
    return [...(this.messagesByRoom.get(roomId) ?? [])];
  }
}

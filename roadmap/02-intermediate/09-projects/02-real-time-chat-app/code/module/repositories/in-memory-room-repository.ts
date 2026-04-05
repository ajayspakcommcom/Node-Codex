import type { RoomRecord } from "../../shared/chat-types.js";

export class InMemoryRoomRepository {
  private readonly rooms = new Map<string, RoomRecord>();

  public constructor(seedRooms: readonly RoomRecord[]) {
    for (const room of seedRooms) {
      this.rooms.set(room.roomId, {
        ...room,
        participantUserIds: [...room.participantUserIds],
        mutedUserIds: [...room.mutedUserIds],
      });
    }
  }

  public getRequired(roomId: string): RoomRecord {
    const room = this.rooms.get(roomId);

    if (room === undefined) {
      throw new Error(`Unknown room: ${roomId}`);
    }

    return room;
  }

  public update(room: RoomRecord): RoomRecord {
    const normalized: RoomRecord = {
      ...room,
      participantUserIds: [...room.participantUserIds],
      mutedUserIds: [...room.mutedUserIds],
    };

    this.rooms.set(normalized.roomId, normalized);
    return normalized;
  }
}

import type { ChatIdentity, RoomRecord } from "../../shared/chat-types.js";
import { InMemoryRoomRepository } from "../repositories/in-memory-room-repository.js";

export class ModerationService {
  public constructor(private readonly roomRepository: InMemoryRoomRepository) {}

  public muteUser(input: {
    readonly roomId: string;
    readonly actor: ChatIdentity;
    readonly targetUserId: string;
  }): RoomRecord {
    const room = this.roomRepository.getRequired(input.roomId);

    if (room.tenantId !== input.actor.tenantId) {
      throw new Error("Moderation cannot cross tenant boundaries.");
    }

    if (!input.actor.roles.includes("moderator") && !input.actor.roles.includes("admin")) {
      throw new Error("Only moderators or admins can mute users.");
    }

    if (!room.participantUserIds.includes(input.targetUserId)) {
      throw new Error("Target user is not a room participant.");
    }

    if (room.mutedUserIds.includes(input.targetUserId)) {
      return room;
    }

    return this.roomRepository.update({
      ...room,
      mutedUserIds: [...room.mutedUserIds, input.targetUserId],
    });
  }
}

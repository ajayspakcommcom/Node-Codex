import { randomUUID } from "node:crypto";

import type { AuditEvent, AuditSeverity } from "../../shared/auth-service-types.js";

export class AuditLogService {
  private readonly events: AuditEvent[] = [];

  public record(input: {
    readonly type: string;
    readonly severity?: AuditSeverity;
    readonly actorUserId?: string;
    readonly tenantId?: string;
    readonly sessionId?: string;
    readonly metadata?: Readonly<Record<string, string | number | boolean>>;
  }): AuditEvent {
    const event: AuditEvent = {
      id: randomUUID(),
      type: input.type,
      severity: input.severity ?? "info",
      metadata: input.metadata ?? {},
      ...(input.actorUserId !== undefined ? { actorUserId: input.actorUserId } : {}),
      ...(input.tenantId !== undefined ? { tenantId: input.tenantId } : {}),
      ...(input.sessionId !== undefined ? { sessionId: input.sessionId } : {}),
    };

    this.events.push(event);
    return event;
  }

  public list(): readonly AuditEvent[] {
    return [...this.events];
  }
}

import type { HttpRequest, HttpResponse } from "./shared/http-types.js";
import { ok } from "./shared/response-helpers.js";

interface SessionInfo {
  readonly sessionId: string;
  readonly actorEmail: string;
}

function handleSessionRequest(request: HttpRequest<{ actorEmail: string }>): HttpResponse {
  const contentType = request.headers["content-type"];
  const requestId = request.headers["x-request-id"];
  const sessionCookie = request.cookies.session_id;

  const response = ok<SessionInfo>(
    {
      sessionId: sessionCookie ?? "generated-session-id",
      actorEmail: request.body?.actorEmail ?? "unknown@example.com",
    },
    {
      requestId,
      receivedContentType: contentType,
    },
  );

  return {
    ...response,
    headers: {
      "content-type": "application/json",
      "set-cookie": "session_id=generated-session-id; HttpOnly; Secure",
    },
  };
}

console.log(
  handleSessionRequest({
    method: "POST",
    path: "/sessions",
    params: {},
    query: {},
    headers: {
      "content-type": "application/json",
      "x-request-id": "req_9001",
    },
    cookies: {
      session_id: "existing-session-id",
    },
    body: {
      actorEmail: "engineer@example.com",
    },
  }),
);

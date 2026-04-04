import { failure, ok } from "./shared/response-helpers.js";
import { requireAuthorizationHeader } from "./shared/validation.js";

interface VersionedRequest {
  readonly path: string;
  readonly headers: Readonly<Record<string, string | undefined>>;
}

function handleVersionedUserRequest(request: VersionedRequest) {
  try {
    const authHeader = requireAuthorizationHeader(request.headers.authorization);
    const version = request.path.startsWith("/v2/") ? "v2" : "v1";

    return ok({
      version,
      authHeader,
      note: "Breaking contract changes should be versioned intentionally",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return failure(401, "UNAUTHORIZED", error.message);
    }

    return failure(500, "INTERNAL_SERVER_ERROR", "unexpected error");
  }
}

console.log(
  handleVersionedUserRequest({
    path: "/v2/users/usr_100",
    headers: {
      authorization: "Bearer token-555",
    },
  }),
);

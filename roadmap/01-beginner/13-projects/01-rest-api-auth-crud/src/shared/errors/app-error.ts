export class AppError extends Error {
  public constructor(
    public readonly statusCode: number,
    public readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class AuthenticationError extends AppError {
  public constructor(message = "Authentication failed.") {
    super(401, "AUTHENTICATION_ERROR", message);
  }
}

export class AuthorizationError extends AppError {
  public constructor(message = "You are not allowed to access this resource.") {
    super(403, "AUTHORIZATION_ERROR", message);
  }
}

export class ValidationError extends AppError {
  public constructor(message = "Request validation failed.") {
    super(400, "VALIDATION_ERROR", message);
  }
}

export class ConflictError extends AppError {
  public constructor(message = "Resource conflict.") {
    super(409, "CONFLICT_ERROR", message);
  }
}

export class NotFoundError extends AppError {
  public constructor(message = "Resource not found.") {
    super(404, "NOT_FOUND", message);
  }
}

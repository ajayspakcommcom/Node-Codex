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

export class ValidationError extends AppError {
  public constructor(message = "Request validation failed.") {
    super(400, "VALIDATION_ERROR", message);
  }
}

export class UnsupportedMediaTypeError extends AppError {
  public constructor(message = "Unsupported file type.") {
    super(415, "UNSUPPORTED_MEDIA_TYPE", message);
  }
}

export class PayloadTooLargeError extends AppError {
  public constructor(message = "Uploaded file is too large.") {
    super(413, "PAYLOAD_TOO_LARGE", message);
  }
}

export class NotFoundError extends AppError {
  public constructor(message = "File metadata not found.") {
    super(404, "NOT_FOUND", message);
  }
}

export class StorageError extends AppError {
  public constructor(message = "File storage operation failed.") {
    super(500, "STORAGE_ERROR", message);
  }
}

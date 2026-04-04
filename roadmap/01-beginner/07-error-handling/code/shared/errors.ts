export class AppError extends Error {
  readonly code: string;
  readonly statusCode: number;
  readonly isOperational: boolean;

  constructor(
    message: string,
    options: {
      code: string;
      statusCode: number;
      isOperational?: boolean;
    },
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = options.code;
    this.statusCode = options.statusCode;
    this.isOperational = options.isOperational ?? true;
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, {
      code: "VALIDATION_ERROR",
      statusCode: 400,
    });
  }
}

export class BusinessRuleError extends AppError {
  constructor(message: string) {
    super(message, {
      code: "BUSINESS_RULE_ERROR",
      statusCode: 409,
    });
  }
}

export class InfrastructureError extends AppError {
  constructor(message: string) {
    super(message, {
      code: "INFRASTRUCTURE_ERROR",
      statusCode: 503,
    });
  }
}

export class ProgrammerError extends AppError {
  constructor(message: string) {
    super(message, {
      code: "PROGRAMMER_ERROR",
      statusCode: 500,
      isOperational: false,
    });
  }
}

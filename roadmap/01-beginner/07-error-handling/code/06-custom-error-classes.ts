import { BusinessRuleError, InfrastructureError, ValidationError } from "./shared/errors.js";

const errors = [
  new ValidationError("phoneNumber is required"),
  new BusinessRuleError("Order is already paid"),
  new InfrastructureError("Upstream service unavailable"),
];

for (const error of errors) {
  console.log({
    name: error.name,
    message: error.message,
    code: error.code,
    statusCode: error.statusCode,
  });
}

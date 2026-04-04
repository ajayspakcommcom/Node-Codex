import { InfrastructureError, ProgrammerError, ValidationError } from "./shared/errors.js";

const operationalExamples = [
  new ValidationError("Email is required"),
  new InfrastructureError("Database timeout"),
];

const programmerExample = new ProgrammerError("Unexpected undefined access in service logic");

console.log("Operational errors:");
for (const error of operationalExamples) {
  console.log(`- ${error.name}: ${error.message} operational=${error.isOperational}`);
}

console.log("Programmer error:");
console.log(`- ${programmerExample.name}: ${programmerExample.message} operational=${programmerExample.isOperational}`);

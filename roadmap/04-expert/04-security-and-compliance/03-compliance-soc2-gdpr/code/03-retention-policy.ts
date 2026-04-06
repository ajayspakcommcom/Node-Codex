import { createRetentionPolicy } from "./compliance/retention-policy.js";

const policy = createRetentionPolicy();

console.log(policy.daysFor("customer-profile"));

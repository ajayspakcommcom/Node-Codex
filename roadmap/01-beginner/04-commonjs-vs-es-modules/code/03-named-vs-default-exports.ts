import buildCacheKeyDefault from "./shared/export-styles/default-export-service.js";
import { buildCacheKey, buildUserTopic } from "./shared/export-styles/named-export-service.js";

console.log("Default export example:", buildCacheKeyDefault("session", "usr_100"));
console.log("Named export example:", buildCacheKey("session", "usr_100"));
console.log("Second named export example:", buildUserTopic("usr_100"));

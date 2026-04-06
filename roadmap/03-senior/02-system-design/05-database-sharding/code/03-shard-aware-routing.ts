import { ShardRouter } from "./module/services/shard-router.js";
import { shardNodes } from "./shared/sharding-runtime.js";
import { logger } from "./shared/logger.js";

const router = new ShardRouter();

logger.section("Shard-Aware Routing");
logger.line(`Tenant 42 -> ${router.routeByTenant(42, shardNodes).id}`);
logger.line(`Hashed key 98127 -> ${router.routeByHashedKey(98127, shardNodes).id}`);

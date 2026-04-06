import { createLogger } from "./shared/logger";
import { InMemorySecretStore } from "./shared/secret-store";

const logger = createLogger("centralized-retrieval");

class BillingConfigService {
  constructor(private readonly secretStore: InMemorySecretStore) {}

  getDatabasePassword(): string {
    return this.secretStore.get("billing/db/password");
  }
}

const secretStore = new InMemorySecretStore({
  "billing/db/password": "masked-demo-secret",
});

const config = new BillingConfigService(secretStore);

logger.info("secret_retrieved", {
  secretName: "billing/db/password",
  note: "Services should retrieve secrets through a boundary instead of reading them ad hoc everywhere.",
  hasValue: Boolean(config.getDatabasePassword()),
});

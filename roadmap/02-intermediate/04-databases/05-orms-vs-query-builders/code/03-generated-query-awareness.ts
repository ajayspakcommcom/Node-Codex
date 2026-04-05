import { QueryInspector } from "./module/inspection/query-inspector.js";
import { OrderOrmRepository } from "./module/orm/order-orm-repository.js";
import { OrderQueryBuilderRepository } from "./module/query-builder/order-query-builder-repository.js";
import { exampleCustomers, exampleOrders } from "./shared/data-access-runtime.js";
import { logger } from "./shared/logger.js";

const ormRepository = new OrderOrmRepository(exampleOrders);
const queryBuilderRepository = new OrderQueryBuilderRepository(exampleOrders, exampleCustomers);
const inspector = new QueryInspector();

const ormInspection = inspector.inspectOrmPreview(
  ormRepository.generatedQueryPreview("tenant_alpha", {
    status: "placed",
    channel: "web",
  }),
);
const builderInspection = inspector.inspectBuilderPreview(
  queryBuilderRepository.highValueEnterpriseCustomers("tenant_alpha", 100_000).sql,
);

logger.info("Generated query awareness", {
  ormInspection,
  builderInspection,
  guidance: "Enterprise teams should inspect the query actually reaching the database, regardless of whether it came from an ORM or a builder.",
});

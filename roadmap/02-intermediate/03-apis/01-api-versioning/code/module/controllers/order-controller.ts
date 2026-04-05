import type { OrderService } from "../services/order-service.js";
import { toCreateOrderInput, toOrderResponse } from "../presenters/order-contract-mapper.js";
import {
  buildVersionHeaders,
  resolveVersion,
  type RequestContext,
  type ResponseEnvelope,
  type VersionPolicy,
  type VersionUsageMetrics,
} from "../../shared/versioning-runtime.js";

export class OrderController {
  public constructor(
    private readonly orderService: OrderService,
    private readonly versionPolicy: VersionPolicy,
    private readonly versionMetrics: VersionUsageMetrics,
  ) {}

  public list(request: RequestContext): ResponseEnvelope {
    const resolvedVersion = resolveVersion(request, this.versionPolicy);
    this.versionMetrics.record(resolvedVersion.version, `${request.method} /orders`, request.consumerId);

    return {
      statusCode: 200,
      headers: buildVersionHeaders(resolvedVersion.version, this.versionPolicy),
      body: this.orderService.listOrders().map((order) => toOrderResponse(resolvedVersion.version, order)),
    };
  }

  public create(request: RequestContext): ResponseEnvelope {
    const resolvedVersion = resolveVersion(request, this.versionPolicy);
    this.versionMetrics.record(resolvedVersion.version, `${request.method} /orders`, request.consumerId);

    const order = this.orderService.createOrder(toCreateOrderInput(resolvedVersion.version, request.body));

    return {
      statusCode: 201,
      headers: buildVersionHeaders(resolvedVersion.version, this.versionPolicy),
      body: toOrderResponse(resolvedVersion.version, order),
    };
  }
}

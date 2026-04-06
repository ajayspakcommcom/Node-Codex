# Sample PR Findings

## Finding 1: Correctness

- File: `src/modules/orders/order-service.ts`
- Issue: The service updates order state before validating payment status.
- Why it matters: Failed or duplicate payment events can move the order into an invalid lifecycle state.
- Review comment:
  `Blocking: order state is updated before the payment status is verified. That can mark an order as confirmed even when the payment event is invalid or duplicated. Please validate the payment status first and keep the state transition behind that check.`

## Finding 2: Maintainability

- File: `src/modules/auth/auth-controller.ts`
- Issue: Controller now contains token parsing, permission checks, and audit formatting.
- Why it matters: This makes transport logic, auth rules, and audit behavior harder to test and change independently.
- Review comment:
  `Blocking: this controller is taking on auth parsing, permission checks, and audit formatting together. Please move business and security rules back into the service or shared auth boundary so the controller stays transport-focused.`

## Finding 3: Security

- File: `src/shared/http/logging.ts`
- Issue: Authorization header is logged in full.
- Why it matters: Token leakage through logs creates a credential exposure path.
- Review comment:
  `Blocking: this logs the full authorization header. We should never emit raw tokens into logs. Please redact the value or log only the presence/type of the header.`

## Finding 4: Performance

- File: `src/modules/reports/report-controller.ts`
- Issue: Request path performs synchronous large JSON serialization.
- Why it matters: Under load, this can block the event loop and increase tail latency.
- Review comment:
  `Blocking: this serializes the full report payload synchronously on the request path. For larger reports this will block the event loop. Please stream the result or move heavy transformation out of the direct response path.`

## Finding 5: Observability

- File: `src/modules/payments/payment-service.ts`
- Issue: Retry loop has no structured logging or metrics.
- Why it matters: Incident responders will not know whether failures are first-attempt failures or repeated retry exhaustion.
- Review comment:
  `Blocking: the retry path is invisible operationally right now. Please add structured logs and a retry/failure metric so we can distinguish transient issues from repeated exhaustion in production.`

# Rate Limiting For Enterprise Node.js And TypeScript

## Purpose

This topic is about protecting APIs from abuse, overload, and unfair usage through clear rate-limiting strategies.

The goal is not only to block requests after some number. The goal is to understand where rate limiting belongs, what should be counted, how distributed systems affect enforcement, and how enterprise teams balance protection with user experience.

In enterprise systems, rate limiting matters because backend services often need to:

- protect authentication and public endpoints from abuse
- keep request traffic fair across users, tenants, and clients
- shield databases and downstream services from sudden traffic spikes
- reduce brute-force and scraping pressure
- preserve service stability during accidental or malicious floods

## What This Section Covers

- what rate limiting is
- why APIs need rate limiting
- where rate limiting belongs in a system
- per-IP vs per-user vs per-tenant limits
- route-level vs global limits
- fixed window basics
- sliding window awareness
- token bucket awareness
- burst vs sustained traffic thinking
- public API vs authenticated API limit strategy
- rate limiting with Redis awareness
- distributed enforcement basics
- `429 Too Many Requests`
- rate-limit headers and client feedback
- fail-open vs fail-closed behavior
- observability and throttling metrics
- unfair shared-IP throttling risks
- common production mistakes
- maintainability rules
- interview-style questions
- practice exercises

## Enterprise Context

Rate limiting is one of the most common transport-level protections in backend systems.

It helps reduce:

- abusive traffic
- brute-force attempts
- accidental client floods
- cascading dependency pressure
- uneven resource usage
- noisy-neighbor behavior in shared systems

The important question is not only "can we return 429?" The real question is:

- how do we protect service stability without creating confusing, unfair, or operationally fragile API behavior

## 1. What Rate Limiting Is

### Enterprise View

Rate limiting is a mechanism for controlling how much traffic a client, identity, or tenant may send within a defined period or budget.

### Enterprise Rule

- treat rate limiting as a deliberate protection policy, not just a quick middleware snippet

## 2. Why APIs Need Rate Limiting

### Enterprise Relevance

APIs are exposed to both intentional abuse and accidental misuse.

Even legitimate clients can overload a service if retries, loops, or batch behavior go wrong.

### Enterprise Rule

- use rate limiting to protect shared service capacity before overload becomes a production incident

## 3. Where Rate Limiting Belongs In A System

### Enterprise Relevance

Rate limiting can exist at multiple layers:

- CDN or edge
- API gateway
- load balancer
- application middleware
- downstream service-specific boundaries

Each location solves different problems.

### Enterprise Rule

- place rate limiting at the boundary that best matches the risk you are trying to control instead of assuming all limits belong only in app code

## 4. Per-IP Vs Per-User Vs Per-Tenant Limits

### Enterprise Relevance

What gets counted changes fairness and effectiveness.

### Common Choices

- per-IP for anonymous public endpoints
- per-user for authenticated APIs
- per-tenant for multi-tenant enterprise platforms
- per-client credential for partner integrations

### Enterprise Rule

- choose the limiter key based on the identity that represents real fairness and risk in that workflow

## 5. Route-Level Vs Global Limits

### Enterprise Relevance

Not every endpoint should share the same limit.

Authentication, search, reporting, and admin endpoints often have very different load profiles and abuse risks.

### Enterprise Rule

- apply route-specific limits where endpoint risk or cost differs meaningfully instead of relying only on one global threshold

## 6. Fixed Window Basics

### Enterprise Relevance

Fixed windows are simple to understand and implement, but they can allow bursts at window boundaries.

### Enterprise Rule

- use fixed windows when simplicity is valuable and boundary burst behavior is acceptable

## 7. Sliding Window Awareness

### Enterprise Relevance

Sliding windows reduce some burst unfairness compared with fixed windows, but they are more complex to implement and reason about.

### Enterprise Rule

- prefer sliding-window-style enforcement when fairness matters more than minimal implementation complexity

## 8. Token Bucket Awareness

### Enterprise Relevance

Token bucket style rate limiting allows controlled bursts while still capping sustained traffic over time.

### Enterprise Rule

- use token-style models when clients need limited burst flexibility without unlimited sustained pressure

## 9. Burst Vs Sustained Traffic Thinking

### Enterprise Relevance

Some APIs can tolerate occasional bursts but not long-running high throughput.

Others need strict smoothing because downstream dependencies are fragile.

### Enterprise Rule

- design limits around actual traffic shape and backend capacity, not just a single arbitrary request count

## 10. Public API Vs Authenticated API Limit Strategy

### Enterprise Relevance

Public anonymous routes usually need stricter and more defensive limits than authenticated internal or partner workflows.

Authentication endpoints also deserve special protection because they are frequent abuse targets.

### Enterprise Rule

- keep limit policies different for login, public, partner, and authenticated business endpoints instead of forcing one rule onto every route

## 11. Rate Limiting With Redis Awareness

### Enterprise Relevance

Redis is commonly used for distributed counters because application memory does not scale safely across multiple instances.

### Enterprise Rule

- use Redis or another shared store when limits must remain consistent across horizontally scaled application instances

## 12. Distributed Enforcement Basics

### Enterprise Relevance

A limiter that works on one instance may fail under load-balanced multi-instance traffic if counters are not shared.

### Enterprise Rule

- treat rate limiting in distributed systems as shared-state coordination, not as a per-process afterthought

## 13. `429 Too Many Requests`

### Enterprise Relevance

Clients need a clear and predictable response when they exceed allowed traffic.

### Enterprise Rule

- return explicit `429` responses when limits are exceeded and avoid ambiguous failures that look like random server instability

## 14. Rate-Limit Headers And Client Feedback

### Enterprise Relevance

Good APIs help clients understand current limits, reset timing, and retry expectations.

Useful feedback may include:

- current policy name
- remaining requests
- reset timing
- retry-after guidance

### Enterprise Rule

- make throttling visible to clients so well-behaved consumers can adapt instead of guessing

## 15. Fail-Open Vs Fail-Closed Behavior

### Enterprise Relevance

If Redis or another rate-limit dependency fails, the system must decide whether to allow traffic or block it.

### Tradeoff

- fail-open favors availability but weakens protection
- fail-closed favors protection but can create wider outages

### Enterprise Rule

- choose failure behavior intentionally per endpoint risk instead of letting dependency failure decide policy accidentally

## 16. Observability And Throttling Metrics

### Enterprise Relevance

Teams need visibility into:

- how often limits are triggered
- which routes are being throttled
- which clients or tenants are affected
- whether a limit is too weak or too aggressive

### Enterprise Rule

- make rate-limit outcomes observable in logs, metrics, and alerts so policies can be tuned with real traffic data

## 17. Unfair Shared-IP Throttling Risks

### Enterprise Relevance

Shared office networks, NAT gateways, mobile carrier networks, and corporate proxies can cause many users to appear under one IP.

### Enterprise Rule

- avoid treating IP address as the only fairness key for authenticated enterprise traffic unless that tradeoff is explicitly acceptable

## 18. Common Production Mistakes

### Common Mistakes

- using one global threshold for every endpoint
- relying on in-memory counters in a multi-instance deployment
- rate limiting only by IP for authenticated users
- failing to protect login and password-reset endpoints separately
- returning generic server errors instead of `429`
- hiding retry information from clients
- choosing arbitrary thresholds without measuring real traffic
- forgetting to monitor throttle rates and false positives

### Enterprise Rule

- keep rate limiting explicit, observable, and aligned with endpoint cost and client identity

## 19. Maintainability Rules

- keep rate limiting near transport boundaries where shared traffic policy belongs
- choose limiter keys that reflect real fairness and abuse risk
- separate protection policies by endpoint class and traffic cost
- use shared state for distributed enforcement
- instrument throttling outcomes before tuning thresholds aggressively
- document policy intent so future engineers know why a limit exists

## 20. Suggested Code Scope

Inside the `code` folder, this topic can later include:

- fixed-window in-memory limiter examples
- Redis-backed distributed counter examples
- middleware-style limit enforcement
- route-specific limit policy examples
- `429` response and rate-limit header examples
- fail-open vs fail-closed examples
- observability and metrics examples
- common anti-patterns such as hidden global throttling

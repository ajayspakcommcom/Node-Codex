# Weak Vs Strong Review Comments

## Weak

- `This looks wrong.`
- `Can you improve this?`
- `I don't like this pattern.`

## Strong

- `This branch returns before the queue publish finishes. If the publish fails after the response is sent, downstream systems will miss the event. Please either await the publish or make the async behavior explicit and observable.`
- `This change adds a new response field but does not update the documented contract. Since external consumers parse this payload, the contract note needs to be updated in the same PR.`
- `This retry loop catches every error type. For non-idempotent writes, that can duplicate side effects. Please restrict retries to explicit transient failure conditions.`

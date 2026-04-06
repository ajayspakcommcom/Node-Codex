# Blocking Vs Non-Blocking Feedback

## Blocking

- `Blocking:` This change can return a success response before the database write finishes, which risks data inconsistency under failure.
- `Blocking:` The endpoint now accepts unvalidated input for `role`, which creates an authorization risk.
- `Blocking:` The migration removes a column still read by the current production version, so rollback would fail.

## Non-Blocking

- `Non-blocking:` This helper name is a bit too generic. Renaming it to reflect the business action would make the flow easier to review later.
- `Non-blocking:` A short comment above this retry policy would help explain why the backoff values were chosen.
- `Non-blocking:` This logic is correct, but splitting the branch into a small helper would improve readability.

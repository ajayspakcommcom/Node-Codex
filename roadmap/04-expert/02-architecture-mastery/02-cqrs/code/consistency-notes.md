# Consistency Notes

## Read And Write Expectations

- write-side validation and invariants live in the command model
- read model is optimized for query shape, not transaction logic
- read model may lag behind the write model
- consumers must know when they are reading eventually consistent data

## Operational Rules

- projection lag must be observable
- projection rebuild should be possible without mutating command-side history
- query consumers should not assume immediate read-after-write unless the workflow guarantees it

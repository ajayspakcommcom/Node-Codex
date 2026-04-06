# Backward-Compatible Vs Breaking Changes

## Backward-Compatible

- adding an optional response field
- adding a new optional request field with a safe default
- expanding enum support without changing existing values

## Breaking

- renaming or removing an existing field
- changing a field type
- changing response shape from object to array
- changing status code behavior in a way consumers rely on
- altering pagination semantics without versioning


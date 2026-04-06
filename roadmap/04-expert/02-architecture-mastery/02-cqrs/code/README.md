# CQRS Code

This code set demonstrates an enterprise-style CQRS slice with an order command model and an operationally separate read projection.

## Coverage

- command-side aggregate and command handler
- read-side projection store
- projection updater
- eventual-consistency notes
- projection lag awareness
- maintainability-oriented read/write separation

## Notes

- this is a design-quality CQRS package with local validation support
- files are intentionally organized by write model, read model, and projection workflow
- the goal is to show when separate models help and how to keep the cost visible

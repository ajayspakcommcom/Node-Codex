# Infrastructure As Code (Terraform) Code

This code set demonstrates an enterprise-style Terraform repository layout for provisioning reviewable and environment-separated infrastructure.

## Coverage

- root modules for environments
- reusable infrastructure modules
- remote state and backend awareness
- provider and version pinning
- variable boundaries and outputs
- environment separation
- blast radius control
- plan and apply reviewability
- drift and governance awareness
- maintainability patterns

## Notes

- files are written as reviewable examples rather than a runnable cloud account bootstrap
- values are illustrative and should be adapted to the real cloud environment
- secrets are intentionally not embedded in Terraform code

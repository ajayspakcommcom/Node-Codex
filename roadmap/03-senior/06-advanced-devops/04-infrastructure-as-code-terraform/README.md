# Infrastructure As Code (Terraform)

## Purpose

Infrastructure as Code lets teams define, review, provision, and evolve infrastructure through versioned code so environment drift, undocumented changes, and manual rollout risk are reduced.

## Enterprise-Level Pointers

- what Infrastructure as Code solves in large organizations
- Terraform resources, modules, state, and plans
- reviewable infrastructure changes through pull requests
- environment separation and workspace strategy awareness
- module design and reuse boundaries
- state management and remote backend awareness
- drift detection and reconciliation workflows
- secret and credential handling in IaC workflows
- blast radius and change-scoping discipline
- policy and governance awareness
- dependency ordering and rollout coordination
- Terraform plan review and apply controls
- common production mistakes
- maintainability rules
- interview-style questions
- practice exercises

## What Enterprise Teams Optimize For

- repeatable and reviewable infrastructure changes
- reduced manual drift and undocumented platform state
- clear module boundaries and ownership
- safer production changes through plan visibility and controlled applies

## Common Production Mistakes

- mixing unrelated infrastructure domains into one module or state
- applying infrastructure changes without reviewing plan output carefully
- keeping state management informal or local
- embedding secrets directly in Terraform code or state-sensitive outputs
- introducing Terraform while still making manual changes in parallel

## Maintainability Rules

- keep modules small, purposeful, and clearly owned
- review plans with the same rigor as application changes
- separate environments and blast radius intentionally
- treat state, credentials, and apply workflows as security-sensitive platform concerns

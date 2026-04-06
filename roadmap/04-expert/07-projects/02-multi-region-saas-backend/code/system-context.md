# System Context

This project represents a SaaS platform serving tenants in multiple regions with regional data ownership and a global control plane.

## Control-Plane Responsibilities

- keep the region registry and health view current
- decide tenant home region on onboarding
- route requests based on strategy and health
- approve or reject failover plans
- review rollout safety before regional change

## Data-Plane Responsibilities

- serve traffic from approved tenant regions
- preserve residency and replication guarantees
- expose health and lag signals to the control plane
- drain traffic safely during failover or rollout

## Operating Assumptions

- some tenants are active-passive and fail over only during incidents
- some tenants are active-active across a legally approved region set
- not every healthy region is legally valid for every tenant
- replication lag and compatibility must be reviewed before traffic shifts

# Deployment Sequencing Notes

## Enterprise Sequence

1. Expand the database schema first.
2. Deploy the new service version while it still accepts old contracts and old schema state.
3. Shift traffic gradually only after compatibility checks pass.
4. Drain the previous version until no in-flight work remains.
5. Contract schema or remove compatibility shims only after old traffic is gone.

## Rules

- never combine schema contraction with first deployment of a new version
- treat rollback as a first-class requirement before promoting traffic
- keep worker and background-consumer compatibility in the same rollout plan
- document which component owns the final contract/removal step

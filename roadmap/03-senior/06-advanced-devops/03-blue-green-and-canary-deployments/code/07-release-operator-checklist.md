# Release Operator Checklist

- confirm dashboard and trace panels are available before traffic shift
- verify rollback command and previous stable release revision
- confirm schema compatibility notes for overlapping versions
- shift traffic only after green environment health checks pass
- stop rollout immediately if rollback criteria are met

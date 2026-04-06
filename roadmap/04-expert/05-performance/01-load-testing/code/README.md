# Load Testing Code

This package models load testing as explicit traffic profiles, percentile-based interpretation, dependency-aware scenarios, and release gates rather than raw request-per-second output alone.

## Coverage

- mixed traffic profile definition
- ramp and soak scenario modeling
- percentile and error-rate interpretation
- dependency-aware capacity review
- SLO-based release gating
- maintainability-oriented load-test ownership

## Notes

- this is an enterprise-style load-testing package with local validation support
- the goal is to make load-test conclusions reviewable and actionable for engineering teams
- files are intentionally structured to separate traffic profiles, result summaries, and release-gate policy

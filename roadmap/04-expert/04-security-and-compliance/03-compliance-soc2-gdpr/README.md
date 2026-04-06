# Compliance (SOC 2, GDPR)

## Purpose

This topic is about translating compliance frameworks and regulatory requirements into concrete technical controls, operational evidence, and architecture decisions instead of relying on policy documents alone.

## Enterprise-Level Pointers

- what compliance means for engineering teams
- SOC 2-style operational control expectations
- GDPR-style data privacy and residency requirements
- mapping policy requirements to technical implementation
- evidence generation and audit support
- retention, deletion, and access-control obligations
- data classification and processing boundaries
- third-party and shared-platform compliance considerations
- exception handling and compensating controls
- keeping compliance aligned with real system behavior
- common production mistakes
- maintainability rules
- interview-style questions
- practice exercises

## What Expert Teams Optimize For

- building evidence-producing systems instead of manual audit scrambles
- aligning data-handling architecture with privacy and control requirements
- reducing repeated compliance toil across teams through platform standards
- making compliance controls durable enough to survive system change

## Common Production Mistakes

- treating compliance as a post-build paperwork exercise
- storing regulated data without clear classification and deletion strategy
- relying on manual screenshots and ad hoc evidence collection
- implementing controls that drift from real production behavior

## Maintainability Rules

- map every important compliance requirement to a concrete control owner
- generate evidence through normal system operation where possible
- keep data classification, retention, and deletion rules explicit
- review compliance impact when architecture or data flows change

## Interview Questions

- How do you keep compliance from becoming only a documentation exercise?
- What backend architecture decisions are directly influenced by GDPR-style requirements?
- Why is automated evidence generation important for scalable compliance?

## Practice Exercises

- Map a SOC 2 control area to engineering controls in a service platform.
- Design a GDPR-aware deletion workflow for customer data.
- Create a compliance evidence checklist for a new regulated service.

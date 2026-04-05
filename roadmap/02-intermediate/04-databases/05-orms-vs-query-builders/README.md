# ORMs Vs Query Builders For Enterprise Node.js And TypeScript

## Purpose

This topic is about understanding the tradeoffs between full ORMs and query builders when building maintainable backend data-access layers.

The goal is not only to compare tool categories. The goal is to understand how enterprise teams choose the right abstraction level for their data model, performance needs, and team workflow.

## What This Section Covers

- what ORMs solve
- what query builders solve
- abstraction tradeoffs
- generated SQL awareness
- model convenience vs query control
- repository boundary implications
- debugging and performance implications
- team productivity tradeoffs
- common production mistakes
- maintainability rules
- interview-style questions
- practice exercises

## Enterprise Context

This is rarely a pure ideological choice. Teams choose between ORMs and query builders based on domain complexity, query needs, performance sensitivity, and the skill level of the team maintaining the service.

The important question is not only "which tool is better?" The real question is:

- which abstraction gives the team enough productivity without hiding too much query behavior or making performance tuning unnecessarily hard

## Suggested Code Scope

Inside the `code` folder, this topic can later include:

- ORM-style repository examples
- query-builder-style repository examples
- generated SQL awareness examples
- abstraction tradeoff comparisons
- maintainability anti-patterns

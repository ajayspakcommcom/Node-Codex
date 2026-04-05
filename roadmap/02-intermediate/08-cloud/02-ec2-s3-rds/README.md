# EC2, S3, And RDS For Enterprise Node.js And TypeScript

## Purpose

This topic is about understanding EC2, S3, and RDS in backend systems.

The goal is not only to know what these services are. The goal is to understand when enterprise teams use them, what problems they solve, what operational tradeoffs they introduce, and how they fit together in a backend architecture.

In enterprise systems, EC2, S3, and RDS matter because backend teams need to:

- run compute workloads on predictable infrastructure
- store files and objects durably outside application servers
- use managed relational databases instead of running everything themselves
- separate application logic from storage and database responsibilities
- make better hosting and persistence decisions on AWS

## What This Section Covers

- EC2 basics
- S3 basics
- RDS basics
- choosing the right service for the right workload
- persistence boundaries
- durability and availability awareness
- cost and scaling tradeoffs
- common production mistakes
- maintainability rules
- interview-style questions
- practice exercises

## Enterprise Context

Enterprise teams often combine EC2, S3, and RDS in one system: EC2 for application compute, S3 for file or object storage, and RDS for managed relational data. Using them well requires understanding their responsibilities and avoiding misuse.

Poor service usage usually looks like:

- storing uploaded files on the application server instead of object storage
- using EC2 like a dumping ground for every infrastructure concern
- treating RDS as if scaling and operational behavior never matter
- ignoring separation between application compute and persistent storage
- choosing services without a clear workload fit

The important question is not only "do we know these services?" The real question is:

- are we mapping workload responsibilities to the right AWS building blocks with clear operational tradeoffs in mind

## 1. EC2 Basics

### Enterprise Relevance

EC2 gives teams control over virtual compute instances when they need flexibility in how applications run.

### Enterprise Rule

- use EC2 when you need server-level control and can justify the operational responsibility that comes with it

## 2. S3 Basics

### Enterprise Relevance

S3 is designed for durable object storage and is usually a better home for uploaded assets, exports, and static files than application server disks.

### Enterprise Rule

- keep long-lived files in object storage instead of tying them to app-server lifecycles

## 3. RDS Basics

### Enterprise Relevance

RDS provides managed relational database capabilities so teams can avoid self-managing many database infrastructure concerns.

### Enterprise Rule

- use RDS intentionally when your workload fits relational storage and managed database operations add value

## 4. Choosing The Right Service For The Right Workload

### Enterprise Relevance

Compute, object storage, and relational databases solve different problems and should not be used interchangeably without a reason.

### Enterprise Rule

- keep compute, file storage, and relational data responsibilities clearly separated

## 5. Persistence Boundaries

### Enterprise Relevance

Backend systems become more reliable when teams avoid mixing temporary server state with durable business data.

### Enterprise Rule

- do not let application instances become the accidental storage layer

## 6. Durability And Availability Awareness

### Enterprise Relevance

S3 and RDS offer strong managed durability characteristics, but application architecture still needs to respect service boundaries and failure modes.

### Enterprise Rule

- understand the durability and availability assumptions of each service before designing around it

## 7. Cost And Scaling Tradeoffs

### Enterprise Relevance

EC2 sizing, S3 usage, and RDS capacity all affect cost and scaling behavior.

### Enterprise Rule

- choose service configuration with workload and growth expectations in mind

## 8. Common Production Mistakes

### Common Mistakes

- storing user files only on EC2 instance disks
- using one EC2 host for too many unrelated responsibilities
- assuming managed RDS means database design no longer matters
- ignoring service-specific cost behavior
- mixing temporary compute state with durable data
- choosing services based on familiarity instead of workload fit

### Enterprise Rule

- match service choice to the real responsibility of the workload

## 9. Maintainability Rules

- separate compute, object storage, and relational persistence clearly
- keep file durability out of application instance storage
- treat RDS as managed infrastructure, not magical infrastructure
- make scaling and cost behavior visible
- keep service responsibilities understandable to the team
- use AWS building blocks intentionally rather than by habit

## 10. Suggested Code Scope

Inside the `code` folder, this topic can later include:

- EC2 workload-fit examples
- S3 file-storage examples
- RDS usage-fit examples
- compute vs storage boundary examples
- cost and scaling tradeoff examples
- service-misuse anti-pattern examples
- maintainable AWS architecture examples

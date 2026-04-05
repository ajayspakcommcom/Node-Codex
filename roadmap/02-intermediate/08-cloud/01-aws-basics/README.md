# AWS Basics For Enterprise Node.js And TypeScript

## Purpose

This topic is about understanding AWS basics in backend systems.

The goal is not only to name AWS services. The goal is to understand how enterprise teams think about cloud infrastructure, shared responsibility, managed services, scaling expectations, networking boundaries, and cost-awareness when deploying backend systems.

In enterprise systems, AWS basics matter because backend teams need to:

- understand where their application runs and what the platform manages for them
- choose managed services intentionally instead of guessing
- reason about networking, security, storage, and compute boundaries
- align deployment choices with reliability and operational needs
- avoid treating cloud usage as magic instead of infrastructure design

## What This Section Covers

- what cloud infrastructure changes
- shared responsibility awareness
- compute, storage, and database basics
- region and availability awareness
- cost and scaling basics
- IAM and security awareness
- operational visibility basics
- common production mistakes
- maintainability rules
- interview-style questions
- practice exercises

## Enterprise Context

Enterprise teams use AWS to reduce infrastructure friction, increase flexibility, and take advantage of managed building blocks. But those benefits only help when teams understand what they are responsible for and how their architectural choices affect cost, security, and operations.

Poor AWS understanding usually looks like:

- deploying services without understanding network or access boundaries
- assuming managed services remove all operational responsibility
- picking services without clear reasons
- ignoring cost behavior until it becomes a problem
- treating cloud configuration as separate from application design

The important question is not only "are we using AWS?" The real question is:

- are we choosing and operating AWS services with a clear understanding of security, responsibility, reliability, and cost tradeoffs

## 1. What Cloud Infrastructure Changes

### Enterprise Relevance

Cloud platforms change how teams provision, scale, and operate systems compared with self-managed servers.

### Enterprise Rule

- understand cloud services as infrastructure building blocks, not just as hosting labels

## 2. Shared Responsibility Awareness

### Enterprise Relevance

AWS manages some infrastructure layers, but application teams still own configuration, code security, data handling, and access control decisions.

### Enterprise Rule

- be explicit about what AWS manages and what the application team still owns

## 3. Compute, Storage, And Database Basics

### Enterprise Relevance

Most backend systems rely on some combination of compute, object storage, and managed database services.

### Enterprise Rule

- choose core cloud building blocks based on workload needs, not on popularity alone

## 4. Region And Availability Awareness

### Enterprise Relevance

Region and availability choices affect latency, resilience, compliance, and failure behavior.

### Enterprise Rule

- treat region and availability decisions as architectural inputs, not afterthoughts

## 5. Cost And Scaling Basics

### Enterprise Relevance

Cloud flexibility is valuable, but careless service use can create unnecessary cost or poor scaling behavior.

### Enterprise Rule

- make cost and scaling characteristics visible early instead of reacting only after usage grows

## 6. IAM And Security Awareness

### Enterprise Relevance

Identity and access decisions are central to safe AWS usage, especially in enterprise environments.

### Enterprise Rule

- treat IAM and access boundaries as first-class design concerns

## 7. Operational Visibility Basics

### Enterprise Relevance

Running in the cloud still requires logs, metrics, alerting, and operational review.

### Enterprise Rule

- do not assume managed infrastructure removes the need for monitoring and operational discipline

## 8. Common Production Mistakes

### Common Mistakes

- giving broad permissions without least-privilege thinking
- deploying services without understanding region or networking effects
- assuming managed services remove all responsibility
- ignoring cost behavior until late
- choosing services before clarifying workload needs
- treating cloud setup as separate from application architecture

### Enterprise Rule

- use AWS deliberately and with explicit responsibility boundaries

## 9. Maintainability Rules

- understand the responsibility boundary for each service you use
- keep security and access design explicit
- think about cost and scaling before traffic grows
- align service choice with workload needs
- keep cloud decisions visible in architecture discussions
- pair managed services with operational visibility

## 10. Suggested Code Scope

Inside the `code` folder, this topic can later include:

- AWS service-selection examples
- shared-responsibility examples
- region and availability awareness examples
- IAM boundary examples
- cost and scaling tradeoff examples
- cloud anti-pattern examples
- maintainable cloud decision examples

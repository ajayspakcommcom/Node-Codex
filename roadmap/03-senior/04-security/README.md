# Security

## Purpose

This section focuses on security as a system-level design concern.

At the senior level, security matters because large systems expose more attack surface, more secrets, and more trust boundaries across APIs, dashboards, infrastructure, and service-to-service communication.

## Topics

- OWASP Top 10
- CSRF, XSS, SQL injection
- secrets management
- token rotation

## Enterprise Pointers

- treat security as an architectural responsibility, not only a scanner result
- protect boundaries where untrusted input, secrets, and tokens flow
- make secret handling and rotation operationally safe
- design authentication and token lifecycle with compromise in mind
- reduce systemic risk through consistent security practices

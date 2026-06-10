# System Architecture Document

# Compensation Intelligence Platform

Version: 1.0

---

# 1. Architecture Overview

The Compensation Intelligence Platform follows a Layered Modular Monolith Architecture.

The system is organized into independent feature modules while maintaining a single deployable application.

### Architectural Goals

* Maintainability
* Scalability
* Separation of Concerns
* Reusability
* Testability
* Clean Code Principles

---

# 2. High Level Architecture

```text
Client
   │
   ▼
Express REST API
   │
   ▼
Routes
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Repositories
   │
   ▼
Prisma ORM
   │
   ▼
PostgreSQL (Neon)
```

---

# 3. Technology Stack

## Backend

```text
Node.js
Express.js
```

## Database

```text
PostgreSQL (Neon)
Prisma ORM
```

## Authentication

```text
JWT
bcryptjs
```

## Validation

```text
Zod
```

## Documentation

```text
Swagger
Postman Collection
```

## Containerization

```text
Docker
```

---

# 4. Project Structure

```text
src
│
├── config
├── constants
├── docs
├── middleware
├── utils
│
├── modules
│   ├── auth
│   ├── company
│   ├── role
│   ├── level
│   ├── location
│   ├── compensation
│   └── analytics
│
├── app.js
└── server.js

prisma
│
├── migrations
├── seed.js
├── compensation-seed.js
└── schema.prisma
```

---

# 5. Layered Architecture

## Route Layer

Responsibilities:

* Endpoint Registration
* Request Routing
* Middleware Integration

Example:

```text
POST /auth/login

GET /analytics/dashboard
```

---

## Controller Layer

Responsibilities:

* Receive Requests
* Call Service Layer
* Format API Responses

Example:

```text
auth.controller.js

analytics.controller.js
```

---

## Service Layer

Responsibilities:

* Business Logic
* Compensation Calculation
* Confidence Scoring
* Benchmark Analysis
* Company Comparison

Example:

```text
analytics.service.js

compensation.service.js
```

---

## Repository Layer

Responsibilities:

* Database Access
* Query Management
* Aggregations
* Pagination Queries

Example:

```text
analytics.repository.js

company.repository.js
```

---

## Database Layer

Responsibilities:

* Data Persistence
* Relationships
* Index Management

Technology:

```text
PostgreSQL + Prisma
```

---

# 6. Request Processing Flow

Example:

Create Compensation Submission

```text
Client

↓

POST /api/v1/compensations

↓

Validation Middleware

↓

Compensation Controller

↓

Compensation Service

↓

Confidence Scoring

↓

Repository Layer

↓

Prisma ORM

↓

PostgreSQL

↓

Response
```

---

# 7. Validation Architecture

The application uses Zod-based schema validation.

Validation occurs before business logic execution.

```text
Request

↓

Schema Validation

↓

Business Validation

↓

Controller

↓

Service
```

Validation Targets:

```text
Body

Query Parameters

Route Parameters
```

---

# 8. Authentication Architecture

Authentication Flow

```text
Register

↓

Hash Password

↓

Store User

↓

Login

↓

Verify Credentials

↓

Generate JWT

↓

Access Protected Routes
```

---

# 9. Authorization Architecture

Role-Based Access Control (RBAC)

Roles:

```text
USER

ADMIN
```

Used for:

```text
Protected APIs

Administrative Operations
```

---

# 10. Compensation Intelligence Engine

The platform evaluates compensation submissions using a confidence score.

### Scoring Factors

```text
Known Company     +20

Known Role        +15

Known Level       +15

Known Location    +15

Salary In Range   +20

Not Duplicate     +15
```

Maximum Score:

```text
100
```

---

### Status Mapping

```text
80 - 100

APPROVED

50 - 79

PENDING_REVIEW

0 - 49

FLAGGED
```

---

# 11. Analytics Architecture

The Analytics Module is the core intelligence layer of the platform.

---

## Company Analytics

Provides:

```text
Average Compensation

Median Compensation

Minimum Compensation

Maximum Compensation

Submission Count
```

Uses:

```text
Prisma Aggregate

Prisma GroupBy
```

---

## Benchmark Engine

Input:

```text
Role

Level

Location

Current Compensation
```

Process:

```text
Retrieve Similar Records

↓

Calculate Market Median

↓

Compare User Compensation

↓

Generate Insight
```

Output:

```text
UNDERPAID

FAIRLY_PAID

OVERPAID
```

---

## Company Comparison Engine

Compares:

```text
Company A

vs

Company B
```

Metrics:

```text
Average Compensation

Median Compensation

Submission Count
```

---

## Dashboard Analytics

Provides:

```text
Platform Statistics

Submission Metrics

Compensation Metrics

Recent Submissions

Pagination Metadata
```

---

# 12. Database Architecture

Database:

```text
PostgreSQL (Neon)
```

Primary Tables:

```text
Users

Companies

Roles

Levels

Locations

CompensationSubmissions

SubmissionAudits
```

---

# 13. Error Handling Strategy

Centralized Error Handling Middleware.

Error Types:

```text
Validation Error

Authentication Error

Authorization Error

Business Logic Error

Database Error
```

Response Format:

```json
{
  "success": false,
  "message": "Error Message"
}
```

---

# 14. Logging Strategy

Application Logging

```text
Morgan HTTP Logs

Request Logs

Error Logs
```

Development Monitoring

```text
Console Logging

Prisma Errors
```

---

# 15. Deployment Architecture

```text
Client

↓

Render Hosted API

↓

Express Application

↓

Prisma ORM

↓

Neon PostgreSQL
```

Supporting Services:

```text
Swagger Documentation

Docker Container

Postman Collection
```

---

# 16. Scalability Considerations

Current Architecture:

```text
Modular Monolith
```

Future Enhancements:

```text
Redis Caching

Queue Processing

Background Jobs

Analytics Caching

Microservices Migration
```

The current architecture is intentionally designed as a modular monolith to maximize development speed, maintainability, and simplicity while supporting future scaling requirements.

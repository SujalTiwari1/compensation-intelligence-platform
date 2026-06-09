# System Architecture Document

# Compensation Intelligence Platform

Version: 1.0

---

# 1. Architecture Overview

The Compensation Intelligence Platform follows a layered modular monolith architecture.

The architecture prioritizes:

* Maintainability
* Scalability
* Separation of Concerns
* Type Safety
* Testability

Architecture Flow:

Client

↓

API Routes

↓

Controllers

↓

Services

↓

Repositories

↓

PostgreSQL

---

# 2. High Level Request Flow

Example:

Submit Compensation

Client

↓

POST /api/v1/compensations

↓

Compensation Controller

↓

Compensation Service

↓

Validation Engine

↓

Confidence Scoring Engine

↓

Duplicate Detection Engine

↓

Repository Layer

↓

PostgreSQL

↓

Response

---

# 3. Module Breakdown

## Auth Module

Responsibilities:

* User Registration
* Login
* JWT Token Generation
* User Authentication

Dependencies:

* User Module

---

## Compensation Module

Responsibilities:

* Compensation Submission
* Compensation Update
* Validation
* Normalization

Dependencies:

* Company Module
* Analytics Module

---

## Company Module

Responsibilities:

* Company Information
* Company Statistics
* Aggregation Queries

---

## Analytics Module

Responsibilities:

* Benchmarking
* Compensation Comparison
* Aggregations
* Intelligence Reports

---

# 4. Layered Architecture

## Route Layer

Responsibilities:

* Endpoint Registration
* Request Routing

Example:

```ts
router.post("/compensations")
```

---

## Controller Layer

Responsibilities:

* Receive Requests
* Handle Responses
* Call Services

Example:

```ts
CompensationController.create()
```

---

## Service Layer

Responsibilities:

* Business Logic
* Validation
* Aggregations

Example:

```ts
CompensationService.create()
```

---

## Repository Layer

Responsibilities:

* Database Communication
* Query Management

Example:

```ts
CompensationRepository.create()
```

---

# 5. Validation Pipeline

Submission

↓

Schema Validation

↓

Business Validation

↓

Normalization

↓

Confidence Scoring

↓

Duplicate Detection

↓

Database Persistence

---

# 6. Confidence Scoring Engine

Scoring Factors

Known Company

+20

Known Role

+15

Known Level

+15

Valid Salary Range

+25

No Duplicate

+15

Complete Submission

+10

Maximum Score = 100

---

# 7. Duplicate Detection Flow

Submission

↓

Find Similar Records

↓

Compare:

* Company
* Role
* Level
* Location
* Compensation

↓

Similarity Score

↓

Duplicate Flag

---

# 8. Analytics Engine

Analytics Engine generates:

## Company Analytics

Average Base Salary

Average Bonus

Average Stock

Average Total Compensation

---

## Level Analytics

Average Compensation per Level

---

## Location Analytics

Average Compensation per Location

---

## Benchmark Analytics

Median Compensation

Market Benchmark

Underpaid Analysis

---

# 9. Underpaid Analysis Engine

Input:

Current Compensation

↓

Retrieve Market Median

↓

Calculate Difference

↓

Generate Insight

Example:

User Compensation = 20L

Market Median = 28L

Result:

28.5% Below Market

---

# 10. Database Architecture

Database: PostgreSQL

ORM: Prisma

Primary Tables:

* Users
* Companies
* Roles
* Levels
* Locations
* CompensationSubmissions

---

# 11. Security Architecture

Authentication:

JWT

Authorization:

Role Based Access Control

Validation:

Zod

Password Hashing:

bcrypt

Rate Limiting:

Express Rate Limit

---

# 12. Deployment Architecture

Frontend

↓

Vercel

Backend

↓

Railway

↓

Neon PostgreSQL

---

# 13. Logging Strategy

Application Logs

Request Logs

Error Logs

Analytics Logs

---

# 14. Error Handling Strategy

Centralized Error Handler

Types:

* Validation Error
* Authentication Error
* Authorization Error
* Database Error
* Business Logic Error

---

# 15. Scalability Considerations

Future Ready:

* Redis Caching
* Queue Processing
* Event Driven Analytics
* Microservices Migration

Current MVP:

Modular Monolith

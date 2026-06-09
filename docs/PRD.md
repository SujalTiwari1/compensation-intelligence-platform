# Product Requirements Document (PRD)

# Compensation Intelligence Platform

Version: 1.0

Role: Backend Engineer

Author: Sujal Tiwari

---

# 1. Executive Summary

Compensation Intelligence Platform is a data-driven backend system designed to collect, validate, normalize, analyze, and compare compensation data across companies, roles, levels, and locations.

Unlike traditional job portals, the platform focuses on compensation benchmarking and market intelligence.

The system enables users to:

* Submit compensation information
* Compare compensation across companies
* Analyze company-level compensation trends
* Determine whether they are underpaid or overpaid relative to market benchmarks
* Access structured compensation insights

The primary goal is to transform raw salary submissions into trustworthy compensation intelligence.

---

# 2. Problem Statement

Professionals often lack reliable compensation benchmarks when negotiating offers or evaluating their market value.

Existing platforms provide compensation data but rely heavily on crowdsourced submissions that may contain inconsistencies, duplicates, and inaccurate information.

Challenges include:

* Unstructured compensation submissions
* Duplicate entries
* Inconsistent company naming
* Lack of validation
* Difficulty comparing compensation across companies and levels

The platform aims to solve these issues through validation, normalization, confidence scoring, and analytics.

---

# 3. Product Vision

Build a reliable compensation intelligence engine that transforms user-submitted compensation data into actionable market insights.

---

# 4. Goals

## Business Goals

* Provide reliable compensation benchmarks
* Enable company-to-company comparisons
* Deliver market compensation intelligence

## Engineering Goals

* Clean API architecture
* Scalable database design
* Strong validation layer
* Reliable analytics pipeline

---

# 5. User Personas

## Persona 1 — Software Engineer

Goals:

* Compare compensation offers
* Understand market value
* Benchmark salary

---

## Persona 2 — Job Seeker

Goals:

* Evaluate offers
* Compare companies

---

## Persona 3 — Recruiter

Goals:

* Understand compensation trends
* Benchmark compensation packages

---

# 6. Core User Flows

## Flow 1: Compensation Submission

User

→ Submit Compensation

→ Validation

→ Confidence Scoring

→ Duplicate Detection

→ Store Submission

→ Update Analytics

---

## Flow 2: Compensation Comparison

User

→ Select Company A

→ Select Company B

→ Analytics Engine

→ Comparison Results

---

## Flow 3: Market Benchmarking

User

→ Enter Compensation

→ Benchmark Service

→ Market Comparison

→ Underpaid / Fairly Paid / Overpaid

---

# 7. Functional Requirements

## FR-1 Compensation Submission

Users can submit:

* Company
* Role
* Level
* Location
* Base Salary
* Bonus
* Stock

---

## FR-2 Validation Engine

Validate:

* Required fields
* Compensation ranges
* Company existence
* Level validity

---

## FR-3 Normalization Engine

Normalize:

Google

google

GOOGLE

Google LLC

↓

Google

---

## FR-4 Duplicate Detection

Detect duplicate submissions using:

* Company
* Role
* Level
* Location
* Compensation

---

## FR-5 Analytics Engine

Generate:

* Average compensation
* Median compensation
* Company benchmarks
* Role benchmarks
* Location benchmarks

---

## FR-6 Compensation Comparison

Compare:

* Company vs Company
* Level vs Level
* Role vs Role

---

## FR-7 Underpaid Analysis

Determine:

Current Compensation

vs

Market Compensation

---

# 8. Non Functional Requirements

* Response time < 500ms
* Pagination support
* Input validation
* RESTful architecture
* Type-safe APIs
* Scalable schema design

---

# 9. System Architecture

Client

↓

API Layer

↓

Validation Layer

↓

Business Logic Layer

↓

Analytics Layer

↓

Database Layer

↓

PostgreSQL

---

# 10. Core Modules

## Authentication Module

User registration

Login

JWT authentication

---

## Compensation Module

Submission management

Validation

Normalization

---

## Analytics Module

Aggregation

Benchmarking

Comparison

---

## Company Module

Company statistics

Compensation summaries

---

# 11. Database Design

## User

id

email

name

password

createdAt

---

## Company

id

name

normalizedName

createdAt

---

## Role

id

name

---

## Level

id

name

---

## Location

id

city

country

---

## CompensationSubmission

id

userId

companyId

roleId

levelId

locationId

baseSalary

bonus

stock

totalCompensation

confidenceScore

status

createdAt

---

# 12. ER Relationships

User

1 → N CompensationSubmission

Company

1 → N CompensationSubmission

Role

1 → N CompensationSubmission

Level

1 → N CompensationSubmission

Location

1 → N CompensationSubmission

---

# 13. Confidence Scoring System

## Score Factors

Known Company = +20

Known Role = +15

Known Level = +15

Valid Range = +25

No Duplicate = +15

Complete Submission = +10

Maximum Score = 100

---

## Status Logic

Score ≥ 80

APPROVED

Score 50–79

PENDING REVIEW

Score < 50

FLAGGED

---

# 14. Duplicate Detection Strategy

A submission is considered suspicious if:

Company matches

Role matches

Level matches

Location matches

Compensation within 5%

Recent submission window

Duplicate entries are flagged.

---

# 15. Analytics Engine

## Company Aggregation

Average Base Salary

Average Bonus

Average Stock

Average Total Compensation

Submission Count

---

## Level Aggregation

Average Compensation by Level

---

## Location Aggregation

Average Compensation by Location

---

## Market Benchmarking

Benchmark = Median Compensation

Result:

Below Market

At Market

Above Market

---

# 16. API Specification

## Authentication

POST /api/v1/auth/register

POST /api/v1/auth/login

GET /api/v1/auth/me

---

## Compensation

POST /api/v1/compensations

GET /api/v1/compensations

GET /api/v1/compensations/:id

PATCH /api/v1/compensations/:id

DELETE /api/v1/compensations/:id

---

## Companies

GET /api/v1/companies

GET /api/v1/companies/:id

GET /api/v1/companies/:id/analytics

---

## Analytics

GET /api/v1/analytics/company

GET /api/v1/analytics/location

GET /api/v1/analytics/level

GET /api/v1/analytics/benchmark

GET /api/v1/analytics/compare

---

## Admin

GET /api/v1/admin/submissions

PATCH /api/v1/admin/submissions/:id/status

---

# 17. Frontend Pages Supported

## Dashboard

Top Companies

Recent Statistics

Analytics Overview

---

## Submit Compensation

Compensation Form

---

## Compare Compensation

Company Comparison

Level Comparison

---

## Company Page

Company Statistics

Compensation Breakdown

---

# 18. Folder Structure

src/

├── modules/

│ ├── auth/

│ ├── compensation/

│ ├── analytics/

│ ├── companies/

│ └── users/

│

├── middleware/

├── validators/

├── repositories/

├── services/

├── prisma/

├── utils/

├── config/

└── app.ts

---

# 19. Seed Data Strategy

Initial dataset will be seeded using curated compensation records.

Seed includes:

* 10 Companies
* 5 Levels
* 3 Locations
* 200+ Compensation Records

Purpose:

* Analytics bootstrapping
* Validation reference
* Benchmark generation

---

# 20. Security Considerations

* JWT Authentication
* Password Hashing (bcrypt)
* Input Validation (Zod)
* Rate Limiting
* CORS Protection
* SQL Injection Protection via Prisma

---

# 21. Deployment Architecture

Frontend

→ Vercel

Backend

→ Railway / Render

Database

→ Neon PostgreSQL

---

# 22. Success Metrics

* 95% valid submission acceptance
* <500ms average API latency
* Accurate compensation benchmarking
* Reliable duplicate detection
* Successful compensation comparison workflows

---

# 23. Future Enhancements

* Email Verification
* Compensation Trend Forecasting
* AI Salary Insights
* Company Verification
* Offer Letter Verification
* Advanced Compensation Analytics
* Admin Review Dashboard

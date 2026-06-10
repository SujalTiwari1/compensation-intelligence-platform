# Compensation Intelligence Platform

[![CI Pipeline](https://github.com/SujalTiwari1/compensation-intelligence-platform/actions/workflows/ci.yaml/badge.svg)](https://github.com/SujalTiwari1/compensation-intelligence-platform/actions/workflows/ci.yaml)

A production-ready backend platform that enables users to submit compensation data, benchmark salaries against market trends, compare compensation across companies, and gain data-driven insights through analytics.

---

# Live Deployment

### Backend API

https://compensation-intelligence-platform.onrender.com

### Swagger Documentation

https://compensation-intelligence-platform.onrender.com/api-docs

---

# Project Overview

Compensation Intelligence Platform is designed to collect, validate, and analyze compensation data from professionals across multiple companies, job roles, experience levels, and locations.

The platform provides:

* Secure Authentication
* Compensation Submission
* Confidence Score Evaluation
* Benchmark Analytics
* Company Comparison
* Dashboard Analytics
* API Documentation
* Dockerized Deployment
* Automated Testing & CI

---

# Features

## Authentication & Security

* JWT Authentication
* Password Hashing using bcryptjs
* Role-Based Access Control (RBAC)
* Rate Limiting
* Request Validation using Zod

---

## Compensation Management

* Create Compensation Submission
* User Submission Tracking
* Confidence Score Generation
* Status Classification
* Duplicate Submission Detection
* Automatic Total Compensation Calculation

---

## Analytics Engine

### Company Analytics

Provides:

* Average Compensation
* Median Compensation
* Minimum Compensation
* Maximum Compensation
* Submission Count
* Status Breakdown
* Level Breakdown

---

### Market Benchmarking

Allows users to compare compensation against market data.

Provides:

* Market Average
* Market Median
* Percentage Difference
* Underpaid Detection
* Fairly Paid Detection
* Overpaid Detection

---

### Company Comparison

Compare two companies based on:

* Average Compensation
* Median Compensation
* Submission Count
* Compensation Range

---

### Dashboard Analytics

Provides:

* Platform Overview Metrics
* User Statistics
* Submission Statistics
* Compensation Statistics
* Recent Submissions
* Pagination Support

---

# System Architecture

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

# Tech Stack

## Backend

* Node.js
* Express.js

## Database

* PostgreSQL (Neon)
* Prisma ORM

## Authentication

* JWT
* bcryptjs

## Validation

* Zod

## Documentation

* Swagger UI
* Swagger JSDoc

## Testing

* Jest

## DevOps

* Docker
* GitHub Actions

---

# Project Structure

```text
src
│
├── config
├── constants
├── docs
├── middleware
├── routes
├── utils
│
├── modules
│   ├── auth
│   ├── analytics
│   ├── company
│   ├── role
│   ├── level
│   ├── location
│   └── compensation
│
├── app.js
└── server.js

prisma
│
├── migrations
├── seed.js
├── compensation-seed.js
└── schema.prisma

test
│
├── service
└── utils

.github
│
└── workflows
    └── ci.yml
```

---

# API Endpoints

## Authentication

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
```

---

## Companies

```http
GET /api/v1/companies
POST /api/v1/companies
```

---

## Roles

```http
GET /api/v1/roles
POST /api/v1/roles
```

---

## Levels

```http
GET /api/v1/levels
POST /api/v1/levels
```

---

## Locations

```http
GET /api/v1/locations
POST /api/v1/locations
```

---

## Compensation

```http
POST /api/v1/compensations

GET /api/v1/compensations/:id

GET /api/v1/compensations/my-submissions
```

---

## Analytics

```http
GET /api/v1/analytics/company/:companyId

GET /api/v1/analytics/benchmark

GET /api/v1/analytics/compare

GET /api/v1/analytics/dashboard
```

---

# Database Design

The system is built on a normalized relational schema.

Core Entities:

```text
Users

Companies

Roles

Levels

Locations

CompensationSubmissions

SubmissionAudits
```

Key Design Goals:

* Data Integrity
* Analytics Efficiency
* Scalability
* Maintainability

---

# Confidence Scoring Engine

Each compensation submission receives a confidence score.

Scoring Factors:

| Factor          | Score |
| --------------- | ----- |
| Company Exists  | +20   |
| Role Exists     | +15   |
| Level Exists    | +15   |
| Location Exists | +15   |
| Salary In Range | +20   |
| Not Duplicate   | +15   |

Maximum Score:

```text
100
```

Status Mapping:

```text
80 - 100 → APPROVED

50 - 79 → PENDING_REVIEW

0 - 49 → FLAGGED
```

---

# Testing

The project includes automated unit testing using Jest.

Current Coverage:

* Analytics Service
* Benchmark Utility
* Confidence Score Utility
* Median Calculation Utility

Run Tests:

```bash
npm test
```

---

# Code Quality

Run ESLint:

```bash
npm run lint
```

The project follows:

* Modular Architecture
* Layered Design
* Consistent Error Handling
* Input Validation
* Clean Code Principles

---

# CI/CD Pipeline

GitHub Actions automatically performs:

* Dependency Installation
* Prisma Client Generation
* ESLint Validation
* Jest Test Execution
* Docker Build Verification

Generated Artifacts:

* ESLint Report
* Test Report
* Coverage Report

Workflow File:

```text
.github/workflows/ci.yml
```

---

# Docker

## Build Image

```bash
docker build -t compensation-platform .
```

---

## Run Container

```bash
docker run -d \
-p 5000:5000 \
--env-file .env \
compensation-platform
```

---

# Local Setup

## Clone Repository

```bash
git clone <repository-url>

cd compensation-intelligence-platform
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment

Create a `.env` file:

```env
PORT=5000

DATABASE_URL=<your-neon-url>

JWT_SECRET=<your-secret>
```

---

## Generate Prisma Client

```bash
npx prisma generate
```

---

## Run Migrations

```bash
npx prisma migrate dev
```

---

## Seed Master Data

```bash
npm run seed
```

---

## Seed Compensation Data

```bash
npm run seed:compensation
```

---

## Start Application

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

---

# Documentation

Detailed project documentation is available in:

```text
docs
├── Architecture.md
├── API-Specification.md
└── Database-Design.md
```

---

# Project Highlights

* Layered Architecture
* Modular Monolith Design
* Prisma ORM
* PostgreSQL (Neon)
* JWT Authentication
* Zod Validation
* Swagger Documentation
* Jest Testing
* ESLint Integration
* GitHub Actions CI Pipeline
* Docker Containerization
* Benchmark Analytics Engine
* Company Comparison Engine
* Dashboard Analytics
* Confidence Scoring System

---

# Future Enhancements

Potential future improvements:

* Frontend Dashboard
* AI-Based Salary Prediction
* Compensation Trend Analysis
* Analytics Caching
* Offer Verification System
* Advanced Benchmark Models

---

# Author

**Sujal Tiwari**

---

# License

This project was developed as part of an internship assessment and is intended for educational and evaluation purposes.

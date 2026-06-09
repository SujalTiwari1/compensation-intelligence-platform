# API Specification

# Compensation Intelligence Platform

Version: 1.0

Base URL:

/api/v1

---

# Authentication APIs

## Register

POST /auth/register

Request

```json
{
  "name": "Sujal Tiwari",
  "email": "sujal@example.com",
  "password": "password123"
}
```

Response

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

## Login

POST /auth/login

Request

```json
{
  "email": "sujal@example.com",
  "password": "password123"
}
```

Response

```json
{
  "accessToken": "jwt-token",
  "user": {
    "id": 1,
    "name": "Sujal Tiwari"
  }
}
```

---

## Current User

GET /auth/me

Authorization Required

---

# Master Data APIs

These APIs provide reference data used by compensation submissions.

---

## Get Companies

GET /companies

Response

```json
[
  {
    "id": 1,
    "name": "Google"
  },
  {
    "id": 2,
    "name": "Amazon"
  }
]
```

---

## Create Company

POST /companies

Request

```json
{
  "name": "OpenAI"
}
```

Response

```json
{
  "id": 11,
  "name": "OpenAI"
}
```

---

## Get Roles

GET /roles

Response

```json
[
  {
    "id": 1,
    "name": "Backend Engineer"
  },
  {
    "id": 2,
    "name": "Frontend Engineer"
  }
]
```

---

## Get Levels

GET /levels

Response

```json
[
  {
    "id": 1,
    "name": "L3"
  },
  {
    "id": 2,
    "name": "L4"
  }
]
```

---

## Get Locations

GET /locations

Response

```json
[
  {
    "id": 1,
    "city": "Bangalore",
    "country": "India"
  }
]
```

---

# Compensation APIs

## Create Compensation Submission

POST /compensations

Authorization Required

Request

```json
{
  "companyId": 1,
  "roleId": 1,
  "levelId": 1,
  "locationId": 1,
  "baseSalary": 1800000,
  "bonus": 200000,
  "stock": 600000
}
```

Backend Automatically Calculates

```text
totalCompensation

confidenceScore

status
```

Response

```json
{
  "id": 101,
  "totalCompensation": 2600000,
  "confidenceScore": 92,
  "status": "APPROVED"
}
```

---

## Get Compensation Submissions

GET /compensations

Query Parameters

```text
companyId

roleId

levelId

locationId

minCompensation

maxCompensation

page

limit

sortBy

sortOrder
```

Example

```http
GET /compensations?companyId=1&levelId=2&page=1&limit=10
```

---

## Get Compensation Details

GET /compensations/:id

Response

```json
{
  "id": 101,
  "company": "Google",
  "role": "Backend Engineer",
  "level": "L3",
  "location": "Bangalore",
  "baseSalary": 1800000,
  "bonus": 200000,
  "stock": 600000,
  "totalCompensation": 2600000
}
```

---

## Update Compensation

PATCH /compensations/:id

Only Owner Can Update

---

## Delete Compensation

DELETE /compensations/:id

Only Owner Or Admin

---

# Company Analytics APIs

## Company Analytics

GET /companies/:companyId/analytics

Response

```json
{
  "company": "Google",

  "submissionCount": 150,

  "averageBaseSalary": 1900000,

  "averageBonus": 300000,

  "averageStock": 800000,

  "averageTC": 3000000,

  "medianTC": 2800000
}
```

---

## Company Compensation Distribution

GET /companies/:companyId/distribution

Response

```json
{
  "minTC": 1800000,
  "maxTC": 5000000,
  "medianTC": 2800000
}
```

---

# Benchmark APIs

## Market Benchmark

GET /analytics/benchmark

Query Parameters

```text
roleId

levelId

locationId

currentCompensation
```

Example

```http
GET /analytics/benchmark?roleId=1&levelId=2&locationId=1&currentCompensation=2000000
```

Response

```json
{
  "marketMedian": 2800000,

  "userCompensation": 2000000,

  "difference": -800000,

  "percentageDifference": -28.5,

  "status": "UNDERPAID"
}
```

---

# Comparison APIs

## Compare Companies

GET /analytics/compare/companies

Query Parameters

```text
companyA

companyB

roleId

levelId

locationId
```

Example

```http
GET /analytics/compare/companies?companyA=1&companyB=2&levelId=1
```

Response

```json
{
  "companyA": {
    "name": "Google",
    "averageTC": 3100000
  },

  "companyB": {
    "name": "Amazon",
    "averageTC": 2800000
  }
}
```

---

## Compare Levels

GET /analytics/compare/levels

Query Parameters

```text
levelA

levelB

companyId
```

---

# User APIs

## My Submissions

GET /users/me/submissions

Returns all compensation submissions created by the authenticated user.

---

## Submission Statistics

GET /users/me/statistics

Response

```json
{
  "totalSubmissions": 5,
  "approvedSubmissions": 4,
  "flaggedSubmissions": 1
}
```

---

# Admin APIs

## Review Submissions

GET /admin/submissions

Filters

```text
status

confidenceScore

companyId
```

---

## Update Submission Status

PATCH /admin/submissions/:id/status

Request

```json
{
  "status": "APPROVED"
}
```

Possible Values

```text
APPROVED

PENDING_REVIEW

FLAGGED

REJECTED
```

---

## Recalculate Confidence Score

POST /admin/submissions/:id/recalculate

Used when validation rules change.

---

# System APIs

## Health Check

GET /health

Response

```json
{
  "status": "healthy",
  "database": "connected"
}
```

---

# Standard Response Format

Success

```json
{
  "success": true,
  "data": {}
}
```

Error

```json
{
  "success": false,
  "message": "Validation Failed",
  "errors": []
}
```

---

# Pagination Format

```json
{
  "data": [],

  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 150,
    "totalPages": 15
  }
}
```

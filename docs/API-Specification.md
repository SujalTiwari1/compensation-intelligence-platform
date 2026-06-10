# API Specification

# Compensation Intelligence Platform

Version: 1.0

Base URL

```text
/api/v1
```

---

# Authentication APIs

## Register User

```http
POST /auth/register
```

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
  "message": "User registered successfully",
  "data": {
    "id": "uuid",
    "name": "Sujal Tiwari",
    "email": "sujal@example.com"
  }
}
```

---

## Login User

```http
POST /auth/login
```

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
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt-token",
    "user": {
      "id": "uuid",
      "name": "Sujal Tiwari",
      "email": "sujal@example.com",
      "role": "USER"
    }
  }
}
```

---

# Company APIs

## Get All Companies

```http
GET /companies?page=1&limit=10
```

Response

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Google"
    }
  ]
}
```

---

## Create Company

```http
POST /companies
```

Request

```json
{
  "name": "OpenAI"
}
```

---

# Role APIs

## Get Roles

```http
GET /roles?page=1&limit=10
```

---

## Create Role

```http
POST /roles
```

Request

```json
{
  "name": "Backend Engineer"
}
```

---

# Level APIs

## Get Levels

```http
GET /levels?page=1&limit=10
```

---

## Create Level

```http
POST /levels
```

Request

```json
{
  "name": "Senior"
}
```

---

# Location APIs

## Get Locations

```http
GET /locations?page=1&limit=10
```

---

## Create Location

```http
POST /locations
```

Request

```json
{
  "city": "Bangalore",
  "country": "India"
}
```

---

# Compensation APIs

## Create Compensation Submission

Authentication Required

```http
POST /compensations
```

Request

```json
{
  "companyId": 1,
  "roleId": 1,
  "levelId": 4,
  "locationId": 1,
  "baseSalary": 2500000,
  "bonus": 300000,
  "stock": 500000
}
```

System Generated

```text
totalCompensation
confidenceScore
status
verified
```

Response

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "totalCompensation": 3300000,
    "confidenceScore": 95,
    "status": "APPROVED"
  }
}
```

---

## Get Compensation By ID

```http
GET /compensations/:id
```

---

## Get My Submissions

Authentication Required

```http
GET /compensations/my-submissions?page=1&limit=10
```

Response

```json
{
  "success": true,
  "data": [],
  "pagination": {}
}
```

---

# Analytics APIs

## Company Analytics

```http
GET /analytics/company/:companyId
```

Response

```json
{
  "company": {
    "id": 1,
    "name": "Google"
  },
  "overview": {
    "totalSubmissions": 52
  },
  "compensation": {
    "average": 5400000,
    "median": 5000000,
    "minimum": 800000,
    "maximum": 18000000
  },
  "statusBreakdown": [],
  "levelBreakdown": []
}
```

---

## Market Benchmark

```http
GET /analytics/benchmark
```

Query Parameters

```text
roleId
levelId
locationId
currentCompensation
```

Example

```http
GET /analytics/benchmark?roleId=1&levelId=4&locationId=1&currentCompensation=2800000
```

Response

```json
{
  "market": {
    "average": 3400000,
    "median": 3200000,
    "sampleSize": 47
  },
  "comparison": {
    "currentCompensation": 2800000,
    "difference": -400000,
    "percentageDifference": -12.5,
    "status": "UNDERPAID"
  }
}
```

---

## Company Comparison

```http
GET /analytics/compare
```

Query Parameters

```text
companyA
companyB
```

Example

```http
GET /analytics/compare?companyA=1&companyB=2
```

Response

```json
{
  "companyA": {
    "name": "Google",
    "averageCompensation": 5200000,
    "medianCompensation": 4900000,
    "submissionCount": 54
  },
  "companyB": {
    "name": "Amazon",
    "averageCompensation": 4300000,
    "medianCompensation": 4100000,
    "submissionCount": 47
  },
  "winner": "Google"
}
```

---

## Dashboard Analytics

```http
GET /analytics/dashboard?page=1&limit=10
```

Response

```json
{
  "overview": {
    "totalCompanies": 10,
    "totalRoles": 5,
    "totalLevels": 6,
    "totalLocations": 5,
    "totalUsers": 5
  },
  "submissionStats": {
    "total": 500,
    "approved": 420,
    "pendingReview": 75,
    "flagged": 5
  },
  "compensationStats": {
    "average": 4800000,
    "minimum": 400000,
    "maximum": 25000000
  },
  "recentSubmissions": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 500,
    "totalPages": 50
  }
}
```

---

# Standard Success Response

```json
{
  "success": true,
  "message": "Request successful",
  "data": {}
}
```

---

# Standard Error Response

```json
{
  "success": false,
  "message": "Validation failed",
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
    "total": 500,
    "totalPages": 50
  }
}
```

# Database Design Document

# Compensation Intelligence Platform

Version: 1.0

Database: PostgreSQL (Neon)

ORM: Prisma ORM

---

# 1. Design Overview

The Compensation Intelligence Platform uses a relational database architecture optimized for:

* Data Integrity
* Compensation Analytics
* Benchmarking
* Company Comparison
* Scalability
* Maintainability

The system follows a normalized design where master entities (Company, Role, Level, Location) are stored separately and referenced by compensation submissions.

---

# 2. Entity Relationship Diagram

```text
User
 │
 └── CompensationSubmission
        │
        ├── Company
        ├── Role
        ├── Level
        └── Location
                │
                └── SubmissionAudit
```

---

# 3. Database Tables

## User

Stores authenticated platform users.

| Field     | Type     | Constraints  |
| --------- | -------- | ------------ |
| id        | UUID     | Primary Key  |
| name      | String   | Required     |
| email     | String   | Unique       |
| password  | String   | Hashed       |
| role      | Enum     | USER / ADMIN |
| createdAt | DateTime | Default Now  |
| updatedAt | DateTime | Auto Updated |

### Relationships

```text
User
1 → N CompensationSubmission
```

---

## Company

Stores standardized company information.

| Field          | Type     | Constraints |
| -------------- | -------- | ----------- |
| id             | Int      | Primary Key |
| name           | String   | Unique      |
| normalizedName | String   | Unique      |
| createdAt      | DateTime | Default Now |

### Relationships

```text
Company
1 → N CompensationSubmission
```

---

## Role

Stores standardized job roles.

| Field | Type   | Constraints |
| ----- | ------ | ----------- |
| id    | Int    | Primary Key |
| name  | String | Unique      |

### Sample Data

```text
Backend Engineer
Frontend Engineer
Full Stack Engineer
Data Engineer
ML Engineer
```

---

## Level

Stores career progression levels.

| Field | Type   | Constraints |
| ----- | ------ | ----------- |
| id    | Int    | Primary Key |
| name  | String | Unique      |

### Sample Data

```text
Intern
Junior
Mid
Senior
Staff
Principal
```

---

## Location

Stores compensation locations.

| Field   | Type   | Constraints |
| ------- | ------ | ----------- |
| id      | Int    | Primary Key |
| city    | String | Required    |
| country | String | Required    |

### Unique Constraint

```text
(city, country)
```

---

## CompensationSubmission

Core business entity.

Every compensation record submitted by users is stored here.

| Field             | Type          |
| ----------------- | ------------- |
| id                | UUID          |
| userId            | UUID          |
| companyId         | Int           |
| roleId            | Int           |
| levelId           | Int           |
| locationId        | Int           |
| baseSalary        | Decimal(12,2) |
| bonus             | Decimal(12,2) |
| stock             | Decimal(12,2) |
| totalCompensation | Decimal(12,2) |
| confidenceScore   | Integer       |
| verified          | Boolean       |
| status            | Enum          |
| source            | Enum          |
| createdAt         | DateTime      |
| updatedAt         | DateTime      |

---

### Total Compensation Formula

```text
Total Compensation =
Base Salary + Bonus + Stock
```

---

### Submission Status

```text
APPROVED
PENDING_REVIEW
FLAGGED
REJECTED
```

---

### Submission Source

```text
SYSTEM
USER
```

---

### Relationships

```text
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
```

---

## SubmissionAudit

Tracks moderation and status changes.

| Field          | Type     |
| -------------- | -------- |
| id             | UUID     |
| submissionId   | UUID     |
| actionBy       | String   |
| previousStatus | Enum     |
| newStatus      | Enum     |
| reason         | String   |
| createdAt      | DateTime |

---

# 4. Constraints

## Unique Constraints

User

```text
email
```

Company

```text
name
normalizedName
```

Role

```text
name
```

Level

```text
name
```

Location

```text
city + country
```

---

## Foreign Keys

CompensationSubmission requires:

```text
userId
companyId
roleId
levelId
locationId
```

to exist.

---

# 5. Indexing Strategy

### Single Column Indexes

CompensationSubmission

```text
companyId
roleId
levelId
locationId
status
createdAt
```

---

### Composite Index

```text
companyId
levelId
locationId
```

Used frequently in:

```text
Company Analytics
Benchmark Analytics
Company Comparison
```

---

# 6. Confidence Scoring

Every compensation submission receives a confidence score between:

```text
0 - 100
```

### Factors

| Factor                   | Score |
| ------------------------ | ----- |
| Company Exists           | +20   |
| Role Exists              | +15   |
| Level Exists             | +15   |
| Location Exists          | +15   |
| Salary In Expected Range | +20   |
| Not Duplicate            | +15   |

Maximum:

```text
100
```

---

### Status Mapping

```text
80 - 100 → APPROVED

50 - 79 → PENDING_REVIEW

0 - 49 → FLAGGED
```

---

# 7. Seed Data Strategy

The platform ships with master data and generated compensation records.

### Companies

```text
Google
Amazon
Microsoft
Meta
Netflix
Apple
Uber
Atlassian
Adobe
OpenAI
```

### Roles

```text
Backend Engineer
Frontend Engineer
Full Stack Engineer
Data Engineer
ML Engineer
```

### Levels

```text
Intern
Junior
Mid
Senior
Staff
Principal
```

### Locations

```text
Bangalore
Hyderabad
Mumbai
Pune
Delhi
```

### Compensation Records

```text
500+ Seeded Records
```

Purpose:

```text
Analytics
Benchmarking
Company Comparison
Dashboard Metrics
```

---

# 8. Analytics Query Strategy

Analytics are generated dynamically using Prisma Aggregations.

No dedicated analytics tables are maintained.

### Company Analytics

Uses:

```text
aggregate()
groupBy()
```

Calculates:

```text
Average Compensation
Median Compensation
Minimum Compensation
Maximum Compensation
Submission Count
```

---

### Benchmark Analytics

Uses compensation data filtered by:

```text
Role
Level
Location
```

Calculates:

```text
Market Average
Market Median
Percentage Difference
Compensation Status
```

---

### Company Comparison

Calculates:

```text
Average Compensation
Median Compensation
Submission Count
```

for two companies.

---

### Dashboard Analytics

Provides:

```text
Total Companies
Total Users
Total Submissions
Status Breakdown
Compensation Statistics
Recent Submissions
```

with pagination support.

---

# 9. Prisma ORM Strategy

The schema maps directly to Prisma Models.

Benefits:

* Type Safety
* Automatic Migrations
* Relationship Management
* Query Optimization
* Aggregate Operations
* Group By Operations

---

# 10. Future Enhancements

Potential improvements:

* Compensation Trend Analysis
* Offer Letter Verification
* Analytics Caching
* AI-Based Salary Prediction
* Compensation Forecasting
* Advanced Benchmark Models

These enhancements are intentionally excluded from the MVP to keep the platform focused on core compensation intelligence functionality.

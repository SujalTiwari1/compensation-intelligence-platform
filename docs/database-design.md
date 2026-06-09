# Database Design Document

# Compensation Intelligence Platform

Version: 1.0

Database: PostgreSQL

ORM: Prisma

---

# 1. Design Principles

The database is designed around four goals:

1. Data Integrity
2. Analytics Efficiency
3. Extensibility
4. Maintainability

The system uses normalized master entities and stores compensation submissions separately to ensure accurate aggregation and comparison.

---

# 2. Entity Relationship Diagram (ERD)

User

↓

CompensationSubmission

↓

Company

↓

Role

↓

Level

↓

Location

↓

SubmissionAudit

---

# 3. Database Tables

## User

Stores authenticated platform users.

### Fields

| Field     | Type     | Constraints  |
| --------- | -------- | ------------ |
| id        | UUID     | Primary Key  |
| name      | String   | Required     |
| email     | String   | Unique       |
| password  | String   | Hashed       |
| role      | Enum     | USER / ADMIN |
| createdAt | DateTime | Default Now  |
| updatedAt | DateTime | Auto Updated |

---

### Relationships

```text
User

1 → N CompensationSubmission
```

---

## Company

Stores standardized company information.

### Fields

| Field          | Type     | Constraints |
| -------------- | -------- | ----------- |
| id             | Int      | Primary Key |
| name           | String   | Unique      |
| normalizedName | String   | Unique      |
| createdAt      | DateTime | Default Now |

---

### Example

```text
Google

Amazon

Microsoft

OpenAI
```

---

### Relationships

```text
Company

1 → N CompensationSubmission
```

---

## Role

Stores standardized engineering roles.

### Fields

| Field | Type   | Constraints |
| ----- | ------ | ----------- |
| id    | Int    | Primary Key |
| name  | String | Unique      |

---

### Example

```text
Backend Engineer

Frontend Engineer

Data Engineer

ML Engineer
```

---

## Level

Stores employee levels.

### Fields

| Field | Type   | Constraints |
| ----- | ------ | ----------- |
| id    | Int    | Primary Key |
| name  | String | Unique      |

---

### Example

```text
L3

L4

L5

Senior

Staff
```

---

## Location

Stores compensation locations.

### Fields

| Field   | Type   | Constraints |
| ------- | ------ | ----------- |
| id      | Int    | Primary Key |
| city    | String | Required    |
| country | String | Required    |

---

### Example

```text
Bangalore

Hyderabad

Pune

Mumbai
```

---

## CompensationSubmission

Core table of the platform.

Every compensation report is stored here.

### Fields

| Field             | Type     |
| ----------------- | -------- |
| id                | UUID     |
| userId            | UUID     |
| companyId         | Int      |
| roleId            | Int      |
| levelId           | Int      |
| locationId        | Int      |
| baseSalary        | Decimal  |
| bonus             | Decimal  |
| stock             | Decimal  |
| totalCompensation | Decimal  |
| confidenceScore   | Int      |
| status            | Enum     |
| source            | Enum     |
| createdAt         | DateTime |
| updatedAt         | DateTime |

---

### Total Compensation Formula

```text
Total Compensation

=

Base Salary

+

Bonus

+

Stock
```

---

### Status Enum

```text
APPROVED

PENDING_REVIEW

FLAGGED

REJECTED
```

---

### Source Enum

```text
SYSTEM

USER
```

SYSTEM

Seeded data

USER

User submitted data

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

Tracks moderation history.

### Fields

| Field          | Type     |
| -------------- | -------- |
| id             | UUID     |
| submissionId   | UUID     |
| previousStatus | Enum     |
| newStatus      | Enum     |
| actionBy       | UUID     |
| reason         | String   |
| createdAt      | DateTime |

---

### Example

```text
Submission #101

PENDING_REVIEW

↓

APPROVED

By Admin
```

---

# 4. Database Constraints

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

---

## Foreign Key Constraints

CompensationSubmission

```text
userId

companyId

roleId

levelId

locationId
```

must exist.

---

# 5. Index Strategy

To optimize filtering and analytics.

### CompensationSubmission

Create indexes on:

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
Comparison

Benchmarking

Analytics
```

---

# 6. Confidence Scoring Storage

Stored in:

```text
confidenceScore
```

Range:

```text
0 - 100
```

---

### Scoring Factors

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

# 7. Duplicate Detection Strategy

Duplicate Check Inputs

```text
companyId

roleId

levelId

locationId

totalCompensation
```

Duplicate Window

```text
30 Days
```

Similarity Threshold

```text
95%
```

Flag suspicious entries.

---

# 8. Seed Data Strategy

Purpose

Provide sufficient data for analytics.

---

### Seed Companies

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

---

### Seed Roles

```text
Backend Engineer

Frontend Engineer

Full Stack Engineer

Data Engineer

ML Engineer
```

---

### Seed Levels

```text
L3

L4

L5

Senior

Staff
```

---

### Seed Locations

```text
Bangalore

Hyderabad

Pune

Mumbai

Delhi
```

---

### Seed Compensation Records

Target

```text
200 - 300 Records
```

Purpose

Enable:

* Analytics
* Benchmarking
* Comparisons

immediately after deployment.

---

# 9. Analytics Query Strategy

No analytics tables are stored.

Analytics are generated dynamically.

---

### Company Analytics

Calculate

```sql
AVG(baseSalary)

AVG(bonus)

AVG(stock)

AVG(totalCompensation)

COUNT(*)
```

---

### Benchmark Analytics

Calculate

```sql
Median Compensation
```

based on:

```text
Role

Level

Location
```

---

### Comparison Analytics

Compare:

```text
Company A

vs

Company B
```

using:

```text
Average TC

Median TC

Submission Count
```

---

# 10. Prisma Schema Strategy

Each table maps directly to a Prisma model.

Benefits

* Strong Type Safety
* Easy Relations
* Migration Support
* Query Optimization

---

# 11. Future Database Enhancements

Potential additions:

* Company Verification
* Offer Letter Verification
* Compensation Trends Table
* Analytics Cache Table
* Notification System
* Audit Event Streaming

These features are intentionally excluded from the MVP to maintain simplicity and focus on compensation intelligence.

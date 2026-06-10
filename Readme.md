# Compensation Intelligence Platform

A backend-driven compensation analytics platform that enables professionals to benchmark their salaries against market trends, compare compensation across companies, and gain actionable insights through data-driven analytics.

---

## Overview

Compensation Intelligence Platform is designed to collect, validate, and analyze compensation data from professionals across different companies, roles, levels, and locations.

The platform provides:

* Secure user authentication and authorization
* Compensation submission and validation
* Confidence scoring for data quality assessment
* Market benchmarking analytics
* Company compensation comparison
* Administrative dashboard analytics
* RESTful APIs with Swagger documentation

---

## Key Features

### Authentication & Authorization

* JWT-based authentication
* Role-based access control (RBAC)
* Secure password hashing with bcrypt
* Rate limiting protection

### Compensation Management

* Submit compensation information
* Automatic total compensation calculation
* Confidence score generation
* Duplicate submission detection
* Submission status tracking

### Analytics Engine

#### Company Analytics

* Average compensation
* Median compensation
* Minimum and maximum compensation
* Submission distribution
* Level-wise breakdown

#### Compensation Benchmarking

* Market median comparison
* Underpaid detection
* Overpaid detection
* Percentage difference calculation

#### Company Comparison

* Side-by-side company comparison
* Compensation metrics comparison
* Compensation leader identification

#### Dashboard Analytics

* Platform overview metrics
* Submission statistics
* Compensation insights
* Recent submissions with pagination

---

## Tech Stack

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL (Neon)
* Prisma ORM

### Authentication

* JWT
* bcryptjs

### Validation

* Zod

### API Documentation

* Swagger UI
* Swagger JSDoc

### Containerization

* Docker

### Testing

* Postman

---

## System Architecture

```text
Client
   |
   v
Express API
   |
Controllers
   |
Services
   |
Repositories
   |
Prisma ORM
   |
PostgreSQL (Neon)
```

---

## Project Structure

```text
src
├── config
├── constants
├── docs
├── middleware
├── modules
│   ├── auth
│   ├── analytics
│   ├── company
│   ├── role
│   ├── level
│   ├── location
│   └── compensation
├── routes
├── utils
└── app.js

prisma
├── migrations
├── seed.js
├── compensation-seed.js
├── data
└── helpers
```

---

## Core Modules

### Auth Module

* User Registration
* User Login
* JWT Authentication
* Role Authorization

### Master Data Module

* Companies
* Roles
* Levels
* Locations

### Compensation Module

* Create Submission
* View Submission
* View User Submissions
* Confidence Score Evaluation

### Analytics Module

* Company Analytics
* Benchmark Analytics
* Company Comparison
* Dashboard Analytics

---

## API Documentation

Swagger Documentation:

```text
http://localhost:5000/api-docs
```

Production:

```text
<DEPLOYMENT_URL>/api-docs
```

---

## Main Endpoints

### Authentication

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
```

### Compensation

```http
POST /api/v1/compensations
GET /api/v1/compensations/:id
GET /api/v1/compensations/my-submissions
```

### Analytics

```http
GET /api/v1/analytics/company/:companyId

GET /api/v1/analytics/benchmark

GET /api/v1/analytics/compare

GET /api/v1/analytics/dashboard
```

---

## Running Locally

### Clone Repository

```bash
git clone <repository-url>
cd compensation-intelligence-platform
```

### Install Dependencies

```bash
npm install
```

### Configure Environment

Create `.env`

```env
PORT=5000

DATABASE_URL=<your_neon_database_url>

JWT_SECRET=<your_jwt_secret>
```

### Run Migrations

```bash
npx prisma migrate dev
```

### Seed Database

```bash
npm run seed

npm run seed:compensation
```

### Start Application

```bash
npm run dev
```

---

## Docker

Build Image

```bash
docker build -t compensation-platform .
```

Run Container

```bash
docker run -d \
-p 5000:5000 \
--env-file .env \
compensation-platform
```

---

## Postman Collection

The project includes:

```text
postman/
├── Compensation-Intelligence-Platform.postman_collection.json
├── Compensation-Intelligence-Platform.postman_environment.json
```

Import both files into Postman for testing.

---

## Future Enhancements

* Frontend Dashboard
* Compensation Trend Analysis
* Advanced Benchmark Models
* Data Visualization
* Export Reports
* AI-Assisted Compensation Insights

---

## Author

**Sujal Tiwari**

Backend Developer | AI/ML Enthusiast | Full Stack Learner

---

## License

This project was developed as part of an internship selection assignment and is intended for educational and evaluation purposes.

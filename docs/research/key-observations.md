# Compensation Intelligence Platform - Research Findings

## Objective

Analyze leading compensation intelligence platforms and identify the most valuable features and architectural patterns to incorporate into the proposed Compensation Intelligence System.

---

## Platform 1: Levels.fyi

### Key Observations

* Compensation is treated as a combination of Base Salary, Bonus, and Equity rather than a single salary number.
* Employee level (L3, L4, E5, SDE2, etc.) is a stronger comparison metric than job title.
* Salary data is highly structured and standardized.
* Company-specific compensation benchmarks are a core user workflow.
* Location significantly impacts compensation and must be considered in comparisons.
* Data quality is maintained through structured submission flows.

### Takeaways

* Compensation should be stored as separate components.
* Level-based comparisons should be supported.
* Company and location should be first-class entities.

---

## Platform 2: 6figr

### Key Observations

* Strong emphasis on salary benchmarking and market positioning.
* Users are primarily interested in understanding whether they are underpaid or overpaid.
* Filtering and comparison experiences are central to the product.
* Compensation insights are presented through aggregated data.

### Takeaways

* Benchmarking features should be included.
* Compensation analytics should be built on aggregated datasets.
* Search and filtering APIs are critical.

---

## Platform 3: AmbitionBox

### Key Observations

* Large volume of salary reports from Indian companies.
* Includes reviews, interview experiences, and company insights.
* Salary information is useful but less structured compared to Levels.fyi.

### Takeaways

* Salary reporting remains valuable.
* Reviews and interview experiences are outside the scope of the MVP.
* Focus should remain on structured compensation intelligence.

---

## Platform 4: Glassdoor

### Key Observations

* Combines salaries, jobs, reviews, and interview experiences.
* Salary information is crowdsourced.
* Compensation data is only one part of a larger ecosystem.

### Takeaways

* Jobs and reviews add complexity without strengthening the compensation intelligence use case.
* The MVP should remain focused on compensation analytics.

---

# Cross-Platform Findings

Across all researched platforms, the most valuable features are:

1. Compensation submission
2. Salary search and filtering
3. Company-level compensation analytics
4. Compensation comparison
5. Market benchmarking

Less relevant features include:

* Job listings
* Company reviews
* Interview experiences
* Social interactions

---

# Product Direction

The proposed Compensation Intelligence System will focus on:

* Structured compensation submissions
* Data validation and normalization
* Compensation benchmarking
* Company-level analytics
* Compensation comparison
* Underpaid/overpaid analysis

The platform will not include:

* Job boards
* Company reviews
* Interview experiences
* Social networking features

This allows engineering effort to be concentrated on data quality, analytics, and backend architecture.

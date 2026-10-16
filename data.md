# Complete Portfolio Content — Professional Profile & Project Inventory

Master reference • October 2026 • Based on your CV, project documentation, and our previous discussions

This is the detailed source material for building your developer portfolio. It covers your professional identity, employment, project contributions, technical skills, achievements, and independent products.

I've separated confirmed accomplishments from details that still need verification. That way, you can give this information to Codex, Lovable, Replit, or another website builder without accidentally publishing exaggerated claims.

## 1. Professional identity

| Field                 | Information                                                                  |
| --------------------- | ---------------------------------------------------------------------------- |
| Full name             | Hicham Bel Houcin                                                            |
| Professional title    | Full-Stack Software Engineer                                                 |
| Location              | Casablanca, Morocco                                                          |
| Email                 | belhoucin.hicham\@gmail.com                                                  |
| Phone                 | +212 676793918                                                               |
| Existing portfolio    | [hicham-belhoucin.vercel.app](https://hicham-belhoucin.vercel.app)           |
| Main specializations  | Backend engineering, full-stack applications, production systems, automation |
| Additional experience | DevOps, security, data processing, technical SEO                             |

### Suggested portfolio headline

Full-Stack Software Engineer building scalable backend systems, enterprise applications, and data-driven products.

### About me

I'm a Full-Stack Software Engineer based in Casablanca, Morocco, with experience building backend systems, administrative platforms, client portals, and production web applications.

My work spans financial management systems, digital publishing platforms, streaming applications, and independent data-driven products.

I specialize in TypeScript, JavaScript, Python, NestJS, Django, React, Next.js, and PostgreSQL. Beyond application development, I work with authentication and security, data migration, third-party integrations, background processing, and production deployments.

At Disrupt, I've contributed to enterprise financial applications and digital publishing platforms, including developing the backend of L'Opinion from scratch and building a custom pipeline that migrated 60,000 historical articles and their metadata.

I enjoy taking complex business requirements and turning them into reliable, maintainable software. Outside my professional work, I build and operate independent products, including eFootball DB, a football gaming data and utility platform.

## 2. Career timeline

Full-Stack Developer — Disrupt

November 2024 – Present • Casablanca

Enterprise financial applications, newsroom CMS architecture, backend development, deployment, and reporting.

Front-End Developer & WordPress Specialist — Remote

July 2024 – October 2024

Nonprofit websites, WordPress migrations, responsive interfaces, and UX improvements.

Full-Stack Developer Intern — High Tech Vision

November 2023 – May 2024 • Casablanca

NestJS backend services and Next.js administrative backoffice for a bilingual streaming platform.

## 3. Flagship professional projects

### Valoris Management — Financial Management Platform

Django

PostgreSQL

Redis

Docker

MinIO

Nginx

Type: Enterprise financial services platform Company: Disrupt Your role: Backend developer, client portal and backoffice developer, production deployment

Project overview: A multi-component platform for financial management, fund information, client administration, document workflows, and internal business operations.

What you personally built: The complete Django backend, client portal, and administrative backoffice. The separate public-facing frontend was implemented by other developers.

Feature inventory

- Identity and security: JWT sessions, password recovery, TOTP two-factor authentication, role-based permissions, login throttling, audit trails, and controlled access to confidential documents.
- Client portal: Account management, financial dashboards, market news, document downloads, activity history, and client-staff communications.
- Administrative backoffice: Staff and client management, permissions, analytics, fund administration, exports, newsletters, and operational workflows.
- Fund data: Fund information, multilingual content, performance imports, ASFIM integration, KPI management, and public data APIs.
- Onboarding: Multi-step advisor onboarding with draft recovery, OTP verification, reminders, reports, and administrative review.
- Document automation: Authorized email ingestion, PDF/Excel attachment extraction, client matching, unmatched-document review, signed URLs, and encrypted storage.
- Operations: OpenAPI, structured logging, error reporting, soft deletion, rate limiting, and deployment configuration.

Infrastructure: The platform was deployed on Inwi's enterprise Virtual Data Center, using Docker and a layered reverse-proxy architecture involving Nginx and Caddy, with private PostgreSQL, Redis, and MinIO services. The documented environment also includes firewall and web application firewall controls.

Engineering challenges worth featuring: Managing multiple application components, enforcing secure document access, building automated document workflows, and operating a financial application within enterprise infrastructure.

Portfolio presentation: A full case study is justified. Focus on architecture, your specific ownership, workflow complexity, and the technical decisions behind security and document processing. Avoid screenshots exposing client or financial information.

### L'Opinion — Digital News Publishing Platform

NestJS

Prisma

PostgreSQL

Redis

Puppeteer

Docker

Type: Digital publishing and newsroom management Company: Disrupt Website: [lopinion.ma](https://www.lopinion.ma/) Your role: Backend architecture, CMS development, data migration, production deployment

Project overview: A publishing platform supporting editorial teams, journalists, articles, multimedia content, advertising, analytics, newsletters, and digital newspaper editions.

Your contributions:

- Designed and implemented the backend from scratch with NestJS, Prisma, and PostgreSQL.
- Developed and customized the newsroom CMS using an existing frontend template.
- Built article CRUD, drafts, revisions, scheduled publishing, author assignments, translations, category management, tags, and SEO metadata.
- Implemented administrator and journalist access control, Google OAuth, email verification, password recovery, and TOTP 2FA.
- Developed public article APIs, search and filtering, recommendations/suggestions, saved articles, and sitemap-related functionality.
- Built advertising campaign management, impression/click tracking, activation schedules, and reporting.
- Added podcasts, digital newspaper PDFs, flipbook integration, interactive media content, and moderation.
- Developed newsletter subscription and scheduled sending workflows.
- Integrated Google Analytics data into administrative dashboards.
- Implemented Redis caching, scheduled jobs, background processing, S3-compatible uploads, and production infrastructure.

Key measurable achievement

# 60,000 articles

Migrated with associated metadata using a custom Node.js and Puppeteer pipeline.

Migration problem: The previous publishing provider had no export functionality.

Your solution: You developed a scraping and migration process that extracted the historical articles and their metadata and transferred them to the replacement publishing system.

Portfolio case-study angle: Migrating 60,000 news articles from a legacy publishing platform without an export API.

This is an excellent opportunity to explain the problem, migration strategy, tooling, and final result without disclosing proprietary source code.

### Smart Report — Business Reporting Platform

Angular

Bold Reports

SQL

Type: Business reporting and analytics Company: Disrupt Your role: Contributing frontend and reporting developer

You contributed Angular application pages, customized report layouts, wrote SQL queries, and worked with reporting datasets using Bold Reports.

Portfolio positioning: A supporting professional project demonstrating SQL, data presentation, and reporting integration. It does not need a full case study unless you have more substantial technical examples to share.

### British Arab Community — Bilingual Streaming Platform

NestJS

Next.js

Prisma

PostgreSQL

Stripe

Material UI

Type: Streaming and community platform Company: High Tech Vision Period: November 2023 – May 2024 Your role: Full-Stack Developer Intern — backend and backoffice contributions

Project overview: An Arabic/English streaming platform featuring video programs, live broadcasts, premium subscriptions, editorial workflows, and customer support.

You confirmed contributing to all the documented backend and administrative backoffice capabilities, including:

- NestJS REST APIs, Prisma data access, JWT authentication, Google OAuth, and role-based authorization.
- Video delivery, watch-progress tracking, viewing history, show statistics, and genre-based recommendations.
- Live-stream scheduling, management, publishing, and media administration.
- Editorial submissions, approval workflows, contributor management, and show publishing.
- Stripe subscriptions, monthly/yearly plans, payment workflows, and premium-content gating.
- Support ticket creation, replies, status management, and staff administration.
- Next.js/Material UI dashboards for managing users, shows, contributors, live streams, and support tickets.
- File uploads, protected video serving, HTTP range-request support, and SendGrid email integration.
- English/Arabic localized data and content workflows.

The repository also contains Docker Compose and Nginx configuration; individual infrastructure ownership was not separately established.

Portfolio case-study angle: Building backend services and administrative workflows for a bilingual subscription-based streaming platform.

Present this as an internship contribution within a team, not as a solo product.

## 4. Independent projects

These projects show your ability to work outside client requirements, identify opportunities, and build products independently.

### eFootball DB — Football Gaming Database & Squad Builder

[eFootball DB - The best eFootball database experience](https://images.openai.com/static-rsc-4/YvIKhpdsN2CecfhcsGcse67SHepHOgtZIIlCfQVhVg5kcD4oLL4HP8cbd5X9TrPSroqP08ncFoFwDj_NpzITRqbhEyRjjl8PGt3BCf-VgKBe1-SMUOmmWVCicwqfcz8Vx2Iwzx-OdZKobNtrbDcVHBpZvOiCvVTuAwAS0VfC5yo?purpose=inline)

[efootballdb.com](https://www.efootballdb.com/2021)

Full-stack

Data-driven

SEO

Production

Website: [efootballdb.info](https://efootballdb.info) Role: Independent creator and developer Period: September 2026 – Present Status: Live, actively developed

Project description

eFootball DB is an independent gaming data platform that helps players explore player cards, analyze attributes, compare players, build squads, and discover game content.

It combines a searchable database with interactive utilities and community features. The live website currently shows player profiles, player comparison, a squad builder, card creation, rankings, managers, packs, and news.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://efootballdb.info\&sz=32)

eDB

+2



Documented functionality

- Searchable player and card database, including positions, ratings, attributes, skills, and alternate card versions.
- Player comparison with side-by-side attribute analysis.
- Player progression and training allocation tools, including position-rating calculations.
- Squad-building interface with formations, managers, and community squads.
- Player card creation tools.
- Player rankings, trending cards, and new releases.
- Manager information, playing styles, and game packs.
- eFootball news and updates.
- Multilingual routes, including English and Arabic.
- Search-engine-oriented player detail pages, localized metadata, sitemaps, and indexing improvements.

Your engineering work

Based on our development discussions, you've been working on:

- Frontend architecture, reusable UI components, and squad-builder functionality.
- Data sourcing, ingestion, and database expansion.
- Technical SEO, canonical URLs, hreflang, JSON-LD, sitemap generation, and indexing.
- Content Security Policy troubleshooting and security audits.
- Cloudflare configuration, traffic analysis, and deployment.
- Search Console performance analysis and iterative product improvements.

Technology note: Your recent project code references TypeScript, TSX, React-based components, and route-based frontend architecture. The exact current framework and backend stack should be verified from your repository before publishing a complete technology list.

Strong portfolio case-study themes: Interactive squad-building UI, structured player data, player progression calculations, multilingual SEO, and building a production product from scratch.

Current performance: The project was launched recently, and indexing has begun. Avoid publishing specific visitor or growth figures until they're taken from verified analytics.

### Auto Reliability — Automotive Reliability Intelligence

Astro

Python

PostgreSQL

Docker

Data pipelines

Website: [autoreliability.info](https://autoreliability.info) Role: Independent developer Status: Developed platform; current public deployment and operational status not independently verified here.

Project description

A data-driven automotive information platform focused on vehicle reliability, defects, complaints, and recalls, using data from the US National Highway Traffic Safety Administration (NHTSA).

Architecture and implementation documented in our discussions

- Python ingestion pipeline for NHTSA complaints and recalls.
- PostgreSQL 16 database with year/decade partitioning.
- JSONB storage and GIN indexes.
- Validation, retry handling, dead-letter queues, and idempotent upserts.
- Seed dataset covering 30 vehicle models from 2016–2022.
- Astro server-rendered vehicle reports, rankings, and directory search.
- SEO-friendly vehicle pages, structured data, sitemap, and robots configuration.
- Docker Compose deployment and development environments.
- Materialized views and database optimizations for reporting.

Portfolio case-study angle: Designing a reliable ingestion pipeline and searchable database for public automotive safety data.

This is especially relevant to Backend Engineering and Data Engineering opportunities.

### Instagram & YouTube Shorts Auto-Poster

Python

Selenium

Automation

Type: Personal automation project

Developed a browser automation tool for publishing video content to Instagram and YouTube Shorts, reducing repetitive manual publishing work.

Key areas include automated browser interactions, publishing workflows, and handling dynamic web interfaces.

This is a useful smaller project for showing automation skills, but eFootball DB and Auto Reliability deserve more prominence.

## 5. Additional experimental work

These projects were discussed during development, but they don't have the same level of verified implementation detail as your primary projects.

| Project                                 | What we documented                                                                                                                | Portfolio recommendation                                                                   |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| SIR TV BLA ADS                          | React Native/Expo streaming app, WebView integration, orientation handling, and match parsing with Cheerio                        | Experimental project, only feature if legally and technically appropriate                  |
| Oracle financial database investigation | Reverse engineering Oracle financial tables, valuation calculations, transaction relationships, and financial reporting workflows | Describe as a database analysis skill or anonymized case study, not as a completed product |
| YouTube explainer automation            | AI-assisted scripting, narration, editing, and content production workflows                                                       | Optional creative/automation section                                                       |

## 6. Education and languages

1337 Coding School — Khouribga, Morocco 2021 – Expected 2027 (from existing CV; verify current status) RNCP Level 6, Application Development

| Language  | Level                                               |
| --------- | --------------------------------------------------- |
| Arabic    | Native                                              |
| Tamazight | Native                                              |
| English   | Professional working proficiency (approximately B2) |
| French    | Beginner (A1), actively learning                    |

## 7. Consolidated technical skills

Programming languages

TypeScript · JavaScript · Python · SQL · C · C++

Frontend development

React · Next.js · Angular · Tailwind CSS · Material UI · HTML · CSS · Responsive UI

Backend engineering

NestJS · Django · Node.js · REST APIs · Authentication · Authorization · Background jobs · API integrations

Databases and data engineering

PostgreSQL · Prisma · Redis · SQL · ETL-style pipelines · Data migration · Web scraping · PDF/Excel processing

Infrastructure and deployment

Docker · Docker Compose · Nginx · Caddy · Linux/VPS · Inwi VDC · GitLab CI/CD · Cloudflare · S3-compatible storage · MinIO

Security and integrations

JWT · OAuth · TOTP/2FA · RBAC · CSRF · ModSecurity · OWASP CRS · Stripe · SendGrid · Twilio · Google Analytics

Automation and reporting

Puppeteer · Selenium · Python automation · Bold Reports · Scheduled publishing · Structured logging · OpenAPI

## 8. Recommended portfolio structure

I would organize your website around your strongest engineering work rather than displaying every project equally.

[Fiscaly – AI-Powered Financial Dashboard by Akhmad Maariz for dpopstudio on Dribbble](https://images.openai.com/static-rsc-4/omHv0SFzyVjgsxQtEv7IjJk_fyhX0lEViKgQvAEWhmdvD9v_c1HLojzAGZZSKN-X_uL4z1_1h1_kTjo0rXCEFjoEWTit3IBl32Rc5mkKDZwDz3SPuqpxsgivPJtLpHkPH3FOIg6PIiCKeN5N7Yc8ZJnkB3in4Crol4iJGLH_9_I?purpose=inline)

Featured case study 1 — Valoris Management

Enterprise financial application with substantial backend, backoffice, security, and deployment ownership.

[News management system Dashboard UI/UX design by Ashiouzzaman Real ✪ on Dribbble](https://images.openai.com/static-rsc-4/W9twAWG_EK9nsIjwAnphwKXvMgRSNB-UB3kGDw9KgjXuYWlN1OfosguykgLkQPmrfYLrCUXkKpSIsnhnqKlwS7l9GeZn50rHudNkZjrZrBzpZ5rjxwhLI0s74K5ACutcsyWOu82nxUoLpBUF3pmWsuss_N46D8wqPHyEAdAvlxo?purpose=inline)

Featured case study 2 — L'Opinion

Backend architecture and the 60,000-article migration achievement.

[eFootball - AR ➐ (@efootballpes_AR) on X](https://images.openai.com/static-rsc-4/UnVfZzQZ_qMrLk9A62fVtKJu1UyC8SlFa_RJrYdvN5l6P7KnbzJeL75EyPjvlBfHRk6qDzqvY_m-MDrK9LGOz_ga8MdcwCWFTaTNPq8LRhiuSbpxuf_j0NdOnEJzsjM_ksqk8FXL7wFaKKXQ33kI3IftlqnVXIKBx0ASTL3_CQE?purpose=inline)

Featured case study 3 — eFootball DB

Independent production product, interactive tools, structured data, and technical SEO.

[ADA - Automotive Recall Management & Fixed Ops Data Analytics](https://images.openai.com/static-rsc-4/JCOGtMB3fEEeJZVLdvV7NGEiZhNxw-BJRnPywchiLk0AOze_V4rHZwsaS595IGAS28uiak-WgPAnil_lrIhz0dlDGOI6Z83TLHaXg7rjspIXRGf80jN7ohk5x7jwlMmIBPd3OmJe3Ofw5dmgyShQKKQPYlPKNlGHgDv-P2uTrYE?purpose=inline)

Featured case study 4 — Auto Reliability

Python ingestion pipelines, PostgreSQL data modeling, and searchable public datasets.

Illustrative visual references above are not verified screenshots of your applications. Use your actual screenshots for the published portfolio.

Your remaining projects can appear in a compact Other Work section, with High Tech Vision prominently represented in your experience timeline.

## 9. Portfolio content priorities

For recruiters, the most persuasive aspects of your experience are:

- Ownership: You built significant application components, not just isolated UI screens.
- Production experience: You have deployed and maintained real applications.
- Technical complexity: Authentication, security, financial workflows, data migration, and backend architecture.
- Measurable impact: Your 60,000-article migration is a strong documented achievement.
- Independent initiative: eFootball DB and Auto Reliability demonstrate your ability to build products outside your employment.
- Breadth: Financial services, publishing, streaming, reporting, automotive data, and gaming tools.

A portfolio builder should use the project details above as source material, not assume that every technology mentioned was used in every project. It should also distinguish your own contributions from the work of colleagues.
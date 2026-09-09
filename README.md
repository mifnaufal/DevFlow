# DevFlow — AI-Native Engineering Operating System

> **Unified engineering workspace where every project, issue, code change, document, deployment, and decision becomes searchable, connected, and understandable.**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5-white)](https://prisma.io/)

---

## 📖 Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Target Users](#target-users)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**DevFlow** is a multi-tenant B2B SaaS platform that combines:

- ✅ Project Management (Linear/Jira-like)
- ✅ GitHub Integration (PRs, Commits, Deployments)
- ✅ Engineering Analytics (Velocity, Cycle Time, DORA metrics)
- ✅ Documentation Hub (Notion-like with RAG)
- ✅ AI Assistant (Context-aware insights)
- ✅ Real-time Collaboration
- ✅ Subscription Billing (Stripe)

Into a **single unified workspace** for software development teams.

### Vision

> Build an AI-native engineering operating system where work management, source-control activity, documentation, deployments, analytics, and AI context are seamlessly connected.

---

## ❌ Problem Statement

Engineering teams distribute information across:

| Tool | Purpose | Problem |
|------|---------|---------|
| GitHub | Code & PRs | Status disconnected from issues |
| Jira/Linear | Project Management | Manual reporting, no code context |
| Slack | Communication | Lost decisions, no searchability |
| Notion | Documentation | Disconnected from workflow |
| Spreadsheets | Reporting | Manual, error-prone, outdated |

### Key Pain Points

1. **Fragmented Information** — Issue status doesn't reflect PR/deployment reality
2. **Manual Reporting** — Managers spend hours creating sprint/project reports
3. **Poor Visibility** — Can't see why projects are blocked
4. **Disconnected Docs** — Documentation lives separately from development
5. **Context-Less AI** — Generic AI doesn't understand your org's structure/history

---

## ✅ Solution

DevFlow connects all data sources into one intelligent workspace:

```
┌─────────────────────────────────────────────────────────────┐
│                      DEVFLOW                                │
│                                                             │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐              │
│  │ PROJECTS │◄──►│   CODE   │◄──►│   DOCS   │              │
│  │          │    │          │    │          │              │
│  │ Issues   │    │ GitHub   │    │ Knowledge│              │
│  │ Sprints  │    │ PRs      │    │ Documents│              │
│  │ Milestone│    │ Commits  │    │ Search   │              │
│  └──────────┘    └──────────┘    └──────────┘              │
│       │                │                │                   │
│       └────────────────┼────────────────┘                   │
│                        │                                    │
│                   ┌────▼────┐                               │
│                   │ ANALYTICS│                              │
│                   │          │                              │
│                   │ Metrics  │                              │
│                   │ Risks    │                              │
│                   └────┬────┘                               │
│                        │                                    │
│                   ┌────▼────┐                               │
│                   │   AI    │                               │
│                   │         │                               │
│                   │Summary  │Insights  │Actions             │
│                   └─────────┘                               │
└─────────────────────────────────────────────────────────────┘
```

### Key Differentiators

- **Auto-linking**: PRs automatically link to issues via commit messages
- **Smart Status**: Issue auto-completes when PR merges
- **AI Context**: AI understands your org structure, history, and codebase
- **RAG Search**: Semantic search across issues, docs, PRs, comments
- **Real-time**: Live updates when teammates make changes
- **Multi-tenant**: Secure organization isolation with RBAC

---

## 👥 Target Users

### Persona A: Developer
**Needs:** Clear tasks, GitHub integration, minimal admin  
**Question:** *"What do I need to work on next?"*

### Persona B: Engineering Manager
**Needs:** Team progress, sprint metrics, blockers, reports  
**Question:** *"Is the team/project on track?"*

### Persona C: Tech Lead
**Needs:** Technical visibility, PR activity, architecture docs  
**Question:** *"What technical risks are emerging?"*

### Persona D: Organization Owner
**Needs:** Billing, users, permissions, security  
**Question:** *"Is the organization operating securely and efficiently?"*

---

## 🚀 Core Features

### MVP (Days 1-10)

| Module | Features |
|--------|----------|
| **Authentication** | Email/password, sessions, password reset, email verification |
| **Organizations** | Multi-tenancy, teams, roles (OWNER/ADMIN/MANAGER/MEMBER/VIEWER) |
| **Projects** | Create, edit, archive, project members, milestones |
| **Issues** | Full lifecycle, labels, comments, attachments, activity log |
| **Kanban Board** | Drag-drop, optimistic updates, real-time sync |
| **Sprints** | Sprint planning, velocity, burndown charts, carry-over |
| **GitHub Integration** | OAuth, repos, PRs, commits, webhooks, auto-linking |
| **Billing** | Stripe subscriptions, plans (Free/Pro/Business), usage metering |
| **AI Assistant** | Issue generation, sprint summaries, project health analysis |
| **Documentation** | Markdown docs, file upload, RAG search, version history |

### V1 (Post-MVP)

- Public API with API keys
- Customer webhooks
- Audit logs
- Advanced analytics (DORA metrics)
- Command palette (⌘K)
- Deployment tracking
- Real-time presence

### V2 (Future)

- Slack/Discord/Teams integrations
- Linear/Jira import
- GitLab support
- Advanced AI agents
- Automated risk prediction
- Enterprise SSO/SCIM
- Custom dashboards

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS + shadcn/ui
- **State:** React Query + Zustand
- **Real-time:** Socket.io / Pusher
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts / Visx

### Backend
- **Runtime:** Node.js 20
- **API:** Next.js Server Actions / tRPC
- **Database:** PostgreSQL 15
- **ORM:** Prisma 5
- **Cache:** Redis 7
- **Queue:** BullMQ
- **Search:** Typesense / Meilisearch
- **Vector DB:** pgvector / Pinecone

### Infrastructure
- **Auth:** NextAuth.js / Lucia
- **Payments:** Stripe
- **Email:** Resend / SendGrid
- **Storage:** AWS S3 / Cloudflare R2
- **AI:** OpenAI GPT-4 / Anthropic Claude
- **Monitoring:** Sentry + Datadog
- **CI/CD:** GitHub Actions
- **Deploy:** Vercel / Railway / Fly.io

### DevOps
- **Container:** Docker + Docker Compose
- **Monorepo:** Turborepo
- **Testing:** Vitest + Playwright
- **Lint:** ESLint + Prettier
- **Type Check:** TypeScript

---

## 🏗️ Architecture

### System Architecture

```
                    ┌─────────────┐
                    │   CLIENT    │
                    │  (Browser)  │
                    └──────┬──────┘
                           │ HTTPS
                           ▼
                    ┌─────────────┐
                    │   CDN       │
                    │ (Vercel)    │
                    └──────┬──────┘
                           │
                           ▼
┌──────────────────────────────────────────────────┐
│              NEXT.JS APPLICATION                 │
│                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────┐ │
│  │   Pages     │  │   API       │  │  Workers │ │
│  │   (SSR)     │  │  Routes     │  │  (Bull)  │ │
│  └─────────────┘  └─────────────┘  └──────────┘ │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │           SERVER ACTIONS                 │   │
│  │  (Authentication, Authorization, Logic)  │   │
│  └──────────────────────────────────────────┘   │
└───────────────────┬──────────────────────────────┘
                    │
        ┌───────────┼───────────┐
        │           │           │
        ▼           ▼           ▼
┌──────────────┐ ┌──────┐ ┌──────────┐
│  PostgreSQL  │ │Redis │ │  S3/R2   │
│  (Prisma)    │ │Cache │ │ Storage  │
└──────┬───────┘ └──────┘ └──────────┘
       │
       ▼
┌──────────────┐
│   pgvector   │
│  (Embeddings)│
└──────────────┘

External Services:
┌──────────┐  ┌─────────┐  ┌──────────┐  ┌────────┐
│  GitHub  │  │ Stripe  │  │ OpenAI   │  │ Resend │
│  (OAuth) │  │Payments │  │   AI     │  │ Email  │
└──────────┘  └─────────┘  └──────────┘  └────────┘
```

### Data Flow Example: Issue Creation

```
User clicks "Create Issue"
        ↓
Form validation (Zod)
        ↓
Server Action
        ↓
Authorization check (RBAC)
        ↓
Database transaction (Prisma)
        ↓
Activity log created
        ↓
Real-time broadcast (Socket)
        ↓
Optimistic UI update
        ↓
Success notification
```

### Tenant Isolation

**Critical Security Requirement:** Every query must be scoped to the user's organization.

```typescript
// ❌ BAD - No tenant isolation
const issue = await db.issue.findUnique({ where: { id } });

// ✅ GOOD - Organization-scoped
const issue = await db.issue.findFirst({
  where: {
    id,
    project: {
      organization: {
        members: {
          some: { userId: currentUser.id }
        }
      }
    }
  }
});
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- pnpm 8+ or npm 9+
- Docker & Docker Compose
- Git

### Quick Start

```bash
# 1. Clone repository
git clone https://github.com/your-org/devflow.git
cd devflow

# 2. Install dependencies
pnpm install

# 3. Start infrastructure (PostgreSQL, Redis)
docker-compose up -d

# 4. Copy environment variables
cp .env.example .env.local

# 5. Run database migrations
pnpm db:migrate

# 6. Seed development data (optional)
pnpm db:seed

# 7. Start development server
pnpm dev

# 8. Open browser
open http://localhost:3000
```

### Environment Variables

Create `.env.local`:

```bash
# Database
DATABASE_URL="postgresql://devflow:devflow@localhost:5432/devflow?schema=public"

# Redis
REDIS_URL="redis://localhost:6379"

# Authentication
AUTH_SECRET="your-secret-key-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"

# GitHub OAuth (for GitHub login & integration)
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
GITHUB_WEBHOOK_SECRET="your-webhook-secret"

# Stripe (for billing)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRICE_ID_PRO="price_..."
STRIPE_PRICE_ID_BUSINESS="price_..."

# AI (OpenAI)
OPENAI_API_KEY="sk-..."

# Storage (S3-compatible)
STORAGE_ENDPOINT="..."
STORAGE_ACCESS_KEY="..."
STORAGE_SECRET_KEY="..."
STORAGE_BUCKET="devflow-uploads"

# Email
RESEND_API_KEY="re_..."
FROM_EMAIL="noreply@devflow.com"

# Feature Flags
NEXT_PUBLIC_AI_ENABLED=true
NEXT_PUBLIC_GITHUB_ENABLED=true
NEXT_PUBLIC_BILLING_ENABLED=false
```

---

## 📁 Project Structure

```
devflow/
│
├── apps/
│   ├── web/                    # Next.js frontend application
│   │   ├── app/                # App Router pages
│   │   │   ├── (auth)/         # Auth pages (login, register)
│   │   │   ├── (dashboard)/    # Protected dashboard pages
│   │   │   ├── api/            # API routes
│   │   │   └── layout.tsx      # Root layout
│   │   ├── components/         # React components
│   │   │   ├── ui/             # Base UI components (shadcn)
│   │   │   ├── forms/          # Form components
│   │   │   ├── kanban/         # Kanban board components
│   │   │   └── ...
│   │   ├── lib/                # Utilities
│   │   │   ├── auth.ts         # Authentication logic
│   │   │   ├── prisma.ts       # Prisma client
│   │   │   └── utils.ts        # Helpers
│   │   └── hooks/              # Custom React hooks
│   │
│   └── worker/                 # Background job processor
│       ├── jobs/               # Job definitions
│       │   ├── github.ts       # GitHub webhook processing
│       │   ├── ai.ts           # AI tasks
│       │   ├── email.ts        # Email sending
│       │   └── documents.ts    # Document processing
│       └── index.ts            # Worker entry point
│
├── packages/
│   ├── database/               # Prisma schema & client
│   │   ├── schema.prisma       # Database schema
│   │   ├── migrations/         # Migration files
│   │   └── src/
│   │       ├── client.ts       # Prisma client export
│   │       └── seed.ts         # Seed data
│   │
│   ├── auth/                   # Authentication package
│   │   ├── src/
│   │   │   ├── session.ts      # Session management
│   │   │   ├── password.ts     # Password hashing
│   │   │   └── tokens.ts       # Token generation
│   │   └── index.ts
│   │
│   ├── api/                    # Shared API utilities
│   │   ├── src/
│   │   │   ├── errors.ts       # Error classes
│   │   │   ├── response.ts     # Response helpers
│   │   │   └── validation.ts   # Zod schemas
│   │   └── index.ts
│   │
│   ├── ui/                     # Shared UI components
│   │   ├── src/
│   │   │   ├── button.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   └── index.ts
│   │
│   ├── config/                 # Shared configurations
│   │   ├── eslint-config/
│   │   ├── typescript-config/
│   │   └── tailwind-config/
│   │
│   └── types/                  # Shared TypeScript types
│       └── src/
│           ├── api.ts
│           ├── models.ts
│           └── index.ts
│
├── tests/
│   ├── e2e/                    # Playwright E2E tests
│   ├── integration/            # Integration tests
│   └── unit/                   # Unit tests
│
├── prisma/                     # Prisma files (symlink to packages/database)
│
├── docker-compose.yml          # Local infrastructure
├── turbo.json                  # Turborepo configuration
├── package.json                # Root package.json
├── tsconfig.json               # TypeScript configuration
├── .eslintrc.js                # ESLint configuration
├── .prettierrc                 # Prettier configuration
└── README.md                   # This file
```

---

## 💻 Development

### Available Scripts

```bash
# Install dependencies
pnpm install

# Start all apps in development mode
pnpm dev

# Start only web app
pnpm dev --filter=web

# Start only worker
pnpm dev --filter=worker

# Database commands
pnpm db:migrate          # Run migrations
pnpm db:generate         # Generate Prisma client
pnpm db:seed             # Seed development data
pnpm db:studio           # Open Prisma Studio
pnpm db:reset            # Reset database

# Testing
pnpm test                # Run all tests
pnpm test:unit           # Run unit tests
pnpm test:e2e            # Run E2E tests
pnpm test:coverage       # Run tests with coverage

# Code quality
pnpm lint                # Run ESLint
pnpm lint:fix            # Fix ESLint errors
pnpm format              # Format with Prettier
pnpm typecheck           # TypeScript type check

# Build
pnpm build               # Build all apps
pnpm build:web           # Build web app only
pnpm build:worker        # Build worker only

# Production
pnpm start               # Start production server
```

### Monorepo Commands (Turborepo)

```bash
# Run command in specific package
pnpm --filter=web dev
pnpm --filter=@devflow/database db:migrate

# Run command in all packages
pnpm run build

# Run command affected by changes
pnpm run build --since=main
```

### Database Development

```bash
# View schema
cat packages/database/schema.prisma

# Create new migration
pnpm prisma migrate dev --name add_issue_labels

# Reset database (WARNING: deletes all data)
pnpm prisma migrate reset

# Open Prisma Studio (visual database editor)
pnpm prisma studio
```

### Running Tests

```bash
# Unit tests (Vitest)
pnpm test:unit

# Integration tests
pnpm test:integration

# E2E tests (Playwright)
pnpm test:e2e

# Watch mode
pnpm test -- --watch

# Specific test file
pnpm test tests/unit/auth.test.ts
```

### Code Style

```bash
# Check code style
pnpm lint

# Fix auto-fixable issues
pnpm lint:fix

# Format all files
pnpm format

# Type check
pnpm typecheck
```

---

## 🚢 Deployment

### Environment Setup

Production environment variables (use your platform's secret manager):

```bash
# Required for production
DATABASE_URL=           # Production PostgreSQL
REDIS_URL=              # Production Redis
AUTH_SECRET=            # Random 32+ char secret
NEXTAUTH_URL=           # Your production domain

# Optional features
GITHUB_CLIENT_ID=       # GitHub OAuth
GITHUB_CLIENT_SECRET=
STRIPE_SECRET_KEY=      # Stripe live keys
STRIPE_WEBHOOK_SECRET=
OPENAI_API_KEY=         # OpenAI API key
RESEND_API_KEY=         # Email service
STORAGE_*               # Object storage credentials
```

### Deployment Options

#### Option 1: Vercel (Recommended for Web)

```bash
# Connect to Vercel
vercel link

# Deploy
vercel --prod
```

**Environment Variables in Vercel:**
- Add all required env vars in Vercel dashboard
- Enable PostgreSQL addon (or use external)
- Enable Redis addon (or use external)

#### Option 2: Railway

```bash
# Deploy to Railway
railway up
```

Railway provides managed PostgreSQL and Redis.

#### Option 3: Docker

```bash
# Build Docker image
docker build -t devflow-web ./apps/web

# Run with docker-compose
docker-compose -f docker-compose.prod.yml up -d
```

### Database Migrations in Production

```bash
# Run migrations before deploying new version
pnpm prisma migrate deploy

# Verify migration
pnpm prisma migrate status
```

### CI/CD Pipeline (GitHub Actions)

Every PR triggers:

```yaml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm typecheck
      - run: pnpm test
      - run: pnpm build
```

Production deployment on main branch:

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install
      - run: pnpm build
      - run: pnpm prisma migrate deploy
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 🧩 Contributing

We welcome contributions! Please follow these steps:

### 1. Fork and Clone

```bash
git fork https://github.com/your-org/devflow
git clone https://github.com/your-username/devflow.git
cd devflow
```

### 2. Create Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Make Changes

- Follow existing code style
- Write tests for new features
- Update documentation as needed

### 4. Test Locally

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

### 5. Commit

```bash
git add .
git commit -m "feat: add your feature description"

# Commit message format:
# feat: new feature
# fix: bug fix
# docs: documentation
# style: formatting
# refactor: code refactoring
# test: adding tests
# chore: maintenance
```

### 6. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then open a Pull Request on GitHub.

### 7. Code Review

- Respond to reviewer feedback
- Make requested changes
- Ensure CI passes

### Contribution Guidelines

- **Features:** Must include tests and documentation
- **Bug Fixes:** Include regression test
- **Performance:** Benchmark if optimizing
- **Security:** Never commit secrets
- **Accessibility:** Follow WCAG guidelines

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 📞 Support

- **Documentation:** https://docs.devflow.com
- **Discord:** https://discord.gg/devflow
- **Twitter:** @devflow
- **Email:** support@devflow.com

---

## 🙏 Acknowledgments

Inspired by:
- Linear (project management)
- GitHub (code collaboration)
- Notion (documentation)
- Retool (developer tools)
- Vercel (DX)

Built with love by the DevFlow team. ❤️

---

## 📈 Roadmap

### Q1 2025 (MVP)
- ✅ Core project management
- ✅ GitHub integration
- ✅ Basic AI features
- ✅ Subscription billing

### Q2 2025 (V1)
- ⏳ Public API
- ⏳ Advanced analytics
- ⏳ Team collaboration features
- ⏳ Mobile responsive design

### Q3 2025 (V2)
- 🔮 Slack/Discord integrations
- 🔮 Advanced AI agents
- 🔮 Enterprise features (SSO, SCIM)
- 🔮 Marketplace for extensions

---

**Made with ❤️ for engineering teams everywhere**

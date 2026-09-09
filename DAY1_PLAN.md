# DevFlow — Day 1 Plan: Foundation Setup

## Objective
Establish the complete development foundation including monorepo structure, Next.js application, PostgreSQL database, Prisma ORM, authentication system, base database schema, and CI pipeline.

---

## Success Criteria for Day 1

By end of day, you should have:

- ✅ Monorepo with Turborepo configured
- ✅ Next.js app running locally
- ✅ PostgreSQL database running (Docker)
- ✅ Prisma schema with core tables defined
- ✅ Database migrations executed successfully
- ✅ Authentication system (email/password + sessions)
- ✅ User can register, login, logout
- ✅ Protected routes working
- ✅ CI pipeline running lint, typecheck, tests, build
- ✅ README with setup instructions

---

## Time-Boxed Schedule

### Morning Block (4 hours)

#### Hour 1: Monorepo Setup
- Initialize Turborepo monorepo
- Create directory structure per PRD Section 70
- Configure shared packages (ui, database, auth, api, validation, config)
- Set up TypeScript, ESLint, Prettier across all packages

#### Hour 2: Next.js Application
- Create `apps/web` with Next.js 14 (App Router)
- Configure Tailwind CSS for styling
- Set up shadcn/ui component library
- Create base layout with navigation shell
- Implement dark/light mode toggle

#### Hour 3: Database & Prisma
- Set up Docker Compose with PostgreSQL and Redis
- Initialize Prisma in `packages/database`
- Define initial schema (Section 41):
  - `users` table
  - `organizations` table
  - `organization_members` table
  - Base fields for multi-tenancy
- Run initial migration
- Seed script for demo data

#### Hour 4: Authentication System
- Implement email/password authentication
- Session management with secure cookies
- Password hashing (bcrypt/argon2)
- Email verification flow (stub for Day 1)
- Login/Register pages
- Protected route middleware

---

### Afternoon Block (4 hours)

#### Hour 5: Authorization Foundation
- Implement role-based access control (Section 7)
- Create permission checking utilities
- Organization context provider
- Tenant isolation middleware (Section 42)

#### Hour 6: Core UI Components
- Build reusable components in `packages/ui`:
  - Button, Input, Card, Badge
  - DataTable skeleton
  - Loading skeletons (Section 57)
  - Empty states (Section 56)
- Set up component documentation

#### Hour 7: API Layer Setup
- Create API route structure (`/api/v1`)
- Implement standardized error handling (Section 46)
- Request validation with Zod (Section 43)
- Rate limiting foundation (Section 47)
- Logging middleware

#### Hour 8: Testing & CI
- Write unit tests for:
  - Authentication functions
  - Permission utilities
  - Validation schemas
- Set up GitHub Actions CI pipeline (Section 61):
  - Install dependencies
  - Lint
  - Typecheck
  - Unit tests
  - Build
- Ensure green build on push

---

## Detailed Implementation Tasks

### 1. Monorepo Structure

```bash
devflow/
├── apps/
│   ├── web/              # Next.js application
│   └── worker/           # Background job processor (stub)
├── packages/
│   ├── ui/               # Shared React components
│   ├── database/         # Prisma client & schema
│   ├── auth/             # Authentication utilities
│   ├── api/              # API helpers & types
│   ├── validation/       # Zod schemas
│   └── config/           # Shared configs (TS, ESLint)
├── prisma/               # Database migrations
├── tests/                # E2E tests
├── docker-compose.yml
├── package.json
├── turbo.json
└── README.md
```

### 2. Database Schema (Day 1 Subset)

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  passwordHash  String
  emailVerified DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  memberships   OrganizationMember[]
}

model Organization {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  members     OrganizationMember[]
  projects    Project[]
}

model OrganizationMember {
  id             String       @id @default(cuid())
  organizationId String
  userId         String
  role           Role         @default(MEMBER)
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
  
  organization   Organization @relation(fields: [organizationId], references: [id])
  user           User         @relation(fields: [userId], references: [id])
  
  @@unique([organizationId, userId])
}

enum Role {
  OWNER
  ADMIN
  MANAGER
  MEMBER
  VIEWER
}
```

### 3. Authentication Flow

```
Registration:
  POST /api/auth/register
    → Validate email/password
    → Hash password
    → Create user
    → Create organization (auto)
    → Add user as OWNER
    → Send verification email (queued)
    → Create session
    → Redirect to dashboard

Login:
  POST /api/auth/login
    → Find user by email
    → Verify password
    → Create session
    → Set secure cookie
    → Redirect to dashboard

Logout:
  POST /api/auth/logout
    → Destroy session
    → Clear cookie
    → Redirect to login
```

### 4. Environment Variables Required

```env
# Database
DATABASE_URL="postgresql://devflow:devflow@localhost:5432/devflow"

# Redis
REDIS_URL="redis://localhost:6379"

# Authentication
AUTH_SECRET="your-secret-key-min-32-chars"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Optional (for Day 1 stubs)
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
STRIPE_SECRET_KEY=""
AI_API_KEY=""
```

### 5. Key Dependencies

**apps/web:**
- next@14
- react, react-dom
- tailwindcss, postcss, autoprefixer
- @radix-ui/* (for shadcn/ui)
- class-variance-authority
- clsx, tailwind-merge

**packages/database:**
- prisma
- @prisma/client

**packages/auth:**
- bcryptjs or argon2
- jose (for JWT if needed)
- uuid or cuid

**packages/validation:**
- zod

**DevDependencies:**
- typescript
- eslint, prettier
- vitest or jest (testing)
- @playwright/test (E2E prep)
- turbo (monorepo)

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Database connection issues | Use Docker Compose for consistent local env |
| Auth complexity | Start simple (email/pass), add OAuth later |
| Monorepo config overhead | Use Turborepo defaults, customize minimally |
| Time overrun | Prioritize: Monorepo → DB → Auth → CI; defer UI polish |

---

## Definition of Done (Day 1)

A developer can:

1. Clone the repository
2. Run `docker-compose up -d` to start DB + Redis
3. Run `npm install` to install dependencies
4. Run `npm run db:migrate` to set up database
5. Run `npm run dev` to start the app
6. Visit `http://localhost:3000`
7. Register a new account
8. Get redirected to dashboard
9. Logout and login again
10. See protected content only when authenticated

CI pipeline must pass on every push with:
- ✅ Lint
- ✅ Typecheck
- ✅ Tests (>80% coverage on auth/permissions)
- ✅ Build

---

## Files to Create

### Configuration Files
- [ ] `package.json` (root)
- [ ] `turbo.json`
- [ ] `tsconfig.json` (root + per-package)
- [ ] `.eslintrc.js`
- [ ] `.prettierrc`
- [ ] `docker-compose.yml`
- [ ] `.env.example`
- [ ] `.gitignore`

### Database
- [ ] `packages/database/prisma/schema.prisma`
- [ ] `packages/database/package.json`
- [ ] `packages/database/tsconfig.json`
- [ ] `packages/database/src/index.ts`
- [ ] `packages/database/src/client.ts`

### Authentication
- [ ] `packages/auth/package.json`
- [ ] `packages/auth/src/index.ts`
- [ ] `packages/auth/src/password.ts`
- [ ] `packages/auth/src/session.ts`

### Web Application
- [ ] `apps/web/package.json`
- [ ] `apps/web/next.config.js`
- [ ] `apps/web/tailwind.config.js`
- [ ] `apps/web/postcss.config.js`
- [ ] `apps/web/app/layout.tsx`
- [ ] `apps/web/app/page.tsx` (landing or redirect)
- [ ] `apps/web/app/(auth)/login/page.tsx`
- [ ] `apps/web/app/(auth)/register/page.tsx`
- [ ] `apps/web/app/dashboard/page.tsx`
- [ ] `apps/web/middleware.ts`

### API Routes
- [ ] `apps/web/app/api/auth/register/route.ts`
- [ ] `apps/web/app/api/auth/login/route.ts`
- [ ] `apps/web/app/api/auth/logout/route.ts`
- [ ] `apps/web/app/api/auth/me/route.ts`

### Tests
- [ ] `packages/auth/__tests__/password.test.ts`
- [ ] `packages/auth/__tests__/session.test.ts`
- [ ] `apps/web/__tests__/auth-flow.test.ts`

### CI/CD
- [ ] `.github/workflows/ci.yml`

### Documentation
- [ ] `README.md` (setup instructions)
- [ ] `docs/ARCHITECTURE.md`
- [ ] `docs/DAY1_SUMMARY.md`

---

## Commands Reference

```bash
# Start database and redis
docker-compose up -d

# Install all dependencies
npm install

# Run database migrations
npm run db:migrate

# Seed database (optional)
npm run db:seed

# Start development server
npm run dev

# Run tests
npm test

# Run CI checks locally
npm run lint
npm run typecheck
npm run build

# Format code
npm run format
```

---

## Next Steps (Day 2 Preview)

After completing Day 1:

1. **Organization Management**: Complete org CRUD, member invitation flow
2. **Team Structure**: Implement teams and team membership
3. **Project Module**: Projects, issues, labels foundation
4. **Enhanced Auth**: Add GitHub OAuth, Google OAuth
5. **Email Service**: Integrate email provider for verification/notifications

---

## Notes

- Keep the UI minimal but professional (use shadcn/ui templates)
- Focus on correctness over features (auth security is critical)
- Document decisions in `docs/` as you go
- Commit frequently with clear messages
- If stuck >30 mins, simplify the approach
- Day 1 sets the tone—invest in quality foundation

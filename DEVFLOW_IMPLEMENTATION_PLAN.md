# DevFlow MVP Implementation Plan
## 10-Day Sprint Schedule (1 Day = 1 Feature)

**Version:** 1.0  
**Product:** DevFlow MVP  
**Total Duration:** 10 Days  
**Target:** Production-ready MVP with all core features

---

# Day 1 — Foundation & Monorepo Setup

## Goal
Establish the complete development foundation with monorepo structure, tooling, and CI pipeline.

## Deliverables
- [ ] Turborepo monorepo structure
- [ ] Next.js 14 application setup
- [ ] TypeScript configuration
- [ ] Tailwind CSS + shadcn/ui
- [ ] Docker Compose (PostgreSQL, Redis)
- [ ] Prisma ORM setup
- [ ] ESLint + Prettier + Husky
- [ ] GitHub Actions CI pipeline
- [ ] Environment configuration

## File Structure
```
devflow/
├── apps/
│   ├── web/                    # Next.js application
│   └── worker/                 # BullMQ worker
├── packages/
│   ├── ui/                     # Shared UI components
│   ├── database/               # Prisma schema & client
│   ├── auth/                   # Authentication utilities
│   ├── api/                    # API types & validators
│   ├── validation/             # Zod schemas
│   └── config/                 # Shared configs
├── tests/
│   ├── e2e/
│   └── integration/
├── prisma/
│   └── schema.prisma
├── docker-compose.yml
├── package.json
├── turbo.json
├── .env.example
└── README.md
```

## Database Schema (Day 1 Core)
```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String
  name          String?
  emailVerified DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  memberships   OrganizationMember[]
  activityLogs  ActivityLog[]
  auditLogs     AuditLog[]
}

model Organization {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  plan        String   @default("FREE")
  stripeCustomerId String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  members     OrganizationMember[]
  teams       Team[]
  projects    Project[]
  labels      Label[]
  repositories Repository[]
  documents   Document[]
  subscriptions Subscription[]
  usageRecords UsageRecord[]
  apiKeys     ApiKey[]
  webhooks    Webhook[]
  auditLogs   AuditLog[]
}

model OrganizationMember {
  id             String       @id @default(cuid())
  organizationId String
  userId         String
  role           Role         @default(MEMBER)
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
  
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  user           User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  
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

## Tasks (Hour by Hour)
| Hour | Task |
|------|------|
| 1 | Initialize monorepo with Turborepo |
| 2 | Setup Next.js app with TypeScript |
| 3 | Configure Tailwind CSS + shadcn/ui |
| 4 | Create Docker Compose with PostgreSQL & Redis |
| 5 | Setup Prisma with initial schema |
| 6 | Implement authentication (email/password) |
| 7 | Build authorization middleware |
| 8 | Configure CI pipeline & final testing |

## Success Criteria
- ✅ Developer can clone repo
- ✅ `docker-compose up` starts all services
- ✅ `npm install` works
- ✅ `npm run db:migrate` runs successfully
- ✅ `npm run dev` starts development server
- ✅ Can register/login
- ✅ Protected dashboard accessible
- ✅ All CI checks pass

## Dependencies
```json
{
  "next": "14.2.0",
  "react": "18.3.0",
  "typescript": "5.4.0",
  "prisma": "5.12.0",
  "@prisma/client": "5.12.0",
  "bcryptjs": "2.4.3",
  "jose": "5.2.0",
  "zod": "3.22.0",
  "redis": "4.6.0",
  "bullmq": "5.7.0"
}
```

## Environment Variables
```bash
DATABASE_URL="postgresql://user:pass@localhost:5432/devflow?schema=public"
REDIS_URL="redis://localhost:6379"
AUTH_SECRET="your-secret-key-here"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Risks & Mitigation
| Risk | Mitigation |
|------|------------|
| Complex monorepo setup | Use create-turbo template |
| Auth edge cases | Use battle-tested jose library |
| Database connection issues | Include health check endpoint |

---

# Day 2 — Multi-Tenancy & Organizations

## Goal
Build complete multi-tenant organization system with RBAC and onboarding flow.

## Deliverables
- [ ] Organization CRUD operations
- [ ] Member management (invite, remove, update role)
- [ ] Role-based access control (RBAC)
- [ ] Tenant isolation middleware
- [ ] Organization switcher UI
- [ ] Onboarding wizard
- [ ] Team management
- [ ] Permission utilities

## Database Additions
```prisma
model Team {
  id             String   @id @default(cuid())
  organizationId String
  name           String
  description    String?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  members        TeamMember[]
  projects       Project[]
}

model TeamMember {
  id        String @id @default(cuid())
  teamId    String
  userId    String
  createdAt DateTime @default(now())
  
  team      Team @relation(fields: [teamId], references: [id], onDelete: Cascade)
  user      User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([teamId, userId])
}
```

## API Endpoints
```
POST   /api/organizations
GET    /api/organizations
GET    /api/organizations/:id
PATCH  /api/organizations/:id
DELETE /api/organizations/:id

POST   /api/organizations/:id/members
GET    /api/organizations/:id/members
PATCH  /api/organizations/:id/members/:userId
DELETE /api/organizations/:id/members/:userId

POST   /api/organizations/:id/teams
GET    /api/organizations/:id/teams
```

## UI Components
- OrganizationSwitcher
- MemberList
- InviteMemberModal
- RoleSelector
- OnboardingWizard
- TeamManager

## Tasks (Hour by Hour)
| Hour | Task |
|------|------|
| 1 | Extend Prisma schema with teams |
| 2 | Build organization API endpoints |
| 3 | Implement member management APIs |
| 4 | Create RBAC permission system |
| 5 | Build tenant isolation middleware |
| 6 | Create organization switcher UI |
| 7 | Build onboarding wizard |
| 8 | Write integration tests |

## Success Criteria
- ✅ User can create organization
- ✅ User can invite members via email
- ✅ Roles can be assigned and changed
- ✅ Tenant isolation enforced on all queries
- ✅ Users can switch between organizations
- ✅ Onboarding flow completes successfully
- ✅ Teams can be created and managed
- ✅ Permissions correctly restrict actions

---

# Day 3 — Projects & Issues

## Goal
Implement core project management with full issue tracking system.

## Deliverables
- [ ] Project CRUD
- [ ] Issue CRUD
- [ ] Issue statuses and workflows
- [ ] Priority system
- [ ] Labels system
- [ ] Issue assignment
- [ ] Due dates and estimates
- [ ] Activity logging
- [ ] Project member management

## Database Additions
```prisma
model Project {
  id          String   @id @default(cuid())
  organizationId String
  name        String
  description String?
  status      ProjectStatus @default(PLANNED)
  priority    Priority @default(MEDIUM)
  ownerId     String?
  teamId      String?
  startDate   DateTime?
  targetDate  DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  owner       User? @relation(fields: [ownerId], references: [id])
  team        Team? @relation(fields: [teamId], references: [id])
  issues      Issue[]
  members     ProjectMember[]
  milestones  Milestone[]
  documents   Document[]
}

model Issue {
  id            String   @id @default(cuid())
  organizationId String
  projectId     String
  title         String
  description   String?
  status        IssueStatus @default(BACKLOG)
  priority      Priority @default(MEDIUM)
  assigneeId    String?
  creatorId     String
  teamId        String?
  estimate      Int?
  dueDate       DateTime?
  completedAt   DateTime?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  organization  Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  project       Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  assignee      User? @relation(fields: [assigneeId], references: [id])
  creator       User @relation(fields: [creatorId], references: [id])
  team          Team? @relation(fields: [teamId], references: [id])
  comments      IssueComment[]
  labels        IssueLabel[]
  attachments   IssueAttachment[]
  activityLogs  ActivityLog[]
}

model IssueComment {
  id        String   @id @default(cuid())
  issueId   String
  authorId  String
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  issue     Issue @relation(fields: [issueId], references: [id], onDelete: Cascade)
  author    User @relation(fields: [authorId], references: [id])
}

model Label {
  id             String   @id @default(cuid())
  organizationId String
  name           String
  color          String
  createdAt      DateTime @default(now())
  
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  issues         IssueLabel[]
}

model IssueLabel {
  id        String @id @default(cuid())
  issueId   String
  labelId   String
  createdAt DateTime @default(now())
  
  issue     Issue @relation(fields: [issueId], references: [id], onDelete: Cascade)
  label     Label @relation(fields: [labelId], references: [id], onDelete: Cascade)
  
  @@unique([issueId, labelId])
}

enum ProjectStatus {
  PLANNED
  ACTIVE
  ON_HOLD
  COMPLETED
  ARCHIVED
}

enum IssueStatus {
  BACKLOG
  TODO
  IN_PROGRESS
  IN_REVIEW
  DONE
  CANCELLED
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  URGENT
}
```

## API Endpoints
```
Projects:
POST   /api/projects
GET    /api/projects
GET    /api/projects/:id
PATCH  /api/projects/:id
DELETE /api/projects/:id

Issues:
POST   /api/issues
GET    /api/issues
GET    /api/issues/:id
PATCH  /api/issues/:id
DELETE /api/issues/:id
POST   /api/issues/:id/comments
```

## UI Components
- ProjectList
- ProjectCard
- IssueList
- IssueCard
- IssueDetail
- CommentThread
- LabelPicker
- AssigneeSelector
- StatusBadge
- PriorityBadge

## Tasks (Hour by Hour)
| Hour | Task |
|------|------|
| 1 | Extend schema with projects & issues |
| 2 | Build project API endpoints |
| 3 | Build issue API endpoints |
| 4 | Implement labels system |
| 5 | Create issue comments |
| 6 | Build project list UI |
| 7 | Build issue list & detail UI |
| 8 | Add activity logging |

## Success Criteria
- ✅ Projects can be created/updated/deleted
- ✅ Issues can be created with all fields
- ✅ Issues can be assigned to users
- ✅ Labels can be created and applied
- ✅ Comments work on issues
- ✅ Activity log tracks all changes
- ✅ Status transitions work correctly
- ✅ Due dates and estimates function

---

# Day 4 — Kanban Board

## Goal
Build interactive Kanban board with drag-and-drop and realtime updates.

## Deliverables
- [ ] Kanban board view
- [ ] Drag-and-drop functionality
- [ ] Optimistic UI updates
- [ ] Realtime synchronization
- [ ] Column customization
- [ ] Quick issue creation
- [ ] Keyboard navigation
- [ ] Filter and search

## Technical Implementation
```typescript
// Drag and drop with dnd-kit
import { DndContext, DragEndEvent } from '@dnd-kit/core';

// Optimistic updates
const updateIssueStatus = async (issueId: string, newStatus: IssueStatus) => {
  // Optimistically update UI
  queryClient.setQueryData(['issue', issueId], (old: Issue) => ({
    ...old,
    status: newStatus
  }));
  
  try {
    await api.patch(`/issues/${issueId}`, { status: newStatus });
  } catch (error) {
    // Rollback on failure
    queryClient.invalidateQueries(['issue', issueId]);
    throw error;
  }
};

// Realtime with Server-Sent Events or WebSocket
const subscribeToProject = (projectId: string) => {
  const eventSource = new EventSource(`/api/realtime?project=${projectId}`);
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    queryClient.setQueryData(['project', projectId], data);
  };
};
```

## UI Components
- KanbanBoard
- KanbanColumn
- KanbanCard
- DragDropProvider
- QuickCreateIssue
- BoardFilter
- ColumnHeader

## Tasks (Hour by Hour)
| Hour | Task |
|------|------|
| 1 | Design board layout & columns |
| 2 | Implement dnd-kit drag-drop |
| 3 | Build optimistic update logic |
| 4 | Setup realtime connection |
| 5 | Create column customization |
| 6 | Add quick issue creation |
| 7 | Implement keyboard navigation |
| 8 | Add filters and search |

## Success Criteria
- ✅ Issues can be dragged between columns
- ✅ UI updates optimistically
- ✅ Changes sync across clients in <1s
- ✅ New issues can be created inline
- ✅ Keyboard shortcuts work (arrows, enter)
- ✅ Columns can be filtered by assignee, label, priority
- ✅ Smooth animations and transitions
- ✅ Mobile responsive

---

# Day 5 — Sprints & Milestones

## Goal
Implement sprint management with velocity tracking and milestone planning.

## Deliverables
- [ ] Sprint CRUD
- [ ] Sprint start/complete workflow
- [ ] Issue assignment to sprints
- [ ] Velocity calculation
- [ ] Sprint analytics
- [ ] Milestone management
- [ ] Burndown chart
- [ ] Carry-over handling

## Database Additions
```prisma
model Sprint {
  id             String   @id @default(cuid())
  organizationId String
  projectId      String
  name          String
  startDate     DateTime
  endDate       DateTime
  status        SprintStatus @default(PLANNED)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  organization  Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  project       Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  issues        SprintIssue[]
}

model SprintIssue {
  id        String   @id @default(cuid())
  sprintId  String
  issueId   String
  addedAt   DateTime @default(now())
  
  sprint    Sprint @relation(fields: [sprintId], references: [id], onDelete: Cascade)
  issue     Issue @relation(fields: [issueId], references: [id], onDelete: Cascade)
  
  @@unique([sprintId, issueId])
}

model Milestone {
  id          String   @id @default(cuid())
  projectId   String
  name        String
  description String?
  targetDate  DateTime?
  status      MilestoneStatus @default(PLANNED)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  project     Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  issues      MilestoneIssue[]
}

model MilestoneIssue {
  id           String @id @default(cuid())
  milestoneId  String
  issueId      String
  createdAt    DateTime @default(now())
  
  milestone    Milestone @relation(fields: [milestoneId], references: [id], onDelete: Cascade)
  issue        Issue @relation(fields: [issueId], references: [id], onDelete: Cascade)
  
  @@unique([milestoneId, issueId])
}

enum SprintStatus {
  PLANNED
  ACTIVE
  COMPLETED
  CANCELLED
}

enum MilestoneStatus {
  PLANNED
  IN_PROGRESS
  COMPLETED
  CANCELLED
}
```

## Analytics Calculations
```typescript
// Velocity calculation
const calculateVelocity = (sprints: Sprint[]) => {
  return sprints
    .filter(s => s.status === 'COMPLETED')
    .map(sprint => {
      const completedIssues = sprint.issues.filter(i => 
        i.issue.status === 'DONE'
      );
      return completedIssues.reduce((sum, i) => sum + (i.issue.estimate || 0), 0);
    });
};

// Burndown data
const calculateBurndown = (sprint: Sprint, issues: Issue[]) => {
  const totalDays = differenceInDays(sprint.endDate, sprint.startDate);
  const dailyData = [];
  
  for (let i = 0; i <= totalDays; i++) {
    const date = addDays(sprint.startDate, i);
    const remaining = issues
      .filter(issue => issue.createdAt <= date && issue.status !== 'DONE')
      .reduce((sum, issue) => sum + (issue.estimate || 0), 0);
    dailyData.push({ date, remaining });
  }
  
  return dailyData;
};
```

## UI Components
- SprintList
- SprintDetail
- SprintPlanner
- VelocityChart
- BurndownChart
- MilestoneList
- MilestoneDetail
- SprintCompleteModal

## Tasks (Hour by Hour)
| Hour | Task |
|------|------|
| 1 | Extend schema with sprints & milestones |
| 2 | Build sprint API endpoints |
| 3 | Build milestone API endpoints |
| 4 | Implement velocity calculations |
| 5 | Create burndown chart component |
| 6 | Build sprint planner UI |
| 7 | Build milestone management UI |
| 8 | Add sprint completion workflow |

## Success Criteria
- ✅ Sprints can be created and started
- ✅ Issues can be added to sprints
- ✅ Velocity is calculated correctly
- ✅ Burndown chart displays accurately
- ✅ Sprints can be completed with carry-over
- ✅ Milestones track progress
- ✅ Sprint analytics dashboard works
- ✅ Unfinished issues move to next sprint

---

# Day 6 — GitHub Integration

## Goal
Connect GitHub repositories with full webhook processing and issue linking.

## Deliverables
- [ ] GitHub OAuth/App installation
- [ ] Repository import
- [ ] Webhook endpoint
- [ ] PR tracking
- [ ] Commit tracking
- [ ] Issue-PR linking
- [ ] Auto-status updates
- [ ] GitHub activity feed

## Database Additions
```prisma
model GitHubInstallation {
  id              String   @id @default(cuid())
  organizationId  String
  installationId  String   @unique
  appId           String
  accessToken     String
  tokenExpiresAt  DateTime
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  organization    Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  repositories    Repository[]
}

model Repository {
  id              String   @id @default(cuid())
  organizationId  String
  installationId  String
  githubId        String   @unique
  owner           String
  name            String
  fullName        String
  projectId       String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  organization    Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  installation    GitHubInstallation @relation(fields: [installationId], references: [id], onDelete: Cascade)
  project         Project? @relation(fields: [projectId], references: [id])
  pullRequests    PullRequest[]
  commits         Commit[]
  deployments     Deployment[]
}

model PullRequest {
  id            String   @id @default(cuid())
  repositoryId  String
  githubId      String   @unique
  number        Int
  title         String
  state         String
  author        String
  htmlUrl       String
  createdAt     DateTime
  updatedAt     DateTime
  mergedAt      DateTime?
  mergedBy      String?
  commitSha     String?
  linkedIssueId String?
  
  repository    Repository @relation(fields: [repositoryId], references: [id], onDelete: Cascade)
  linkedIssue   Issue? @relation(fields: [linkedIssueId], references: [id])
}

model Commit {
  id           String   @id @default(cuid())
  repositoryId String
  sha          String
  message      String
  author       String
  committedAt  DateTime
  htmlUrl      String
  
  repository   Repository @relation(fields: [repositoryId], references: [id], onDelete: Cascade)
}

model Deployment {
  id            String   @id @default(cuid())
  repositoryId  String
  environment   String
  commitSha     String
  status        DeploymentStatus
  url           String?
  startedAt     DateTime?
  completedAt   DateTime?
  createdAt     DateTime @default(now())
  
  repository    Repository @relation(fields: [repositoryId], references: [id], onDelete: Cascade)
}

enum DeploymentStatus {
  QUEUED
  IN_PROGRESS
  SUCCESS
  FAILED
  CANCELLED
}
```

## Webhook Handler
```typescript
// apps/web/app/api/github/webhooks/route.ts
import { verifyWebhookSignature } from '@devflow/auth';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('x-hub-signature-256');
  const event = req.headers.get('x-github-event');
  
  // Verify signature
  const isValid = await verifyWebhookSignature(body, signature);
  if (!isValid) {
    return new Response('Invalid signature', { status: 401 });
  }
  
  const payload = JSON.parse(body);
  
  // Queue for async processing
  await githubQueue.add('webhook', { event, payload }, {
    jobId: `${event}-${payload.repository?.id}-${payload.pull_request?.id}`,
    removeOnComplete: true,
  });
  
  return new Response('OK', { status: 200 });
}
```

## Issue Linking Logic
```typescript
// Detect issue references in PR title/description
const ISSUE_PATTERN = /(?:DEV-|ISSUE-)(\d+)|fixes?\s+#?(\d+)|closes?\s+#?(\d+)/gi;

const extractIssueReferences = (text: string): string[] => {
  const matches = [...text.matchAll(ISSUE_PATTERN)];
  return matches.flatMap(m => m.slice(1).filter(Boolean));
};

const linkPRToIssue = async (pr: PullRequest, issueIds: string[]) => {
  for (const issueId of issueIds) {
    await prisma.issue.update({
      where: { id: issueId },
      data: {
        linkedPullRequests: {
          connect: { id: pr.id }
        }
      }
    });
  }
};

// Auto-complete issue when PR is merged
const handlePRMerged = async (pr: PullRequest) => {
  if (pr.linkedIssueId) {
    await prisma.issue.update({
      where: { id: pr.linkedIssueId },
      data: {
        status: 'DONE',
        completedAt: new Date()
      }
    });
  }
};
```

## UI Components
- GitHubConnectButton
- RepositoryList
- RepositoryImporter
- PullRequestList
- CommitHistory
- DeploymentStatus
- GitHubActivityFeed
- IssueGitHubLink

## Tasks (Hour by Hour)
| Hour | Task |
|------|------|
| 1 | Create GitHub OAuth App |
| 2 | Implement OAuth flow |
| 3 | Build webhook endpoint |
| 4 | Setup webhook processor queue |
| 5 | Implement PR tracking |
| 6 | Build issue-PR linking logic |
| 7 | Create auto-status updates |
| 8 | Build GitHub UI components |

## Success Criteria
- ✅ GitHub account can be connected
- ✅ Repositories can be imported
- ✅ Webhooks are received and verified
- ✅ PRs are tracked and displayed
- ✅ Commits are recorded
- ✅ Issue references are detected automatically
- ✅ Merged PRs auto-complete linked issues
- ✅ GitHub activity appears in feed

---

# Day 7 — Billing & Stripe Integration

## Goal
Implement subscription billing with Stripe, usage metering, and plan enforcement.

## Deliverables
- [ ] Stripe integration
- [ ] Subscription plans
- [ ] Checkout flow
- [ ] Customer portal
- [ ] Webhook handling
- [ ] Usage metering
- [ ] Plan enforcement
- [ ] Billing UI

## Database Additions
```prisma
model Subscription {
  id              String   @id @default(cuid())
  organizationId  String
  stripeSubscriptionId String @unique
  stripeCustomerId String
  plan            String
  status          String
  currentPeriodStart DateTime
  currentPeriodEnd   DateTime
  cancelAtPeriodEnd  Boolean @default(false)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  organization    Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
}

model UsageRecord {
  id             String   @id @default(cuid())
  organizationId String
  metric         String
  quantity       Int
  period         String
  createdAt      DateTime @default(now())
  
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  
  @@index([organizationId, metric, period])
}

model ApiKey {
  id             String   @id @default(cuid())
  organizationId String
  name           String
  keyHash        String   @unique
  prefix         String   // For display (e.g., "sk_test_...")
  permissions    String[]
  lastUsedAt     DateTime?
  expiresAt      DateTime?
  createdAt      DateTime @default(now())
  
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
}
```

## Plans Configuration
```typescript
// packages/config/plans.ts
export const PLANS = {
  FREE: {
    name: 'Free',
    price: 0,
    limits: {
      users: 5,
      projects: 3,
      aiRequests: 100,
      storage: 1000000000, // 1GB
    },
    features: [
      'Basic project management',
      'GitHub integration',
      'Basic analytics',
      'Limited AI',
    ],
  },
  PRO: {
    name: 'Pro',
    price: 29,
    limits: {
      users: -1, // unlimited
      projects: -1,
      aiRequests: 5000,
      storage: 10000000000, // 10GB
    },
    features: [
      'Unlimited projects',
      'Advanced analytics',
      'AI assistant',
      'RAG documentation',
      'API access',
    ],
  },
  BUSINESS: {
    name: 'Business',
    price: 99,
    limits: {
      users: -1,
      projects: -1,
      aiRequests: 50000,
      storage: 100000000000, // 100GB
    },
    features: [
      'Everything in Pro',
      'Advanced permissions',
      'Audit logs',
      'Priority support',
      'Advanced organization controls',
    ],
  },
};
```

## Stripe Webhook Handler
```typescript
// apps/web/app/api/billing/webhooks/route.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;
  
  let event: Stripe.Event;
  
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return new Response('Invalid signature', { status: 400 });
  }
  
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutCompleted(session);
      break;
    }
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionUpdated(subscription);
      break;
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionCancelled(subscription);
      break;
    }
  }
  
  return new Response('OK', { status: 200 });
}
```

## Plan Enforcement Middleware
```typescript
// packages/auth/plan-enforcement.ts
import { PLANS } from '@devflow/config';

export const enforceLimits = async (
  organizationId: string,
  action: string,
  metadata?: any
) => {
  const org = await getOrganizationWithSubscription(organizationId);
  const plan = PLANS[org.plan as keyof typeof PLANS];
  
  switch (action) {
    case 'CREATE_PROJECT': {
      const projectCount = await countProjects(organizationId);
      if (plan.limits.projects !== -1 && projectCount >= plan.limits.projects) {
        throw new LimitExceededError('Project limit reached');
      }
      break;
    }
    case 'INVITE_MEMBER': {
      const memberCount = await countMembers(organizationId);
      if (plan.limits.users !== -1 && memberCount >= plan.limits.users) {
        throw new LimitExceededError('User limit reached');
      }
      break;
    }
    case 'AI_REQUEST': {
      const usage = await getUsageForPeriod(organizationId, 'ai_requests');
      if (plan.limits.aiRequests !== -1 && usage >= plan.limits.aiRequests) {
        throw new LimitExceededError('AI request limit reached');
      }
      await recordUsage(organizationId, 'ai_requests', 1);
      break;
    }
  }
};
```

## UI Components
- PricingPage
- UpgradeModal
- BillingSettings
- UsageDashboard
- PaymentForm
- CustomerPortalButton
- InvoiceList
- PlanComparison

## Tasks (Hour by Hour)
| Hour | Task |
|------|------|
| 1 | Setup Stripe account & products |
| 2 | Implement checkout session creation |
| 3 | Build webhook handlers |
| 4 | Create subscription management |
| 5 | Implement usage metering |
| 6 | Build plan enforcement middleware |
| 7 | Create billing UI components |
| 8 | Test upgrade/downgrade flows |

## Success Criteria
- ✅ Users can view pricing plans
- ✅ Checkout flow works end-to-end
- ✅ Stripe webhooks update subscription status
- ✅ Usage is tracked and metered
- ✅ Plan limits are enforced
- ✅ Customer portal accessible
- ✅ Upgrades/downgrades work correctly
- ✅ Billing dashboard shows current status

---

# Day 8 — AI Assistant

## Goal
Build AI-powered features including issue generation, project summaries, and context-aware Q&A.

## Deliverables
- [ ] AI service layer
- [ ] Context retrieval pipeline
- [ ] Issue generation from description
- [ ] Sprint summarization
- [ ] Project health analysis
- [ ] RAG search foundation
- [ ] Streaming responses
- [ ] Source attribution

## Database Additions
```prisma
model Document {
  id            String   @id @default(cuid())
  organizationId String
  projectId     String?
  title         String
  content       String?
  filePath      String?
  mimeType      String?
  fileSize      Int?
  status        DocumentStatus @default(PROCESSING)
  visibility    Visibility @default(ORGANIZATION)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  organization  Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  project       Project? @relation(fields: [projectId], references: [id])
  chunks        DocumentChunk[]
}

model DocumentChunk {
  id           String   @id @default(cuid())
  documentId   String
  content      String
  embedding    Unsupported("vector(1536)")?
  metadata     Json?
  createdAt    DateTime @default(now())
  
  document     Document @relation(fields: [documentId], references: [id], onDelete: Cascade)
}

model AiRequest {
  id             String   @id @default(cuid())
  organizationId String
  userId         String
  prompt         String
  response       String?
  model          String
  tokensUsed     Int
  duration       Int
  createdAt      DateTime @default(now())
  
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  user           User @relation(fields: [userId], references: [id])
}

enum DocumentStatus {
  PROCESSING
  READY
  FAILED
}

enum Visibility {
  PRIVATE
  ORGANIZATION
  PUBLIC
}
```

## Context Retrieval Pipeline
```typescript
// packages/ai/context-retriever.ts
interface AIContext {
  project?: Project;
  issues: Issue[];
  sprints: Sprint[];
  pullRequests: PullRequest[];
  deployments: Deployment[];
  documents: DocumentChunk[];
  activity: ActivityLog[];
}

export const buildProjectContext = async (
  projectId: string,
  question: string
): Promise<AIContext> => {
  const project = await getProjectWithRelations(projectId);
  
  // Retrieve relevant issues
  const issues = await prisma.issue.findMany({
    where: { projectId },
    orderBy: { updatedAt: 'desc' },
    take: 50,
  });
  
  // Get recent sprints
  const sprints = await prisma.sprint.findMany({
    where: { projectId },
    orderBy: { startDate: 'desc' },
    take: 5,
    include: { issues: true },
  });
  
  // Get recent PRs
  const pullRequests = await prisma.pullRequest.findMany({
    where: { repository: { projectId } },
    orderBy: { updatedAt: 'desc' },
    take: 20,
  });
  
  // Semantic search for relevant documents
  const embedding = await generateEmbedding(question);
  const documents = await semanticSearch(embedding, {
    projectId,
    limit: 10,
  });
  
  return {
    project,
    issues,
    sprints,
    pullRequests,
    deployments: [],
    documents,
    activity: [],
  };
};
```

## Issue Generation Prompt
```typescript
// packages/ai/prompts/issue-generation.ts
export const ISSUE_GENERATION_PROMPT = `
You are an expert engineering manager. Generate a well-structured issue based on the user's description.

Input: "{description}"

Generate a JSON response with:
{
  "title": "Clear, concise title",
  "description": "Detailed description with context",
  "acceptanceCriteria": ["Criterion 1", "Criterion 2"],
  "subtasks": ["Subtask 1", "Subtask 2"],
  "estimatedPoints": 3,
  "suggestedLabels": ["feature", "frontend"]
}

Consider:
- Technical completeness
- Clear acceptance criteria
- Reasonable scope
- Potential dependencies
`;
```

## Sprint Summary Generator
```typescript
// packages/ai/sprint-summary.ts
export const generateSprintSummary = async (sprintId: string) => {
  const sprint = await getSprintWithIssues(sprintId);
  const context = buildSprintContext(sprint);
  
  const prompt = `
Analyze this sprint and provide a summary:

Sprint: ${sprint.name}
Duration: ${formatDate(sprint.startDate)} - ${formatDate(sprint.endDate)}
Status: ${sprint.status}

Issues:
${context.issues.map(i => `- [${i.status}] ${i.title} (${i.estimate || 0} pts)`).join('\n')}

Provide:
1. Completion rate
2. Main accomplishments
3. Blockers encountered
4. Velocity vs previous sprints
5. Recommendations for next sprint
`;

  const response = await callAI(prompt, {
    temperature: 0.3,
    maxTokens: 1000,
  });
  
  return parseStructuredResponse(response);
};
```

## Project Health Analysis
```typescript
// packages/ai/health-analysis.ts
export const analyzeProjectHealth = async (projectId: string) => {
  const context = await buildProjectContext(projectId, 'health analysis');
  
  const metrics = {
    overdueIssues: context.issues.filter(i => 
      i.dueDate && i.dueDate < new Date() && i.status !== 'DONE'
    ).length,
    
    blockedIssues: context.issues.filter(i => 
      i.labels.some(l => l.name === 'blocked')
    ).length,
    
    avgCycleTime: calculateAvgCycleTime(context.issues),
    
    sprintVelocity: calculateVelocityTrend(context.sprints),
    
    prThroughput: context.pullRequests.filter(pr => 
      pr.mergedAt && pr.mergedAt > subDays(new Date(), 7)
    ).length,
  };
  
  const prompt = `
Analyze project health based on these metrics:

${JSON.stringify(metrics, null, 2)}

Classify as: HEALTHY, AT_RISK, or CRITICAL
Provide reasoning and specific recommendations.
`;

  const analysis = await callAI(prompt);
  
  return {
    status: extractHealthStatus(analysis),
    metrics,
    reasoning: analysis.reasoning,
    recommendations: analysis.recommendations,
  };
};
```

## RAG Search
```typescript
// packages/ai/rag-search.ts
export const ragSearch = async (
  query: string,
  options: {
    organizationId: string;
    types?: ('issues' | 'documents' | 'comments' | 'projects')[];
    limit?: number;
  }
) => {
  const embedding = await generateEmbedding(query);
  
  const results = await Promise.all([
    options.types?.includes('documents') !== false 
      ? semanticSearchDocuments(embedding, options.organizationId, 5)
      : [],
    
    options.types?.includes('issues') !== false
      ? keywordSearchIssues(query, options.organizationId, 10)
      : [],
    
    options.types?.includes('comments') !== false
      ? keywordSearchComments(query, options.organizationId, 5)
      : [],
  ]);
  
  // Re-rank by relevance
  const combined = results.flat().sort((a, b) => b.score - a.score);
  
  return combined.slice(0, options.limit || 20);
};
```

## UI Components
- AIChatInterface
- IssueGenerator
- SprintSummaryView
- ProjectHealthDashboard
- RAGSearchResults
- StreamingResponse
- SourceCitations
- AIHistoryPanel

## Tasks (Hour by Hour)
| Hour | Task |
|------|------|
| 1 | Setup AI service layer |
| 2 | Implement context retrieval |
| 3 | Build issue generation feature |
| 4 | Create sprint summarization |
| 5 | Implement project health analysis |
| 6 | Build RAG search foundation |
| 7 | Add streaming responses |
| 8 | Create AI chat UI |

## Success Criteria
- ✅ AI can generate issues from descriptions
- ✅ Sprint summaries are accurate and useful
- ✅ Project health analysis identifies risks
- ✅ RAG search returns relevant results
- ✅ Responses stream in real-time
- ✅ Sources are cited where applicable
- ✅ AI distinguishes facts from predictions
- ✅ Usage is tracked for billing

---

# Day 9 — Documentation & Search

## Goal
Build documentation system with file upload, processing pipeline, and global search.

## Deliverables
- [ ] Document CRUD
- [ ] File upload with object storage
- [ ] Text extraction pipeline
- [ ] Document chunking
- [ ] Embedding generation
- [ ] Global search (keyword + semantic)
- [ ] Command palette (Cmd+K)
- [ ] Document versioning

## Document Processing Pipeline
```typescript
// apps/worker/jobs/document-processing.ts
import { Queue } from 'bullmq';
import { extractText } from '@devflow/validation';
import { chunkDocument } from '@devflow/ai';
import { generateEmbedding } from '@devflow/ai';
import { uploadToStorage } from '@devflow/storage';

const documentQueue = new Queue('documents', redisConnection);

documentQueue.process('process-document', async (job) => {
  const { documentId } = job.data;
  
  try {
    // Update status to processing
    await updateDocumentStatus(documentId, 'PROCESSING');
    
    const document = await getDocument(documentId);
    
    // Upload file to object storage
    if (document.filePath) {
      const storageKey = await uploadToStorage(document.filePath);
      await updateDocumentStorageKey(documentId, storageKey);
    }
    
    // Extract text
    const text = await extractText(document);
    
    // Chunk document
    const chunks = chunkDocument(text, {
      chunkSize: 1000,
      overlap: 200,
    });
    
    // Generate embeddings and store
    for (const chunk of chunks) {
      const embedding = await generateEmbedding(chunk.content);
      await storeDocumentChunk({
        documentId,
        content: chunk.content,
        embedding,
        metadata: chunk.metadata,
      });
    }
    
    // Update status to ready
    await updateDocumentStatus(documentId, 'READY');
    
  } catch (error) {
    await updateDocumentStatus(documentId, 'FAILED');
    throw error;
  }
});
```

## Search Implementation
```typescript
// packages/search/search-engine.ts
interface SearchResult {
  type: 'issue' | 'document' | 'comment' | 'project';
  id: string;
  title: string;
  excerpt: string;
  score: number;
  metadata: any;
}

export const globalSearch = async (
  query: string,
  options: {
    organizationId: string;
    userId: string;
    types?: string[];
    limit?: number;
  }
): Promise<SearchResult[]> => {
  const results: SearchResult[] = [];
  
  // Keyword search for issues
  if (options.types?.includes('issues') !== false) {
    const issues = await keywordSearchIssues(query, options.organizationId);
    results.push(...issues.map(toSearchResult('issue')));
  }
  
  // Semantic search for documents
  if (options.types?.includes('documents') !== false) {
    const embedding = await generateEmbedding(query);
    const docs = await semanticSearchDocuments(embedding, options.organizationId);
    results.push(...docs.map(toSearchResult('document')));
  }
  
  // Full-text search for comments
  if (options.types?.includes('comments') !== false) {
    const comments = await searchComments(query, options.organizationId);
    results.push(...comments.map(toSearchResult('comment')));
  }
  
  // Search projects
  if (options.types?.includes('projects') !== false) {
    const projects = await searchProjects(query, options.organizationId);
    results.push(...projects.map(toSearchResult('project')));
  }
  
  // Deduplicate and sort by score
  return deduplicate(results)
    .sort((a, b) => b.score - a.score)
    .slice(0, options.limit || 50);
};
```

## Command Palette
```typescript
// apps/web/components/command-palette.tsx
import { useCommand } from 'cmdk';

const commands = [
  {
    id: 'create-issue',
    label: 'Create Issue',
    shortcut: ['C', 'I'],
    action: () => openCreateIssueModal(),
  },
  {
    id: 'create-project',
    label: 'Create Project',
    shortcut: ['C', 'P'],
    action: () => openCreateProjectModal(),
  },
  {
    id: 'search',
    label: 'Search...',
    shortcut: ['Meta', 'K'],
    action: () => focusSearchInput(),
  },
  {
    id: 'start-sprint',
    label: 'Start Sprint',
    action: () => openStartSprintModal(),
  },
  {
    id: 'invite-member',
    label: 'Invite Member',
    action: () => openInviteModal(),
  },
  {
    id: 'generate-sprint-summary',
    label: 'Generate Sprint Summary',
    action: () => navigateToSprintSummary(),
  },
  {
    id: 'open-settings',
    label: 'Open Settings',
    action: () => navigateToSettings(),
  },
  {
    id: 'switch-organization',
    label: 'Switch Organization',
    action: () => openOrgSwitcher(),
  },
];

export const CommandPalette = () => {
  return (
    <Command.Dialog>
      <Command.Input placeholder="Type a command or search..." />
      <Command.List>
        <Command.Group heading="Suggestions">
          {commands.map(cmd => (
            <Command.Item key={cmd.id} onSelect={cmd.action}>
              {cmd.label}
              <Command.Shortcuts>{cmd.shortcut}</Command.Shortcuts>
            </Command.Item>
          ))}
        </Command.Group>
        <Command.Separator />
        <Command.Group heading="Search">
          <SearchResults />
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
};
```

## UI Components
- DocumentList
- DocumentEditor
- FileUploader
- DocumentViewer
- SearchBar
- SearchResults
- CommandPalette
- DocumentTree

## Tasks (Hour by Hour)
| Hour | Task |
|------|------|
| 1 | Build document CRUD APIs |
| 2 | Implement file upload with signed URLs |
| 3 | Create text extraction pipeline |
| 4 | Build document chunking logic |
| 5 | Implement embedding generation |
| 6 | Create global search functionality |
| 7 | Build command palette UI |
| 8 | Add document versioning |

## Success Criteria
- ✅ Documents can be created and edited
- ✅ Files upload to object storage
- ✅ Text extraction works for common formats
- ✅ Documents are chunked and embedded
- ✅ Semantic search returns relevant results
- ✅ Global search covers all content types
- ✅ Command palette accessible via Cmd+K
- ✅ Processing status shown in UI

---

# Day 10 — Production Readiness

## Goal
Polish, test, secure, and deploy the MVP for production use.

## Deliverables
- [ ] Notifications system
- [ ] Audit logging
- [ ] Error tracking setup
- [ ] Performance optimization
- [ ] Security hardening
- [ ] E2E tests
- [ ] Monitoring & alerting
- [ ] Production deployment

## Notifications System
```typescript
// Database additions
model Notification {
  id             String   @id @default(cuid())
  organizationId String
  userId         String
  type           NotificationType
  title          String
  message        String
  read           Boolean  @default(false)
  url            String?
  createdAt      DateTime @default(now())
  
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  user           User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model NotificationPreference {
  id             String   @id @default(cuid())
  userId         String
  organizationId String?
  type           NotificationType
  channel        Channel  @default(IN_APP)
  enabled        Boolean  @default(true)
  
  @@unique([userId, organizationId, type, channel])
}

enum NotificationType {
  ISSUE_ASSIGNED
  ISSUE_MENTION
  ISSUE_COMMENT
  PR_MERGED
  DEPLOYMENT_FAILED
  SPRINT_COMPLETED
  PROJECT_RISK
  DOCUMENT_UPDATED
}

enum Channel {
  IN_APP
  EMAIL
  SLACK
}
```

## Notification Service
```typescript
// packages/notifications/notification-service.ts
export const sendNotification = async (
  type: NotificationType,
  recipient: {
    userId: string;
    organizationId: string;
  },
  data: {
    title: string;
    message: string;
    url?: string;
  }
) => {
  // Check user preferences
  const preferences = await getNotificationPreferences(
    recipient.userId,
    recipient.organizationId,
    type
  );
  
  // Create in-app notification
  if (preferences.inApp) {
    await prisma.notification.create({
      data: {
        type,
        userId: recipient.userId,
        organizationId: recipient.organizationId,
        title: data.title,
        message: data.message,
        url: data.url,
      },
    });
  }
  
  // Send email
  if (preferences.email) {
    await emailQueue.add('send-notification', {
      type,
      to: recipient.userId,
      subject: data.title,
      body: data.message,
    });
  }
  
  // Realtime broadcast
  broadcastToUser(recipient.userId, 'notification', {
    type,
    ...data,
  });
};
```

## Audit Logging
```typescript
// packages/audit/audit-logger.ts
export const logAuditEvent = async (data: {
  organizationId: string;
  actorId: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  metadata?: any;
  ipAddress?: string;
}) => {
  await prisma.auditLog.create({
    data: {
      ...data,
      metadata: JSON.stringify(data.metadata || {}),
    },
  });
};

// Usage examples
await logAuditEvent({
  organizationId: org.id,
  actorId: user.id,
  action: 'MEMBER_ROLE_CHANGED',
  resourceType: 'ORGANIZATION_MEMBER',
  resourceId: memberId,
  metadata: { oldRole, newRole },
  ipAddress: req.ip,
});

await logAuditEvent({
  organizationId: org.id,
  actorId: user.id,
  action: 'API_KEY_CREATED',
  resourceType: 'API_KEY',
  resourceId: apiKey.id,
  metadata: { name: apiKey.name, permissions: apiKey.permissions },
});
```

## E2E Test Suite
```typescript
// tests/e2e/critical-flows.test.ts
import { test, expect } from '@playwright/test';

test.describe('Critical User Journeys', () => {
  test('New organization onboarding', async ({ page }) => {
    // Register
    await page.goto('/register');
    await page.fill('[name=email]', 'test@example.com');
    await page.fill('[name=password]', 'password123');
    await page.click('button[type=submit]');
    
    // Create organization
    await page.fill('[name=orgName]', 'Test Org');
    await page.click('button:has-text("Create Organization")');
    
    // Create project
    await page.click('button:has-text("Create Project")');
    await page.fill('[name=projectName]', 'Test Project');
    await page.click('button:has-text("Create")');
    
    // Create issue
    await page.click('button:has-text("New Issue")');
    await page.fill('[name=title]', 'Test Issue');
    await page.click('button:has-text("Create Issue")');
    
    // Move issue on kanban
    await page.dragAndDrop('.issue-card', '.column-in-progress');
    
    // Verify
    await expect(page.locator('.issue-card')).toBeVisible();
  });
  
  test('GitHub workflow', async ({ page }) => {
    // Connect GitHub
    await page.goto('/settings/integrations');
    await page.click('button:has-text("Connect GitHub")');
    // ... continue test
  });
  
  test('Billing upgrade flow', async ({ page }) => {
    // Navigate to billing
    await page.goto('/settings/billing');
    await page.click('button:has-text("Upgrade to Pro")');
    
    // Complete Stripe checkout (mocked)
    // ... continue test
    
    // Verify plan updated
    await expect(page.locator('[data-plan="PRO"]')).toBeVisible();
  });
  
  test('AI issue generation', async ({ page }) => {
    await page.goto('/ai');
    await page.fill('[name=prompt]', 'Add Google OAuth authentication');
    await page.click('button:has-text("Generate")');
    
    // Wait for streaming response
    await page.waitForSelector('.ai-response');
    
    // Verify issue was created
    await page.click('button:has-text("Create Issue")');
    await expect(page.locator('.issue-detail')).toBeVisible();
  });
});
```

## Performance Optimization Checklist
```markdown
## Frontend
- [ ] Code splitting by route
- [ ] Image optimization
- [ ] Lazy load heavy components
- [ ] Virtualize long lists
- [ ] Memoize expensive computations
- [ ] Optimize bundle size (<500KB)
- [ ] Enable compression

## Backend
- [ ] Database query optimization
- [ ] Add missing indexes
- [ ] Implement caching layer
- [ ] Connection pooling
- [ ] Query result caching
- [ ] API response compression

## Realtime
- [ ] Efficient event broadcasting
- [ ] Debounce frequent updates
- [ ] Batch notifications
```

## Security Hardening Checklist
```markdown
## Authentication
- [ ] Secure cookie settings (HttpOnly, Secure, SameSite)
- [ ] Session expiration
- [ ] Password complexity requirements
- [ ] Rate limiting on auth endpoints
- [ ] CSRF protection

## Authorization
- [ ] Tenant isolation on all queries
- [ ] RBAC enforcement
- [ ] Resource ownership verification
- [ ] API key permission checks

## Input/Output
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (Prisma handles)
- [ ] XSS prevention (output encoding)
- [ ] File type validation
- [ ] File size limits

## Infrastructure
- [ ] HTTPS enforcement
- [ ] Security headers (CSP, HSTS, etc.)
- [ ] Secret management
- [ ] Dependency updates
- [ ] Webhook signature validation
```

## Monitoring Setup
```typescript
// Instrumentation
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
  ],
});

// Custom metrics
import { metrics } from '@devflow/observability';

metrics.increment('api.request', {
  endpoint: '/api/issues',
  method: 'POST',
  status: 'success',
});

metrics.histogram('api.latency', latencyMs, {
  endpoint: '/api/issues',
});

metrics.gauge('queue.size', queueLength, {
  queue: 'github-webhooks',
});
```

## Tasks (Hour by Hour)
| Hour | Task |
|------|------|
| 1 | Implement notifications system |
| 2 | Build audit logging |
| 3 | Setup error tracking (Sentry) |
| 4 | Run performance profiling |
| 5 | Execute security audit |
| 6 | Write E2E tests |
| 7 | Setup monitoring dashboards |
| 8 | Deploy to production |

## Success Criteria
- ✅ Notifications sent for key events
- ✅ Audit logs capture sensitive actions
- ✅ Errors tracked and alerted
- ✅ p95 latency <300ms for APIs
- ✅ Security vulnerabilities addressed
- ✅ All critical E2E tests passing
- ✅ Monitoring dashboards operational
- ✅ Production deployment successful

---

# Post-MVP Roadmap

## V1 Features (Weeks 2-4)
- Advanced RAG with better chunking strategies
- Realtime collaboration (multi-cursor, presence)
- Public API with full documentation
- Customer webhooks for integrations
- Advanced analytics with custom dashboards
- Usage-based billing
- Advanced permissions with custom roles
- Deployment tracking improvements
- Mobile responsive optimizations

## V2 Features (Months 2-3)
- Slack/Discord/Teams integrations
- Linear/Jira import tools
- GitLab support
- Advanced AI agents for automation
- Automated project planning suggestions
- Risk prediction models
- Enterprise SSO (SAML, OIDC)
- SCIM provisioning
- Data export tools
- Custom workflow automation

---

# Success Metrics Dashboard

## Product Metrics
```typescript
const productMetrics = {
  weeklyActiveOrganizations: trackOrgWAU(),
  weeklyActiveUsers: trackUserWAU(),
  projectsCreated: trackMetric('project.created'),
  issuesCompleted: trackMetric('issue.completed'),
  githubConnections: countGitHubInstallations(),
  aiRequests: trackMetric('ai.requested'),
  documentsIndexed: countReadyDocuments(),
};
```

## Business Metrics
```typescript
const businessMetrics = {
  freeToPaidConversion: calculateConversionRate(),
  monthlyRecurringRevenue: calculateMRR(),
  averageRevenuePerOrg: calculateARPO(),
  churn: calculateChurnRate(),
  customerRetention: calculateRetentionRate(),
};
```

## Technical Metrics
```typescript
const technicalMetrics = {
  apiP95Latency: getHistogramPercentile('api.latency', 95),
  errorRate: calculateErrorRate(),
  webhookSuccessRate: calculateWebhookSuccessRate(),
  queueFailureRate: calculateQueueFailureRate(),
  aiResponseLatency: getAverage('ai.latency'),
  uptime: calculateUptime(),
};
```

---

# Appendix A: Environment Variables Reference

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/devflow?schema=public"

# Redis
REDIS_URL="redis://localhost:6379"

# Authentication
AUTH_SECRET="your-32-character-secret-key"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# GitHub OAuth
GITHUB_CLIENT_ID="your-client-id"
GITHUB_CLIENT_SECRET="your-client-secret"
GITHUB_WEBHOOK_SECRET="your-webhook-secret"
GITHUB_APP_ID="your-app-id"
GITHUB_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----..."

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRICE_ID_PRO="price_..."
STRIPE_PRICE_ID_BUSINESS="price_..."

# AI Provider
AI_API_KEY="your-ai-api-key"
AI_MODEL="gpt-4o-mini"
AI_EMBEDDING_MODEL="text-embedding-3-small"

# Object Storage (S3-compatible)
STORAGE_ENDPOINT="https://..."
STORAGE_ACCESS_KEY="your-access-key"
STORAGE_SECRET_KEY="your-secret-key"
STORAGE_BUCKET="devflow-uploads"

# Email
EMAIL_API_KEY="your-email-provider-key"
EMAIL_FROM="noreply@devflow.com"

# Observability
SENTRY_DSN="https://...@sentry.io/..."
```

---

# Appendix B: API Endpoint Reference

## Authentication
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
POST   /api/auth/verify-email
GET    /api/auth/session
```

## Organizations
```
POST   /api/organizations
GET    /api/organizations
GET    /api/organizations/:id
PATCH  /api/organizations/:id
DELETE /api/organizations/:id
POST   /api/organizations/:id/members
GET    /api/organizations/:id/members
PATCH  /api/organizations/:id/members/:userId
DELETE /api/organizations/:id/members/:userId
POST   /api/organizations/:id/teams
GET    /api/organizations/:id/teams
```

## Projects
```
POST   /api/projects
GET    /api/projects
GET    /api/projects/:id
PATCH  /api/projects/:id
DELETE /api/projects/:id
GET    /api/projects/:id/members
POST   /api/projects/:id/members
```

## Issues
```
POST   /api/issues
GET    /api/issues
GET    /api/issues/:id
PATCH  /api/issues/:id
DELETE /api/issues/:id
POST   /api/issues/:id/comments
PATCH  /api/issues/:id/comments/:commentId
DELETE /api/issues/:id/comments/:commentId
POST   /api/issues/:id/labels
DELETE /api/issues/:id/labels/:labelId
```

## Sprints
```
POST   /api/sprints
GET    /api/sprints
GET    /api/sprints/:id
PATCH  /api/sprints/:id
POST   /api/sprints/:id/start
POST   /api/sprints/:id/complete
POST   /api/sprints/:id/issues
DELETE /api/sprints/:id/issues/:issueId
```

## GitHub
```
GET    /api/github/connect
POST   /api/github/webhooks
GET    /api/github/repositories
POST   /api/github/repositories/:id/import
GET    /api/github/repositories/:id/pull-requests
```

## Billing
```
GET    /api/billing/plans
POST   /api/billing/checkout
GET    /api/billing/subscription
POST   /api/billing/portal
POST   /api/billing/webhooks
GET    /api/billing/usage
```

## AI
```
POST   /api/ai/generate-issue
POST   /api/ai/summarize-sprint
POST   /api/ai/analyze-health
POST   /api/ai/chat
GET    /api/ai/history
```

## Documents
```
POST   /api/documents
GET    /api/documents
GET    /api/documents/:id
PATCH  /api/documents/:id
DELETE /api/documents/:id
POST   /api/documents/:id/upload-url
GET    /api/documents/search
```

## Search
```
GET    /api/search?q=query
GET    /api/search/suggestions
```

## Notifications
```
GET    /api/notifications
PATCH  /api/notifications/:id/read
PATCH  /api/notifications/read-all
GET    /api/notifications/preferences
PATCH  /api/notifications/preferences
```

## Settings
```
GET    /api/settings/profile
PATCH  /api/settings/profile
PATCH  /api/settings/password
GET    /api/settings/api-keys
POST   /api/settings/api-keys
DELETE /api/settings/api-keys/:id
GET    /api/settings/audit-logs
```

---

# Appendix C: Component Library

## Core UI Components (shadcn/ui)
- Button
- Input
- Textarea
- Select
- Dialog/Modal
- Dropdown Menu
- Toast
- Badge
- Card
- Table
- Tabs
- Avatar
- Tooltip
- Popover
- Command
- Skeleton
- Alert
- Progress
- Calendar

## DevFlow Custom Components
- ProjectCard
- IssueCard
- KanbanBoard
- KanbanColumn
- SprintPlanner
- VelocityChart
- BurndownChart
- GitHubConnectButton
- AIChatInterface
- DocumentEditor
- CommandPalette
- OrganizationSwitcher
- MemberList
- ActivityFeed
- NotificationBell
- SearchBar
- FileUploader
- MarkdownEditor
- CodeBlock
- MentionInput

---

# Appendix D: Testing Strategy

## Unit Tests
```bash
# Run unit tests
npm run test:unit

# Coverage report
npm run test:coverage
```

**Coverage Target:** 80% minimum

**Critical Areas:**
- Permission functions
- Billing logic
- Validation schemas
- AI context construction
- Issue state transitions
- Usage limit enforcement

## Integration Tests
```bash
# Run integration tests
npm run test:integration
```

**Test Scenarios:**
- Database operations with transactions
- GitHub webhook processing
- Stripe webhook processing
- Background job execution
- Authentication flows
- API endpoint authorization

## E2E Tests
```bash
# Run E2E tests
npm run test:e2e

# Run with UI
npm run test:e2e:ui
```

**Critical Flows:**
1. Registration → Onboarding → First Project
2. Issue Creation → Assignment → Completion
3. GitHub Connection → PR → Auto-complete
4. Billing Upgrade → Feature Unlock
5. AI Issue Generation → Creation

## Performance Tests
```bash
# Load testing
npm run test:load

# Lighthouse audits
npm run test:lighthouse
```

**Targets:**
- Initial load < 2.5s
- API p95 < 300ms
- Lighthouse score > 90

---

# Appendix E: Deployment Checklist

## Pre-Deployment
- [ ] All tests passing
- [ ] No console errors
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Secrets rotated from defaults
- [ ] SSL certificates valid
- [ ] CDN configured
- [ ] Error tracking active
- [ ] Monitoring dashboards ready
- [ ] Backup strategy in place

## Deployment Steps
1. Build application: `npm run build`
2. Run migrations: `npm run db:migrate`
3. Deploy to staging
4. Run smoke tests
5. Deploy to production
6. Verify health checks
7. Monitor error rates
8. Check performance metrics

## Post-Deployment
- [ ] Smoke tests pass
- [ ] Error rate normal
- [ ] Latency within targets
- [ ] Webhooks receiving events
- [ ] Background jobs processing
- [ ] User registration working
- [ ] Payments processing
- [ ] AI responses generating

---

# Conclusion

This 10-day plan delivers a production-ready MVP of DevFlow with all core features specified in the PRD. Each day builds upon the previous, creating a cohesive platform that combines:

✅ **Project Management** (Projects, Issues, Kanban, Sprints)  
✅ **GitHub Integration** (Repositories, PRs, Webhooks, Auto-linking)  
✅ **AI Assistance** (Issue Generation, Summaries, Health Analysis, RAG)  
✅ **Documentation** (Upload, Processing, Search)  
✅ **Billing** (Stripe, Subscriptions, Usage Metering)  
✅ **Multi-Tenancy** (Organizations, Teams, RBAC)  
✅ **Production Ready** (Notifications, Audit Logs, Monitoring, Security)

The architecture supports future expansion to V1 and V2 features without major refactoring.

**Next Steps After Day 10:**
1. Beta launch with select customers
2. Gather feedback on core workflows
3. Iterate on UX based on usage patterns
4. Begin V1 feature development
5. Scale infrastructure based on growth

Good luck building DevFlow! 🚀

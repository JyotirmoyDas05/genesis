# Genesis (Monorepo)

A full-stack, multi-task NLP annotation platform designed for coreference resolution, named-entity recognition (NER), part-of-speech tagging (POS), and word-sense disambiguation (WSD).

## Monorepo Architecture

```text
genesis/
├── apps/
│   ├── web/                    # Next.js 15 (React 19, Tailwind CSS v4, shadcn/ui)
│   └── api/                    # TypeScript backend service (Fastify / Node.js)
├── packages/
│   └── contracts/              # Shared Zod schemas, TypeScript types, and DTO contracts
├── legacy/
│   └── genesis-java/           # Original Java 21 / Spring Boot 3 modular monolith (reference)
├── pnpm-workspace.yaml         # pnpm workspace configuration
└── package.json                # Root orchestration scripts
```

## Workspaces Overview

| Workspace | Path | Stack / Role |
|---|---|---|
| **`@genesis/web`** | `apps/web` | Next.js 15 App Router, React 19, Turbopack, Tailwind v4, shadcn/ui, STOMP WebSockets |
| **`@genesis/api`** | `apps/api` | TypeScript Backend Service |
| **`@genesis/contracts`** | `packages/contracts` | Shared types, Zod validation schemas, API contracts |
| **Legacy Backend** | `legacy/genesis-java` | Java 21, Spring Boot 3.3, Flyway, PostgreSQL modular monolith |

## Quick Start

For a detailed, step-by-step handholding guide, see [**`SETUP.md`**](file:///D:/temp_prs/genesis/SETUP.md).

### Prerequisites
- Node.js >= 20.x
- pnpm >= 9.x

### Installation
```bash
pnpm install
```

### Running the Frontend in Mock Mode (No Backend Needed)
Bypasses authentication and loads realistic mock workspaces, documents, and notifications:
```bash
pnpm dev:mock
```
Then open `http://localhost:3000` to land directly on the dashboard.

### Running with Real Backend Integration
Runs the standard app requiring a running backend on `http://localhost:8080`:
```bash
pnpm dev
# Or specifically:
pnpm --filter @genesis/web dev
```

### Running the API
```bash
pnpm dev:api
# Or specifically:
pnpm --filter @genesis/api dev
```

### Type Checking & Building
```bash
pnpm --filter @genesis/web exec tsc --noEmit
pnpm build
```

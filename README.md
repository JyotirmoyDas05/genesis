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

### Prerequisites
- Node.js >= 20.x
- pnpm >= 9.x

### Installation
```bash
pnpm install
```

### Running the Frontend
```bash
pnpm dev
# Or specifically:
pnpm --filter @genesis/web dev
```

The web application runs on `http://localhost:3000`.

### Running the API
```bash
pnpm dev:api
# Or specifically:
pnpm --filter @genesis/api dev
```

### Type Checking & Building
```bash
pnpm typecheck
pnpm build
```

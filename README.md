# 🤖 DevSpace Auth

Aplicação de autenticação (registro/login) composta por um backend HTTP em Node.js e um frontend em React, usando PostgreSQL via Prisma ORM.

## Estrutura do projeto

```
.
├── apps/
│   ├── backend/     # API HTTP (Node.js nativo, sem framework)
│   └── frontend/    # SPA React (Vite)
├── database/
│   └── prisma/      # Schema e client Prisma (contract-based)
├── docker-compose.yml # Container do PostgreSQL
└── prisma.config.ts
```

## Tecnologias e bibliotecas

### Backend (`apps/backend`)
- **Node.js** (`node --watch`, sem framework HTTP — usa `node:http` nativo)
- **TypeScript**
- **Prisma ORM** (`@prisma/orm-postgres`, contract-based) + **pg** (driver PostgreSQL)
- **bcryptjs** — hash de senhas
- **dotenv** — variáveis de ambiente
- **temporal-polyfill** — polyfill da Temporal API

### Frontend (`apps/frontend`)
- **React 19** + **React Router DOM 7**
- **Vite** — build/dev server
- **TypeScript**
- **Tailwind CSS 4** (`@tailwindcss/vite`, `tw-animate-css`)
- **shadcn/ui** + **@base-ui/react** — componentes de UI
- **React Hook Form** + **@hookform/resolvers** + **Zod** — formulários e validação
- **Sonner** — notificações (toasts)
- **Lucide React** / **React Icons** — ícones
- **Geist Variable** (Fontsource) — fonte

### Banco de dados
- **PostgreSQL 16** (via Docker Compose)
- **Prisma** (schema em `database/prisma/contract.prisma`)

## Pré-requisitos

- Node.js (recomendado v24+)
- Docker e Docker Compose (para o banco de dados)

## Passo a passo para rodar

### 1. Clonar e instalar dependências

```bash
git clone <url-do-repositorio>
cd devspace-auth

# dependências da raiz + backend (workspace)
npm install

# dependências do frontend
cd apps/frontend
npm install
cd ../..
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com a string de conexão do banco:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/devspace_auth"
```

> Nunca commite o `.env` real nem credenciais — o arquivo já está no `.gitignore`.

### 3. Subir o banco de dados

```bash
docker compose up -d
```

Isso sobe um container PostgreSQL (`devspace-postgres`) na porta `5432`, com o banco `devspace_auth`.

### 4. Gerar o contrato/client do Prisma

```bash
npm run contract:emit
```

### 5. Rodar o backend

```bash
npm run dev:backend
```

A API sobe em `http://localhost:3333` (health check em `GET /`), com os endpoints:
- `POST /auth/register`
- `POST /auth/login`

### 6. Rodar o frontend

Em outro terminal:

```bash
cd apps/frontend
npm run dev
```

A aplicação React sobe (por padrão) em `http://localhost:5173`.

## Scripts úteis

| Local | Script | Descrição |
|---|---|---|
| raiz | `npm run dev:backend` | Sobe o backend em modo watch |
| raiz | `npm run contract:emit` | Gera o contrato Prisma a partir do schema |
| `apps/frontend` | `npm run dev` | Sobe o frontend em modo dev |
| `apps/frontend` | `npm run build` | Build de produção do frontend |
| `apps/frontend` | `npm run lint` | Lint do frontend |
| `apps/frontend` | `npm run preview` | Preview do build de produção |

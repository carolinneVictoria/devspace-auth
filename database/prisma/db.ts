import { config } from 'dotenv';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import postgres from '@prisma/orm-postgres/runtime';

// Always read the repo-root .env, regardless of the caller's cwd
// (e.g. `npm run dev --workspace=apps/backend` runs with cwd=apps/backend).
config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../.env') });
import type { Contract } from './contract';
import contractJson from './contract.json' with { type: 'json' };

export const db = postgres<Contract>({
  contractJson,
  url: process.env['DATABASE_URL']!,
});

import bcrypt from 'bcryptjs';
import { db } from '../../../../database/prisma/db.ts';

const SALT_ROUNDS = 10;
const MIN_PASSWORD_LENGTH = 8;

export class AuthError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export interface RegisterInput {
  email: string;
  password: string;
  name?: string | null;
}

export interface LoginInput {
  email: string;
  password: string;
}

export async function registerUser(input: RegisterInput) {
  const email = input.email?.trim().toLowerCase();
  const { password, name } = input;

  if (!email || !password) {
    throw new AuthError('Email e senha são obrigatórios', 400);
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new AuthError(
      `A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres`,
      400,
    );
  }

  const existing = await db.orm.public.User.where({ email }).first();
  if (existing) {
    throw new AuthError('Já existe um usuário com esse email', 409);
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await db.orm.public.User.create({
    email,
    password: passwordHash,
    name: name ?? null,
  });

  return sanitizeUser(user);
}

export async function loginUser(input: LoginInput) {
  const email = input.email?.trim().toLowerCase();
  const { password } = input;

  if (!email || !password) {
    throw new AuthError('Email e senha são obrigatórios', 400);
  }

  const user = await db.orm.public.User.where({ email }).first();
  if (!user) {
    throw new AuthError('Credenciais inválidas', 401);
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new AuthError('Credenciais inválidas', 401);
  }

  return sanitizeUser(user);
}

function sanitizeUser<T extends { password: string }>(user: T): Omit<T, 'password'> {
  const { password: _password, ...rest } = user;
  return rest;
}

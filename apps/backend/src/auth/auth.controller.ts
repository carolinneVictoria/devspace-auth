import { AuthError, loginUser, registerUser } from './auth.service.ts';

export interface ControllerResult {
  status: number;
  body: unknown;
}

export async function register(body: unknown): Promise<ControllerResult> {
  try {
    const { email, password, name } = asRecord(body);
    const user = await registerUser({
      email,
      password,
      name,
    });

    return {
      status: 201,
      body: {
        message: "Conta criada com sucesso!",
        user,
      },
    };
  } catch (err) {
    return toErrorResult(err);
  }
}

export async function login(body: unknown): Promise<ControllerResult> {
  try {
    const { email, password } = asRecord(body);
    const user = await loginUser({ email, password });
    return { status: 200, body: { user } };
  } catch (err) {
    return toErrorResult(err);
  }
}

function asRecord(body: unknown): Record<string, string> {
  if (typeof body !== 'object' || body === null) return {};
  return body as Record<string, string>;
}

function toErrorResult(err: unknown): ControllerResult {
  if (err instanceof AuthError) {
    return { status: err.status, body: { error: err.message } };
  }
  console.error(err);
  return { status: 500, body: { error: 'Erro interno do servidor' } };
}

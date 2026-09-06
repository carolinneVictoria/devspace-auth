import 'temporal-polyfill/global';
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { login, register } from './src/auth/auth.controller.ts';

const PORT = Number(process.env['PORT'] ?? 3333);

async function readJsonBody(req: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(chunk as Buffer);
  }
  if (chunks.length === 0) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    return {};
  }
}

function send(res: ServerResponse, status: number, body: unknown) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(body === undefined ? undefined : JSON.stringify(body));
}

const server = createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    send(res, 204, undefined);
    return;
  }

  if (req.method === 'GET' && (req.url === '/' || req.url === '/health')) {
    send(res, 200, { status: 'ok', service: 'auth' });
    return;
  }

  if (req.method === 'POST' && req.url === '/auth/register') {
    const result = await register(await readJsonBody(req));
    send(res, result.status, result.body);
    return;
  }

  if (req.method === 'POST' && req.url === '/auth/login') {
    const result = await login(await readJsonBody(req));
    send(res, result.status, result.body);
    return;
  }

  send(res, 404, { error: 'Not found' });
});

server.listen(PORT, () => {
  console.log(`auth server listening on http://localhost:${PORT}`);
});

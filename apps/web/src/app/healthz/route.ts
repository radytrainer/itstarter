// Liveness probe for Docker. /api/* belongs to the API (via Nginx), so this lives elsewhere.
export const dynamic = 'force-static';

export function GET() {
  return Response.json({ status: 'ok', service: 'web' });
}

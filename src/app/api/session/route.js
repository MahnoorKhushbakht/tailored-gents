// /app/api/session/route.js
import { getUserFromSession } from "@/lib/auth";

export async function GET() {
  const user = await getUserFromSession();
  return Response.json(user || null);
}

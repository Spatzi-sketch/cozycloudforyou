import { NextResponse } from "next/server";
import { createServerClientFromRequest } from "@/lib/supabase/server";
import { env } from "@/lib/env";

export function isAdminEmail(email: string): boolean {
  if (!env.adminEmail) {
    return false;
  }
  return email.trim().toLowerCase() === env.adminEmail.trim().toLowerCase();
}

export async function getAdminUserFromRequest(request: Request) {
  const { supabase } = await createServerClientFromRequest(
    request as unknown as Parameters<typeof createServerClientFromRequest>[0]
  );

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  if (!isAdminEmail(user.email ?? "")) {
    return null;
  }

  return { user };
}

export async function requireAdmin(
  request: Request
): Promise<{ user: { email?: string | null } } | NextResponse> {
  const admin = await getAdminUserFromRequest(request);
  if (!admin) {
    return new NextResponse(
      JSON.stringify({ message: "Nicht autorisiert. Bitte als Admin einloggen." }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
  return { user: admin.user };
}

import { NextResponse } from "next/server";
import { createServerClientFromRequest } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const { supabase, response } = await createServerClientFromRequest(
    request as unknown as Parameters<typeof createServerClientFromRequest>[0]
  );

  await supabase.auth.signOut();

  return response;
}

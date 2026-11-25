import { NextResponse } from "next/server";
import { createServerClientFromRequest } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { supabase } = await createServerClientFromRequest(
    request as unknown as Parameters<typeof createServerClientFromRequest>[0]
  );

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({
    user: { id: user.id, email: user.email },
  });
}

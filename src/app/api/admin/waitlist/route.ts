import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { waitlistTable } from "@/lib/supabase/query";

export async function GET(request: Request) {
  const admin = await requireAdmin(request);
  if (admin instanceof Response) {
    return admin;
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search");
  const productSlug = searchParams.get("product_slug");

  const db = waitlistTable();
  let query = db.select("*");

  if (status) {
    query = query.eq("status", status);
  }
  if (productSlug) {
    query = query.eq("product_slug", productSlug);
  }
  if (search) {
    query = query.ilike("email", `%${search}%`);
  }
  query = query.order("created_at", { ascending: false });

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  const signups = data ?? [];
  const stats = {
    total: signups.length,
    pending: signups.filter((s) => s.status === "pending").length,
    confirmed: signups.filter((s) => s.status === "confirmed").length,
    notified: signups.filter((s) => s.status === "notified").length,
    unsubscribed: signups.filter((s) => s.status === "unsubscribed").length,
  };

  return NextResponse.json({ signups, stats });
}

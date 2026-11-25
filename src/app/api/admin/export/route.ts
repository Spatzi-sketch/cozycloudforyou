import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { waitlistTable } from "@/lib/supabase/query";

function escapeCsv(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

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

  const rows = data ?? [];
  const lines = [
    ["E-Mail", "Produkt", "Restock-Runde", "Status", "Angemeldet am", "Bestätigt am", "Benachrichtigt am"].join(","),
    ...rows.map((r) =>
      [
        escapeCsv(r.email),
        escapeCsv(r.product_slug),
        String(r.restock_round),
        escapeCsv(r.status),
        escapeCsv(r.created_at),
        escapeCsv(r.confirmed_at ?? ""),
        escapeCsv(r.notified_at ?? ""),
      ].join(",")
    ),
  ];

  const csv = lines.join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="cozy-cloud-warteliste.csv"',
    },
  });
}

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return new Response("No code found", { status: 400 });
  }
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  await supabase.auth.exchangeCodeForSession(code);

  return NextResponse.redirect(url.origin);
}

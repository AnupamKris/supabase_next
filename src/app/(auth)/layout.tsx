import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: user, error } = await supabase.auth.getUser();

  if (user.user) {
    return redirect("/");
  }

  return <main>{children}</main>;
}

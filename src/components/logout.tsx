"use client";

import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const Logout = () => {
  const { toast } = useToast();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (!error) {
      router.push("/login");
    } else {
      toast({
        title: "Error",
        description: error?.message,
        variant: "destructive",
      });
    }
  };
  return <div onClick={handleLogout}>Logout</div>;
};

export default Logout;

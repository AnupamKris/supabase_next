import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Form from "./form";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const loginUser = async (email: string, password: string) => {
    "use server";
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      return redirect("/");
    }

    let errorMessage = "";

    switch (error?.code) {
      case "invalid_credentials":
        errorMessage = "Invalid email or password.";
        break;
      default:
        errorMessage = "An error occurred. Please try again later.";
        break;
    }

    return { error: errorMessage };
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <Form loginUser={loginUser} />
      </CardContent>
      <CardFooter>
        <p className="text-center text-muted-foreground text-sm w-full">
          Don't have an account?{" "}
          <Link href="/signup" className="text-foreground">
            Sign Up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;

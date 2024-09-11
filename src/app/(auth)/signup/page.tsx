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

const SignUpForm = () => {
  const signUpUser = async (email: string, password: string) => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `http://localhost:3000/api/auth/callback`,
      },
    });

    console.log(error);

    if (!error) {
      return redirect("/verify");
    }

    let errorMessage = "";

    switch (error?.code) {
      case "over_email_send_rate_limit":
        errorMessage = "Check your email for a verification link.";
        break;
      case "invalid_email":
        errorMessage = "The email address you provided is invalid.";
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
        <CardTitle className="text-2xl">Signup</CardTitle>
        <CardDescription>
          Enter your details below to create an account.
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <Form signUpUser={signUpUser} />
      </CardContent>
      <CardFooter>
        <p className="text-center text-muted-foreground text-sm w-full">
          Already have an account?{" "}
          <Link href="/login" className="text-foreground">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignUpForm;

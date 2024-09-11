"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";

type FormProp = {
  signUpUser: (
    email: string,
    password: string
  ) => Promise<{
    error: string | null;
  }>;
};

const form: React.FC<FormProp> = ({ signUpUser }) => {
  const [username, setUsername] = useState("AnupamKris");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      setLoading(false);
      return;
    } else if (password.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const res = await signUpUser(username, password);

    console.log(res.error);

    if (res.error) {
      toast({
        title: "Error",
        description: res.error,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
  };

  const { toast } = useToast();

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="username">Email</Label>
        <Input
          id="username"
          type="text"
          placeholder="exampleuser"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <Button className="w-full">
        {loading ? <LoaderCircle className="animate-spin" /> : "Sign Up"}
      </Button>
    </form>
  );
};

export default form;

"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { HelpCircle, LoaderCircle } from "lucide-react";

type FormProp = {
  loginUser: (
    email: string,
    password: string
  ) => Promise<{
    error: string | null;
  }>;
};

const form: React.FC<FormProp> = ({ loginUser }) => {
  const [username, setUsername] = useState("AnupamKris");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const response = await loginUser(username, password);

    if (response?.error) {
      toast({
        title: "Error",
        description: response.error,
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
        <Label htmlFor="username">Username</Label>
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
      <Button className="w-full">
        {loading ? <LoaderCircle className="animate-spin" /> : "Sign in"}
      </Button>
    </form>
  );
};

export default form;


import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Logo } from "@/components/Logo";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean().default(false),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  function onSubmit(values: LoginFormValues) {
    setIsLoading(true);
    
    // Mock authentication process
    setTimeout(() => {
      setIsLoading(false);
      
      // For MVP, we'll just simulate a successful login
      localStorage.setItem("user", JSON.stringify({
        name: "Jane Doe",
        email: values.email,
        avatar: "https://github.com/shadcn.png",
      }));
      
      if (values.rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }
      
      toast({
        title: "Logged in successfully",
        description: "Welcome back to Planit!",
      });
      
      navigate("/trips");
    }, 1500);
  }

  return (
    <Layout>
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="mx-auto w-full max-w-md space-y-8">
          <div className="flex flex-col items-center space-y-4">
            <Logo size="large" />
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-center text-sm text-muted-foreground">
              Enter your email and password to access your account
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link to="/auth/forgot-password" className="text-xs text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange} 
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">Remember me for 30 days</FormLabel>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </Form>

          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/auth/register" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

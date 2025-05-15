
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: ForgotPasswordFormValues) {
    setIsLoading(true);
    
    // Mock password reset process
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      
      toast({
        title: "Reset link sent",
        description: "Check your email for a password reset link.",
      });
    }, 1500);
  }

  if (isSubmitted) {
    return (
      <Layout>
        <div className="flex min-h-[80vh] items-center justify-center">
          <div className="mx-auto w-full max-w-md space-y-8">
            <div className="flex flex-col items-center space-y-4">
              <Logo size="large" />
              <h1 className="text-2xl font-bold">Check your email</h1>
              <p className="text-center text-sm text-muted-foreground">
                We've sent a password reset link to your email address. Please check your inbox.
              </p>
              <div className="pt-4">
                <Link to="/auth/login">
                  <Button variant="outline">Back to login</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="mx-auto w-full max-w-md space-y-8">
          <div className="flex flex-col items-center space-y-4">
            <Logo size="large" />
            <h1 className="text-2xl font-bold">Forgot your password?</h1>
            <p className="text-center text-sm text-muted-foreground">
              No problem. Enter your email and we'll send you a reset link.
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
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send reset link"}
              </Button>
            </form>
          </Form>

          <div className="text-center text-sm">
            Remember your password?{" "}
            <Link to="/auth/login" className="font-medium text-primary hover:underline">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

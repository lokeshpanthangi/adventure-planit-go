
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
import { Progress } from "@/components/ui/progress";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";

const registerSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be at most 20 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain a lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain a number" }),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and privacy policy to continue.",
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  // Calculate password strength whenever password changes
  const watchPassword = form.watch("password");
  
  React.useEffect(() => {
    if (!watchPassword) {
      setPasswordStrength(0);
      return;
    }
    
    let strength = 0;
    
    // Length check
    if (watchPassword.length >= 8) strength += 25;
    
    // Uppercase check
    if (/[A-Z]/.test(watchPassword)) strength += 25;
    
    // Lowercase check
    if (/[a-z]/.test(watchPassword)) strength += 25;
    
    // Number check
    if (/[0-9]/.test(watchPassword)) strength += 25;
    
    setPasswordStrength(strength);
  }, [watchPassword]);

  function onSubmit(values: RegisterFormValues) {
    setIsLoading(true);
    
    // Mock registration process
    setTimeout(() => {
      setIsLoading(false);
      
      // For MVP, we'll just simulate a successful registration
      localStorage.setItem("user", JSON.stringify({
        name: values.username,
        email: values.email,
        avatar: "",
      }));
      
      toast({
        title: "Account created successfully",
        description: "Welcome to Planit! Your adventures await.",
      });
      
      navigate("/");
    }, 1500);
  }
  
  function getStrengthText() {
    if (passwordStrength === 0) return "Enter a password";
    if (passwordStrength <= 25) return "Weak";
    if (passwordStrength <= 75) return "Moderate";
    return "Strong";
  }
  
  function getStrengthColor() {
    if (passwordStrength === 0) return "bg-gray-300";
    if (passwordStrength <= 25) return "bg-red-500";
    if (passwordStrength <= 50) return "bg-orange-500";
    if (passwordStrength <= 75) return "bg-yellow-500";
    return "bg-green-500";
  }

  return (
    <Layout>
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="mx-auto w-full max-w-md space-y-8">
          <div className="flex flex-col items-center space-y-4">
            <Logo size="large" />
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="text-center text-sm text-muted-foreground">
              Enter your details to get started with Planit
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <div className="mt-2 space-y-1">
                      <Progress value={passwordStrength} className={getStrengthColor()} />
                      <FormDescription className="text-xs">{getStrengthText()}</FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange} 
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal">
                        I agree to the{" "}
                        <Link to="/terms" className="font-medium text-primary hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="font-medium text-primary hover:underline">
                          Privacy Policy
                        </Link>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>
          </Form>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/auth/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

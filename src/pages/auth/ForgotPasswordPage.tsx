
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import AnimatedPage from "@/components/AnimatedPage";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await resetPassword(email);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Reset password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatedPage>
      <div className="flex items-center justify-center min-h-screen p-4 bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
            <CardDescription className="text-center">
              {isSubmitted ? 
                "Check your email for reset instructions" : 
                "Enter your email and we'll send you instructions to reset your password"}
            </CardDescription>
          </CardHeader>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Reset Instructions"}
                </Button>
                <div className="text-center text-sm">
                  Remember your password?{" "}
                  <Link to="/auth/login" className="text-primary hover:underline">
                    Back to login
                  </Link>
                </div>
              </CardFooter>
            </form>
          ) : (
            <CardContent className="space-y-6">
              <div className="text-center p-6">
                <div className="my-4 text-muted-foreground">
                  We've sent an email to <strong>{email}</strong> with instructions to reset your password.
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                >
                  Try another email
                </Button>
                <Link to="/auth/login">
                  <Button variant="link" className="w-full">
                    Back to login
                  </Button>
                </Link>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </AnimatedPage>
  );
}

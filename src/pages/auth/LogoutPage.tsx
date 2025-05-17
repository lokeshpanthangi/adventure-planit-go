
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { AnimatedPage } from "@/components/AnimatedPage";

export default function LogoutPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
        navigate("/");
      } catch (error) {
        console.error("Logout error:", error);
        navigate("/");
      }
    };

    performLogout();
  }, [logout, navigate]);

  return (
    <AnimatedPage>
      <div className="flex items-center justify-center min-h-screen p-4 bg-background">
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
            <Spinner size="lg" />
            <p>Logging out...</p>
          </CardContent>
        </Card>
      </div>
    </AnimatedPage>
  );
}

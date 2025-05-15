
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export default function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear local storage
    localStorage.removeItem("user");
    localStorage.removeItem("rememberMe");
    
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    
    // Redirect to login page
    navigate("/auth/login");
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-center text-muted-foreground">Logging out...</p>
    </div>
  );
}

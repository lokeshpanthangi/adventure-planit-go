
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-primary-light dark:text-primary-dark">
            404
          </h1>
          <h2 className="text-3xl font-bold">Page not found</h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="flex justify-center gap-2">
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
          <Link to="/trips">
            <Button variant="outline">View Trips</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

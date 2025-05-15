import { Home, Map, User, Settings } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";

type NavItem = {
  title: string;
  icon: React.ElementType;
  path: string;
};

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: Home,
    path: "/"
  },
  {
    title: "My Trips",
    icon: Map,
    path: "/trips"
  },
  {
    title: "Profile",
    icon: User,
    path: "/profile"
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings"
  }
];

export function Navigation() {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 z-10 flex w-full justify-around border-t bg-background p-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.title}
              to={item.path}
              className={cn(
                "flex flex-col items-center rounded-md p-2 transition-colors",
                isActive
                  ? "text-primary-light dark:text-primary-dark"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.title}</span>
              {isActive && (
                <div className="mt-1 h-1 w-1 rounded-full bg-primary-light dark:bg-primary-dark" />
              )}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="hidden h-screen w-64 flex-col border-r bg-sidebar p-4 md:flex">
      <div className="mb-8 mt-4 flex justify-center">
        <Logo size="default" />
      </div>
      <div className="space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.title}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
                isActive
                  ? "bg-sidebar-accent text-primary-light dark:text-primary-dark"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
              {isActive && (
                <div className="ml-auto h-2 w-2 rounded-full bg-primary-light dark:bg-primary-dark" />
              )}
            </Link>
          );
        })}
      </div>
      <div className="mt-auto p-4">
        <div className="rounded-md bg-sidebar-accent p-4">
          <p className="text-sm text-muted-foreground">
            Ready to plan your next adventure?
          </p>
          <Link to="/trips/new" className="mt-2 block text-center">
            <button className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
              Create Trip
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

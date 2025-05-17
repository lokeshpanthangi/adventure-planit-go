
import { Home, Map, User, Settings, Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "./ui/dropdown-menu";

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
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth(); // Use the useAuth hook to get the current user
  const isLoggedIn = !!user; // Determine login status based on user
  
  // Mobile Navigation
  if (isMobile) {
    return (
      <>
        {/* Top Bar for Mobile */}
        <div className="fixed top-0 left-0 z-20 w-full bg-background border-b p-3 flex justify-between items-center">
          <Logo size="small" />
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
        
        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-10 pt-16 bg-background">
            <nav className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || 
                  (item.path === "/trips" && location.pathname.startsWith("/trips"));
                return (
                  <Link
                    key={item.title}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 rounded-md p-3 transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-primary-light dark:text-primary-dark"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
              
              <div className="mt-4 space-y-2">
                {isLoggedIn ? (
                  <>
                    <div className="p-3 mb-2">
                      <p className="text-sm font-medium">Signed in as</p>
                      <p className="text-primary">{user?.username || user?.email}</p>
                    </div>
                    <Link to="/auth/logout" className="w-full">
                      <Button variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                        Logout
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/auth/login" className="w-full">
                      <Button variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                        Login
                      </Button>
                    </Link>
                    <Link to="/auth/register" className="w-full">
                      <Button className="w-full" onClick={() => setIsOpen(false)}>
                        Register
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
        
        {/* Bottom Nav for Mobile */}
        <nav className="fixed bottom-0 left-0 z-10 flex w-full justify-around border-t bg-background p-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path === "/trips" && location.pathname.startsWith("/trips"));
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
      </>
    );
  }

  // Desktop Navigation
  return (
    <nav className="fixed top-0 left-0 z-10 w-full bg-background border-b">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-8">
          <Link to="/">
            <Logo size="default" />
          </Link>
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path === "/trips" && location.pathname.startsWith("/trips"));
              return (
                <Link
                  key={item.title}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
                    isActive
                      ? "bg-sidebar-accent/20 text-primary-light dark:text-primary-dark"
                      : "text-foreground hover:bg-sidebar-accent/10"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar_url || ''} />
                    <AvatarFallback>
                      {user?.username ? user.username.substring(0, 2).toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  {user?.username || user?.email || 'My Account'}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to="/profile">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <Link to="/settings">
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                </Link>
                <Link to="/trips/new">
                  <DropdownMenuItem>Create Trip</DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <Link to="/auth/logout">
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/auth/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/auth/register">
                <Button>Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

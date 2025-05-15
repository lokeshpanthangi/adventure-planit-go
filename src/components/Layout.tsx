
import { ThemeToggle } from "./ThemeToggle";
import { Navigation } from "./Navigation";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16 pb-16 md:pt-20 md:pb-0 p-4 md:p-6">
        <div className="container mx-auto">
          {children}
        </div>
      </main>
      <div className="fixed top-4 right-4 z-20">
        <ThemeToggle />
      </div>
    </div>
  );
}

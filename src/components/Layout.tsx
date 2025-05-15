
import { ThemeToggle } from "./ThemeToggle";
import { Navigation } from "./Navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { Logo } from "./Logo";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        <Navigation />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
            {isMobile && <Logo size="small" />}
            <div className="ml-auto flex items-center gap-4">
              <ThemeToggle />
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

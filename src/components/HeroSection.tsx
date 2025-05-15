
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { ArrowRight, Users, Calendar, Map } from "lucide-react";

export function HeroSection() {
  return (
    <div className="flex flex-col items-center px-4 py-12 text-center md:px-6">
      <div className="mb-6 flex animate-slide-in items-center justify-center">
        <Logo size="large" />
      </div>
      <h1 className="animate-fade-in text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        Adventure Together, <span className="text-primary-light dark:text-primary-dark">Plan Better</span>
      </h1>
      <p className="mt-4 max-w-[42rem] animate-fade-in text-muted-foreground sm:text-xl">
        Collaborative trip planning made easy. Create, share, and plan your next adventure with friends and family.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link to="/trips/new">
          <Button className="h-11 px-8 animate-fade-in" size="lg">
            Create Trip <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Button
          variant="outline"
          className="h-11 px-8 animate-fade-in"
          size="lg"
        >
          Join Trip
        </Button>
      </div>

      <div className="mt-16 grid animate-fade-in gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col items-center rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md">
          <Users className="mb-4 h-10 w-10 text-primary-light dark:text-primary-dark" />
          <h3 className="text-xl font-bold">Collaborate</h3>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Invite friends and family to plan together in real-time.
          </p>
        </div>
        <div className="flex flex-col items-center rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md">
          <Calendar className="mb-4 h-10 w-10 text-primary-light dark:text-primary-dark" />
          <h3 className="text-xl font-bold">Organize</h3>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Create detailed itineraries with activities and accommodations.
          </p>
        </div>
        <div className="flex flex-col items-center rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md">
          <Map className="mb-4 h-10 w-10 text-primary-light dark:text-primary-dark" />
          <h3 className="text-xl font-bold">Explore</h3>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Discover destinations and create custom maps for your trips.
          </p>
        </div>
      </div>
    </div>
  );
}

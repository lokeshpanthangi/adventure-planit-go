
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { TripCard } from "@/components/TripCard";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

// Sample trip data
const trips = [
  {
    id: "1",
    title: "Beach Vacation",
    destination: "Maldives",
    startDate: "2025-07-15",
    endDate: "2025-07-25",
    collaborators: 4,
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "2",
    title: "Mountain Retreat",
    destination: "Swiss Alps",
    startDate: "2025-08-10",
    endDate: "2025-08-20",
    collaborators: 2,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "3",
    title: "City Explorer",
    destination: "Tokyo",
    startDate: "2025-09-05",
    endDate: "2025-09-15",
    collaborators: 3,
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
];

const TripsPage = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Trips</h1>
            <p className="text-muted-foreground">
              Manage and view your upcoming adventures
            </p>
          </div>
          <Link to="/trips/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Trip
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <TripCard key={trip.id} {...trip} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default TripsPage;

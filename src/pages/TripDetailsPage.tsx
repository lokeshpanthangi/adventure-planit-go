
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { TripDashboard } from "@/components/trip/TripDashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TripTimeline } from "@/components/trip/TripTimeline";
import { Skeleton } from "@/components/ui/skeleton";

// Demo trip data - in a real app, this would come from an API
const DEMO_TRIP = {
  id: "123",
  name: "Summer Adventure",
  destination: "Paris, France",
  startDate: "2025-07-15",
  endDate: "2025-07-25",
  coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  budget: 5000,
  collaborators: 4,
  tripCode: "ABC123",
  activities: [
    {
      id: "act1",
      title: "Visit the Eiffel Tower",
      category: "sightseeing",
      date: "2025-07-16",
      time: "10:00",
      location: "Champ de Mars, 5 Avenue Anatole France",
      cost: 25,
      isLockedIn: true,
      votes: 4,
      createdBy: {
        name: "Jane Doe",
        avatar: "https://i.pravatar.cc/32?u=1",
      },
      notes: "Buy tickets in advance to skip the line.",
      image: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: "act2",
      title: "Dinner at Le Jules Verne",
      category: "food",
      date: "2025-07-16",
      time: "19:00",
      location: "Avenue Gustave Eiffel",
      cost: 200,
      isLockedIn: false,
      votes: 2,
      createdBy: {
        name: "John Smith",
        avatar: "https://i.pravatar.cc/32?u=2",
      },
      notes: "Reservation required at least 2 months in advance.",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: "act3",
      title: "Visit the Louvre Museum",
      category: "culture",
      date: "2025-07-17",
      time: "09:00",
      location: "Rue de Rivoli",
      cost: 15,
      isLockedIn: true,
      votes: 3,
      createdBy: {
        name: "Alice Johnson",
        avatar: "https://i.pravatar.cc/32?u=3",
      },
      notes: "Plan at least 4 hours to see the highlights.",
      image: "https://images.unsplash.com/photo-1499426600726-a950358acf16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    }
  ],
};

const TripDetailsPage = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch trip details
    setTimeout(() => {
      setTrip(DEMO_TRIP);
      setLoading(false);
    }, 1000);
  }, [tripId]);
  
  if (loading) {
    return (
      <Layout>
        <div className="space-y-6">
          <Skeleton className="h-[300px] w-full" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-[200px]" />
        </div>
      </Layout>
    );
  }
  
  if (!trip) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-20">
          <h1 className="text-2xl font-bold mb-4">Trip not found</h1>
          <p className="text-muted-foreground mb-6">
            The trip you're looking for doesn't exist or you don't have access to it.
          </p>
          <Button asChild>
            <Link to="/trips">Back to My Trips</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <Tabs defaultValue="dashboard" className="w-full">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Activity
            </Button>
          </div>
        </div>
        
        <TabsContent value="dashboard" className="mt-0">
          <TripDashboard trip={trip} />
        </TabsContent>
        
        <TabsContent value="timeline" className="mt-0">
          <TripTimeline trip={trip} />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default TripDetailsPage;

// Import necessary components
import { Link } from "react-router-dom";
import { Plus, Share } from "lucide-react";

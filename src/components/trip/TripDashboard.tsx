
import { useState } from "react";
import { format } from "date-fns";
import { CalendarDays, MapPin, Users, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { TripActivityCard } from "./TripActivityCard";
import { ActivityModal } from "./ActivityModal";

type TripDashboardProps = {
  trip: any;
};

export function TripDashboard({ trip }: TripDashboardProps) {
  const [isAddActivityModalOpen, setIsAddActivityModalOpen] = useState(false);
  
  // Calculate days until trip
  const now = new Date();
  const startDate = new Date(trip.startDate);
  const daysUntilTrip = Math.max(0, Math.ceil((startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  
  // Calculate planning completion (for demo purposes)
  const planningCompletion = Math.min(100, Math.max(10, trip.activities ? (trip.activities.length * 10) : 10));
  
  return (
    <div className="space-y-8">
      <div className="relative rounded-lg overflow-hidden mb-8">
        <AspectRatio ratio={21/9} className="bg-muted">
          <img 
            src={trip.coverImage || "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"} 
            alt={trip.name}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{trip.name}</h1>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{trip.destination}</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>
                  {format(new Date(trip.startDate), "MMM d")} - {format(new Date(trip.endDate), "MMM d, yyyy")}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{trip.collaborators || 1} people</span>
              </div>
            </div>
          </div>
        </AspectRatio>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{daysUntilTrip}</div>
            <div className="text-muted-foreground">Days until trip</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{trip.activities ? trip.activities.length : 0}</div>
            <div className="text-muted-foreground">Planned activities</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {trip.budget ? `$${trip.budget.toLocaleString()}` : 'Not set'}
            </div>
            <div className="text-muted-foreground">Budget</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">Planning Progress</h2>
            <p className="text-sm text-muted-foreground">Complete your trip planning</p>
          </div>
          <div className="text-sm font-medium">{planningCompletion}%</div>
        </div>
        <Progress value={planningCompletion} className="h-2" />
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">Activities</h2>
          <p className="text-sm text-muted-foreground">Plan what you'll do on your trip</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsAddActivityModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Activity
          </Button>
          <Button variant="outline">
            <Users className="mr-2 h-4 w-4" />
            Invite Friends
          </Button>
        </div>
      </div>
      
      {trip.activities && trip.activities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trip.activities.map((activity: any) => (
            <TripActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      ) : (
        <Card className="bg-muted/40">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Clock className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No activities yet</h3>
            <p className="text-center text-muted-foreground mb-6">
              Start planning what you'll do during your trip
            </p>
            <Button onClick={() => setIsAddActivityModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add First Activity
            </Button>
          </CardContent>
        </Card>
      )}
      
      <ActivityModal
        isOpen={isAddActivityModalOpen}
        onClose={() => setIsAddActivityModalOpen(false)}
        tripId={trip.id}
        startDate={trip.startDate}
        endDate={trip.endDate}
      />
    </div>
  );
}

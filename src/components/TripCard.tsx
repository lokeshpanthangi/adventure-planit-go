
import { Calendar, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { TripCardAnimation } from "@/components/ui/trip-card-animation";

interface TripCardProps {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  collaborators?: number;
  image?: string;
  viewMode?: "grid" | "list";
  index?: number;
}

export function TripCard({
  id,
  title,
  destination,
  startDate,
  endDate,
  collaborators = 0,
  image,
  viewMode = "grid",
  index = 0,
}: TripCardProps) {
  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMM d");
  };

  // Calculate if trip is upcoming or past
  const now = new Date();
  const tripStart = new Date(startDate);
  const isUpcoming = tripStart > now;

  return (
    <TripCardAnimation tripId={id} delay={index}>
      <Card
        className={cn(
          "overflow-hidden transition-all hover-elevate",
          viewMode === "list" ? "flex flex-row h-32" : "h-full"
        )}
      >
        <div
          className={cn(
            "relative",
            viewMode === "list" ? "w-1/3" : "w-full"
          )}
        >
          <AspectRatio
            ratio={viewMode === "list" ? 16 / 9 : 16 / 9}
            className={viewMode === "list" ? "h-full" : ""}
          >
            <img
              src={image || "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"}
              alt={title}
              className="object-cover w-full h-full"
            />
            {isUpcoming && (
              <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                Upcoming
              </div>
            )}
          </AspectRatio>
        </div>
        
        <div className={viewMode === "list" ? "w-2/3 flex flex-col" : ""}>
          <CardContent className={cn(
            "p-4",
            viewMode === "list" ? "flex-1" : ""
          )}>
            <h3 className="font-bold text-lg mb-1 truncate">{title}</h3>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <MapPin className="w-3.5 h-3.5 mr-1" />
              <span className="truncate">{destination}</span>
            </div>
          </CardContent>
          
          <CardFooter className={cn(
            "flex justify-between p-4 pt-0 text-sm",
            viewMode === "list" ? "border-t" : "border-t"
          )}>
            <div className="flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1 text-muted-foreground" />
              <span>
                {formatDate(startDate)} - {formatDate(endDate)}
              </span>
            </div>
            {collaborators > 0 && (
              <div className="flex items-center">
                <Users className="w-3.5 h-3.5 mr-1 text-muted-foreground" />
                <span>{collaborators}</span>
              </div>
            )}
          </CardFooter>
        </div>
      </Card>
    </TripCardAnimation>
  );
}

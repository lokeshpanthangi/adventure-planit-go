
import { Calendar, MapPin, Users } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface TripCardProps {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  collaborators: number;
  image?: string;
}

export function TripCard({
  id,
  title,
  destination,
  startDate,
  endDate,
  collaborators,
  image = "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
}: TripCardProps) {
  const formatDateRange = () => {
    const start = new Date(startDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const end = new Date(endDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return `${start} - ${end}`;
  };

  return (
    <Card className="overflow-hidden card-hover">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="flex flex-col space-y-1.5">
          <h3 className="font-semibold text-lg">{title}</h3>
          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="mr-1 h-4 w-4" />
            <span>{destination}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-1 h-4 w-4" />
          <span>{formatDateRange()}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="mr-1 h-4 w-4" />
          <span>{collaborators} collaborators</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/trips/${id}`} className="w-full">
          <Button className="w-full">View Trip</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

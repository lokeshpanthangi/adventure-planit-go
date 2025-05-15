
import { Calendar, MapPin, Users, Edit, Trash2, Share } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface TripCardProps {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  collaborators: number;
  image?: string;
  viewMode?: "grid" | "list";
}

export function TripCard({
  id,
  title,
  destination,
  startDate,
  endDate,
  collaborators,
  image = "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  viewMode = "grid",
}: TripCardProps) {
  const formatDateRange = () => {
    const start = format(new Date(startDate), "MMM d");
    const end = format(new Date(endDate), "MMM d, yyyy");
    return `${start} - ${end}`;
  };

  const handleShare = () => {
    // In a real app, this would generate a sharing link
    navigator.clipboard.writeText(`https://planit.app/trips/${id}`);
    toast({
      title: "Link copied!",
      description: "Share this link with your friends to invite them.",
    });
  };

  const handleDelete = () => {
    // In a real app, this would delete the trip
    toast({
      title: "Trip deleted",
      description: `"${title}" has been removed from your trips.`,
    });
  };

  if (viewMode === "list") {
    return (
      <div className="flex items-center border rounded-lg overflow-hidden bg-card card-hover">
        <div className="h-full w-24 md:w-48 relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{title}</h3>
              <div className="flex items-center text-muted-foreground text-sm mt-1">
                <MapPin className="mr-1 h-4 w-4" />
                <span>{destination}</span>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-more-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to={`/trips/${id}/edit`} className="flex w-full cursor-pointer items-center">
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleShare}>
                  <Share className="mr-2 h-4 w-4" /> Share
                </DropdownMenuItem>
                <Dialog>
                  <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Trip</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete "{title}"? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => document.querySelector('[data-state="open"]')?.setAttribute('data-state', 'closed')}>
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={handleDelete}>Delete Trip</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm mt-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              <span>{formatDateRange()}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="mr-1 h-4 w-4" />
              <span>{collaborators} collaborators</span>
            </div>
          </div>
          
          <div className="mt-4">
            <Link to={`/trips/${id}`}>
              <Button>View Trip</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg">{title}</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-more-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to={`/trips/${id}/edit`} className="flex w-full cursor-pointer items-center">
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleShare}>
                  <Share className="mr-2 h-4 w-4" /> Share
                </DropdownMenuItem>
                <Dialog>
                  <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Trip</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete "{title}"? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => document.querySelector('[data-state="open"]')?.setAttribute('data-state', 'closed')}>
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={handleDelete}>Delete Trip</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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

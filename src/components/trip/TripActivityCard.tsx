
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ActivityVote } from "./ActivityVote";
import { Badge } from "@/components/ui/badge";

interface TripActivityCardProps {
  activity: {
    id: string;
    title: string;
    category: string;
    date: string;
    time: string;
    location: string;
    cost: number;
    isLockedIn: boolean;
    votes: number;
    createdBy: {
      name: string;
      avatar: string;
    };
    notes?: string;
    image?: string;
  };
}

export function TripActivityCard({ activity }: TripActivityCardProps) {
  const categoryColors: Record<string, { bg: string; text: string }> = {
    sightseeing: { 
      bg: "bg-blue-100 dark:bg-blue-900/30", 
      text: "text-blue-700 dark:text-blue-400" 
    },
    food: { 
      bg: "bg-orange-100 dark:bg-orange-900/30", 
      text: "text-orange-700 dark:text-orange-400" 
    },
    culture: { 
      bg: "bg-purple-100 dark:bg-purple-900/30", 
      text: "text-purple-700 dark:text-purple-400" 
    },
    adventure: { 
      bg: "bg-green-100 dark:bg-green-900/30", 
      text: "text-green-700 dark:text-green-400" 
    },
    shopping: { 
      bg: "bg-pink-100 dark:bg-pink-900/30", 
      text: "text-pink-700 dark:text-pink-400" 
    },
  };

  const categoryColor = categoryColors[activity.category.toLowerCase()] || { 
    bg: "bg-gray-100 dark:bg-gray-800", 
    text: "text-gray-700 dark:text-gray-300" 
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
      className="relative"
    >
      <Card 
        className={cn(
          "overflow-hidden transition-all hover:shadow-md",
          activity.isLockedIn && "ring-1 ring-green-500"
        )}
      >
        <div className="relative">
          <AspectRatio ratio={16/9}>
            <img 
              src={activity.image || "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"} 
              alt={activity.title} 
              className="object-cover w-full h-full"
            />
          </AspectRatio>
          
          <div className="absolute top-2 left-2 right-2 flex justify-between items-center">
            <Badge className={cn("capitalize", categoryColor.bg, categoryColor.text)}>
              {activity.category}
            </Badge>
            
            {activity.isLockedIn && (
              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 border-green-500">
                Locked In
              </Badge>
            )}
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg">{activity.title}</h3>
            <ActivityVote 
              votes={activity.votes} 
              userVoted={false}
              isLockedIn={activity.isLockedIn}
              lockThreshold={3}
            />
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{format(new Date(activity.date), "EEEE, MMM d")}</span>
            </div>
            
            <div className="flex items-center text-muted-foreground">
              <Clock className="w-4 h-4 mr-2" />
              <span>{activity.time}</span>
            </div>
            
            <div className="flex items-center text-muted-foreground">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="truncate">{activity.location}</span>
            </div>
            
            <div className="flex items-center text-muted-foreground">
              <DollarSign className="w-4 h-4 mr-2" />
              <span>${activity.cost}</span>
            </div>
          </div>
          
          {activity.notes && (
            <div className="mt-3 text-sm text-muted-foreground">
              <p className="line-clamp-2">{activity.notes}</p>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="p-4 pt-0 border-t flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={activity.createdBy.avatar} />
              <AvatarFallback>{activity.createdBy.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">
              Added by {activity.createdBy.name}
            </span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

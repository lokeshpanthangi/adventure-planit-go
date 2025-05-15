
import { format } from "date-fns";
import { MapPin, Clock, DollarSign, Star, ThumbsUp } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useState } from "react";
import { createRippleEffect } from "@/lib/animation";

// Activity categories with their colors
const CATEGORIES = {
  sightseeing: { label: "Sightseeing", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
  food: { label: "Food & Drink", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300" },
  adventure: { label: "Adventure", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
  relaxation: { label: "Relaxation", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" },
  culture: { label: "Culture", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
  shopping: { label: "Shopping", color: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300" },
  nightlife: { label: "Nightlife", color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300" },
  transportation: { label: "Transportation", color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300" },
};

type TripActivityCardProps = {
  activity: {
    id: string;
    title: string;
    category: keyof typeof CATEGORIES;
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
};

export function TripActivityCard({ activity }: TripActivityCardProps) {
  const categoryInfo = CATEGORIES[activity.category] || CATEGORIES.sightseeing;
  const [isHovered, setIsHovered] = useState(false);
  const [votes, setVotes] = useState(activity.votes);
  const [hasVoted, setHasVoted] = useState(false);
  
  // Format time to 12-hour format
  const formatTimeString = (timeString: string) => {
    try {
      const [hours, minutes] = timeString.split(':').map(Number);
      return format(new Date().setHours(hours, minutes), 'h:mm a');
    } catch (e) {
      return timeString;
    }
  };
  
  const handleVote = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Add ripple effect to vote button
    createRippleEffect(e);
    
    if (hasVoted) {
      setVotes(votes - 1);
      setHasVoted(false);
    } else {
      setVotes(votes + 1);
      setHasVoted(true);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className={`overflow-hidden transition-all duration-300 ${activity.isLockedIn ? 'border-primary shadow-md' : ''}`}>
        {activity.image && (
          <div className="aspect-video w-full overflow-hidden">
            <motion.img 
              src={activity.image} 
              alt={activity.title} 
              className="h-full w-full object-cover"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.4 }}
            />
          </div>
        )}
        
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <Badge variant="outline" className={categoryInfo.color}>
              {categoryInfo.label}
            </Badge>
            {activity.isLockedIn && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 500, 
                  damping: 15 
                }}
              >
                <Badge className="bg-primary text-primary-foreground">
                  <Star className="mr-1 h-3 w-3" />
                  Locked In
                </Badge>
              </motion.div>
            )}
          </div>
          
          <h3 className="font-semibold text-lg mb-2">{activity.title}</h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              <span>
                {format(new Date(activity.date), "EEE, MMM d")} • {formatTimeString(activity.time)}
              </span>
            </div>
            
            <div className="flex items-center text-muted-foreground">
              <MapPin className="mr-2 h-4 w-4" />
              <span>{activity.location}</span>
            </div>
            
            {activity.cost > 0 && (
              <div className="flex items-center text-muted-foreground">
                <DollarSign className="mr-2 h-4 w-4" />
                <span>${activity.cost.toLocaleString()}</span>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src={activity.createdBy.avatar || "https://i.pravatar.cc/32"} 
              alt={activity.createdBy.name}
              className="h-6 w-6 rounded-full mr-2 border-2 border-background"
            />
            <span className="text-xs text-muted-foreground">Added by {activity.createdBy.name}</span>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant={hasVoted ? "default" : "ghost"} 
              size="sm"
              className={`flex items-center gap-1 transition-all ${hasVoted ? 'bg-primary text-primary-foreground' : ''}`}
              onClick={handleVote}
            >
              <ThumbsUp className={`h-4 w-4 ${hasVoted ? 'fill-current' : ''}`} />
              <motion.span
                key={votes}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {votes}
              </motion.span>
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

// Calendar icon component
function Calendar(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

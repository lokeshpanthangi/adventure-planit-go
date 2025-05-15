
import { useState } from "react";
import { format } from "date-fns";
import { CalendarDays, MapPin, Users, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { TripActivityCard } from "./TripActivityCard";
import { ActivityModal } from "./ActivityModal";
import { motion } from "framer-motion";
import { slideUp, staggerChildren } from "@/lib/animation";

type TripDashboardProps = {
  trip: any;
};

export function TripDashboard({ trip }: TripDashboardProps) {
  const [isAddActivityModalOpen, setIsAddActivityModalOpen] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  
  // Calculate days until trip
  const now = new Date();
  const startDate = new Date(trip.startDate);
  const daysUntilTrip = Math.max(0, Math.ceil((startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  
  // Calculate planning completion (for demo purposes)
  const planningCompletion = Math.min(100, Math.max(10, trip.activities ? (trip.activities.length * 10) : 10));
  
  // Animate progress bar on component mount
  useState(() => {
    const timer = setTimeout(() => {
      setProgressValue(planningCompletion);
    }, 500);
    return () => clearTimeout(timer);
  });

  return (
    <motion.div 
      className="space-y-8"
      variants={staggerChildren(0.1)}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="relative rounded-lg overflow-hidden mb-8"
        variants={slideUp}
      >
        <AspectRatio ratio={21/9} className="bg-muted">
          <motion.img 
            src={trip.coverImage || "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"} 
            alt={trip.name}
            className="object-cover w-full h-full"
            initial={{ scale: 1.1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 right-0 p-6 text-white"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
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
          </motion.div>
        </AspectRatio>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.2,
            }
          }
        }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0, 
              transition: { duration: 0.4 }
            }
          }}
        >
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <motion.div 
                className="text-2xl font-bold"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
              >
                {daysUntilTrip}
              </motion.div>
              <div className="text-muted-foreground">Days until trip</div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0, 
              transition: { duration: 0.4, delay: 0.1 }
            }
          }}
        >
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <motion.div 
                className="text-2xl font-bold"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
              >
                {trip.activities ? trip.activities.length : 0}
              </motion.div>
              <div className="text-muted-foreground">Planned activities</div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0, 
              transition: { duration: 0.4, delay: 0.2 }
            }
          }}
        >
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <motion.div 
                className="text-2xl font-bold"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
              >
                {trip.budget ? `$${trip.budget.toLocaleString()}` : 'Not set'}
              </motion.div>
              <div className="text-muted-foreground">Budget</div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="mb-8"
        variants={slideUp}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">Planning Progress</h2>
            <p className="text-sm text-muted-foreground">Complete your trip planning</p>
          </div>
          <div className="text-sm font-medium">{planningCompletion}%</div>
        </div>
        <Progress value={progressValue} className="h-2" />
      </motion.div>
      
      <motion.div 
        className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-6"
        variants={slideUp}
      >
        <div>
          <h2 className="text-xl font-bold">Activities</h2>
          <p className="text-sm text-muted-foreground">Plan what you'll do on your trip</p>
        </div>
        <div className="flex gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={() => setIsAddActivityModalOpen(true)}
              className="group"
            >
              <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
              Add Activity
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="outline"
              className="group"
            >
              <Users className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              Invite Friends
            </Button>
          </motion.div>
        </div>
      </motion.div>
      
      {trip.activities && trip.activities.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
              }
            }
          }}
        >
          {trip.activities.map((activity: any, index: number) => (
            <motion.div
              key={activity.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { duration: 0.4, delay: index * 0.1 }
                }
              }}
            >
              <TripActivityCard activity={activity} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          variants={slideUp}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-muted/40 hover:shadow-md transition-shadow">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Clock className="h-12 w-12 text-muted-foreground mb-4" />
              </motion.div>
              <h3 className="text-xl font-medium mb-2">No activities yet</h3>
              <p className="text-center text-muted-foreground mb-6">
                Start planning what you'll do during your trip
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button onClick={() => setIsAddActivityModalOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add First Activity
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      )}
      
      <ActivityModal
        isOpen={isAddActivityModalOpen}
        onClose={() => setIsAddActivityModalOpen(false)}
        tripId={trip.id}
        startDate={trip.startDate}
        endDate={trip.endDate}
      />
    </motion.div>
  );
}

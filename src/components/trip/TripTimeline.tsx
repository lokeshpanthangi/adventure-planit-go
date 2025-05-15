
import { useMemo, useState } from "react";
import { format, addDays, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TripActivityCard } from "./TripActivityCard";
import { staggerChildren, slideInLeft, slideInRight } from "@/lib/animation";

type TripTimelineProps = {
  trip: any;
};

export function TripTimeline({ trip }: TripTimelineProps) {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  
  // Generate an array of dates from trip start to end date
  const tripDays = useMemo(() => {
    const days = [];
    const startDate = new Date(trip.startDate);
    const endDate = new Date(trip.endDate);
    
    let currentDate = startDate;
    while (currentDate <= endDate) {
      days.push(new Date(currentDate));
      currentDate = addDays(currentDate, 1);
    }
    
    return days;
  }, [trip.startDate, trip.endDate]);
  
  const currentDay = tripDays[currentDayIndex];
  
  // Filter activities for the current day
  const currentDayActivities = useMemo(() => {
    if (!trip.activities) return [];
    
    return trip.activities.filter((activity: any) => 
      isSameDay(new Date(activity.date), currentDay)
    ).sort((a: any, b: any) => {
      // Sort by time
      return a.time.localeCompare(b.time);
    });
  }, [trip.activities, currentDay]);
  
  const goToPrevDay = () => {
    if (currentDayIndex > 0) {
      setDirection("left");
      setCurrentDayIndex(currentDayIndex - 1);
    }
  };
  
  const goToNextDay = () => {
    if (currentDayIndex < tripDays.length - 1) {
      setDirection("right");
      setCurrentDayIndex(currentDayIndex + 1);
    }
  };
  
  // Group activities by time of day
  const groupedActivities = useMemo(() => {
    const groups = {
      morning: [] as any[],
      afternoon: [] as any[],
      evening: [] as any[],
    };
    
    currentDayActivities.forEach((activity: any) => {
      const [hours, _] = activity.time.split(':').map(Number);
      
      if (hours < 12) {
        groups.morning.push(activity);
      } else if (hours < 17) {
        groups.afternoon.push(activity);
      } else {
        groups.evening.push(activity);
      }
    });
    
    return groups;
  }, [currentDayActivities]);
  
  return (
    <motion.div 
      className="space-y-8"
      variants={staggerChildren(0.1)}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex flex-col space-y-4" variants={slideInLeft}>
        <h2 className="text-2xl font-bold">Trip Timeline</h2>
        
        {/* Day selector */}
        <div className="flex items-center justify-between bg-card rounded-lg p-4 border">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button 
              variant="outline" 
              size="icon"
              onClick={goToPrevDay}
              disabled={currentDayIndex === 0}
              className="transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </motion.div>
          
          <div className="flex-1 overflow-auto px-4">
            <div className="flex justify-center gap-1 md:gap-2">
              {tripDays.map((day, index) => (
                <Button
                  key={index}
                  variant={index === currentDayIndex ? "default" : "outline"}
                  className={cn(
                    "min-w-16 text-xs transition-all duration-300",
                    index === currentDayIndex ? "pointer-events-none scale-110" : "",
                    Math.abs(index - currentDayIndex) > 3 ? "opacity-50" : ""
                  )}
                  onClick={() => {
                    setDirection(index > currentDayIndex ? "right" : "left");
                    setCurrentDayIndex(index);
                  }}
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-normal">
                      {format(day, "EEE")}
                    </span>
                    <span className="text-lg font-bold">
                      {format(day, "d")}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
          
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button 
              variant="outline" 
              size="icon"
              onClick={goToNextDay}
              disabled={currentDayIndex === tripDays.length - 1}
              className="transition-all"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
      
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentDayIndex}
          initial={{ opacity: 0, x: direction === "right" ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction === "right" ? -50 : 50 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-6">
            <motion.h3 
              className="text-xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              {format(currentDay, "EEEE, MMMM d, yyyy")}
            </motion.h3>
            <motion.p 
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Day {currentDayIndex + 1} of {tripDays.length}
            </motion.p>
          </div>
          
          {currentDayActivities.length === 0 ? (
            <motion.div 
              className="bg-muted/40 rounded-lg p-8 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <h4 className="text-lg font-medium mb-2">No activities planned</h4>
              <p className="text-muted-foreground mb-4">
                Add activities to make the most of your day in {trip.destination}
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button>Add Activity</Button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              className="space-y-8"
              variants={staggerChildren(0.15)}
              initial="hidden"
              animate="visible"
            >
              {/* Morning activities */}
              {groupedActivities.morning.length > 0 && (
                <motion.div variants={slideInLeft}>
                  <div className="flex items-center gap-2 mb-4">
                    <motion.div 
                      className="bg-orange-200 dark:bg-orange-900 h-2 w-2 rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
                    ></motion.div>
                    <h4 className="font-medium">Morning</h4>
                  </div>
                  <div className="space-y-4">
                    {groupedActivities.morning.map((activity: any, index: number) => (
                      <motion.div 
                        key={activity.id}
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { 
                            opacity: 1, 
                            x: 0, 
                            transition: { delay: index * 0.1, duration: 0.3 }
                          }
                        }}
                      >
                        <TripActivityCard key={activity.id} activity={activity} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {/* Afternoon activities */}
              {groupedActivities.afternoon.length > 0 && (
                <motion.div variants={slideInRight}>
                  <div className="flex items-center gap-2 mb-4">
                    <motion.div 
                      className="bg-blue-200 dark:bg-blue-900 h-2 w-2 rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "loop", delay: 0.7 }}
                    ></motion.div>
                    <h4 className="font-medium">Afternoon</h4>
                  </div>
                  <div className="space-y-4">
                    {groupedActivities.afternoon.map((activity: any, index: number) => (
                      <motion.div 
                        key={activity.id}
                        variants={{
                          hidden: { opacity: 0, x: 20 },
                          visible: { 
                            opacity: 1, 
                            x: 0, 
                            transition: { delay: index * 0.1, duration: 0.3 }
                          }
                        }}
                      >
                        <TripActivityCard key={activity.id} activity={activity} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {/* Evening activities */}
              {groupedActivities.evening.length > 0 && (
                <motion.div variants={slideInLeft}>
                  <div className="flex items-center gap-2 mb-4">
                    <motion.div 
                      className="bg-purple-200 dark:bg-purple-900 h-2 w-2 rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "loop", delay: 1.4 }}
                    ></motion.div>
                    <h4 className="font-medium">Evening</h4>
                  </div>
                  <div className="space-y-4">
                    {groupedActivities.evening.map((activity: any, index: number) => (
                      <motion.div 
                        key={activity.id}
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { 
                            opacity: 1, 
                            x: 0, 
                            transition: { delay: index * 0.1, duration: 0.3 }
                          }
                        }}
                      >
                        <TripActivityCard key={activity.id} activity={activity} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

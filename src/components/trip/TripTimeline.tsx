
import { useMemo, useState } from "react";
import { format, addDays, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TripActivityCard } from "./TripActivityCard";

type TripTimelineProps = {
  trip: any;
};

export function TripTimeline({ trip }: TripTimelineProps) {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  
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
      setCurrentDayIndex(currentDayIndex - 1);
    }
  };
  
  const goToNextDay = () => {
    if (currentDayIndex < tripDays.length - 1) {
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
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-bold">Trip Timeline</h2>
        
        {/* Day selector */}
        <div className="flex items-center justify-between bg-card rounded-lg p-4 border">
          <Button 
            variant="outline" 
            size="icon"
            onClick={goToPrevDay}
            disabled={currentDayIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex-1 overflow-auto px-4">
            <div className="flex justify-center gap-1 md:gap-2">
              {tripDays.map((day, index) => (
                <Button
                  key={index}
                  variant={index === currentDayIndex ? "default" : "outline"}
                  className={cn(
                    "min-w-16 text-xs",
                    index === currentDayIndex ? "pointer-events-none" : ""
                  )}
                  onClick={() => setCurrentDayIndex(index)}
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
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={goToNextDay}
            disabled={currentDayIndex === tripDays.length - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div>
        <div className="mb-6">
          <h3 className="text-xl font-bold">
            {format(currentDay, "EEEE, MMMM d, yyyy")}
          </h3>
          <p className="text-sm text-muted-foreground">
            Day {currentDayIndex + 1} of {tripDays.length}
          </p>
        </div>
        
        {currentDayActivities.length === 0 ? (
          <div className="bg-muted/40 rounded-lg p-8 text-center">
            <h4 className="text-lg font-medium mb-2">No activities planned</h4>
            <p className="text-muted-foreground mb-4">
              Add activities to make the most of your day in {trip.destination}
            </p>
            <Button>Add Activity</Button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Morning activities */}
            {groupedActivities.morning.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-orange-200 dark:bg-orange-900 h-2 w-2 rounded-full"></div>
                  <h4 className="font-medium">Morning</h4>
                </div>
                <div className="space-y-4">
                  {groupedActivities.morning.map((activity: any) => (
                    <TripActivityCard key={activity.id} activity={activity} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Afternoon activities */}
            {groupedActivities.afternoon.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-blue-200 dark:bg-blue-900 h-2 w-2 rounded-full"></div>
                  <h4 className="font-medium">Afternoon</h4>
                </div>
                <div className="space-y-4">
                  {groupedActivities.afternoon.map((activity: any) => (
                    <TripActivityCard key={activity.id} activity={activity} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Evening activities */}
            {groupedActivities.evening.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-purple-200 dark:bg-purple-900 h-2 w-2 rounded-full"></div>
                  <h4 className="font-medium">Evening</h4>
                </div>
                <div className="space-y-4">
                  {groupedActivities.evening.map((activity: any) => (
                    <TripActivityCard key={activity.id} activity={activity} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

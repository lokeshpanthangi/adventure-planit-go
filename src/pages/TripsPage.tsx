
import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { TripCard } from "@/components/TripCard";
import { Plus, Filter, Grid2X2, List, Search } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AnimatedTransition } from "@/components/AnimatedTransition";
import { ButtonWithAnimation } from "@/components/ui/button-with-animation";
import { useThemeStyles } from "@/hooks/use-theme";
import { motion } from "framer-motion";

// Sample trip data - expanded with more examples
const trips = [
  {
    id: "1",
    title: "Beach Vacation",
    destination: "Maldives",
    startDate: "2025-07-15",
    endDate: "2025-07-25",
    collaborators: 4,
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "2",
    title: "Mountain Retreat",
    destination: "Swiss Alps",
    startDate: "2025-08-10",
    endDate: "2025-08-20",
    collaborators: 2,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "3",
    title: "City Explorer",
    destination: "Tokyo",
    startDate: "2025-09-05",
    endDate: "2025-09-15",
    collaborators: 3,
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "4",
    title: "Cultural Tour",
    destination: "Rome, Italy",
    startDate: "2025-05-20",
    endDate: "2025-05-30",
    collaborators: 5,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "5",
    title: "Winter Getaway",
    destination: "Aspen, Colorado",
    startDate: "2026-01-05",
    endDate: "2026-01-12",
    collaborators: 6,
    image: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "6",
    title: "Island Hopping",
    destination: "Greek Islands",
    startDate: "2025-06-15",
    endDate: "2025-06-28",
    collaborators: 4,
    image: "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
];

// Sort options
const SORT_OPTIONS = [
  { value: "date-asc", label: "Date (Nearest First)" },
  { value: "date-desc", label: "Date (Furthest First)" },
  { value: "alpha-asc", label: "Name (A-Z)" },
  { value: "alpha-desc", label: "Name (Z-A)" },
];

// Filter options
const FILTER_OPTIONS = [
  { value: "all", label: "All Trips" },
  { value: "upcoming", label: "Upcoming Trips" },
  { value: "past", label: "Past Trips" },
];

const TripsPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">(() => {
    // Get from localStorage or default to grid
    return (localStorage.getItem("planit_view_mode") as "grid" | "list") || "grid";
  });
  
  const [sortOption, setSortOption] = useState(() => {
    // Get from localStorage or default
    return localStorage.getItem("planit_sort_option") || "date-asc";
  });
  
  const [filterOption, setFilterOption] = useState(() => {
    // Get from localStorage or default
    return localStorage.getItem("planit_filter_option") || "all";
  });
  
  const [searchQuery, setSearchQuery] = useState("");
  const { colors } = useThemeStyles();
  
  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem("planit_view_mode", viewMode);
    localStorage.setItem("planit_sort_option", sortOption);
    localStorage.setItem("planit_filter_option", filterOption);
  }, [viewMode, sortOption, filterOption]);
  
  // Apply sorting, filtering, and searching
  const filteredTrips = useMemo(() => {
    let result = [...trips];
    
    // Apply filter
    if (filterOption === "upcoming") {
      const today = new Date();
      result = result.filter(trip => new Date(trip.startDate) >= today);
    } else if (filterOption === "past") {
      const today = new Date();
      result = result.filter(trip => new Date(trip.endDate) < today);
    }
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(trip => 
        trip.title.toLowerCase().includes(query) || 
        trip.destination.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case "date-asc":
        return result.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
      case "date-desc":
        return result.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
      case "alpha-asc":
        return result.sort((a, b) => a.title.localeCompare(b.title));
      case "alpha-desc":
        return result.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return result;
    }
  }, [trips, sortOption, filterOption, searchQuery]);

  // Staggered animation container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <Layout>
      <AnimatedTransition type="slide" direction="up">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-3xl font-bold font-montserrat">My Trips</h1>
              <p className="text-muted-foreground">
                Manage and view your upcoming adventures
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Link to="/trips/new">
                <ButtonWithAnimation 
                  animationType="scale"
                  className="group"
                >
                  <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform duration-300" /> 
                  New Trip
                </ButtonWithAnimation>
              </Link>
            </motion.div>
          </div>

          {/* Search and Filter Controls */}
          <motion.div 
            className="flex flex-col md:flex-row gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search trips..." 
                className="pl-9 transition-shadow duration-300 focus:shadow-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={filterOption} onValueChange={setFilterOption}>
                <SelectTrigger className="w-[140px] transition-all hover:shadow-sm">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  {FILTER_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[160px] transition-all hover:shadow-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="flex rounded-md border">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "rounded-r-none transition-colors duration-300",
                    viewMode === "grid" ? "bg-muted" : ""
                  )}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid2X2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "rounded-l-none transition-colors duration-300",
                    viewMode === "list" ? "bg-muted" : ""
                  )}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          {filteredTrips.length === 0 ? (
            <motion.div 
              className="bg-muted/40 rounded-lg p-10 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-medium mb-2">No trips found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery 
                  ? "Try adjusting your search or filters"
                  : "Start planning your first adventure"}
              </p>
              <ButtonWithAnimation asChild animationType="ripple">
                <Link to="/trips/new">
                  <Plus className="mr-2 h-4 w-4" /> Create Trip
                </Link>
              </ButtonWithAnimation>
            </motion.div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={viewMode === "grid" 
                ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" 
                : "space-y-4"
              }
            >
              {filteredTrips.map((trip, index) => (
                <TripCard 
                  key={trip.id} 
                  {...trip} 
                  viewMode={viewMode} 
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </div>
      </AnimatedTransition>
    </Layout>
  );
};

export default TripsPage;

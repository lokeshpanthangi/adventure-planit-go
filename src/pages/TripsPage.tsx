
import { useState, useMemo } from "react";
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
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOption, setSortOption] = useState("date-asc");
  const [filterOption, setFilterOption] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
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

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Trips</h1>
            <p className="text-muted-foreground">
              Manage and view your upcoming adventures
            </p>
          </div>
          <Link to="/trips/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Trip
            </Button>
          </Link>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search trips..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={filterOption} onValueChange={setFilterOption}>
              <SelectTrigger className="w-[140px]">
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
              <SelectTrigger className="w-[160px]">
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
                  "rounded-r-none",
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
                  "rounded-l-none",
                  viewMode === "list" ? "bg-muted" : ""
                )}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {filteredTrips.length === 0 ? (
          <div className="bg-muted/40 rounded-lg p-10 text-center">
            <h3 className="text-lg font-medium mb-2">No trips found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery 
                ? "Try adjusting your search or filters"
                : "Start planning your first adventure"}
            </p>
            <Link to="/trips/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Create Trip
              </Button>
            </Link>
          </div>
        ) : (
          <div className={viewMode === "grid" 
              ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" 
              : "space-y-4"
            }>
            {filteredTrips.map((trip) => (
              <TripCard 
                key={trip.id} 
                {...trip} 
                viewMode={viewMode} 
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TripsPage;

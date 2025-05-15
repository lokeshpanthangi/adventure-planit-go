
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Mock location suggestions
const LOCATION_SUGGESTIONS = [
  "Paris, France",
  "Tokyo, Japan",
  "New York, USA",
  "Rome, Italy",
  "Barcelona, Spain",
  "Sydney, Australia",
  "London, UK",
  "Bali, Indonesia",
];

const formSchema = z.object({
  destination: z.string().min(2, {
    message: "Please enter a valid destination.",
  }),
});

type TripLocationFormProps = {
  tripData: any;
  updateTripData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export function TripLocationForm({ 
  tripData, 
  updateTripData, 
  onNext, 
  onBack 
}: TripLocationFormProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: tripData.destination || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateTripData({
      destination: values.destination,
      // Mock location data - in a real app, this would come from a maps API
      location: { lat: 48.8566, lng: 2.3522 },
    });
    onNext();
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    form.setValue("destination", value);
    
    if (value.length >= 2) {
      const filtered = LOCATION_SUGGESTIONS.filter(loc => 
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    form.setValue("destination", suggestion);
    setShowSuggestions(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Destination</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    placeholder="Where are you going?" 
                    {...field}
                    onChange={handleInputChange}
                    className="pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
              </FormControl>
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 w-full bg-popover shadow-md rounded-md mt-1 max-h-60 overflow-auto">
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion}
                      className="px-4 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer text-sm"
                      onClick={() => selectSuggestion(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("destination") && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Location Preview</p>
            <AspectRatio ratio={16 / 9}>
              <div className="h-full rounded-md bg-muted flex items-center justify-center text-muted-foreground">
                Map preview for {form.watch("destination")}
              </div>
            </AspectRatio>
          </div>
        )}
        
        <div className="pt-4 flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>Back</Button>
          <Button type="submit">Continue</Button>
        </div>
      </form>
    </Form>
  );
}

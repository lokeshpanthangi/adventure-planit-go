
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Sample curated travel photos
const CURATED_PHOTOS = [
  {
    id: "beach",
    url: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    alt: "Beach sunset with palm trees",
  },
  {
    id: "mountain",
    url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    alt: "Mountain landscape with snow peaks",
  },
  {
    id: "city",
    url: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    alt: "City skyline at night",
  },
  {
    id: "nature",
    url: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    alt: "Green forest waterfall",
  },
];

const formSchema = z.object({
  coverImage: z.string({
    required_error: "Please select a cover image.",
  }),
});

type TripImageFormProps = {
  tripData: any;
  updateTripData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export function TripImageForm({ tripData, updateTripData, onNext, onBack }: TripImageFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coverImage: tripData.coverImage || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateTripData({
      coverImage: values.coverImage,
    });
    onNext();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Choose a cover image for your trip</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 gap-4 pt-2"
                >
                  {CURATED_PHOTOS.map((photo) => (
                    <FormItem key={photo.id} className="relative">
                      <FormControl>
                        <RadioGroupItem
                          value={photo.url}
                          id={photo.id}
                          className="absolute top-2 left-2 z-10"
                        />
                      </FormControl>
                      <label 
                        htmlFor={photo.id}
                        className={cn(
                          "cursor-pointer overflow-hidden rounded-md border-2 block",
                          field.value === photo.url ? "border-primary" : "border-transparent"
                        )}
                      >
                        <AspectRatio ratio={16/9}>
                          <img
                            src={photo.url}
                            alt={photo.alt}
                            className="h-full w-full object-cover transition-all hover:scale-105"
                          />
                        </AspectRatio>
                      </label>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="pt-4 flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">
            Create Trip
          </Button>
        </div>
      </form>
    </Form>
  );
}

// Helper function for className conditionals
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

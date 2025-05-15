
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

type TripDateFormProps = {
  tripData: any;
  updateTripData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export function TripDateForm({ tripData, updateTripData, onNext, onBack }: TripDateFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateRange: {
        from: tripData.startDate || undefined,
        to: tripData.endDate || undefined,
      },
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateTripData({
      startDate: values.dateRange.from,
      endDate: values.dateRange.to,
    });
    onNext();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="dateRange"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Trip Dates</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value?.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, "MMM d, yyyy")} - {format(field.value.to, "MMM d, yyyy")}
                          </>
                        ) : (
                          format(field.value.from, "MMM d, yyyy")
                        )
                      ) : (
                        <span>Select date range</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={field.value?.from}
                    selected={{
                      from: field.value?.from || undefined,
                      to: field.value?.to || undefined
                    }}
                    onSelect={field.onChange}
                    numberOfMonths={2}
                    disabled={(date) => date < new Date()}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="pt-4 flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>Back</Button>
          <Button type="submit" disabled={!form.watch("dateRange")?.from || !form.watch("dateRange")?.to}>
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
}

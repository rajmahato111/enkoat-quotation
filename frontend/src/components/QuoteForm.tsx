import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getFilterOptions, submitQuote } from "@/api/apiService";
import { CalendarIcon, Loader2Icon } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/sonner";

// Define schema for form validation
const quoteFormSchema = z.object({
  contractorName: z.string().min(2, { message: "Contractor name must be at least 2 characters." }),
  company: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  roofSize: z.coerce.number().min(100, { message: "Roof size must be at least 100 sq ft." }),
  roofType: z.string({ required_error: "Please select a roof type." }),
  projectCity: z.string().min(2, { message: "City is required." }),
  projectState: z.string({ required_error: "Please select a state." }),
  projectDate: z.date({ required_error: "Please select a project date." }),
  notes: z.string().optional(),
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

const QuoteForm = () => {
  // Get filter options for dropdowns
  const { data: filterOptions, isLoading: isLoadingOptions } = useQuery({
    queryKey: ["filterOptions"],
    queryFn: getFilterOptions,
  });

  // Form setup with validation
  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      contractorName: "",
      company: "",
      roofSize: undefined,
      roofType: undefined,
      projectCity: "",
      projectState: undefined,
      notes: "",
    },
  });

  // Submit mutation
  const submitMutation = useMutation({
    mutationFn: submitQuote,
    onSuccess: () => {
      form.reset();
      toast.success("Quote submitted successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit quote. Please try again.");
    },
  });

  // Form submission handler
  const onSubmit = (data: QuoteFormValues) => {
    submitMutation.mutate({
      contractorName: data.contractorName,
      company: data.company,
      roofSize: data.roofSize,
      roofType: data.roofType,
      projectCity: data.projectCity,
      projectState: data.projectState,
      projectDate: data.projectDate.toISOString().split("T")[0],
    });
  };

  return (
    <Card className="max-w-3xl mx-auto shadow-xl rounded-lg border border-gray-300 bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="bg-gradient-to-r from-yellow-300 to-yellow-500 p-8 rounded-t-lg">
        <CardTitle className="text-4xl font-extrabold text-gray-900">Submit a New Quote</CardTitle>
        <CardDescription className="text-gray-800 mt-4">
          Fill out the form below to request a quote for an IntelliKoat™ system. All fields marked with * are required.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contractor Name */}
              <FormField
                control={form.control}
                name="contractorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-gray-800">Contractor Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" className="border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 rounded-md" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-600 text-sm mt-1" />
                  </FormItem>
                )}
              />

              {/* Company */}
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-gray-800">Company *</FormLabel>
                    <FormControl>
                      <Input placeholder="Roofing Company LLC" className="border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 rounded-md" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-600 text-sm mt-1" />
                  </FormItem>
                )}
              />

              {/* Roof Size */}
              <FormField
                control={form.control}
                name="roofSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-gray-800">Roof Size (sq ft) *</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="5000" className="border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 rounded-md" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-600 text-sm mt-1" />
                  </FormItem>
                )}
              />

              {/* Roof Type */}
              <FormField
                control={form.control}
                name="roofType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-gray-800">Roof Type *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 rounded-md">
                          <SelectValue placeholder="Select a roof type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoadingOptions ? (
                          <SelectItem value="loading" disabled>
                            Loading...
                          </SelectItem>
                        ) : (
                          filterOptions?.roofTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-600 text-sm mt-1" />
                  </FormItem>
                )}
              />

              {/* Project City */}
              <FormField
                control={form.control}
                name="projectCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-gray-800">Project City *</FormLabel>
                    <FormControl>
                      <Input placeholder="Phoenix" className="border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 rounded-md" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-600 text-sm mt-1" />
                  </FormItem>
                )}
              />

              {/* Project State */}
              <FormField
                control={form.control}
                name="projectState"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-gray-800">Project State *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 rounded-md">
                          <SelectValue placeholder="Select a state" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoadingOptions ? (
                          <SelectItem value="loading" disabled>
                            Loading...
                          </SelectItem>
                        ) : (
                          filterOptions?.states.map((state) => (
                            <SelectItem key={state.code} value={state.code}>
                              {state.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-600 text-sm mt-1" />
                  </FormItem>
                )}
              />

              {/* Project Date */}
              <FormField
                control={form.control}
                name="projectDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-lg font-semibold text-gray-800">Project Date *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 rounded-md",
                              !field.value && "text-gray-400"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date("2023-01-01") || date > new Date("2030-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-red-600 text-sm mt-1" />
                  </FormItem>
                )}
              />
            </div>

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-800">Additional Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide any additional details about the project..."
                      className="border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 rounded-md"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 text-sm mt-1" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full md:w-auto bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 rounded-md py-3 px-6 text-lg font-semibold"
              disabled={submitMutation.isPending}
            >
              {submitMutation.isPending ? (
                <>
                  <Loader2Icon className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Quote"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default QuoteForm;
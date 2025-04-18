import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFilterOptions } from "@/api/apiService";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { CalendarIcon, FilterIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardFiltersProps {
  onFilterChange: (filters: {
    state?: string;
    roofType?: string;
    dateFrom?: string;
    dateTo?: string;
  }) => void;
  currentFilters: {
    state?: string;
    roofType?: string;
    dateFrom?: string;
    dateTo?: string;
  };
}

const DashboardFilters: React.FC<DashboardFiltersProps> = ({ onFilterChange, currentFilters }) => {
  const { data: filterOptions, isLoading } = useQuery({
    queryKey: ["filterOptions"],
    queryFn: getFilterOptions,
  });

  // Local state for date picker
  const [dateFrom, setDateFrom] = useState<Date | undefined>(
    currentFilters.dateFrom ? new Date(currentFilters.dateFrom) : undefined
  );
  const [dateTo, setDateTo] = useState<Date | undefined>(
    currentFilters.dateTo ? new Date(currentFilters.dateTo) : undefined
  );

  // Handle filter changes
  const handleStateChange = (value: string) => {
    onFilterChange({ ...currentFilters, state: value === "all" ? undefined : value });
  };

  const handleRoofTypeChange = (value: string) => {
    onFilterChange({ ...currentFilters, roofType: value === "all" ? undefined : value });
  };

  const handleDateFromChange = (date: Date | undefined) => {
    setDateFrom(date);
    if (date) {
      onFilterChange({
        ...currentFilters,
        dateFrom: date.toISOString().split("T")[0],
      });
    }
  };

  const handleDateToChange = (date: Date | undefined) => {
    setDateTo(date);
    if (date) {
      onFilterChange({
        ...currentFilters,
        dateTo: date.toISOString().split("T")[0],
      });
    }
  };

  const clearFilters = () => {
    setDateFrom(undefined);
    setDateTo(undefined);
    onFilterChange({});
  };

  const hasFilters = !!(
    currentFilters.state ||
    currentFilters.roofType ||
    currentFilters.dateFrom ||
    currentFilters.dateTo
  );

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center gap-2">
            <FilterIcon className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Filters</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
            {/* State Filter */}
            <div className="space-y-1">
              <Label htmlFor="state-filter" className="text-xs">
                State
              </Label>
              <Select
                value={currentFilters.state || "all"}
                onValueChange={handleStateChange}
                disabled={isLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All States" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {filterOptions?.states.map((state) => (
                    <SelectItem key={state.code} value={state.code}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Roof Type Filter */}
            <div className="space-y-1">
              <Label htmlFor="roof-type-filter" className="text-xs">
                Roof Type
              </Label>
              <Select
                value={currentFilters.roofType || "all"}
                onValueChange={handleRoofTypeChange}
                disabled={isLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {filterOptions?.roofTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date From Filter */}
            <div className="space-y-1">
              <Label htmlFor="date-from-filter" className="text-xs">
                From Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateFrom && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={handleDateFromChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Date To Filter */}
            <div className="space-y-1">
              <Label htmlFor="date-to-filter" className="text-xs">
                To Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateTo && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={handleDateToChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="flex items-center gap-1"
            >
              <XIcon className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardFilters;
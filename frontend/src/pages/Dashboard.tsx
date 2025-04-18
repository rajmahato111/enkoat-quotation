import React, { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardFilters from "@/components/dashboard/DashboardFilters";
import ProjectsChart from "@/components/dashboard/ProjectsChart";
import ProjectsTable from "@/components/dashboard/ProjectsTable";
import PerformanceMap from "@/components/dashboard/PerformanceMap";
import { Button } from "@/components/ui/button";
import { FileTextIcon } from "lucide-react";
import { exportProjectsToCSV } from "@/api/apiService";
import { toast } from "@/components/ui/sonner";

interface PerformanceMapProps {
  // Existing props here
  filters: {
    state?: string;
    roofType?: string;
    dateFrom?: string;
    dateTo?: string;
  };
}

const Dashboard = () => {
  const [filters, setFilters] = useState<{
    state?: string;
    roofType?: string;
    dateFrom?: string;
    dateTo?: string;
  }>({});

  const handleFilterChange = (newFilters: {
    state?: string;
    roofType?: string;
    dateFrom?: string;
    dateTo?: string;
  }) => {
    setFilters(newFilters);
  };

  const handleExportReport = async () => {
    try {
      // Show loading state
      toast.info("Generating CSV report...");
      
      // Get CSV data
      const csvData = await exportProjectsToCSV(filters);
      
      // Create blob and download link
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      // Set up download
      link.setAttribute('href', url);
      link.setAttribute('download', `enkoat-projects-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      
      // Trigger download and cleanup
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success("Report downloaded successfully!");
    } catch (error) {
      toast.error("Failed to generate report. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 via-gray-50 to-white">
      <main className="flex-1 container mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-blue-900 mb-2">Performance Dashboard</h1>
            <p className="text-lg text-gray-600">
              Analyze IntelliKoat™ project performance and trends
            </p>
          </div>
          <Button 
            onClick={handleExportReport}
            className="mt-6 md:mt-0 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            <FileTextIcon className="mr-2 h-5 w-5" />
            Export Report
          </Button>
        </div>

        <DashboardFilters onFilterChange={handleFilterChange} currentFilters={filters} />

        <div className="space-y-10 mt-10">
          <DashboardHeader filters={filters} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ProjectsChart filters={filters} />
            <PerformanceMap filters={filters} />
          </div>

          <ProjectsTable filters={filters} />
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} EnKoat. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
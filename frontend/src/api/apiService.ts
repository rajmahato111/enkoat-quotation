// Real API implementation for connecting to backend
import { toast } from "@/components/ui/sonner";

// Types from previous mockApi but adjusted for real API
export interface QuoteSubmission {
  id?: string;
  contractorName: string;
  company: string;
  roofSize: number;
  roofType: string;
  projectCity: string;
  projectState: string;
  projectDate: string;
  submittedAt?: string;
}

export interface ProjectData {
  id?: string;
  contractorName: string;
  company: string;
  roofSize: number;
  roofType: string;
  projectCity: string;
  projectState: string;
  projectDate: string;
  completed: boolean;
  energySavings: number; // in kWh
  costSavings: number; // in dollars
  temperatureReduction: number; // in degrees F
  installationDate?: string;
}

// Base API URL from environment variable or default to localhost development server
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// API error handler helper
const handleApiError = (error: unknown): never => {
  const message = error instanceof Error 
    ? error.message 
    : 'An unknown error occurred';
  
  toast.error(message);
  throw error;
};

// Submit a new quote
export const submitQuote = async (quoteData: Omit<QuoteSubmission, "id" | "submittedAt">): Promise<QuoteSubmission> => {
  try {
    const response = await fetch(`${API_URL}/quotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quoteData),
    });
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    // Show success message
    toast.success("Quote submitted successfully!");
    
    return result.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get quotes with filtering
export const getQuotes = async (
  filters?: { state?: string; roofType?: string }
): Promise<QuoteSubmission[]> => {
  try {
    // Build query string from filters
    const queryParams = new URLSearchParams();
    if (filters?.state) queryParams.append('state', filters.state);
    if (filters?.roofType) queryParams.append('roofType', filters.roofType);
    
    const response = await fetch(`${API_URL}/quotes?${queryParams.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get project data with filtering
export const getProjects = async (
  filters?: { state?: string; roofType?: string; dateFrom?: string; dateTo?: string }
): Promise<ProjectData[]> => {
  try {
    // Build query string from filters
    const queryParams = new URLSearchParams();
    if (filters?.state) queryParams.append('state', filters.state);
    if (filters?.roofType) queryParams.append('roofType', filters.roofType);
    if (filters?.dateFrom) queryParams.append('dateFrom', filters.dateFrom);
    if (filters?.dateTo) queryParams.append('dateTo', filters.dateTo);
    
    const response = await fetch(`${API_URL}/projects?${queryParams.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get aggregate project data for dashboard
export const getProjectStats = async (
  filters?: { state?: string; roofType?: string; dateFrom?: string; dateTo?: string }
): Promise<{
  totalProjects: number;
  completedProjects: number;
  averageRoofSize: number;
  totalEnergySavings: number;
  totalCostSavings: number;
  averageTemperatureReduction: number;
  projectsByState: Record<string, number>;
  projectsByRoofType: Record<string, number>;
  projectsByMonth: Record<string, number>;
  energySavingsByRoofType: Record<string, number>;
}> => {
  try {
    // Build query string from filters
    const queryParams = new URLSearchParams();
    if (filters?.state) queryParams.append('state', filters.state);
    if (filters?.roofType) queryParams.append('roofType', filters.roofType);
    if (filters?.dateFrom) queryParams.append('dateFrom', filters.dateFrom);
    if (filters?.dateTo) queryParams.append('dateTo', filters.dateTo);
    
    const response = await fetch(`${API_URL}/projects/stats?${queryParams.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get list of all states and roof types for filters
export const getFilterOptions = async (): Promise<{
  states: { code: string; name: string }[];
  roofTypes: string[];
}> => {
  try {
    const response = await fetch(`${API_URL}/quotes/filter-options`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const exportProjectsToCSV = async (
  filters?: { state?: string; roofType?: string; dateFrom?: string; dateTo?: string }
): Promise<string> => {
  try {
    const projects = await getProjects(filters);
    
    // Define CSV headers
    const headers = [
      'Project ID',
      'Contractor',
      'Company',
      'Location',
      'Roof Type',
      'Size (sq ft)',
      'Energy Savings (kWh)',
      'Cost Savings ($)',
      'Status',
      'Project Date'
    ].join(',');

    // Convert projects to CSV rows
    const rows = projects.map(project => [
      project.id,
      project.contractorName,
      project.company,
      `${project.projectCity}, ${project.projectState}`,
      project.roofType,
      project.roofSize,
      project.energySavings,
      project.costSavings,
      project.completed ? 'Completed' : 'Pending',
      new Date(project.projectDate).toLocaleDateString()
    ].map(value => `"${value}"`).join(','));

    // Combine headers and rows
    return [headers, ...rows].join('\n');
  } catch (error) {
    return handleApiError(error);
  }
};
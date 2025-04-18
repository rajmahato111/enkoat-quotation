import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { getProjectStats } from "@/api/apiService";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, 
         PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts";

interface ProjectsChartProps {
  filters: {
    state?: string;
    roofType?: string;
    dateFrom?: string;
    dateTo?: string;
  };
}

const COLORS = ["#1E88E5", "#43A047", "#26A69A", "#F57C00", "#8E24AA", "#D81B60", "#3949AB"];

const ProjectsChart: React.FC<ProjectsChartProps> = ({ filters }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["projectStats", filters],
    queryFn: () => getProjectStats(filters),
  });

  // Prepare data for state chart
  const stateData = data
    ? Object.entries(data.projectsByState)
        .map(([state, count]) => ({ name: state, value: count }))
        .sort((a, b) => b.value - a.value)
    : [];

  // Prepare data for roof type chart
  const roofTypeData = data
    ? Object.entries(data.projectsByRoofType)
        .map(([type, count]) => ({ name: type, value: count }))
        .sort((a, b) => b.value - a.value)
    : [];

  // Prepare data for energy savings by roof type
  const energySavingsData = data
    ? Object.entries(data.energySavingsByRoofType)
        .map(([type, savings]) => ({ name: type, value: Math.round(savings / 1000) }))
        .sort((a, b) => b.value - a.value)
    : [];

  // Prepare data for monthly trend
  const monthlyData = data
    ? Object.entries(data.projectsByMonth)
        .map(([month, count]) => ({ name: month, value: count }))
        .sort((a, b) => a.name.localeCompare(b.name))
    : [];

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Project Analytics</CardTitle>
          <CardDescription>Loading project data...</CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <div className="w-full h-full bg-muted/30 animate-pulse rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-xl">Project Analytics</CardTitle>
        <CardDescription>
          Analyze project data across different dimensions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="states">
          <TabsList className="mb-4">
            <TabsTrigger value="states">Projects by State</TabsTrigger>
            <TabsTrigger value="roofTypes">Roof Types</TabsTrigger>
            <TabsTrigger value="energySavings">Energy Savings</TabsTrigger>
            <TabsTrigger value="monthlyTrend">Monthly Trend</TabsTrigger>
          </TabsList>
          
          <TabsContent value="states" className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stateData} layout="vertical" margin={{ left: 20, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip 
                  formatter={(value) => [`${value} Projects`, "Count"]}
                  labelFormatter={(label) => `State: ${label}`}
                />
                <Bar dataKey="value" fill="#1E88E5" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="roofTypes" className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roofTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  dataKey="value"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {roofTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} Projects`, "Count"]} />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="energySavings" className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={energySavingsData} margin={{ left: 20, right: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value} MWh`, "Energy Savings"]}
                  labelFormatter={(label) => `Roof Type: ${label}`}
                />
                <Bar dataKey="value" fill="#43A047" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="monthlyTrend" className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ left: 20, right: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value} Projects`, "Count"]}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#26A69A" 
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProjectsChart;
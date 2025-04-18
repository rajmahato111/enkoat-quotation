import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getProjectStats } from "@/api/apiService";
import { BarChart3Icon, BuildingIcon, TrendingUpIcon, ThermometerIcon } from "lucide-react";

interface DashboardHeaderProps {
  filters: {
    state?: string;
    roofType?: string;
    dateFrom?: string;
    dateTo?: string;
  };
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ filters }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["projectStats", filters],
    queryFn: () => getProjectStats(filters),
  });

  const statCards = [
    {
      title: "Total Projects",
      value: data?.totalProjects || 0,
      subtitle: `${data?.completedProjects || 0} Completed`,
      icon: <BuildingIcon className="w-8 h-8 text-enkoat-primary" />,
      loading: isLoading,
    },
    {
      title: "Avg. Roof Size",
      value: data?.averageRoofSize ? `${data.averageRoofSize.toLocaleString()} sq ft` : "0 sq ft",
      subtitle: "Per Project",
      icon: <BarChart3Icon className="w-8 h-8 text-enkoat-secondary" />,
      loading: isLoading,
    },
    {
      title: "Total Energy Savings",
      value: data?.totalEnergySavings ? `${Math.round(data.totalEnergySavings / 1000).toLocaleString()} MWh` : "0 MWh",
      subtitle: `$${data?.totalCostSavings ? Math.round(data.totalCostSavings / 1000).toLocaleString() : "0"}k Cost Savings`,
      icon: <TrendingUpIcon className="w-8 h-8 text-enkoat-accent" />,
      loading: isLoading,
    },
    {
      title: "Avg. Temp Reduction",
      value: `${data?.averageTemperatureReduction || 0}°F`,
      subtitle: "Surface Temperature",
      icon: <ThermometerIcon className="w-8 h-8 text-enkoat-primary" />,
      loading: isLoading,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="flex items-center p-6">
            <div className="mr-4">{stat.icon}</div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
              <div className="text-2xl font-bold">
                {stat.loading ? (
                  <div className="h-8 w-24 bg-muted animate-pulse rounded"></div>
                ) : (
                  stat.value
                )}
              </div>
              <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardHeader;
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProjects, ProjectData } from "@/api/apiService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CheckCircleIcon, ClockIcon, Loader2Icon } from "lucide-react";

interface ProjectsTableProps {
  filters: {
    state?: string;
    roofType?: string;
    dateFrom?: string;
    dateTo?: string;
  };
}

const ProjectsTable: React.FC<ProjectsTableProps> = ({ filters }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["projects", filters],
    queryFn: () => getProjects(filters),
  });

  // Take the first 5 projects to display
  const displayProjects = data?.slice(0, 5) || [];

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return format(new Date(dateString), "MMM d, yyyy");
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Recent Projects</CardTitle>
              <CardDescription>Loading projects...</CardDescription>
            </div>
            <Loader2Icon className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-96 w-full bg-muted/30 animate-pulse rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Recent Projects</CardTitle>
            <CardDescription>
              Showing {displayProjects.length} of {data?.length || 0} projects
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Contractor</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Roof Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Energy Savings</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayProjects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No projects found with the selected filters
                </TableCell>
              </TableRow>
            ) : (
              displayProjects.map((project: ProjectData) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div className="font-medium">{project.id}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(project.projectDate)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>{project.contractorName}</div>
                    <div className="text-xs text-muted-foreground">{project.company}</div>
                  </TableCell>
                  <TableCell>
                    {project.projectCity}, {project.projectState}
                  </TableCell>
                  <TableCell>{project.roofType}</TableCell>
                  <TableCell>{project.roofSize.toLocaleString()} sq ft</TableCell>
                  <TableCell>
                    <div>{project.energySavings.toLocaleString()} kWh</div>
                    <div className="text-xs text-muted-foreground">
                      ${project.costSavings.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    {project.completed ? (
                      <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
                        <CheckCircleIcon className="w-3 h-3" />
                        <span>Completed</span>
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="flex items-center gap-1 bg-amber-50 text-amber-700 border-amber-200">
                        <ClockIcon className="w-3 h-3" />
                        <span>Pending</span>
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ProjectsTable;
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapContainer, TileLayer, CircleMarker, Popup, LayerGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface Project {
  id: string;
  name: string;
  state: string;
  city: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  roofType?: string;
  energySavings?: number;
  installationDate?: string;
  status?: string;
  contractor?: string;
}

interface PerformanceMapProps {
  projects?: Project[];
  filters?: {
    state?: string;
    roofType?: string;
    dateFrom?: string;
    dateTo?: string;
  };
}

const stateCoordinates: { [key: string]: [number, number] } = {
  'AL': [32.7794, -86.8287],
  'AK': [64.0685, -152.2782],
  'AZ': [34.2744, -111.6602],
  'AR': [34.8938, -92.4426],
  'CA': [36.7783, -119.4179],
  'CO': [39.5501, -105.7821],
  'CT': [41.6032, -73.0877],
  'DE': [38.9896, -75.5050],
  'FL': [27.6648, -81.5158],
  'GA': [32.9866, -83.6487],
  'HI': [21.0943, -157.4983],
  'ID': [44.2394, -114.5103],
  'IL': [40.0417, -89.1965],
  'IN': [39.8942, -86.2816],
  'IA': [42.0751, -93.4960],
  'KS': [38.4937, -98.3804],
  'KY': [37.8223, -84.7700],
  'LA': [31.1695, -91.8678],
  'ME': [44.6074, -69.3977],
  'MD': [39.0458, -76.6413],
  'MA': [42.2373, -71.5314],
  'MI': [44.3467, -85.4102],
  'MN': [46.2807, -94.3053],
  'MS': [32.7364, -89.6678],
  'MO': [38.4561, -92.2884],
  'MT': [46.9219, -110.4544],
  'NE': [41.4925, -99.9018],
  'NV': [38.8026, -116.4194],
  'NH': [43.1939, -71.5724],
  'NJ': [40.0583, -74.4057],
  'NM': [34.5199, -105.8701],
  'NY': [42.9538, -75.5268],
  'NC': [35.7596, -79.0193],
  'ND': [47.5515, -101.0020],
  'OH': [40.3888, -82.7649],
  'OK': [35.5653, -96.9289],
  'OR': [43.9336, -120.5583],
  'PA': [40.8781, -77.7996],
  'RI': [41.6762, -71.5562],
  'SC': [33.8569, -80.9450],
  'SD': [44.2998, -99.4388],
  'TN': [35.7478, -86.6923],
  'TX': [31.9686, -99.9018],
  'UT': [39.3210, -111.0937],
  'VT': [44.0687, -72.6658],
  'VA': [37.4316, -78.6569],
  'WA': [47.4019, -121.4905],
  'WV': [38.4912, -80.9545],
  'WI': [44.2563, -89.6385],
  'WY': [42.7475, -107.2085]
};

const getEnergySavingsColor = (savings: number, maxSavings: number): string => {
  const ratio = savings / maxSavings;
  if (ratio > 0.75) return '#1E88E5'; // High savings - Blue
  if (ratio > 0.5) return '#43A047';  // Medium-high - Green
  if (ratio > 0.25) return '#FFA726'; // Medium - Orange
  return '#EF5350';                   // Low - Red
};

const getProjectCoordinates = (project: any) => {
  if (project.latitude && project.longitude) {
    return {
      lat: project.latitude,
      lng: project.longitude
    };
  }

  if (project.state && stateCoordinates[project.state]) {
    const [baseLat, baseLng] = stateCoordinates[project.state];
    // Add smaller random offset for better visualization
    return {
      lat: baseLat + (Math.random() - 0.5) * 0.5,
      lng: baseLng + (Math.random() - 0.5) * 0.5
    };
  }
  
  // Fallback to center of US if no location data
  return {
    lat: 39.8283,
    lng: -98.5795
  };
};

const PerformanceMap: React.FC<PerformanceMapProps> = ({ projects = [], filters }) => {
  const [projectsData, setProjectsData] = React.useState<Project[]>(projects);
  const [isLoading, setIsLoading] = React.useState(true);
  const [stableLocations, setStableLocations] = React.useState<Map<string, {lat: number, lng: number}>>(new Map());

  // Generate stable coordinates for a project
  const getStableCoordinates = React.useCallback((project: Project) => {
    // If we already have stable coordinates for this project, use them
    if (stableLocations.has(project.id)) {
      return stableLocations.get(project.id)!;
    }

    // If the project has exact coordinates, use them
    if (project.latitude && project.longitude) {
      const coords = { lat: project.latitude, lng: project.longitude };
      setStableLocations(prev => new Map(prev).set(project.id, coords));
      return coords;
    }

    // Generate stable coordinates based on state
    if (project.state && stateCoordinates[project.state]) {
      const [baseLat, baseLng] = stateCoordinates[project.state];
      // Generate a stable offset using the project ID as seed
      const idSum = project.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
      const latOffset = ((idSum % 100) / 100 - 0.5) * 0.5;
      const lngOffset = (((idSum * 31) % 100) / 100 - 0.5) * 0.5;
      
      const coords = {
        lat: baseLat + latOffset,
        lng: baseLng + lngOffset
      };
      setStableLocations(prev => new Map(prev).set(project.id, coords));
      return coords;
    }

    // Fallback to center of US
    const defaultCoords = { lat: 39.8283, lng: -98.5795 };
    setStableLocations(prev => new Map(prev).set(project.id, defaultCoords));
    return defaultCoords;
  }, [stableLocations]);

  React.useEffect(() => {
    // If we have projects already provided, use those
    if (projects && projects.length > 0) {
      setProjectsData(projects);
      // Pre-generate all stable coordinates
      projects.forEach(project => getStableCoordinates(project));
      setIsLoading(false);
      return;
    }

    // If we have filters but no projects, we could fetch filtered projects here
    if (filters && !projects.length) {
      // Define mock data outside of React.useMemo
      const mockProjects: Project[] = [
        {
          id: "1",
          name: "Residential Solar Installation",
          state: filters.state || "CA",
          city: "Los Angeles",
          roofType: filters.roofType || "Asphalt Shingle",
          energySavings: 750,
          installationDate: "2025-01-15",
          status: "Completed"
        },
        {
          id: "2",
          name: "Commercial Building Retrofit",
          state: filters.state || "TX",
          city: "Austin",
          roofType: filters.roofType || "Metal",
          energySavings: 1200,
          installationDate: "2025-02-20",
          status: "In Progress"
        },
        {
          id: "3",
          name: "School District Upgrade",
          state: filters.state || "NY",
          city: "Buffalo",
          roofType: filters.roofType || "Flat",
          energySavings: 950,
          installationDate: "2025-03-05",
          status: "Completed"
        }
      ];

      setProjectsData(mockProjects);
      setIsLoading(false);
    }
  }, [filters, projects, getStableCoordinates]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Project Performance Map</CardTitle>
          <CardDescription>Loading map data...</CardDescription>
        </CardHeader>
        <div className="h-[500px] w-full flex items-center justify-center text-gray-400">
          Loading map data...
        </div>
      </Card>
    );
  }

  if (projectsData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Project Performance Map</CardTitle>
          <CardDescription>No data available for selected filters</CardDescription>
        </CardHeader>
        <div className="h-[500px] w-full flex items-center justify-center text-gray-400">
          No project data available for the selected filters
        </div>
      </Card>
    );
  }

  const maxEnergySavings = Math.max(...projectsData.map(p => p.energySavings || 0));
  const heatmapData = projectsData.map(project => {
    const coords = getStableCoordinates(project);
    const weight = project.energySavings ? project.energySavings / maxEnergySavings : 0.2;
    return {
      lat: coords.lat,
      lng: coords.lng,
      weight,
      projectName: project.name,
      address: `${project.city}, ${project.state}`,
      roofType: project.roofType,
      energySavings: project.energySavings,
      installationDate: project.installationDate,
      status: project.status,
      contractor: project.contractor
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Performance Map</CardTitle>
        <CardDescription>
          Geographic distribution of IntelliKoat™ installations and their performance metrics
        </CardDescription>
      </CardHeader>
      <div className="h-[500px] w-full relative">
        <MapContainer
          center={[39.8283, -98.5795]}
          zoom={4}
          className="h-full w-full rounded-lg"
          style={{ background: '#f8fafc' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            className="opacity-90"
          />
          <LayerGroup>
            {heatmapData.map((point, index) => (
              <CircleMarker
                key={index}
                center={[point.lat, point.lng]}
                radius={Math.max(8, point.weight * 15)}
                pathOptions={{
                  color: getEnergySavingsColor(point.energySavings || 0, maxEnergySavings),
                  fillColor: getEnergySavingsColor(point.energySavings || 0, maxEnergySavings),
                  fillOpacity: 0.6,
                  weight: 1,
                  opacity: 1,
                  pane: 'markerPane'
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold text-sm mb-2">{point.projectName}</h3>
                    <p className="text-xs text-gray-600 mb-1">{point.address}</p>
                    <p className="text-xs text-gray-600 mb-1">Roof Type: {point.roofType}</p>
                    <p className="text-xs text-gray-600 mb-1">
                      Energy Savings: {point.energySavings?.toLocaleString()} kWh
                    </p>
                    <p className="text-xs text-gray-600">Status: {point.status}</p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </LayerGroup>
        </MapContainer>
        
        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg z-[1000]">
          <h4 className="text-sm font-semibold mb-2">Energy Savings</h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#1E88E5' }}></div>
              <span className="text-xs">High</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#43A047' }}></div>
              <span className="text-xs">Medium-High</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FFA726' }}></div>
              <span className="text-xs">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#EF5350' }}></div>
              <span className="text-xs">Low</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PerformanceMap;
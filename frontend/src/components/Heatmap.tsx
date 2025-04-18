import React from 'react';
import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface HeatmapProps {
  data: { lat: number; lng: number }[];
}

const Heatmap: React.FC<HeatmapProps> = ({ data }) => {
  return (
    <MapContainer
      center={[39.8283, -98.5795]} // Center of USA
      zoom={4}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((point, index) => (
        <CircleMarker
          key={index}
          center={[point.lat, point.lng]}
          radius={10} // Fixed radius for simplicity
          pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.5 }}
        />
      ))}
    </MapContainer>
  );
};

export default Heatmap;
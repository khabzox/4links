"use client"
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ locations }) => {
  const customIcon = new L.Icon({
    iconUrl: '/images/map-pin.svg', // Replace with your image URL or SVG
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
  });

  const center = locations.length > 0
    ? { lat: locations[0].lat, lng: locations[0].lng }
    : { lat: 0, lng: 0 };

  return (
    <MapContainer center={center} zoom={10} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location, index) => (
        <Marker
          key={index}
          position={[location.lat, location.lng]}
          icon={customIcon} // Use custom icon here
        >
          <Popup>
            Location: {location.lat}, {location.lng}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;

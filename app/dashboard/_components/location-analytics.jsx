"use client";

import React, { useEffect, useState } from 'react';
import MapComponent from './map-component'; // Adjust the import path as needed

const LocationAnalytics = ({ ip }) => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(`https://ipapi.co/${ip}/json/`);
        const data = await response.json();
        if (data.latitude && data.longitude) {
          setLocation({ lat: data.latitude, lng: data.longitude });
        } else {
          setError('Location data not available');
        }
      } catch (err) {
        console.error('Error fetching location:', err);
        setError('Error fetching location');
      }
    };

    if (ip) {
      fetchLocation();
    }
  }, [ip]);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {location.lat !== 0 && location.lng !== 0 ? (
        <MapComponent lat={location.lat} lng={location.lng} />
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default LocationAnalytics;

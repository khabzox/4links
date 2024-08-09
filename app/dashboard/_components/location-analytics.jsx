"use client";

import React, { useEffect, useState } from 'react';
import MapComponent from './map-component'; 
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase'; 
import { useUser } from '@clerk/nextjs';

const LocationAnalytics = ({ shortId }) => {
  const linkId = shortId.link;
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState('');
  const [noDataMessage, setNoDataMessage] = useState(''); 
  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    const fetchVisitorData = async () => {
      try {
        if (!userId || !shortId) return; // Ensure userId and shortId are valid

        const visitorsCollectionRef = collection(db, `users/${userId}/shortLinks/${shortId}/visitors`);
        const querySnapshot = await getDocs(visitorsCollectionRef);

        // Extract location data
        const fetchedLocations = querySnapshot.docs.map(doc => doc.data()).map(visitor => ({
          lat: visitor.latitude || 0, // Default to 0 if latitude is not available
          lng: visitor.longitude || 0 // Default to 0 if longitude is not available
        }));

        if (fetchedLocations.length === 0) {
          setNoDataMessage('Data has not been received yet.'); // Set message if no data
        } else {
          setLocations(fetchedLocations);
          setNoDataMessage(''); // Clear message if data is available
        }

      } catch (err) {
        console.error('Error fetching visitor data:', err);
        setError('Error fetching visitor data');
      }
    };

    fetchVisitorData();
  }, [userId, shortId]);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {noDataMessage ? (
        <p className="text-red-500">{noDataMessage}</p>
      ) : locations.length > 0 ? (
        <MapComponent locations={locations} />
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default LocationAnalytics;

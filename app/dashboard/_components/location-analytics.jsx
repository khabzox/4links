"use client";

import React, { useEffect, useState } from 'react';
import MapComponent from './map-component'; // Ensure this path is correct
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase'; // Ensure this path is correct
import { useUser } from '@clerk/nextjs';

const LocationAnalytics = ({ shortId }) => {
  const linkId = shortId.link
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState('');
  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    const fetchVisitorData = async () => {
      try {
        // Fetch visitors data for the given shortId and userId
        console.log(shortId)
        const visitorsCollectionRef = collection(db, `users/${userId}/shortLinks/${shortId}/visitors`);
        const querySnapshot = await getDocs(visitorsCollectionRef);

        // Extract location data
        const fetchedLocations = querySnapshot.docs.map(doc => doc.data()).map(visitor => ({
          lat: visitor.latitude || 0, // Default to 0 if latitude is not available
          lng: visitor.longitude || 0 // Default to 0 if longitude is not available
        }));

        setLocations(fetchedLocations);

      } catch (err) {
        console.error('Error fetching visitor data:', err);
        setError('Error fetching visitor data');
      }
    };

    fetchVisitorData();
  }, [userId, shortId]); // Ensure this effect runs when userId or linkId changes

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {locations.length > 0 ? (
        <MapComponent locations={locations} />
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default LocationAnalytics;

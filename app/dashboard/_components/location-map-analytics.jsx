"use client"

import { useState } from 'react';

import LocationAnalytics from './location-analytics'; // Adjust the import path as needed

const LocationAndMapAnalytics = ({ shortId }) => {
  // const [shortId, setShortId] = useState(''); // Set this dynamically as needed

  const linkId = shortId.link
  return (
    < LocationAnalytics shortId={linkId} />
  );
};

export default LocationAndMapAnalytics;

"use client"
import { useState } from 'react';
import LocationAnalytics from './location-analytics'; // Adjust the import path as needed

const App = () => {
  const [ipAddress, setIpAddress] = useState(''); // Replace with actual IP address

  return (
    <div>
      <h1>Location Analytics</h1>
      <LocationAnalytics ip={"105.154.196.71"} />
    </div>
  );
};

export default App;

// "use client";

// import React, { useEffect, useState } from 'react';
// import { db } from '@/config/firebase';
// import { collection, getDocs, query, orderBy } from 'firebase/firestore';

// export default function AnalyticsComponent() {
//     const [links, setLinks] = useState([]);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchAnalytics = async () => {
//             try {
//                 const colRef = collection(db, "users");
//                 const q = query(colRef, orderBy("clickCount", "desc"));
//                 const querySnapshot = await getDocs(q);

//                 const data = querySnapshot.docs.map(doc => ({
//                     id: doc.id,
//                     ...doc.data()
//                 }));
//                 setLinks(data);
//             } catch (err) {
//                 console.error('Failed to fetch analytics:', err);
//                 setError('Failed to fetch analytics');
//             }
//         };

//         fetchAnalytics();
//     }, []);

//     return (
//         <div>
//             <h1>Analytics</h1>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <ul>
//                 {links.map(link => (
//                     <li key={link.shortId}>
//                         <strong>Short ID:</strong> {link.shortId}<br />
//                         <strong>Original URL:</strong> {link.originalUrl}<br />
//                         <strong>Click Count:</strong> {link.clickCount || 0}<br />
//                         <strong>Last Clicked At:</strong> {link.lastClickedAt?.toDate()?.toLocaleString() || 'Never'}<br />
//                         <strong>IP Address:</strong> {link.ipAddress || 'N/A'}<br />
//                         <strong>Location:</strong> {link.location || 'N/A'}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

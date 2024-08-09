"use client"

import { useState, useEffect } from 'react';
import { db } from '@/config/firebase';
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function ShortLinks() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState('');
  
  // Get or set a unique visitor ID
  const [visitorId, setVisitorId] = useState('');
  const [linksCount, setLinksCount] = useState(0);

  useEffect(() => {
    // Retrieve the visitor ID from local storage or generate a new one
    const storedVisitorId = localStorage.getItem('visitorId');
    if (storedVisitorId) {
      setVisitorId(storedVisitorId);
    } else {
      const newVisitorId = uuidv4();
      localStorage.setItem('visitorId', newVisitorId);
      setVisitorId(newVisitorId);
    }

    // Retrieve the number of links created from local storage
    const count = localStorage.getItem('linksCount') || 0;
    setLinksCount(parseInt(count, 10));

    // Fetch URLs for this visitor
    const fetchUrls = async () => {
      try {
        if (!visitorId) return;
        const linksCollectionRef = collection(db, "visitors");
        const q = query(linksCollectionRef, where("visitorId", "==", visitorId));
        const snapshot = await getDocs(q);
        const urlsList = snapshot.docs.map(doc => doc.data());
        setUrls(urlsList);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch URLs');
      }
    };

    fetchUrls();
  }, [visitorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (linksCount >= 10) {
      setError('You can only create up to 10 URLs.');
      return;
    }

    if (originalUrl && visitorId) {
      const shortId = Math.random().toString(36).substring(2, 8);
      try {
        const linksCollectionRef = collection(db, "visitors");
        await addDoc(linksCollectionRef, {
          originalUrl: originalUrl,
          shortId: shortId,
          visitorId: visitorId,  // Include visitorId
          createdAt: new Date()  // Add a timestamp
        });

        // Update local state and reset input
        setUrls([...urls, { originalUrl, shortId }]);
        setOriginalUrl('');
        setError('');

        // Update local storage
        const newCount = linksCount + 1;
        setLinksCount(newCount);
        localStorage.setItem('linksCount', newCount);
      } catch (err) {
        console.error(err);
        setError('Failed to create short link');
      }
    }
  };

  return (
    <div>
      {/* <h1>Short Link Creator</h1> */}
      <form onSubmit={handleSubmit} className="flex space-x-4">
        <Input
          type="url"
          placeholder="Enter the URL here..."
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
        />
        <Button type="submit">Create Short Link</Button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <h2>Short Links List</h2>
        <ul>
          {urls.map((link, index) => (
            <li key={index}>
              <Link href={`http://localhost:3001/${link.shortId}`} target="_blank">
                http://localhost:3001/{link.shortId}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

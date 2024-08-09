"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { db, analytics } from '@/config/firebase';
import { collection, query, where, getDocs, updateDoc, increment, doc, getDoc, setDoc } from 'firebase/firestore';
import { logEvent } from 'firebase/analytics';

export default function RedirectPage({ params }) {
  const [originalUrl, setOriginalUrl] = useState(null);
  const router = useRouter();

  const fetchUserIds = async () => {
    try {
      const usersCollectionRef = collection(db, 'users');
      const userSnapshot = await getDocs(usersCollectionRef);
      return userSnapshot.docs.map(doc => doc.id);
    } catch (error) {
      console.error('Error fetching user IDs:', error);
      return [];
    }
  };

  const searchInUserShortLinks = async (userId, shortId) => {
    try {
      const shortLinksRef = collection(db, 'users', userId, 'shortLinks');
      const q = query(shortLinksRef, where('shortId', '==', shortId));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty ? querySnapshot.docs[0] : null;
    } catch (error) {
      console.error(`Error searching in user ${userId}'s shortLinks:`, error);
      return null;
    }
  };

  const searchAcrossAllUsers = async (shortId) => {
    try {
      const userIds = await fetchUserIds();
      for (const userId of userIds) {
        const docSnap = await searchInUserShortLinks(userId, shortId);
        if (docSnap) return docSnap;
      }
      return null;
    } catch (error) {
      console.error('Error searching across all users:', error);
      return null;
    }
  };

  const handleVisitorUpdate = async (shortId, userId, visitorData) => {
    const visitorsCollectionRef = collection(db, `users/${userId}/shortLinks/${shortId}/visitors`);
    const visitorDocRef = doc(visitorsCollectionRef, visitorData.ipAddress); // Use IP as doc ID

    try {
      const visitorDocSnap = await getDoc(visitorDocRef);

      if (visitorDocSnap.exists()) {
        // Update existing visitor
        await setDoc(visitorDocRef, {
          ...visitorData,
          timestamp: new Date() // Update timestamp
        }, { merge: true });
        console.log(`Updated visitor with IP ${visitorData.ipAddress}`);
      } else {
        // Add new visitor
        await setDoc(visitorDocRef, visitorData);
        console.log(`Added new visitor with IP ${visitorData.ipAddress}`);
      }
    } catch (error) {
      console.error('Error handling visitor data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { shortId } = params;

      if (!shortId) {
        console.error('ShortId is missing');
        return;
      }

      console.log('Searching for document with shortId:', shortId);

      try {
        const docSnap = await searchAcrossAllUsers(shortId);

        if (docSnap) {
          const data = docSnap.data();
          console.log('Found short link data:', data);

          if (data.originalUrl) {
            setOriginalUrl(data.originalUrl);

            // Capture device information
            const userAgent = navigator.userAgent;

            // Capture IP address and location
            let ip = '';
            let location = '';
            let latitude = '';
            let longitude = '';
            try {
              const ipResponse = await fetch('https://api.ipify.org?format=json');
              const ipData = await ipResponse.json();
              ip = ipData.ip;

              const locationResponse = await fetch(`https://ipapi.co/${ip}/json/`);
              const locationData = await locationResponse.json();
              location = `${locationData.city}, ${locationData.country_name}` || 'Unknown';
              latitude = locationData.latitude || 'Unknown';
              longitude = locationData.longitude || 'Unknown';
            } catch (err) {
              console.error('Failed to fetch IP address or location', err);
            }

            // Log the click event
            logEvent(analytics, 'link_clicked', {
              shortId: shortId,
              originalUrl: data.originalUrl,
              userAgent: userAgent,
              ipAddress: ip,
              location: location,
              latitude: latitude,
              longitude: longitude
            });

            // Update click count
            await updateDoc(docSnap.ref, {
              clickCount: increment(0.5),
              lastClickedAt: new Date(),
            });

            // Prepare visitor data
            const visitorData = {
              ipAddress: ip,
              userAgent: userAgent,
              location: location,
              latitude: latitude,
              longitude: longitude,
              timestamp: new Date()
            };

            // Handle visitor data
            await handleVisitorUpdate(shortId, docSnap.ref.parent.parent.id, visitorData);
          } else {
            console.error('Document found but no original URL field');
          }
        } else {
          console.error('No document found in any user\'s shortLinks collection!');
        }
      } catch (error) {
        console.error('Error searching document:', error);
      }
    };

    fetchData(); // Call the async function
  }, [params]);

  useEffect(() => {
    if (originalUrl) {
      console.log('Redirecting to:', originalUrl);
      const timer = setTimeout(() => {
        router.push(originalUrl);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      console.error('No original URL found for redirection');
    }
  }, [originalUrl, router]);

  return <div>Redirecting you in seconds...</div>;
}

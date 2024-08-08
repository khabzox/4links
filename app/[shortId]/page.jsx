"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/config/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";

export default function RedirectPage({ params }) {
  const [originalUrl, setOriginalUrl] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { shortId } = params;
      console.log("Fetching document with shortId:", shortId);

      try {
        // Reference to the `links` collection
        const colRef = collection(db, "links");
        
        // Query to find the document with the matching `shortId`
        const q = query(colRef, where("shortId", "==", shortId));
        
        // Execute the query
        const querySnapshot = await getDocs(q);

        // Check if any documents match the query
        if (!querySnapshot.empty) {
          // Assuming shortId is unique, we can just take the first document
          const docSnap = querySnapshot.docs[0];
          const data = docSnap.data();
          console.log("Document data:", data);
          setOriginalUrl(data.originalUrl);
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchData();
  }, [params]);

  useEffect(() => {
    if (originalUrl) {
      const timer = setTimeout(() => {
        window.location.href = originalUrl;
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [originalUrl]);

  return <div>Redirecting you in 2 seconds...</div>;
}

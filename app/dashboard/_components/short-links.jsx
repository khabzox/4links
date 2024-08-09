"use client";

import { useState, useEffect } from 'react';
import { db } from '@/config/firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  setDoc
} from 'firebase/firestore';

import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import Link from 'next/link';
import Appconfig from '@/config/app-info';

export default function ShortLinks() {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  const fullName = user?.fullName;
  const router = useRouter();

  const [originalUrl, setOriginalUrl] = useState('');
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState('');
  const [linksCount, setLinksCount] = useState(0);

  useEffect(() => {
    const count = localStorage.getItem('linksCount') || 0;
    setLinksCount(parseInt(count, 10));

    const fetchUrls = async () => {
      if (!user) return;

      try {
        const shortLinksCollectionRef = collection(db, "users", user.id, "shortLinks");
        const snapshot = await getDocs(shortLinksCollectionRef);
        const urlsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUrls(urlsList);
      } catch (err) {
        console.error('Failed to fetch URLs:', err);
        setError('Failed to fetch URLs');
      }
    };

    fetchUrls();
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (linksCount >= 10) {
      setError('You can only create up to 10 URLs.');
      return;
    }

    if (user) {
      const userDocRef = doc(db, "users", user.id);
      try {
        await setDoc(userDocRef, {
          Id: user.id,
          FullName: fullName,
          Email: email,
          createdAt: new Date()
        });
      } catch (err) {
        console.error('Failed to save user:', err);
        setError('Failed to save user');
        return;
      }
  
      if (originalUrl) {
        const shortId = Math.random().toString(36).substring(2, 8);
        try {
          const shortLinksCollectionRef = doc(db, "users", user.id, "shortLinks", shortId);
          await setDoc(shortLinksCollectionRef, {
            originalUrl: originalUrl,
            shortId: shortId,
            createdAt: new Date()
          });
  
          setUrls(prevUrls => [...prevUrls, { originalUrl, shortId }]);
          setOriginalUrl('');
          setError('');
  
          const newCount = linksCount + 1;
          setLinksCount(newCount);
          localStorage.setItem('linksCount', newCount);
        } catch (err) {
          console.error('Failed to create short link:', err);
          setError('Failed to create short link');
        }
      }
    } else {
      setError('User not logged in');
    }
  };

  const deleteShortLink = async (shortId) => {
    try {
      // Get the user's ID, make sure it is available
      const userId = user?.id;
      if (!userId) {
        console.error('User ID is not available');
        setError('User ID is not available');
        return;
      }
  
      // Reference to the specific short link document
      const shortLinksCollectionRef = collection(db, "users", userId, "shortLinks");
      const shortLinkRef = doc(shortLinksCollectionRef, shortId);
  
      // Delete the document
      await deleteDoc(shortLinkRef);
  
      // Update local state to remove the deleted link
      setUrls(prevUrls => prevUrls.filter(link => link.shortId !== shortId));
  
      // Update count and local storage
      const newCount = linksCount - 1;
      setLinksCount(newCount);
      localStorage.setItem('linksCount', newCount);
  
      console.log('Short link deleted successfully');
    } catch (err) {
      console.error('Failed to delete the short link:', err);
      setError('Failed to delete the short link');
    }
  };

  return (
    <div>
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

      {urls.length > 0 && (
        <div className="my-5">
          <h2 className="text-primary text-xl font-semibold mb-2">Your Short Links List:</h2>
          <ul>
            {urls.map((link) => (
              <li key={link.shortId} className="flex items-center justify-start space-x-4 mb-2">
                <Link href={`${Appconfig.domainName}/${link.shortId}`} target="_blank" rel="noopener noreferrer" className="bg-primary text-muted text-lg h-10 px-4 py-1 rounded-md">
                  {Appconfig.domainName}/{link.shortId}
                </Link>
                <Button variant="delete" onClick={() => deleteShortLink(link.shortId)}>Delete</Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
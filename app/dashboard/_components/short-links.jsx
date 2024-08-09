"use client";

import { useState, useEffect } from 'react';
import { db } from '@/config/firebase';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
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
  const [editing, setEditing] = useState(null); // Track which link is being edited
  const [updatedUrl, setUpdatedUrl] = useState(''); // Store the updated URL

  useEffect(() => {
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
      const userId = user?.id;
      if (!userId) {
        console.error('User ID is not available');
        setError('User ID is not available');
        return;
      }
  
      const shortLinksCollectionRef = collection(db, "users", userId, "shortLinks");
      const shortLinkRef = doc(shortLinksCollectionRef, shortId);
  
      await deleteDoc(shortLinkRef);
  
      setUrls(prevUrls => prevUrls.filter(link => link.shortId !== shortId));
  
      console.log('Short link deleted successfully');
    } catch (err) {
      console.error('Failed to delete the short link:', err);
      setError('Failed to delete the short link');
    }
  };

  const startEditing = (link) => {
    setEditing(link.shortId);
    setUpdatedUrl(link.originalUrl);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (editing && updatedUrl) {
      try {
        const shortLinkRef = doc(db, "users", user.id, "shortLinks", editing);
        await setDoc(shortLinkRef, {
          originalUrl: updatedUrl,
          shortId: editing,
          createdAt: new Date() // Optionally update the timestamp
        }, { merge: true });

        setUrls(prevUrls => prevUrls.map(link => 
          link.shortId === editing ? { ...link, originalUrl: updatedUrl } : link
        ));
        setEditing(null);
        setUpdatedUrl('');
        setError('');
      } catch (err) {
        console.error('Failed to update short link:', err);
        setError('Failed to update short link');
      }
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 text-left">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Input
          type="url"
          placeholder="Enter the URL here..."
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit" className="w-full sm:w-auto">Create Short Link</Button>
      </form>
      {error && <p className="text-red-600 mt-2">{error}</p>}

      {editing && (
        <form onSubmit={handleUpdate} className="my-4">
          <Input
            type="url"
            placeholder="Enter the new URL here..."
            value={updatedUrl}
            onChange={(e) => setUpdatedUrl(e.target.value)}
            required
            className="mb-2"
          />
          <div className="flex flex-col sm:flex-row sm:space-x-2">
            <Button type="submit" className="mb-2 sm:mb-0">Update Short Link</Button>
            <Button onClick={() => setEditing(null)} variant="outline">Cancel</Button>
          </div>
        </form>
      )}

      {urls.length > 0 && (
        <div className="my-5">
          <h2 className="text-primary text-xl font-semibold mb-2">Your Short Links List:</h2>
          <ul className="space-y-2">
            {urls.map((link) => (
              <li key={link.shortId} className="flex flex-col sm:flex-row items-start space-y-2 sm:space-y-0 sm:space-x-4">
                <Link href={`${Appconfig.domainName}/${link.shortId}`} target="_blank" rel="noopener noreferrer" className="bg-primary text-muted text-lg h-10 px-4 py-1 rounded-md">
                  {Appconfig.domainName}/{link.shortId}
                </Link>
                <div className="flex  sm:flex-row sm:space-x-2 mt-2 sm:mt-0">
                  <Button onClick={() => startEditing(link)} className="w-full sm:w-auto mb-2 mr-2 sm:mb-0">Edit</Button>
                  <Button variant="delete" onClick={() => deleteShortLink(link.shortId)} className="w-full sm:w-auto">Delete</Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

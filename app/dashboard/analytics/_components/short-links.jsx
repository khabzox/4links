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
  const router = useRouter();

  const [urls, setUrls] = useState([]);

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

  return (
    <div>
      {urls.length > 0 && (
        <div className="my-5">
          <h2 className="text-primary text-xl font-semibold mb-2">Your Short Links List:</h2>
          <ul>
            {urls.map((link) => (
              <li key={link.shortId} className="flex items-center justify-start space-x-4 mb-2">
                <Link href={`/dashboard/analytics/${link.shortId}`} rel="noopener noreferrer" className="bg-primary text-muted text-lg h-10 px-4 py-1 rounded-md">
                  {Appconfig.domainName}/{link.shortId}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
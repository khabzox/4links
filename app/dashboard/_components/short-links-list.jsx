"use client"
import { useState, useEffect } from 'react';
import { db } from '@/config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Appconfig from '@/config/app-info';

import { useUser } from '@clerk/nextjs';

export default function ShortLinksList() {
    const [urls, setUrls] = useState([]);
    const [error, setError] = useState('');

    const { user } = useUser()

    useEffect(() => {
        const fetchUrls = async () => {
            if (!user) return;
            // Assuming you have a way to get the user ID
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
    }, [user]);

    return (
        <div>
            {error && <p className="text-red-600 mt-2">{error}</p>}
            {urls.length > 0 ? (
                <ul className="space-y-2">
                    {urls.map((link) => (
                        <li key={link.shortId} className="flex items-center space-x-4">
                            <Link href={`${Appconfig.domainName}/${link.shortId}`} target="_blank" rel="noopener noreferrer" className="bg-primary text-muted text-lg px-4 py-1 rounded-md">
                                {Appconfig.domainName}/{link.shortId}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No short links available.</p>
            )}
        </div>
    );
}

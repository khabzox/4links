"use client";

import { useState, useEffect } from 'react';
import { db } from '@/config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import VisitorDeviceChart from "./_components/visitor-device-chart"; // Adjust path if needed
import ShortLinksList from "./_components/short-links-list"; // Adjust path if needed

import { useUser } from '@clerk/nextjs';

export default function DashboardPage() {
    const [shortLinksCount, setShortLinksCount] = useState(0);
    const { user } = useUser()

    useEffect(() => {
        const fetchShortLinksCount = async () => {
            try {
                // Assume userId is fetched from somewhere, adjust as needed
                const shortLinksCollectionRef = collection(db, "users", user.id, "shortLinks");
                const snapshot = await getDocs(shortLinksCollectionRef);
                setShortLinksCount(snapshot.size); // Number of documents
            } catch (err) {
                console.error('Failed to fetch short links count:', err);
            }
        };

        fetchShortLinksCount();
    }, [user]);

    return (
        <div className="p-4 sm:p-6 md:p-8 lg:p-10">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <div className="w-full md:w-1/2">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">Your Short Links</h2>
                        <p className="text-lg mb-4">Total short links created: {shortLinksCount}</p>
                        <ShortLinksList />
                    </div>
                </div>

                <div className="w-full md:w-1/2">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">Visitor Device Chart</h2>
                        <VisitorDeviceChart />
                    </div>
                </div>
            </div>
        </div>
    );
}

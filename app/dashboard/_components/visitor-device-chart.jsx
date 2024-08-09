"use client";

import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { db } from '@/config/firebase';
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore';
import { useUser } from '@clerk/nextjs';
import UAParser from 'ua-parser-js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function VisitorDeviceChart() {
    const { user } = useUser();
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = user?.id;

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) {
                // Exit if userId is not available
                return;
            }

            setLoading(true);
            setError(null);

            try {
                // Fetch the latest short link
                const shortLinksCollectionRef = collection(db, 'users', userId, 'shortLinks');
                const q = query(shortLinksCollectionRef, orderBy('createdAt', 'desc'), limit(1));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    setError('No short links found.');
                    return;
                }

                const latestShortLinkDoc = querySnapshot.docs[0];
                const latestShortLink = latestShortLinkDoc.data();
                console.log('Latest Short Link:', latestShortLink);

                // Fetch visitor data
                const visitorsCollectionRef = collection(db, `users/${userId}/shortLinks/${latestShortLink.shortId}/visitors`);
                console.log('Fetching visitors from:', `users/${userId}/shortLinks/${latestShortLink.shortId}/visitors`);
                const visitorSnapshot = await getDocs(visitorsCollectionRef);

                // Parse user agents and count devices
                const deviceCounts = visitorSnapshot.docs.reduce((acc, doc) => {
                    const data = doc.data();
                    const userAgent = data?.userAgent || 'Unknown';
                    const parser = new UAParser(userAgent);
                    const deviceType = parser.getDevice().type || 'desktop'; // Fallback to 'desktop'
                    acc[deviceType] = (acc[deviceType] || 0) + 1;
                    return acc;
                }, {});

                // Prepare data for chart
                setChartData({
                    labels: Object.keys(deviceCounts),
                    datasets: [
                        {
                            label: 'Device Usage',
                            data: Object.values(deviceCounts),
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        }
                    ]
                });
            } catch (err) {
                console.error('Error fetching latest short link or visitor data:', err);
                setError(`Error fetching data: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]); // Dependency array includes userId to refetch data when it changes

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && <Bar
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function (tooltipItem) {
                                    const dataset = tooltipItem.dataset;
                                    const label = dataset.label || '';
                                    const value = tooltipItem.raw || 0;
                                    return ` ${label}: ${value}`;
                                },
                            },
                        },
                    },
                }}
            />}
        </div>
    );
}

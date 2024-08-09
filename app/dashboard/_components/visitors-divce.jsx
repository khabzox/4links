"use client";

import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { db } from '@/config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useUser } from '@clerk/nextjs';
import UAParser from 'ua-parser-js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const VisitorDeviceChart = ({ shortId }) => {
    const linkId = shortId.link;
    const [deviceData, setDeviceData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useUser();
    const userId = user?.id;

    useEffect(() => {
        const fetchDeviceData = async () => {
            setLoading(true);
            setError(null);

            try {
                const visitorsCollectionRef = collection(db, `users/${userId}/shortLinks/${linkId}/visitors`);
                const visitorSnapshot = await getDocs(visitorsCollectionRef);

                if (visitorSnapshot.empty) {
                    console.warn('No visitors found');
                    setError('No visitors found.');
                } else {
                    // Parse user agents and count devices
                    const deviceCounts = visitorSnapshot.docs.reduce((acc, doc) => {
                        const data = doc.data();
                        const userAgent = data.userAgent || 'Unknown';
                        // console.log('Raw User-Agent:', userAgent); // Debugging line
                        const parser = new UAParser(userAgent);
                        const deviceType = parser.getDevice().type || 'desktop'; // Fallback to 'desktop'
                        // console.log('Parsed Device Type:', deviceType); // Debugging line
                        acc[deviceType] = (acc[deviceType] || 0) + 1;
                        return acc;
                    }, {});

                    setDeviceData(deviceCounts);
                }
            } catch (err) {
                console.error('Error fetching visitor data:', err);
                setError('Error fetching visitor data');
            } finally {
                setLoading(false);
            }
        };

        fetchDeviceData();
    }, [linkId, userId]);

    const chartData = {
        labels: Object.keys(deviceData),
        datasets: [
            {
                label: 'Device Usage',
                data: Object.values(deviceData),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#FF9F40',
                    '#4BC0C0',
                    '#9966FF'
                ],
                hoverOffset: 4
            }
        ]
    };

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && <Pie data={chartData} />}
        </>
    );
};

export default VisitorDeviceChart;
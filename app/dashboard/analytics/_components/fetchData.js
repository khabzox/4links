import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';

export async function fetchData(shortId, userId) {
    try {
        // Fetch additional link details
        const linkDocRef = doc(db, `users/${userId}/shortLinks/${shortId}`);
        const linkDoc = await getDoc(linkDocRef);
        const linkData = linkDoc.data();

        // Fetch visitors data
        const visitorsCollectionRef = collection(db, `users/${userId}/shortLinks/${shortId}/visitors`);
        const visitorSnapshot = await getDocs(visitorsCollectionRef);
        const visitorsData = visitorSnapshot.docs.map(doc => doc.data());
        const visitCount = visitorsData.length;

        // Prepare data to be returned
        return {
            linkData: {
                visits: visitCount,
                clicks: linkData?.clickCount || 0,
                createdAt: linkData?.createdAt?.toDate().toLocaleDateString() || 'N/A',
                lastClick: linkData?.lastClickedAt?.toDate().toLocaleDateString() || 'N/A',
                originalLink: linkData?.originalUrl || 'N/A',
            },
            visitorsData
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            linkData: {
                visits: 0,
                createdAt: 'N/A',
                lastClick: 'N/A',
                originalLink: 'N/A',
            },
            visitorsData: []
        };
    }
}

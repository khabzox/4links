import { fetchData } from '../_components/fetchData';
import LocationAndMapAnalytics from "../../_components/location-map-analytics";
import VisitorDeviceChart from "../../_components/visitors-divce";

import { currentUser } from '@clerk/nextjs/server';

export default async function LinkPageAnalytics({ params }) {
    const { link: shortId } = params;
    const user = currentUser()
    const userId = (await user).id
    const linkData = await fetchData(shortId, userId);

    return (
        <>
            <LocationAndMapAnalytics shortId={params} />
            <div className="flex flex-col space-y-4 md:flex-row justify-between my-5 px-0 md:px-10 max-h-96">
                <div className="w-1/2 my-auto">
                    <ul className="text-xl">
                        <li><span className="font-semibold">Visitors:</span> {linkData.linkData.visits}</li>
                        <li><span className="font-semibold">Clicks:</span> {linkData.linkData.clicks}</li>
                        <li><span className="font-semibold">Created At:</span> {linkData.linkData.createdAt}</li>
                        <li><span className="font-semibold">Last Click:</span> {linkData.linkData.lastClick}</li>
                        <li><span className="font-semibold">Original Link:</span> <a href={linkData.linkData.originalLink} target="_blank" rel="noopener noreferrer">{linkData.linkData.originalLink}</a></li>
                    </ul>
                </div>
                <div className="max-w-64 max-h-64 md:max-h-80 md:max-w-90 md:h-full md:w-full">
                    <VisitorDeviceChart shortId={params} />
                </div>
            </div>
        </>
    );
}



// "server-only";

// import LocationAndMapAnalytics from "../../_components/location-map-analytics";
// import VisitorDeviceChart from "../../_components/visitors-divce";
// import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
// import { db } from '@/config/firebase';

// import { currentUser } from "@clerk/nextjs/server";

// export async function getData(shortId) {
//     const { user } = currentUser()
//     const userId = user?.id

//     try {
//         // Fetch additional link details
//         const linkDocRef = doc(db, `users/${userId}/shortLinks/${shortId}`);
//         const linkDoc = await getDoc(linkDocRef);
//         const linkData = linkDoc.data();

//         // Fetch visitors data
//         const visitorsCollectionRef = collection(db, `users/${userId}/shortLinks/${shortId}/visitors`);
//         const visitorSnapshot = await getDocs(visitorsCollectionRef);
//         const visitorsData = visitorSnapshot.docs.map(doc => doc.data());
//         console.log(visitorSnapshot)
// console.log(visitorsData)

//         // Prepare data to be returned
//         return {
//             linkData: {
//                 visits: visitorsData?.clickCount, // Count of visitors
//                 createdAt: linkData.createdAt?.toDate().toLocaleDateString() || 'N/A',
//                 lastClick: linkData?.lastClick?.toDate().toLocaleDateString() || 'N/A',
//                 originalLink: linkData?.originalLink || 'N/A',
//             },
//             visitorsData
//         };
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         // return {
//         //     linkData: {
//         //         visits: 0,
//         //         createdAt: 'N/A',
//         //         lastClick: 'N/A',
//         //         originalLink: 'N/A',
//         //     },
//         //     visitorsData: []
//         // };
//     }
// }

// export default async function LinkPageAnalytics({ params }) {
//     const linkId  = params;
//     const shortId = params.link
//     const linkData = await getData(shortId);

//     return (
//         <>
//             <LocationAndMapAnalytics shortId={linkId} />
//             <div className="flex justify-between my-5 max-h-96">
//                 <div className="w-1/2">
//                     <ul>
//                         <li>Visits: {linkData.linkData.visits}</li>
//                         <li>Created At: {linkData.createdAt}</li>
//                         <li>Last Click: {linkData.lastClick}</li>
//                         <li>Original Link: <a href={linkData.originalLink} target="_blank" rel="noopener noreferrer">{linkData.originalLink}</a></li>
//                     </ul>
//                 </div>
//                 <div className="w-1/2">
//                     <VisitorDeviceChart shortId={linkId} />
//                 </div>
//             </div>
//         </>
//     );
// }

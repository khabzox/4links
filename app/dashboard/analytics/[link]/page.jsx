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
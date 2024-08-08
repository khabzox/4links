import { ArrowRight, SquareCheckBig } from "lucide-react";

import Link from "next/link";

export default function Plan() {
    return (
        <section className="max-w-7xl mx-auto py-10 px-5">

            <h2 className="text-3xl font-semibold">Simple Pricing for All Your Needs</h2>
            <p className="text-xl font-semibold pt-3 opacity-90">One Plan, All Features</p>

            <div className="flex justify-center mt-10 ">
                <div className="bg-secondary text-muted rounded-xl w-full max-w-56">
                    <div className="px-4 pt-4">
                        <span className="text-5xl">$9</span> / Month
                    </div>

                    <ul className="p-4 text-sm space-y-2">
                        <li className="flex items-center gap-1"><span><SquareCheckBig size={15} /></span> Unlimited Short Links</li>
                        <li className="flex items-center gap-1"><span><SquareCheckBig size={15} /></span>Advanced Analytics</li>
                        <li className="flex items-center gap-1"><span><SquareCheckBig size={15} /></span>Customizable URLs</li>
                        <li className="flex items-center gap-1"><span><SquareCheckBig size={15} /></span>Priority Support</li>
                    </ul>

                    <Link href={"#"}>
                        <div className="bg-destructive px-4 py-2 mt-2 rounded-xl flex items-center justify-between">
                            <h2 className="text-muted font-semibold">
                                Sign Up Now
                            </h2>
                            <ArrowRight className="bg-white/20 rounded-full text-muted p-2 w-9 h-9 ml-2" />
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    )
}
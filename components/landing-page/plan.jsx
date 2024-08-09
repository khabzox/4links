import { ArrowRight, SquareCheckBig } from "lucide-react";
import Link from "next/link";

export default function Plan() {
    return (
        <section className="max-w-7xl mx-auto py-12 px-5" id="Pricing">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 text-primary">
                Simple Pricing for All Your Needs
            </h2>
            <p className="text-lg sm:text-xl font-medium text-center text-gray-600 mb-10">
                One Plan, All Features
            </p>

            <div className="flex justify-center">
                <div className="bg-white text-primary rounded-3xl shadow-lg max-w-md w-full overflow-hidden border border-gray-200">
                    <div className="bg-secondary text-white text-center py-8">
                        <span className="text-5xl sm:text-6xl font-bold">$9</span>
                        <div className="text-lg mt-2">/ Month</div>
                    </div>

                    <ul className="p-6 text-base space-y-4">
                        <li className="flex items-center gap-3">
                            <SquareCheckBig size={20} className="text-primary" />
                            Unlimited Short Links
                        </li>
                        <li className="flex items-center gap-3">
                            <SquareCheckBig size={20} className="text-primary" />
                            Advanced Analytics
                        </li>
                        <li className="flex items-center gap-3">
                            <SquareCheckBig size={20} className="text-primary" />
                            Customizable URLs
                        </li>
                        <li className="flex items-center gap-3">
                            <SquareCheckBig size={20} className="text-primary" />
                            Priority Support
                        </li>
                    </ul>

                    <Link href="#">
                        <div className="block bg-primary text-white px-6 py-4 text-center rounded-xl shadow-md transition-transform transform hover:scale-105">
                            <span className="font-semibold text-lg">Sign Up Now</span>
                            <ArrowRight className="inline-block text-white ml-3 w-6 h-6" />
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}

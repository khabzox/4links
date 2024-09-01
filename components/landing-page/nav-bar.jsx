"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
    useAuth,
} from "@clerk/nextjs";

export default function NavBar() {
    const { userId } = useAuth();

    return (
        <header className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between shadow-md">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80">
                <h1 className="font-bold text-2xl">4Links</h1>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex space-x-6 text-white/85">
                <Link href="/" className="transition">Home</Link>
                <Link href="#Features" className="transition">Features</Link>
                <Link href="#Pricing" className="transition">Pricing</Link>
                <Link href="#Testimonials" className="transition">Testimonials</Link>
            </nav>

            {/* User Authentication Links */}
            <div className="flex items-center space-x-4">
                {userId ? (
                    <div className="flex items-center space-x-4">
                        <Link href="/dashboard" className="transition">Dashboard</Link>
                        <UserButton afterSignOutUrl="/" />
                    </div>
                ) : (
                    <>
                        <Link href="/sign-in" className="text-white/90">Login</Link>
                        <Link href="/sign-up" className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">Register</Link>
                    </>
                )}
            </div>
        </header>
    );
}

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
        <header className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between bg-white shadow-md">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80">
                <Image
                    src="/logo.svg"
                    width={100}
                    height={50}
                    alt="Logo of 4Links"
                />
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex space-x-6">
                <Link href="/" className="hover:text-primary transition">Home</Link>
                <Link href="#Features" className="hover:text-primary transition">Features</Link>
                <Link href="#Pricing" className="hover:text-primary transition">Pricing</Link>
                <Link href="#Testimonials" className="hover:text-primary transition">Testimonials</Link>
            </nav>

            {/* User Authentication Links */}
            <div className="flex items-center space-x-4">
                {userId ? (
                    <div className="flex items-center space-x-4">
                        <Link href="/dashboard" className="hover:text-primary transition">Dashboard</Link>
                        <UserButton afterSignOutUrl="/" />
                    </div>
                ) : (
                    <>
                        <Link href="/sign-up" className="bg-gray-200 text-primary px-4 py-2 rounded-lg hover:bg-gray-300 transition">Register</Link>
                        <Link href="/sign-in" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition">Login</Link>
                    </>
                )}
            </div>
        </header>
    );
}

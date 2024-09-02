import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="border-2 border-white/10">
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="flex justify-center sm:justify-start hover:opacity-80 cursor-pointer">
                    <Link href="/" className="flex items-center space-x-2 hover:opacity-80">
                <h1 className="font-bold text-2xl">4Links</h1>
                </Link>
                    </div>
                    <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
                        Copyright &copy; {new Date().getFullYear()}. All rights reserved.
                        Make with ❤️ from{" "}
                        <span>
                            <Link href={"https://github.com/khabzox"} className="underline">
                                khabzox
                            </Link>
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    )
}
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-gray-50">
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="flex justify-center sm:justify-start hover:opacity-80 cursor-pointer">
                        <Link href="/">
                            <Image
                                src={"/logo.svg"}
                                width={150}
                                height={50}
                                alt={"Logo of 4Links"}
                            />
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
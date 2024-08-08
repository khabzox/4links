import Image from "next/image"
import Link from "next/link"

export default function NavBar() {
    return (
        <header className={"max-w-7xl flex justify-between px-2 pt-2 items-center mx-auto"}>
            <Link href="/" className="hover:opacity-90">
                <Image
                    src={"/logo.svg"}
                    width={150}
                    height={50}
                    alt={"Logo of 4Links"}
                />
            </Link>

            <div className="hidden md:block">
                <ul className="flex space-x-4 text-xl pt-5">
                    <li><Link href={"#"}>Home</Link></li>
                    <li><Link href={"#"}>Features</Link></li>
                    <li><Link href={"#"}>Pricing</Link></li>
                    <li><Link href={"#"}>Contact</Link></li>

                </ul>
            </div>

            <div className="space-x-4 font-semibold pt-5">
                <Link href="/sign-up">Register</Link>
                <Link href="/sign-in" className="bg-primary text-muted px-4 py-2 rounded-lg">Login</Link>
            </div>
        </header>
    )
};


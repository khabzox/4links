import Link from "next/link";
import { HeroBtn } from "@/components/shared/button";

export default function Hero() {
    return (
        <section className="max-w-7xl mx-auto flex flex-col justify-center items-center text-center py-12 md:py-24">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 leading-tight">
                Transform Your Links <br className="block md:hidden" /> with{" "}
                <span className="relative inline-block">
                    <span>Ease!</span>
                    <div className="hidden md:block mt-2">
                        <UnderLine width="160" height="10" color="#3b82f6"/>
                    </div>
                </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary opacity-90 font-semibold mb-6">
                Shorten, Track, and Manage Your <br className="block md:hidden" /> URLs Effortlessly
            </p>
            <div className="mt-4">
                <Link href="/dashboard/short-linker">
                    <HeroBtn>
                        Get Started For Free
                    </HeroBtn>
                </Link>
            </div>
        </section>
    );
}

function UnderLine({ color = "#3b82f6", width = "160", height = "10" }) {
    return (
        <svg
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M2 5C7 0 12 -1 17 2C27 6 37 9 47 8C57 7 67 5 77 4C87 3 97 1 107 3C117 5 127 6 137 8C147 10 157 13 167 11C177 9 187 5 197 5"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
            />
        </svg>
    );
}


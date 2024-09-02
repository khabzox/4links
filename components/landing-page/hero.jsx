import Link from "next/link";
import { HeroBtn } from "@/components/shared/button";
import { Cover } from "../ui/cover";
import { GlobeDemo } from "./globe";
import { ArrowBigRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-600 to-neutral-300 dark:from-neutral-800 dark:via-white dark:to-white">
        Seamlessly Transform Your Links <br /> with Advanced Simplicity
        </h1>
        <button className="p-[3px] relative flex justify-center items-center mx-auto md:hidden ">
  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
  <div className="px-8 py-2 flex gap-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
   Get Started <ArrowBigRight/>
  </div>
</button>
        <GlobeDemo/>
      </section>
    );
}

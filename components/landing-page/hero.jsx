import ShortLinks from "./short-links";

export default function Hero() {
    return (
        <section className="max-w-7xl my-5 mx-auto flex flex-col justify-center items-center h-80 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary font-bold">Transform Your Links with
                {" "}
                <span>Ease!
                    <div className="flex justify-end">
                        <div className="hidden md:block">
                            <UnderLine width="130" />
                        </div>
                    </div>
                </span>
            </h1>
            <p className="text-md text-xs sm:text-sm md:text-xl lg:text-2xl text-primary opacity-90 py-4 font-bold">Shorten, Track, and Manage Your URLs Effortlessly</p>
            <div className="mt-2 px-3 sm:px-0">
                <ShortLinks />
            </div>
        </section>
    )
}


function UnderLine({ color = "#201E43", width = "197", height = "23" }) {
    return (
        <svg width={width} height={height} viewBox="0 0 197 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.89787 20.4258C6.32561 20.1402 9.72422 18.9004 13.0725 18.2013C29.3015 14.8128 46.0004 13.221 62.4867 11.71C93.7244 8.84683 125.091 7.56538 156.392 5.60155C169.011 4.80983 181.618 3.99015 194.246 3.35876" stroke={color} stroke-width="5" stroke-linecap="round" />
        </svg>
    );
}

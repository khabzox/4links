export default function WhyUs() {
    return (
        <section className="bg-primary text-white py-20" id="Features">
            <div className="max-w-7xl mx-auto px-5">
                <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-12">
                    Why Choose Our Short Link Service?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card
                        title="Easy Link Shortening"
                        desc="Transform long URLs into short, shareable links in seconds."
                    />
                    <Card
                        title="Advanced Analytics"
                        desc="Track clicks, location, and device stats with our detailed analytics dashboard."
                    />
                    <Card
                        title="Customizable Links"
                        desc="Create branded links and add custom aliases for better engagement."
                    />
                    <Card
                        title="Secure & Reliable"
                        desc="Your data is protected with industry-standard security protocols."
                    />
                </div>
            </div>
        </section>
    );
}

function Card({ title, desc }) {
    return (
        <div className="bg-white text-primary p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-base opacity-80">{desc}</p>
        </div>
    );
}

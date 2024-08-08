export default function WhyUs() {
    return (
        <section className="bg-primary text-muted">
            <div className="max-w-7xl mx-auto py-20 px-5">
                <h2 className="text-3xl font-semibold pb-8">Why Choose Our Short Link Service?</h2>
                <div className="flex flex-col lg:flex-row md:justify-between">
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
    )
}

function Card({ title, desc }) {
    return (
        <div className="bg-muted max-w-64 max-lg:max-w-full m-4 rounded-lg shadow-lg p-4">
            <h3 className="text-primary font-bold">{title}</h3>
            <p className="text-primary opacity-90 pt-2">{desc}</p>
        </div>
    )
}
export default function Testimonials() {
    return (
        <section className="bg-primary text-muted">
            <div className="max-w-7xl mx-auto py-20 px-5">
                <h2 className="text-3xl font-semibold pb-8">What Our Users Say</h2>
                <TestimonialsCards />
            </div>
        </section>
    )
}

export function TestimonialsCards() {
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-5 3xl:px-0">
                <TestimonialCard
                    title={"Jane D., Marketing Manager"}
                    desc={
                        "This service is a game-changer! The analytics are incredibly detailed, and the link customization options are fantastic."
                    }
                />
                <TestimonialCard
                    title={"John S., Small Business Owner"}
                    desc={
                        "Simple, effective, and affordable. Perfect for managing all my links."
                    }
                />
            </div>
        </>
    );
}

export function TestimonialCard({ title, desc }) {
    return (
        <div className="w-full p-6 rounded-3xl bg-accent">
            <h3 className="text-primary text-xl font-semibold uppercase">{title}</h3>
            <p className="text-primary/90 pt-2">{desc}</p>
        </div>
    );
}

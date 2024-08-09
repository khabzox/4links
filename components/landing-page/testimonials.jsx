export default function Testimonials() {
    return (
        <section className="bg-primary text-muted" id="Testimonials">
            <div className="max-w-7xl mx-auto py-16 px-5">
                <h2 className="text-4xl font-bold text-center text-white mb-12">
                    What Our Users Say
                </h2>
                <TestimonialsCards />
            </div>
        </section>
    )
}

export function TestimonialsCards() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 sm:px-0">
            <TestimonialCard
                title="Jane D., Marketing Manager"
                desc="This service is a game-changer! The analytics are incredibly detailed, and the link customization options are fantastic."
            />
            <TestimonialCard
                title="John S., Small Business Owner"
                desc="Simple, effective, and affordable. Perfect for managing all my links."
            />
        </div>
    );
}

export function TestimonialCard({ title, desc }) {
    return (
        <div className="p-6 bg-white rounded-2xl shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-primary text-lg font-semibold mb-3">{title}</h3>
            <p className="text-primary/80">{desc}</p>
        </div>
    );
}

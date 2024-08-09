export function HeroBtn({ className = '', children, ...props }) {
    return (
        <button
            className={`bg-primary text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform transform active:scale-95 hover:bg-primary focus:outline-none focus:ring-2 focus:ring-muted ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

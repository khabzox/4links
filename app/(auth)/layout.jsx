import Footer from "@/components/landing-page/footer";
import NavBar from "@/components/landing-page/nav-bar";

export default function AuthLayout({ children }) {
    return (
        <>
            <NavBar />
            {children}
            <Footer />
        </>
    )
}
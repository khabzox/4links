import NavBar from "@/components/landing-page/nav-bar";
import Hero from "@/components/landing-page/hero";
import WhyUs from "@/components/landing-page/why-us";
import Plan from "@/components/landing-page/plan";
import Testimonials from "@/components/landing-page/testimonials";
import Footer from "@/components/landing-page/footer";
import { Spotlight } from "@/components/ui/spotlight";

/**
  * @title HomePage 
*/
export default function Home() {
  return (
    <>
     <Spotlight/>
      <NavBar />
     <Hero />
     {/*  <WhyUs />
      <Plan />
      <Testimonials />
      <Footer /> */}
    </>
  )
}
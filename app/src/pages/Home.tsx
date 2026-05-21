import { useLenis } from "../hooks/useLenis";
import Navbar from "../sections/Navbar";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Services from "../sections/Services";
import GlobalReach from "../sections/GlobalReach";
import Statistics from "../sections/Statistics";
import Mission from "../sections/Mission";
import MonumentGallery from "../sections/MonumentGallery";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";

export default function Home() {
  useLenis();

  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <GlobalReach />
        <Statistics />
        <Mission />
        <MonumentGallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

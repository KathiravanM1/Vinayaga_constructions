import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeatureCards from "./components/FeatureCards";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import ProjectsSection from "./components/ProjectsSection";
import WhyUsSection from "./components/WhyUsSection";
import InnovationsSection from "./components/InnovationsSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen">
      <a
        href="https://api.whatsapp.com/send?phone=919003837874&text=Hello,%20I%20have%20a%20question%20about%20construction"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 hover:scale-110 transition-transform whatsapp-pulse"
        aria-label="Chat on WhatsApp"
      >
        <img
          src="https://ik.imagekit.io/gefw7u8jk/Vinayaga%20constructions/WhatsApp.svg.png"
          alt="WhatsApp"
          className="h-20 w-20 object-contain drop-shadow-xl whatsapp-float"
        />
      </a>
      <Navbar />
      <HeroSection />
      <FeatureCards />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <WhyUsSection />
      <InnovationsSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;

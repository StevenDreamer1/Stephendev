import Navigation from '../components/portfolio/Navigation'; // Adjusted import path
import HeroSection from '../components/portfolio/HeroSection'; // Adjusted import path
import AboutSection from '../components/portfolio/AboutSection'; // Adjusted import path
import ProjectsSection from '../components/portfolio/ProjectsSection'; // Adjusted import path
import ExperienceSection from '../components/portfolio/ExperienceSection'; // Adjusted import path
import ContactSection from '../components/portfolio/ContactSection'; // Adjusted import path

const Index = () => {
  return (
    <div id="portfolio-content" className="min-h-screen"> {/* Added ID for scrolling */}
      <Navigation /> {/* Keep navigation for the main content */}
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </div>
  );
};

export default Index;

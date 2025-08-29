import Navigation from '../components/portfolio/Navigation'; // Adjusted import path to relative
import HeroSection from '../components/portfolio/HeroSection'; // Adjusted import path to relative
import AboutSection from '../components/portfolio/AboutSection'; // Adjusted import path to relative
import ProjectsSection from '../components/portfolio/ProjectsSection'; // Adjusted import path to relative
import ExperienceSection from '../components/portfolio/ExperienceSection'; // Adjusted import path to relative
import ContactSection from '../components/portfolio/ContactSection'; // Adjusted import path to relative

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

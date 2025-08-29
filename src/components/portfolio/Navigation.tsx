import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const navItems = [{
    id: 'home',
    label: 'Home'
  }, {
    id: 'about',
    label: 'About'
  }, {
    id: 'projects',
    label: 'Projects'
  }, {
    id: 'experience',
    label: 'Experience'
  }, {
    id: 'contact',
    label: 'Contact'
  }];
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const {
            offsetTop,
            offsetHeight
          } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-card-border font-mono"> {/* Apply monospace font */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Updated name and font styling */}
          <div className="text-xl font-bold tracking-wider text-primary">STEVEN.</div> {/* Bold and wider tracking */}
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(item => <Button key={item.id} variant="ghost" onClick={() => scrollToSection(item.id)} className={`text-sm transition-smooth hover:text-primary ${activeSection === item.id ? 'text-primary bg-primary/10' : 'text-text-secondary'}`}>
                {item.label}
              </Button>)}
          </div>
        </div>
      </div>
    </nav>;
};
export default Navigation;

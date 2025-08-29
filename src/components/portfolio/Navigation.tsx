import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react'; // Import Bot icon

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const navItems = [{
    id: 'sams-ai', // New ID for SAMS.ai
    label: 'SAMS.ai', // New label
    path: '/sams-ai', // New path for the full-screen chatbot page
    icon: Bot, // Icon for SAMS.ai
    special: true // Mark as special for styling
  }, {
    id: 'home',
    label: 'Home',
    path: '/' // Link to the main entry page
  }, {
    id: 'about',
    label: 'About',
    path: '#about' // Anchor link
  }, {
    id: 'projects',
    label: 'Projects',
    path: '#projects' // Anchor link
  }, {
    id: 'experience',
    label: 'Experience',
    path: '#experience' // Anchor link
  }, {
    id: 'contact',
    label: 'Contact',
    path: '#contact' // Anchor link
  }];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.filter(item => !item.special).map(item => item.id); // Only observe scroll for non-special items
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

  const handleNavItemClick = (item: typeof navItems[0]) => {
    if (item.path.startsWith('#')) {
      // Anchor link, scroll to section
      const element = document.getElementById(item.path.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Route link, navigate
      window.location.href = item.path;
    }
    setActiveSection(item.id);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-card-border font-mono">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold tracking-wider text-primary">STEVEN.</div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(item => (
              <Button 
                key={item.id} 
                variant="ghost" 
                onClick={() => handleNavItemClick(item)} // Use new handler
                className={`text-sm transition-smooth hover:text-primary ${
                  activeSection === item.id ? 'text-primary bg-primary/10' : 'text-text-secondary'
                } ${item.special ? 'text-accent font-bold bg-accent/10 hover:text-accent' : ''}`} // Special styling
              >
                {item.icon && <item.icon className="w-4 h-4 mr-2" />} {/* Render icon if present */}
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

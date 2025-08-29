import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ParticleBackground from '@/components/animations/ParticleBackground'; // Keep ParticleBackground

const HeroSection = () => {
  const socialLinks = [{
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/StevenDreamer1',
    color: 'hover:text-primary'
  }, {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/palepustephen',
    color: 'hover:text-secondary'
  }, {
    icon: Mail,
    label: 'Email',
    href: 'mailto:stifen0000@gmail.com',
    color: 'hover:text-accent'
  }];

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background font-mono"> {/* Apply monospace font */}
      <ParticleBackground /> {/* Keep ParticleBackground */}
      
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-12 relative z-10">
        {/* Left Column: Profile Avatar */}
        <div className="flex justify-center md:justify-end order-2 md:order-1">
          {/* Adjusted Avatar size for responsiveness */}
          <Avatar className="w-64 h-64 md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] border-4 border-primary/20 shadow-glow">
            <AvatarImage src="/lovable-uploads/f6ee06a3-2d2a-4d8d-872a-1e9343b82418.png" alt="Palepu Stephen" />
            <AvatarFallback className="text-5xl md:text-6xl font-bold bg-card text-card-foreground">
              PS
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Right Column: Text Content */}
        <div className="text-center md:text-left order-1 md:order-2">
          <div className="mb-6">
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-2">Palepu Stephen</h1> {/* Removed font-balgin, relying on font-mono */}
            <div className="text-lg md:text-xl text-text-secondary mb-4 font-medium">
              <span className="text-primary">AI/ML Enthusiast</span> | 
              <span className="text-secondary"> UI/UX Designer</span> | 
              <span className="text-accent"> Web Developer</span>
            </div>
          </div>

          <p className="text-base md:text-lg text-text-secondary max-w-xl mb-8 leading-relaxed">
            Motivated and detail-oriented Computer Science student specializing in AI/ML. 
            Passionate about building <span className="text-primary font-medium">intelligent solutions</span> and 
            designing <span className="text-secondary font-medium">user-friendly digital experiences</span>.
          </p>

          {/* Social Links */}
          <div className="flex justify-center md:justify-start space-x-4 mb-8">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full bg-card shadow-card transition-all duration-300 border border-card-border ${link.color} hover:shadow-hover hover:scale-105`}
                aria-label={link.label}
              >
                <link.icon size={20} />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <Button onClick={scrollToAbout} className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-base font-medium rounded-lg shadow-card hover:shadow-hover transition-all duration-300 group">
            Explore My Work
            <ArrowDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-smooth" />
          </Button>
        </div>
      </div>

      {/* Scroll indicator (adjusted for new layout) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <ArrowDown className="w-6 h-6 text-text-light" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

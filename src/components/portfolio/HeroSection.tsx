import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
const HeroSection = () => {
  const socialLinks = [{
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/StevenDreamer1',
    color: 'hover:text-text-primary'
  }, {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/palepustephen',
    color: 'hover:text-primary'
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
  return <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 gradient-hero opacity-10"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-secondary rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-40 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-primary rounded-full animate-ping"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="mb-8">
          {/* Profile Avatar */}
          <div className="flex justify-center mb-6">
            <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-primary/20 shadow-glow">
              <AvatarImage src="" alt="Palepu Stephen" />
              <AvatarFallback className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                PS
              </AvatarFallback>
            </Avatar>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-4">Palepu Stephen</h1>
          <div className="text-xl md:text-2xl text-text-secondary mb-6 font-medium">
            <span className="text-primary">AI/ML Enthusiast</span> | 
            <span className="text-secondary"> UI/UX Designer</span> | 
            <span className="text-accent"> Web Developer</span>
          </div>
        </div>

        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
          Motivated and detail-oriented Computer Science student specializing in AI/ML. 
          Passionate about building <span className="text-primary font-medium">intelligent solutions</span> and 
          designing <span className="text-secondary font-medium">user-friendly digital experiences</span>.
        </p>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-12">
          {socialLinks.map((link, index) => <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full bg-card shadow-card transition-spring ${link.color} border border-card-border hover:shadow-hover hover:scale-110`} aria-label={link.label}>
              <link.icon size={24} />
            </a>)}
        </div>

        {/* CTA Button */}
        <Button onClick={scrollToAbout} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-medium rounded-xl shadow-card hover:shadow-hover transition-spring group">
          Explore My Work
          <ArrowDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-smooth" />
        </Button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <ArrowDown className="w-6 h-6 text-text-light" />
        </div>
      </div>
    </section>;
};
export default HeroSection;
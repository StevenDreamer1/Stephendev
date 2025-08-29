import React from 'react';
import ParticleBackground from '../components/animations/ParticleBackground'; // Adjusted import path
import { ArrowDown } from 'lucide-react';

const MainEntryPage = () => {
  const scrollToContent = () => {
    const element = document.getElementById('portfolio-content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="main-entry" className="relative min-h-screen flex flex-col items-center justify-center bg-background text-foreground overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10 text-center p-8">
        <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6 animate-fade-in-up">
          Welcome to my Portfolio.
        </h1>
        <p className="text-xl md:text-2xl text-text-secondary mb-12 animate-fade-in-up delay-200">
          Scroll down to explore my work.
        </p>
        <button
          onClick={scrollToContent}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-medium rounded-xl shadow-card hover:shadow-hover transition-spring group animate-bounce-slow"
        >
          Explore
          <ArrowDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-smooth" />
        </button>
      </div>

      {/* Visual scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <ArrowDown className="w-8 h-8 text-text-light" />
      </div>
    </div>
  );
};

export default MainEntryPage;


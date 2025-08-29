import React from 'react';
import ParticleBackground from '@/components/animations/ParticleBackground'; // Removed explicit .tsx extension
import { ArrowDown } from 'lucide-react';

const MainEntryPage = () => {
  const scrollToContent = () => {
    const element = document.getElementById('portfolio-content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="main-entry" className="relative min-h-screen flex flex-col items-center justify-center bg-background text-foreground overflow-hidden font-mono"> {/* Apply monospace font */}
      <ParticleBackground />
      <div className="relative z-10 text-center p-8 bg-black bg-opacity-30 rounded-lg shadow-lg border border-gray-700 animate-fade-in"> {/* Terminal-like container */}
        <h1 className="text-3xl md:text-5xl font-bold text-green-400 mb-4 animate-typewriter overflow-hidden whitespace-nowrap border-r-4 border-r-green-400 pr-2"> {/* Code-like greeting */}
          <span className="text-blue-400">console</span>.<span className="text-yellow-400">log</span>(<span className="text-orange-400">"Welcome to my Portfolio..."</span>);
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 animate-fade-in-up delay-1000"> {/* Code-like instruction */}
          <span className="text-purple-400"># Navigate to explore further</span>
          <br />
          <span className="text-gray-500">{'>'}{'>'}{'>'}</span> <span className="text-white">scroll_down()</span> {/* Escaped '>' characters */}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4"> {/* Container for button and SAMS.ai */}
          <button
            onClick={scrollToContent}
            className="bg-primary hover:bg-primary/80 text-primary-foreground px-8 py-4 text-lg font-medium rounded-xl shadow-card hover:shadow-hover transition-spring group animate-bounce-slow" // Changed hover:bg-primary/90 to hover:bg-primary/80
          >
            Execute Command
            <ArrowDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-smooth" />
          </button>
          <span className="text-accent text-xl font-bold">SAMS.ai</span> {/* SAMS.ai text */}
        </div>
      </div>

      {/* Visual scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <ArrowDown className="w-8 h-8 text-text-light" />
      </div>
    </div>
  );
};

export default MainEntryPage;

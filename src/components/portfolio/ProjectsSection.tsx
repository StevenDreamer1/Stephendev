import { ExternalLink, Github, Brain, Shield, Music } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import React, { useEffect, useRef, useState } from 'react';

const ProjectsSection = () => {
  const projects = [
    {
      title: 'Deepfake Detection using AI',
      description: 'Researched and implemented deepfake technology, explored ethical implications, detection methods, and AI-driven manipulation techniques. Built using advanced machine learning algorithms.',
      icon: Brain,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      gradient: 'from-primary/20 to-primary/5',
      tags: ['Python', 'AI/ML', 'Computer Vision', 'Ethics'],
      githubUrl: 'https://github.com/StevenDreamer1/DEEP-FAKE',
      liveDemoUrl: '#', // Placeholder for Live Demo
      featured: true
    },
    {
      title: 'Banking Application',
      description: 'Built a secure online banking platform with robust login protocols, comprehensive transaction history, and integrated customer support system.',
      icon: Shield,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      gradient: 'from-secondary/20 to-secondary/5',
      tags: ['Java', 'Security', 'MySQL', 'Web Development'],
      githubUrl: 'https://github.com/StevenDreamer1/Banking-Application',
      liveDemoUrl: '#', // Placeholder for Live Demo
      featured: true
    },
    {
      title: 'Spotify UI/UX Clone',
      description: 'Designed a functional Spotify interface in Figma with custom elements and created a personal portfolio prototype. Focus on modern UI patterns and user experience.',
      icon: Music,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      gradient: 'from-accent/20 to-accent/5',
      tags: ['Figma', 'UI/UX', 'Prototyping', 'Design Systems'],
      githubUrl: 'https://github.com/StevenDreamer1', // Keep GitHub URL for design files if applicable
      liveDemoUrl: 'https://www.figma.com/proto/U6WU7K82N9p69wc3YFRbug/Untitled?node-id=1-5', // Updated Live Demo URL
      featured: true
    }
  ];

  // State and ref for intersection observer
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Disconnect after it's visible once
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-background font-mono"> {/* Apply monospace font */}
      <div className="max-w-6xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            <span className="text-primary">Featured</span> <span className="text-secondary">Projects</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            <span className="text-accent"># A showcase of my work in AI/ML development and UI/UX design</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className={`group relative overflow-hidden shadow-card hover:shadow-hover transition-spring border-card-border transform ${
                project.featured ? 'lg:col-span-2' : ''
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 150 + 200}ms` }} // Staggered animation
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-smooth`}></div>
              
              <div className="relative p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className={`p-4 ${project.bgColor} rounded-xl mr-4 group-hover:scale-110 transition-spring`}>
                      <project.icon className={`w-8 h-8 ${project.color}`} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-text-primary group-hover:text-primary transition-smooth">
                        <span className="text-blue-400">project</span>.<span className="text-white">name</span> = <span className="text-orange-400">"{project.title}"</span>;
                      </h3>
                      {project.featured && (
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mt-2">
                          <span className="text-yellow-400">status</span> = <span className="text-white">"Featured"</span>;
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed mb-6 text-lg">
                  <span className="text-purple-400"># Description:</span> {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-muted text-text-secondary text-sm font-medium rounded-lg border border-card-border"
                    >
                      <span className="text-green-400">tag</span>: <span className="text-white">"{tag}"</span>
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-4">
                  <Button
                    asChild
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-card hover:shadow-hover transition-spring group/btn"
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-smooth" />
                      <span className="text-white">view_code()</span>
                    </a>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="border-card-border hover:border-primary hover:text-primary transition-smooth group/btn"
                  >
                    <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer"> {/* Use liveDemoUrl */}
                      <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-smooth" />
                      <span className="text-white">live_demo()</span>
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

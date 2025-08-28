import { Briefcase, Camera, Utensils, Gamepad2, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import React, { useEffect, useRef, useState } from 'react'; // Import React hooks

const ExperienceSection = () => {
  const experience = [
    {
      title: 'Cybersecurity Intern',
      company: 'APSSDC',
      year: '2024',
      description: 'Conducted comprehensive vulnerability testing using Kali Linux. Gained hands-on experience in penetration testing, security assessment, and threat analysis.',
      icon: Briefcase,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    }
  ];

  const hobbies = [
    {
      name: 'Videography',
      icon: Camera,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      name: 'Photography',
      icon: Camera,
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      name: 'Sports',
      icon: Gamepad2,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
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
    <section id="experience" ref={sectionRef} className="py-20 bg-gradient-subtle">
      <div className="max-w-6xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Experience & Interests
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Professional experience and personal passions that shape my perspective
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Professional Experience */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-2xl font-bold text-text-primary mb-8 flex items-center">
              <Award className="w-6 h-6 text-primary mr-3" />
              Professional Experience
            </h3>
            
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <Card 
                  key={index} 
                  className={`p-6 shadow-card hover:shadow-hover transition-spring border-card-border group transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${index * 100 + 300}ms` }} // Staggered animation
                >
                  <div className="flex items-start">
                    <div className={`p-3 ${exp.bgColor} rounded-lg mr-4 group-hover:scale-110 transition-spring`}>
                      <exp.icon className={`w-6 h-6 ${exp.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-xl font-semibold text-text-primary">
                          {exp.title}
                        </h4>
                        <span className="text-primary font-medium bg-primary/10 px-3 py-1 rounded-full text-sm">
                          {exp.year}
                        </span>
                      </div>
                      <p className="text-secondary font-medium mb-3">{exp.company}</p>
                      <p className="text-text-secondary leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Hobbies & Interests */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-2xl font-bold text-text-primary mb-8">
              Hobbies & Interests
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {hobbies.map((hobby, index) => (
                <Card 
                  key={index} 
                  className={`p-6 text-center shadow-card hover:shadow-hover transition-spring border-card-border group cursor-pointer transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${index * 100 + 400}ms` }} // Staggered animation
                >
                  <div className={`inline-flex p-4 ${hobby.bgColor} rounded-xl mb-4 group-hover:scale-110 transition-spring`}>
                    <hobby.icon className={`w-8 h-8 ${hobby.color}`} />
                  </div>
                  <h4 className="text-lg font-semibold text-text-primary">
                    {hobby.name}
                  </h4>
                </Card>
              ))}
            </div>

            <div className={`mt-8 p-6 bg-card rounded-xl border border-card-border shadow-card transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-text-secondary leading-relaxed">
                Beyond coding and design, I find inspiration in capturing moments through 
                <span className="text-secondary font-medium"> photography and videography</span>, 
                staying active through <span className="text-primary font-medium">sports</span>. 
                These diverse interests help me bring a well-rounded perspective to my technical work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

import { Briefcase, Camera, Utensils, Gamepad2, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';

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
    },
    {
      name: 'Cooking',
      icon: Utensils,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(/hero-background.png)` }}
      ></div>
      <div className="absolute inset-0 backdrop-blur-sm bg-background/40"></div>
      <div className="absolute inset-0 bg-gradient-subtle opacity-60"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Experience & Interests
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Professional experience and personal passions that shape my perspective
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Professional Experience */}
          <div>
            <h3 className="text-2xl font-bold text-text-primary mb-8 flex items-center">
              <Award className="w-6 h-6 text-primary mr-3" />
              Professional Experience
            </h3>
            
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <Card key={index} className="p-6 shadow-card hover:shadow-hover transition-spring border-card-border group">
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
          <div>
            <h3 className="text-2xl font-bold text-text-primary mb-8">
              Hobbies & Interests
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {hobbies.map((hobby, index) => (
                <Card 
                  key={index} 
                  className="p-6 text-center shadow-card hover:shadow-hover transition-spring border-card-border group cursor-pointer"
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

            <div className="mt-8 p-6 bg-card rounded-xl border border-card-border shadow-card">
              <p className="text-text-secondary leading-relaxed">
                Beyond coding and design, I find inspiration in capturing moments through 
                <span className="text-secondary font-medium"> photography and videography</span>, 
                staying active through <span className="text-primary font-medium">sports</span>, 
                and exploring creativity in the <span className="text-accent font-medium">kitchen</span>. 
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
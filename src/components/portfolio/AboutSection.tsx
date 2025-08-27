import { Code, Database, Palette, Brain, BookOpen, GraduationCap } from 'lucide-react';
import { Card } from '@/components/ui/card';

const AboutSection = () => {
  const skills = [
    {
      category: 'Programming',
      icon: Code,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      items: ['Python', 'Java', 'C', 'HTML', 'CSS']
    },
    {
      category: 'Data Science',
      icon: Brain,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      items: ['Pandas', 'NumPy', 'Matplotlib']
    },
    {
      category: 'Design',
      icon: Palette,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      items: ['UI/UX (Figma)', 'Photoshop', 'Illustrator']
    },
    {
      category: 'Database',
      icon: Database,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      items: ['MySQL']
    }
  ];

  const tools = [
    'Spyder', 'Google Colab', 'VS Code', 'Figma', 'Kali Linux'
  ];

  return (
    <section id="about" className="py-20 bg-gradient-subtle">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            About Me
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Bridging the gap between artificial intelligence and beautiful user experiences
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Education Card */}
          <Card className="p-8 shadow-card hover:shadow-hover transition-spring border-card-border">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary/10 rounded-lg mr-4">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-text-primary">Education</h3>
                <p className="text-text-secondary">Academic Background</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium text-text-primary">
                  B.Tech in Computer Science & Engineering
                </h4>
                <p className="text-text-secondary">AI & ML Specialization</p>
                <p className="text-text-secondary">Aditya College of Engineering</p>
                <p className="text-primary font-medium">Expected Graduation: 2026</p>
              </div>
            </div>
          </Card>

          {/* Certifications Card */}
          <Card className="p-8 shadow-card hover:shadow-hover transition-spring border-card-border">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-secondary/10 rounded-lg mr-4">
                <BookOpen className="w-8 h-8 text-secondary" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-text-primary">Certifications</h3>
                <p className="text-text-secondary">Professional Credentials</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="text-lg font-medium text-text-primary">
                  Microsoft Azure AI Fundamentals
                </h4>
                <p className="text-text-secondary">2023</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Skills Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-text-primary text-center mb-12">Technical Skills</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <Card key={index} className="p-6 shadow-card hover:shadow-hover transition-spring border-card-border group">
                <div className="flex items-center mb-4">
                  <div className={`p-3 ${skill.bgColor} rounded-lg mr-3 group-hover:scale-110 transition-spring`}>
                    <skill.icon className={`w-6 h-6 ${skill.color}`} />
                  </div>
                  <h4 className="text-lg font-semibold text-text-primary">{skill.category}</h4>
                </div>
                <div className="space-y-2">
                  {skill.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="text-text-secondary font-medium">
                      {item}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-text-primary mb-8">Development Tools</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-card border border-card-border rounded-full text-text-secondary font-medium shadow-card hover:shadow-hover hover:scale-105 transition-spring"
              >
                {tool}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
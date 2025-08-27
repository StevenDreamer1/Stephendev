import { Mail, Linkedin, Github, Send, MapPin, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ContactSection = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'stifen0000@gmail.com',
      href: 'mailto:stifen0000@gmail.com',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'palepustephen',
      href: 'https://linkedin.com/in/palepustephen',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'StevenDreamer1',
      href: 'https://github.com/StevenDreamer1',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  const additionalInfo = [
    {
      icon: MapPin,
      label: 'Location',
      value: 'India',
      color: 'text-text-secondary'
    },
    {
      icon: Calendar,
      label: 'Graduation',
      value: '2026',
      color: 'text-text-secondary'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Let's Connect
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Ready to collaborate on AI/ML projects or discuss innovative design solutions? 
            Let's create something amazing together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Methods */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-text-primary mb-6">Get in Touch</h3>
            
            {contactInfo.map((contact, index) => (
              <Card 
                key={index} 
                className="p-6 shadow-card hover:shadow-hover transition-spring border-card-border group"
              >
                <a 
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center group-hover:scale-[1.02] transition-spring"
                >
                  <div className={`p-3 ${contact.bgColor} rounded-lg mr-4 group-hover:scale-110 transition-spring`}>
                    <contact.icon className={`w-6 h-6 ${contact.color}`} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-text-primary">
                      {contact.label}
                    </h4>
                    <p className="text-text-secondary group-hover:text-primary transition-smooth">
                      {contact.value}
                    </p>
                  </div>
                </a>
              </Card>
            ))}
          </div>

          {/* Quick Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-text-primary mb-6">Quick Info</h3>
            
            <Card className="p-8 shadow-card border-card-border gradient-card">
              <div className="space-y-6">
                {additionalInfo.map((info, index) => (
                  <div key={index} className="flex items-center">
                    <info.icon className={`w-5 h-5 ${info.color} mr-3`} />
                    <div>
                      <span className="text-text-secondary">{info.label}: </span>
                      <span className="text-text-primary font-medium">{info.value}</span>
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 border-t border-card-border">
                  <p className="text-text-secondary leading-relaxed">
                    Currently pursuing my B.Tech in Computer Science with a specialization in 
                    <span className="text-primary font-medium"> AI & Machine Learning</span>. 
                    Open to internships, collaborations, and exciting project opportunities.
                  </p>
                </div>
              </div>
            </Card>

            {/* CTA Button */}
            <Card className="p-6 text-center shadow-card border-card-border bg-gradient-to-br from-primary/5 to-secondary/5">
              <h4 className="text-xl font-semibold text-text-primary mb-4">
                Ready to Start a Project?
              </h4>
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 shadow-card hover:shadow-hover transition-spring group"
              >
                <a href="mailto:stifen0000@gmail.com">
                  <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-smooth" />
                  Send Message
                </a>
              </Button>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-12 border-t border-card-border">
          <p className="text-text-secondary">
            © 2024 P. Stephen. Built with passion for AI/ML and beautiful design.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
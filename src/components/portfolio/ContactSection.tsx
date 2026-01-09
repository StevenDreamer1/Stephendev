import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import React, { useEffect, useRef, useState } from 'react';

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
      icon: Phone,
      label: 'Phone',
      value: '+91 9010880649',
      href: 'tel:+919010880649',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Andhra Pradesh, India',
      href: 'https://maps.google.com/?q=Andhra+Pradesh,India',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
  ];

  const formRef = useRef(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFormVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted!");
    // In a real application, you would send this data to a backend service.
    // For now, we'll just log it.
    alert("Message sent! (This is a demo, no actual email was sent.)");
  };

  return (
    <section id="contact" className="py-20 bg-background font-mono"> {/* Apply monospace font */}
      <div className="max-w-6xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            <span className="text-primary">Contact</span> <span className="text-secondary">Me</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            <span className="text-accent"># Let's connect and build something amazing together.</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className={`space-y-6 transition-all duration-1000 delay-200 ${isFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {contactInfo.map((item, index) => (
              <Card 
                key={index} 
                className="p-6 shadow-card hover:shadow-hover transition-spring border-card-border flex items-center group"
              >
                <div className={`p-3 ${item.bgColor} rounded-lg mr-4 group-hover:scale-110 transition-spring`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-text-primary">{item.label}</h4>
                  <a 
                    href={item.href} 
                    className="text-text-secondary hover:text-primary transition-smooth"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="text-yellow-400">value</span> = <span className="text-orange-400">"{item.value}"</span>;
                  </a>
                </div>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <Card 
            ref={formRef}
            className={`p-8 shadow-card hover:shadow-hover transition-spring border-card-border transform ${isFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <h3 className="text-2xl font-bold text-text-primary mb-6">
              <span className="text-blue-400">function</span> <span className="text-white">sendMessage</span>() {'{'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-text-secondary">
                  <span className="text-green-400">const</span> <span className="text-white">name</span> = <span className="text-orange-400">"Your Name"</span>;
                </Label>
                <Input id="name" type="text" placeholder="Enter your name" className="bg-input text-foreground border-border mt-2" />
              </div>
              <div>
                <Label htmlFor="email" className="text-text-secondary">
                  <span className="text-green-400">const</span> <span className="text-white">email</span> = <span className="text-orange-400">"your.email@example.com"</span>;
                </Label>
                <Input id="email" type="email" placeholder="Enter your email" className="bg-input text-foreground border-border mt-2" />
              </div>
              <div>
                <Label htmlFor="message" className="text-text-secondary">
                  <span className="text-green-400">const</span> <span className="text-white">message</span> = <span className="text-orange-400">"Your Message Here"</span>;
                </Label>
                <Textarea id="message" placeholder="Type your message here." rows={5} className="bg-input text-foreground border-border mt-2" />
              </div>
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-base font-medium rounded-lg shadow-card hover:shadow-hover transition-spring group">
                <Send className="w-4 h-4 mr-2 group-hover:scale-110 transition-smooth" />
                <span className="text-white">send_message()</span>
              </Button>
            </form>
            <h3 className="text-2xl font-bold text-text-primary mt-6">{'}'}</h3>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

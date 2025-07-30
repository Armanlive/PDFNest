import React from 'react';
import { Users, Award, Globe, Heart } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, value: '2M+', label: 'Happy Users' },
    { icon: Award, value: '50M+', label: 'Files Processed' },
    { icon: Globe, value: '180+', label: 'Countries Served' },
    { icon: Heart, value: '99.9%', label: 'Uptime' }
  ];

  return (
    <section id="about" className="py-20 bg-theme-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-theme-primary mb-6">
              About PDFNest
            </h2>
            <p className="text-lg text-theme-secondary mb-6 leading-relaxed">
              PDFNest was created with a simple mission: to make PDF management accessible, 
              fast, and secure for everyone. We believe that working with documents shouldn't 
              be complicated or expensive.
            </p>
            <p className="text-lg text-theme-secondary mb-8 leading-relaxed">
              Our platform combines cutting-edge technology with user-friendly design to 
              deliver the best PDF tools available online. Whether you're a student, 
              professional, or business owner, PDFNest has the tools you need.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-theme-primary mb-2">Our Promise</h3>
                <p className="text-theme-secondary">Free, fast, and secure PDF processing with no hidden fees or limitations.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-theme-primary mb-2">Our Vision</h3>
                <p className="text-theme-secondary">To be the world's most trusted platform for PDF document management.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-theme-secondary to-theme-tertiary rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="bg-theme-card rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-theme">
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-theme-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-theme-secondary">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
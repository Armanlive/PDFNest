import React from 'react';
import { ArrowRight, FileText, Shield, Zap } from 'lucide-react';

const Hero = () => {
  const scrollToTools = () => {
    const element = document.getElementById('tools');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="bg-gradient-to-br from-theme-secondary to-theme-primary py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-theme-primary mb-6">
            Your PDF Management
            <span className="text-blue-600 block">Made Simple</span>
          </h1>
          <p className="text-xl text-theme-secondary max-w-3xl mx-auto mb-10 leading-relaxed">
            Transform, protect, and optimize your PDF documents with our comprehensive suite of online tools. 
            Fast, secure, and completely free to use.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button 
              onClick={scrollToTools}
              className="bg-theme-primary-btn hover:bg-theme-primary-btn text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-theme-lg"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="border border-blue-600 text-blue-600 hover:bg-theme-hover px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200">
              Learn More
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-theme-primary mb-2">Lightning Fast</h3>
              <p className="text-theme-secondary text-center">Process your PDFs in seconds with our optimized tools</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-theme-primary mb-2">100% Secure</h3>
              <p className="text-theme-secondary text-center">Your files are processed securely and deleted after use</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-theme-primary mb-2">No Limits</h3>
              <p className="text-theme-secondary text-center">Use all our tools without restrictions or watermarks</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
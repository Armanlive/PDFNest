import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-theme-card shadow-theme sticky top-0 z-50 border-b border-theme-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src="/PdfNest.png" alt="PDFNest" className="h-10 w-auto mr-2" />
            <span className="text-2xl font-bold text-theme-primary">PDFNest</span>
          </div>
          
          <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
                className="text-theme-secondary hover:text-theme-primary transition-colors duration-200"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('tools')}
                className="text-theme-secondary hover:text-theme-primary transition-colors duration-200"
            >
              Tools
            </button>
            <button 
              onClick={() => scrollToSection('about')}
                className="text-theme-secondary hover:text-theme-primary transition-colors duration-200"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
                className="text-theme-secondary hover:text-theme-primary transition-colors duration-200"
            >
              Contact
            </button>
          </nav>

            <ThemeToggle />

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-theme-secondary hover:text-theme-primary transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-theme-card border-t border-theme-border">
              <button 
                onClick={() => scrollToSection('home')}
                className="block w-full text-left px-3 py-2 text-theme-secondary hover:text-theme-primary hover:bg-theme-hover transition-colors duration-200"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('tools')}
                className="block w-full text-left px-3 py-2 text-theme-secondary hover:text-theme-primary hover:bg-theme-hover transition-colors duration-200"
              >
                Tools
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block w-full text-left px-3 py-2 text-theme-secondary hover:text-theme-primary hover:bg-theme-hover transition-colors duration-200"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-3 py-2 text-theme-secondary hover:text-theme-primary hover:bg-theme-hover transition-colors duration-200"
              >
                Contact
              </button>
              <div className="px-3 py-2">
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
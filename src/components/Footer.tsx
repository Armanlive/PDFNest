import React from 'react';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-theme-tertiary text-theme-primary py-12 border-t border-theme-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <img src="/PdfNest.png" alt="PDFNest" className="h-10 w-auto mr-2" />
              <span className="text-2xl font-bold">PDFNest</span>
            </div>
            <p className="text-theme-secondary mb-4">
              Your trusted platform for PDF management. Fast, secure, and free tools for all your document needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-theme-secondary hover:text-blue-400 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-theme-secondary hover:text-blue-400 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-theme-secondary hover:text-blue-400 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-theme-secondary hover:text-blue-400 transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Tools</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-theme-secondary hover:text-theme-primary transition-colors duration-200">PDF Merge</a></li>
              <li><a href="#" className="text-theme-secondary hover:text-theme-primary transition-colors duration-200">PDF Split</a></li>
              <li><a href="#" className="text-theme-secondary hover:text-theme-primary transition-colors duration-200">PDF Compress</a></li>
              <li><a href="#" className="text-theme-secondary hover:text-theme-primary transition-colors duration-200">PDF Convert</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-theme-secondary hover:text-theme-primary transition-colors duration-200">Help Center</a></li>
              <li><a href="#" className="text-theme-secondary hover:text-theme-primary transition-colors duration-200">Contact Us</a></li>
              <li><a href="#" className="text-theme-secondary hover:text-theme-primary transition-colors duration-200">FAQ</a></li>
              <li><a href="#" className="text-theme-secondary hover:text-theme-primary transition-colors duration-200">API</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-theme-secondary hover:text-theme-primary transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="text-theme-secondary hover:text-theme-primary transition-colors duration-200">Terms of Service</a></li>
              <li><a href="#" className="text-theme-secondary hover:text-theme-primary transition-colors duration-200">Cookie Policy</a></li>
              <li><a href="#" className="text-theme-secondary hover:text-theme-primary transition-colors duration-200">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-theme-border pt-8 text-center">
          <p className="text-theme-secondary">
            © {currentYear} PDFNest. All rights reserved. Made with ❤️ for document management.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
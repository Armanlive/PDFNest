import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Tools from './components/Tools';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="min-h-screen bg-theme-primary transition-colors duration-300">
      <Header />
      <Hero />
      <Tools />
      <About />
      <Contact />
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;
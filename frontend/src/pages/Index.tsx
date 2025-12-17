import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServiceCards from '@/components/ServiceCards';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import QuickTest from '@/components/QuickTest';
import About from '@/components/About';
import ScheduleForm from '@/components/ScheduleForm';
import ThankYou from '@/components/ThankYou';
import Footer from '@/components/Footer';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [showThankYou, setShowThankYou] = useState(false);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    setShowThankYou(false);
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScheduleSuccess = () => {
    setShowThankYou(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromThankYou = () => {
    setShowThankYou(false);
    setActiveSection('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auto-scroll behavior for sections - only for home page
  useEffect(() => {
    const handleScroll = () => {
      if (showThankYou || activeSection !== 'home') return;
      
      const scrollPosition = window.scrollY + 100;
      
      // Only reset to home if we're already on home and scroll to top
      if (scrollPosition < window.innerHeight * 0.5 && activeSection === 'home') {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showThankYou, activeSection]);

  if (showThankYou) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
        <ThankYou onBack={handleBackFromThankYou} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
      
      {activeSection === 'home' && (
        <>
          <Hero onNavigate={handleNavigate} />
          <ServiceCards />
          <HowItWorks />
          <Testimonials />
          <QuickTest onNavigate={handleNavigate} />
        </>
      )}
      
      {activeSection === 'about' && (
        <About onNavigate={handleNavigate} />
      )}
      
      {activeSection === 'schedule' && (
        <ScheduleForm onSuccess={handleScheduleSuccess} />
      )}
      
      <Footer />
    </div>
  );
};

export default Index;

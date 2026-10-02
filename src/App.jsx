import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Addons from './components/Addons';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedAddon, setSelectedAddon] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Check URL hash for #admin or listen for keyboard shortcut (Alt + A)
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);

    const handleKeyDown = (e) => {
      // Shortcut: Alt + A or Ctrl + Shift + A
      if ((e.altKey && e.key.toLowerCase() === 'a') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelectService = (service) => {
    setSelectedService(service);
    setSelectedAddon(null);
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectAddon = (addon) => {
    setSelectedAddon(addon);
    setSelectedService(null);
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.hash === '#admin') {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  return (
    <div className="site-wrapper">
      <Navbar />
      <main>
        <Hero />
        <Services onSelectService={handleSelectService} />
        <Addons onSelectAddon={handleSelectAddon} />
        <About />
        <WhyChooseUs />
        <Testimonials />
        <Faq />
        <Contact
          preselectedService={selectedService}
          preselectedAddon={selectedAddon}
        />
      </main>
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Hidden Admin Dashboard Modal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={handleCloseAdmin}
      />
    </div>
  );
}

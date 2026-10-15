/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { MidPageCTA } from './components/MidPageCTA';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  // Theme state respecting system preference & localStorage
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('portfolio_theme');
      if (stored === 'light' || stored === 'dark') return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  const [activeSection, setActiveSection] = useState<string>('home');

  // Pre-fill state for contact form when user triggers service or pricing cards
  const [selectedService, setSelectedService] = useState<string>('Business Website Design');
  const [selectedBudget, setSelectedBudget] = useState<string>('$500 - $1,000');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('portfolio_theme', theme);
  }, [theme]);

  // Track active section for navbar indicator
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'projects', 'process', 'testimonials', 'pricing', 'contact'];
      const scrollY = window.pageYOffset;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - 120;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const scrollToContact = (service?: string, budget?: string) => {
    if (service) setSelectedService(service);
    if (budget) setSelectedBudget(budget);

    const contactEl = document.getElementById('contact');
    if (contactEl) {
      const topOffset = 80;
      const elementPosition = contactEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToProjects = () => {
    const projectsEl = document.getElementById('projects');
    if (projectsEl) {
      const topOffset = 80;
      const elementPosition = projectsEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#0b0f17] text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
      
      {/* 1. Sticky Responsive Navbar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onHireMeClick={() => scrollToContact()}
        activeSection={activeSection}
      />

      <main id="main-content">
        {/* 2. Hero Section (Single H1 on homepage) */}
        <Hero
          onViewWorkClick={scrollToProjects}
          onHireMeClick={() => scrollToContact()}
        />

        {/* 3. About Me Section */}
        <About />

        {/* 4. Services Section */}
        <Services
          onRequestService={(serviceName) => scrollToContact(serviceName)}
        />

        {/* 5. Featured Projects Gallery & Detail Modal (8 Projects) */}
        <Projects />

        {/* 6. Mid-Page High-Conversion CTA Strip */}
        <MidPageCTA
          onStartProject={() => scrollToContact()}
        />

        {/* 7. My Process Section */}
        <Process />

        {/* 8. Testimonials Section */}
        <Testimonials />

        {/* 9. Pricing Section */}
        <Pricing
          onSelectPlan={(planName, serviceCategory) => {
            const budgetMap: Record<string, string> = {
              'Basic Landing Page': 'Under $500',
              'Business Website': '$500 - $1,000',
              'Custom Web App / Booking': '$1,000 - $2,500'
            };
            scrollToContact(serviceCategory, budgetMap[planName] || '$500 - $1,000');
          }}
        />

        {/* 10. FAQ Accordion Section */}
        <FAQ />

        {/* 11. Contact Form & Direct Channels */}
        <Contact
          initialService={selectedService}
          initialBudget={selectedBudget}
        />
      </main>

      {/* 12. Footer */}
      <Footer />

    </div>
  );
}

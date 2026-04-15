'use client';

import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import DesktopNavigation from './DesktopNavigation';
import MobileMenuButton from './MobileMenuButton';
import MobileNavigation from './MobileNavigation';

interface NavItem {
  readonly name: string;
  readonly href: string;
}

const navItems: NavItem[] = [
  { name: 'About',          href: '#about' },
  { name: 'Skills',         href: '#skills' },
  { name: 'Experience',     href: '#experience' },
  { name: 'Projects',       href: '#projects' },
  { name: 'Publications',   href: '#publications' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Awards',         href: '#awards' },
  { name: 'Contact',        href: '#contact' },
];

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section detection
      const sectionIds = navItems.map(n => n.href.replace('#', ''));
      let current = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) current = id;
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-card backdrop-blur-xl border-x-0 border-t-0 border-b border-primary/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo scrollToSection={scrollToSection} />
          <DesktopNavigation
            navItems={navItems}
            scrollToSection={scrollToSection}
            activeSection={activeSection}
          />
          <MobileMenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <MobileNavigation
          navItems={navItems}
          isOpen={isOpen}
          scrollToSection={scrollToSection}
        />
      </div>
    </nav>
  );
};

export default Navigation;

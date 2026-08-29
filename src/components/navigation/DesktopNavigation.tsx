'use client';

import React from 'react';

interface NavItem {
  readonly name: string;
  readonly href: string;
}

interface DesktopNavigationProps {
  readonly navItems: NavItem[];
  readonly scrollToSection: (href: string) => void;
  readonly activeSection?: string;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ navItems, scrollToSection, activeSection }) => {
  return (
    <div className="hidden lg:block">
      <div className="ml-4 xl:ml-8 flex items-baseline space-x-0.5 xl:space-x-1">
        {navItems.map((item) => {
          const sectionId = item.href.replace('#', '');
          const isActive = activeSection === sectionId;
          return (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className={`relative px-2.5 xl:px-3 py-1.5 rounded-md text-xs xl:text-sm font-medium transition-all duration-200 whitespace-nowrap group ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.name}
              {/* Animated underline */}
              <span
                className={`absolute bottom-0 left-2 right-2 h-[2px] rounded-full transition-all duration-300 ${
                  isActive
                    ? 'opacity-100 scale-x-100'
                    : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                }`}
                style={{ background: 'var(--primary-gradient)' }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DesktopNavigation;

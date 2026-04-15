import React from 'react';
import personalInfo from '@/data/personal-info.json';

interface LogoProps {
  readonly scrollToSection: (href: string) => void;
}

const Logo: React.FC<LogoProps> = ({ scrollToSection }) => {
  const initials = personalInfo.personal.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div className="flex-shrink-0">
      <button
        onClick={() => scrollToSection('#hero')}
        className="flex items-center gap-2 group"
        aria-label="Home"
      >
        {/* Monogram badge */}
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-background"
          style={{ background: 'var(--primary-gradient)' }}
        >
          {initials}
        </div>
        {/* Name */}
        <span className="text-base font-semibold gradient-text hidden sm:block">
          {personalInfo.personal.nickname}
        </span>
        {/* Pulsing dot */}
        <span className="neural-dot hidden sm:block" />
      </button>
    </div>
  );
};

export default Logo;

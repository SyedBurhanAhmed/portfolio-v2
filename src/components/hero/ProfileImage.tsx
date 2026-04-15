import React from 'react';
import Image from 'next/image';
import personalInfo from '@/data/personal-info.json';

interface ProfileImageProps {
  size: 'small' | 'large';
  className?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ size, className = '' }) => {
  const sizeClasses = {
    small: 'w-36 h-36 md:w-48 md:h-48',
    large: 'w-72 h-72 lg:w-80 lg:h-80',
  };

  const ringOffset = {
    small: '-inset-[6px]',
    large: '-inset-[8px]',
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Spinning conic-gradient ring */}
      <div
        className={`absolute ${ringOffset[size]} rounded-full`}
        style={{
          background: 'conic-gradient(hsl(258,90%,66%) 0deg, hsl(186,90%,55%) 120deg, hsl(161,84%,46%) 200deg, hsl(300,80%,65%) 280deg, hsl(258,90%,66%) 360deg)',
          animation: 'ring-spin 6s linear infinite',
          zIndex: 0,
        }}
      />

      {/* Glow orb behind image */}
      <div
        className="absolute rounded-full"
        style={{
          inset: '-40px',
          background: 'radial-gradient(circle, hsla(258,90%,66%,0.18) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Image container */}
      <div
        className={`${sizeClasses[size]} rounded-full overflow-hidden bg-card relative`}
        style={{ zIndex: 1, padding: '3px', background: 'hsl(var(--background))' }}
      >
        <div className="w-full h-full rounded-full overflow-hidden bg-card">
          <Image
            src={personalInfo.personal.profileImage}
            alt={`${personalInfo.personal.name} – AI Engineer, Computer Vision & GenAI`}
            width={320}
            height={320}
            className="w-full h-full object-cover rounded-full scale-125"
            priority
          />
        </div>
      </div>

      {/* Outer soft ring */}
      <div
        className="absolute rounded-full border border-primary/20"
        style={{
          inset: size === 'large' ? '-20px' : '-14px',
          animation: 'ring-spin 14s linear infinite reverse',
          zIndex: 0,
        }}
      />
    </div>
  );
};

export default ProfileImage;

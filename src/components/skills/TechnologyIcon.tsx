'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const FALLBACK_ICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-original.svg';

interface TechnologyIconProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

const TechnologyIcon: React.FC<TechnologyIconProps> = ({ 
  src, 
  alt, 
  size = 16, 
  className = '' 
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src || FALLBACK_ICON);

  useEffect(() => {
    setImgSrc(src || FALLBACK_ICON);
  }, [src]);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={size}
      height={size}
      unoptimized
      className={`flex-shrink-0 ${className}`}
      style={{
        width: 'auto',
        height: 'auto',
        maxWidth: `${size}px`,
        maxHeight: `${size}px`,
      }}
      onError={() => {
        if (imgSrc !== FALLBACK_ICON) {
          setImgSrc(FALLBACK_ICON);
        }
      }}
    />
  );
};

export default TechnologyIcon;

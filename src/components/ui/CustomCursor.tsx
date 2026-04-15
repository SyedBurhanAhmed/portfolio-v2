'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Add listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [role="button"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    // Hide default cursor globally
    document.body.style.cursor = 'none';
    interactiveElements.forEach((el) => {
      (el as HTMLElement).style.cursor = 'none';
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
        (el as HTMLElement).style.cursor = '';
      });
      document.body.style.cursor = '';
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Tiny solid dot - exact pointer */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-screen"
        style={{ translateX: '-50%', translateY: '-50%' }}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />
      
      {/* Hollow tech-ring that trails the cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary pointer-events-none z-[9998]"
        style={{ translateX: '-50%', translateY: '-50%', boxShadow: '0 0 10px hsla(258, 90%, 66%, 0.4)' }}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? 'hsl(var(--accent))' : 'hsl(258, 90%, 66%)',
          backgroundColor: isHovering ? 'hsla(161, 84%, 46%, 0.1)' : 'rgba(0,0,0,0)',
          boxShadow: isHovering ? '0 0 15px hsla(161, 84%, 46%, 0.4)' : '0 0 10px hsla(258, 90%, 66%, 0.2)'
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 0.5 }}
      />

      {/* Crosshairs - extra tech feel */}
      {!isHovering && (
        <motion.div
          className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9997]"
          style={{ translateX: '-50%', translateY: '-50%' }}
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
            rotate: mousePosition.x % 360 // slight rotation based on movement
          }}
          transition={{ type: 'spring', stiffness: 150, damping: 20 }}
        >
          <div className="absolute top-1/2 left-0 w-2 h-[1px] bg-primary/40 -translate-y-1/2" />
          <div className="absolute top-1/2 right-0 w-2 h-[1px] bg-primary/40 -translate-y-1/2" />
          <div className="absolute top-0 left-1/2 w-[1px] h-2 bg-primary/40 -translate-x-1/2" />
          <div className="absolute bottom-0 left-1/2 w-[1px] h-2 bg-primary/40 -translate-x-1/2" />
        </motion.div>
      )}
    </>
  );
};

export default CustomCursor;

'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    // 1. Disable on touch devices (no mouse pointer)
    const isTouch =
      'ontouchstart' in window ||
      (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0) ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(hover: none)').matches;

    // 2. Disable on prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) {
      setIsDisabled(true);
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

    // Add hover listeners to interactive elements
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

  if (isDisabled || !isVisible) return null;

  return (
    <>
      {/* Precision Center Dot (4px) — Viridis Teal */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-primary rounded-full pointer-events-none z-[9999]"
        style={{ translateX: '-50%', translateY: '-50%' }}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.05 }}
      />

      {/* Reticle Ring (18px diameter) — Pure Viridis Teal, no purple */}
      <motion.div
        className="fixed top-0 left-0 w-[18px] h-[18px] rounded-full border border-primary/70 pointer-events-none z-[9998]"
        style={{
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: '0 0 6px hsla(174, 61%, 50%, 0.25)',
        }}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isHovering ? 1.25 : 1,
          borderColor: isHovering ? 'hsl(var(--primary))' : 'hsla(174, 61%, 50%, 0.7)',
          backgroundColor: isHovering ? 'hsla(174, 61%, 50%, 0.12)' : 'rgba(0,0,0,0)',
          boxShadow: isHovering
            ? '0 0 8px hsla(174, 61%, 50%, 0.4)'
            : '0 0 4px hsla(174, 61%, 50%, 0.15)',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 28, mass: 0.2 }}
      />

      {/* Crosshair Tick Marks (22px span) — scaled down proportionally */}
      {!isHovering && (
        <motion.div
          className="fixed top-0 left-0 w-[22px] h-[22px] pointer-events-none z-[9997]"
          style={{ translateX: '-50%', translateY: '-50%' }}
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 26, mass: 0.2 }}
        >
          {/* Top tick */}
          <div className="absolute top-0 left-1/2 w-[1px] h-[3px] bg-primary/60 -translate-x-1/2" />
          {/* Bottom tick */}
          <div className="absolute bottom-0 left-1/2 w-[1px] h-[3px] bg-primary/60 -translate-x-1/2" />
          {/* Left tick */}
          <div className="absolute top-1/2 left-0 w-[3px] h-[1px] bg-primary/60 -translate-y-1/2" />
          {/* Right tick */}
          <div className="absolute top-1/2 right-0 w-[3px] h-[1px] bg-primary/60 -translate-y-1/2" />
        </motion.div>
      )}
    </>
  );
};

export default CustomCursor;


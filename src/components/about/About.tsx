'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Education from './Education';
import MyJourney from './MyJourney';
import HowIWork from './HowIWork';
import Stats from './Stats';

const About: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="about"
      className="py-20 relative"
      style={{
        background: 'linear-gradient(to bottom, hsl(230,28%,5%), hsl(248,25%,7%), hsl(230,28%,5%))',
      }}
    >
      {/* Subtle background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsla(258,90%,66%,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-12" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              AI Engineer &amp; Researcher at UMT Makerspace Lab — building production-grade CV and GenAI systems that bridge research and deployment.
            </p>
          </motion.div>
        </div>

        {/* Education pill */}
        <Education />

        {/* Journey + How I Work */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <MyJourney />
          <HowIWork />
        </div>

        {/* Stats */}
        <Stats />
      </div>
    </section>
  );
};

export default About;

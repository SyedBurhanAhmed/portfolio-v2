'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import personalInfo from '@/data/personal-info.json';
import { BookOpen } from 'lucide-react';

const MyJourney: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="space-y-5" ref={ref}>
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: 'var(--primary-gradient)' }}
        >
          <BookOpen size={16} className="text-background" />
        </div>
        <h3 className="text-2xl font-semibold text-foreground">My Journey</h3>
      </div>
      <div className="space-y-4">
        {personalInfo.personal.story.map((paragraph, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="text-sm md:text-base text-muted-foreground leading-relaxed border-l-2 border-primary/20 pl-4"
          >
            {paragraph}
          </motion.p>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: personalInfo.personal.story.length * 0.12 }}
        className="text-sm text-muted-foreground italic border-l-2 border-primary/30 pl-4"
      >
        {personalInfo.personal.closingBio}
      </motion.p>
    </div>
  );
};

export default MyJourney;

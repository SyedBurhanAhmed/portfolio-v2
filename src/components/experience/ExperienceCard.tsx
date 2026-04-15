'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ExperienceHeader from './ExperienceHeader';
import ExperienceContent from './ExperienceContent';

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  location: string;
  logo: string;
  duration: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

interface ExperienceCardProps {
  experience: ExperienceItem;
  index: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative flex items-start group"
    >
      {/* Timeline dot */}
      <div className="timeline-dot absolute left-2 md:left-5 top-5 z-10 group-hover:scale-125 transition-transform duration-300" />

      {/* Connector line to card */}
      <div className="absolute left-4 md:left-7 top-[22px] w-4 md:w-10 h-[2px] bg-gradient-to-r from-primary/50 to-transparent" />

      {/* Card */}
      <div className="ml-8 md:ml-20 w-full">
        <div className="glass-card p-4 md:p-6 rounded-xl md:rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
          <ExperienceHeader experience={experience} index={index} />
          <ExperienceContent experience={experience} index={index} />
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;

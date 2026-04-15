'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import personalInfo from '@/data/personal-info.json';

const StatCard: React.FC<{ number: string; label: string; delay: number }> = ({ number, label, delay }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.4 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="text-center glass-card p-6 rounded-xl relative overflow-hidden group"
    >
      {/* Glow accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="text-3xl lg:text-5xl font-bold gradient-text mb-2 font-mono">{number}</div>
      <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">{label}</div>
    </motion.div>
  );
};

const Stats: React.FC = () => {
  const stats = [
    { number: personalInfo.stats.projects,              label: 'Projects Built' },
    { number: personalInfo.stats.yearsExperience,       label: 'Years Experience' },
    { number: personalInfo.stats.technologiesMastered,  label: 'Technologies Mastered' },
  ];

  return (
    <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
      {stats.map((stat, i) => (
        <StatCard key={stat.label} number={stat.number} label={stat.label} delay={i * 0.1} />
      ))}
    </div>
  );
};

export default Stats;

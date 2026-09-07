'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Brain, Network, Settings, User, type LucideIcon } from 'lucide-react';
import TechnologyIcon from './TechnologyIcon';
import personalInfo from '@/data/personal-info.json';

interface Skill {
  readonly name: string;
  readonly experience: string;
  readonly context: string;
  readonly category: string;
  readonly icon: string;
}

interface Category {
  readonly id: string;
  readonly title: string;
  readonly icon: LucideIcon;
  readonly skills: readonly Skill[];
  readonly accentColor: string;
}

const FALLBACK_ICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-original.svg';

const SkillPill: React.FC<{ skill: Skill; accentColor: string; index: number; inView: boolean }> = ({
  skill, accentColor, index, inView,
}) => {
  const isAI = accentColor === 'hsl(var(--accent))';
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className={`group flex items-center gap-2 px-3 py-2 rounded-full cursor-default ${isAI ? 'skill-pill skill-pill-accent' : 'skill-pill'}`}
      style={{ borderColor: `${accentColor}33`, background: `${accentColor}0D` } as React.CSSProperties}
      title={`${skill.context} • ${skill.experience}`}
    >
      <TechnologyIcon
        src={skill.icon || FALLBACK_ICON}
        alt={skill.name}
        size={14}
      />
      <span className="text-xs font-medium text-foreground whitespace-nowrap">{skill.name}</span>
      <span
        className="text-[10px] px-1.5 py-0.5 rounded-full font-mono hidden sm:block"
        style={{ background: `${accentColor}1A`, color: accentColor }}
      >
        {skill.experience.replace('+ years', 'y+').replace('+ year', 'y+').replace('-based', '')}
      </span>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [active, setActive] = useState(0);

  const categories: Category[] = [
    {
      id: 'languages',
      title: 'Languages',
      icon: Code2,
      skills: personalInfo.skills.languages,
      accentColor: 'hsl(var(--primary))',
    },
    {
      id: 'ai_ml',
      title: 'AI / ML',
      icon: Brain,
      skills: personalInfo.skills.ai_ml,
      accentColor: 'hsl(var(--primary))',
    },
    {
      id: 'web_backend',
      title: 'Web & Backend',
      icon: Network,
      skills: personalInfo.skills.web_backend,
      accentColor: 'hsl(var(--primary))',
    },
    {
      id: 'tools',
      title: 'Tools & Platforms',
      icon: Settings,
      skills: personalInfo.skills.tools_platforms,
      accentColor: 'hsl(var(--primary))',
    },
    {
      id: 'professional',
      title: 'Professional',
      icon: User,
      skills: personalInfo.skills.professional,
      accentColor: 'hsl(var(--primary))',
    },
  ];

  const current = categories[active];

  return (
    <section
      id="skills"
      className="py-20 relative bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" ref={ref}>
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Technical <span className="gradient-text">Expertise</span>
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Battle-tested in production ML systems, real-time vision pipelines, and GenAI applications.
            </p>
          </motion.div>
        </div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categories.map((cat, i) => {
            const CatIcon = cat.icon;
            const isActive = active === i;
            return (
              <button
                key={cat.id}
                onClick={() => setActive(i)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-250"
                style={{
                  background: isActive ? 'hsla(174, 61%, 50%, 0.15)' : 'hsla(174, 61%, 50%, 0.04)',
                  border: `1px solid ${isActive ? 'hsl(var(--primary))' : 'hsla(174, 61%, 50%, 0.15)'}`,
                  color: isActive ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                  boxShadow: isActive ? '0 0 16px hsla(174, 61%, 50%, 0.25)' : 'none',
                }}
              >
                <CatIcon size={14} />
                {cat.title}
              </button>
            );
          })}
        </motion.div>

        {/* Skills pill grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-5">
              {React.createElement(current.icon, {
                size: 18,
                style: { color: current.accentColor },
              })}
              <h3 className="font-semibold text-foreground">{current.title}</h3>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-mono"
                style={{ background: 'hsla(174, 61%, 50%, 0.1)', color: 'hsl(var(--primary))' }}
              >
                {current.skills.length} skills
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {current.skills.map((skill, i) => (
                <SkillPill
                  key={skill.name}
                  skill={skill}
                  accentColor="hsl(var(--primary))"
                  index={i}
                  inView={inView}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom summary bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 flex flex-wrap justify-center gap-6 text-center"
        >
          {[
            { label: 'AI / ML Tools', count: personalInfo.skills.ai_ml.length },
            { label: 'Languages', count: personalInfo.skills.languages.length },
            { label: 'Frameworks', count: personalInfo.skills.web_backend.length },
          ].map(({ label, count }) => (
            <div key={label} className="text-sm text-muted-foreground">
              <span className="font-bold font-mono text-primary">{count}+</span> {label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

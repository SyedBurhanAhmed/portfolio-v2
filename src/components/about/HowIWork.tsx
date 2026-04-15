'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Lightbulb, Users, Zap } from 'lucide-react';

interface Principle {
  readonly icon: React.ReactElement;
  readonly title: string;
  readonly description: string;
  readonly color: string;
}

const HowIWork: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const principles: Principle[] = [
    {
      icon: <Code2 size={20} />,
      title: 'Clean Code & Practical AI',
      description: 'Writing scalable, production-ready AI systems with an emphasis on maintainability and real-world impact.',
      color: 'var(--primary)',
    },
    {
      icon: <Lightbulb size={20} />,
      title: 'Continuous Learning',
      description: 'Staying ahead of research trends, exploring new architectures, and pushing boundaries in CV and GenAI.',
      color: 'hsl(300,80%,65%)',
    },
    {
      icon: <Users size={20} />,
      title: 'Collaboration & Mentorship',
      description: 'Working with teams, mentoring engineers, and building clear documentation to multiply collective expertise.',
      color: 'hsl(var(--accent))',
    },
    {
      icon: <Zap size={20} />,
      title: 'Performance & Automation',
      description: 'Optimizing inference pipelines, automating workflows, and delivering high-performance AI systems in production.',
      color: 'hsl(38,92%,55%)',
    },
  ];

  return (
    <div className="space-y-5" ref={ref}>
      <h3 className="text-2xl font-semibold text-foreground">How I Work</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {principles.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className="glass-card p-5 rounded-xl group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${p.color}22`, border: `1px solid ${p.color}44`, color: p.color }}
              >
                {p.icon}
              </div>
              <h4 className="font-semibold text-sm text-foreground">{p.title}</h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{p.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowIWork;

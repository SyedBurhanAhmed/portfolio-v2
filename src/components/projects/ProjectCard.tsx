'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ProjectImage from './ProjectImage';
import ProjectContent from './ProjectContent';

interface Project {
  readonly id: number;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly longDescription?: string;
  readonly technologies: readonly string[];
  readonly github: string;
  readonly featured: boolean;
  readonly categories: readonly string[];
  readonly image: string;
  readonly status: string;
  readonly priority?: number;
}

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <motion.div
      ref={ref}
      data-project-categories={project.categories.join(',')}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className={`glass-card rounded-2xl overflow-hidden group flex flex-col ${
        project.featured ? 'border-primary/20' : 'border-border/50'
      }`}
    >
      <ProjectImage project={project} />
      <ProjectContent project={project} />
    </motion.div>
  );
};

export default ProjectCard;

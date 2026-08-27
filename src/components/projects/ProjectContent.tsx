'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ArrowUpRight, Star } from 'lucide-react';

interface Project {
  readonly id: number;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly technologies: readonly string[];
  readonly github: string;
  readonly featured: boolean;
  readonly categories: readonly string[];
  readonly status: string;
}

const getStatusStyle = (status: string) => {
  if (status === 'Completed' || status === 'Award Winner')
    return 'status-badge-green';
  if (status === 'In Press')
    return 'status-badge-violet';
  return 'status-badge-amber';
};

const getCategoryColor = (cat: string) => {
  if (cat.includes('Vision') || cat === 'Computer Vision') return 'hsl(161,84%,46%)';
  if (cat.includes('NLP') || cat.includes('AI/ML') || cat.includes('Education')) return 'hsl(258,90%,66%)';
  if (cat === 'Competition') return 'hsl(38,92%,55%)';
  if (cat === 'IoT' || cat === 'Embedded') return 'hsl(186,90%,55%)';
  return 'hsl(300,80%,65%)';
};

interface ProjectContentProps {
  project: Project;
}

const ProjectContent: React.FC<ProjectContentProps> = ({ project }) => {
  return (
    <div className="p-5 flex flex-col flex-1">
      {/* Status + featured */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${getStatusStyle(project.status)}`}>
          {project.status}
        </span>
        {project.featured && (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 status-badge-violet">
            <Star size={8} /> Featured
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-foreground mb-1 leading-snug">{project.title}</h3>
      <p className="text-sm gradient-text font-medium mb-3">{project.subtitle}</p>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
        {project.description}
      </p>

      {/* Categories */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.categories.map((cat) => (
          <span
            key={cat}
            className="text-[10px] px-2 py-0.5 rounded-full font-medium"
            style={{ background: `${getCategoryColor(cat)}18`, color: getCategoryColor(cat), border: `1px solid ${getCategoryColor(cat)}33` }}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Tech stack pills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.technologies.map((tech) => (
          <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
            {tech}
          </span>
        ))}
      </div>

      {/* GitHub link */}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors duration-200 group/gh mt-auto"
        >
          <Github size={13} />
          View on GitHub
          <ArrowUpRight size={11} className="group-hover/gh:translate-x-0.5 group-hover/gh:-translate-y-0.5 transition-transform duration-200" />
        </a>
      )}
    </div>
  );
};

export default ProjectContent;

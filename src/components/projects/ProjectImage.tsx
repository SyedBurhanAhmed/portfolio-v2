import React from 'react';
import Image from 'next/image';
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProjectImageProps {
  project: {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    github: string;
    video?: string; // optional, only provide for projects with video
  };
}


const ProjectImage: React.FC<ProjectImageProps> = ({ project }) => {
  return (
    <div className="relative overflow-hidden group">
      <div className="aspect-video relative bg-gradient-to-br from-primary/20 to-accent/20">
        {project.video ? (
          <video
  src={project.video}
  autoPlay          // <-- This will make the video start automatically
  muted             // <-- Muted allows autoplay in most browsers
  loop              // <-- Optional, for continuous playback
  controls          // <-- You can keep this if you want users to control playback too
  poster={project.image}
  className="object-cover w-full h-full"
  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
/>

        ) : (
          <Image
            src={project.image}
            alt={`${project.title} - ${project.subtitle}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="flex space-x-4">
          <Button size="sm" variant="secondary" asChild>
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              Code
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectImage;

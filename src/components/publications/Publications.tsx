import React from 'react';
import PublicationCategoryFilter from './PublicationCategoryFilter';
import PublicationCard from './PublicationCard';
import EmptyState from './EmptyState';
import personalInfo from '@/data/personal-info.json';

const Publications: React.FC = () => {
  return (
    <section id="publications" className="py-20 relative bg-background">
      {/* Background decoration */}
      <div 
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 100% 50%, hsl(258,90%,66%), transparent 70%)'
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Publications & <span className="gradient-text">Writing</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Research contributions and technical deep-dives into CV, NLP, and Optimization algorithms.
          </p>
        </div>

        {/* Client-side Category Filter */}
        <PublicationCategoryFilter publications={personalInfo.publications} />

        {/* Server-rendered Publications Content for SEO */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto" id="publications-grid">
          {personalInfo.publications.map((publication) => (
            <PublicationCard key={publication.title} publication={publication} />
          ))}
        </div>
        
        {/* Empty state for blog category */}
        <EmptyState />
      </div>
    </section>
  );
};

export default Publications;

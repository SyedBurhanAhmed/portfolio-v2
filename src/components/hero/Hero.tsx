'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown, Download, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollButton from '../ScrollButton';
import ProfileImage from './ProfileImage';
import personalInfo from '@/data/personal-info.json';

/* ─── Neural-net node graph (decorative SVG) ─── */
const NeuralBackground: React.FC = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Connection lines */}
    {[
      [80, 180, 260, 90], [260, 90, 480, 200], [480, 200, 680, 110],
      [680, 110, 900, 250], [80, 180, 260, 340], [260, 340, 480, 200],
      [480, 200, 480, 390], [480, 390, 680, 480], [260, 90, 480, 390],
      [680, 110, 480, 390], [900, 250, 680, 480], [260, 340, 480, 480],
      [150, 400, 260, 340], [150, 400, 260, 90], [900, 250, 1050, 150],
      [680, 480, 900, 420], [900, 420, 1050, 150]
    ].map(([x1, y1, x2, y2], i) => (
      <line
        key={i} x1={`${x1}`} y1={`${y1}`} x2={`${x2}`} y2={`${y2}`}
        stroke="hsl(258 90% 66%)" strokeWidth="1"
      />
    ))}
    {/* Nodes */}
    {[
      [80, 180], [260, 90], [480, 200], [680, 110], [900, 250],
      [260, 340], [480, 390], [680, 480], [150, 400], [480, 480],
      [900, 420], [1050, 150]
    ].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="5" fill="hsl(258 90% 70%)" />
    ))}
  </svg>
);

const HeroStats: React.FC = () => {
  const stats = [
    { label: 'Projects', value: personalInfo.stats.projects },
    { label: 'Years XP', value: personalInfo.stats.yearsExperience },
    { label: 'Technologies', value: personalInfo.stats.technologiesMastered },
  ];

  return (
    <div className="flex items-center gap-6 justify-center lg:justify-start pt-2">
      {stats.map((s, i) => (
        <div key={i} className="text-center">
          <div className="text-xl font-bold gradient-text font-mono">{s.value}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide">{s.label}</div>
        </div>
      ))}
    </div>
  );
};

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden grid-pattern hero-background"
    >
      {/* Neural-net decorative background */}
      <NeuralBackground />

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-20 h-20 border border-primary/15 rotate-45 float-animation" />
        <div className="absolute top-3/4 right-1/4 w-16 h-16 border border-accent/20 rotate-12 float-animation animate-delay-2000" />
        <div className="absolute top-1/2 right-1/3 w-12 h-12 border border-primary/10 rotate-45 float-animation animate-delay-4000" />
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 border border-primary/8 -rotate-12 float-animation animate-delay-1000" />
        <div className="absolute top-1/3 right-1/4 w-10 h-10 border border-accent/10 float-animation animate-delay-3000" />
        <div className="absolute bottom-1/3 left-1/5 w-8 h-8 border border-primary/8 rotate-45 float-animation animate-delay-5000" />
        {/* Glow orbs */}
        <div className="absolute top-1/4 right-1/3 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10">

        {/* ── Left: Text content ── */}
        <div className="space-y-6 text-center lg:text-left">

          {/* Profile image – mobile only */}
          <div className="flex justify-center lg:hidden">
            <ProfileImage size="small" />
          </div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center lg:justify-start"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border border-primary/30 bg-primary/8 text-primary">
              <span className="neural-dot w-2 h-2" />
              Available for AI Research & Engineering Roles
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
          >
            <span className="text-foreground">{personalInfo.personal.name.split(' ')[0]} </span>
            <span className="gradient-text">{personalInfo.personal.name.split(' ').slice(1).join(' ')}</span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-2xl text-muted-foreground font-light min-h-[2rem]"
          >
            <TypeAnimation
              sequence={[
                'AI Engineer', 1800,
                'Computer Vision Engineer', 1800,
                'Applied GenAI Specialist', 1800,
                'YOLOv11 & VLM Integrator', 1800,
                'RAG & LangChain Architect', 1800,
              ]}
              wrapper="span"
              speed={52}
              repeat={Infinity}
              className="text-primary font-medium"
            />
            <span className="text-muted-foreground font-light"> — specializing in CV &amp; GenAI</span>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden xs-tall:block text-base text-muted-foreground max-w-xl leading-relaxed"
          >
            {personalInfo.personal.bio}
          </motion.p>

          {/* Hero stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <HeroStats />
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start"
          >
            <ScrollButton
              targetId="contact"
              className="font-bold px-8 py-3 rounded-lg text-sm inline-flex items-center justify-center gap-2 ring-offset-background transition-all duration-300 hover:scale-105 text-white bg-[image:var(--primary-gradient)] shadow-[0_0_20px_hsla(258,90%,66%,0.4)]"
              ariaLabel="Scroll to contact section"
            >
              Get In Touch
            </ScrollButton>

            <Button
              variant="outline"
              className="border-primary/40 hover:border-primary hover:bg-primary/10 hover:text-primary px-8 py-3 rounded-lg text-sm group"
              asChild
            >
              <a
                href={personalInfo.social.resume}
                target="_blank"
                rel="noopener noreferrer"
                download="SyedBurhanAhmed.pdf"
              >
                <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                Download Resume
              </a>
            </Button>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center lg:justify-start space-x-5 pt-2"
          >
            {[
              { href: personalInfo.social.github.url, icon: Github, label: 'GitHub' },
              { href: personalInfo.social.linkedin.url, icon: Linkedin, label: 'LinkedIn' },
              { href: personalInfo.social.huggingface.url, icon: ExternalLink, label: 'Hugging Face' },
              { href: personalInfo.social.email, icon: Mail, label: 'Email' },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className="group flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <Icon size={20} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Profile image ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden lg:flex justify-center lg:justify-end"
        >
          <ProfileImage size="large" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute lg:bottom-8 bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ScrollButton
          targetId="about"
          className="text-muted-foreground hover:text-primary transition-colors duration-300"
          ariaLabel="Scroll to about section"
        >
          <ArrowDown size={28} />
        </ScrollButton>
      </div>
    </section>
  );
};

export default Hero;

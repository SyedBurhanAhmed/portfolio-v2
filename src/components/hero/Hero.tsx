'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollButton from '../ScrollButton';
import ProfileImage from './ProfileImage';
import personalInfo from '@/data/personal-info.json';

/* ─── Hero stats ─── */
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
          <div className="text-xl font-bold text-primary font-mono">{s.value}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide font-mono">{s.label}</div>
        </div>
      ))}
    </div>
  );
};

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-between relative overflow-hidden grid-pattern hero-background pt-16 pb-3 sm:pt-18 sm:pb-4 lg:pt-16 lg:pb-4"
    >
      {/* ── Content wrapper ── */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto py-2">

        {/* ── Main two-column layout ── */}

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* ── Left: Text content ── */}


          <div className="space-y-3.5 sm:space-y-4 lg:space-y-4 text-center lg:text-left">
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
              <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono border border-primary/25 bg-primary/5 text-primary tracking-wider uppercase">
                <span className="neural-dot" />
                OPEN TO SELECT COLLABORATIONS
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight font-display whitespace-nowrap"
            >
              <span className="text-foreground">{personalInfo.personal.name.split(' ')[0]} </span>
              <span className="text-primary">{personalInfo.personal.name.split(' ').slice(1).join(' ')}</span>
            </motion.h1>

            {/* Static role — two-line, no typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-mono text-xs sm:text-sm md:text-base text-muted-foreground leading-normal"
            >
              <span className="text-primary/80">AI Engineer</span>
              {' · '}
              <span>Computer Vision &amp; Applied ML</span>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden xs-tall:block text-xs sm:text-sm lg:text-sm xl:text-base text-muted-foreground max-w-xl leading-relaxed"
            >
              {personalInfo.personal.bio}
            </motion.p>

            {/* Hero stats */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <HeroStats />
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3.5 items-center justify-center lg:justify-start pt-1"
            >
              <ScrollButton
                targetId="contact"
                className="font-bold px-7 py-2.5 rounded-sm text-sm inline-flex items-center justify-center gap-2 ring-offset-background transition-all duration-300 hover:scale-105 text-background bg-primary hover:bg-primary/90"
                ariaLabel="Scroll to contact section"
              >
                Get In Touch
              </ScrollButton>

              <Button
                variant="outline"
                className="border-primary/30 hover:border-primary hover:bg-primary/8 hover:text-primary px-7 py-2.5 rounded-sm text-sm group"
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
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center justify-center lg:justify-start space-x-5 pt-0.5"
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
                  className="group flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Profile image ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:flex justify-end"
          >
            <ProfileImage size="large" />
          </motion.div>
        </div>

        {/* ── Status bar — bottom ── */}
        <div className="detection-status-bar mt-4 lg:mt-6" aria-hidden="true">
          <span>FRAME 001</span>
          <span className="opacity-40">──</span>
          <span>7.7 FPS</span>
          <span className="opacity-40">──</span>
          <span>11.5 GB VRAM</span>
          <span className="opacity-40">──</span>
          <span>InsightVision</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="pb-1 text-center animate-bounce">
        <ScrollButton
          targetId="about"
          className="text-muted-foreground hover:text-primary transition-colors duration-300"
          ariaLabel="Scroll to about section"
        >
          <ArrowDown size={18} />
        </ScrollButton>
      </div>
    </section>
  );
};

export default Hero;

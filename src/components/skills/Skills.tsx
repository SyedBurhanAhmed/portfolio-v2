// Server Component - No 'use client' directive for SEO benefits
import React from 'react';
import { Code2, Brain, Zap,Network,Settings,User, type LucideIcon } from 'lucide-react';
import SkillCategory from './SkillCategory';
import SkillsSummary from './SkillsSummary';
import personalInfo from '@/data/personal-info.json';

interface Skill {
  readonly name: string;
  readonly experience: string;
  readonly context: string;
  readonly category: string;
  readonly icon: string;
}

interface SkillCategoryData {
  readonly title: string;
  readonly icon: LucideIcon;
  readonly skills: readonly Skill[];
}

const Skills: React.FC = () => {
  const skillCategories: readonly SkillCategoryData[] = [
    {
      title: 'Programming Languages',
      icon: Code2,
      skills: personalInfo.skills.languages // Python, C/C++, Bash, MIPS Assembly, HTML/CSS/JavaScript, SQL
    },
    {
      title: 'AI/ML Frameworks & Tools',
      icon: Brain,
      skills: personalInfo.skills.ai_ml, // PyTorch, TensorFlow, Keras, Scikit-learn, LangChain, LlamaIndex, Hugging Face Transformers

    },

    {
      title: 'Web & Backend Development',
      icon: Network,
      skills: personalInfo.skills.web_backend// Flask (REST APIs), ASP.NET (Web Forms), Gradio
    },
    {
      title: 'Tools, Platforms & IoT',
      icon: Settings,
      skills: personalInfo.skills.tools_platforms // Git, GitHub, Kaggle, Hugging Face Spaces, Google Colab, VS Code, PyCharm, Visual Studio
    },
    // ESP32, NFC, Fingerprint, Microphone, I2C, OLED, Voice Commands
    {
      title: 'Professional & Leadership',
      icon: User,
      skills: personalInfo.skills.professional // AI Team Leadership, Project Management, Mentorship, Curriculum Development, Teaching, Public Speaking
    }
  ];
  return (
    <section id="skills" className="py-16 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Technical <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Technologies I&apos;ve worked with in real-world projects and professional environments
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <SkillCategory
              key={categoryIndex}
              title={category.title}
              icon={category.icon}
              skills={category.skills}
            />
          ))}
        </div>

        {/* Skills Summary */}
        <SkillsSummary />
      </div>
    </section>
  );
};

export default Skills;

import React from 'react';
import { Code2, Brain, Server, Settings, type LucideIcon } from 'lucide-react';

interface SummaryStatProps {
  number: string;
  label: string;
  icon: LucideIcon;
}

const SummaryStat: React.FC<SummaryStatProps> = ({ number, label, icon }) => {
  const IconComponent = icon;
  
  return (
    <div className="text-center glass-card p-3 rounded-lg">
      <div className="w-8 h-8 iconic rounded-lg bg-primary mx-auto mb-2 flex items-center justify-center">
        <IconComponent size={16} className="text-background" />
      </div>
      <div className="text-2xl font-bold gradient-text mb-1">
        {number}
      </div>
      <div className="text-muted-foreground font-medium text-xs">
        {label}
      </div>
    </div>
  );
};

const SkillsSummary: React.FC = () => {
  const summaryStats = [
    { number: "8+", label: "Programming Languages", icon: Code2 },           // Python, C/C++, Bash, MIPS Assembly, HTML, CSS, JavaScript, SQL
    { number: "12+", label: "AI/ML Frameworks & Libraries", icon: Brain },   // PyTorch, TensorFlow, Keras, Scikit-learn, LangChain, LlamaIndex, HuggingFace, NumPy, Pandas, Matplotlib, OpenCV, WordNet
    { number: "8+", label: "Web/Backend & ML Apps", icon: Server },        // NLP, Deep Learning, GenAI, Computer Vision, RAG, OCR, Multimodal AI, Prompt Engineering
    { number: "8+", label: "Tools & Platforms", icon: Settings }             // Git, GitHub, Kaggle, HF Spaces, Google Colab, VS Code, PyCharm, Visual Studio
  
];
  return (
    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 justify-center">
      {summaryStats.map((stat, index) => (
        <SummaryStat
          key={stat.label}
          number={stat.number}
          label={stat.label}
          icon={stat.icon}
        />
      ))}
    </div>
  );
};

export default SkillsSummary;

import React, { useState } from 'react';
import { FileText, Sparkles, CheckCircle2, Layers, Cpu, Compass, HeartHandshake } from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';
import { ResumeModal } from './ResumeModal';
import { SectionHeader } from './ui/SectionHeader';
import { Button } from './ui/Button';

export const About: React.FC = () => {
  const [resumeOpen, setResumeOpen] = useState(false);

  const factIcons = [Layers, Cpu, Compass, HeartHandshake];

  return (
    <section id="about" className="py-20 md:py-28 bg-neutral-100/60 dark:bg-[#0e1422] border-y border-neutral-200/80 dark:border-[#1e293b] transition-colors" aria-label="About Me">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          kicker="Get To Know Me"
          title="Turning Business Goals Into Usable, Fast Websites"
          description="I'm a freelance web designer and frontend developer who bridges the gap between clean visual design and rock-solid code. I help small business owners, clinic directors, restaurant managers, and startup founders turn ideas into polished websites that convert visitors into active customers."
        />

        {/* Story & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Main Narrative */}
          <div className="lg:col-span-7 space-y-5 text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
            <p>
              In today's competitive online landscape, a website cannot just look pretty—it needs to solve real business bottlenecks. Whether that means reducing missed calls with an automated patient booking system, showcasing restaurant menus with high appetitive appeal, or giving users a frictionless e-commerce checkout, my work is directly measured by its impact on your bottom line.
            </p>
            <p>
              I leverage <strong>Google AI Studio</strong> alongside modern frontend technologies like React, TypeScript, and Tailwind CSS. This unique workflow allows me to rapid-prototype responsive layouts, stress-test responsive components in real time, and deliver high-standard web experiences at freelance agility and competitive pricing.
            </p>
            <p>
              My clients value my straightforward, no-nonsense communication. You'll never be left wondering what step we are on, what technologies are being used, or when your site will go live.
            </p>

            {/* Resume button & badges */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                size="md"
                onClick={() => setResumeOpen(true)}
                icon={<FileText className="w-4 h-4" />}
                iconPosition="left"
              >
                View & Download CV / Resume
              </Button>

              <div className="inline-flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Open for freelance contracts & redesigns</span>
              </div>
            </div>
          </div>

          {/* Side Highlights Box */}
          <div className="lg:col-span-5 bg-white dark:bg-[#111726] rounded-2xl p-6 sm:p-7 border border-neutral-200/80 dark:border-[#1e293b] shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">The Freelancer Advantage</span>
            </div>
            <h3 className="text-lg font-bold text-neutral-950 dark:text-white">
              Why work directly with me?
            </h3>
            
            <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-300">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></span>
                <span><strong>Direct contact:</strong> No middle managers or account executives. You speak directly with the developer building your site.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></span>
                <span><strong>Rapid iteration:</strong> Using Google AI Studio, initial functional mockups are ready within 48–72 hours.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></span>
                <span><strong>Clean ownership:</strong> You receive 100% ownership of your code, assets, and accounts with no lock-in.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></span>
                <span><strong>Guaranteed speed:</strong> Zero bloated themes or slow page builders. Hand-crafted code optimized for Google Core Web Vitals.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* 4 Quick Facts Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROFILE_INFO.quickFacts.map((fact, index) => {
            const Icon = factIcons[index % factIcons.length];
            return (
              <div 
                key={fact.label}
                className="bg-white dark:bg-[#111726] rounded-2xl p-6 border border-neutral-200/80 dark:border-[#1e293b] shadow-2xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-[#1a233a] text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-xs uppercase font-semibold text-neutral-400 dark:text-neutral-500 tracking-wider mb-1">
                  {fact.label}
                </div>
                <h4 className="text-base font-bold text-neutral-950 dark:text-white mb-2">
                  {fact.title}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {fact.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>

      {/* Resume modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
};

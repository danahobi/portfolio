import React from 'react';
import { Compass, Palette, Code2, CheckCircle2 } from 'lucide-react';
import { PROCESS_STEPS } from '../data/portfolioData';
import { SectionHeader } from './ui/SectionHeader';

export const Process: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return Compass;
      case 'Palette':
        return Palette;
      case 'Code2':
        return Code2;
      case 'CheckCircle2':
      default:
        return CheckCircle2;
    }
  };

  return (
    <section id="process" className="py-20 md:py-28 bg-neutral-100/60 dark:bg-[#0e1422] border-y border-neutral-200/80 dark:border-[#1e293b] transition-colors" aria-label="Work Process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeader
          kicker="How We Work Together"
          title="A Transparent 4-Step Process"
          description="No endless meetings or murky deadlines. A proven, milestone-driven framework that takes your project from napkin sketch to high-speed production launch."
        />

        {/* 4 Process Steps Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {PROCESS_STEPS.map((stepItem) => {
            const Icon = getIcon(stepItem.iconName);
            return (
              <div
                key={stepItem.step}
                className="relative bg-white dark:bg-[#111726] rounded-2xl p-6 sm:p-7 border border-neutral-200/80 dark:border-[#1e293b] shadow-2xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between hover-lift"
              >
                <div>
                  
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold text-blue-600/35 dark:text-blue-400/40 font-mono tracking-tighter">
                      {stepItem.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-[#1a233a] text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-neutral-950 dark:text-white mb-2">
                    {stepItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    {stepItem.description}
                  </p>

                </div>

                {/* Key Deliverables list */}
                <div className="pt-4 border-t border-neutral-100 dark:border-[#1e293b]">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2">
                    Deliverables
                  </div>
                  <ul className="space-y-1.5">
                    {stepItem.deliverables.map((del, dIdx) => (
                      <li key={dIdx} className="text-xs text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-blue-500 shrink-0"></span>
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

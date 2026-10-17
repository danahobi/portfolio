import React from 'react';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';
import { usePortfolioData } from '../context/PortfolioDataContext';

interface PricingProps {
  onSelectPlan: (planName: string, serviceCategory: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  const { pricingPlans } = usePortfolioData();
  return (
    <section id="pricing" className="py-20 md:py-28 bg-neutral-100/60 dark:bg-[#0e1422] border-y border-neutral-200/80 dark:border-[#1e293b] transition-colors" aria-label="Pricing Packages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeader
          kicker="Clear & Upfront Investments"
          title="Simple, Transparent Pricing"
          description="No surprise monthly retainer traps or hidden licensing fees. Every package delivers 100% full code ownership, responsive mobile design, and post-launch warranty support."
        />

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-8 transition-all flex flex-col justify-between ${
                plan.isRecommended
                  ? 'bg-white dark:bg-[#111726] border-2 border-blue-600 dark:border-blue-500 shadow-xl lg:-translate-y-2'
                  : 'bg-white dark:bg-[#111726] border border-neutral-200/90 dark:border-[#1e293b] shadow-2xs'
              }`}
            >
              
              {/* Recommended Badge on middle plan */}
              {plan.isRecommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold tracking-wide uppercase shadow-sm">
                    <Sparkles className="w-3 h-3" />
                    <span>Most Popular Choice</span>
                  </span>
                </div>
              )}

              <div>
                
                {/* Plan Title & Subtitle */}
                <h3 className="text-xl font-bold text-neutral-950 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">
                  {plan.subtitle}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">Starting from</span>
                  <span className="text-4xl font-extrabold text-neutral-950 dark:text-white font-mono tabular-nums">
                    {plan.price}
                  </span>
                  <span className="text-xs text-neutral-400">/ project</span>
                </div>

                <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-8">
                  Typical turnaround: {plan.turnaroundTime}
                </div>

                {/* Features List */}
                <div className="pt-6 border-t border-neutral-100 dark:border-[#1e293b] space-y-3.5 mb-8">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                    What's included:
                  </div>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-700 dark:text-neutral-300">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Get Started Button */}
              <button
                onClick={() => onSelectPlan(plan.name, plan.serviceCategory)}
                className={`w-full py-3.5 px-5 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99] hover-lift focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  plan.isRecommended
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                    : 'bg-neutral-100 dark:bg-[#171f33] hover:bg-neutral-200 dark:hover:bg-[#202b44] text-neutral-900 dark:text-white'
                }`}
              >
                <span>Get Started with {plan.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          ))}
        </div>

        {/* Custom enterprise note */}
        <div className="mt-12 text-center text-xs text-neutral-500 dark:text-neutral-400">
          Need a custom scope or ongoing monthly maintenance retainer? Let's discuss a tailored plan during our free consultation.
        </div>

      </div>
    </section>
  );
};

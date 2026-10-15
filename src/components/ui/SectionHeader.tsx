import React from 'react';

interface SectionHeaderProps {
  kicker: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  kicker,
  title,
  description,
  action,
  align = 'left',
  className = '',
}) => {
  const isCentered = align === 'center';

  return (
    <div className={`mb-12 md:mb-16 ${className} ${isCentered ? 'text-center max-w-3xl mx-auto' : 'flex flex-col md:flex-row md:items-end justify-between gap-6'}`}>
      <div className={isCentered ? '' : 'max-w-2xl'}>
        <div className="text-xs uppercase tracking-wider font-bold text-blue-600 dark:text-blue-400 mb-2">
          {kicker}
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.2] text-balance">
          {title}
        </h2>
        {description && (
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className="shrink-0">
          {action}
        </div>
      )}
    </div>
  );
};

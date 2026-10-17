import React from 'react';

interface MessengerIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

export const MessengerIcon: React.FC<MessengerIconProps> = ({ 
  className = "w-5 h-5", 
  size,
  ...props 
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.91 1.455 5.513 3.734 7.202V22l3.411-1.872c.913.253 1.88.39 2.855.39 5.523 0 10-4.145 10-9.258C22 6.145 17.523 2 12 2zm1.034 12.443-2.646-2.822-5.163 2.822 5.679-6.03 2.71 2.822 5.099-2.822-5.679 6.03z" />
    </svg>
  );
};

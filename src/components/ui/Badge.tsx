import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'purple' | 'amber' | 'emerald' | 'slate' | 'outline';
  size?: 'sm' | 'md'; 
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'purple',
  size = 'md',
  className = '',
  icon
}) => {
  const base = 'inline-flex items-center gap-1.5 font-mono uppercase tracking-wider font-semibold rounded-full border backdrop-blur-xs transition-colors';
  
  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1'
  };

  const variantStyles = {
    purple: 'bg-purple-950/60 border-purple-500/30 text-purple-300 shadow-xs shadow-purple-950/50',
    amber: 'bg-amber-950/60 border-amber-500/30 text-amber-300 shadow-xs shadow-amber-950/50',
    emerald: 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300 shadow-xs shadow-emerald-950/50',
    slate: 'bg-slate-900/80 border-slate-700/60 text-slate-300',
    outline: 'bg-transparent border-slate-700 text-slate-400'
  };

  return (
    <span className={`${base} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

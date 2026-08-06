import React from 'react';

/**
 * Reusable Badge / Chip component adhering to Design System & WCAG Contrast rules
 */
export default function Badge({ children, variant = 'default', icon: Icon, className = '' }) {
  const variants = {
    default: 'bg-slate-800/80 text-slate-200 border-slate-700/60',
    purple: 'bg-purple-950/60 text-purple-300 border-purple-500/30',
    cyan: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30',
    amber: 'bg-amber-950/60 text-amber-300 border-amber-500/30',
    emerald: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30',
    ghost: 'bg-slate-900/60 text-slate-400 border-slate-800'
  };

  const variantStyle = variants[variant] || variants.default;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold tracking-wide border transition-colors ${variantStyle} ${className}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
      <span>{children}</span>
    </span>
  );
}

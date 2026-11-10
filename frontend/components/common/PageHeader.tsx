import React, { ReactNode } from 'react';

interface PageHeaderProps {
  badge?: string;
  title: string;
  highlightWord?: string;
  subtitle: string;
  bgImageUrl?: string;
  children?: ReactNode;
}

export const PageHeader = ({
  badge,
  title,
  highlightWord,
  subtitle,
  bgImageUrl = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80',
  children,
}: PageHeaderProps) => {
  return (
    <div className="relative bg-slate-950 overflow-hidden border-b border-slate-900">
      {/* Background Unsplash image with dark slate gradient & luminosity overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity transform scale-105"
        style={{ backgroundImage: `url('${bgImageUrl}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/95 to-slate-950" />

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 text-center">
        {badge && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {badge}
          </div>
        )}

        <h1 className="font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-tight max-w-4xl mx-auto">
          {title}{' '}
          {highlightWord && (
            <span className="text-emerald-500">{highlightWord}</span>
          )}
        </h1>

        <p className="mt-5 text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
          {subtitle}
        </p>

        {children && <div className="mt-8 flex justify-center">{children}</div>}
      </div>
    </div>
  );
};


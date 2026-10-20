// VIKRAM1 — KPI Metric Card Component
import React from 'react';

export default function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  badgeText,
  status = 'neutral', // 'green', 'amber', 'red', 'cyan', 'neutral'
}) {
  const statusColors = {
    green: {
      border: 'border-emerald-500/30 hover:border-emerald-500/60',
      badge: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/30',
      text: 'text-emerald-400',
      glow: 'hover:shadow-glow-green',
    },
    cyan: {
      border: 'border-cyan-500/30 hover:border-cyan-500/60',
      badge: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/30',
      text: 'text-cyan-400',
      glow: 'hover:shadow-glow-cyan',
    },
    amber: {
      border: 'border-amber-500/30 hover:border-amber-500/60',
      badge: 'bg-amber-950/80 text-amber-300 border-amber-500/30',
      text: 'text-amber-400',
      glow: '',
    },
    red: {
      border: 'border-rose-500/30 hover:border-rose-500/60',
      badge: 'bg-rose-950/80 text-rose-300 border-rose-500/30',
      text: 'text-rose-400',
      glow: 'hover:shadow-glow-red',
    },
    neutral: {
      border: 'border-[#1B2C52] hover:border-cyan-500/40',
      badge: 'bg-[#0F1E3D] text-slate-300 border-[#243B6E]',
      text: 'text-white',
      glow: '',
    },
  }[status] || {
    border: 'border-[#1B2C52]',
    badge: 'bg-[#0F1E3D] text-slate-300',
    text: 'text-white',
    glow: '',
  };

  return (
    <div
      className={`relative bg-[#091224]/90 backdrop-blur-md rounded-xl p-4 border transition-all duration-200 group reticle-box ${statusColors.border} ${statusColors.glow}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
            {title}
          </span>
          <div className="flex items-baseline space-x-2">
            <span className={`text-2xl font-bold font-mono tracking-tight ${statusColors.text}`}>
              {value}
            </span>
            {trend && (
              <span className="text-[11px] font-mono text-emerald-400 font-medium">
                {trend}
              </span>
            )}
          </div>
        </div>

        {Icon && (
          <div className="w-10 h-10 rounded-lg bg-[#0C1935] border border-[#1A2E56] flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 pt-2.5 border-t border-[#142344] flex items-center justify-between text-[11px] font-mono">
        <span className="text-slate-400 truncate max-w-[150px]">{subtitle}</span>
        {badgeText && (
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider border ${statusColors.badge}`}>
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
}

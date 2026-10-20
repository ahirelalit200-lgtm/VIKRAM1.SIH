// VIKRAM1 — KPI Metric Card Component (Realistic Defence Enterprise Theme)
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
      badge: 'bg-[#EDF7F2] text-[#2E7D5B] border-[#C4E5D4]',
      text: 'text-[#2E7D5B]',
    },
    cyan: {
      badge: 'bg-[#EBF2F7] text-[#1E3A5F] border-[#CFDFEC]',
      text: 'text-[#1E3A5F]',
    },
    amber: {
      badge: 'bg-[#FFF8EB] text-[#B7791F] border-[#F5E1B5]',
      text: 'text-[#B7791F]',
    },
    red: {
      badge: 'bg-[#FDF2F2] text-[#B84242] border-[#F7C8C8]',
      text: 'text-[#B84242]',
    },
    neutral: {
      badge: 'bg-[#F4F6F8] text-[#526B82] border-[#D5DCE3]',
      text: 'text-[#263238]',
    },
  }[status] || {
    badge: 'bg-[#F4F6F8] text-[#526B82] border-[#D5DCE3]',
    text: 'text-[#263238]',
  };

  return (
    <div className="bg-white rounded-md p-4 border border-[#D5DCE3] shadow-sm hover:border-[#BCC8D4] transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#60717D] block mb-1">
            {title}
          </span>
          <div className="flex items-baseline space-x-2">
            <span className={`text-2xl font-bold font-mono tracking-tight ${statusColors.text}`}>
              {value}
            </span>
            {trend && (
              <span className="text-[11px] font-mono text-[#2E7D5B] font-semibold">
                {trend}
              </span>
            )}
          </div>
        </div>

        {Icon && (
          <div className="w-9 h-9 rounded bg-[#F4F6F8] border border-[#D5DCE3] flex items-center justify-center text-[#1E3A5F] shrink-0">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-3 pt-2.5 border-t border-[#E5EAEF] flex items-center justify-between text-[11px]">
        <span className="text-[#60717D] truncate max-w-[150px]">{subtitle}</span>
        {badgeText && (
          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold tracking-wider border ${statusColors.badge}`}>
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
}

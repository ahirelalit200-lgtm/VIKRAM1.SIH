// VIKRAM1 — Live System Telemetry & Event Feed
import React, { useState } from 'react';
import { Radio, AlertTriangle, ShieldCheck, Cpu, Info, Filter } from 'lucide-react';

export default function LiveFeed() {
  const [filter, setFilter] = useState('ALL');

  const initialFeed = [
    { id: 1, time: '10:42:51', type: 'AI', text: 'Plan Alpha validated against 48 operational boundaries', tag: 'SOLVER-OK' },
    { id: 2, time: '10:42:44', type: 'AI', text: 'AI recommendation synthesized for Scenario Alpha-07', tag: 'RECOMMEND' },
    { id: 3, time: '10:42:38', type: 'WARNING', text: 'Constraint conflict: Sector B convective cloud top FL340', tag: 'ENV-WARN' },
    { id: 4, time: '10:42:31', type: 'INFO', text: 'Crew availability synchronized (24 aircrew verified)', tag: 'ROSTER-SYNC' },
    { id: 5, time: '10:42:25', type: 'ALERT', text: 'Weather threshold trigger: Corridor-2 crosswind 24kts', tag: 'WX-ALERT' },
    { id: 6, time: '10:42:18', type: 'INFO', text: 'Aircraft availability updated: 24/32 airframes online', tag: 'FLEET-STATUS' },
    { id: 7, time: '10:41:59', type: 'INFO', text: 'Telemetry ingest: Base Alpha ADS-B / IFF data refreshed', tag: 'INGEST' },
    { id: 8, time: '10:41:40', type: 'AI', text: 'Pareto frontier multi-objective optimization solved in 340ms', tag: 'PARETO' },
    { id: 9, time: '10:41:12', type: 'WARNING', text: 'VKR-105 maintenance window within 4 flight hours', tag: 'MAINT-DUE' },
  ];

  const filteredFeed = filter === 'ALL' ? initialFeed : initialFeed.filter(item => item.type === filter);

  const typeConfig = {
    INFO: {
      badge: 'bg-cyan-950 text-cyan-300 border-cyan-500/30',
      dot: 'bg-cyan-400',
      icon: Info,
    },
    WARNING: {
      badge: 'bg-amber-950 text-amber-300 border-amber-500/30',
      dot: 'bg-amber-400',
      icon: AlertTriangle,
    },
    ALERT: {
      badge: 'bg-rose-950 text-rose-300 border-rose-500/30',
      dot: 'bg-rose-400',
      icon: AlertTriangle,
    },
    AI: {
      badge: 'bg-emerald-950 text-emerald-300 border-emerald-500/30',
      dot: 'bg-emerald-400',
      icon: Cpu,
    },
  };

  return (
    <div className="bg-[#091224]/90 border border-[#1A2D54] rounded-xl p-4 flex flex-col h-full font-mono">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#142344]">
        <div className="flex items-center space-x-2">
          <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
          <h3 className="text-xs font-bold text-white tracking-wider uppercase">
            LIVE SYSTEM FEED
          </h3>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          REAL-TIME
        </span>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center space-x-1.5 py-2.5 text-[10px] border-b border-[#142344]/60">
        <span className="text-slate-500 text-[10px]">FILTER:</span>
        {['ALL', 'AI', 'INFO', 'WARNING', 'ALERT'].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-2 py-0.5 rounded transition-colors ${
              filter === t
                ? 'bg-cyan-500 text-black font-bold'
                : 'bg-[#0E1A36] text-slate-400 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Feed List */}
      <div className="mt-2 space-y-2 overflow-y-auto max-h-[380px] pr-1">
        {filteredFeed.map((item) => {
          const config = typeConfig[item.type] || typeConfig.INFO;
          const Icon = config.icon;

          return (
            <div
              key={item.id}
              className="p-2 rounded-lg bg-[#070E1E] hover:bg-[#0B1733] border border-[#142344] transition-colors group flex items-start space-x-2.5 text-xs"
            >
              <div className="mt-0.5 shrink-0">
                <span className={`w-2 h-2 rounded-full inline-block ${config.dot}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-[10px] mb-0.5">
                  <span className="text-slate-400 font-bold">{item.time}</span>
                  <span className={`px-1.5 py-0.2 rounded text-[9px] border font-bold ${config.badge}`}>
                    {item.type}
                  </span>
                </div>
                <p className="text-slate-200 text-[11px] leading-tight group-hover:text-cyan-200">
                  {item.text}
                </p>
                <div className="text-[9px] text-slate-500 mt-1">
                  TAG: <span className="text-slate-400">[{item.tag}]</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

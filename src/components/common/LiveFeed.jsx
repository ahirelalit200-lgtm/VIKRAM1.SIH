// VIKRAM1 — Live System Telemetry & Event Feed (Realistic Enterprise Theme)
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
      badge: 'bg-[#EBF2F7] text-[#1E3A5F] border-[#CFDFEC]',
      dot: 'bg-[#1E3A5F]',
      icon: Info,
    },
    WARNING: {
      badge: 'bg-[#FFF8EB] text-[#B7791F] border-[#F5E1B5]',
      dot: 'bg-[#B7791F]',
      icon: AlertTriangle,
    },
    ALERT: {
      badge: 'bg-[#FDF2F2] text-[#B84242] border-[#F7C8C8]',
      dot: 'bg-[#B84242]',
      icon: AlertTriangle,
    },
    AI: {
      badge: 'bg-[#EDF7F2] text-[#2E7D5B] border-[#C4E5D4]',
      dot: 'bg-[#2E7D5B]',
      icon: Cpu,
    },
  };

  return (
    <div className="bg-white border border-[#D5DCE3] rounded-md p-4 flex flex-col h-full font-sans shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E5EAEF]">
        <div className="flex items-center space-x-2">
          <Radio className="w-4 h-4 text-[#526B82]" />
          <h3 className="text-xs font-bold text-[#1E3A5F] tracking-wide uppercase">
            LIVE SYSTEM FEED
          </h3>
        </div>
        <span className="text-[10px] text-[#2E7D5B] bg-[#EDF7F2] px-2 py-0.5 rounded border border-[#C4E5D4] font-semibold flex items-center gap-1 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D5B]" />
          REAL-TIME
        </span>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center space-x-1.5 py-2.5 text-[10px] border-b border-[#E5EAEF]">
        <span className="text-[#60717D] text-[10px] font-semibold">FILTER:</span>
        {['ALL', 'AI', 'INFO', 'WARNING', 'ALERT'].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-2 py-0.5 rounded transition-colors font-mono font-semibold ${
              filter === t
                ? 'bg-[#1E3A5F] text-white'
                : 'bg-[#F4F6F8] text-[#526B82] hover:bg-[#E8ECF0]'
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

          return (
            <div
              key={item.id}
              className="p-2.5 rounded bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E5EAEF] transition-colors flex items-start space-x-2.5 text-xs"
            >
              <div className="mt-1 shrink-0">
                <span className={`w-2 h-2 rounded-full inline-block ${config.dot}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-[10px] mb-0.5 font-mono">
                  <span className="text-[#263238] font-bold">{item.time}</span>
                  <span className={`px-1.5 py-0.2 rounded text-[9px] border font-bold ${config.badge}`}>
                    {item.type}
                  </span>
                </div>
                <p className="text-[#263238] text-[11px] leading-tight">
                  {item.text}
                </p>
                <div className="text-[9px] text-[#60717D] font-mono mt-1">
                  TAG: <span className="text-[#526B82]">[{item.tag}]</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// VIKRAM1 — Command Centre Left Navigation Bar
import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Compass,
  Plane,
  Users,
  ShieldAlert,
  CloudSun,
  Cpu,
  RefreshCw,
  FileCheck2,
  Sliders,
  Sparkles,
  Terminal,
  Database
} from 'lucide-react';

export default function Sidebar() {
  const { currentView, setCurrentView, tourRunning } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Command Dashboard', icon: LayoutDashboard, badge: 'LIVE' },
    { id: 'planner', label: 'Mission Planner', icon: Compass, badge: 'AI-SYS' },
    { id: 'fleet', label: 'Fleet & Assets', icon: Plane, count: '32' },
    { id: 'crew', label: 'Crew Status', icon: Users, count: '24' },
    { id: 'airspace', label: 'Airspace & Constraints', icon: ShieldAlert, badge: '06', badgeColor: 'text-amber-400 bg-amber-950/60' },
    { id: 'weather', label: 'Weather & Environment', icon: CloudSun, status: 'NOMINAL' },
    { id: 'engine', label: 'AI Decision Engine', icon: Cpu, badge: 'PARETO' },
    { id: 'scenario', label: 'Scenario / Replanning', icon: RefreshCw, badge: 'CHURN' },
    { id: 'audit', label: 'Audit Trail', icon: FileCheck2, badge: 'SIG' },
    { id: 'settings', label: 'System Settings', icon: Sliders },
  ];

  return (
    <aside className="w-64 bg-[#060D1E]/95 border-r border-[#1A2D54] flex flex-col justify-between shrink-0 h-[calc(100vh-4rem)] sticky top-16 select-none overflow-y-auto">
      {/* Navigation List */}
      <div className="py-4 px-2 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-widest text-slate-400 border-b border-[#142344] mb-2 flex items-center justify-between">
          <span>OPERATIONAL MODULES</span>
          <span className="text-cyan-400">v2.6-SIH</span>
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              disabled={tourRunning}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono tracking-wide transition-all duration-150 group relative text-left ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-950/80 to-[#0C1B3B] text-cyan-300 font-semibold border-l-2 border-cyan-400 shadow-hud-border'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-[#0B1733]/60'
              }`}
            >
              <div className="flex items-center space-x-2.5 truncate">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-cyan-400 drop-shadow-sm' : 'text-slate-500 group-hover:text-cyan-300'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {/* Badge/Count */}
              {item.badge && (
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded font-bold font-mono tracking-wider ${
                    item.badgeColor || 'bg-cyan-950 text-cyan-300 border border-cyan-500/30'
                  }`}
                >
                  {item.badge}
                </span>
              )}
              {item.count && (
                <span className="text-[10px] text-slate-500 font-mono px-1">
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom DSSC / SIH Metadata Card */}
      <div className="p-3 m-2 rounded-lg bg-[#081226] border border-[#182A4F] text-[11px] font-mono text-slate-400 space-y-2">
        <div className="flex items-center justify-between text-[10px] text-cyan-400/90 font-semibold uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <Terminal className="w-3 h-3" /> SIH 2026 PS-26250
          </span>
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <p className="text-[10px] leading-relaxed text-slate-300">
          <strong className="text-white">Ministry of Defence</strong> / Defence Services Staff College
        </p>
        <div className="pt-1 border-t border-[#142344] flex items-center justify-between text-[9px] text-slate-400">
          <span>AI Constraint Engine:</span>
          <span className="text-emerald-400 font-bold">ONLINE</span>
        </div>
      </div>
    </aside>
  );
}

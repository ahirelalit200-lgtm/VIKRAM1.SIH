// VIKRAM1 — Command Centre Left Navigation Bar (Realistic Charcoal Sidebar)
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
  Terminal,
  Database
} from 'lucide-react';

export default function Sidebar() {
  const { currentView, setCurrentView, tourRunning } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Command Dashboard', icon: LayoutDashboard, badge: 'LIVE', badgeColor: 'text-[#4ADE80] bg-[#162E22] border border-[#23583C]' },
    { id: 'planner', label: 'Mission Planner', icon: Compass, badge: 'AI-SYS' },
    { id: 'fleet', label: 'Fleet & Assets', icon: Plane, count: '32' },
    { id: 'crew', label: 'Crew Status', icon: Users, count: '24' },
    { id: 'airspace', label: 'Airspace & Constraints', icon: ShieldAlert, badge: '06', badgeColor: 'text-[#FBBF24] bg-[#3B2C16] border border-[#6B4B1B]' },
    { id: 'weather', label: 'Weather & Environment', icon: CloudSun, status: 'NOMINAL' },
    { id: 'engine', label: 'AI Decision Engine', icon: Cpu, badge: 'PARETO' },
    { id: 'scenario', label: 'Scenario / Replanning', icon: RefreshCw, badge: 'CHURN' },
    { id: 'audit', label: 'Audit Trail', icon: FileCheck2, badge: 'SIG' },
    { id: 'settings', label: 'System Settings', icon: Sliders },
  ];

  return (
    <aside className="w-64 bg-[#1F2933] border-r border-[#2D3945] flex flex-col justify-between shrink-0 h-[calc(100vh-4rem)] sticky top-16 select-none overflow-y-auto">
      {/* Navigation List */}
      <div className="py-4 px-2 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-wider text-[#8295A5] border-b border-[#2D3945] mb-2 flex items-center justify-between font-semibold">
          <span>OPERATIONAL MODULES</span>
          <span className="text-[#A0AEC0]">v2.6-SIH</span>
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              disabled={tourRunning}
              className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs tracking-wide transition-colors text-left ${
                isActive
                  ? 'bg-[#15202B] text-white font-semibold border-l-2 border-[#526B82]'
                  : 'text-[#CBD5E1] hover:text-white hover:bg-[#2A3744]'
              }`}
            >
              <div className="flex items-center space-x-2.5 truncate">
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-white' : 'text-[#8295A5]'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {/* Badge/Count */}
              {item.badge && (
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-semibold tracking-wider ${
                    item.badgeColor || 'bg-[#2A3744] text-[#E2E8F0] border border-[#3E4F60]'
                  }`}
                >
                  {item.badge}
                </span>
              )}
              {item.count && (
                <span className="text-[10px] text-[#8295A5] font-mono px-1">
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom DSSC / SIH Metadata Card */}
      <div className="p-3 m-2 rounded bg-[#15202B] border border-[#2D3945] text-[11px] font-mono text-[#9AA5B1] space-y-1.5">
        <div className="flex items-center justify-between text-[10px] text-white font-semibold uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <Terminal className="w-3 h-3 text-[#526B82]" /> SIH 2026 PS-26250
          </span>
          <span className="inline-block w-2 h-2 rounded-full bg-[#2E7D5B]" />
        </div>
        <p className="text-[10px] leading-relaxed text-[#CBD5E1]">
          <strong className="text-white">Ministry of Defence</strong> / DSSC
        </p>
        <div className="pt-1.5 border-t border-[#2D3945] flex items-center justify-between text-[9px] text-[#8295A5]">
          <span>Decision Engine:</span>
          <span className="text-[#4ADE80] font-semibold">ONLINE</span>
        </div>
      </div>
    </aside>
  );
}

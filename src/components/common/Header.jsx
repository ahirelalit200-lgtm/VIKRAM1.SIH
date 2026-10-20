// VIKRAM1 — Command Centre Top Header Bar (Realistic Defence Enterprise Theme)
import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  Activity,
  Bell,
  Play,
  RotateCcw,
  UserCheck,
  Radio,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';

export default function Header() {
  const {
    currentTime,
    userProfile,
    systemMetrics,
    demoMode,
    setDemoMode,
    notificationOpen,
    setNotificationOpen,
    notifications,
    tourRunning,
    tourStep,
    runAutomatedDemo,
    setIsAuthenticated,
  } = useApp();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-16 bg-white border-b border-[#D5DCE3] px-4 lg:px-6 flex items-center justify-between z-30 sticky top-0 shadow-sm">
      {/* Left: Branding & Organization */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-9 h-9 rounded bg-[#1E3A5F] text-white shrink-0">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-bold tracking-tight text-[#1E3A5F] flex items-center gap-1.5">
              VIKRAM<span className="text-[#526B82]">1</span>
            </h1>
            <span className="text-[10px] font-mono uppercase bg-[#EBF2F7] text-[#1E3A5F] px-2 py-0.5 rounded border border-[#CFDFEC] font-semibold">
              DSSC PS-26250
            </span>
          </div>
          <p className="text-[11px] text-[#60717D] tracking-tight hidden sm:block">
            AI-Assisted Dynamic Air Operations & Resource Optimisation
          </p>
        </div>
      </div>

      {/* Center: System Status & Telemetry Clock */}
      <div className="hidden md:flex items-center space-x-3">
        {/* Live Operational Status */}
        <div className="flex items-center space-x-2 px-2.5 py-1 rounded bg-[#EDF7F2] border border-[#C4E5D4]">
          <span className="w-2 h-2 rounded-full bg-[#2E7D5B]"></span>
          <span className="text-[11px] font-mono uppercase font-semibold text-[#2E7D5B] tracking-wide">
            SYSTEM STATUS: {systemMetrics.systemStatus}
          </span>
        </div>

        {/* Live Simulated Clock */}
        <div className="flex items-center space-x-2 px-2.5 py-1 rounded bg-[#F4F6F8] border border-[#D5DCE3] text-[#263238] font-mono text-xs">
          <Radio className="w-3.5 h-3.5 text-[#526B82]" />
          <span>{currentTime || '2026-10-20 10:45:00 IST'}</span>
        </div>

        {/* Demo Indicator */}
        <div className="hidden xl:flex items-center space-x-1.5 px-2 py-1 rounded bg-[#FFF8EB] border border-[#F5E1B5] text-[#B7791F] text-[10px] font-mono font-semibold tracking-wider">
          <AlertTriangle className="w-3 h-3 text-[#B7791F]" />
          <span>DEMO / SYNTHETIC DATA</span>
        </div>
      </div>

      {/* Right: Actions, Tour, Notifications, Profile */}
      <div className="flex items-center space-x-3">
        {/* RUN DEMO SCENARIO Button */}
        <button
          onClick={runAutomatedDemo}
          disabled={tourRunning}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded text-xs font-semibold tracking-wide transition-colors border shadow-sm ${
            tourRunning
              ? 'bg-[#EBF2F7] text-[#1E3A5F] border-[#CFDFEC] cursor-wait'
              : 'bg-[#1E3A5F] hover:bg-[#162C47] text-white border-[#1E3A5F]'
          }`}
          title="Executes automated 15-second decision lifecycle walkthrough"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{tourRunning ? `DEMO RUNNING (${tourStep}/11)` : 'RUN DEMO SCENARIO'}</span>
        </button>

        {/* Demo Mode Toggle */}
        <div className="hidden lg:flex items-center space-x-1.5 text-xs text-[#263238]">
          <span className="text-[11px] text-[#60717D] font-medium">DEMO:</span>
          <button
            onClick={() => setDemoMode(!demoMode)}
            className={`w-8 h-4 flex items-center rounded-full p-0.5 transition-colors ${
              demoMode ? 'bg-[#1E3A5F]' : 'bg-[#CBD5E1]'
            }`}
          >
            <div
              className={`bg-white w-3 h-3 rounded-full shadow-sm transform transition-transform ${
                demoMode ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setNotificationOpen(!notificationOpen)}
            className="p-1.5 rounded bg-white hover:bg-[#F4F6F8] border border-[#D5DCE3] text-[#526B82] hover:text-[#263238] transition-colors relative"
            title="System alerts & telemetry notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#B84242] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* User Profile Pill */}
        <div className="flex items-center space-x-2.5 pl-2 border-l border-[#D5DCE3]">
          <div className="w-8 h-8 rounded bg-[#1E3A5F] flex items-center justify-center text-xs font-bold text-white">
            RS
          </div>
          <div className="hidden xl:block text-left leading-tight">
            <div className="text-xs font-semibold text-[#263238]">
              {userProfile.name}
            </div>
            <div className="text-[10px] text-[#60717D] font-mono">
              DSSC OPS CONTROLLER
            </div>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-[10px] text-[#60717D] hover:text-[#B84242] font-mono ml-1 px-1.5 py-0.5 rounded hover:bg-[#FDF2F2] transition-colors"
            title="Switch User / Logout"
          >
            EXIT
          </button>
        </div>
      </div>
    </header>
  );
}

// VIKRAM1 — Command Centre Top Header Bar
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
    <header className="h-16 bg-[#060D1E]/95 border-b border-[#1A2D54] px-4 lg:px-6 flex items-center justify-between z-30 sticky top-0 backdrop-blur-md">
      {/* Left: Branding & Organization */}
      <div className="flex items-center space-x-3">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-400/40 text-cyan-400 shadow-glow-cyan">
          <Shield className="w-5 h-5 text-cyan-400" />
          <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#060D1E] animate-ping" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold tracking-wider font-display text-white flex items-center gap-1.5">
              VIKRAM<span className="text-cyan-400">1</span>
            </h1>
            <span className="text-[10px] font-mono uppercase bg-cyan-950/80 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
              DSSC PS-26250
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-mono tracking-tight hidden sm:block">
            AI-Assisted Dynamic Air Operations & Resource Optimisation
          </p>
        </div>
      </div>

      {/* Center: System Status & Telemetry Clock */}
      <div className="hidden md:flex items-center space-x-4">
        {/* Live Operational Status */}
        <div className="flex items-center space-x-2 px-3 py-1 rounded bg-[#09152C] border border-[#1E3466]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-mono uppercase font-semibold text-emerald-400 tracking-wide">
            SYSTEM STATUS: {systemMetrics.systemStatus}
          </span>
        </div>

        {/* Live Simulated Clock */}
        <div className="flex items-center space-x-2 px-3 py-1 rounded bg-[#09152C] border border-[#1E3466] text-cyan-300 font-mono text-xs">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>{currentTime || '2026-10-20 10:45:00 IST'}</span>
        </div>

        {/* Demo Indicator */}
        <div className="hidden xl:flex items-center space-x-1.5 px-2.5 py-1 rounded bg-amber-950/40 border border-amber-600/40 text-amber-300 text-[10px] font-mono tracking-wider">
          <AlertTriangle className="w-3 h-3 text-amber-400" />
          <span>DEMO / SYNTHETIC DATA</span>
        </div>
      </div>

      {/* Right: Actions, Tour, Notifications, Profile */}
      <div className="flex items-center space-x-3">
        {/* RUN DEMO SCENARIO Button (Key SIH Evaluator Feature) */}
        <button
          onClick={runAutomatedDemo}
          disabled={tourRunning}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded text-xs font-semibold font-mono tracking-wider transition-all duration-200 border ${
            tourRunning
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 animate-pulse cursor-wait'
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black border-cyan-300 shadow-glow-cyan'
          }`}
          title="Executes automated 15-second decision lifecycle walkthrough"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{tourRunning ? `DEMO RUNNING (${tourStep}/11)` : 'RUN DEMO SCENARIO'}</span>
        </button>

        {/* Demo Mode Toggle */}
        <div className="hidden lg:flex items-center space-x-1.5 text-xs text-slate-300 font-mono">
          <span className="text-[11px] text-slate-400">DEMO:</span>
          <button
            onClick={() => setDemoMode(!demoMode)}
            className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors ${
              demoMode ? 'bg-cyan-500' : 'bg-slate-700'
            }`}
          >
            <div
              className={`bg-[#060D1E] w-4 h-4 rounded-full shadow-md transform transition-transform ${
                demoMode ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setNotificationOpen(!notificationOpen)}
            className="p-2 rounded-lg bg-[#09152C] hover:bg-[#122448] border border-[#1E3466] text-slate-300 hover:text-cyan-400 transition-colors relative"
            title="System alerts & telemetry notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-cyan-500 text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* User Profile Pill */}
        <div className="flex items-center space-x-2.5 pl-2 border-l border-[#1A2D54]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-xs font-bold text-white border border-cyan-300/40">
            RS
          </div>
          <div className="hidden xl:block text-left leading-tight">
            <div className="text-xs font-semibold text-slate-200 font-mono flex items-center gap-1">
              {userProfile.name}
            </div>
            <div className="text-[10px] text-cyan-400/80 font-mono">
              DSSC OPS CONTROLLER
            </div>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-[10px] text-slate-400 hover:text-red-400 font-mono ml-1 px-1.5 py-0.5 rounded hover:bg-red-950/30 transition-colors"
            title="Switch User / Logout"
          >
            EXIT
          </button>
        </div>
      </div>
    </header>
  );
}

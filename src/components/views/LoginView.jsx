// VIKRAM1 — Landing / Command Portal Login Screen
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Lock, User, Terminal, ChevronRight, AlertTriangle, Key } from 'lucide-react';

export default function LoginView() {
  const { setIsAuthenticated, userProfile } = useApp();
  const [userId, setUserId] = useState('DSSC-AF-26250');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState('DSSC Operations Controller');

  const handleLogin = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  return (
    <div className="min-h-screen bg-[#040812] bg-tactical-grid flex flex-col justify-between p-4 sm:p-6 text-slate-100 font-mono relative overflow-hidden select-none">
      {/* Ambient background glow and scanlines */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Banner */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <Shield className="w-4 h-4 text-cyan-400" />
          <span className="font-bold tracking-wider text-slate-200">
            MINISTRY OF DEFENCE • DEFENCE SERVICES STAFF COLLEGE
          </span>
        </div>
        <div className="px-2.5 py-1 rounded bg-[#09152B] border border-[#1A2D54] text-[10px] text-cyan-300">
          PROBLEM STATEMENT ID: 26250
        </div>
      </div>

      {/* Central Login Card */}
      <div className="max-w-md w-full mx-auto z-10 my-auto">
        <div className="bg-[#081226]/95 border border-[#1E3466] rounded-2xl p-6 sm:p-8 shadow-glow-cyan backdrop-blur-xl reticle-box">
          {/* Emblem & Branding */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-600/30 border-2 border-cyan-400/60 flex items-center justify-center mx-auto mb-3 shadow-glow-cyan">
              <Shield className="w-8 h-8 text-cyan-400" />
            </div>

            <h1 className="text-3xl font-extrabold font-display tracking-widest text-white">
              VIKRAM<span className="text-cyan-400">1</span>
            </h1>

            <p className="text-xs font-semibold text-cyan-300 mt-1 uppercase tracking-wider">
              Dynamic Air Operations & Resource Optimisation
            </p>

            <div className="mt-2 text-[10px] text-slate-400 bg-[#060D1E] py-1 px-3 rounded-full inline-block border border-[#15274C]">
              Command & Decision Support Portal
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[11px] text-slate-300 font-bold uppercase tracking-wider block mb-1">
                OPERATIONAL DESK / USER ID:
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full bg-[#050B17] border border-[#1E3466] focus:border-cyan-400 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                  placeholder="Enter User ID"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-slate-300 font-bold uppercase tracking-wider block mb-1">
                AUTHENTICATION CODE:
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#050B17] border border-[#1E3466] focus:border-cyan-400 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors tracking-widest"
                  placeholder="Enter Password"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-slate-300 font-bold uppercase tracking-wider block mb-1">
                DEMO OPERATIONAL ROLE:
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full bg-[#050B17] border border-[#1E3466] focus:border-cyan-400 rounded-lg px-3 py-2.5 text-xs text-slate-200 focus:outline-none"
              >
                <option value="DSSC Operations Controller">DSSC Operations Controller (Full Access)</option>
                <option value="Base Alpha Wing Commander">Base Alpha Wing Commander (Tactical Sign-off)</option>
                <option value="HQ AI Strategy Evaluator">HQ AI Strategy Evaluator (SIH Jury View)</option>
              </select>
            </div>

            {/* Quick Demo Access Note */}
            <div className="p-2.5 rounded bg-cyan-950/40 border border-cyan-500/30 text-[10px] text-cyan-200/90 leading-tight">
              ⚡ <strong>SIH 2026 Presentation Mode:</strong> Credentials pre-loaded for instant evaluator walkthrough.
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full mt-2 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs uppercase tracking-widest transition-all duration-200 flex items-center justify-center space-x-2 shadow-glow-cyan"
            >
              <span>ENTER COMMAND CENTRE</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>

          {/* Synthetic Data Disclaimer */}
          <div className="mt-5 pt-3 border-t border-[#142344] text-[9.5px] text-slate-500 text-center flex items-center justify-center gap-1.5">
            <AlertTriangle className="w-3 h-3 text-amber-500 shrink-0" />
            <span>100% Synthetic Data & Demonstrative Tactical Logic</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-500 z-10 border-t border-[#142344] pt-3">
        <span>Smart India Hackathon 2026 • Air Power – Dynamic Air Operations & Resource Optimisation</span>
        <span>SECURITY LEVEL: UNCLASSIFIED SIMULATOR</span>
      </div>
    </div>
  );
}

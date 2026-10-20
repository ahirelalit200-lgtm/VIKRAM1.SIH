// VIKRAM1 — Landing / Command Portal Login Screen (Realistic Defence Enterprise Theme)
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Lock, User, ChevronRight, AlertTriangle } from 'lucide-react';

export default function LoginView() {
  const { setIsAuthenticated } = useApp();
  const [userId, setUserId] = useState('DSSC-AF-26250');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState('DSSC Operations Controller');

  const handleLogin = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] flex flex-col justify-between p-4 sm:p-6 text-[#263238] font-sans select-none">
      {/* Top Banner */}
      <div className="flex items-center justify-between z-10 border-b border-[#D5DCE3] pb-3">
        <div className="flex items-center space-x-2 text-xs text-[#60717D]">
          <Shield className="w-4 h-4 text-[#1E3A5F]" />
          <span className="font-bold tracking-wide text-[#1E3A5F]">
            MINISTRY OF DEFENCE • DEFENCE SERVICES STAFF COLLEGE
          </span>
        </div>
        <div className="px-2.5 py-1 rounded bg-white border border-[#D5DCE3] text-[10px] text-[#526B82] font-mono font-semibold">
          PROBLEM STATEMENT ID: 26250
        </div>
      </div>

      {/* Central Login Card */}
      <div className="max-w-md w-full mx-auto my-auto">
        <div className="bg-white border border-[#D5DCE3] rounded-md p-6 sm:p-8 shadow-sm">
          {/* Emblem & Branding */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded bg-[#1E3A5F] text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
              <Shield className="w-6 h-6 text-white" />
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-[#1E3A5F]">
              VIKRAM<span className="text-[#526B82]">1</span>
            </h1>

            <p className="text-xs font-semibold text-[#526B82] mt-1 uppercase tracking-wider">
              Dynamic Air Operations & Resource Optimisation
            </p>

            <div className="mt-2 text-[10px] text-[#60717D] bg-[#F4F6F8] py-1 px-3 rounded inline-block border border-[#D5DCE3] font-mono">
              Command & Decision Support Portal
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[11px] text-[#263238] font-semibold uppercase tracking-wider block mb-1">
                OPERATIONAL DESK / USER ID:
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#60717D] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full bg-white border border-[#D5DCE3] focus:border-[#1E3A5F] rounded pl-9 pr-3 py-2 text-xs text-[#263238] placeholder-[#9AA5B1] focus:outline-none transition-colors font-mono"
                  placeholder="Enter User ID"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-[#263238] font-semibold uppercase tracking-wider block mb-1">
                AUTHENTICATION CODE:
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#60717D] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-[#D5DCE3] focus:border-[#1E3A5F] rounded pl-9 pr-3 py-2 text-xs text-[#263238] placeholder-[#9AA5B1] focus:outline-none transition-colors font-mono tracking-widest"
                  placeholder="Enter Password"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-[#263238] font-semibold uppercase tracking-wider block mb-1">
                DEMO OPERATIONAL ROLE:
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full bg-white border border-[#D5DCE3] focus:border-[#1E3A5F] rounded px-3 py-2 text-xs text-[#263238] focus:outline-none"
              >
                <option value="DSSC Operations Controller">DSSC Operations Controller (Full Access)</option>
                <option value="Base Alpha Wing Commander">Base Alpha Wing Commander (Tactical Sign-off)</option>
                <option value="HQ AI Strategy Evaluator">HQ AI Strategy Evaluator (SIH Jury View)</option>
              </select>
            </div>

            {/* Quick Demo Access Note */}
            <div className="p-2.5 rounded bg-[#EDF7F2] border border-[#C4E5D4] text-[10px] text-[#2E7D5B] leading-tight">
              <strong>Evaluation Note:</strong> Pre-loaded credentials configured for Smart India Hackathon jury review.
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full mt-2 py-2.5 rounded bg-[#1E3A5F] hover:bg-[#162C47] text-white font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 shadow-sm"
            >
              <span>ENTER COMMAND CENTRE</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>

          {/* Synthetic Data Disclaimer */}
          <div className="mt-5 pt-3 border-t border-[#E5EAEF] text-[10px] text-[#60717D] text-center flex items-center justify-center gap-1.5 font-mono">
            <AlertTriangle className="w-3.5 h-3.5 text-[#B7791F] shrink-0" />
            <span>100% Synthetic & Demonstrative Tactical Data</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] text-[#60717D] border-t border-[#D5DCE3] pt-3 font-mono">
        <span>Smart India Hackathon 2026 • Air Power – Dynamic Air Operations & Resource Optimisation</span>
        <span>SECURITY LEVEL: UNCLASSIFIED SIMULATOR</span>
      </div>
    </div>
  );
}

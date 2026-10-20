// VIKRAM1 — Page 10: System Settings & Engine Diagnostics
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sliders,
  Radio,
  Cpu,
  Database,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  HardDrive
} from 'lucide-react';

export default function SystemSettings() {
  const {
    demoMode,
    setDemoMode,
    userProfile,
    setUserProfile,
    systemMetrics,
    addNotification,
    addAuditLog,
  } = useApp();

  const [refreshInterval, setRefreshInterval] = useState('2.0s');
  const [solverTimeout, setSolverTimeout] = useState('1200ms');
  const [minConfidence, setMinConfidence] = useState(85);
  const [strictFdlMode, setStrictFdlMode] = useState(true);
  const [churnPenaltyWeight, setChurnPenaltyWeight] = useState(75);

  const handleSave = () => {
    addNotification('INFO', 'System Configuration Saved', 'Telemetry parameters and solver thresholds synchronized.');
    addAuditLog('CONFIG_SERVICE', 'System Parameters Updated', `Min Confidence: ${minConfidence}%, Churn Penalty: ${churnPenaltyWeight}%`, 'UPDATED');
  };

  return (
    <div className="space-y-5 animate-fadeIn font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#1A2D54] gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold font-display tracking-wider text-white">
              SYSTEM CONFIGURATION & DIAGNOSTICS
            </h2>
            <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
              OPERATIONAL TUNING
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Configure decision engine solver timeouts, multi-source ingestion rates, and synthetic simulation parameters.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs tracking-wider transition-all shadow-glow-cyan"
        >
          SAVE CONFIGURATION
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Telemetry & Ingestion Settings */}
        <div className="bg-[#091224]/90 border border-[#1A2D54] rounded-xl p-5 reticle-box space-y-4">
          <div className="flex items-center space-x-2 pb-2 border-b border-[#142344]">
            <Database className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              TELEMETRY & INGESTION BUS SETTINGS
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-300 block mb-1">DATA FUSION REFRESH INTERVAL:</label>
              <select
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(e.target.value)}
                className="w-full bg-[#050C1B] border border-[#1A2E56] rounded-lg p-2 text-slate-200"
              >
                <option value="1.0s">1.0s (Ultra High Frequency)</option>
                <option value="2.0s">2.0s (Nominal Tactical Baseline)</option>
                <option value="5.0s">5.0s (Bandwidth Constrained)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 block mb-1">AI CONSTRAINT SOLVER TIMEOUT:</label>
              <select
                value={solverTimeout}
                onChange={(e) => setSolverTimeout(e.target.value)}
                className="w-full bg-[#050C1B] border border-[#1A2E56] rounded-lg p-2 text-slate-200"
              >
                <option value="500ms">500ms (Rapid Heuristic)</option>
                <option value="1200ms">1200ms (Full Branch & Bound ILP)</option>
                <option value="3000ms">3000ms (Exhaustive Combinatorial)</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-[#060D1E] border border-[#142548]">
              <div>
                <div className="font-bold text-white text-xs">STRICT FLIGHT DUTY LIMIT (FDL) ENFORCEMENT</div>
                <div className="text-[10px] text-slate-400">Hard reject pilots violating mandatory 8h rest intervals</div>
              </div>
              <input
                type="checkbox"
                checked={strictFdlMode}
                onChange={(e) => setStrictFdlMode(e.target.checked)}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* AI Solver Thresholds */}
        <div className="bg-[#091224]/90 border border-[#1A2D54] rounded-xl p-5 reticle-box space-y-4">
          <div className="flex items-center space-x-2 pb-2 border-b border-[#142344]">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              AI ENGINE SOLVER THRESHOLDS
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>MINIMUM PLAN CONFIDENCE CUTOFF:</span>
                <span className="text-cyan-400 font-bold">{minConfidence}%</span>
              </div>
              <input
                type="range"
                min="70"
                max="98"
                value={minConfidence}
                onChange={(e) => setMinConfidence(Number(e.target.value))}
                className="w-full accent-cyan-400 h-1.5 bg-[#050C1B] rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-slate-500">
                Plans below this confidence ceiling are held for human review
              </span>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>PLAN CHURN PENALTY WEIGHT:</span>
                <span className="text-cyan-400 font-bold">{churnPenaltyWeight}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={churnPenaltyWeight}
                onChange={(e) => setChurnPenaltyWeight(Number(e.target.value))}
                className="w-full accent-cyan-400 h-1.5 bg-[#050C1B] rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-slate-500">
                Higher penalty discourages reallocating already-briefed aircrew
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#060D1E] border border-[#142548] flex items-center justify-between">
              <div>
                <div className="font-bold text-white text-xs">DEMO SYNTHETIC ENVIRONMENT MODE</div>
                <div className="text-[10px] text-slate-400">Forces 100% synthetic fictitious air operational data</div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                ENABLED
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Node Diagnostics & System Health */}
      <div className="bg-[#091224]/90 border border-[#1A2D54] rounded-xl p-5 reticle-box space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#142344]">
          <div className="flex items-center space-x-2">
            <Radio className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              VIKRAM1 ARCHITECTURE NODE HEALTH
            </h3>
          </div>
          <span className="text-[10px] text-emerald-400">7/7 NODES ACTIVE</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-[#060D1E] border border-[#142548]">
            <span className="text-slate-500 text-[10px]">INGESTION BROKER:</span>
            <div className="text-emerald-400 font-bold mt-1">ONLINE (0.4% CPU)</div>
          </div>
          <div className="p-3 rounded-lg bg-[#060D1E] border border-[#142548]">
            <span className="text-slate-500 text-[10px]">CONSTRAINT ENGINE:</span>
            <div className="text-emerald-400 font-bold mt-1">NOMINAL (18ms)</div>
          </div>
          <div className="p-3 rounded-lg bg-[#060D1E] border border-[#142548]">
            <span className="text-slate-500 text-[10px]">ILP OPTIMIZER:</span>
            <div className="text-emerald-400 font-bold mt-1">CONVERGED (340ms)</div>
          </div>
          <div className="p-3 rounded-lg bg-[#060D1E] border border-[#142548]">
            <span className="text-slate-500 text-[10px]">AUDIT DIGEST ENGINE:</span>
            <div className="text-emerald-400 font-bold mt-1">SYNCHRONIZED</div>
          </div>
        </div>
      </div>
    </div>
  );
}

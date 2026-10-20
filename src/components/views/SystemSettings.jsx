// VIKRAM1 — Page 10: System Settings & Engine Diagnostics (Realistic Defence Enterprise Theme)
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
    <div className="space-y-4 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#D5DCE3] gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold tracking-tight text-[#1E3A5F]">
              SYSTEM CONFIGURATION & DIAGNOSTICS
            </h2>
            <span className="text-[10px] bg-[#EBF2F7] text-[#1E3A5F] px-2 py-0.5 rounded border border-[#CFDFEC] font-semibold font-mono">
              OPERATIONAL TUNING
            </span>
          </div>
          <p className="text-xs text-[#60717D]">
            Configure decision engine solver timeouts, multi-source ingestion rates, and synthetic simulation parameters.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-1.5 rounded bg-[#1E3A5F] hover:bg-[#162C47] text-white font-semibold text-xs tracking-wide transition-colors shadow-sm"
        >
          SAVE CONFIGURATION
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Telemetry & Ingestion Settings */}
        <div className="bg-white border border-[#D5DCE3] rounded-md p-4 shadow-sm space-y-3.5">
          <div className="flex items-center space-x-2 pb-2 border-b border-[#E5EAEF]">
            <Database className="w-4 h-4 text-[#1E3A5F]" />
            <h3 className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wide">
              TELEMETRY & INGESTION BUS SETTINGS
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-[#263238] font-semibold block mb-1">DATA FUSION REFRESH INTERVAL:</label>
              <select
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(e.target.value)}
                className="w-full bg-white border border-[#D5DCE3] rounded p-2 text-[#263238] focus:border-[#1E3A5F] focus:outline-none"
              >
                <option value="1.0s">1.0s (Ultra High Frequency)</option>
                <option value="2.0s">2.0s (Nominal Tactical Baseline)</option>
                <option value="5.0s">5.0s (Bandwidth Constrained)</option>
              </select>
            </div>

            <div>
              <label className="text-[#263238] font-semibold block mb-1">AI CONSTRAINT SOLVER TIMEOUT:</label>
              <select
                value={solverTimeout}
                onChange={(e) => setSolverTimeout(e.target.value)}
                className="w-full bg-white border border-[#D5DCE3] rounded p-2 text-[#263238] focus:border-[#1E3A5F] focus:outline-none"
              >
                <option value="500ms">500ms (Rapid Heuristic)</option>
                <option value="1200ms">1200ms (Full Branch & Bound ILP)</option>
                <option value="3000ms">3000ms (Exhaustive Combinatorial)</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3 rounded bg-[#F8FAFC] border border-[#E5EAEF]">
              <div>
                <div className="font-semibold text-[#263238] text-xs">STRICT FLIGHT DUTY LIMIT (FDL) ENFORCEMENT</div>
                <div className="text-[10px] text-[#60717D]">Hard reject pilots violating mandatory 8h rest intervals</div>
              </div>
              <input
                type="checkbox"
                checked={strictFdlMode}
                onChange={(e) => setStrictFdlMode(e.target.checked)}
                className="w-4 h-4 accent-[#1E3A5F] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* AI Solver Thresholds */}
        <div className="bg-white border border-[#D5DCE3] rounded-md p-4 shadow-sm space-y-3.5">
          <div className="flex items-center space-x-2 pb-2 border-b border-[#E5EAEF]">
            <Cpu className="w-4 h-4 text-[#1E3A5F]" />
            <h3 className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wide">
              AI ENGINE SOLVER THRESHOLDS
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between text-[#263238] mb-1">
                <span className="font-semibold">MINIMUM PLAN CONFIDENCE CUTOFF:</span>
                <span className="text-[#1E3A5F] font-bold font-mono">{minConfidence}%</span>
              </div>
              <input
                type="range"
                min="70"
                max="98"
                value={minConfidence}
                onChange={(e) => setMinConfidence(Number(e.target.value))}
                className="w-full accent-[#1E3A5F] h-1.5 bg-[#E2E8F0] rounded cursor-pointer"
              />
              <span className="text-[10px] text-[#60717D]">
                Plans below this confidence ceiling are held for human review
              </span>
            </div>

            <div>
              <div className="flex justify-between text-[#263238] mb-1">
                <span className="font-semibold">PLAN CHURN PENALTY WEIGHT:</span>
                <span className="text-[#1E3A5F] font-bold font-mono">{churnPenaltyWeight}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={churnPenaltyWeight}
                onChange={(e) => setChurnPenaltyWeight(Number(e.target.value))}
                className="w-full accent-[#1E3A5F] h-1.5 bg-[#E2E8F0] rounded cursor-pointer"
              />
              <span className="text-[10px] text-[#60717D]">
                Higher penalty discourages reallocating already-briefed aircrew
              </span>
            </div>

            <div className="p-3 rounded bg-[#F8FAFC] border border-[#E5EAEF] flex items-center justify-between">
              <div>
                <div className="font-semibold text-[#263238] text-xs">DEMO SYNTHETIC ENVIRONMENT MODE</div>
                <div className="text-[10px] text-[#60717D]">Forces 100% synthetic fictitious air operational data</div>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#EDF7F2] text-[#2E7D5B] text-xs font-bold border border-[#C4E5D4] font-mono">
                ENABLED
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Node Diagnostics & System Health */}
      <div className="bg-white border border-[#D5DCE3] rounded-md p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#E5EAEF]">
          <div className="flex items-center space-x-2">
            <Radio className="w-4 h-4 text-[#2E7D5B]" />
            <h3 className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wide">
              SYSTEM ARCHITECTURE NODE HEALTH
            </h3>
          </div>
          <span className="text-[10px] text-[#2E7D5B] font-mono font-semibold">7/7 NODES ACTIVE</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded bg-[#F8FAFC] border border-[#E5EAEF]">
            <span className="text-[#60717D] text-[10px] font-sans">INGESTION BROKER:</span>
            <div className="text-[#2E7D5B] font-bold mt-1">ONLINE (0.4% CPU)</div>
          </div>
          <div className="p-3 rounded bg-[#F8FAFC] border border-[#E5EAEF]">
            <span className="text-[#60717D] text-[10px] font-sans">CONSTRAINT ENGINE:</span>
            <div className="text-[#2E7D5B] font-bold mt-1">NOMINAL (18ms)</div>
          </div>
          <div className="p-3 rounded bg-[#F8FAFC] border border-[#E5EAEF]">
            <span className="text-[#60717D] text-[10px] font-sans">ILP OPTIMIZER:</span>
            <div className="text-[#2E7D5B] font-bold mt-1">CONVERGED (340ms)</div>
          </div>
          <div className="p-3 rounded bg-[#F8FAFC] border border-[#E5EAEF]">
            <span className="text-[#60717D] text-[10px] font-sans">AUDIT DIGEST:</span>
            <div className="text-[#2E7D5B] font-bold mt-1">SYNCHRONIZED</div>
          </div>
        </div>
      </div>
    </div>
  );
}

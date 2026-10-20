// VIKRAM1 — Page 2: Mission Planner & Constraint Engine
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DecisionEngineService } from '../../services/decisionEngineService';
import { SYNTHETIC_WEATHER } from '../../data/mockData';
import {
  Compass,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Play,
  RotateCcw,
  Zap,
  Plane,
  Users,
  Clock,
  Fuel,
  CloudSun,
  Cpu,
  FileSignature
} from 'lucide-react';

export default function MissionPlanner() {
  const {
    activePlan,
    setActivePlan,
    setExplainModalOpen,
    setApprovalModalOpen,
    planApproved,
    addAuditLog,
    addNotification,
  } = useApp();

  // Synthetic Scenario Creation State
  const [missionName, setMissionName] = useState('Scenario Alpha-07');
  const [priority, setPriority] = useState('High');
  const [missionProfile, setMissionProfile] = useState('Combat Air Patrol (CAP)');
  const [requiredAircraft, setRequiredAircraft] = useState(4);
  const [requiredCrew, setRequiredCrew] = useState(8);
  const [fuelReq, setFuelReq] = useState('Medium (14,200 kg)');
  const [timeWindow, setTimeWindow] = useState('10:30 – 13:00 IST');

  // Solver States
  const [evaluating, setEvaluating] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [constraintChecks, setConstraintChecks] = useState([
    { id: 'c1', name: 'Aircraft Availability & Airworthiness', status: 'PASS', score: 98, note: '4/4 Multi-role assets airworthy' },
    { id: 'c2', name: 'Crew Flight Duty Limitation (FDL)', status: 'PASS', score: 96, note: 'All designated crew have >8h rest balance' },
    { id: 'c3', name: 'Scheduled Maintenance Window', status: 'PASS', score: 92, note: 'Zero airframe inspection overlaps' },
    { id: 'c4', name: 'Airspace Sector Restrictions', status: 'WARNING', score: 84, note: 'Corridor Alpha clear; Sector B weather monitored' },
    { id: 'c5', name: 'Weather Threshold & Crosswinds', status: 'PASS', score: 95, note: 'Visibility 10km, wind within safe crosswind envelope' },
    { id: 'c6', name: 'Fuel Reserves & Turnaround Buffer', status: 'PASS', score: 94, note: 'Base Alpha fuel hydrant pressure at 94%' },
  ]);

  const [recommendationReady, setRecommendationReady] = useState(true);

  // Trigger Feasibility Analysis
  const handleRunFeasibility = async () => {
    setEvaluating(true);
    addAuditLog('VIKRAM1_ENGINE', 'Manual Feasibility Analysis Triggered', `Evaluated parameters for ${missionName}`, 'VERIFIED');
    const result = await DecisionEngineService.runFeasibilityAnalysis({ priority, requiredAircraft, requiredCrew });
    setConstraintChecks(result.constraints);
    setEvaluating(false);
    addNotification('AI', 'Feasibility Check Completed', `All hard constraints passed for ${missionName}.`);
  };

  // Trigger AI Recommendation
  const handleGenerateRecommendation = async () => {
    setGenerating(true);
    const rec = await DecisionEngineService.generateRecommendation({ priority, requiredAircraft });
    setActivePlan(rec);
    setGenerating(false);
    setRecommendationReady(true);
    addAuditLog('VIKRAM1_ENGINE', 'Optimal Mission Plan Generated', `Generated Plan Alpha with 96% feasibility and +14% efficiency`, 'OPTIMAL');
    addNotification('AI', 'Optimal Recommendation Ready', 'Plan Alpha synthesized on the Pareto efficiency frontier.');
  };

  return (
    <div className="space-y-5 animate-fadeIn font-mono">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#1A2D54] gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold font-display tracking-wider text-white">
              SYNTHETIC MISSION PLANNER
            </h2>
            <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
              CONSTRAINT ENGINE
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Define scenario boundaries, execute real-time constraint satisfiability checks, and generate explainable allocation plans.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleRunFeasibility}
            disabled={evaluating}
            className="px-3.5 py-1.5 rounded-lg bg-[#0C1B3B] hover:bg-[#122752] border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-all flex items-center space-x-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>{evaluating ? 'SOLVING...' : 'RUN FEASIBILITY ANALYSIS'}</span>
          </button>
          <button
            onClick={handleGenerateRecommendation}
            disabled={generating}
            className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold tracking-wider transition-all flex items-center space-x-1.5 shadow-glow-cyan"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>{generating ? 'OPTIMISING...' : 'GENERATE RECOMMENDATION'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Synthetic Scenario Formulation (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#091224]/90 border border-[#1A2D54] rounded-xl p-4 reticle-box space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#142344]">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                SCENARIO CONFIGURATION PARAMETERS
              </span>
              <span className="text-[10px] text-slate-400">SYNTHETIC INPUT</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">MISSION NAME / IDENTIFIER:</label>
                <input
                  type="text"
                  value={missionName}
                  onChange={(e) => setMissionName(e.target.value)}
                  className="w-full bg-[#050C1B] border border-[#1A2E56] rounded-lg px-3 py-2 text-cyan-300 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">PRIORITY LEVEL:</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full bg-[#050C1B] border border-[#1A2E56] rounded-lg px-2.5 py-2 text-slate-200 focus:outline-none"
                  >
                    <option value="Routine">Routine</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">PROFILE TYPE:</label>
                  <select
                    value={missionProfile}
                    onChange={(e) => setMissionProfile(e.target.value)}
                    className="w-full bg-[#050C1B] border border-[#1A2E56] rounded-lg px-2.5 py-2 text-slate-200 focus:outline-none"
                  >
                    <option value="Combat Air Patrol (CAP)">Combat Air Patrol (CAP)</option>
                    <option value="Reconnaissance Sortie">Reconnaissance Sortie</option>
                    <option value="Tactical Escort">Tactical Escort</option>
                    <option value="Quick Reaction Alert">Quick Reaction Alert</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">REQUIRED AIRCRAFT:</label>
                  <div className="flex items-center space-x-2">
                    <Plane className="w-4 h-4 text-cyan-400 shrink-0" />
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={requiredAircraft}
                      onChange={(e) => setRequiredAircraft(Number(e.target.value))}
                      className="w-full bg-[#050C1B] border border-[#1A2E56] rounded-lg px-3 py-2 text-slate-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">REQUIRED CREW:</label>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-cyan-400 shrink-0" />
                    <input
                      type="number"
                      min="2"
                      max="24"
                      value={requiredCrew}
                      onChange={(e) => setRequiredCrew(Number(e.target.value))}
                      className="w-full bg-[#050C1B] border border-[#1A2E56] rounded-lg px-3 py-2 text-slate-200"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">FUEL REQUIREMENT:</label>
                  <div className="flex items-center space-x-2">
                    <Fuel className="w-4 h-4 text-cyan-400 shrink-0" />
                    <input
                      type="text"
                      value={fuelReq}
                      onChange={(e) => setFuelReq(e.target.value)}
                      className="w-full bg-[#050C1B] border border-[#1A2E56] rounded-lg px-3 py-2 text-slate-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">TIME WINDOW:</label>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                    <input
                      type="text"
                      value={timeWindow}
                      onChange={(e) => setTimeWindow(e.target.value)}
                      className="w-full bg-[#050C1B] border border-[#1A2E56] rounded-lg px-3 py-2 text-slate-200"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Environmental Conditions Summary Box */}
            <div className="p-3 rounded-lg bg-[#050C1B] border border-[#142548] text-xs space-y-1.5">
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1.5 font-bold text-slate-300">
                  <CloudSun className="w-4 h-4 text-cyan-400" />
                  CURRENT SYNTHETIC ENVIRONMENT:
                </span>
                <span className="text-emerald-400 font-bold">{SYNTHETIC_WEATHER.overall}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                <div>VISIBILITY: <span className="text-slate-200">{SYNTHETIC_WEATHER.visibility}</span></div>
                <div>WINDS: <span className="text-slate-200">{SYNTHETIC_WEATHER.wind}</span></div>
                <div>CLOUD CEILING: <span className="text-slate-200">{SYNTHETIC_WEATHER.cloudCeiling}</span></div>
                <div>TEMP: <span className="text-slate-200">{SYNTHETIC_WEATHER.temperature}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Hard Constraints & AI Recommendation (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* HARD CONSTRAINTS PANEL */}
          <div className="bg-[#091224]/90 border border-[#1A2D54] rounded-xl p-4 font-mono reticle-box">
            <div className="flex items-center justify-between pb-2 border-b border-[#142344] mb-3">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  HARD CONSTRAINTS EVALUATION
                </h3>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                ALL MANDATORY PASSED
              </span>
            </div>

            <div className="space-y-2">
              {constraintChecks.map((check) => (
                <div
                  key={check.id}
                  className="p-2.5 rounded-lg bg-[#060D1E] border border-[#142548] flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-200">{check.name}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">{check.note}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="text-slate-500 text-[11px]">{check.score}%</span>
                    <span
                      className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-wider border ${
                        check.status === 'PASS'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                          : check.status === 'WARNING'
                          ? 'bg-amber-950 text-amber-300 border-amber-500/40'
                          : 'bg-rose-950 text-rose-300 border-rose-500/40'
                      }`}
                    >
                      {check.status === 'PASS' ? '✓ PASS' : check.status === 'WARNING' ? '⚠ WARNING' : '✕ FAIL'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI RECOMMENDATION PANEL */}
          <div className="bg-[#09142B] border-2 border-cyan-400/70 rounded-xl p-5 shadow-glow-cyan reticle-box space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#1A2E56]">
              <div className="flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    AI RECOMMENDATION: {activePlan.name}
                  </h3>
                  <span className="text-[10px] text-cyan-300">
                    Synthetic Decision-Support Output (Confidence: 92%)
                  </span>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded bg-cyan-500 text-black text-xs font-bold">
                OPTIMAL CANDIDATE
              </span>
            </div>

            {/* Quote Demo Text */}
            <blockquote className="p-3 rounded-lg bg-[#060D1E] border-l-4 border-cyan-400 text-xs text-slate-300 italic leading-relaxed">
              "VIKRAM1 recommends Plan A because it satisfies all mandatory constraints while reducing resource utilisation by 14% and avoiding the detected environmental restriction."
            </blockquote>

            {/* 4 Performance Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-lg bg-[#060D1E] border border-[#142548]">
                <div className="text-slate-400 text-[10px] uppercase">Recommended Plan</div>
                <div className="text-cyan-400 font-bold text-base mt-0.5">{activePlan.id}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#060D1E] border border-[#142548]">
                <div className="text-slate-400 text-[10px] uppercase">Feasibility</div>
                <div className="text-emerald-400 font-bold text-base mt-0.5">96%</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#060D1E] border border-[#142548]">
                <div className="text-slate-400 text-[10px] uppercase">Resource Efficiency</div>
                <div className="text-cyan-300 font-bold text-base mt-0.5">+14%</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#060D1E] border border-[#142548]">
                <div className="text-slate-400 text-[10px] uppercase">Constraint Violations</div>
                <div className="text-emerald-400 font-bold text-base mt-0.5">0</div>
              </div>
            </div>

            {/* Assigned Assets Preview */}
            <div className="p-3 rounded-lg bg-[#060D1E] border border-[#142548] text-xs space-y-2">
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span className="font-bold text-white">ALLOCATED SQUADRON ASSETS (4-SHIP CAP):</span>
                <span>Base Alpha Co-location</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {activePlan.assignedAircraft?.map((a) => (
                  <div key={a.id} className="p-1.5 rounded bg-[#0A1630] border border-[#1A2E56] text-[10px]">
                    <div className="font-bold text-cyan-300">{a.id}</div>
                    <div className="text-slate-400 truncate">{a.role}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions: WHY THIS PLAN? & COMMANDER APPROVAL */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setExplainModalOpen(true)}
                className="px-4 py-2 rounded-lg bg-[#0E1D3D] hover:bg-[#142B59] border border-cyan-400/50 text-cyan-300 text-xs font-bold transition-all flex items-center space-x-1.5 shadow-glow-cyan"
              >
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <span>WHY THIS PLAN? (EXPLAINABILITY)</span>
              </button>

              <button
                onClick={() => setApprovalModalOpen(true)}
                className={`px-5 py-2 rounded-lg text-xs font-bold tracking-wider transition-all flex items-center space-x-1.5 ${
                  planApproved
                    ? 'bg-emerald-950 border border-emerald-500 text-emerald-300'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-glow-green'
                }`}
              >
                <FileSignature className="w-4 h-4" />
                <span>{planApproved ? 'VIEW SIGNED RECORD' : 'COMMANDER SIGN-OFF'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

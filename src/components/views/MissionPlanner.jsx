// VIKRAM1 — Page 2: Mission Planner & Constraint Engine (Realistic Defence Enterprise Theme)
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
    <div className="space-y-4 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#D5DCE3] gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold tracking-tight text-[#1E3A5F]">
              SYNTHETIC MISSION PLANNER
            </h2>
            <span className="text-[10px] bg-[#EBF2F7] text-[#1E3A5F] px-2 py-0.5 rounded border border-[#CFDFEC] font-semibold font-mono">
              CONSTRAINT ENGINE
            </span>
          </div>
          <p className="text-xs text-[#60717D]">
            Define scenario boundaries, execute real-time constraint satisfiability checks, and generate explainable allocation plans.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleRunFeasibility}
            disabled={evaluating}
            className="px-3 py-1.5 rounded bg-white hover:bg-[#F4F6F8] border border-[#D5DCE3] text-[#1E3A5F] text-xs font-semibold transition-colors flex items-center space-x-1.5 shadow-sm"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#526B82]" />
            <span>{evaluating ? 'SOLVING...' : 'RUN FEASIBILITY ANALYSIS'}</span>
          </button>
          <button
            onClick={handleGenerateRecommendation}
            disabled={generating}
            className="px-3.5 py-1.5 rounded bg-[#1E3A5F] hover:bg-[#162C47] text-white text-xs font-semibold tracking-wide transition-colors flex items-center space-x-1.5 shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>{generating ? 'OPTIMISING...' : 'GENERATE RECOMMENDATION'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Synthetic Scenario Formulation (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-[#D5DCE3] rounded-md p-4 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5EAEF]">
              <span className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wide flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#526B82]" />
                SCENARIO CONFIGURATION PARAMETERS
              </span>
              <span className="text-[10px] text-[#60717D] font-mono">SYNTHETIC INPUT</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[#263238] font-semibold block mb-1">MISSION NAME / IDENTIFIER:</label>
                <input
                  type="text"
                  value={missionName}
                  onChange={(e) => setMissionName(e.target.value)}
                  className="w-full bg-white border border-[#D5DCE3] focus:border-[#1E3A5F] rounded px-3 py-2 text-[#263238] focus:outline-none font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#263238] font-semibold block mb-1">PRIORITY LEVEL:</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full bg-white border border-[#D5DCE3] focus:border-[#1E3A5F] rounded px-2.5 py-2 text-[#263238] focus:outline-none"
                  >
                    <option value="Routine">Routine</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#263238] font-semibold block mb-1">PROFILE TYPE:</label>
                  <select
                    value={missionProfile}
                    onChange={(e) => setMissionProfile(e.target.value)}
                    className="w-full bg-white border border-[#D5DCE3] focus:border-[#1E3A5F] rounded px-2.5 py-2 text-[#263238] focus:outline-none"
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
                  <label className="text-[#263238] font-semibold block mb-1">REQUIRED AIRCRAFT:</label>
                  <div className="flex items-center space-x-2">
                    <Plane className="w-4 h-4 text-[#526B82] shrink-0" />
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={requiredAircraft}
                      onChange={(e) => setRequiredAircraft(Number(e.target.value))}
                      className="w-full bg-white border border-[#D5DCE3] rounded px-3 py-2 text-[#263238] font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[#263238] font-semibold block mb-1">REQUIRED CREW:</label>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-[#526B82] shrink-0" />
                    <input
                      type="number"
                      min="2"
                      max="24"
                      value={requiredCrew}
                      onChange={(e) => setRequiredCrew(Number(e.target.value))}
                      className="w-full bg-white border border-[#D5DCE3] rounded px-3 py-2 text-[#263238] font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#263238] font-semibold block mb-1">FUEL REQUIREMENT:</label>
                  <div className="flex items-center space-x-2">
                    <Fuel className="w-4 h-4 text-[#526B82] shrink-0" />
                    <input
                      type="text"
                      value={fuelReq}
                      onChange={(e) => setFuelReq(e.target.value)}
                      className="w-full bg-white border border-[#D5DCE3] rounded px-3 py-2 text-[#263238] font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[#263238] font-semibold block mb-1">TIME WINDOW:</label>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-[#526B82] shrink-0" />
                    <input
                      type="text"
                      value={timeWindow}
                      onChange={(e) => setTimeWindow(e.target.value)}
                      className="w-full bg-white border border-[#D5DCE3] rounded px-3 py-2 text-[#263238] font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Environmental Conditions Summary Box */}
            <div className="p-3 rounded bg-[#F8FAFC] border border-[#E5EAEF] text-xs space-y-1.5">
              <div className="flex items-center justify-between text-[#263238]">
                <span className="flex items-center gap-1.5 font-bold text-[#1E3A5F]">
                  <CloudSun className="w-4 h-4 text-[#526B82]" />
                  CURRENT ENVIRONMENT:
                </span>
                <span className="text-[#2E7D5B] font-bold font-mono">{SYNTHETIC_WEATHER.overall}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-[#60717D]">
                <div>VISIBILITY: <span className="text-[#263238] font-medium">{SYNTHETIC_WEATHER.visibility}</span></div>
                <div>WINDS: <span className="text-[#263238] font-medium">{SYNTHETIC_WEATHER.wind}</span></div>
                <div>CEILING: <span className="text-[#263238] font-medium">{SYNTHETIC_WEATHER.cloudCeiling}</span></div>
                <div>TEMP: <span className="text-[#263238] font-medium">{SYNTHETIC_WEATHER.temperature}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Hard Constraints & AI Recommendation (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* HARD CONSTRAINTS PANEL */}
          <div className="bg-white border border-[#D5DCE3] rounded-md p-4 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5EAEF] mb-3">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#2E7D5B]" />
                <h3 className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wide">
                  HARD CONSTRAINTS EVALUATION
                </h3>
              </div>
              <span className="text-[10px] text-[#2E7D5B] bg-[#EDF7F2] px-2 py-0.5 rounded border border-[#C4E5D4] font-semibold font-mono">
                MANDATORY BOUNDARIES PASSED
              </span>
            </div>

            <div className="space-y-2">
              {constraintChecks.map((check) => (
                <div
                  key={check.id}
                  className="p-2.5 rounded bg-[#F8FAFC] border border-[#E5EAEF] flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-[#263238]">{check.name}</span>
                    </div>
                    <p className="text-[10px] text-[#60717D]">{check.note}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="text-[#60717D] text-[11px] font-mono">{check.score}%</span>
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider border ${
                        check.status === 'PASS'
                          ? 'bg-[#EDF7F2] text-[#2E7D5B] border-[#C4E5D4]'
                          : check.status === 'WARNING'
                          ? 'bg-[#FFF8EB] text-[#B7791F] border-[#F5E1B5]'
                          : 'bg-[#FDF2F2] text-[#B84242] border-[#F7C8C8]'
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
          <div className="bg-white border border-[#D5DCE3] rounded-md p-4 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5EAEF]">
              <div className="flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-[#1E3A5F]" />
                <div>
                  <h3 className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wide">
                    RECOMMENDED PLAN: {activePlan.name}
                  </h3>
                  <span className="text-[10px] text-[#60717D] font-mono">
                    Decision-Support Synthesis (Confidence: 92%)
                  </span>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded bg-[#EBF2F7] text-[#1E3A5F] border border-[#CFDFEC] text-xs font-bold font-mono">
                OPTIMAL SELECTION
              </span>
            </div>

            {/* Quote Demo Text */}
            <blockquote className="p-3 rounded bg-[#F8FAFC] border-l-4 border-[#1E3A5F] text-xs text-[#263238] leading-relaxed">
              "VIKRAM1 recommends Plan A because it satisfies all mandatory constraints while reducing resource utilisation by 14% and avoiding the detected environmental restriction."
            </blockquote>

            {/* 4 Performance Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
              <div className="p-2.5 rounded bg-[#F8FAFC] border border-[#E5EAEF]">
                <div className="text-[#60717D] text-[10px] uppercase font-sans">Recommended Plan</div>
                <div className="text-[#1E3A5F] font-bold text-base mt-0.5">{activePlan.id}</div>
              </div>
              <div className="p-2.5 rounded bg-[#F8FAFC] border border-[#E5EAEF]">
                <div className="text-[#60717D] text-[10px] uppercase font-sans">Feasibility</div>
                <div className="text-[#2E7D5B] font-bold text-base mt-0.5">96%</div>
              </div>
              <div className="p-2.5 rounded bg-[#F8FAFC] border border-[#E5EAEF]">
                <div className="text-[#60717D] text-[10px] uppercase font-sans">Resource Efficiency</div>
                <div className="text-[#1E3A5F] font-bold text-base mt-0.5">+14%</div>
              </div>
              <div className="p-2.5 rounded bg-[#F8FAFC] border border-[#E5EAEF]">
                <div className="text-[#60717D] text-[10px] uppercase font-sans">Constraint Violations</div>
                <div className="text-[#2E7D5B] font-bold text-base mt-0.5">0</div>
              </div>
            </div>

            {/* Assigned Assets Preview */}
            <div className="p-3 rounded bg-[#F8FAFC] border border-[#E5EAEF] text-xs space-y-2">
              <div className="flex justify-between text-[#60717D] text-[11px]">
                <span className="font-bold text-[#263238]">ALLOCATED SQUADRON ASSETS (4-SHIP CAP):</span>
                <span>Base Alpha Co-location</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
                {activePlan.assignedAircraft?.map((a) => (
                  <div key={a.id} className="p-1.5 rounded bg-white border border-[#D5DCE3] text-[10px]">
                    <div className="font-bold text-[#1E3A5F]">{a.id}</div>
                    <div className="text-[#60717D] truncate font-sans">{a.role}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions: WHY THIS PLAN? & COMMANDER APPROVAL */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setExplainModalOpen(true)}
                className="px-3.5 py-1.5 rounded bg-white hover:bg-[#F4F6F8] border border-[#D5DCE3] text-[#1E3A5F] text-xs font-semibold transition-colors flex items-center space-x-1.5 shadow-sm"
              >
                <HelpCircle className="w-4 h-4 text-[#526B82]" />
                <span>WHY THIS PLAN? (EXPLAINABILITY)</span>
              </button>

              <button
                onClick={() => setApprovalModalOpen(true)}
                className={`px-4 py-1.5 rounded text-xs font-semibold tracking-wide transition-colors flex items-center space-x-1.5 shadow-sm ${
                  planApproved
                    ? 'bg-[#EDF7F2] border border-[#C4E5D4] text-[#2E7D5B]'
                    : 'bg-[#2E7D5B] hover:bg-[#25664A] text-white'
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

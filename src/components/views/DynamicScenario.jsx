// VIKRAM1 — Page 8: Dynamic Scenario, Retasking & Minimal-Churn Engine
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { REPLANNING_SCENARIOS, INITIAL_MISSION_PLAN_A } from '../../data/scenarioData';
import { DecisionEngineService } from '../../services/decisionEngineService';
import {
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  CloudRain,
  Plane,
  Users,
  ShieldAlert,
  ArrowRight,
  TrendingDown,
  Layers,
  Sparkles,
  RotateCcw,
  Clock,
  ShieldCheck,
  FileSignature
} from 'lucide-react';

export default function DynamicScenario() {
  const {
    activePlan,
    setActivePlan,
    planApproved,
    setApprovalModalOpen,
    addAuditLog,
    addNotification,
  } = useApp();

  // Scenario Execution State
  const [activeScenarioKey, setActiveScenarioKey] = useState(null);
  const [stage, setStage] = useState('IDLE'); // 'IDLE', 'CONDITION_DETECTED', 'RECHECKING', 'INVALID_DETECTED', 'REPLANNING', 'RESOLVED'
  const [scenarioData, setScenarioData] = useState(null);

  // Trigger dynamic scenario simulation
  const handleSimulateScenario = async (key) => {
    setActiveScenarioKey(key);
    const targetScenario = REPLANNING_SCENARIOS[key];
    setScenarioData(targetScenario);

    // Step 1: Condition Detected
    setStage('CONDITION_DETECTED');
    addAuditLog('SENSOR_TELEMETRY', 'Environmental/Resource Anomaly Detected', targetScenario.conditionDetected, 'ALERT');
    addNotification('ALERT', 'Operational Anomaly Detected', targetScenario.conditionDetected);

    // Step 2: Constraint Recheck
    setTimeout(() => {
      setStage('RECHECKING');
      addAuditLog('CONSTRAINT_ENGINE', 'Re-evaluating Active Boundaries', `Evaluating violation against ${targetScenario.violatedConstraint.id}`, 'WARNING');
    }, 1200);

    // Step 3: Plan Suboptimal Flag
    setTimeout(() => {
      setStage('INVALID_DETECTED');
      addAuditLog('DECISION_ENGINE', 'Baseline Plan Flagged Infeasible', 'Operational threshold exceeded. Dynamic replanning invoked.', 'INVALID');
    }, 2400);

    // Step 4: AI Replanning (Minimal-Churn Solver)
    setTimeout(() => {
      setStage('REPLANNING');
      addAuditLog('DECISION_ENGINE', 'Minimal-Churn Replanning Solver Triggered', 'Integer Linear Programming solver formulating localized repair plan...', 'COMPUTING');
    }, 3800);

    // Step 5: Resolved New Feasible Plan
    setTimeout(() => {
      setStage('RESOLVED');
      setActivePlan({
        ...INITIAL_MISSION_PLAN_A,
        ...targetScenario.newPlan,
      });
      addAuditLog('DECISION_ENGINE', `New Plan ${targetScenario.newPlan.id} Generated`, `Replanned with minimal churn index: ${targetScenario.newPlan.churn.churnIndex}`, 'OPTIMAL');
      addNotification('AI', 'Dynamic Replanning Complete', `Generated ${targetScenario.newPlan.name} with minimal churn.`);
    }, 5500);
  };

  const handleReset = () => {
    setActiveScenarioKey(null);
    setStage('IDLE');
    setScenarioData(null);
    setActivePlan(INITIAL_MISSION_PLAN_A);
    addAuditLog('SIMULATOR', 'Dynamic Scenario Reset', 'Restored to baseline Plan Alpha', 'RESET');
    addNotification('INFO', 'Scenario Reset', 'Restored baseline conditions for Scenario Alpha-07.');
  };

  return (
    <div className="space-y-5 animate-fadeIn font-mono">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#1A2D54] gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold font-display tracking-wider text-white">
              DYNAMIC RETASKING & MINIMAL-CHURN REPLANNING
            </h2>
            <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
              ADAPTIVE ENGINE
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Simulate operational disruptions, detect boundary invalidations, and trigger dynamic AI replanning with minimal organizational churn.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-3 py-1.5 rounded-lg bg-[#0E1A33] hover:bg-[#14264D] border border-[#1E3A70] text-slate-300 text-xs transition-colors flex items-center space-x-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>RESET SCENARIO</span>
        </button>
      </div>

      {/* Simulation Triggers Bar */}
      <div className="bg-[#091224]/90 border border-[#1A2D54] rounded-xl p-4 reticle-box space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            SELECT DISRUPTION SCENARIO TO SIMULATE:
          </span>
          <span className="text-[10px] text-slate-400">1-CLICK DEMO TESTBENCH</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => handleSimulateScenario('WEATHER_CHANGE')}
            disabled={stage !== 'IDLE' && stage !== 'RESOLVED'}
            className={`p-3 rounded-lg border text-left transition-all flex items-start space-x-2.5 ${
              activeScenarioKey === 'WEATHER_CHANGE'
                ? 'bg-amber-950/80 border-amber-500 text-amber-200 shadow-glow-cyan'
                : 'bg-[#060D1E] border-[#142548] text-slate-300 hover:border-amber-500/40'
            }`}
          >
            <CloudRain className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-xs text-white">Simulate Weather Change</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Convective storm in Sector B closes Corridor Alpha</div>
            </div>
          </button>

          <button
            onClick={() => handleSimulateScenario('AIRCRAFT_UNAVAILABLE')}
            disabled={stage !== 'IDLE' && stage !== 'RESOLVED'}
            className={`p-3 rounded-lg border text-left transition-all flex items-start space-x-2.5 ${
              activeScenarioKey === 'AIRCRAFT_UNAVAILABLE'
                ? 'bg-rose-950/80 border-rose-500 text-rose-200 shadow-glow-red'
                : 'bg-[#060D1E] border-[#142548] text-slate-300 hover:border-rose-500/40'
            }`}
          >
            <Plane className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-xs text-white">Simulate Aircraft Unavailable</div>
              <div className="text-[10px] text-slate-400 mt-0.5">VKR-101 hydraulic abort prior to takeoff</div>
            </div>
          </button>

          <button
            onClick={() => handleSimulateScenario('CREW_UNAVAILABLE')}
            disabled={stage !== 'IDLE' && stage !== 'RESOLVED'}
            className={`p-3 rounded-lg border text-left transition-all flex items-start space-x-2.5 ${
              activeScenarioKey === 'CREW_UNAVAILABLE'
                ? 'bg-purple-950/80 border-purple-500 text-purple-200'
                : 'bg-[#060D1E] border-[#142548] text-slate-300 hover:border-purple-500/40'
            }`}
          >
            <Users className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-xs text-white">Simulate Crew Unavailable</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Lead Pilot CRW-01 duty limit exceeded</div>
            </div>
          </button>

          <button
            onClick={() => handleSimulateScenario('AIRSPACE_RESTRICTION')}
            disabled={stage !== 'IDLE' && stage !== 'RESOLVED'}
            className={`p-3 rounded-lg border text-left transition-all flex items-start space-x-2.5 ${
              activeScenarioKey === 'AIRSPACE_RESTRICTION'
                ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200'
                : 'bg-[#060D1E] border-[#142548] text-slate-300 hover:border-cyan-500/40'
            }`}
          >
            <ShieldAlert className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-xs text-white">Simulate Airspace Restriction</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Emergency TFR enacted in Sector A Upper Band</div>
            </div>
          </button>
        </div>
      </div>

      {/* Dynamic Workflow Animation Pipeline */}
      <div className="bg-[#091224]/90 border border-[#1A2D54] rounded-xl p-4 reticle-box space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#142344]">
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            DYNAMIC REPLANNING WORKFLOW LIFECYCLE
          </span>
          <span className="text-[10px] text-cyan-300 font-bold">
            STAGE: {stage}
          </span>
        </div>

        {/* 6 Step Interactive Visual Pipeline */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-xs">
          {[
            { id: 'INITIAL', label: '1. INITIAL PLAN', desc: 'Plan A Baseline', active: stage !== 'IDLE' },
            { id: 'DETECTED', label: '2. CONDITION DETECTED', desc: 'Anomaly Flagged', active: stage === 'CONDITION_DETECTED' || stage === 'RECHECKING' || stage === 'INVALID_DETECTED' || stage === 'REPLANNING' || stage === 'RESOLVED' },
            { id: 'RECHECK', label: '3. CONSTRAINT RECHECK', desc: 'Boundary Breach', active: stage === 'RECHECKING' || stage === 'INVALID_DETECTED' || stage === 'REPLANNING' || stage === 'RESOLVED' },
            { id: 'INVALID', label: '4. PLAN SUBOPTIMAL', desc: 'Trigger Invalidation', active: stage === 'INVALID_DETECTED' || stage === 'REPLANNING' || stage === 'RESOLVED' },
            { id: 'REPLANNING', label: '5. AI REPLANNING', desc: 'Minimal-Churn Solver', active: stage === 'REPLANNING' || stage === 'RESOLVED' },
            { id: 'RESOLVED', label: '6. NEW FEASIBLE PLAN', desc: 'Ready for Sign-off', active: stage === 'RESOLVED' },
          ].map((st, i) => (
            <div
              key={st.id}
              className={`p-2.5 rounded-lg border text-left transition-all ${
                st.active
                  ? i === 5 && stage === 'RESOLVED'
                    ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200 shadow-glow-green'
                    : i === 4 && stage === 'REPLANNING'
                    ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 animate-pulse'
                    : i === 3 && stage === 'INVALID_DETECTED'
                    ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                    : 'bg-[#0E1B3B] border-cyan-500/40 text-slate-200'
                  : 'bg-[#060D1E] border-[#142344] text-slate-500 opacity-60'
              }`}
            >
              <div className="font-bold text-[11px] leading-tight mb-1">{st.label}</div>
              <div className="text-[9.5px] text-slate-400">{st.desc}</div>
            </div>
          ))}
        </div>

        {/* Dynamic Transition Banner */}
        {stage === 'CONDITION_DETECTED' && (
          <div className="p-3 rounded-lg bg-amber-950/60 border border-amber-500/60 text-amber-200 text-xs flex items-center justify-between animate-fadeIn">
            <span className="flex items-center gap-2 font-bold">
              <AlertTriangle className="w-4 h-4 text-amber-400 animate-bounce" />
              PLAN CHANGE DETECTED: {scenarioData?.conditionDetected}
            </span>
            <span className="text-[10px] text-amber-300">SENSOR TRIGGER</span>
          </div>
        )}

        {stage === 'REPLANNING' && (
          <div className="p-3 rounded-lg bg-cyan-950/60 border border-cyan-500/60 text-cyan-200 text-xs flex items-center justify-between animate-fadeIn">
            <span className="flex items-center gap-2 font-bold">
              <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" />
              VIKRAM1 IS RE-OPTIMISING... Localized repair solver preserving unchanged resources
            </span>
            <span className="text-[10px] text-cyan-400 font-bold">SOLVING ILP...</span>
          </div>
        )}

        {stage === 'RESOLVED' && (
          <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/60 text-emerald-200 text-xs flex items-center justify-between animate-fadeIn">
            <span className="flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              NEW RECOMMENDED PLAN GENERATED: {scenarioData?.newPlan.name}
            </span>
            <span className="text-[10px] text-emerald-400 font-bold">100% FEASIBLE</span>
          </div>
        )}
      </div>

      {/* MINIMAL-CHURN VISUALISATION: PLAN CHANGE ANALYSIS */}
      {stage === 'RESOLVED' && scenarioData && (
        <div className="bg-[#091224]/90 border-2 border-emerald-500/50 rounded-xl p-5 shadow-glow-green space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-[#1A2E56]">
            <div className="flex items-center space-x-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  PLAN CHANGE & MINIMAL-CHURN ANALYSIS
                </h3>
                <span className="text-xs text-emerald-300">
                  Targeted Heuristic: Maximizes operational stability by modifying only affected assets
                </span>
              </div>
            </div>

            <div className="px-3 py-1 rounded bg-emerald-950 border border-emerald-400 text-emerald-300 font-bold text-xs">
              {scenarioData.newPlan.churn.churnIndex}
            </div>
          </div>

          {/* Comparison Cards: Previous Plan vs New Plan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Previous Baseline */}
            <div className="p-4 rounded-xl bg-[#060D1E] border border-rose-500/30 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="font-bold text-slate-200">PREVIOUS PLAN</span>
                <span className="text-[10px] text-rose-400 font-bold">SUBOPTIMAL / VIOLATED</span>
              </div>
              <div className="text-sm font-bold text-white">{scenarioData.previousPlan}</div>
              <p className="text-[11px] text-slate-400">
                Invalidated by: <strong className="text-rose-300">{scenarioData.violatedConstraint.title}</strong>
              </p>
            </div>

            {/* New Re-Optimized Plan */}
            <div className="p-4 rounded-xl bg-[#08152E] border border-emerald-500/50 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="font-bold text-emerald-400">NEW RECOMMENDED PLAN</span>
                <span className="text-[10px] text-emerald-400 font-bold">✓ FEASIBLE ({scenarioData.newPlan.feasibilityScore}%)</span>
              </div>
              <div className="text-sm font-bold text-white">{scenarioData.newPlan.name}</div>
              <p className="text-[11px] text-slate-300">
                Routing: <span className="text-cyan-300">{scenarioData.newPlan.routing}</span>
              </p>
            </div>
          </div>

          {/* Changed vs Unchanged Resources Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Changed Resources (Red/Amber Border) */}
            <div className="p-3.5 rounded-xl bg-[#060D1E] border border-amber-500/40 space-y-2">
              <div className="flex items-center justify-between text-amber-400 text-xs font-bold uppercase">
                <span>CHANGED RESOURCES (MINIMAL DELTA)</span>
                <span className="text-[10px] bg-amber-950 px-2 py-0.5 rounded border border-amber-500/30">
                  LOW CHURN
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded bg-[#0A1429] border border-[#142344]">
                  <div className="text-slate-400 text-[10px]">AIRCRAFT</div>
                  <div className="text-amber-400 font-bold text-base">{scenarioData.newPlan.churn.changedAircraft}</div>
                </div>
                <div className="p-2 rounded bg-[#0A1429] border border-[#142344]">
                  <div className="text-slate-400 text-[10px]">CREW</div>
                  <div className="text-amber-400 font-bold text-base">{scenarioData.newPlan.churn.changedCrew}</div>
                </div>
                <div className="p-2 rounded bg-[#0A1429] border border-[#142344]">
                  <div className="text-slate-400 text-[10px]">FUEL DELTA</div>
                  <div className="text-amber-400 font-bold text-base">{scenarioData.newPlan.churn.fuelImpact}</div>
                </div>
              </div>
            </div>

            {/* Unchanged Resources (Green Border) */}
            <div className="p-3.5 rounded-xl bg-[#060D1E] border border-emerald-500/40 space-y-2">
              <div className="flex items-center justify-between text-emerald-400 text-xs font-bold uppercase">
                <span>UNCHANGED RESOURCES (PRESERVED LOGISTICS)</span>
                <span className="text-[10px] bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                  82% PRESERVED
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-2 rounded bg-[#0A1429] border border-[#142344]">
                  <div className="text-slate-400 text-[10px]">AIRCRAFT PRESERVED</div>
                  <div className="text-emerald-400 font-bold text-base">{scenarioData.newPlan.churn.unchangedAircraft}</div>
                </div>
                <div className="p-2 rounded bg-[#0A1429] border border-[#142344]">
                  <div className="text-slate-400 text-[10px]">CREW ROSTER PRESERVED</div>
                  <div className="text-emerald-400 font-bold text-base">{scenarioData.newPlan.churn.unchangedCrew}</div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-[#050B17] p-3 rounded-lg border border-[#142548]">
            💡 <strong>Algorithmic Explanation:</strong> {scenarioData.newPlan.explanation}
          </p>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-400">
              Disruption resolved without cascading schedule overhaul across squadron ground crews.
            </span>
            <button
              onClick={() => setApprovalModalOpen(true)}
              className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs tracking-wider transition-all flex items-center space-x-1.5 shadow-glow-green"
            >
              <FileSignature className="w-4 h-4" />
              <span>APPROVE REPLANNED DISPATCH</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

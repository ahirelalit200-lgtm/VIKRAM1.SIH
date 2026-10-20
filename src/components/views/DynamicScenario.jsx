// VIKRAM1 — Page 8: Dynamic Scenario, Retasking & Minimal-Churn Engine (Realistic Defence Enterprise Theme)
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { REPLANNING_SCENARIOS, INITIAL_MISSION_PLAN_A } from '../../data/scenarioData';
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
    <div className="space-y-4 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#D5DCE3] gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold tracking-tight text-[#1E3A5F]">
              DYNAMIC RETASKING & MINIMAL-CHURN REPLANNING
            </h2>
            <span className="text-[10px] bg-[#EBF2F7] text-[#1E3A5F] px-2 py-0.5 rounded border border-[#CFDFEC] font-semibold font-mono">
              ADAPTIVE ENGINE
            </span>
          </div>
          <p className="text-xs text-[#60717D]">
            Simulate operational disruptions, detect boundary invalidations, and trigger dynamic replanning with minimal organizational churn.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-3 py-1.5 rounded bg-white hover:bg-[#F4F6F8] border border-[#D5DCE3] text-[#263238] text-xs font-semibold transition-colors flex items-center space-x-1.5 shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#526B82]" />
          <span>RESET SCENARIO</span>
        </button>
      </div>

      {/* Simulation Triggers Bar */}
      <div className="bg-white border border-[#D5DCE3] rounded-md p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wide flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#526B82]" />
            SELECT DISRUPTION SCENARIO TO SIMULATE:
          </span>
          <span className="text-[10px] text-[#60717D] font-mono">TEST BENCH</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => handleSimulateScenario('WEATHER_CHANGE')}
            disabled={stage !== 'IDLE' && stage !== 'RESOLVED'}
            className={`p-3 rounded border text-left transition-colors flex items-start space-x-2.5 ${
              activeScenarioKey === 'WEATHER_CHANGE'
                ? 'bg-[#FFF8EB] border-[#B7791F]'
                : 'bg-[#F8FAFC] border-[#D5DCE3] hover:border-[#1E3A5F]'
            }`}
          >
            <CloudRain className="w-5 h-5 text-[#B7791F] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-xs text-[#263238]">Simulate Weather Change</div>
              <div className="text-[10px] text-[#60717D] mt-0.5">Convective storm in Sector B closes Corridor Alpha</div>
            </div>
          </button>

          <button
            onClick={() => handleSimulateScenario('AIRCRAFT_UNAVAILABLE')}
            disabled={stage !== 'IDLE' && stage !== 'RESOLVED'}
            className={`p-3 rounded border text-left transition-colors flex items-start space-x-2.5 ${
              activeScenarioKey === 'AIRCRAFT_UNAVAILABLE'
                ? 'bg-[#FDF2F2] border-[#B84242]'
                : 'bg-[#F8FAFC] border-[#D5DCE3] hover:border-[#1E3A5F]'
            }`}
          >
            <Plane className="w-5 h-5 text-[#B84242] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-xs text-[#263238]">Simulate Aircraft Unavailable</div>
              <div className="text-[10px] text-[#60717D] mt-0.5">VKR-101 hydraulic abort prior to takeoff</div>
            </div>
          </button>

          <button
            onClick={() => handleSimulateScenario('CREW_UNAVAILABLE')}
            disabled={stage !== 'IDLE' && stage !== 'RESOLVED'}
            className={`p-3 rounded border text-left transition-colors flex items-start space-x-2.5 ${
              activeScenarioKey === 'CREW_UNAVAILABLE'
                ? 'bg-[#EBF2F7] border-[#1E3A5F]'
                : 'bg-[#F8FAFC] border-[#D5DCE3] hover:border-[#1E3A5F]'
            }`}
          >
            <Users className="w-5 h-5 text-[#1E3A5F] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-xs text-[#263238]">Simulate Crew Unavailable</div>
              <div className="text-[10px] text-[#60717D] mt-0.5">Lead Pilot CRW-01 duty limit exceeded</div>
            </div>
          </button>

          <button
            onClick={() => handleSimulateScenario('AIRSPACE_RESTRICTION')}
            disabled={stage !== 'IDLE' && stage !== 'RESOLVED'}
            className={`p-3 rounded border text-left transition-colors flex items-start space-x-2.5 ${
              activeScenarioKey === 'AIRSPACE_RESTRICTION'
                ? 'bg-[#EBF2F7] border-[#1E3A5F]'
                : 'bg-[#F8FAFC] border-[#D5DCE3] hover:border-[#1E3A5F]'
            }`}
          >
            <ShieldAlert className="w-5 h-5 text-[#526B82] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-xs text-[#263238]">Simulate Airspace Restriction</div>
              <div className="text-[10px] text-[#60717D] mt-0.5">Emergency TFR enacted in Sector A Upper Band</div>
            </div>
          </button>
        </div>
      </div>

      {/* Dynamic Workflow Animation Pipeline */}
      <div className="bg-white border border-[#D5DCE3] rounded-md p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#E5EAEF]">
          <span className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wide">
            DYNAMIC REPLANNING WORKFLOW LIFECYCLE
          </span>
          <span className="text-[10px] text-[#263238] font-bold font-mono">
            STAGE: {stage}
          </span>
        </div>

        {/* 6 Step Visual Pipeline */}
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
              className={`p-2.5 rounded border transition-colors ${
                st.active
                  ? i === 5 && stage === 'RESOLVED'
                    ? 'bg-[#EDF7F2] border-[#2E7D5B] text-[#2E7D5B]'
                    : i === 4 && stage === 'REPLANNING'
                    ? 'bg-[#EBF2F7] border-[#1E3A5F] text-[#1E3A5F]'
                    : i === 3 && stage === 'INVALID_DETECTED'
                    ? 'bg-[#FDF2F2] border-[#B84242] text-[#B84242]'
                    : 'bg-[#F8FAFC] border-[#1E3A5F] text-[#263238]'
                  : 'bg-[#FAFCFD] border-[#E5EAEF] text-[#8295A5] opacity-60'
              }`}
            >
              <div className="font-bold text-[11px] leading-tight mb-1">{st.label}</div>
              <div className="text-[9.5px] text-[#60717D]">{st.desc}</div>
            </div>
          ))}
        </div>

        {/* Dynamic Transition Banner */}
        {stage === 'CONDITION_DETECTED' && (
          <div className="p-3 rounded bg-[#FFF8EB] border border-[#F5E1B5] text-[#B7791F] text-xs flex items-center justify-between">
            <span className="flex items-center gap-2 font-bold">
              <AlertTriangle className="w-4 h-4 text-[#B7791F]" />
              PLAN CHANGE DETECTED: {scenarioData?.conditionDetected}
            </span>
            <span className="text-[10px] font-mono font-semibold">SENSOR TRIGGER</span>
          </div>
        )}

        {stage === 'REPLANNING' && (
          <div className="p-3 rounded bg-[#EBF2F7] border border-[#CFDFEC] text-[#1E3A5F] text-xs flex items-center justify-between">
            <span className="flex items-center gap-2 font-bold">
              <RefreshCw className="w-4 h-4 text-[#1E3A5F]" />
              VIKRAM1 IS RE-OPTIMISING... Localized repair solver preserving unchanged resources
            </span>
            <span className="text-[10px] font-mono font-bold">SOLVING ILP...</span>
          </div>
        )}

        {stage === 'RESOLVED' && (
          <div className="p-3 rounded bg-[#EDF7F2] border border-[#C4E5D4] text-[#2E7D5B] text-xs flex items-center justify-between">
            <span className="flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-4 h-4 text-[#2E7D5B]" />
              NEW RECOMMENDED PLAN GENERATED: {scenarioData?.newPlan.name}
            </span>
            <span className="text-[10px] font-mono font-bold">100% FEASIBLE</span>
          </div>
        )}
      </div>

      {/* MINIMAL-CHURN VISUALISATION: PLAN CHANGE ANALYSIS */}
      {stage === 'RESOLVED' && scenarioData && (
        <div className="bg-white border border-[#D5DCE3] rounded-md p-4 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E5EAEF]">
            <div className="flex items-center space-x-2">
              <Layers className="w-5 h-5 text-[#1E3A5F]" />
              <div>
                <h3 className="text-sm font-bold text-[#1E3A5F] uppercase tracking-wide">
                  PLAN CHANGE & MINIMAL-CHURN ANALYSIS
                </h3>
                <span className="text-xs text-[#60717D]">
                  Targeted Heuristic: Maximizes operational stability by modifying only affected assets
                </span>
              </div>
            </div>

            <div className="px-2.5 py-1 rounded bg-[#EDF7F2] border border-[#C4E5D4] text-[#2E7D5B] font-bold text-xs font-mono">
              {scenarioData.newPlan.churn.churnIndex}
            </div>
          </div>

          {/* Comparison Cards: Previous Plan vs New Plan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Previous Baseline */}
            <div className="p-3.5 rounded bg-[#FFF8F8] border border-[#F7C8C8] space-y-2">
              <div className="flex items-center justify-between text-[#60717D]">
                <span className="font-bold text-[#263238]">PREVIOUS PLAN</span>
                <span className="text-[10px] text-[#B84242] font-bold font-mono">SUBOPTIMAL / VIOLATED</span>
              </div>
              <div className="text-sm font-bold text-[#263238]">{scenarioData.previousPlan}</div>
              <p className="text-[11px] text-[#60717D]">
                Invalidated by: <strong className="text-[#B84242]">{scenarioData.violatedConstraint.title}</strong>
              </p>
            </div>

            {/* New Re-Optimized Plan */}
            <div className="p-3.5 rounded bg-[#EDF7F2] border border-[#C4E5D4] space-y-2">
              <div className="flex items-center justify-between text-[#60717D]">
                <span className="font-bold text-[#2E7D5B]">NEW RECOMMENDED PLAN</span>
                <span className="text-[10px] text-[#2E7D5B] font-bold font-mono">✓ FEASIBLE ({scenarioData.newPlan.feasibilityScore}%)</span>
              </div>
              <div className="text-sm font-bold text-[#263238]">{scenarioData.newPlan.name}</div>
              <p className="text-[11px] text-[#60717D]">
                Routing: <span className="text-[#1E3A5F] font-semibold">{scenarioData.newPlan.routing}</span>
              </p>
            </div>
          </div>

          {/* Changed vs Unchanged Resources Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Changed Resources */}
            <div className="p-3.5 rounded bg-[#FFF8EB] border border-[#F5E1B5] space-y-2">
              <div className="flex items-center justify-between text-[#B7791F] text-xs font-bold uppercase">
                <span>CHANGED RESOURCES (MINIMAL DELTA)</span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#F5E1B5] font-mono">
                  LOW CHURN
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div className="p-2 rounded bg-white border border-[#F5E1B5]">
                  <div className="text-[#60717D] text-[10px] font-sans">AIRCRAFT</div>
                  <div className="text-[#B7791F] font-bold text-base">{scenarioData.newPlan.churn.changedAircraft}</div>
                </div>
                <div className="p-2 rounded bg-white border border-[#F5E1B5]">
                  <div className="text-[#60717D] text-[10px] font-sans">CREW</div>
                  <div className="text-[#B7791F] font-bold text-base">{scenarioData.newPlan.churn.changedCrew}</div>
                </div>
                <div className="p-2 rounded bg-white border border-[#F5E1B5]">
                  <div className="text-[#60717D] text-[10px] font-sans">FUEL DELTA</div>
                  <div className="text-[#B7791F] font-bold text-base">{scenarioData.newPlan.churn.fuelImpact}</div>
                </div>
              </div>
            </div>

            {/* Unchanged Resources */}
            <div className="p-3.5 rounded bg-[#EDF7F2] border border-[#C4E5D4] space-y-2">
              <div className="flex items-center justify-between text-[#2E7D5B] text-xs font-bold uppercase">
                <span>UNCHANGED RESOURCES (PRESERVED LOGISTICS)</span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#C4E5D4] font-mono font-bold">
                  82% PRESERVED
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                <div className="p-2 rounded bg-white border border-[#C4E5D4]">
                  <div className="text-[#60717D] text-[10px] font-sans">AIRCRAFT PRESERVED</div>
                  <div className="text-[#2E7D5B] font-bold text-base">{scenarioData.newPlan.churn.unchangedAircraft}</div>
                </div>
                <div className="p-2 rounded bg-white border border-[#C4E5D4]">
                  <div className="text-[#60717D] text-[10px] font-sans">CREW ROSTER PRESERVED</div>
                  <div className="text-[#2E7D5B] font-bold text-base">{scenarioData.newPlan.churn.unchangedCrew}</div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-[#263238] leading-relaxed bg-[#F8FAFC] p-3 rounded border border-[#E5EAEF]">
            <strong className="text-[#1E3A5F]">Algorithmic Explanation:</strong> {scenarioData.newPlan.explanation}
          </p>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-[#60717D]">
              Disruption resolved without cascading schedule overhaul across squadron ground crews.
            </span>
            <button
              onClick={() => setApprovalModalOpen(true)}
              className="px-4 py-1.5 rounded bg-[#2E7D5B] hover:bg-[#25664A] text-white font-semibold text-xs tracking-wide transition-colors flex items-center space-x-1.5 shadow-sm"
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

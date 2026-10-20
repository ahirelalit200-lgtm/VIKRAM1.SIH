// VIKRAM1 — Page 7: AI Optimization Centre & Pareto Frontier (Realistic Defence Enterprise Theme)
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PARETO_PLANS } from '../../data/scenarioData';
import {
  Cpu,
  Sliders,
  CheckCircle2,
  HelpCircle,
  BarChart3,
  Layers,
  ArrowRight,
  ShieldCheck,
  FileSignature
} from 'lucide-react';

export default function AIDecisionEngine() {
  const {
    activePlan,
    setActivePlan,
    setExplainModalOpen,
    setApprovalModalOpen,
    planApproved,
    addNotification,
    addAuditLog,
  } = useApp();

  // Synthetic Objective Function Weights (Sliders)
  const [weights, setWeights] = useState({
    resourceEfficiency: 85,
    fuelEfficiency: 90,
    crewLoad: 75,
    aircraftUtilisation: 80,
    missionPriority: 95,
    planStability: 90,
  });

  const [selectedPlanId, setSelectedPlanId] = useState('Plan A');

  const handleWeightChange = (key, val) => {
    setWeights((prev) => ({ ...prev, [key]: Number(val) }));
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlanId(plan.id);
    setActivePlan({ ...activePlan, id: plan.id, name: plan.title });
    addNotification('AI', `Target Plan Selected: ${plan.id}`, 'Solver parameters aligned to candidate profile.');
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#D5DCE3] gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold tracking-tight text-[#1E3A5F]">
              AI DECISION & OPTIMISATION CENTRE
            </h2>
            <span className="text-[10px] bg-[#EBF2F7] text-[#1E3A5F] px-2 py-0.5 rounded border border-[#CFDFEC] font-semibold font-mono">
              PARETO SOLVER
            </span>
          </div>
          <p className="text-xs text-[#60717D]">
            Multi-objective constraint programming engine synthesizing non-dominated operational plans.
          </p>
        </div>

        <div className="px-3 py-1 rounded bg-[#EBF2F7] border border-[#CFDFEC] text-[#1E3A5F] text-xs font-semibold flex items-center gap-1.5 font-mono">
          <Cpu className="w-4 h-4 text-[#526B82]" />
          <span>INTEGER LINEAR PROGRAMMING (ILP) SOLVER: READY</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Synthetic Objective Functions Sliders (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-[#D5DCE3] rounded-md p-4 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5EAEF]">
              <div className="flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-[#526B82]" />
                <h3 className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wide">
                  OBJECTIVE FUNCTION WEIGHTS (α / β / γ)
                </h3>
              </div>
              <span className="text-[10px] text-[#60717D] font-mono">TUNE SOLVER</span>
            </div>

            <p className="text-[11px] text-[#60717D] leading-normal">
              Adjust objective function priorities to re-weight resource cost versus stability and fuel economy.
            </p>

            <div className="space-y-3.5 text-xs">
              {[
                { key: 'resourceEfficiency', label: 'Resource Efficiency Weight', val: weights.resourceEfficiency },
                { key: 'fuelEfficiency', label: 'Fuel Conservation Priority', val: weights.fuelEfficiency },
                { key: 'crewLoad', label: 'Crew Duty Load Balancing', val: weights.crewLoad },
                { key: 'aircraftUtilisation', label: 'Aircraft Turnaround Utilisation', val: weights.aircraftUtilisation },
                { key: 'missionPriority', label: 'Mission On-Time Priority', val: weights.missionPriority },
                { key: 'planStability', label: 'Plan Stability (Min-Churn)', val: weights.planStability },
              ].map((item) => (
                <div key={item.key} className="space-y-1">
                  <div className="flex justify-between text-[#263238] text-[11px]">
                    <span className="font-medium">{item.label}:</span>
                    <span className="text-[#1E3A5F] font-bold font-mono">{item.val}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={item.val}
                    onChange={(e) => handleWeightChange(item.key, e.target.value)}
                    className="w-full accent-[#1E3A5F] h-1.5 bg-[#E2E8F0] rounded cursor-pointer"
                  />
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#E5EAEF] flex justify-between items-center text-[10px] text-[#60717D]">
              <span className="font-mono">SOLVER: MULTI-OBJECTIVE NSGA-II</span>
              <button
                onClick={() =>
                  setWeights({
                    resourceEfficiency: 85,
                    fuelEfficiency: 90,
                    crewLoad: 75,
                    aircraftUtilisation: 80,
                    missionPriority: 95,
                    planStability: 90,
                  })
                }
                className="text-[#1E3A5F] hover:underline font-semibold"
              >
                RESET DEFAULTS
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Pareto Frontier Candidates + Commander Review (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Visual Pareto Frontier Card Comparison */}
          <div className="bg-white border border-[#D5DCE3] rounded-md p-4 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5EAEF]">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-[#526B82]" />
                <h3 className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wide">
                  PARETO OPTIMAL CANDIDATES (SOLVER OUTPUT)
                </h3>
              </div>
              <span className="text-[10px] text-[#2E7D5B] bg-[#EDF7F2] px-2 py-0.5 rounded border border-[#C4E5D4] font-semibold font-mono">
                4 CANDIDATE PLANS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PARETO_PLANS.map((plan) => {
                const isSelected = selectedPlanId === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => handleSelectPlan(plan)}
                    className={`p-3.5 rounded border transition-colors cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#EBF2F7] border-2 border-[#1E3A5F]'
                        : 'bg-[#F8FAFC] border-[#E5EAEF] hover:border-[#D5DCE3]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[#263238] text-xs">{plan.title}</span>
                        {plan.isRecommended && (
                          <span className="text-[9px] bg-[#1E3A5F] text-white font-bold px-1.5 py-0.2 rounded font-mono">
                            RECOMMENDED
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-[#60717D] mb-3">{plan.tagline}</p>

                      <div className="space-y-1.5 text-[10px]">
                        <div className="flex justify-between text-[#60717D]">
                          <span>Constraint Feasibility:</span>
                          <span className="text-[#2E7D5B] font-bold font-mono">{plan.feasibility}%</span>
                        </div>
                        <div className="flex justify-between text-[#60717D]">
                          <span>Resource Conservation:</span>
                          <span className="text-[#1E3A5F] font-bold font-mono">{plan.resourceScore}%</span>
                        </div>
                        <div className="flex justify-between text-[#60717D]">
                          <span>Plan Stability (Low-Churn):</span>
                          <span className="text-[#263238] font-bold font-mono">{plan.stabilityScore}%</span>
                        </div>
                        <div className="flex justify-between text-[#60717D]">
                          <span>Operational Risk:</span>
                          <span className={`font-semibold ${plan.riskRating === 'Very Low' || plan.riskRating === 'Lowest' ? 'text-[#2E7D5B]' : 'text-[#B7791F]'}`}>
                            {plan.riskRating}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#E5EAEF] flex items-center justify-between text-[10px]">
                      <span className="text-[#60717D] font-mono">SCORE: {Math.round((plan.feasibility + plan.resourceScore + plan.stabilityScore) / 3)}%</span>
                      <span className={`font-semibold ${isSelected ? 'text-[#1E3A5F]' : 'text-[#60717D]'}`}>
                        {isSelected ? '✓ SELECTED' : 'SELECT PLAN'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 21: COMMANDER REVIEW CARD */}
          <div className="p-4 rounded-md bg-white border border-[#D5DCE3] shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5EAEF]">
              <div className="flex items-center space-x-2">
                <FileSignature className="w-5 h-5 text-[#1E3A5F]" />
                <div>
                  <h3 className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wide">
                    COMMANDER REVIEW DESK
                  </h3>
                  <span className="text-[10px] text-[#2E7D5B] font-medium font-mono">
                    AI RECOMMENDATION READY FOR DIGITAL SIGN-OFF
                  </span>
                </div>
              </div>

              {planApproved && (
                <span className="text-xs bg-[#EDF7F2] text-[#2E7D5B] border border-[#C4E5D4] px-2.5 py-0.5 rounded font-bold font-mono">
                  PLAN APPROVED
                </span>
              )}
            </div>

            <p className="text-xs text-[#263238]">
              Selected plan <strong>{selectedPlanId}</strong> is validated and compliant with synthetic operational boundaries. Final mission authority is held by the commander.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                onClick={() => setApprovalModalOpen(true)}
                className={`px-4 py-1.5 rounded text-xs font-semibold tracking-wide transition-colors flex items-center space-x-1.5 shadow-sm ${
                  planApproved
                    ? 'bg-[#EDF7F2] border border-[#C4E5D4] text-[#2E7D5B]'
                    : 'bg-[#2E7D5B] hover:bg-[#25664A] text-white'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{planApproved ? 'VIEW AUTHORIZATION SEAL' : 'APPROVE PLAN'}</span>
              </button>

              <button
                onClick={() => {
                  addNotification('WARNING', 'Revision Requested', 'AI solver requested to evaluate alternative routes.');
                }}
                className="px-3.5 py-1.5 rounded bg-white hover:bg-[#F4F6F8] border border-[#D5DCE3] text-[#263238] text-xs font-semibold transition-colors"
              >
                REQUEST REVISION
              </button>

              <button
                onClick={() => setExplainModalOpen(true)}
                className="px-3.5 py-1.5 rounded bg-white hover:bg-[#F4F6F8] border border-[#D5DCE3] text-[#1E3A5F] text-xs font-semibold transition-colors flex items-center space-x-1.5"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#526B82]" />
                <span>VIEW EXPLANATION</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

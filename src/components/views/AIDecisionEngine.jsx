// VIKRAM1 — Page 7: AI Optimization Centre & Pareto Frontier
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
  TrendingUp,
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
    <div className="space-y-5 animate-fadeIn font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#1A2D54] gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold font-display tracking-wider text-white">
              AI DECISION & OPTIMISATION CENTRE
            </h2>
            <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
              PARETO SOLVER
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Multi-objective constraint programming engine synthesizing non-dominated operational plans.
          </p>
        </div>

        <div className="px-3 py-1 rounded bg-[#09152B] border border-cyan-500/30 text-cyan-400 text-xs font-bold flex items-center gap-1.5">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>INTEGER LINEAR PROGRAMMING (ILP) SOLVER: READY</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Synthetic Objective Functions Sliders (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#091224]/90 border border-[#1A2D54] rounded-xl p-4 reticle-box space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#142344]">
              <div className="flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  OBJECTIVE FUNCTION WEIGHTS (α / β / γ)
                </h3>
              </div>
              <span className="text-[10px] text-slate-400">TUNE SOLVER</span>
            </div>

            <p className="text-[11px] text-slate-400 leading-normal">
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
                  <div className="flex justify-between text-slate-300 text-[11px]">
                    <span>{item.label}:</span>
                    <span className="text-cyan-400 font-bold">{item.val}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={item.val}
                    onChange={(e) => handleWeightChange(item.key, e.target.value)}
                    className="w-full accent-cyan-400 h-1.5 bg-[#050C1B] rounded-lg cursor-pointer"
                  />
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#142344] flex justify-between items-center text-[10px] text-slate-500">
              <span>SOLVER HEURISTIC: MULTI-OBJECTIVE NSGA-II</span>
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
                className="text-cyan-400 hover:text-white"
              >
                RESET DEFAULTS
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Pareto Frontier Candidates + Commander Review (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Visual Pareto Frontier Card Comparison */}
          <div className="bg-[#091224]/90 border border-[#1A2D54] rounded-xl p-4 font-mono reticle-box space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#142344]">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  PARETO OPTIMAL CANDIDATES (SOLVER OUTPUT)
                </h3>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                4 NON-DOMINATED PLANS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PARETO_PLANS.map((plan) => {
                const isSelected = selectedPlanId === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => handleSelectPlan(plan)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#0E1F42] border-cyan-400 shadow-glow-cyan'
                        : 'bg-[#060D1E] border-[#142548] hover:border-cyan-500/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-white text-xs">{plan.title}</span>
                        {plan.isRecommended && (
                          <span className="text-[9px] bg-cyan-500 text-black font-bold px-1.5 py-0.2 rounded">
                            VIKRAM1 PICK
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 mb-3">{plan.tagline}</p>

                      <div className="space-y-1.5 text-[10px]">
                        <div className="flex justify-between text-slate-400">
                          <span>Constraint Feasibility:</span>
                          <span className="text-emerald-400 font-bold">{plan.feasibility}%</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Resource Conservation:</span>
                          <span className="text-cyan-300 font-bold">{plan.resourceScore}%</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Plan Stability (Low-Churn):</span>
                          <span className="text-white font-bold">{plan.stabilityScore}%</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Operational Risk:</span>
                          <span className={plan.riskRating === 'Very Low' || plan.riskRating === 'Lowest' ? 'text-emerald-400' : 'text-amber-400'}>
                            {plan.riskRating}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#142344] flex items-center justify-between text-[10px]">
                      <span className="text-slate-500">SCORE: {Math.round((plan.feasibility + plan.resourceScore + plan.stabilityScore) / 3)}%</span>
                      <span className={`font-bold ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`}>
                        {isSelected ? '✓ SELECTED' : 'SELECT PLAN'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 21: COMMANDER REVIEW CARD */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#08152E] to-[#0A1A3A] border-2 border-cyan-400/60 shadow-glow-cyan space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#1A2E56]">
              <div className="flex items-center space-x-2">
                <FileSignature className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    COMMANDER REVIEW DESK
                  </h3>
                  <span className="text-[10px] text-emerald-400">
                    AI RECOMMENDATION READY FOR DIGITAL SIGN-OFF
                  </span>
                </div>
              </div>

              {planApproved && (
                <span className="text-xs bg-emerald-500 text-black px-2.5 py-0.5 rounded font-bold">
                  PLAN APPROVED
                </span>
              )}
            </div>

            <p className="text-xs text-slate-300">
              Selected plan <strong>{selectedPlanId}</strong> is validated and compliant with synthetic operational boundaries. Final mission authority is held by the commander.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                onClick={() => setApprovalModalOpen(true)}
                className={`px-5 py-2 rounded-lg text-xs font-bold tracking-wider transition-all flex items-center space-x-1.5 ${
                  planApproved
                    ? 'bg-emerald-950 border border-emerald-500 text-emerald-300'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-glow-green'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{planApproved ? 'VIEW AUTHORIZATION SEAL' : 'APPROVE PLAN'}</span>
              </button>

              <button
                onClick={() => {
                  addNotification('WARNING', 'Revision Requested', 'AI solver requested to evaluate alternative routes.');
                }}
                className="px-3.5 py-2 rounded-lg bg-[#0C1A36] hover:bg-[#122752] border border-[#1E3A70] text-slate-300 text-xs font-bold transition-all"
              >
                REQUEST REVISION
              </button>

              <button
                onClick={() => setExplainModalOpen(true)}
                className="px-3.5 py-2 rounded-lg bg-[#0C1A36] hover:bg-[#122752] border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-all flex items-center space-x-1.5"
              >
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>VIEW EXPLANATION</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

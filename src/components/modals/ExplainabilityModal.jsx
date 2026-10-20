// VIKRAM1 — Explainable AI Modal ("WHY THIS PLAN?")
// Demonstrates transparent, auditable reasoning rather than a black-box model
import React from 'react';
import { useApp } from '../../context/AppContext';
import { PARETO_PLANS } from '../../data/scenarioData';
import {
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  X,
  Cpu,
  BarChart2,
  ShieldCheck,
  TrendingUp,
  FileCheck2
} from 'lucide-react';

export default function ExplainabilityModal() {
  const { explainModalOpen, setExplainModalOpen, activePlan } = useApp();

  if (!explainModalOpen) return null;

  const explainReasons = [
    {
      num: 1,
      title: 'Aircraft Availability & Base Turnaround Prioritised',
      desc: 'Selected airframes (VKR-101, VKR-102, VKR-110, VKR-116) are co-located at Base Alpha, eliminating cross-base ferry flights and ensuring 100% fuel readiness (avg 92%).',
      tag: 'ASSET-ALIGNMENT',
    },
    {
      num: 2,
      title: 'Satisfies 100% of Mandatory Operational Hard Constraints',
      desc: 'No violations against Crew Flight Duty Limitations (all crew have >8h mandatory rest), maintenance buffers (>50h flight time remaining), and corridor clearances.',
      tag: 'CONSTRAINT-ZERO-VIOLATION',
    },
    {
      num: 3,
      title: 'Alternative Candidate Plans Require Excessive Resources',
      desc: 'Plan B utilized 2 additional airframes from Base Bravo causing turnaround congestion; Plan C required 18% additional transit fuel via circuitous routing.',
      tag: 'RESOURCE-EFFICIENCY',
    },
    {
      num: 4,
      title: 'Superior Balance on Multi-Objective Pareto Frontier',
      desc: 'Mathematical evaluation yielded a 96% composite utility score, balancing mission readiness (+14% efficiency) against operational risk.',
      tag: 'PARETO-OPTIMAL',
    },
    {
      num: 5,
      title: 'Robust Environmental Margin for Defined Synthetic Scenario',
      desc: 'Flight levels FL320-FL380 maintain a 40nm lateral and 4,000ft vertical buffer from convective Weather Cell Delta in Sector B.',
      tag: 'SAFETY-ENVELOPE',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-mono animate-fadeIn">
      <div className="bg-[#081226] border border-cyan-400/50 rounded-2xl w-full max-w-4xl shadow-glow-cyan overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-[#050B17] border-b border-[#1A2D54] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-white tracking-wider uppercase">
                  VIKRAM1 EXPLAINABLE AI RATIONALE
                </h2>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded font-bold">
                  CONFIDENCE: 92%
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Transparent multi-criteria decision justification for {activePlan.name || 'Plan Alpha'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setExplainModalOpen(false)}
            className="p-1.5 rounded-lg bg-[#0F1E3D] hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Top Recommendation Summary Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#0C1B3B] to-[#0A1630] border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] text-cyan-400 uppercase font-bold tracking-wider">
                RECOMMENDED SELECTION: {activePlan.id || 'PLAN A'}
              </span>
              <p className="text-xs text-slate-200 mt-1 leading-relaxed max-w-xl">
                "VIKRAM1 recommends Plan A because it satisfies all mandatory constraints while reducing resource utilisation by 14% and avoiding the detected environmental restriction in Sector B."
              </p>
            </div>
            <div className="flex items-center space-x-3 text-center shrink-0">
              <div className="px-3 py-2 rounded-lg bg-[#060D1E] border border-[#182C54]">
                <div className="text-emerald-400 font-bold text-lg">96%</div>
                <div className="text-[9px] text-slate-400">FEASIBILITY</div>
              </div>
              <div className="px-3 py-2 rounded-lg bg-[#060D1E] border border-[#182C54]">
                <div className="text-cyan-400 font-bold text-lg">+14%</div>
                <div className="text-[9px] text-slate-400">EFFICIENCY</div>
              </div>
              <div className="px-3 py-2 rounded-lg bg-[#060D1E] border border-[#182C54]">
                <div className="text-emerald-400 font-bold text-lg">0</div>
                <div className="text-[9px] text-slate-400">VIOLATIONS</div>
              </div>
            </div>
          </div>

          {/* 5 Explainable Decision Pillars */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              EXPLAINABLE DECISION PILLARS (5 NODES)
            </h3>
            <div className="space-y-2.5">
              {explainReasons.map((reason) => (
                <div
                  key={reason.num}
                  className="p-3 rounded-lg bg-[#060D1E] border border-[#15274C] hover:border-cyan-500/40 transition-colors flex items-start space-x-3"
                >
                  <div className="w-6 h-6 rounded bg-cyan-950 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 border border-cyan-500/30">
                    {reason.num}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-100">
                        {reason.title}
                      </h4>
                      <span className="text-[9px] text-slate-400 bg-[#0C1935] px-2 py-0.5 rounded border border-[#182E56]">
                        {reason.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      {reason.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Comparison Matrix (Plan A vs Plan B vs Plan C) */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-cyan-400" />
              CANDIDATE PLAN TRADEOFF MATRIX (PARETO COMPARISON)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {PARETO_PLANS.slice(0, 3).map((plan) => (
                <div
                  key={plan.id}
                  className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                    plan.isRecommended
                      ? 'bg-[#0A1838] border-cyan-400 shadow-glow-cyan'
                      : 'bg-[#060D1E] border-[#15274C]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white">{plan.id}</span>
                      {plan.isRecommended && (
                        <span className="text-[9px] font-bold bg-cyan-500 text-black px-2 py-0.5 rounded">
                          RECOMMENDED
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 mb-3">{plan.tagline}</p>

                    <div className="space-y-2 text-[10px]">
                      <div>
                        <div className="flex justify-between text-slate-400 mb-0.5">
                          <span>Feasibility:</span>
                          <span className="text-white font-bold">{plan.feasibility}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${plan.isRecommended ? 'bg-cyan-400' : 'bg-slate-500'}`}
                            style={{ width: `${plan.feasibility}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-400 mb-0.5">
                          <span>Resource Efficiency:</span>
                          <span className="text-white font-bold">{plan.resourceScore}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${plan.isRecommended ? 'bg-emerald-400' : 'bg-slate-500'}`}
                            style={{ width: `${plan.resourceScore}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-400 mb-0.5">
                          <span>Risk Rating:</span>
                          <span className={`font-bold ${plan.riskRating === 'Very Low' ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {plan.riskRating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#142344] text-[9px] text-center text-slate-400">
                    {plan.isRecommended ? 'Optimal Multi-Objective Tradeoff' : 'Sub-Optimal Tradeoff'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#050B17] border-t border-[#1A2D54] flex items-center justify-between text-xs">
          <div className="text-slate-400 text-[11px]">
            * All evaluations generated deterministically from synthetic constraint matrices.
          </div>
          <button
            onClick={() => setExplainModalOpen(false)}
            className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold font-mono transition-colors"
          >
            ACKNOWLEDGE & CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}

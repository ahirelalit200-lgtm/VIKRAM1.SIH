// VIKRAM1 — Explainable AI Modal ("WHY THIS PLAN?") (Realistic Defence Enterprise Theme)
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-none font-sans animate-fadeIn">
      <div className="bg-white border border-[#D5DCE3] rounded-md w-full max-w-4xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-[#FAFCFD] border-b border-[#E5EAEF] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 rounded bg-[#EBF2F7] border border-[#CFDFEC] text-[#1E3A5F]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-[#1E3A5F] tracking-tight uppercase">
                  VIKRAM1 EXPLAINABLE AI RATIONALE
                </h2>
                <span className="text-[10px] bg-[#EDF7F2] text-[#2E7D5B] border border-[#C4E5D4] px-2 py-0.5 rounded font-bold font-mono">
                  CONFIDENCE: 92%
                </span>
              </div>
              <p className="text-xs text-[#60717D]">
                Transparent multi-criteria decision justification for {activePlan.name || 'Plan Alpha'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setExplainModalOpen(false)}
            className="p-1 rounded bg-[#F4F6F8] hover:bg-[#E8ECF0] text-[#60717D] hover:text-[#263238] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Top Recommendation Summary Card */}
          <div className="p-4 rounded bg-[#F8FAFC] border border-[#D5DCE3] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] text-[#1E3A5F] uppercase font-bold tracking-wide">
                RECOMMENDED SELECTION: {activePlan.id || 'PLAN A'}
              </span>
              <p className="text-xs text-[#263238] mt-1 leading-relaxed max-w-xl">
                "VIKRAM1 recommends Plan A because it satisfies all mandatory constraints while reducing resource utilisation by 14% and avoiding the detected environmental restriction in Sector B."
              </p>
            </div>
            <div className="flex items-center space-x-2.5 text-center shrink-0 font-mono">
              <div className="px-3 py-2 rounded bg-white border border-[#D5DCE3]">
                <div className="text-[#2E7D5B] font-bold text-lg">96%</div>
                <div className="text-[9px] text-[#60717D]">FEASIBILITY</div>
              </div>
              <div className="px-3 py-2 rounded bg-white border border-[#D5DCE3]">
                <div className="text-[#1E3A5F] font-bold text-lg">+14%</div>
                <div className="text-[9px] text-[#60717D]">EFFICIENCY</div>
              </div>
              <div className="px-3 py-2 rounded bg-white border border-[#D5DCE3]">
                <div className="text-[#2E7D5B] font-bold text-lg">0</div>
                <div className="text-[9px] text-[#60717D]">VIOLATIONS</div>
              </div>
            </div>
          </div>

          {/* 5 Explainable Decision Pillars */}
          <div>
            <h3 className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wide mb-2.5 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#2E7D5B]" />
              EXPLAINABLE DECISION PILLARS (5 NODES)
            </h3>
            <div className="space-y-2">
              {explainReasons.map((reason) => (
                <div
                  key={reason.num}
                  className="p-3 rounded bg-[#F8FAFC] border border-[#E5EAEF] flex items-start space-x-3"
                >
                  <div className="w-6 h-6 rounded bg-[#EBF2F7] text-[#1E3A5F] font-bold text-xs flex items-center justify-center shrink-0 border border-[#CFDFEC] font-mono">
                    {reason.num}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold text-[#263238]">
                        {reason.title}
                      </h4>
                      <span className="text-[9px] text-[#60717D] bg-white px-2 py-0.5 rounded border border-[#D5DCE3] font-mono">
                        {reason.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#60717D] mt-0.5 leading-relaxed">
                      {reason.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Comparison Matrix (Plan A vs Plan B vs Plan C) */}
          <div>
            <h3 className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wide mb-2.5 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-[#526B82]" />
              CANDIDATE PLAN TRADEOFF MATRIX (PARETO COMPARISON)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {PARETO_PLANS.slice(0, 3).map((plan) => (
                <div
                  key={plan.id}
                  className={`p-3.5 rounded border flex flex-col justify-between ${
                    plan.isRecommended
                      ? 'bg-[#EBF2F7] border-2 border-[#1E3A5F]'
                      : 'bg-[#F8FAFC] border-[#E5EAEF]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-[#263238]">{plan.id}</span>
                      {plan.isRecommended && (
                        <span className="text-[9px] font-bold bg-[#1E3A5F] text-white px-2 py-0.5 rounded font-mono">
                          RECOMMENDED
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-[#60717D] mb-3">{plan.tagline}</p>

                    <div className="space-y-2 text-[10px]">
                      <div>
                        <div className="flex justify-between text-[#60717D] mb-0.5 font-mono">
                          <span>Feasibility:</span>
                          <span className="text-[#263238] font-bold">{plan.feasibility}%</span>
                        </div>
                        <div className="w-full bg-[#E2E8F0] h-1.5 rounded overflow-hidden">
                          <div
                            className={`h-full ${plan.isRecommended ? 'bg-[#1E3A5F]' : 'bg-[#8295A5]'}`}
                            style={{ width: `${plan.feasibility}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[#60717D] mb-0.5 font-mono">
                          <span>Resource Conservation:</span>
                          <span className="text-[#263238] font-bold">{plan.resourceScore}%</span>
                        </div>
                        <div className="w-full bg-[#E2E8F0] h-1.5 rounded overflow-hidden">
                          <div
                            className={`h-full ${plan.isRecommended ? 'bg-[#2E7D5B]' : 'bg-[#8295A5]'}`}
                            style={{ width: `${plan.resourceScore}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[#60717D] mb-0.5">
                          <span>Risk Rating:</span>
                          <span className={`font-semibold ${plan.riskRating === 'Very Low' ? 'text-[#2E7D5B]' : 'text-[#B7791F]'}`}>
                            {plan.riskRating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#D5DCE3] text-[9px] text-center text-[#60717D] font-mono">
                    {plan.isRecommended ? 'Optimal Multi-Objective Tradeoff' : 'Sub-Optimal Tradeoff'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#FAFCFD] border-t border-[#E5EAEF] flex items-center justify-between text-xs">
          <div className="text-[#60717D] text-[11px] font-mono">
            * Generated deterministically from synthetic constraint matrices.
          </div>
          <button
            onClick={() => setExplainModalOpen(false)}
            className="px-4 py-1.5 rounded bg-[#1E3A5F] hover:bg-[#162C47] text-white font-semibold text-xs transition-colors shadow-sm"
          >
            ACKNOWLEDGE & CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}

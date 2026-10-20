// VIKRAM1 — AI Decision Engine Pipeline Visualizer
import React from 'react';
import {
  Database,
  ShieldCheck,
  CheckCircle,
  Cpu,
  FileCheck,
  UserCheck,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function DecisionPipeline({ activeStage = 5 }) {
  const stages = [
    {
      id: 1,
      title: 'DATA INGESTION',
      desc: 'Multi-source telemetry, radar, fleet & crew fusion',
      icon: Database,
      status: 'COMPLETE',
      latency: '24ms',
    },
    {
      id: 2,
      title: 'CONSTRAINT ANALYSIS',
      desc: 'Hard & soft operational boundary evaluation',
      icon: ShieldCheck,
      status: 'VERIFIED',
      latency: '48ms',
    },
    {
      id: 3,
      title: 'FEASIBILITY CHECK',
      desc: 'Mathematical satisfiability check (ILP Solver)',
      icon: CheckCircle,
      status: '100% PASS',
      latency: '95ms',
    },
    {
      id: 4,
      title: 'AI OPTIMISATION',
      desc: 'Pareto frontier multi-objective optimization',
      icon: Cpu,
      status: 'OPTIMAL',
      latency: '340ms',
    },
    {
      id: 5,
      title: 'VALIDATION',
      desc: 'Safety envelope & plan churn minimization',
      icon: FileCheck,
      status: 'ACTIVE',
      latency: '18ms',
    },
    {
      id: 6,
      title: 'HUMAN APPROVAL',
      desc: 'Commander-in-the-loop digital sign-off',
      icon: UserCheck,
      status: 'READY',
      latency: 'AWAITING',
    },
  ];

  return (
    <div className="bg-[#091224]/90 border border-[#1A2D54] rounded-xl p-4 font-mono reticle-box">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#142344]">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white tracking-wider uppercase flex items-center gap-2">
              VIKRAM1 DECISION ENGINE PIPELINE
              <span className="text-[10px] text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                ACTIVE PIPELINE
              </span>
            </h3>
            <p className="text-[10px] text-slate-400">
              Deterministic Constraint Verification + Heuristic Multi-Objective Resource Allocation
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-2 text-[10px] text-slate-400">
          <span>PIPELINE LATENCY:</span>
          <span className="text-cyan-400 font-bold">525ms TOTAL</span>
        </div>
      </div>

      {/* Pipeline Grid with Arrows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 relative">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isDone = stage.id <= activeStage;
          const isCurrent = stage.id === activeStage;

          return (
            <div key={stage.id} className="relative flex flex-col justify-between">
              <div
                className={`p-3 rounded-lg border transition-all duration-200 h-full flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-[#0E1F42] border-cyan-400/80 shadow-glow-cyan'
                    : isDone
                    ? 'bg-[#09142B] border-emerald-500/40'
                    : 'bg-[#060D1E] border-[#142344] opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-slate-500 font-bold">
                      STAGE 0{stage.id}
                    </span>
                    <Icon
                      className={`w-4 h-4 ${
                        isCurrent
                          ? 'text-cyan-400 animate-pulse'
                          : isDone
                          ? 'text-emerald-400'
                          : 'text-slate-600'
                      }`}
                    />
                  </div>

                  <h4 className="text-[11px] font-bold text-slate-100 uppercase tracking-wide leading-tight mb-1">
                    {stage.title}
                  </h4>
                  <p className="text-[9.5px] text-slate-400 leading-normal">
                    {stage.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-[#142344] flex items-center justify-between text-[9px]">
                  <span
                    className={`font-bold px-1.5 py-0.5 rounded ${
                      stage.status === 'READY'
                        ? 'bg-amber-950 text-amber-300 border border-amber-600/40'
                        : isDone
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-900 text-slate-500'
                    }`}
                  >
                    {stage.status}
                  </span>
                  <span className="text-slate-500">{stage.latency}</span>
                </div>
              </div>

              {/* Connecting arrow for larger screens */}
              {idx < stages.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-cyan-400/60 pointer-events-none">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

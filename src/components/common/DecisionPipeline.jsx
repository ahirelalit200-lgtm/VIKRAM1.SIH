// VIKRAM1 — AI Decision Engine Pipeline Visualizer (Realistic Defence Enterprise Theme)
import React from 'react';
import {
  Database,
  ShieldCheck,
  CheckCircle,
  Cpu,
  FileCheck,
  UserCheck,
  ArrowRight
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
      desc: 'Deterministic boundary satisfiability (ILP)',
      icon: CheckCircle,
      status: '100% PASS',
      latency: '95ms',
    },
    {
      id: 4,
      title: 'AI OPTIMISATION',
      desc: 'Pareto multi-objective frontier synthesis',
      icon: Cpu,
      status: 'OPTIMAL',
      latency: '340ms',
    },
    {
      id: 5,
      title: 'VALIDATION',
      desc: 'Safety envelope & minimal-churn check',
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
    <div className="bg-white border border-[#D5DCE3] rounded-md p-4 shadow-sm">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5EAEF]">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded bg-[#EBF2F7] border border-[#CFDFEC] text-[#1E3A5F]">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#1E3A5F] tracking-wide uppercase flex items-center gap-2">
              VIKRAM1 DECISION PIPELINE
              <span className="text-[10px] text-[#1E3A5F] bg-[#EBF2F7] px-2 py-0.5 rounded border border-[#CFDFEC] font-semibold">
                ACTIVE
              </span>
            </h3>
            <p className="text-[10px] text-[#60717D]">
              Constraint Verification & Resource Allocation Engine
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-2 text-[10px] text-[#60717D]">
          <span>PIPELINE LATENCY:</span>
          <span className="text-[#1E3A5F] font-bold font-mono">525ms TOTAL</span>
        </div>
      </div>

      {/* Pipeline Grid with Arrows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5 relative">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isDone = stage.id <= activeStage;
          const isCurrent = stage.id === activeStage;

          return (
            <div key={stage.id} className="relative flex flex-col justify-between">
              <div
                className={`p-3 rounded border transition-colors h-full flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-[#EBF2F7] border-[#1E3A5F]'
                    : isDone
                    ? 'bg-[#F8FAFC] border-[#D5DCE3]'
                    : 'bg-[#FAFCFD] border-[#E5EAEF] opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] text-[#60717D] font-mono font-bold">
                      STAGE 0{stage.id}
                    </span>
                    <Icon
                      className={`w-4 h-4 ${
                        isCurrent
                          ? 'text-[#1E3A5F]'
                          : isDone
                          ? 'text-[#2E7D5B]'
                          : 'text-[#8295A5]'
                      }`}
                    />
                  </div>

                  <h4 className="text-[11px] font-bold text-[#263238] uppercase tracking-wide leading-tight mb-1">
                    {stage.title}
                  </h4>
                  <p className="text-[10px] text-[#60717D] leading-normal">
                    {stage.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-[#E5EAEF] flex items-center justify-between text-[9px] font-mono">
                  <span
                    className={`font-bold px-1.5 py-0.5 rounded ${
                      stage.status === 'READY'
                        ? 'bg-[#FFF8EB] text-[#B7791F] border border-[#F5E1B5]'
                        : isDone
                        ? 'bg-[#EDF7F2] text-[#2E7D5B] border border-[#C4E5D4]'
                        : 'bg-[#F4F6F8] text-[#8295A5]'
                    }`}
                  >
                    {stage.status}
                  </span>
                  <span className="text-[#60717D]">{stage.latency}</span>
                </div>
              </div>

              {/* Connecting arrow for larger screens */}
              {idx < stages.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-[#526B82] pointer-events-none">
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

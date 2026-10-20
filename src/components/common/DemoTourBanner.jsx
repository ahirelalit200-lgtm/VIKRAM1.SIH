// VIKRAM1 — Automated Demo Scenario Walkthrough Floating Banner (Realistic Enterprise Theme)
import React from 'react';
import { useApp } from '../../context/AppContext';
import { Play, CheckCircle2, X } from 'lucide-react';

export default function DemoTourBanner() {
  const { tourRunning, setTourRunning, tourStep } = useApp();

  if (!tourRunning) return null;

  const stepsText = [
    'Initializing VIKRAM1 Decision Architecture...',
    'Step 1-2: Inspecting Multi-Source Operational Picture & Live Ingest...',
    'Step 3-4: Opening Mission Planner & Synthetic Scenario Parameters...',
    'Step 5: Executing Multi-Boundary Hard Constraint Evaluation...',
    'Step 6-7: Synthesizing Explainable Recommendation & Pareto Frontier...',
    'Step 8: Transitioning to Dynamic Scenario Retasking Module...',
    'Step 9: Simulating Environmental Convective Storm Alert in Sector B...',
    'Step 10: Triggering Real-Time Replanning with Minimal-Churn Heuristics...',
    'Step 11: Presenting Plan Bravo-Adaptive with 82% Resource Preservation...',
    'Step 12: Commander-in-the-Loop Official Digital Authorization...',
    'Step 13: Verifying Cryptographic Entry in Decision Audit Trail. Demo Complete.',
  ];

  const currentDesc = stepsText[tourStep - 1] || 'Running Automated Evaluation Tour...';
  const progressPercent = Math.min(100, Math.round((tourStep / 11) * 100));

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-2xl bg-[#1F2933] border border-[#526B82] rounded-md shadow-lg p-3.5 text-white font-sans text-xs">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#4ADE80]" />
          <span className="font-bold text-white uppercase tracking-wider text-xs font-mono">
            AUTOMATED EVALUATION TOUR (STEP {tourStep}/11)
          </span>
        </div>
        <button
          onClick={() => setTourRunning(false)}
          className="text-[#9AA5B1] hover:text-white px-2 py-0.5 rounded bg-[#2A3744] text-[10px] font-mono transition-colors"
        >
          STOP TOUR [ESC]
        </button>
      </div>

      <p className="text-[#E2E8F0] text-xs font-medium mb-2 leading-snug">
        {currentDesc}
      </p>

      {/* Progress Bar */}
      <div className="w-full bg-[#15202B] h-1.5 rounded overflow-hidden">
        <div
          className="bg-[#526B82] h-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}

// VIKRAM1 — Automated Demo Scenario Walkthrough Floating Banner
import React from 'react';
import { useApp } from '../../context/AppContext';
import { Play, Sparkles, CheckCircle2, X } from 'lucide-react';

export default function DemoTourBanner() {
  const { tourRunning, setTourRunning, tourStep } = useApp();

  if (!tourRunning) return null;

  const stepsText = [
    'Initializing VIKRAM1 Command Architecture...',
    'Step 1-2: Inspecting Multi-Source Operational Picture & Live Ingest...',
    'Step 3-4: Opening Mission Planner & Synthetic Scenario Parameters...',
    'Step 5: Executing Multi-Boundary Hard Constraint Evaluation...',
    'Step 6-7: Synthesizing Explainable AI Recommendation & Pareto Frontier...',
    'Step 8: Transitioning to Dynamic Scenario Retasking Module...',
    'Step 9: Simulating Environmental Convective Storm Alert in Sector B...',
    'Step 10: Triggering Real-Time Replanning with Minimal-Churn Heuristics...',
    'Step 11: Presenting Plan Bravo-Adaptive with 82% Resource Preservation...',
    'Step 12: Commander-in-the-Loop Official Digital Authorization...',
    'Step 13: Verifying Cryptographic Entry in Decision Audit Trail. Demo Complete!',
  ];

  const currentDesc = stepsText[tourStep - 1] || 'Running Automated Evaluation Tour...';
  const progressPercent = Math.min(100, Math.round((tourStep / 11) * 100));

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-2xl bg-[#09152E]/95 border-2 border-cyan-400 rounded-xl shadow-glow-cyan p-3.5 backdrop-blur-xl font-mono text-xs animate-bounce-subtle">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            AUTOMATED SIH DEMO TOUR RUNNING (STEP {tourStep}/11)
          </span>
        </div>
        <button
          onClick={() => setTourRunning(false)}
          className="text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-[#0D1D40] text-[10px]"
        >
          STOP TOUR [ESC]
        </button>
      </div>

      <p className="text-white text-xs font-semibold mb-2 leading-snug">
        {currentDesc}
      </p>

      {/* Progress Bar */}
      <div className="w-full bg-[#060D1E] h-1.5 rounded-full overflow-hidden border border-[#1A2E56]">
        <div
          className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}

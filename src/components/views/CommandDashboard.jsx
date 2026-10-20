// VIKRAM1 — Page 1: Main Command Dashboard
import React from 'react';
import { useApp } from '../../context/AppContext';
import MetricCard from '../common/MetricCard';
import TacticalMap from '../common/TacticalMap';
import LiveFeed from '../common/LiveFeed';
import DecisionPipeline from '../common/DecisionPipeline';
import DataFusionStatus from '../common/DataFusionStatus';
import {
  Plane,
  Activity,
  Users,
  Fuel,
  ShieldAlert,
  Cpu,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';

export default function CommandDashboard() {
  const {
    systemMetrics,
    activePlan,
    planApproved,
    setExplainModalOpen,
    setApprovalModalOpen,
    setCurrentView,
  } = useApp();

  return (
    <div className="space-y-5 animate-fadeIn font-mono">
      {/* Dashboard Top Header Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#1A2D54] gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold font-display tracking-wider text-white">
              VIKRAM1 COMMAND CENTRE
            </h2>
            <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
              OPERATIONAL OVERVIEW
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Real-Time Resource Ingestion, Continuous Constraint Verification & Explainable Decision Support
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <div className="px-3 py-1 rounded bg-[#09142B] border border-emerald-500/30 text-emerald-400 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SYSTEM STATUS: OPERATIONAL</span>
          </div>
          <div className="px-2.5 py-1 rounded bg-amber-950/40 border border-amber-600/40 text-amber-300 text-[10px]">
            DEMO / SYNTHETIC DATA
          </div>
        </div>
      </div>

      {/* 6 KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <MetricCard
          title="Available Aircraft"
          value={`${systemMetrics.aircraftAvailable} / ${systemMetrics.aircraftTotal}`}
          subtitle="75% Airworthy Fleet"
          icon={Plane}
          badgeText="NOMINAL"
          status="cyan"
        />
        <MetricCard
          title="Mission Readiness"
          value={`${systemMetrics.missionReadiness}%`}
          subtitle="Sortie Capability Index"
          trend="+4.2% today"
          icon={Activity}
          badgeText="HIGH"
          status="green"
        />
        <MetricCard
          title="Crew Availability"
          value={`${systemMetrics.crewAvailability}%`}
          subtitle="FDL Compliant Aircrew"
          icon={Users}
          badgeText="STABLE"
          status="green"
        />
        <MetricCard
          title="Fuel Readiness"
          value={`${systemMetrics.fuelReadiness}%`}
          subtitle="Base Hydrant Reserves"
          icon={Fuel}
          badgeText="ADEQUATE"
          status="neutral"
        />
        <MetricCard
          title="Active Constraints"
          value={`0${systemMetrics.activeConstraints}`}
          subtitle="Boundaries Monitored"
          icon={ShieldAlert}
          badgeText="2 CRITICAL"
          status="amber"
        />
        <MetricCard
          title="AI Recommendations"
          value={`0${systemMetrics.recommendations}`}
          subtitle="Candidate Plans Formulated"
          icon={Cpu}
          badgeText="SOLVED"
          status="green"
        />
      </div>

      {/* Central Section: Current Operational Picture (Map) + Live System Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Synthetic Airspace Map (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col">
          <TacticalMap />
        </div>

        {/* Live System Feed (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col">
          <LiveFeed />
        </div>
      </div>

      {/* AI Decision Pipeline Architecture */}
      <DecisionPipeline activeStage={5} />

      {/* Active Plan Recommendation & Sign-Off Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-[#08152F] to-[#0A1A3B] border border-cyan-500/40 shadow-hud-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-400" />
              CURRENT ACTIVE RECOMMENDATION: {activePlan.name}
            </span>
            <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
              FEASIBILITY: 96%
            </span>
            {planApproved && (
              <span className="text-[10px] bg-emerald-500 text-black px-2 py-0.5 rounded font-bold">
                OFFICIALLY APPROVED
              </span>
            )}
          </div>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Formulated for <strong>Scenario Alpha-07 (CAP Sortie)</strong>. Optimised allocation across Base Alpha assets with zero constraint conflicts and +14% fuel efficiency.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => setExplainModalOpen(true)}
            className="px-3.5 py-2 rounded-lg bg-[#0C1A36] hover:bg-[#122752] border border-[#1E3A70] text-cyan-300 text-xs font-bold transition-all flex items-center space-x-1.5"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>WHY THIS PLAN?</span>
          </button>

          <button
            onClick={() => setApprovalModalOpen(true)}
            className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wider transition-all flex items-center space-x-1.5 ${
              planApproved
                ? 'bg-emerald-950 border border-emerald-500 text-emerald-300'
                : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-glow-green'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{planApproved ? 'VIEW APPROVAL SEAL' : 'COMMANDER SIGN-OFF'}</span>
          </button>

          <button
            onClick={() => setCurrentView('planner')}
            className="px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold transition-all flex items-center space-x-1"
          >
            <span>MISSION PLANNER</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Multi-Source Data Fusion Status Grid */}
      <DataFusionStatus />
    </div>
  );
}

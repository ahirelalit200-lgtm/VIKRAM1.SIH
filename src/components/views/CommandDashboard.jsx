// VIKRAM1 — Page 1: Main Command Dashboard (Realistic Defence Enterprise Theme)
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
    <div className="space-y-4 font-sans">
      {/* Dashboard Top Header Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#D5DCE3] gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold tracking-tight text-[#1E3A5F]">
              VIKRAM1 COMMAND CENTRE
            </h2>
            <span className="text-[10px] bg-[#EBF2F7] text-[#1E3A5F] px-2 py-0.5 rounded border border-[#CFDFEC] font-semibold font-mono">
              OPERATIONAL OVERVIEW
            </span>
          </div>
          <p className="text-xs text-[#60717D]">
            Real-Time Resource Ingestion, Continuous Constraint Verification & Explainable Decision Support
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono">
          <div className="px-2.5 py-1 rounded bg-[#EDF7F2] border border-[#C4E5D4] text-[#2E7D5B] font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#2E7D5B]" />
            <span>SYSTEM STATUS: OPERATIONAL</span>
          </div>
          <div className="px-2 py-1 rounded bg-[#FFF8EB] border border-[#F5E1B5] text-[#B7791F] text-[10px] font-semibold">
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
      <div className="p-4 rounded-md bg-white border border-[#D5DCE3] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wide flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#526B82]" />
              CURRENT ACTIVE RECOMMENDATION: {activePlan.name}
            </span>
            <span className="text-[10px] bg-[#EDF7F2] text-[#2E7D5B] px-2 py-0.5 rounded border border-[#C4E5D4] font-bold font-mono">
              FEASIBILITY: 96%
            </span>
            {planApproved && (
              <span className="text-[10px] bg-[#2E7D5B] text-white px-2 py-0.5 rounded font-bold font-mono">
                OFFICIALLY APPROVED
              </span>
            )}
          </div>
          <p className="text-xs text-[#60717D] max-w-2xl leading-relaxed">
            Formulated for <strong>Scenario Alpha-07 (CAP Sortie)</strong>. Optimised allocation across Base Alpha assets with zero constraint conflicts and +14% fuel efficiency.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => setExplainModalOpen(true)}
            className="px-3 py-1.5 rounded bg-white hover:bg-[#F4F6F8] border border-[#D5DCE3] text-[#1E3A5F] text-xs font-semibold transition-colors flex items-center space-x-1.5"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#526B82]" />
            <span>WHY THIS PLAN?</span>
          </button>

          <button
            onClick={() => setApprovalModalOpen(true)}
            className={`px-4 py-1.5 rounded text-xs font-semibold tracking-wide transition-colors flex items-center space-x-1.5 shadow-sm ${
              planApproved
                ? 'bg-[#EDF7F2] border border-[#C4E5D4] text-[#2E7D5B]'
                : 'bg-[#2E7D5B] hover:bg-[#25664A] text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{planApproved ? 'VIEW APPROVAL SEAL' : 'COMMANDER SIGN-OFF'}</span>
          </button>

          <button
            onClick={() => setCurrentView('planner')}
            className="px-3.5 py-1.5 rounded bg-[#1E3A5F] hover:bg-[#162C47] text-white text-xs font-semibold transition-colors flex items-center space-x-1 shadow-sm"
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

// VIKRAM1 — Page 5: Airspace & Constraints Monitor
import React, { useState } from 'react';
import { SYNTHETIC_AIRSPACE_SECTORS, SYNTHETIC_CONSTRAINTS } from '../../data/mockData';
import TacticalMap from '../common/TacticalMap';
import {
  ShieldAlert,
  AlertTriangle,
  Radio,
  MapPin,
  ExternalLink,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Layers
} from 'lucide-react';

export default function AirspaceConstraints() {
  const [selectedConstraint, setSelectedConstraint] = useState(SYNTHETIC_CONSTRAINTS[0]);

  return (
    <div className="space-y-5 animate-fadeIn font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#1A2D54] gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold font-display tracking-wider text-white">
              AIRSPACE & CONSTRAINT MONITOR
            </h2>
            <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
              BOUNDARY VERIFIER
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Automated conflict detection across synthetic flight levels, temporary exclusion zones, and environmental hazards.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="px-2.5 py-1 rounded bg-rose-950/80 border border-rose-500/30 text-rose-300 font-bold">
            02 HARD BLOCKS
          </span>
          <span className="px-2.5 py-1 rounded bg-amber-950/80 border border-amber-500/30 text-amber-300 font-bold">
            04 ADVISORY WARNINGS
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Side: Airspace Map & Sector Status (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <TacticalMap />

          {/* Sector Breakdown Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SYNTHETIC_AIRSPACE_SECTORS.slice(0, 3).map((sector) => (
              <div
                key={sector.id}
                className="p-3 rounded-lg bg-[#091224] border border-[#1A2D54] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">{sector.name.split(' ')[0]} {sector.name.split(' ')[1]}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-bold border ${
                        sector.status === 'OPEN'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-500/30'
                          : sector.status === 'WARNING'
                          ? 'bg-amber-950 text-amber-300 border-amber-500/30'
                          : 'bg-rose-950 text-rose-300 border-rose-500/30'
                      }`}
                    >
                      {sector.status}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400">{sector.flightLevelRange}</div>
                  <div className="text-[10px] text-cyan-400 mt-1">CAPACITY: {sector.capacity}</div>
                </div>
                {sector.note && (
                  <div className="mt-2 text-[9px] text-amber-300/90 leading-tight">
                    * {sector.note}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Active Constraints List + Inspector (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#091224]/90 border border-[#1A2D54] rounded-xl p-4 reticle-box">
            <div className="flex items-center justify-between pb-2 border-b border-[#142344] mb-3">
              <div className="flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  ACTIVE CONSTRAINTS ({SYNTHETIC_CONSTRAINTS.length})
                </h3>
              </div>
              <span className="text-[10px] text-slate-400">Click to inspect</span>
            </div>

            <div className="space-y-2">
              {SYNTHETIC_CONSTRAINTS.map((con) => {
                const isSelected = selectedConstraint?.id === con.id;
                return (
                  <div
                    key={con.id}
                    onClick={() => setSelectedConstraint(con)}
                    className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-start justify-between ${
                      isSelected
                        ? 'bg-[#0E1F42] border-cyan-400 shadow-hud-border'
                        : 'bg-[#060D1E] border-[#142548] hover:border-cyan-500/30'
                    }`}
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-cyan-400 font-bold text-xs">{con.id}</span>
                        <span className="text-slate-200 text-xs font-semibold">{con.name}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        Sector: <span className="text-slate-300">{con.impactedSector}</span> | Category: {con.category}
                      </div>
                    </div>

                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-bold border shrink-0 ${
                        con.status === 'FAIL'
                          ? 'bg-rose-950 text-rose-300 border-rose-500/40'
                          : 'bg-amber-950 text-amber-300 border-amber-500/40'
                      }`}
                    >
                      {con.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Constraint Inspector Card */}
          {selectedConstraint && (
            <div className="p-4 rounded-xl bg-[#08152E] border border-cyan-500/40 shadow-glow-cyan text-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#1A2E56]">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-cyan-300">
                    CONSTRAINT DOSSIER: {selectedConstraint.id}
                  </span>
                </div>
                <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-slate-300 border border-slate-700">
                  SEVERITY: {selectedConstraint.severity}
                </span>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Description:</span>
                <p className="text-slate-200 mt-0.5 font-semibold">{selectedConstraint.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-500 block">IMPACTED SECTOR:</span>
                  <span className="text-white">{selectedConstraint.impactedSector}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">AFFECTED ASSETS:</span>
                  <span className="text-cyan-300 font-bold">{selectedConstraint.affectedAssets.join(', ')}</span>
                </div>
              </div>

              <div className="p-2.5 rounded bg-[#040A14] border border-[#142344]">
                <span className="text-emerald-400 font-bold text-[10px] uppercase block mb-0.5">
                  VIKRAM1 SOLVER RECOMMENDATION:
                </span>
                <p className="text-slate-300 text-[11px]">{selectedConstraint.recommendation}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

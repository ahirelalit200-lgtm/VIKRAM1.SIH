// VIKRAM1 — Page 5: Airspace & Constraints Monitor (Realistic Defence Enterprise Theme)
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
    <div className="space-y-4 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#D5DCE3] gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold tracking-tight text-[#1E3A5F]">
              AIRSPACE & CONSTRAINT MONITOR
            </h2>
            <span className="text-[10px] bg-[#EBF2F7] text-[#1E3A5F] px-2 py-0.5 rounded border border-[#CFDFEC] font-semibold font-mono">
              BOUNDARY VERIFIER
            </span>
          </div>
          <p className="text-xs text-[#60717D]">
            Automated conflict detection across synthetic flight levels, temporary exclusion zones, and environmental hazards.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-[#FDF2F2] border border-[#F7C8C8] text-[#B84242] font-semibold">
            02 HARD BLOCKS
          </span>
          <span className="px-2.5 py-1 rounded bg-[#FFF8EB] border border-[#F5E1B5] text-[#B7791F] font-semibold">
            04 ADVISORY WARNINGS
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Side: Airspace Map & Sector Status (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <TacticalMap />

          {/* Sector Breakdown Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SYNTHETIC_AIRSPACE_SECTORS.slice(0, 3).map((sector) => (
              <div
                key={sector.id}
                className="p-3 rounded bg-white border border-[#D5DCE3] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#1E3A5F]">{sector.name.split(' ')[0]} {sector.name.split(' ')[1]}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-bold font-mono border ${
                        sector.status === 'OPEN'
                          ? 'bg-[#EDF7F2] text-[#2E7D5B] border-[#C4E5D4]'
                          : sector.status === 'WARNING'
                          ? 'bg-[#FFF8EB] text-[#B7791F] border-[#F5E1B5]'
                          : 'bg-[#FDF2F2] text-[#B84242] border-[#F7C8C8]'
                      }`}
                    >
                      {sector.status}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#60717D] font-mono">{sector.flightLevelRange}</div>
                  <div className="text-[10px] text-[#263238] font-semibold font-mono mt-1">CAPACITY: {sector.capacity}</div>
                </div>
                {sector.note && (
                  <div className="mt-2 text-[9px] text-[#B7791F] leading-tight">
                    * {sector.note}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Active Constraints List + Inspector (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-[#D5DCE3] rounded-md p-4 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5EAEF] mb-3">
              <div className="flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 text-[#B7791F]" />
                <h3 className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wide">
                  ACTIVE CONSTRAINTS ({SYNTHETIC_CONSTRAINTS.length})
                </h3>
              </div>
              <span className="text-[10px] text-[#60717D]">Click to inspect</span>
            </div>

            <div className="space-y-2">
              {SYNTHETIC_CONSTRAINTS.map((con) => {
                const isSelected = selectedConstraint?.id === con.id;
                return (
                  <div
                    key={con.id}
                    onClick={() => setSelectedConstraint(con)}
                    className={`p-2.5 rounded border transition-colors cursor-pointer flex items-start justify-between ${
                      isSelected
                        ? 'bg-[#EBF2F7] border-[#1E3A5F]'
                        : 'bg-[#F8FAFC] border-[#E5EAEF] hover:border-[#D5DCE3]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[#1E3A5F] font-bold text-xs font-mono">{con.id}</span>
                        <span className="text-[#263238] text-xs font-semibold">{con.name}</span>
                      </div>
                      <div className="text-[10px] text-[#60717D] mt-1">
                        Sector: <span className="text-[#263238] font-medium">{con.impactedSector}</span> | Category: {con.category}
                      </div>
                    </div>

                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-bold font-mono border shrink-0 ${
                        con.status === 'FAIL'
                          ? 'bg-[#FDF2F2] text-[#B84242] border-[#F7C8C8]'
                          : 'bg-[#FFF8EB] text-[#B7791F] border-[#F5E1B5]'
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
            <div className="p-4 rounded-md bg-white border border-[#D5DCE3] shadow-sm text-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5EAEF]">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-[#B7791F]" />
                  <span className="font-bold text-[#1E3A5F]">
                    CONSTRAINT DOSSIER: {selectedConstraint.id}
                  </span>
                </div>
                <span className="text-[10px] bg-[#F4F6F8] px-2 py-0.5 rounded text-[#263238] border border-[#D5DCE3] font-mono font-semibold">
                  SEVERITY: {selectedConstraint.severity}
                </span>
              </div>

              <div>
                <span className="text-[#60717D] text-[10px] uppercase font-semibold block">Description:</span>
                <p className="text-[#263238] mt-0.5 font-semibold">{selectedConstraint.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-[#60717D] block">IMPACTED SECTOR:</span>
                  <span className="text-[#263238] font-medium">{selectedConstraint.impactedSector}</span>
                </div>
                <div>
                  <span className="text-[#60717D] block">AFFECTED ASSETS:</span>
                  <span className="text-[#1E3A5F] font-bold font-mono">{selectedConstraint.affectedAssets.join(', ')}</span>
                </div>
              </div>

              <div className="p-2.5 rounded bg-[#F8FAFC] border border-[#E5EAEF]">
                <span className="text-[#2E7D5B] font-bold text-[10px] uppercase block mb-0.5 font-mono">
                  SOLVER RECOMMENDATION:
                </span>
                <p className="text-[#263238] text-[11px]">{selectedConstraint.recommendation}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

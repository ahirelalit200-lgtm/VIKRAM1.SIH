// VIKRAM1 — Page 4: Crew Readiness & Duty Cycle Monitor
import React, { useState } from 'react';
import { SYNTHETIC_CREW } from '../../data/mockData';
import {
  Users,
  ShieldCheck,
  Clock,
  HeartPulse,
  Award,
  AlertTriangle,
  Search,
  CheckCircle2
} from 'lucide-react';

export default function CrewStatus() {
  const [filterRole, setFilterRole] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const totalCrew = SYNTHETIC_CREW.length;
  const availableCrew = SYNTHETIC_CREW.filter((c) => c.availability === 'AVAILABLE').length;
  const assignedCrew = SYNTHETIC_CREW.filter((c) => c.availability === 'ASSIGNED').length;
  const restingCrew = SYNTHETIC_CREW.filter((c) => c.availability === 'RESTING').length;
  const unavailableCrew = SYNTHETIC_CREW.filter((c) => c.availability === 'UNAVAILABLE').length;

  const filteredCrew = SYNTHETIC_CREW.filter((crew) => {
    const matchesRole = filterRole === 'ALL' || crew.role.toLowerCase().includes(filterRole.toLowerCase());
    const matchesSearch =
      crew.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crew.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crew.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-5 animate-fadeIn font-mono">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#1A2D54] gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold font-display tracking-wider text-white">
              CREW READINESS & DUTY CYCLE TRACKER
            </h2>
            <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
              FATIGUE COMPLIANT
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Automated Flight Duty Limitation (FDL) monitoring, mandatory rest intervals, and pilot type-currency certification.
          </p>
        </div>

        <div className="px-3 py-1 rounded bg-[#09152B] border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>FDL COMPLIANCE: 91%</span>
        </div>
      </div>

      {/* 5 Status Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-3 rounded-xl bg-[#091224] border border-[#1A2D54]">
          <span className="text-[10px] text-slate-400 uppercase">Total Aircrew</span>
          <div className="text-xl font-bold text-white mt-0.5">{totalCrew}</div>
          <span className="text-[10px] text-slate-500">Registered Roster</span>
        </div>
        <div className="p-3 rounded-xl bg-[#091224] border border-emerald-500/30">
          <span className="text-[10px] text-slate-400 uppercase">Available</span>
          <div className="text-xl font-bold text-emerald-400 mt-0.5">{availableCrew}</div>
          <span className="text-[10px] text-emerald-400/80">Flight Ready</span>
        </div>
        <div className="p-3 rounded-xl bg-[#091224] border border-cyan-500/30">
          <span className="text-[10px] text-slate-400 uppercase">Assigned Sortie</span>
          <div className="text-xl font-bold text-cyan-400 mt-0.5">{assignedCrew}</div>
          <span className="text-[10px] text-cyan-400/80">Active Aircrew</span>
        </div>
        <div className="p-3 rounded-xl bg-[#091224] border border-amber-500/30">
          <span className="text-[10px] text-slate-400 uppercase">Resting (FDL)</span>
          <div className="text-xl font-bold text-amber-400 mt-0.5">{restingCrew}</div>
          <span className="text-[10px] text-amber-400/80">Mandatory Buffer</span>
        </div>
        <div className="p-3 rounded-xl bg-[#091224] border border-rose-500/30">
          <span className="text-[10px] text-slate-400 uppercase">Unavailable</span>
          <div className="text-xl font-bold text-rose-400 mt-0.5">{unavailableCrew}</div>
          <span className="text-[10px] text-rose-400/80">Medical / Leave</span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-[#091224]/90 border border-[#1A2D54] rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search officer name, crew ID, squadron..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#050C1B] border border-[#1A2E56] rounded-lg pl-9 pr-3 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex items-center space-x-1.5">
          <span className="text-slate-500 text-[11px]">ROLE:</span>
          {['ALL', 'Pilot', 'Navigator', 'Tactical', 'Commander'].map((role) => (
            <button
              key={role}
              onClick={() => setFilterRole(role)}
              className={`px-2.5 py-1 rounded text-[10px] transition-colors ${
                filterRole === role
                  ? 'bg-cyan-500 text-black font-bold'
                  : 'bg-[#060D1E] text-slate-400 hover:text-white'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Crew Table */}
      <div className="bg-[#091224]/90 border border-[#1A2D54] rounded-xl overflow-hidden reticle-box">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#050B17] border-b border-[#1A2D54] text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Crew ID</th>
                <th className="py-3 px-4">Officer Name & Rank</th>
                <th className="py-3 px-4">Role & Qualification</th>
                <th className="py-3 px-4">Availability</th>
                <th className="py-3 px-4">Duty Status (FDL)</th>
                <th className="py-3 px-4">Monthly Hours</th>
                <th className="py-3 px-4">Medical Clearance</th>
                <th className="py-3 px-4 text-right">Readiness Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#122244]">
              {filteredCrew.map((crew) => (
                <tr key={crew.id} className="hover:bg-[#0C1B3B]/60 transition-colors">
                  <td className="py-3 px-4 font-bold text-cyan-300">{crew.id}</td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-white">{crew.name}</div>
                    <div className="text-[10px] text-slate-500">{crew.squadron} • {crew.base}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-300">{crew.role}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        crew.availability === 'AVAILABLE'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                          : crew.availability === 'ASSIGNED'
                          ? 'bg-cyan-950 text-cyan-300 border-cyan-500/40'
                          : crew.availability === 'RESTING'
                          ? 'bg-amber-950 text-amber-300 border-amber-500/40'
                          : 'bg-rose-950 text-rose-300 border-rose-500/40'
                      }`}
                    >
                      {crew.availability}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span className={`text-[11px] ${crew.availability === 'RESTING' ? 'text-amber-400 font-bold' : 'text-slate-300'}`}>
                        {crew.dutyStatus}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-300">{crew.flightHoursMonth} hrs / 60h max</td>
                  <td className="py-3 px-4">
                    <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {crew.medicalClearance}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-cyan-300">
                    <div className="flex items-center justify-end space-x-2">
                      <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${crew.readiness > 80 ? 'bg-cyan-400' : 'bg-amber-400'}`}
                          style={{ width: `${crew.readiness}%` }}
                        />
                      </div>
                      <span>{crew.readiness}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

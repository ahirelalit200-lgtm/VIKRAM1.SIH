// VIKRAM1 — Page 4: Crew Readiness & Duty Cycle Monitor (Realistic Defence Enterprise Theme)
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
    <div className="space-y-4 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#D5DCE3] gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold tracking-tight text-[#1E3A5F]">
              CREW READINESS & DUTY CYCLE TRACKER
            </h2>
            <span className="text-[10px] bg-[#EDF7F2] text-[#2E7D5B] px-2 py-0.5 rounded border border-[#C4E5D4] font-semibold font-mono">
              FDL COMPLIANT
            </span>
          </div>
          <p className="text-xs text-[#60717D]">
            Automated Flight Duty Limitation (FDL) monitoring, mandatory rest intervals, and pilot type-currency certification.
          </p>
        </div>

        <div className="px-3 py-1 rounded bg-[#EDF7F2] border border-[#C4E5D4] text-[#2E7D5B] text-xs font-semibold flex items-center gap-1.5 font-mono">
          <ShieldCheck className="w-4 h-4 text-[#2E7D5B]" />
          <span>FDL COMPLIANCE: 91%</span>
        </div>
      </div>

      {/* 5 Status Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-3 rounded-md bg-white border border-[#D5DCE3] shadow-sm">
          <span className="text-[10px] text-[#60717D] uppercase font-semibold">Total Aircrew</span>
          <div className="text-xl font-bold text-[#263238] font-mono mt-0.5">{totalCrew}</div>
          <span className="text-[10px] text-[#60717D]">Registered Roster</span>
        </div>
        <div className="p-3 rounded-md bg-white border border-[#D5DCE3] shadow-sm">
          <span className="text-[10px] text-[#60717D] uppercase font-semibold">Available</span>
          <div className="text-xl font-bold text-[#2E7D5B] font-mono mt-0.5">{availableCrew}</div>
          <span className="text-[10px] text-[#2E7D5B]">Flight Ready</span>
        </div>
        <div className="p-3 rounded-md bg-white border border-[#D5DCE3] shadow-sm">
          <span className="text-[10px] text-[#60717D] uppercase font-semibold">Assigned Sortie</span>
          <div className="text-xl font-bold text-[#1E3A5F] font-mono mt-0.5">{assignedCrew}</div>
          <span className="text-[10px] text-[#1E3A5F]">Active Aircrew</span>
        </div>
        <div className="p-3 rounded-md bg-white border border-[#D5DCE3] shadow-sm">
          <span className="text-[10px] text-[#60717D] uppercase font-semibold">Resting (FDL)</span>
          <div className="text-xl font-bold text-[#B7791F] font-mono mt-0.5">{restingCrew}</div>
          <span className="text-[10px] text-[#B7791F]">Mandatory Buffer</span>
        </div>
        <div className="p-3 rounded-md bg-white border border-[#D5DCE3] shadow-sm">
          <span className="text-[10px] text-[#60717D] uppercase font-semibold">Unavailable</span>
          <div className="text-xl font-bold text-[#B84242] font-mono mt-0.5">{unavailableCrew}</div>
          <span className="text-[10px] text-[#B84242]">Medical / Leave</span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white border border-[#D5DCE3] rounded-md p-3 flex flex-wrap items-center justify-between gap-3 text-xs shadow-sm">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-[#60717D] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search officer name, crew ID, squadron..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#D5DCE3] rounded pl-9 pr-3 py-1.5 text-[#263238] placeholder-[#9AA5B1] focus:outline-none focus:border-[#1E3A5F]"
          />
        </div>

        <div className="flex items-center space-x-1.5">
          <span className="text-[#60717D] text-[11px] font-semibold">ROLE:</span>
          {['ALL', 'Pilot', 'Navigator', 'Tactical', 'Commander'].map((role) => (
            <button
              key={role}
              onClick={() => setFilterRole(role)}
              className={`px-2.5 py-1 rounded text-[10px] transition-colors ${
                filterRole === role
                  ? 'bg-[#1E3A5F] text-white font-semibold'
                  : 'bg-[#F4F6F8] text-[#526B82] hover:bg-[#E8ECF0]'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Crew Table */}
      <div className="bg-white border border-[#D5DCE3] rounded-md overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAFCFD] border-b border-[#D5DCE3] text-[#60717D] uppercase text-[10px] tracking-wider font-semibold font-mono">
              <tr>
                <th className="py-2.5 px-4">Crew ID</th>
                <th className="py-2.5 px-4">Officer Name & Rank</th>
                <th className="py-2.5 px-4">Role & Qualification</th>
                <th className="py-2.5 px-4">Availability</th>
                <th className="py-2.5 px-4">Duty Status (FDL)</th>
                <th className="py-2.5 px-4">Monthly Hours</th>
                <th className="py-2.5 px-4">Medical Clearance</th>
                <th className="py-2.5 px-4 text-right">Readiness Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAEF]">
              {filteredCrew.map((crew) => (
                <tr key={crew.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-2.5 px-4 font-bold text-[#1E3A5F] font-mono">{crew.id}</td>
                  <td className="py-2.5 px-4">
                    <div className="font-semibold text-[#263238]">{crew.name}</div>
                    <div className="text-[10px] text-[#60717D]">{crew.squadron} • {crew.base}</div>
                  </td>
                  <td className="py-2.5 px-4 text-[#263238]">{crew.role}</td>
                  <td className="py-2.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${
                        crew.availability === 'AVAILABLE'
                          ? 'bg-[#EDF7F2] text-[#2E7D5B] border-[#C4E5D4]'
                          : crew.availability === 'ASSIGNED'
                          ? 'bg-[#EBF2F7] text-[#1E3A5F] border-[#CFDFEC]'
                          : crew.availability === 'RESTING'
                          ? 'bg-[#FFF8EB] text-[#B7791F] border-[#F5E1B5]'
                          : 'bg-[#FDF2F2] text-[#B84242] border-[#F7C8C8]'
                      }`}
                    >
                      {crew.availability}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 font-mono">
                    <div className="flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#60717D]" />
                      <span className={`text-[11px] ${crew.availability === 'RESTING' ? 'text-[#B7791F] font-bold' : 'text-[#263238]'}`}>
                        {crew.dutyStatus}
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 px-4 text-[#263238] font-mono">{crew.flightHoursMonth} hrs / 60h max</td>
                  <td className="py-2.5 px-4">
                    <span className="text-[11px] text-[#2E7D5B] flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      {crew.medicalClearance}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-right font-bold text-[#263238] font-mono">
                    <div className="flex items-center justify-end space-x-2">
                      <div className="w-16 bg-[#E2E8F0] h-1.5 rounded overflow-hidden">
                        <div
                          className={`h-full ${crew.readiness > 80 ? 'bg-[#2E7D5B]' : 'bg-[#B7791F]'}`}
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

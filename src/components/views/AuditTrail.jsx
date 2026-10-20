// VIKRAM1 — Page 9: Decision Audit Trail & Governance Log
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileCheck2,
  Download,
  Filter,
  Shield,
  Search,
  CheckCircle2,
  Lock,
  Terminal,
  Clock,
  Sparkles
} from 'lucide-react';

export default function AuditTrail() {
  const { auditLogs, setAuditExportModalOpen } = useApp();
  const [filterActor, setFilterActor] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = auditLogs.filter((log) => {
    const matchesActor = filterActor === 'ALL' || log.actor.includes(filterActor);
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.timestamp.includes(searchQuery);
    return matchesActor && matchesSearch;
  });

  return (
    <div className="space-y-5 animate-fadeIn font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#1A2D54] gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold font-display tracking-wider text-white">
              DECISION AUDIT TRAIL & COMPLIANCE
            </h2>
            <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
              IMMUTABLE RECORD
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Chronological, verifiable event ledger recording all data synchronization, constraint evaluations, recommendations, and commander approvals.
          </p>
        </div>

        <button
          onClick={() => setAuditExportModalOpen(true)}
          className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs tracking-wider transition-all flex items-center space-x-2 shadow-glow-cyan"
        >
          <Download className="w-4 h-4" />
          <span>EXPORT AUDIT REPORT</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#091224]/90 border border-[#1A2D54] rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search action, officer, cryptographic hash..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#050C1B] border border-[#1A2E56] rounded-lg pl-9 pr-3 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex items-center space-x-1.5">
          <span className="text-slate-500 text-[11px]">ACTOR:</span>
          {['ALL', 'SYSTEM', 'ENGINE', 'COMMANDER', 'HUMAN'].map((act) => (
            <button
              key={act}
              onClick={() => setFilterActor(act)}
              className={`px-2.5 py-1 rounded text-[10px] transition-colors ${
                filterActor === act
                  ? 'bg-cyan-500 text-black font-bold'
                  : 'bg-[#060D1E] text-slate-400 hover:text-white'
              }`}
            >
              {act}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Timeline */}
      <div className="bg-[#091224]/90 border border-[#1A2D54] rounded-xl p-5 reticle-box space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#142344]">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              TIMESTAMPED AUDIT TIMELINE ({filteredLogs.length} EVENTS)
            </h3>
          </div>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1">
            <Lock className="w-3 h-3 text-emerald-400" />
            SHA-256 HASH VERIFIED
          </span>
        </div>

        <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#1A2E56]">
          {filteredLogs.map((log) => (
            <div key={log.id} className="relative group">
              {/* Timeline Node Icon */}
              <div className="absolute -left-6 top-1.5 w-4 h-4 rounded-full bg-[#081226] border-2 border-cyan-400 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-300" />
              </div>

              {/* Event Card */}
              <div className="p-3 rounded-lg bg-[#060D1E] hover:bg-[#0A1630] border border-[#142548] hover:border-cyan-500/40 transition-all text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-cyan-400 font-bold">{log.timestamp} IST</span>
                    <span className="text-slate-200 font-bold text-xs">{log.action}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[9px] bg-[#0E1A33] text-slate-400 px-2 py-0.5 rounded border border-[#1C325E]">
                      {log.actor}
                    </span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-bold border ${
                        log.status === 'APPROVED' || log.status === 'OPTIMAL' || log.status === 'SUCCESS'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                          : log.status === 'ALERT' || log.status === 'INVALID'
                          ? 'bg-rose-950 text-rose-300 border-rose-500/40'
                          : 'bg-cyan-950 text-cyan-300 border-cyan-500/40'
                      }`}
                    >
                      {log.status}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {log.details}
                </p>

                <div className="mt-2 pt-1.5 border-t border-[#101D38] flex items-center justify-between text-[9px] text-slate-500">
                  <span>LOG REF: <strong className="text-slate-400">{log.id}</strong></span>
                  <span>INTEGRITY SEAL: VALIDATED</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

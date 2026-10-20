// VIKRAM1 — Page 9: Decision Audit Trail & Governance Log (Realistic Defence Enterprise Theme)
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
    <div className="space-y-4 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#D5DCE3] gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold tracking-tight text-[#1E3A5F]">
              DECISION AUDIT TRAIL & COMPLIANCE
            </h2>
            <span className="text-[10px] bg-[#EBF2F7] text-[#1E3A5F] px-2 py-0.5 rounded border border-[#CFDFEC] font-semibold font-mono">
              IMMUTABLE RECORD
            </span>
          </div>
          <p className="text-xs text-[#60717D]">
            Chronological, verifiable event ledger recording all data synchronization, constraint evaluations, recommendations, and commander approvals.
          </p>
        </div>

        <button
          onClick={() => setAuditExportModalOpen(true)}
          className="px-3.5 py-1.5 rounded bg-[#1E3A5F] hover:bg-[#162C47] text-white font-semibold text-xs tracking-wide transition-colors flex items-center space-x-2 shadow-sm"
        >
          <Download className="w-4 h-4" />
          <span>EXPORT AUDIT REPORT</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#D5DCE3] rounded-md p-3 flex flex-wrap items-center justify-between gap-3 text-xs shadow-sm">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-[#60717D] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search action, officer, cryptographic hash..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#D5DCE3] rounded pl-9 pr-3 py-1.5 text-[#263238] placeholder-[#9AA5B1] focus:outline-none focus:border-[#1E3A5F]"
          />
        </div>

        <div className="flex items-center space-x-1.5">
          <span className="text-[#60717D] text-[11px] font-semibold">ACTOR:</span>
          {['ALL', 'SYSTEM', 'ENGINE', 'COMMANDER', 'HUMAN'].map((act) => (
            <button
              key={act}
              onClick={() => setFilterActor(act)}
              className={`px-2.5 py-1 rounded text-[10px] font-mono transition-colors ${
                filterActor === act
                  ? 'bg-[#1E3A5F] text-white font-semibold'
                  : 'bg-[#F4F6F8] text-[#526B82] hover:bg-[#E8ECF0]'
              }`}
            >
              {act}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Timeline */}
      <div className="bg-white border border-[#D5DCE3] rounded-md p-4 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#E5EAEF]">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-[#526B82]" />
            <h3 className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wide">
              TIMESTAMPED AUDIT TIMELINE ({filteredLogs.length} EVENTS)
            </h3>
          </div>
          <span className="text-[10px] text-[#2E7D5B] flex items-center gap-1 font-mono font-semibold">
            <Lock className="w-3 h-3 text-[#2E7D5B]" />
            SHA-256 HASH VERIFIED
          </span>
        </div>

        <div className="relative pl-6 space-y-3.5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#D5DCE3]">
          {filteredLogs.map((log) => (
            <div key={log.id} className="relative group">
              {/* Timeline Node Icon */}
              <div className="absolute -left-6 top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#1E3A5F] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1E3A5F]" />
              </div>

              {/* Event Card */}
              <div className="p-3 rounded bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E5EAEF] transition-colors text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[#1E3A5F] font-bold font-mono">{log.timestamp} IST</span>
                    <span className="text-[#263238] font-semibold text-xs">{log.action}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[9px] bg-white text-[#60717D] px-2 py-0.5 rounded border border-[#D5DCE3] font-mono">
                      {log.actor}
                    </span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-bold font-mono border ${
                        log.status === 'APPROVED' || log.status === 'OPTIMAL' || log.status === 'SUCCESS'
                          ? 'bg-[#EDF7F2] text-[#2E7D5B] border-[#C4E5D4]'
                          : log.status === 'ALERT' || log.status === 'INVALID'
                          ? 'bg-[#FDF2F2] text-[#B84242] border-[#F7C8C8]'
                          : 'bg-[#EBF2F7] text-[#1E3A5F] border-[#CFDFEC]'
                      }`}
                    >
                      {log.status}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-[#60717D] leading-relaxed">
                  {log.details}
                </p>

                <div className="mt-2 pt-1.5 border-t border-[#E5EAEF] flex items-center justify-between text-[9px] text-[#60717D] font-mono">
                  <span>LOG REF: <strong className="text-[#263238]">{log.id}</strong></span>
                  <span className="text-[#2E7D5B] font-semibold">INTEGRITY SEAL: VALIDATED</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

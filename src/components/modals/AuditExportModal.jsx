// VIKRAM1 — Audit Report Export Modal & Document Preview
import React from 'react';
import { useApp } from '../../context/AppContext';
import { DecisionEngineService } from '../../services/decisionEngineService';
import { Download, FileText, CheckCircle2, X, Printer, Shield } from 'lucide-react';

export default function AuditExportModal() {
  const { auditExportModalOpen, setAuditExportModalOpen, auditLogs, systemMetrics, userProfile } = useApp();

  if (!auditExportModalOpen) return null;

  const handleDownloadJSON = () => {
    DecisionEngineService.generateAuditExport(auditLogs, systemMetrics);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-mono animate-fadeIn">
      <div className="bg-[#081226] border border-cyan-400/50 rounded-2xl w-full max-w-3xl shadow-glow-cyan overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 bg-[#050B17] border-b border-[#1A2D54] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wider uppercase">
                DECISION AUDIT REPORT EXPORT
              </h2>
              <p className="text-xs text-slate-400">
                Official DSSC Compliance Document (SIH 2026 PS-26250)
              </p>
            </div>
          </div>
          <button
            onClick={() => setAuditExportModalOpen(false)}
            className="p-1 rounded bg-[#0F1E3D] hover:bg-slate-700 text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable/Export Preview */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          <div className="p-5 rounded-xl bg-[#050B17] border border-[#1A2E56] space-y-4">
            <div className="flex justify-between items-start border-b border-[#142344] pb-3">
              <div>
                <h3 className="text-sm font-bold text-cyan-300 tracking-wider">
                  DEFENCE SERVICES STAFF COLLEGE • VIKRAM1
                </h3>
                <p className="text-[11px] text-slate-400">
                  AI-Assisted Dynamic Air Operations & Resource Optimisation
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-600/40 font-bold">
                  DEMO AUDIT RECORD
                </span>
                <p className="text-[10px] text-slate-500 mt-1">DOC ID: DSSC-AUD-2026-X91</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[11px]">
              <div><span className="text-slate-500">OPERATIONAL DESK:</span> <div className="text-slate-200">{userProfile.name}</div></div>
              <div><span className="text-slate-500">SYSTEM STATE:</span> <div className="text-emerald-400 font-bold">{systemMetrics.systemStatus}</div></div>
              <div><span className="text-slate-500">RECORDS LOGGED:</span> <div className="text-cyan-300 font-bold">{auditLogs.length} Events</div></div>
            </div>

            {/* Timeline in Document */}
            <div className="mt-4 pt-3 border-t border-[#142344]">
              <h4 className="text-[11px] font-bold text-slate-300 uppercase mb-2">
                VERIFIED DECISION EVENTS CHRONOLOGY:
              </h4>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-2 rounded bg-[#071021] border border-[#142344] flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-cyan-400 font-bold">{log.timestamp}</span>
                        <span className="text-slate-300 font-semibold">{log.action}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">{log.details}</p>
                    </div>
                    <span className="text-[9px] bg-slate-900 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      {log.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#142344] flex justify-between items-center text-[10px] text-slate-500">
              <span>CRYPTOGRAPHIC SEAL: SHA256-SYNTH-9A4B8F12C098E764210D3B5F6C7E8A90</span>
              <span className="text-emerald-400 font-semibold">100% AUDIT INTEGRITY</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#050B17] border-t border-[#1A2D54] flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Export compliant with standard defence electronic records guidelines.
          </span>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setAuditExportModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-[#0E1A33] hover:bg-[#13264D] text-slate-300 text-xs transition-colors"
            >
              DISMISS
            </button>
            <button
              onClick={handleDownloadJSON}
              className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs tracking-wider transition-all flex items-center space-x-2 shadow-glow-cyan"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD JSON REPORT</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

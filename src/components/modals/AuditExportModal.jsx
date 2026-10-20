// VIKRAM1 — Audit Report Export Modal & Document Preview (Realistic Defence Enterprise Theme)
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-none font-sans animate-fadeIn">
      <div className="bg-white border border-[#D5DCE3] rounded-md w-full max-w-3xl shadow-xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 bg-[#FAFCFD] border-b border-[#E5EAEF] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 rounded bg-[#EBF2F7] border border-[#CFDFEC] text-[#1E3A5F]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1E3A5F] tracking-tight uppercase">
                DECISION AUDIT REPORT EXPORT
              </h2>
              <p className="text-xs text-[#60717D]">
                Official Compliance Document (SIH 2026 PS-26250)
              </p>
            </div>
          </div>
          <button
            onClick={() => setAuditExportModalOpen(false)}
            className="p-1 rounded bg-[#F4F6F8] hover:bg-[#E8ECF0] text-[#60717D] hover:text-[#263238]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable/Export Preview */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          <div className="p-5 rounded bg-white border border-[#D5DCE3] shadow-sm space-y-4">
            <div className="flex justify-between items-start border-b border-[#E5EAEF] pb-3">
              <div>
                <h3 className="text-sm font-bold text-[#1E3A5F] tracking-wide">
                  DEFENCE SERVICES STAFF COLLEGE • VIKRAM1
                </h3>
                <p className="text-[11px] text-[#60717D]">
                  Dynamic Air Operations & Resource Optimisation
                </p>
              </div>
              <div className="text-right font-mono">
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#F4F6F8] text-[#526B82] border border-[#D5DCE3] font-semibold">
                  AUDIT RECORD
                </span>
                <p className="text-[10px] text-[#8295A5] mt-1">DOC ID: DSSC-AUD-2026-X91</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[11px]">
              <div><span className="text-[#60717D]">OPERATIONAL DESK:</span> <div className="text-[#263238] font-medium">{userProfile.name}</div></div>
              <div><span className="text-[#60717D]">SYSTEM STATE:</span> <div className="text-[#2E7D5B] font-bold font-mono">{systemMetrics.systemStatus}</div></div>
              <div><span className="text-[#60717D]">RECORDS LOGGED:</span> <div className="text-[#1E3A5F] font-bold font-mono">{auditLogs.length} Events</div></div>
            </div>

            {/* Timeline in Document */}
            <div className="mt-4 pt-3 border-t border-[#E5EAEF]">
              <h4 className="text-[11px] font-bold text-[#263238] uppercase mb-2">
                VERIFIED DECISION EVENTS CHRONOLOGY:
              </h4>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-2 rounded bg-[#F8FAFC] border border-[#E5EAEF] flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[#1E3A5F] font-bold font-mono">{log.timestamp}</span>
                        <span className="text-[#263238] font-semibold">{log.action}</span>
                      </div>
                      <p className="text-[10px] text-[#60717D] mt-0.5">{log.details}</p>
                    </div>
                    <span className="text-[9px] bg-white text-[#2E7D5B] px-1.5 py-0.5 rounded border border-[#C4E5D4] font-mono font-semibold">
                      {log.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5EAEF] flex justify-between items-center text-[10px] text-[#60717D] font-mono">
              <span>DIGEST: SHA256-SYNTH-9A4B8F12C098E764210D3B5F6C7E8A90</span>
              <span className="text-[#2E7D5B] font-semibold">100% AUDIT INTEGRITY</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#FAFCFD] border-t border-[#E5EAEF] flex items-center justify-between">
          <span className="text-[11px] text-[#60717D]">
            Export compliant with standard electronic records format.
          </span>
          <div className="flex items-center space-x-2.5">
            <button
              onClick={() => setAuditExportModalOpen(false)}
              className="px-3.5 py-1.5 rounded bg-[#F4F6F8] hover:bg-[#E8ECF0] text-[#263238] text-xs font-semibold transition-colors border border-[#D5DCE3]"
            >
              DISMISS
            </button>
            <button
              onClick={handleDownloadJSON}
              className="px-4 py-1.5 rounded bg-[#1E3A5F] hover:bg-[#162C47] text-white font-semibold text-xs tracking-wide transition-colors flex items-center space-x-2 shadow-sm"
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

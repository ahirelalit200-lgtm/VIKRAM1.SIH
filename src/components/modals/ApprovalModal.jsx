// VIKRAM1 — Human-in-the-Loop Commander Approval Modal (Realistic Defence Enterprise Theme)
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  UserCheck,
  CheckCircle2,
  FileSignature,
  Shield,
  X,
  AlertCircle
} from 'lucide-react';

export default function ApprovalModal() {
  const {
    approvalModalOpen,
    setApprovalModalOpen,
    activePlan,
    userProfile,
    approveCurrentPlan,
    planApproved,
    approvalRecord,
  } = useApp();

  const [officerNotes, setOfficerNotes] = useState('Authorized for synthetic mission dispatch under DSSC Standard Rules.');
  const [securityCode, setSecurityCode] = useState('26250');
  const [isSigning, setIsSigning] = useState(false);

  if (!approvalModalOpen) return null;

  const handleApprove = () => {
    setIsSigning(true);
    setTimeout(() => {
      approveCurrentPlan(officerNotes);
      setIsSigning(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-none font-sans animate-fadeIn">
      <div className="bg-white border border-[#D5DCE3] rounded-md w-full max-w-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-[#FAFCFD] border-b border-[#E5EAEF] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 rounded bg-[#EDF7F2] border border-[#C4E5D4] text-[#2E7D5B]">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1E3A5F] tracking-tight uppercase">
                COMMANDER AUTHORIZATION DESK
              </h2>
              <p className="text-xs text-[#60717D]">
                Official Digital Sign-off & Tasking Dispatch Portal
              </p>
            </div>
          </div>
          <button
            onClick={() => setApprovalModalOpen(false)}
            className="p-1 rounded bg-[#F4F6F8] hover:bg-[#E8ECF0] text-[#60717D] hover:text-[#263238]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {planApproved && approvalRecord ? (
            /* Digital Approval Certificate */
            <div className="p-4 rounded bg-[#EDF7F2] border-2 border-[#2E7D5B] space-y-3 text-center">
              <div className="w-12 h-12 rounded-full bg-white border-2 border-[#2E7D5B] text-[#2E7D5B] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-[#2E7D5B] tracking-wide">
                PLAN OFFICIALLY AUTHORIZED
              </h3>
              <p className="text-xs text-[#263238]">
                Decision registered to immutable audit log. Tasking orders broadcast to Base Alpha and Base Bravo operations desks.
              </p>

              <div className="p-3 rounded bg-white border border-[#C4E5D4] text-left text-xs space-y-1.5 mt-3 font-mono">
                <div className="flex justify-between">
                  <span className="text-[#60717D]">AUTHORIZED PLAN:</span>
                  <span className="text-[#1E3A5F] font-bold">{approvalRecord.planName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#60717D]">AUTHORIZING OFFICER:</span>
                  <span className="text-[#263238] font-bold">{approvalRecord.approver} ({approvalRecord.role})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#60717D]">TIMESTAMP:</span>
                  <span className="text-[#263238]">{approvalRecord.timestamp} IST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#60717D]">DIGITAL HASH:</span>
                  <span className="text-[#2E7D5B] text-[10px]">{approvalRecord.hash}</span>
                </div>
              </div>
            </div>
          ) : (
            /* Signing Form */
            <div className="space-y-3.5">
              <div className="p-3.5 rounded bg-[#F8FAFC] border border-[#D5DCE3] text-xs space-y-2">
                <div className="flex justify-between items-center text-[#60717D]">
                  <span className="font-semibold">SUBJECT MISSION PLAN:</span>
                  <span className="text-[#1E3A5F] font-bold">{activePlan.name}</span>
                </div>
                <div className="flex justify-between items-center text-[#60717D]">
                  <span className="font-semibold">FEASIBILITY SCORE:</span>
                  <span className="text-[#2E7D5B] font-bold font-mono">96% (0 Violations)</span>
                </div>
                <div className="flex justify-between items-center text-[#60717D]">
                  <span className="font-semibold">AUTHORIZING DESK:</span>
                  <span className="text-[#263238] font-medium">{userProfile.name} | {userProfile.role}</span>
                </div>
              </div>

              <div>
                <label className="text-xs text-[#263238] font-semibold block mb-1">
                  COMMANDER DIRECTIVE / OPERATIONAL REMARKS:
                </label>
                <textarea
                  value={officerNotes}
                  onChange={(e) => setOfficerNotes(e.target.value)}
                  rows="3"
                  className="w-full bg-white border border-[#D5DCE3] rounded p-2 text-xs text-[#263238] focus:outline-none focus:border-[#1E3A5F]"
                />
              </div>

              <div>
                <label className="text-xs text-[#263238] font-semibold block mb-1">
                  SECURITY CLEARANCE PIN:
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="password"
                    value={securityCode}
                    onChange={(e) => setSecurityCode(e.target.value)}
                    className="bg-white border border-[#D5DCE3] rounded px-3 py-1.5 text-xs text-[#1E3A5F] w-32 font-mono font-bold tracking-widest text-center focus:border-[#1E3A5F] focus:outline-none"
                  />
                  <span className="text-[10px] text-[#60717D]">
                    * Pre-authenticated for presentation
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded bg-[#FFF8EB] border border-[#F5E1B5] text-[#B7791F] text-[11px] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>
                  VIKRAM1 operates as a decision-support advisory system. Operational command authority rests with human leadership.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#FAFCFD] border-t border-[#E5EAEF] flex items-center justify-end space-x-2.5">
          <button
            onClick={() => setApprovalModalOpen(false)}
            className="px-3.5 py-1.5 rounded bg-[#F4F6F8] hover:bg-[#E8ECF0] text-[#263238] text-xs font-semibold transition-colors border border-[#D5DCE3]"
          >
            {planApproved ? 'CLOSE' : 'CANCEL'}
          </button>
          {!planApproved && (
            <button
              onClick={handleApprove}
              disabled={isSigning}
              className="px-4 py-1.5 rounded bg-[#2E7D5B] hover:bg-[#25664A] text-white font-semibold text-xs tracking-wide transition-colors flex items-center space-x-2 shadow-sm"
            >
              <FileSignature className="w-4 h-4" />
              <span>{isSigning ? 'AUTHENTICATING...' : 'AUTHORIZE & DISPATCH'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

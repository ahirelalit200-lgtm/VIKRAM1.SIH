// VIKRAM1 — Human-in-the-Loop Commander Approval Modal
// Ensures final authority remains with the military decision-maker
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  UserCheck,
  CheckCircle2,
  FileSignature,
  Shield,
  X,
  AlertCircle,
  KeyRound,
  FileCheck2
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-mono animate-fadeIn">
      <div className="bg-[#081226] border border-cyan-400/50 rounded-2xl w-full max-w-xl shadow-glow-cyan overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-[#050B17] border-b border-[#1A2D54] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wider uppercase">
                COMMANDER-IN-THE-LOOP AUTHORIZATION
              </h2>
              <p className="text-xs text-slate-400">
                Official Sign-off & Tasking Dispatch Portal (Synthetic Demo)
              </p>
            </div>
          </div>
          <button
            onClick={() => setApprovalModalOpen(false)}
            className="p-1 rounded bg-[#0F1E3D] hover:bg-slate-700 text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {planApproved && approvalRecord ? (
            /* Digital Approval Certificate */
            <div className="p-4 rounded-xl bg-[#061426] border-2 border-emerald-400/60 shadow-glow-green space-y-3 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-emerald-400 tracking-wider">
                PLAN OFFICIALLY AUTHORIZED
              </h3>
              <p className="text-xs text-slate-300">
                Decision registered to immutable audit log. Tasking orders broadcast to Base Alpha and Base Bravo operations desks.
              </p>

              <div className="p-3 rounded-lg bg-[#040A14] border border-[#142344] text-left text-xs space-y-1.5 mt-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">AUTHORIZED PLAN:</span>
                  <span className="text-cyan-300 font-bold">{approvalRecord.planName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">AUTHORIZING OFFICER:</span>
                  <span className="text-white font-bold">{approvalRecord.approver} ({approvalRecord.role})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">TIMESTAMP:</span>
                  <span className="text-slate-300">{approvalRecord.timestamp} IST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">DIGITAL HASH:</span>
                  <span className="text-emerald-400 text-[10px]">{approvalRecord.hash}</span>
                </div>
              </div>
            </div>
          ) : (
            /* Signing Form */
            <div className="space-y-4">
              <div className="p-3.5 rounded-lg bg-[#050D1C] border border-[#1A2E56] text-xs space-y-2">
                <div className="flex justify-between items-center text-slate-400">
                  <span>SUBJECT MISSION PLAN:</span>
                  <span className="text-cyan-300 font-bold">{activePlan.name}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>FEASIBILITY SCORE:</span>
                  <span className="text-emerald-400 font-bold">96% (0 Violations)</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>AUTHORIZING DESK:</span>
                  <span className="text-slate-200">{userProfile.name} | {userProfile.role}</span>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">
                  COMMANDER DIRECTIVE / OPERATIONAL REMARKS:
                </label>
                <textarea
                  value={officerNotes}
                  onChange={(e) => setOfficerNotes(e.target.value)}
                  rows="3"
                  className="w-full bg-[#050B17] border border-[#1E3466] rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">
                  SECURITY CLEARANCE PIN:
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="password"
                    value={securityCode}
                    onChange={(e) => setSecurityCode(e.target.value)}
                    className="bg-[#050B17] border border-[#1E3466] rounded-lg px-3 py-2 text-xs text-cyan-300 w-36 font-bold tracking-widest text-center"
                  />
                  <span className="text-[10px] text-slate-500">
                    * Pre-authenticated for SIH presentation
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded bg-amber-950/40 border border-amber-600/30 text-amber-300 text-[11px] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
                <span>
                  VIKRAM1 operates as a decision-support advisory system. Complete operational command authority rests with human leadership.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#050B17] border-t border-[#1A2D54] flex items-center justify-end space-x-3">
          <button
            onClick={() => setApprovalModalOpen(false)}
            className="px-4 py-2 rounded-lg bg-[#0D1B36] hover:bg-[#13264D] text-slate-300 text-xs transition-colors"
          >
            {planApproved ? 'CLOSE' : 'CANCEL'}
          </button>
          {!planApproved && (
            <button
              onClick={handleApprove}
              disabled={isSigning}
              className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs tracking-wider transition-all flex items-center space-x-2 shadow-glow-green"
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

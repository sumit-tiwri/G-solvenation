import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Award,
  AlertCircle,
  Building,
  UserCheck,
  ChevronRight,
  ArrowRight,
  Stamp,
  Lock,
} from 'lucide-react';

export const ValidationCenter: React.FC = () => {
  const {
    validation,
    toggleValidationCheckpoint,
    signValidationCertificate,
    setCurrentView,
    pilot,
  } = useApp();

  const allCheckpointsPassed = validation.checkpoints.every((c) => c.verified);
  const allSigned = validation.validators.every((v) => v.signed);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Independent Validation Center</h2>
              <p className="text-xs text-slate-400">
                Authorized human peer audit, cryptographic telemetry verification &amp; multi-signatory validation
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('procurement')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <span>Proceed to Procurement Readiness</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mandatory Human-in-the-Loop Governance Banner */}
      <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-900/50 flex items-start gap-3 text-xs text-indigo-200">
        <Lock className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-white">Human-in-the-Loop Governance Architecture: </strong>
          {validation.governanceNote}
        </div>
      </div>

      {/* Validation Certificate Badge Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
              Official Validation Docket Number
            </span>
            <h3 className="text-lg font-bold text-white font-mono mt-0.5">{validation.certificateNumber}</h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>{validation.status.replace(/_/g, ' ')}</span>
            </span>
          </div>
        </div>

        {/* Verdict text */}
        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 font-sans">
          &quot;{validation.verdictSummary}&quot;
        </p>
      </div>

      {/* Audit Checkpoints & Signatory Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 5 Key Checkpoints (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Audited Validation Criteria (Click to toggle verification)
              </h3>
              <span className="text-[10px] font-mono text-emerald-400">
                {validation.checkpoints.filter((c) => c.verified).length} / {validation.checkpoints.length} Attested
              </span>
            </div>

            <div className="space-y-2.5">
              {validation.checkpoints.map((cp, idx) => (
                <div
                  key={idx}
                  onClick={() => toggleValidationCheckpoint(idx)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    cp.verified
                      ? 'bg-slate-800/60 border-slate-700/80 hover:border-emerald-500/40'
                      : 'bg-rose-950/20 border-rose-900/40'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border text-xs font-bold ${
                        cp.verified
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          : 'bg-slate-800 text-slate-500 border-slate-700'
                      }`}
                    >
                      {cp.verified ? '✓' : '✗'}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{cp.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{cp.description}</p>
                    </div>
                  </div>

                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold shrink-0 ${
                      cp.verified
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {cp.verified ? 'VERIFIED' : 'PENDING'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Multi-Party Authorized Signatories (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="pb-2 border-b border-slate-800">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Stamp className="w-4 h-4 text-emerald-400" />
                <span>Multi-Signatory Attestation Panel</span>
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Requires digital authorization signatures from academic, mission observer, and municipal leads
              </p>
            </div>

            <div className="space-y-3">
              {validation.validators.map((val, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-bold text-white">{val.name}</p>
                      <p className="text-[11px] text-slate-400">{val.designation}</p>
                      <p className="text-[10px] text-indigo-300 font-medium">{val.organization}</p>
                    </div>

                    {val.signed ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold shrink-0 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>ATTESTED</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => signValidationCertificate(idx)}
                        className="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-[10px] font-bold text-white shadow-sm shrink-0"
                      >
                        Sign &amp; Attest
                      </button>
                    )}
                  </div>

                  {val.signed && (
                    <div className="text-[9px] font-mono text-slate-400 pt-1 border-t border-slate-700/60 flex items-center justify-between">
                      <span>Digitally Timestamped:</span>
                      <span className="text-slate-300">{new Date(val.signedAt).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setCurrentView('procurement')}
                disabled={!allCheckpointsPassed || !allSigned}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 disabled:opacity-50 transition-all cursor-pointer"
              >
                <span>Advance to Procurement Pathway Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

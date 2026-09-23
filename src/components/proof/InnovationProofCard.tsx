import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Award,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Printer,
  Download,
  Building,
  Calendar,
  Lock,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

export const InnovationProofCard: React.FC = () => {
  const { innovationProof, showToast, setCurrentView } = useApp();
  const [copied, setCopied] = useState(false);

  const handleCopyHash = () => {
    navigator.clipboard.writeText(innovationProof.verifiableHash);
    setCopied(true);
    showToast('Cryptographic Hash Copied', 'SHA-256 certificate digest copied to clipboard.', 'info');
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Award className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Reusable Innovation Proof Record</h2>
              <p className="text-xs text-slate-400">
                Official, tamper-evident pilot proof registry record preventing redundant pilot testing across departments
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopyHash}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copied ? 'Copied!' : 'Copy SHA-256'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Official Dossier</span>
          </button>
        </div>
      </div>

      {/* The Official Certificate / Dossier Box */}
      <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-slate-900 border-2 border-indigo-500/40 shadow-2xl relative overflow-hidden space-y-6">
        {/* Certificate Watermark Crest in Corner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-indigo-600 to-emerald-400 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg ring-2 ring-white/20">
              G
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-bold block">
                NATIONAL GOVTECH INNOVATION PROOF REGISTRY
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                CERTIFICATE OF PROVEN SOLUTION
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Proof Record ID: <strong className="text-emerald-400">{innovationProof.proofNumber}</strong>
              </p>
            </div>
          </div>

          {/* QR Code Graphic Box */}
          <div className="p-3 rounded-2xl bg-white text-slate-950 flex flex-col items-center justify-center shrink-0 self-start sm:self-auto shadow-md">
            <QrCode className="w-16 h-16" />
            <span className="text-[9px] font-mono font-bold tracking-tight mt-1">VERIFY PROOF</span>
          </div>
        </div>

        {/* Challenge & Startup Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
            <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">
              1. INNOVATION CHALLENGE SOLVED
            </span>
            <p className="text-sm font-bold text-white">{innovationProof.challengeTitle}</p>
            <p className="text-slate-400 leading-relaxed text-[11px]">{innovationProof.problemStatement}</p>
            <p className="text-indigo-300 font-semibold text-[11px] pt-1">
              Department: {innovationProof.departmentName}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
            <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">
              2. EVALUATED &amp; PROVEN STARTUP
            </span>
            <p className="text-sm font-bold text-white">{innovationProof.startupName}</p>
            <p className="text-[11px] text-slate-300">
              DPIIT Startup Recognition: <strong className="text-emerald-400 font-mono">{innovationProof.dpiitNumber}</strong>
            </p>
            <p className="text-[11px] text-slate-400">
              Pilot Cohort: <strong className="text-slate-200">{innovationProof.pilotDuration}</strong>
            </p>
            <p className="text-[11px] text-slate-400">
              Completion &amp; Attestation Date: <strong className="text-slate-200">{innovationProof.completionDate}</strong>
            </p>
          </div>
        </div>

        {/* Audited KPI Table */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            3. Empirically Verified KPI Results
          </span>

          <div className="overflow-x-auto rounded-xl border border-slate-700/80">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800 text-slate-300 font-mono uppercase text-[10px]">
                <tr>
                  <th className="p-3">Metric Name</th>
                  <th className="p-3">Baseline</th>
                  <th className="p-3">Measured Result</th>
                  <th className="p-3">Net Verified Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/60 font-sans">
                {innovationProof.verifiedKPIs.map((kpi, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40">
                    <td className="p-3 font-semibold text-white">{kpi.metric}</td>
                    <td className="p-3 text-slate-400 font-mono">{kpi.baseline}</td>
                    <td className="p-3 text-slate-200 font-mono font-bold">{kpi.achieved}</td>
                    <td className="p-3 text-emerald-400 font-bold font-mono">{kpi.netImpact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Proven Technology Stack & Scale Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-1.5">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Verified Tech Stack</span>
            <div className="flex flex-wrap gap-1">
              {innovationProof.keyTechnologies.map((t, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-200 border border-slate-700">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Scale Status</span>
            <p className="text-xs font-semibold text-emerald-300">{innovationProof.scaleStatus}</p>
          </div>
        </div>

        {/* Cryptographic SHA-256 Digest Bar */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 font-mono text-[10px]">
          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-1.5 text-indigo-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Immutable Cryptographic SHA-256 Ledger Digest</span>
            </span>
            <span className="text-slate-500">Tamper-Evident</span>
          </div>
          <p className="text-slate-300 break-all">{innovationProof.verifiableHash}</p>
        </div>

        {/* Issuer Footer */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            <span>Issuing Authority: </span>
            <strong className="text-slate-200">{innovationProof.issuerAuthority}</strong>
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            Governed under SIH26136 Innovation Public Procurement Guidelines
          </div>
        </div>
      </div>
    </div>
  );
};

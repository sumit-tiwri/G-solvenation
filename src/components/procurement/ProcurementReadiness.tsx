import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Award,
  BookOpen,
  Lock,
} from 'lucide-react';

export const ProcurementReadiness: React.FC = () => {
  const { procurementReview, setCurrentView } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <ShoppingBag className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Procurement Pathway Readiness Review</h2>
              <p className="text-xs text-slate-400">
                Aligning verified field pilot evidence with applicable statutory public procurement mechanisms (SIH26136)
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentView('scale')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all cursor-pointer"
          >
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <span>Scale Workflow</span>
          </button>
          <button
            onClick={() => setCurrentView('proof')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span>Generate Reusable Innovation Proof</span>
          </button>
        </div>
      </div>

      {/* Mandatory Statutory Notice */}
      <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 flex items-start gap-3 text-xs text-amber-200">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-white block mb-0.5">MANDATORY STATUTORY PROCUREMENT COMPLIANCE NOTICE:</strong>
          {procurementReview.statutoryNotice}
        </div>
      </div>

      {/* Primary Status Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/40 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono text-indigo-300 font-bold uppercase tracking-wider block">
              Official Workflow Status
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              Ready for Applicable Procurement Pathway Review
            </h3>
          </div>
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 self-start sm:self-auto">
            <CheckCircle2 className="w-4 h-4" />
            <span>ALL 6 PRE-CONDITIONS VERIFIED</span>
          </span>
        </div>

        {/* 6 Preconditions Checklist */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-3 border-t border-slate-800">
          {[
            { label: 'Pilot Completed', done: true },
            { label: 'KPI Targets Met', done: true },
            { label: 'Evidence Collected', done: true },
            { label: 'Validation Completed', done: true },
            { label: 'Risk Review Signed', done: true },
            { label: 'Security Audited', done: true },
          ].map((item, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
              <span className="text-emerald-400 font-bold text-sm block">✓</span>
              <span className="text-[11px] font-medium text-slate-200 mt-0.5 block">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Eligible Statutory Procurement Pathways Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>Applicable Public Procurement Pathways (SIH26136 Formulations)</span>
          </h3>
          <span className="text-xs text-slate-400">Ranked by Statutory Feasibility</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {procurementReview.eligiblePathways.map((pw, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700 font-semibold">
                    PATHWAY 0{idx + 1}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {pw.applicabilityScore}% Fit
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white tracking-tight">{pw.pathwayName}</h4>
                <div className="p-2 rounded-lg bg-slate-950 text-[10px] font-mono text-indigo-300 border border-slate-800/80">
                  Legal Basis: {pw.legalBasis}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{pw.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <button
                  onClick={() => setCurrentView('scale')}
                  className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Select for Committee Docket</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

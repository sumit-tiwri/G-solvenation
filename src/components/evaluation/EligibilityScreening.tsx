import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckSquare,
  ShieldCheck,
  AlertCircle,
  FileCheck2,
  Lock,
  Building,
  UserCheck,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const EligibilityScreening: React.FC = () => {
  const {
    eligibility,
    toggleEligibilityItem,
    setOverallEligibility,
    selectedMatch,
    setCurrentView,
    currentRole,
  } = useApp();

  const allPassed = eligibility.items.every((it) => it.passed);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <CheckSquare className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Statutory & Objective Eligibility Screening</h2>
              <p className="text-xs text-slate-400">
                Transparent verification of threshold criteria for candidate startup: {selectedMatch.startup.name}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('evaluation')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <span>Proceed to Expert Evaluation</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Statutory Disclaimer Box */}
      <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 flex items-start gap-3 text-xs text-amber-200">
        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-white">Mandatory Statutory Governance Statement: </strong>
          {eligibility.statutoryDisclaimer}
        </div>
      </div>

      {/* Target Startup Summary Pill */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 rounded-xl bg-slate-800 border border-slate-700">
            {selectedMatch.startup.logo}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">{selectedMatch.startup.name}</h3>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {selectedMatch.startup.dpiitNumber}
              </span>
            </div>
            <p className="text-xs text-slate-400">{selectedMatch.startup.domain} • {selectedMatch.startup.location}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Auditing Officer</span>
            <span className="text-xs font-semibold text-slate-200">{eligibility.reviewedBy}</span>
          </div>

          <div
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold tracking-wide ${
              eligibility.overallStatus === 'ELIGIBLE_FOR_EVALUATION'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
            }`}
          >
            {eligibility.overallStatus === 'ELIGIBLE_FOR_EVALUATION'
              ? '✓ ELIGIBLE FOR EVALUATION'
              : 'UNDER VERIFICATION'}
          </div>
        </div>
      </div>

      {/* Objective Checklist */}
      <div className="space-y-3">
        {eligibility.items.map((item) => (
          <div
            key={item.key}
            onClick={() => toggleEligibilityItem(item.key)}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
              item.passed
                ? 'bg-slate-900/90 border-slate-700/80 hover:border-emerald-500/40'
                : 'bg-rose-950/20 border-rose-900/40 hover:border-rose-700'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border ${
                  item.passed
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : 'bg-slate-800 text-slate-500 border-slate-700'
                }`}
              >
                {item.passed ? '✓' : '✗'}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white tracking-tight">{item.label}</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">{item.description}</p>
                <div className="mt-2 text-xs font-mono text-emerald-300/90 bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400">Audit Finding: </span>
                  {item.notes}
                </div>
              </div>
            </div>

            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold shrink-0 ${
                item.passed
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}
            >
              {item.passed ? 'VERIFIED' : 'PENDING'}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom Summary Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-xs text-slate-300">
          Status: Verified <strong className="text-emerald-400">{eligibility.items.filter((i) => i.passed).length} / {eligibility.items.length}</strong> threshold criteria.
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOverallEligibility(allPassed ? 'ELIGIBLE_FOR_EVALUATION' : 'UNDER_REVIEW')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
          >
            Re-Assess Threshold Status
          </button>
          <button
            onClick={() => setCurrentView('evaluation')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 transition-all flex items-center gap-1.5"
          >
            <span>Proceed to Expert Scoring</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

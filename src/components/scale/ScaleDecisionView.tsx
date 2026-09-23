import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Building,
  CheckCircle2,
  Layers,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Award,
  Zap,
} from 'lucide-react';

export const ScaleDecisionView: React.FC = () => {
  const { scalePlan, executeScaleDecision, setCurrentView } = useApp();
  const [selectedOption, setSelectedOption] = useState<string>('Scale to Additional Departments');

  const decisionOptions = [
    {
      title: 'Scale to Additional Departments',
      desc: 'Expand proven route optimization solution across all municipal zones and neighboring civic corporations.',
      recommended: true,
      color: 'border-emerald-500 bg-emerald-950/20 text-emerald-200',
    },
    {
      title: 'Proceed to Applicable Procurement Review',
      desc: 'Submit validated pilot docket to departmental tender committee under GeM Startup Runway / GFR Rule 194.',
      recommended: false,
      color: 'border-indigo-500/40 bg-slate-900 text-slate-300',
    },
    {
      title: 'Continue Controlled Pilot',
      desc: 'Extend observation period for an additional 30 days to measure high-monsoon extreme weather handling.',
      recommended: false,
      color: 'border-slate-800 bg-slate-900 text-slate-400',
    },
    {
      title: 'Improve Solution & Retest',
      desc: 'Request startup to refine driver local language voice guidance latency before city-wide rollout.',
      recommended: false,
      color: 'border-slate-800 bg-slate-900 text-slate-400',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <TrendingUp className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Scale Decision &amp; Expansion Architecture</h2>
              <p className="text-xs text-slate-400">
                Multi-phase replication workflow transitioning verified pilot proof into inter-departmental scale
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('proof')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span>View Verified Innovation Proof</span>
          </button>
        </div>
      </div>

      {/* Decision Selection Grid */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Authorized Committee Scale Decision
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {decisionOptions.map((opt) => {
            const isSelected = selectedOption === opt.title;
            return (
              <div
                key={opt.title}
                onClick={() => setSelectedOption(opt.title)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-950/20 ring-1 ring-emerald-500/40 shadow-lg'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div>
                  {opt.recommended && (
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-2 inline-block">
                      ★ RECOMMENDED
                    </span>
                  )}
                  <h4 className="text-xs font-bold text-white tracking-tight">{opt.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">{opt.desc}</p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-800 flex justify-between items-center text-[10px]">
                  <span className={isSelected ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                    {isSelected ? '✓ Selected' : 'Click to select'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={() => executeScaleDecision(selectedOption)}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            <span>Confirm &amp; Record Committee Decision: {selectedOption}</span>
          </button>
        </div>
      </div>

      {/* Visual Expansion Pathway */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
        <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Multi-Departmental Scale Pathway
            </h3>
            <p className="text-xs text-slate-400">
              Controlled Pilot (40 Vehicles) → City-Wide (420 Vehicles) → Regional Clusters → National Mission
            </p>
          </div>
          <span className="text-xs font-mono text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded border border-indigo-500/30">
            Reusable Innovation Proof: GSN-PILOT-2026-001
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scalePlan.map((plan, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700 font-bold">
                  {plan.phase.split(':')[0]}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">
                  {plan.readiness.replace('_', ' ')}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white tracking-tight">{plan.targetDepartment}</h4>
              <p className="text-xs text-slate-300 font-medium">
                {plan.district}, {plan.state}
              </p>

              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1 text-xs">
                <p className="text-slate-400">
                  Fleet Scale: <strong className="text-white">{plan.vehiclesOrScaleUnits}</strong>
                </p>
                <p className="text-slate-400">
                  Projected Savings: <strong className="text-emerald-400">{plan.estimatedCostSaving}</strong>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

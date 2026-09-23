import React from 'react';
import { useApp, DEMO_WORKFLOW_STEPS } from '../../context/AppContext';
import { Play, ChevronLeft, ChevronRight, X, Sparkles, UserCheck, ShieldCheck } from 'lucide-react';

export const DemoModeBar: React.FC = () => {
  const {
    demoModeActive,
    demoStep,
    nextDemoStep,
    prevDemoStep,
    stopDemoMode,
    jumpToDemoStep,
  } = useApp();

  if (!demoModeActive) return null;

  const currentStepInfo = DEMO_WORKFLOW_STEPS[demoStep - 1];

  return (
    <div className="sticky top-0 z-40 bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-b border-indigo-500/40 shadow-2xl backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Left badge & title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 text-xs font-semibold uppercase tracking-wider animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>SIH Presentation Demo Mode</span>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Step <span className="text-white font-bold text-sm">{demoStep}</span> of {DEMO_WORKFLOW_STEPS.length}
            </div>
            <div className="hidden lg:block h-4 w-px bg-slate-700" />
            <div className="hidden lg:flex items-center gap-2">
              <span className="text-sm font-bold text-white tracking-tight">{currentStepInfo.title}:</span>
              <span className="text-xs text-indigo-200">{currentStepInfo.subtitle}</span>
            </div>
          </div>

          {/* Actor context */}
          <div className="hidden md:flex items-center gap-2 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700/60 text-xs">
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400">Active Actor:</span>
            <span className="font-semibold text-emerald-200">{currentStepInfo.actor}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <button
              onClick={prevDemoStep}
              disabled={demoStep === 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>

            <button
              onClick={nextDemoStep}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-500 to-emerald-500 hover:from-indigo-400 hover:to-emerald-400 text-white shadow-lg shadow-indigo-500/25 transition-all"
            >
              <span>{demoStep === DEMO_WORKFLOW_STEPS.length ? 'Finish Tour' : 'Next Step'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={stopDemoMode}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
              title="Exit Demo Mode"
              aria-label="Exit Demo Mode"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mini Step Track Progress Bar */}
        <div className="mt-2 pt-1 border-t border-slate-800 flex items-center gap-1">
          {DEMO_WORKFLOW_STEPS.map((s) => (
            <button
              key={s.step}
              onClick={() => jumpToDemoStep(s.step)}
              title={`${s.step}. ${s.title}`}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                s.step === demoStep
                  ? 'bg-gradient-to-r from-indigo-400 to-emerald-400 shadow-sm shadow-indigo-400'
                  : s.step < demoStep
                  ? 'bg-indigo-600/70'
                  : 'bg-slate-800 hover:bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

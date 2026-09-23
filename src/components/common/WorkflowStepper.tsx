import React from 'react';
import { useApp, DEMO_WORKFLOW_STEPS } from '../../context/AppContext';
import { Check, ArrowRight } from 'lucide-react';

export const WorkflowStepper: React.FC = () => {
  const { currentView, setCurrentView } = useApp();

  const steps = [
    { id: 'challenges', label: '1. Problem', code: 'PROB' },
    { id: 'challenge-builder', label: '2. AI Challenge', code: 'AI-CH' },
    { id: 'matching', label: '3. Match', code: 'MATCH' },
    { id: 'eligibility', label: '4. Eligibility', code: 'ELIG' },
    { id: 'evaluation', label: '5. Evaluate', code: 'EVAL' },
    { id: 'pilot', label: '6. Pilot', code: 'PILOT' },
    { id: 'kpi', label: '7. KPIs', code: 'KPI' },
    { id: 'evidence', label: '8. Evidence', code: 'EVID' },
    { id: 'validation', label: '9. Validate', code: 'VAL' },
    { id: 'procurement', label: '10. Procurement', code: 'PROC' },
    { id: 'proof', label: '11. Proof', code: 'PROOF' },
    { id: 'scale', label: '12. Scale', code: 'SCALE' },
  ];

  return (
    <div className="w-full bg-slate-900/60 border-y border-slate-800/80 px-4 py-2.5 overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto flex items-center justify-between min-w-[850px] gap-1">
        {steps.map((step, idx) => {
          const isActive = currentView === step.id;
          return (
            <React.Fragment key={step.id}>
              <button
                onClick={() => setCurrentView(step.id)}
                className={`group flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/50'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isActive ? 'bg-white text-indigo-700' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
                  }`}
                >
                  {idx + 1}
                </span>
                <span className="truncate">{step.label.replace(/^\d+\.\s*/, '')}</span>
              </button>
              {idx < steps.length - 1 && (
                <span className="text-slate-600 select-none text-[10px]">→</span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

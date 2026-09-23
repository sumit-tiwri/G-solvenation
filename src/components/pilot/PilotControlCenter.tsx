import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sliders,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Play,
  Pause,
  ChevronRight,
  TrendingDown,
  Activity,
  FileText,
  ShieldCheck,
  Building,
  UserCheck,
} from 'lucide-react';

export const PilotControlCenter: React.FC = () => {
  const {
    pilot,
    updateMilestoneStatus,
    toggleSimulatedTelemetry,
    advancePilotDay,
    setCurrentView,
  } = useApp();

  const progressPercent = Math.round((pilot.currentDay / pilot.durationDays) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Sliders className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Pilot Control Center</h2>
              <p className="text-xs text-slate-400">
                Controlled field deployment sandbox with structured milestones, risk monitoring &amp; live telemetry
              </p>
            </div>
          </div>
        </div>

        {/* Action Shortcuts */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentView('kpi')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
          >
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>KPI Telemetry</span>
          </button>
          <button
            onClick={() => setCurrentView('evidence')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
          >
            <FileText className="w-4 h-4 text-indigo-400" />
            <span>Evidence Dockets</span>
          </button>
        </div>
      </div>

      {/* Hero Pilot Status Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>PILOT ACTIVE (Day {pilot.currentDay} of {pilot.durationDays})</span>
              </span>
              <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded border border-slate-700">
                Cohort: 40 Municipal Compactors
              </span>
            </div>

            <h3 className="text-xl font-extrabold text-white tracking-tight">
              {pilot.title}
            </h3>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-300 pt-1">
              <span className="flex items-center gap-1 text-slate-400">
                <Building className="w-3.5 h-3.5" />
                <strong className="text-slate-200">Dept:</strong> {pilot.department}
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <UserCheck className="w-3.5 h-3.5" />
                <strong className="text-slate-200">Officer In-Charge:</strong> {pilot.fieldOfficerInCharge}
              </span>
              <span className="text-slate-400">
                <strong className="text-slate-200">Area:</strong> {pilot.location}
              </span>
            </div>
          </div>

          {/* Pilot Timeline Controller */}
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 shrink-0 space-y-3 min-w-[280px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">Cohort Timeline Progress</span>
              <span className="text-xs font-mono font-bold text-emerald-400">{progressPercent}%</span>
            </div>

            <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => advancePilotDay(-5)}
                  disabled={pilot.currentDay <= 1}
                  className="px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-30 text-[10px] text-slate-200 font-mono transition-colors"
                >
                  -5 Days
                </button>
                <button
                  onClick={() => advancePilotDay(5)}
                  disabled={pilot.currentDay >= pilot.durationDays}
                  className="px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-30 text-[10px] text-slate-200 font-mono transition-colors"
                >
                  +5 Days
                </button>
              </div>

              <button
                onClick={toggleSimulatedTelemetry}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  pilot.simulatedTelemetryActive
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-700 text-slate-400'
                }`}
              >
                {pilot.simulatedTelemetryActive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                <span>{pilot.simulatedTelemetryActive ? 'Live Telemetry ON' : 'Telemetry Paused'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Milestones Progression (The 6 Milestones) */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Pilot Execution Milestones (6 Structured Checkpoints)
            </h3>
            <p className="text-xs text-slate-400">
              Each milestone requires verified field deliverables before proceeding to the subsequent phase
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
            4 / 6 Completed
          </span>
        </div>

        <div className="space-y-3.5">
          {pilot.milestones.map((ms, index) => {
            const isCompleted = ms.status === 'COMPLETED';
            const isInProgress = ms.status === 'IN_PROGRESS';

            return (
              <div
                key={ms.id}
                className={`p-4 rounded-xl border transition-all ${
                  isCompleted
                    ? 'bg-slate-900/90 border-emerald-500/30'
                    : isInProgress
                    ? 'bg-indigo-950/20 border-indigo-500/40 ring-1 ring-indigo-500/30'
                    : 'bg-slate-900/40 border-slate-800/80 opacity-70'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() =>
                        updateMilestoneStatus(
                          ms.id,
                          isCompleted ? 'IN_PROGRESS' : 'COMPLETED'
                        )
                      }
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 border text-xs font-bold transition-all ${
                        isCompleted
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm shadow-emerald-500/50'
                          : isInProgress
                          ? 'bg-indigo-600 text-white border-indigo-400 animate-pulse'
                          : 'bg-slate-800 text-slate-500 border-slate-700'
                      }`}
                      title="Click to toggle milestone completion status"
                    >
                      {isCompleted ? '✓' : index + 1}
                    </button>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-white tracking-tight">{ms.title}</h4>
                        <span className="text-[10px] font-mono text-slate-400">
                          (Days {ms.dayStart} - {ms.dayEnd})
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{ms.description}</p>

                      {/* Deliverables tags */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        <span className="text-[10px] text-slate-500 font-medium">Deliverables:</span>
                        {ms.deliverables.map((d, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                          >
                            ✓ {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="self-end sm:self-auto shrink-0 text-right">
                    <span
                      className={`text-[10px] font-mono px-2.5 py-0.5 rounded font-bold uppercase tracking-wider block ${
                        isCompleted
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : isInProgress
                          ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {ms.status}
                    </span>
                    {ms.completedDate && (
                      <span className="text-[9px] text-slate-500 block mt-1">
                        Verified {new Date(ms.completedDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Field Risks & Mitigations */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Pilot Risk Log & Active Mitigations
            </h3>
          </div>
          <span className="text-xs text-slate-400">Zero Unmitigated Operational Disruptions</span>
        </div>

        <div className="space-y-2.5">
          {pilot.risks.map((rsk) => (
            <div
              key={rsk.id}
              className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      rsk.severity === 'HIGH'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {rsk.severity} SEVERITY
                  </span>
                  <span className="font-semibold text-slate-200">{rsk.description}</span>
                </div>
                <p className="text-[11px] text-slate-400 pl-1">
                  <strong className="text-slate-300">Mitigation: </strong> {rsk.mitigation}
                </p>
              </div>

              <span
                className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded shrink-0 self-start sm:self-auto ${
                  rsk.status === 'RESOLVED'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}
              >
                {rsk.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

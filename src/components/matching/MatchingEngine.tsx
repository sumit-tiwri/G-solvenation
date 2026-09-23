import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StartupMatch } from '../../types';
import {
  Search,
  Sparkles,
  CheckCircle2,
  Filter,
  ShieldCheck,
  CheckSquare,
  ArrowRight,
  ExternalLink,
  Building,
  Award,
  Sliders,
  ChevronDown,
} from 'lucide-react';

export const MatchingEngine: React.FC = () => {
  const {
    matches,
    selectedChallenge,
    selectedMatch,
    setSelectedMatch,
    updateMatchStatus,
    setCurrentView,
  } = useApp();

  const [filterStage, setFilterStage] = useState('ALL');
  const [filterReadiness, setFilterReadiness] = useState('ALL');

  const filteredMatches = matches.filter((m) => {
    if (filterStage !== 'ALL' && m.startup.stage !== filterStage) return false;
    if (filterReadiness === 'HIGH' && m.startup.pilotReadinessScore < 85) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <Search className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">AI Startup Discovery & Semantic Match Engine</h2>
              <p className="text-xs text-slate-400">
                Evaluating candidate startups against challenge parameters with explainable semantic scoring
              </p>
            </div>
          </div>
        </div>

        {/* Selected Challenge Context Tag */}
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <span className="text-[10px] text-slate-500 uppercase font-mono block">Target Challenge:</span>
          <span className="font-bold text-white line-clamp-1">{selectedChallenge.title}</span>
        </div>
      </div>

      {/* Governance Banner */}
      <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-900/50 flex items-start gap-3 text-xs text-indigo-200">
        <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-white">AI-Assisted Relevance Score Notice: </span>
          The match percentages indicate semantic alignment with required capabilities, prior pilot track record, and technical domain fit. They do NOT constitute an automatic legal eligibility determination or procurement award.
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-300">Filter By:</span>
          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
            className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200 focus:outline-none"
          >
            <option value="ALL">All Stages</option>
            <option value="Early Growth">Early Growth</option>
            <option value="Series A">Series A</option>
            <option value="Seed">Seed</option>
          </select>

          <select
            value={filterReadiness}
            onChange={(e) => setFilterReadiness(e.target.value)}
            className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200 focus:outline-none"
          >
            <option value="ALL">All Pilot Readiness</option>
            <option value="HIGH">High Readiness (&gt;= 85%)</option>
          </select>
        </div>

        <div className="text-xs text-slate-400 font-mono">
          Showing <strong className="text-white">{filteredMatches.length}</strong> matching innovators
        </div>
      </div>

      {/* Match Cards List */}
      <div className="space-y-4">
        {filteredMatches.map((item) => {
          const isSelected = selectedMatch.id === item.id;
          const scoreColor =
            item.matchScore >= 90
              ? 'from-emerald-500 to-teal-500 text-emerald-300'
              : item.matchScore >= 80
              ? 'from-indigo-500 to-cyan-500 text-indigo-300'
              : 'from-amber-500 to-orange-500 text-amber-300';

          return (
            <div
              key={item.id}
              onClick={() => setSelectedMatch(item)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500 shadow-xl ring-1 ring-indigo-500/50'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                {/* Left Startup Details */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-2 rounded-xl bg-slate-800 border border-slate-700">
                      {item.startup.logo}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white tracking-tight">
                          {item.startup.name}
                        </h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-medium">
                          {item.startup.dpiitNumber}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 font-semibold">
                          {item.startup.stage}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{item.startup.tagline}</p>
                    </div>
                  </div>

                  {/* Why this match: Semantic Breakdown */}
                  <div className="mt-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <p className="text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Strong match because:</span>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-300">
                      {item.matchReasons.map((reason, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack & Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {item.startup.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-medium text-slate-300 border border-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                    {item.startup.verifiedBadges.map((badge, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-emerald-950/40 text-[10px] font-semibold text-emerald-300 border border-emerald-800/60 flex items-center gap-1"
                      >
                        <ShieldCheck className="w-3 h-3" />
                        <span>{badge}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Match Score Card & Actions */}
                <div className="flex md:flex-col items-center md:items-end justify-between gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-mono text-slate-400 font-semibold block">
                      AI Relevance Score
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className={`text-3xl font-extrabold ${scoreColor}`}>
                        {item.matchScore}%
                      </span>
                      <span className="text-xs text-slate-400">Match</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Pilot Readiness: <strong className="text-white">{item.startup.pilotReadinessScore}/100</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMatch(item);
                        setCurrentView('eligibility');
                      }}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-md shadow-indigo-600/25 transition-all"
                    >
                      <CheckSquare className="w-3.5 h-3.5" />
                      <span>Check Eligibility</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Challenge } from '../../types';
import {
  Layers,
  Search,
  Filter,
  Plus,
  Calendar,
  Building,
  Target,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Sliders,
  Sparkles,
} from 'lucide-react';

export const ChallengeList: React.FC = () => {
  const { challenges, selectedChallenge, setSelectedChallenge, setCurrentView } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('ALL');

  const domains = ['ALL', 'Smart Cities', 'Water Resources', 'Public Healthcare', 'Intelligent Transportation', 'Environment'];

  const filteredChallenges = challenges.filter((ch) => {
    const matchesSearch =
      ch.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ch.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ch.problemDescription.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDomain =
      selectedDomain === 'ALL' || ch.domain.toLowerCase().includes(selectedDomain.toLowerCase());

    return matchesSearch && matchesDomain;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Government Innovation Challenges</h2>
          <p className="text-xs text-slate-400">
            Outcome-driven operational problems published by departments for startup matching & pilot evaluation
          </p>
        </div>
        <button
          onClick={() => setCurrentView('challenge-builder')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>New AI Challenge Builder</span>
        </button>
      </div>

      {/* Search & Domain Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search challenges by title, dept..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-colors ${
                selectedDomain === dom
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {dom}
            </button>
          ))}
        </div>
      </div>

      {/* Challenge Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredChallenges.map((ch) => {
          const isSelected = selectedChallenge.id === ch.id;
          return (
            <div
              key={ch.id}
              onClick={() => setSelectedChallenge(ch)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500 ring-1 ring-indigo-500/50 shadow-xl'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-semibold">
                    {ch.code}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      ch.status === 'PILOT_ACTIVE'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse'
                        : ch.status === 'MATCHING'
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {ch.status.replace('_', ' ')}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white tracking-tight line-clamp-2">
                  {ch.title}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                  <span>{ch.department}</span>
                </p>

                <p className="text-xs text-slate-300 mt-2.5 line-clamp-3 leading-relaxed">
                  {ch.problemDescription}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {ch.requiredTechnology.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/80"
                    >
                      {tech}
                    </span>
                  ))}
                  {ch.requiredTechnology.length > 3 && (
                    <span className="text-[10px] text-slate-500 py-0.5">
                      +{ch.requiredTechnology.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div className="text-[11px] text-slate-400">
                  Matches: <strong className="text-indigo-400">{ch.matchedStartupsCount} Startups</strong>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedChallenge(ch);
                      setCurrentView('matching');
                    }}
                    className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                  >
                    <span>View Matches</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

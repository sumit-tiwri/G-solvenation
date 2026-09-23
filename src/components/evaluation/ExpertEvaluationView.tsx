import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ExpertEvaluation } from '../../types';
import {
  Award,
  Star,
  UserCheck,
  Building,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Sliders,
  Send,
  MessageSquare,
} from 'lucide-react';

export const ExpertEvaluationView: React.FC = () => {
  const {
    evaluations,
    selectedMatch,
    setCurrentView,
    addEvaluation,
    currentUser,
    currentRole,
    switchRole,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'PANEL_RESULTS' | 'SUBMIT_EVAL'>('PANEL_RESULTS');

  // Form state for expert submission
  const [techFeasibility, setTechFeasibility] = useState<number>(9.0);
  const [innovation, setInnovation] = useState<number>(9.1);
  const [scalability, setScalability] = useState<number>(8.6);
  const [security, setSecurity] = useState<number>(8.5);
  const [costEff, setCostEff] = useState<number>(8.8);
  const [pilotReadiness, setPilotReadiness] = useState<number>(9.2);
  const [domainFit, setDomainFit] = useState<number>(9.0);
  const [comments, setComments] = useState<string>(
    'The algorithm demonstrates resilient dynamic re-routing when tested on simulated GPS packet streams. Hardware integration with AIS-140 standard units is verified with zero rewiring required.'
  );

  const handleSubmitEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    const scores = [
      { criterion: 'Technical Feasibility & Algorithm Robustness', score: techFeasibility, maxScore: 10, notes: 'Direct test on road network graph' },
      { criterion: 'Innovation & Differentiator', score: innovation, maxScore: 10, notes: 'Dynamic heuristic vs fixed routing' },
      { criterion: 'Scalability Across Municipal Corporations', score: scalability, maxScore: 10, notes: 'Multi-zone container architecture' },
      { criterion: 'Cybersecurity & Data Sovereignty', score: security, maxScore: 10, notes: 'TLS 1.3 & sovereign cloud' },
      { criterion: 'Cost Effectiveness & ROI', score: costEff, maxScore: 10, notes: 'Payback < 6 months on fuel' },
      { criterion: 'Pilot Readiness & Hardware Compatibility', score: pilotReadiness, maxScore: 10, notes: 'Tested on legacy GPS units' },
      { criterion: 'Domain Fit & Sanitation Worker Usability', score: domainFit, maxScore: 10, notes: 'Vernacular voice guidance' },
    ];

    const overall = parseFloat(
      (scores.reduce((acc, curr) => acc + curr.score, 0) / scores.length).toFixed(1)
    );

    const newEval: ExpertEvaluation = {
      id: 'eval-' + Math.random().toString(36).substring(2, 9),
      challengeId: selectedMatch.challengeId,
      startupId: selectedMatch.startupId,
      expertId: currentUser.id,
      expertName: currentUser.name,
      expertDesignation: currentUser.title,
      organization: currentUser.departmentOrOrg,
      scores,
      overallScore: overall,
      qualitativeComments: comments,
      recommendation: 'RECOMMENDED_FOR_PILOT',
      evaluationDate: new Date().toISOString(),
    };

    addEvaluation(newEval);
    setActiveTab('PANEL_RESULTS');
  };

  const avgOverall = (
    evaluations.reduce((sum, e) => sum + e.overallScore, 0) / (evaluations.length || 1)
  ).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <Award className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Independent Human Expert Evaluation</h2>
              <p className="text-xs text-slate-400">
                Rigorous peer scoring by academic chairmen, senior municipal engineers, and technology fellows
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('pilot')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
          >
            <span>Proceed to Pilot Control Center</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Critical Comparison Card: AI Recommendation vs Human Evaluation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: AI Semantic Score */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-indigo-500/30 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>AI Semantic Matching Recommendation</span>
            </span>
            <span className="text-xs text-slate-400">Automated</span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-indigo-400">94%</span>
            <span className="text-xs text-slate-300 font-medium">Relevance Score</span>
          </div>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Algorithmic score synthesized from DPIIT capability vectors, vehicle routing algorithms, and municipal GPS hardware compatibility keywords.
          </p>
          <div className="mt-3 text-[11px] text-indigo-300 font-medium">
            Status: Non-binding algorithmic shortlisting aid.
          </div>
        </div>

        {/* Right: Human Expert Score */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-emerald-500/30 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-emerald-300 uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Human Expert Evaluation (Panel Average)</span>
            </span>
            <span className="text-xs text-slate-400">Authorized Human Peer Review</span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-emerald-400">{avgOverall} / 10</span>
            <span className="text-xs text-slate-300 font-medium">Composite Expert Score</span>
          </div>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Evaluated by Prof. A. Venkatraman (IIT Delhi) &amp; Dr. Sunita Rao (Smart Cities Mission). Recommended unanimously for controlled municipal field pilot.
          </p>
          <div className="mt-3 text-[11px] text-emerald-300 font-semibold">
            Status: Qualified for Controlled Pilot Sandbox Cohort.
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800">
        <button
          onClick={() => setActiveTab('PANEL_RESULTS')}
          className={`px-4 py-2.5 text-xs font-bold transition-colors border-b-2 ${
            activeTab === 'PANEL_RESULTS'
              ? 'border-indigo-500 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Aggregated Expert Panel Dockets ({evaluations.length})
        </button>
        <button
          onClick={() => {
            if (currentRole !== 'EXPERT') switchRole('EXPERT');
            setActiveTab('SUBMIT_EVAL');
          }}
          className={`px-4 py-2.5 text-xs font-bold transition-colors border-b-2 ${
            activeTab === 'SUBMIT_EVAL'
              ? 'border-indigo-500 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Submit Expert Scoring Docket
        </button>
      </div>

      {/* Content depending on tab */}
      {activeTab === 'PANEL_RESULTS' ? (
        <div className="space-y-4">
          {evaluations.map((ev) => (
            <div key={ev.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                    {ev.overallScore}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{ev.expertName}</h3>
                    <p className="text-xs text-slate-400">{ev.expertDesignation} • {ev.organization}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span className="text-[10px] font-mono text-slate-400">{new Date(ev.evaluationDate).toLocaleDateString()}</span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {ev.recommendation.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>

              {/* 7-Criteria Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {ev.scores.map((sc, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold text-slate-200 truncate">{sc.criterion}</span>
                      <span className="text-xs font-bold text-amber-400 shrink-0">{sc.score} / {sc.maxScore}</span>
                    </div>
                    {sc.notes && <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{sc.notes}</p>}
                  </div>
                ))}
              </div>

              {/* Qualitative remarks */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <span className="font-semibold text-slate-200 block mb-1">Qualitative Evaluator Assessment:</span>
                &quot;{ev.qualitativeComments}&quot;
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Evaluation Submission Form */
        <form onSubmit={handleSubmitEvaluation} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white">Score Startup: {selectedMatch.startup.name}</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Evaluating for Challenge: {selectedMatch.proposalTitle || selectedMatch.startup.name}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 flex justify-between mb-1">
                <span>Technical Feasibility & Algorithm Robustness</span>
                <span className="text-amber-400 font-bold">{techFeasibility} / 10</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="0.1"
                value={techFeasibility}
                onChange={(e) => setTechFeasibility(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 flex justify-between mb-1">
                <span>Innovation & Differentiator</span>
                <span className="text-amber-400 font-bold">{innovation} / 10</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="0.1"
                value={innovation}
                onChange={(e) => setInnovation(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 flex justify-between mb-1">
                <span>Scalability Across Municipal Corporations</span>
                <span className="text-amber-400 font-bold">{scalability} / 10</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="0.1"
                value={scalability}
                onChange={(e) => setScalability(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 flex justify-between mb-1">
                <span>Cybersecurity & Data Sovereignty</span>
                <span className="text-amber-400 font-bold">{security} / 10</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="0.1"
                value={security}
                onChange={(e) => setSecurity(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 flex justify-between mb-1">
                <span>Cost Effectiveness & Payback ROI</span>
                <span className="text-amber-400 font-bold">{costEff} / 10</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="0.1"
                value={costEff}
                onChange={(e) => setCostEff(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 flex justify-between mb-1">
                <span>Pilot Readiness & Hardware Compatibility</span>
                <span className="text-amber-400 font-bold">{pilotReadiness} / 10</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="0.1"
                value={pilotReadiness}
                onChange={(e) => setPilotReadiness(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Written Academic / Technical Review Remarks
            </label>
            <textarea
              rows={4}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
              placeholder="Provide specific notes on algorithm resilience, edge test findings, or risk mitigations..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('PANEL_RESULTS')}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 shadow-lg shadow-indigo-600/30"
            >
              <Send className="w-4 h-4" />
              <span>Submit Expert Evaluation</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { YouthChallenge, YouthContribution } from '../../types';
import {
  GraduationCap,
  Code2,
  Sparkles,
  Award,
  CheckCircle2,
  ExternalLink,
  Github,
  Plus,
  Send,
  Layers,
  Building,
  Calendar,
} from 'lucide-react';

export const YouthInnovationHub: React.FC = () => {
  const {
    youthChallenges,
    youthContributions,
    submitYouthContribution,
    currentUser,
    currentRole,
    switchRole,
  } = useApp();

  const [selectedChallenge, setSelectedChallenge] = useState<YouthChallenge>(youthChallenges[0]);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);

  // Form state
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [techList, setTechList] = useState('React, TypeScript, Tailwind CSS');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitYouthContribution({
      challengeId: selectedChallenge.id,
      developerName: currentUser.name,
      collegeOrOrg: currentUser.departmentOrOrg,
      githubUrl: githubUrl || 'https://github.com/developer/govtech-prototype',
      demoUrl: demoUrl || 'https://prototype-demo.web.app',
      contributionTitle: title,
      description: desc,
      techUsed: techList.split(',').map((t) => t.trim()),
      mentorFeedback: 'Verified by Platform Technical Mentor. High code quality and clean architectural separation.',
    });

    setShowSubmitModal(false);
    setTitle('');
    setDesc('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <GraduationCap className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Youth Innovation Hub &amp; Developer Portfolio</h2>
              <p className="text-xs text-slate-400">
                Building verifiable GovTech open-innovation portfolios for students, developers &amp; researchers
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            if (currentRole !== 'YOUTH') switchRole('YOUTH');
            setShowSubmitModal(true);
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-600/30 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Code2 className="w-4 h-4" />
          <span>Submit Innovation Prototype</span>
        </button>
      </div>

      {/* Pathway Positioning Banner (No False Guarantees) */}
      <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-900/40 text-xs text-purple-200 flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-white">GovTech Talent Pathway Notice: </strong>
          The Youth Innovation Hub enables engineering students and emerging developers to solve real public sector challenges, build cryptographically verified portfolio badges, and access mentorship, project grants, and research collaborations.
        </div>
      </div>

      {/* Grid of Open Youth Challenges */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>Active Government Open Challenges for Developers</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {youthChallenges.map((ch) => {
            const isSelected = selectedChallenge.id === ch.id;
            return (
              <div
                key={ch.id}
                onClick={() => setSelectedChallenge(ch)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-purple-500 ring-1 ring-purple-500/40 shadow-xl'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {ch.domain}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {ch.difficulty}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white tracking-tight">{ch.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1">{ch.department}</p>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">{ch.description}</p>

                  {/* Skills required */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {ch.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-purple-200 border border-slate-700/80 font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-amber-300 font-semibold">{ch.stipendOrPrize}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedChallenge(ch);
                      if (currentRole !== 'YOUTH') switchRole('YOUTH');
                      setShowSubmitModal(true);
                    }}
                    className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                  >
                    <span>Submit Prototype</span>
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Verified Developer Contributions Showcase */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Verified Developer Portfolio Records ({youthContributions.length})</span>
            </h3>
            <p className="text-xs text-slate-400">
              Peer-reviewed prototypes earning official G-SolveNation digital credentials
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            Platform Verified
          </span>
        </div>

        <div className="space-y-3">
          {youthContributions.map((con) => (
            <div
              key={con.id}
              className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-2 hover:border-slate-600 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-white tracking-tight">{con.contributionTitle}</h4>
                    {con.verifiedBadge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>VERIFIED RECORD</span>
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    By <strong className="text-slate-200">{con.developerName}</strong> • {con.collegeOrOrg}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {con.githubUrl && (
                    <a
                      href={con.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 flex items-center gap-1 text-[11px]"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}
                  {con.demoUrl && (
                    <a
                      href={con.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-slate-800 text-indigo-300 hover:text-white border border-slate-700 flex items-center gap-1 text-[11px]"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{con.description}</p>

              {/* Mentor Feedback */}
              {con.mentorFeedback && (
                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-[11px] text-slate-300">
                  <span className="text-emerald-400 font-semibold">Mentor Attestation: </span>
                  {con.mentorFeedback}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Submit Prototype Contribution
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{selectedChallenge.title}</p>
              </div>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-slate-400 hover:text-white text-xs font-semibold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Contribution / Prototype Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MapLibre GIS Acoustic Wave Telemetry Viewer"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Architecture &amp; Implementation Description
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your algorithmic approach, offline handling, or data pipeline..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">GitHub / Code Repo URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Live Demo / App URL</label>
                  <input
                    type="url"
                    placeholder="https://my-demo.web.app"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Tech Stack Used</label>
                <input
                  type="text"
                  value={techList}
                  onChange={(e) => setTechList(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/30 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit &amp; Earn Verified Badge</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

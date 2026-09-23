import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Layers,
  Rocket,
  Sliders,
  ShieldCheck,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  BarChart3,
  Award,
  ChevronRight,
  ExternalLink,
  Zap,
} from 'lucide-react';

export const ExecutiveDashboard: React.FC = () => {
  const { setCurrentView, startDemoMode, pilot, kpis } = useApp();

  return (
    <div className="space-y-6">
      {/* Top Banner / Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900/60 via-slate-900 to-emerald-950/40 border border-indigo-500/20 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Smart India Hackathon SIH26136 Prototype</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              From Government Problem to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Proven Solution</span>
            </h1>
            <p className="text-sm text-slate-300 mt-2.5 leading-relaxed">
              An AI-assisted innovation lifecycle platform connecting government challenges with eligible startups, academic experts, and youth developers — bridging the gap from operational challenge to evidence-based procurement readiness.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-5">
              <button
                onClick={startDemoMode}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-500 to-emerald-500 hover:from-indigo-400 hover:to-emerald-400 text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02]"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Launch Guided Demo Workflow</span>
              </button>
              <button
                onClick={() => setCurrentView('challenge-builder')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>AI Challenge Builder</span>
              </button>
              <button
                onClick={() => setCurrentView('proof')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 transition-all"
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>View Verified Innovation Proof</span>
              </button>
            </div>
          </div>

          {/* Quick Stat Pill Board */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 shrink-0">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Avg Pilot Time</span>
              <p className="text-xl font-extrabold text-white mt-0.5">42 Days</p>
              <span className="text-[10px] text-emerald-400 font-medium">↓ 62% faster than tender</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">KPI Success Rate</span>
              <p className="text-xl font-extrabold text-emerald-400 mt-0.5">91.4%</p>
              <span className="text-[10px] text-slate-400">18 Validated Pilots</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Qualified Matches</span>
              <p className="text-xl font-extrabold text-indigo-400 mt-0.5">84</p>
              <span className="text-[10px] text-slate-400">DPIIT Verified</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Solutions Scaled</span>
              <p className="text-xl font-extrabold text-white mt-0.5">9</p>
              <span className="text-[10px] text-indigo-300">Multi-Dept Rollouts</span>
            </div>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-all">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Challenges</p>
            <p className="text-2xl font-bold text-white mt-1">24</p>
            <p className="text-[11px] text-indigo-400 mt-1">5 Featured in Portal</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
            <Layers className="w-6 h-6 text-indigo-400" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-all">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Eligible Startups</p>
            <p className="text-2xl font-bold text-white mt-1">186</p>
            <p className="text-[11px] text-emerald-400 mt-1">DPIIT / GeM Verified</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <Rocket className="w-6 h-6 text-emerald-400" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-all">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Controlled Pilots</p>
            <p className="text-2xl font-bold text-white mt-1">12 Active</p>
            <p className="text-[11px] text-amber-400 mt-1">31 Completed</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <Sliders className="w-6 h-6 text-amber-400" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-all">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Validation Requests</p>
            <p className="text-2xl font-bold text-white mt-1">7 Pending</p>
            <p className="text-[11px] text-sky-400 mt-1">18 Attested Proofs</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-sky-400" />
          </div>
        </div>

        {/* Medium Bento Card: Featured Pilot Spotlight (2 cols on md/lg) */}
        <div className="md:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Active Field Pilot Spotlight</span>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
              Day 60 of 90
            </span>
          </div>

          <h3 className="text-lg font-bold text-white tracking-tight">
            Smart Waste Route Optimization (EcoRoute AI)
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Municipal Solid Waste Management • 40 Compactor Vehicles in Central Zone (Wards 12-19)
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-800">
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <p className="text-[10px] text-slate-400 font-medium">Daily Distance</p>
              <p className="text-base font-extrabold text-white mt-0.5">820 km/day</p>
              <span className="text-[10px] text-emerald-400 font-semibold">18.0% Drop (Target: 850)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <p className="text-[10px] text-slate-400 font-medium">Diesel Burn</p>
              <p className="text-base font-extrabold text-white mt-0.5">261.8 L/day</p>
              <span className="text-[10px] text-emerald-400 font-semibold">-58.2 L/day saved</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <p className="text-[10px] text-slate-400 font-medium">Clearance SLA</p>
              <p className="text-base font-extrabold text-emerald-300 mt-0.5">94.6%</p>
              <span className="text-[10px] text-slate-400 font-semibold">Baseline: 74.2%</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-5 pt-3 border-t border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400">Milestone 4 of 6: Mid-Pilot Review Passed</span>
            </div>
            <button
              onClick={() => setCurrentView('pilot')}
              className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <span>Inspect Pilot Telemetry</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Medium Bento Card: AI Semantic Match Highlights (2 cols on md/lg) */}
        <div className="md:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Top AI Startup Matches</h3>
            </div>
            <button
              onClick={() => setCurrentView('matching')}
              className="text-xs font-medium text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>View All 6</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            <div
              onClick={() => setCurrentView('matching')}
              className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 cursor-pointer flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">🌱</span>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-white">EcoRoute AI</p>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      94% Match
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1">
                    Heuristic Multi-Depot Optimization • AIS-140 GPS Bridge • DPIIT Recognized
                  </p>
                </div>
              </div>
              <span className="text-[10px] text-indigo-300 bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20 font-semibold">
                Pilot Active
              </span>
            </div>

            <div
              onClick={() => setCurrentView('matching')}
              className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 cursor-pointer flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">🚛</span>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-white">SmartFleet Technologies</p>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      88% Match
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1">
                    CAN-Bus Telematics • Anti-Fuel Theft • 7 Prior Commercial Logistics Pilots
                  </p>
                </div>
              </div>
              <span className="text-[10px] text-slate-300 bg-slate-700 px-2 py-1 rounded font-medium">
                Shortlisted
              </span>
            </div>

            <div
              onClick={() => setCurrentView('matching')}
              className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 cursor-pointer flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">🗺️</span>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-white">RouteVision Labs</p>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      81% Match
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1">
                    Deep Learning for Narrow Road Graphs • Dashcam Pothole Analytics
                  </p>
                </div>
              </div>
              <span className="text-[10px] text-slate-300 bg-slate-700 px-2 py-1 rounded font-medium">
                Shortlisted
              </span>
            </div>
          </div>
        </div>

        {/* Full Width: The 12-Step Product Workflow Banner */}
        <div className="md:col-span-3 lg:col-span-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                End-to-End Public Innovation Lifecycle Architecture
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Connecting Government Problem → Controlled Pilot → Cryptographic Evidence → Procurement Readiness → Scale
              </p>
            </div>
            <span className="text-[11px] font-mono text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/30 self-start sm:self-auto">
              Human-in-the-Loop Governance
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 pt-2">
            {[
              { step: '01', title: 'Problem Discovery', view: 'challenges', desc: 'Identify operational waste' },
              { step: '02', title: 'AI Challenge Spec', view: 'challenge-builder', desc: 'Gemini 3.8 structuring' },
              { step: '03', title: 'Semantic Matching', view: 'matching', desc: 'Rank DPIIT startups' },
              { step: '04', title: 'Eligibility Screening', view: 'eligibility', desc: 'Zero conflict & ISO 27001' },
              { step: '05', title: 'Expert Evaluation', view: 'evaluation', desc: 'Academic 7-criteria scoring' },
              { step: '06', title: 'Controlled Pilot', view: 'pilot', desc: '90-day sandbox cohort' },
              { step: '07', title: 'KPI Telemetry', view: 'kpi', desc: 'Baseline vs actual results' },
              { step: '08', title: 'Evidence Dockets', view: 'evidence', desc: 'SHA-256 telemetry dumps' },
              { step: '09', title: 'Independent Validation', view: 'validation', desc: 'Joint panel sign-off' },
              { step: '10', title: 'Procurement Ready', view: 'procurement', desc: 'GeM & GFR 194 pathway' },
              { step: '11', title: 'Innovation Proof', view: 'proof', desc: 'Reusable GSN certificate' },
              { step: '12', title: 'Scale Expansion', view: 'scale', desc: 'Multi-municipal rollout' },
            ].map((node) => (
              <div
                key={node.step}
                onClick={() => setCurrentView(node.view)}
                className="p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-indigo-500/40 cursor-pointer transition-all group"
              >
                <span className="text-[10px] font-mono text-indigo-400 font-bold block">{node.step}</span>
                <p className="text-xs font-bold text-white group-hover:text-indigo-200 mt-0.5 tracking-tight">
                  {node.title}
                </p>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{node.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

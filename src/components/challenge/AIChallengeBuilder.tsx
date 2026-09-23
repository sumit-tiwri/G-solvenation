import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { apiService, GeneratedChallengeResponse } from '../../services/api';
import { Challenge } from '../../types';
import {
  Sparkles,
  Send,
  CheckCircle2,
  RefreshCw,
  Edit3,
  Layers,
  Shield,
  AlertTriangle,
  Clock,
  Target,
  FileCheck,
  ChevronRight,
  Database,
  Lock,
} from 'lucide-react';

export const AIChallengeBuilder: React.FC = () => {
  const { createChallenge, setCurrentView, showToast, currentRole } = useApp();

  const [rawProblem, setRawProblem] = useState<string>(
    'Our municipal solid waste collection vehicles travel unnecessary distances on fixed outdated routes, resulting in high diesel fuel consumption, high operational maintenance costs, and irregular neighborhood collection schedules. We need an AI and GIS dynamic route optimization solution that integrates with our legacy vehicle GPS trackers, calculates fuel-efficient collection paths daily, and provides vernacular mobile navigation to drivers.'
  );
  const [department, setDepartment] = useState<string>('Municipal Solid Waste Management & Urban Governance');
  const [domain, setDomain] = useState<string>('Smart Cities, Urban Logistics & Clean Mobility');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedSpec, setGeneratedSpec] = useState<GeneratedChallengeResponse | null>(null);

  // Quick prompt templates
  const templates = [
    {
      label: 'Waste Route Optimization (Featured)',
      text: 'Our municipal solid waste collection vehicles travel unnecessary distances on fixed outdated routes, resulting in high diesel fuel consumption, high operational maintenance costs, and irregular neighborhood collection schedules. We need an AI and GIS dynamic route optimization solution that integrates with our legacy vehicle GPS trackers, calculates fuel-efficient collection paths daily, and provides vernacular mobile navigation to drivers.',
      dept: 'Municipal Solid Waste Management & Urban Governance',
      dom: 'Smart Cities, Urban Logistics & Clean Mobility',
    },
    {
      label: 'Water Pipeline Leak Detection',
      text: 'Underground drinking water pipelines in rural clusters have hidden leaks causing over 30% non-revenue water loss before physical surfacing. We need non-invasive acoustic or pressure wave IoT sensors and edge TinyML models to detect subterranean leaks in real-time.',
      dept: 'Department of Drinking Water & Sanitation (Jal Jeevan Mission)',
      dom: 'Water Resources & Smart Infrastructure',
    },
    {
      label: 'Traffic Light Adaptive Green Wave',
      text: 'Fixed time traffic light controllers at 48 core intersections cause severe arterial delays during rush hour and trap ambulances. We need edge vision analytics to modulate phase timing and trigger green-corridor priority for geofenced emergency vehicles.',
      dept: 'Metropolitan Traffic Police & Smart City Command Center',
      dom: 'Intelligent Transportation & Emergency Response',
    },
  ];

  const handleGenerate = async () => {
    if (!rawProblem.trim()) {
      showToast('Input Required', 'Please enter a raw problem description first.', 'warning');
      return;
    }
    setIsLoading(true);
    try {
      const response = await apiService.generateChallenge({
        problemStatement: rawProblem,
        department,
        domain,
      });
      setGeneratedSpec(response);
      showToast(
        'Challenge Structured with AI',
        `Generated 15 outcome-driven parameters via ${response.modelUsed}`,
        'success'
      );
    } catch (err) {
      console.error(err);
      showToast('Generation Error', 'Failed to generate, falling back to local engine.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = () => {
    if (!generatedSpec) return;

    const newChallenge: Challenge = {
      id: 'ch-' + Math.random().toString(36).substring(2, 9),
      code: `GSN-${Date.now().toString().slice(-4)}`,
      title: generatedSpec.title,
      department: generatedSpec.department,
      district: 'Central Zone',
      state: 'Maharashtra',
      domain: generatedSpec.domain,
      problemDescription: generatedSpec.problemDescription,
      status: 'PUBLISHED',
      objectives: generatedSpec.objectives,
      requiredTechnology: generatedSpec.requiredTechnology,
      expectedOutcomes: generatedSpec.expectedOutcomes,
      constraints: generatedSpec.constraints,
      pilotDuration: generatedSpec.pilotDuration,
      suggestedKPIs: generatedSpec.suggestedKPIs.map((k, idx) => ({
        id: `kpi-${idx + 1}`,
        name: k.name,
        baseline: k.baseline,
        target: k.target,
        unit: k.unit,
        current: k.baseline,
        status: 'ON_TRACK',
      })),
      evaluationCriteria: generatedSpec.evaluationCriteria.map((c, idx) => ({
        id: `ec-${idx + 1}`,
        criterion: c.criterion,
        weight: c.weight,
      })),
      requiredStartupCapabilities: generatedSpec.requiredStartupCapabilities,
      dataRequirements: generatedSpec.dataRequirements,
      securityConsiderations: generatedSpec.securityConsiderations,
      riskConsiderations: generatedSpec.riskConsiderations,
      createdAt: new Date().toISOString(),
      deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      pilotBudgetEstimated: '₹18,50,000',
      matchedStartupsCount: 6,
    };

    createChallenge(newChallenge);
    setCurrentView('matching');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">AI Challenge Builder</h2>
              <p className="text-xs text-slate-400">
                Transform raw, unstructured public sector problems into 15 structured procurement parameters
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300">
            Assisted By: Gemini 3.8 Flash / Robust Fallback
          </span>
        </div>
      </div>

      {/* Main Builder Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Form (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-indigo-400" />
              <span>1. Enter Operational Problem</span>
            </h3>

            {/* Template selector pills */}
            <div>
              <label className="text-[11px] font-medium text-slate-400 block mb-1.5">Load Scenario Template:</label>
              <div className="flex flex-wrap gap-1.5">
                {templates.map((tpl) => (
                  <button
                    key={tpl.label}
                    onClick={() => {
                      setRawProblem(tpl.text);
                      setDepartment(tpl.dept);
                      setDomain(tpl.dom);
                    }}
                    className="text-[10px] font-medium px-2 py-1 rounded bg-slate-800 hover:bg-indigo-600/30 text-slate-300 hover:text-indigo-200 border border-slate-700 transition-colors"
                  >
                    {tpl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Department */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Government Department / Cell</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                placeholder="e.g. Municipal Solid Waste Management"
              />
            </div>

            {/* Domain */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Innovation Domain</label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                placeholder="e.g. Smart Cities & Urban Logistics"
              />
            </div>

            {/* Raw problem text */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Raw Problem Statement (As experienced in the field)
              </label>
              <textarea
                rows={6}
                value={rawProblem}
                onChange={(e) => setRawProblem(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 leading-relaxed font-sans"
                placeholder="Describe what is failing, where inefficiencies occur, and what the field team needs..."
              />
            </div>

            {/* Action CTA */}
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-500 to-emerald-500 hover:from-indigo-400 hover:to-emerald-400 text-white shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 disabled:opacity-50 transition-all cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Outcome-Driven Spec...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Structured Challenge with AI</span>
                </>
              )}
            </button>
          </div>

          {/* AI Governance Note Card */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
            <span className="font-semibold text-slate-300 block mb-1">Human-in-the-Loop Governance Notice:</span>
            AI transforms text into a standardized procurement-ready draft. It does NOT autonomously publish tenders or award government funds. All fields are reviewed and published by an authorized officer.
          </div>
        </div>

        {/* Right Column: Structured AI Output & Editor (7 cols) */}
        <div className="lg:col-span-7">
          {generatedSpec ? (
            <div className="p-6 rounded-2xl bg-slate-900 border border-indigo-500/30 space-y-6 animate-in fade-in-50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                      {generatedSpec.isAIGenerated ? 'AI Generated (Gemini 3.8 Flash)' : 'Deterministic Fallback Engine'}
                    </span>
                    <span className="text-xs text-slate-400">Ready to Publish</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">{generatedSpec.title}</h3>
                </div>
                <button
                  onClick={handlePublish}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition-all cursor-pointer shrink-0"
                >
                  <span>Publish & Find Startups</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* 15 Structured Fields Accordion / Grid */}
              <div className="space-y-4 max-h-[620px] overflow-y-auto pr-2">
                {/* 1. Problem & Objectives */}
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-2">
                  <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5" />
                    <span>Core Objectives & Outcomes</span>
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-200">
                    {generatedSpec.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-indigo-400 font-bold">•</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Required Technology */}
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-2">
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Required Technology Stack</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {generatedSpec.requiredTechnology.map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-slate-800 text-[11px] font-medium text-slate-200 border border-slate-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3. Expected Outcomes & Constraints */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60">
                    <p className="text-xs font-bold text-sky-300 uppercase tracking-wider mb-1.5">Expected Outcomes</p>
                    <ul className="space-y-1 text-[11px] text-slate-300">
                      {generatedSpec.expectedOutcomes.map((out, i) => (
                        <li key={i}>✓ {out}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60">
                    <p className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1.5">Operational Constraints</p>
                    <ul className="space-y-1 text-[11px] text-slate-300">
                      {generatedSpec.constraints.map((c, i) => (
                        <li key={i}>⚠ {c}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 4. Suggested KPIs */}
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-2">
                  <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                    Defined Pilot KPIs (Baseline vs Target)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {generatedSpec.suggestedKPIs.map((k, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-700/70 text-xs">
                        <p className="font-semibold text-white">{k.name}</p>
                        <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400">
                          <span>Base: <strong className="text-slate-200">{k.baseline}</strong></span>
                          <span>→</span>
                          <span>Target: <strong className="text-emerald-400">{k.target}</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Evaluation Criteria & Startup Capabilities */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60">
                    <p className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-1.5">Evaluation Criteria Weights</p>
                    <div className="space-y-1.5 text-[11px] text-slate-300">
                      {generatedSpec.evaluationCriteria.map((ec, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <span className="truncate pr-2">{ec.criterion}</span>
                          <span className="font-mono font-bold text-indigo-300">{ec.weight}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60">
                    <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1.5">Required Capabilities</p>
                    <ul className="space-y-1 text-[11px] text-slate-300">
                      {generatedSpec.requiredStartupCapabilities.map((cap, i) => (
                        <li key={i}>• {cap}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 6. Security, Data & Risk */}
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-2">
                  <span className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Cybersecurity, Data Sovereignty & Risk Mitigation</span>
                  </span>
                  <div className="text-[11px] text-slate-300 space-y-1">
                    <p><strong className="text-slate-200">Security:</strong> {generatedSpec.securityConsiderations.join('; ')}</p>
                    <p><strong className="text-slate-200">Data Requirements:</strong> {generatedSpec.dataRequirements.join('; ')}</p>
                    <p><strong className="text-slate-200">Risks & Controls:</strong> {generatedSpec.riskConsiderations.join('; ')}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[420px] rounded-2xl border-2 border-dashed border-slate-800 flex flex-col items-center justify-center p-8 text-center bg-slate-900/40">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
                <Sparkles className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-white">AI Challenge Structuring Engine</h4>
              <p className="text-xs text-slate-400 max-w-sm mt-1 leading-relaxed">
                Click &ldquo;Generate Challenge with AI&rdquo; on the left to see the raw text converted into 15 formal outcome-based parameters ready for public procurement matching.
              </p>
              <button
                onClick={handleGenerate}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all cursor-pointer"
              >
                Generate Waste Route Demo Spec
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

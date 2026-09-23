import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Sparkles,
  Search,
  CheckSquare,
  Award,
  Sliders,
  BarChart3,
  FileText,
  ShieldCheck,
  ShoppingBag,
  TrendingUp,
  QrCode,
  GraduationCap,
  History,
  Activity,
  Layers,
  ChevronRight,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView, currentRole } = useApp();

  const navGroups = [
    {
      group: 'OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Bento Dashboard', icon: LayoutDashboard, badge: 'Live' },
      ],
    },
    {
      group: 'INNOVATION LIFECYCLE',
      items: [
        { id: 'challenges', label: 'Active Challenges', icon: Layers, badge: '5' },
        { id: 'challenge-builder', label: 'AI Challenge Builder', icon: Sparkles, badge: 'Gemini' },
        { id: 'matching', label: 'Find Innovators', icon: Search, badge: '94%' },
        { id: 'eligibility', label: 'Eligibility Screening', icon: CheckSquare },
        { id: 'evaluation', label: 'Expert Evaluation', icon: Award, badge: '8.9' },
        { id: 'pilot', label: 'Pilot Control Center', icon: Sliders, badge: 'Day 60' },
        { id: 'kpi', label: 'KPI Engine', icon: BarChart3, badge: '+18.2%' },
        { id: 'evidence', label: 'Evidence Dockets', icon: FileText, badge: '6' },
        { id: 'validation', label: 'Independent Validation', icon: ShieldCheck, badge: 'Verified' },
        { id: 'procurement', label: 'Procurement Readiness', icon: ShoppingBag },
        { id: 'scale', label: 'Scale Decision', icon: TrendingUp },
        { id: 'proof', label: 'Innovation Proof', icon: QrCode, badge: 'GSN' },
      ],
    },
    {
      group: 'PARTICIPATION & GOVERNANCE',
      items: [
        { id: 'youth', label: 'Youth Innovation Hub', icon: GraduationCap, badge: 'Earn' },
        { id: 'audit', label: 'System Audit Trail', icon: History },
        { id: 'system', label: 'Architecture & Health', icon: Activity, badge: 'OK' },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
      <div className="p-4 space-y-6">
        {navGroups.map((group) => (
          <div key={group.group}>
            <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase px-2 mb-2 font-mono">
              {group.group}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-indigo-600/20 text-white border border-indigo-500/40 shadow-sm font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                      <span className="tracking-tight">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                          isActive
                            ? 'bg-indigo-500 text-white'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* SIH Context Card */}
        <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-900/40">
          <div className="flex items-center gap-1.5 text-indigo-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Problem Statement</span>
          </div>
          <p className="text-[11px] text-slate-300 mt-1 font-semibold leading-snug">
            SIH26136: Startup Friendly Public Procurement
          </p>
          <p className="text-[10px] text-slate-400 mt-1 leading-normal">
            &quot;We don&apos;t just find a startup. We help prove the solution.&quot;
          </p>
        </div>
      </div>
    </aside>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  ShieldCheck,
  Sparkles,
  Bell,
  CheckCircle2,
  ChevronDown,
  Layers,
  Activity,
  Award,
  Compass,
  FileCheck2,
  Building2,
  Rocket,
  GraduationCap,
  Code2,
  User,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentUser,
    currentRole,
    switchRole,
    notifications,
    markNotificationRead,
    setCurrentView,
    startDemoMode,
    demoModeActive,
  } = useApp();

  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const roleOptions: { role: UserRole; label: string; desc: string; icon: React.ElementType; color: string }[] = [
    {
      role: 'GOVERNMENT',
      label: 'Government Officer',
      desc: 'Create challenges, review matches, initiate pilots, approve validation',
      icon: Building2,
      color: 'text-sky-400 bg-sky-950/60 border-sky-800',
    },
    {
      role: 'STARTUP',
      label: 'Startup Founder',
      desc: 'EcoRoute AI: Submit proposals, track telemetry, upload evidence',
      icon: Rocket,
      color: 'text-emerald-400 bg-emerald-950/60 border-emerald-800',
    },
    {
      role: 'EXPERT',
      label: 'Expert Evaluator',
      desc: 'Prof. Venkatraman (IIT Delhi): Score criteria, review pilot evidence',
      icon: GraduationCap,
      color: 'text-amber-400 bg-amber-950/60 border-amber-800',
    },
    {
      role: 'YOUTH',
      label: 'Youth Developer',
      desc: 'Explore open innovation challenges, submit prototypes, earn portfolio badges',
      icon: Code2,
      color: 'text-purple-400 bg-purple-950/60 border-purple-800',
    },
    {
      role: 'ADMIN',
      label: 'Mission Administrator',
      desc: 'Oversee system audit logs, health checks, platform-wide parameters',
      icon: ShieldCheck,
      color: 'text-rose-400 bg-rose-950/60 border-rose-800',
    },
  ];

  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand & Tagline */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-600/30 ring-1 ring-white/20">
            <span className="font-extrabold text-white text-lg tracking-tighter">G</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-white tracking-tight leading-none">
                G-SolveNation
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-semibold">
                SIH26136
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-tight">
              From Government Problem to Proven Solution
            </p>
          </div>
        </div>

        {/* Center / Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Guided Demo Button */}
          {!demoModeActive && (
            <button
              onClick={startDemoMode}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500/20 via-indigo-500/20 to-emerald-500/20 hover:from-amber-500/30 hover:to-emerald-500/30 text-amber-200 border border-amber-500/40 shadow-sm transition-all animate-pulse"
              title="Launch the 12-step guided judge presentation walkthrough"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Guided Demo (3 Min)</span>
            </button>
          )}

          {/* Quick Health Dot */}
          <button
            onClick={() => setCurrentView('system')}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] bg-slate-800/80 border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-700/80 transition-colors"
            title="View Architecture & System Health"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span className="font-mono text-emerald-400 font-semibold">API: Online</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-slate-900">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-slate-900 border border-slate-700/80 shadow-2xl z-50 overflow-hidden animate-in fade-in-50 zoom-in-95">
                <div className="p-3 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Platform Notifications</span>
                  </div>
                  <span className="text-[11px] text-slate-400">{notifications.length} updates</span>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationRead(n.id);
                        if (n.actionRoute) {
                          setCurrentView(n.actionRoute);
                          setShowNotifMenu(false);
                        }
                      }}
                      className={`p-3 cursor-pointer hover:bg-slate-800/60 transition-colors ${
                        n.read ? 'opacity-70' : 'bg-indigo-950/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-semibold text-white tracking-tight">{n.title}</p>
                        <span className="text-[10px] text-slate-400 shrink-0">{n.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 leading-snug">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 hover:border-slate-600 transition-all text-left"
            >
              <div className="w-7 h-7 rounded-lg overflow-hidden bg-slate-700 flex items-center justify-center shrink-0">
                {currentUser.avatarUrl ? (
                  <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-4 h-4 text-slate-300" />
                )}
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white tracking-tight leading-none">{currentUser.name}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
                <span className="text-[10px] font-semibold text-indigo-300 tracking-wide uppercase">
                  {currentRole} ROLE
                </span>
              </div>
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-72 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl z-50 p-2 divide-y divide-slate-800">
                <div className="p-2 mb-1">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Switch Persona</p>
                  <p className="text-[11px] text-slate-500">Test the platform as different stakeholders</p>
                </div>
                <div className="pt-1.5 space-y-1">
                  {roleOptions.map((opt) => {
                    const IconComp = opt.icon;
                    const isActive = currentRole === opt.role;
                    return (
                      <button
                        key={opt.role}
                        onClick={() => {
                          switchRole(opt.role);
                          setShowRoleMenu(false);
                        }}
                        className={`w-full flex items-start gap-2.5 p-2 rounded-lg text-left transition-colors ${
                          isActive ? 'bg-indigo-600/20 border border-indigo-500/40 text-white' : 'hover:bg-slate-800 text-slate-300'
                        }`}
                      >
                        <div className={`p-1.5 rounded-md shrink-0 border ${opt.color}`}>
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold text-white">{opt.label}</span>
                            {isActive && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                          </div>
                          <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{opt.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  TrendingDown,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Activity,
  Layers,
  Fuel,
  Navigation,
  Clock,
  Coins,
  ChevronRight,
} from 'lucide-react';

export const KPIEngine: React.FC = () => {
  const { kpis, pilot, setCurrentView } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <BarChart3 className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Pilot Outcome &amp; KPI Engine</h2>
              <p className="text-xs text-slate-400">
                Continuous baseline vs. target vs. measured field telemetry for 40 compactor trucks
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('evidence')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <span>Inspect Evidence Dockets</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mandatory Simulation Disclaimer Notice */}
      <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 flex items-start gap-3 text-xs text-amber-200">
        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-white">Prototype Data Disclaimer: </strong>
          The pilot metrics, vehicle distances, and fuel consumption figures displayed below represent simulated test cohort data modeled after empirical municipal waste operations for the SIH26136 prototype demonstration. They are not claimed to be real-world measured commercial telemetry.
        </div>
      </div>

      {/* High-Level Outcome Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI Card 1: Fleet Distance */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fleet Distance</span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Navigation className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-extrabold text-white">{kpis[0]?.current || '820 km/day'}</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center">
              <TrendingDown className="w-3 h-3 mr-0.5" /> -18.0%
            </span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] space-y-1 text-slate-400">
            <div className="flex justify-between">
              <span>Baseline:</span>
              <strong className="text-slate-300 font-mono">1,000 km/day</strong>
            </div>
            <div className="flex justify-between">
              <span>Target:</span>
              <strong className="text-slate-300 font-mono">850 km/day</strong>
            </div>
          </div>
          <div className="mt-3">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              ✓ TARGET ACHIEVED
            </span>
          </div>
        </div>

        {/* KPI Card 2: Diesel Consumption */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Diesel Fuel Burn</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Fuel className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-extrabold text-white">{kpis[1]?.current || '261.8 L/day'}</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center">
              <TrendingDown className="w-3 h-3 mr-0.5" /> -18.2%
            </span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] space-y-1 text-slate-400">
            <div className="flex justify-between">
              <span>Baseline:</span>
              <strong className="text-slate-300 font-mono">320 L/day</strong>
            </div>
            <div className="flex justify-between">
              <span>Target:</span>
              <strong className="text-slate-300 font-mono">262 L/day</strong>
            </div>
          </div>
          <div className="mt-3">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              ✓ TARGET ACHIEVED
            </span>
          </div>
        </div>

        {/* KPI Card 3: Clearance SLA */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">On-Time SLA</span>
            <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-extrabold text-white">{kpis[2]?.current || '94.6%'}</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +20.4%
            </span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] space-y-1 text-slate-400">
            <div className="flex justify-between">
              <span>Baseline:</span>
              <strong className="text-slate-300 font-mono">74.2%</strong>
            </div>
            <div className="flex justify-between">
              <span>Target:</span>
              <strong className="text-slate-300 font-mono">95.0%</strong>
            </div>
          </div>
          <div className="mt-3">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
              ● ON TRACK (94.6%)
            </span>
          </div>
        </div>

        {/* KPI Card 4: Cost per Ton */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Unit Cost / Ton</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-extrabold text-white">{kpis[3]?.current || '₹1,130 / ton'}</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center">
              <TrendingDown className="w-3 h-3 mr-0.5" /> -22.1%
            </span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] space-y-1 text-slate-400">
            <div className="flex justify-between">
              <span>Baseline:</span>
              <strong className="text-slate-300 font-mono">₹1,450 / ton</strong>
            </div>
            <div className="flex justify-between">
              <span>Target:</span>
              <strong className="text-slate-300 font-mono">₹1,180 / ton</strong>
            </div>
          </div>
          <div className="mt-3">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              ✓ TARGET ACHIEVED
            </span>
          </div>
        </div>
      </div>

      {/* Visual Telemetry Trend & Comparison Bars */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Telemetry Convergence: Baseline vs Target vs Measured Field Data
            </h3>
            <p className="text-xs text-slate-400">
              Comparing pre-pilot benchmarks against dynamic AI dispatch results across Central Zone wards
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
            Telemetry Feed: 100k events/sec AIS-140 Bridge
          </span>
        </div>

        {/* Visual Progress Comparison Graphs */}
        <div className="space-y-6">
          {/* Item 1 */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-200">
                1. Daily Fleet Distance (Lower is Better)
              </span>
              <span className="text-emerald-400 font-mono font-bold">
                820 km/day (Target: 850 km/day | Base: 1,000 km/day)
              </span>
            </div>
            <div className="relative w-full bg-slate-800 rounded-full h-4 overflow-hidden flex">
              {/* Baseline marker at 100% */}
              <div
                className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-700"
                style={{ width: '82%' }}
                title="Measured Day 60: 820 km/day"
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0 km</span>
              <span className="text-emerald-400 font-bold">Current: 820 km (Day 60)</span>
              <span>Target: 850 km</span>
              <span>Baseline: 1,000 km</span>
            </div>
          </div>

          {/* Item 2 */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-200">
                2. Fleet Diesel Fuel Volume (Lower is Better)
              </span>
              <span className="text-emerald-400 font-mono font-bold">
                261.8 L/day (Target: 262 L/day | Base: 320 L/day)
              </span>
            </div>
            <div className="relative w-full bg-slate-800 rounded-full h-4 overflow-hidden flex">
              <div
                className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-700"
                style={{ width: '81.8%' }}
                title="Measured Day 60: 261.8 L/day"
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0 L</span>
              <span className="text-emerald-400 font-bold">Current: 261.8 L (-18.2%)</span>
              <span>Target: 262 L</span>
              <span>Baseline: 320 L</span>
            </div>
          </div>

          {/* Item 3 */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-200">
                3. On-Time Ward Waste Clearance SLA (Higher is Better)
              </span>
              <span className="text-sky-300 font-mono font-bold">
                94.6% (Target: 95.0% | Base: 74.2%)
              </span>
            </div>
            <div className="relative w-full bg-slate-800 rounded-full h-4 overflow-hidden flex">
              <div
                className="bg-gradient-to-r from-indigo-500 to-sky-400 h-full rounded-full transition-all duration-700"
                style={{ width: '94.6%' }}
                title="Measured Day 60: 94.6%"
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0%</span>
              <span>Baseline: 74.2%</span>
              <span className="text-sky-400 font-bold">Current: 94.6% (+20.4%)</span>
              <span>Target: 95%</span>
            </div>
          </div>
        </div>

        {/* Environmental & Financial Impact Box */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-400 font-semibold">CO2e Decarbonization</span>
            <p className="text-lg font-bold text-emerald-400 mt-0.5">152 kg / day</p>
            <span className="text-[10px] text-slate-400">Equivalent to 4.5 tons/mo</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-400 font-semibold">Direct Fuel Savings</span>
            <p className="text-lg font-bold text-emerald-400 mt-0.5">₹5,238 / day</p>
            <span className="text-[10px] text-slate-400">At ₹90/L diesel wholesale</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-400 font-semibold">3-Year Projected Civic Saving</span>
            <p className="text-lg font-bold text-emerald-400 mt-0.5">₹1.85 Crore</p>
            <span className="text-[10px] text-slate-400">Scaled across all 420 vehicles</span>
          </div>
        </div>
      </div>
    </div>
  );
};

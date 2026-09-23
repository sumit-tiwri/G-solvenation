import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EvidenceItem } from '../../types';
import {
  FileText,
  Upload,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Lock,
  ExternalLink,
  Plus,
  FileCheck2,
  ChevronRight,
  Database,
  Hash,
  Download,
} from 'lucide-react';

export const EvidenceManager: React.FC = () => {
  const { evidences, addEvidence, setCurrentView, showToast, currentUser } = useApp();

  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<EvidenceItem['category']>('PERFORMANCE_ANALYSIS');
  const [newDay, setNewDay] = useState<number>(65);
  const [newSummary, setNewSummary] = useState<string>('');
  const [newFileName, setNewFileName] = useState<string>('Surge_Load_Telemetry_Day65.pdf');

  const handleSimulatedUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      showToast('Validation Error', 'Evidence title is required.', 'warning');
      return;
    }

    addEvidence({
      pilotId: 'pilot-sih-001',
      title: newTitle,
      category: newCategory,
      dayNumber: newDay,
      fileName: newFileName,
      fileSize: '4.8 MB',
      verifiedByOfficer: currentUser.name,
      status: 'VERIFIED',
      summary: newSummary || 'Simulated field verification docket submitted under controlled pilot monitoring.',
    });

    setShowUploadModal(false);
    setNewTitle('');
    setNewSummary('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Cryptographic Evidence &amp; Telemetry Dockets</h2>
              <p className="text-xs text-slate-400">
                Immutable chronological repository of telemetry logs, fuel audits, and field inspection dockets
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all cursor-pointer"
          >
            <Upload className="w-4 h-4 text-indigo-400" />
            <span>Simulate Evidence Upload</span>
          </button>
          <button
            onClick={() => setCurrentView('validation')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
          >
            <span>Proceed to Independent Validation</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cryptographic Assurance Pill Card */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-300">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            Every evidence document is stamped with an immutable <strong>SHA-256 cryptographic digest</strong> to prevent post-hoc tampering during public procurement audits.
          </span>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 shrink-0 font-semibold">
          6 of 6 Verified
        </span>
      </div>

      {/* Evidence Timeline & Cards */}
      <div className="space-y-4">
        {evidences.map((ev, index) => (
          <div
            key={ev.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex flex-col items-center justify-center shrink-0">
                  <span className="text-[9px] font-mono text-indigo-400 font-bold uppercase">DAY</span>
                  <span className="text-sm font-extrabold text-white font-mono leading-none">{ev.dayNumber}</span>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-bold text-white tracking-tight">{ev.title}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {ev.category.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{ev.summary}</p>
                </div>
              </div>

              <div className="self-end sm:self-auto shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  ✓ {ev.status}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {new Date(ev.uploadedAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Document Metadata Bar */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <span>
                  File: <strong className="text-slate-300">{ev.fileName}</strong> ({ev.fileSize})
                </span>
                <span>
                  Verified By: <strong className="text-slate-300">{ev.verifiedByOfficer}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                <Hash className="w-3 h-3 text-indigo-400" />
                <span className="truncate max-w-[200px] sm:max-w-[280px]">
                  SHA-256: {ev.sha256Hash}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Simulated Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Upload className="w-4 h-4 text-indigo-400" />
                <span>Simulate Field Evidence Upload</span>
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-white text-xs font-semibold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSimulatedUpload} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ward 14 Peak Hour Distance Re-route Telemetry Log"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-2.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-200 focus:outline-none"
                  >
                    <option value="GPS_LOGS">GPS Logs</option>
                    <option value="FUEL_AUDIT">Fuel Audit</option>
                    <option value="PERFORMANCE_ANALYSIS">Performance Analysis</option>
                    <option value="FIELD_INSPECTION">Field Inspection</option>
                    <option value="FINAL_REPORT">Final Report</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Pilot Day Number</label>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    value={newDay}
                    onChange={(e) => setNewDay(parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Simulated File Name</label>
                <input
                  type="text"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Summary of Findings</label>
                <textarea
                  rows={3}
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Summary of findings, vehicles audited, or fuel records verified..."
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30"
                >
                  Compute Hash &amp; Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

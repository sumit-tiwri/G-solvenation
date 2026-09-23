import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  History,
  Search,
  Filter,
  Download,
  ShieldCheck,
  CheckCircle2,
  Clock,
  UserCheck,
} from 'lucide-react';

export const AuditTrailView: React.FC = () => {
  const { auditLogs } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.targetEntity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.actor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === 'ALL' || log.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const exportCSV = () => {
    const headers = 'ID,Timestamp,Actor,Role,Action,TargetEntity,Details,IPAddress\n';
    const rows = filteredLogs
      .map(
        (l) =>
          `"${l.id}","${l.timestamp}","${l.actor}","${l.role}","${l.action}","${l.targetEntity}","${l.details.replace(/"/g, '""')}","${l.ipAddress}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GSolveNation_Audit_Logs_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <History className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">System Audit Trail &amp; Governance Ledger</h2>
              <p className="text-xs text-slate-400">
                Tamper-evident operational log recording all administrative actions, AI events, and human sign-offs
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={exportCSV}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Audit CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search logs by action, target, actor..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-400">Role:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200 focus:outline-none"
          >
            <option value="ALL">All Roles</option>
            <option value="GOVERNMENT">Government Officer</option>
            <option value="EXPERT">Academic Expert</option>
            <option value="STARTUP">Startup Innovator</option>
            <option value="YOUTH">Youth Contributor</option>
            <option value="ADMIN">System Administrator</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800/80 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-700">
              <tr>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">Actor &amp; Role</th>
                <th className="p-3.5">Action Code</th>
                <th className="p-3.5">Target Entity</th>
                <th className="p-3.5">Network Node</th>
                <th className="p-3.5">Audit Trail Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}{' '}
                    <span className="text-[10px] text-slate-500 block">
                      {new Date(log.timestamp).toLocaleDateString()}
                    </span>
                  </td>

                  <td className="p-3.5 whitespace-nowrap">
                    <span className="font-semibold text-white block">{log.actor}</span>
                    <span className="text-[10px] font-mono text-indigo-300 bg-indigo-500/10 px-1.5 py-0.2 rounded border border-indigo-500/20">
                      {log.role}
                    </span>
                  </td>

                  <td className="p-3.5 font-bold text-slate-200 whitespace-nowrap font-mono text-[11px]">
                    {log.action}
                  </td>

                  <td className="p-3.5 text-slate-300 font-medium whitespace-nowrap">
                    {log.targetEntity}
                  </td>

                  <td className="p-3.5 whitespace-nowrap font-mono text-[10px] text-slate-400">
                    {log.ipAddress}
                  </td>

                  <td className="p-3.5 text-slate-400 text-xs min-w-[240px]">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

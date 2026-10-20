// VIKRAM1 — Page 3: Fleet & Assets Status Monitor
import React, { useState } from 'react';
import { SYNTHETIC_AIRCRAFT } from '../../data/mockData';
import {
  Plane,
  Filter,
  Search,
  Fuel,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Gauge
} from 'lucide-react';

export default function FleetAssets() {
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterType, setFilterType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);

  const filteredAssets = SYNTHETIC_AIRCRAFT.filter((asset) => {
    const matchesStatus = filterStatus === 'ALL' || asset.status === filterStatus;
    const matchesType = filterType === 'ALL' || asset.type.toLowerCase().includes(filterType.toLowerCase());
    const matchesQuery =
      asset.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.base.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesType && matchesQuery;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'READY':
        return 'bg-emerald-950 text-emerald-300 border-emerald-500/40';
      case 'AVAILABLE':
        return 'bg-cyan-950 text-cyan-300 border-cyan-500/40';
      case 'ASSIGNED':
        return 'bg-blue-950 text-blue-300 border-blue-500/40';
      case 'STANDBY':
        return 'bg-amber-950 text-amber-300 border-amber-500/40';
      case 'MAINTENANCE':
        return 'bg-purple-950 text-purple-300 border-purple-500/40';
      case 'UNAVAILABLE':
        return 'bg-rose-950 text-rose-300 border-rose-500/40';
      default:
        return 'bg-slate-900 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-5 animate-fadeIn font-mono">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#1A2D54] gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold font-display tracking-wider text-white">
              FLEET & RESOURCE STATUS
            </h2>
            <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
              32 TOTAL AIRFRAMES
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Real-time airframe telemetry, maintenance ceilings, and fuel readiness across Base Alpha & Base Bravo.
          </p>
        </div>

        {/* Quick Fleet Counter Chips */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-bold">
            24 READY / AVAILABLE
          </span>
          <span className="px-2.5 py-1 rounded bg-amber-950/80 border border-amber-500/30 text-amber-400">
            4 STANDBY
          </span>
          <span className="px-2.5 py-1 rounded bg-purple-950/80 border border-purple-500/30 text-purple-400">
            4 DEPOT/MAINT
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#091224]/90 border border-[#1A2D54] rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tail number, type, base..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#050C1B] border border-[#1A2E56] rounded-lg pl-9 pr-3 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center space-x-1.5 overflow-x-auto">
          <span className="text-slate-500 text-[11px]">STATUS:</span>
          {['ALL', 'READY', 'AVAILABLE', 'STANDBY', 'MAINTENANCE'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-2.5 py-1 rounded text-[10px] transition-colors ${
                filterStatus === status
                  ? 'bg-cyan-500 text-black font-bold'
                  : 'bg-[#060D1E] text-slate-400 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Type Filter */}
        <div className="flex items-center space-x-1.5">
          <span className="text-slate-500 text-[11px]">TYPE:</span>
          {['ALL', 'Fighter', 'Transport', 'Trainer', 'Support'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-2 py-1 rounded text-[10px] transition-colors ${
                filterType === type
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Fleet Table */}
      <div className="bg-[#091224]/90 border border-[#1A2D54] rounded-xl overflow-hidden reticle-box">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#050B17] border-b border-[#1A2D54] text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Asset ID</th>
                <th className="py-3 px-4">Aircraft Type</th>
                <th className="py-3 px-4">Base Station</th>
                <th className="py-3 px-4">Operational Status</th>
                <th className="py-3 px-4">Availability</th>
                <th className="py-3 px-4">Maint Buffer</th>
                <th className="py-3 px-4">Fuel State</th>
                <th className="py-3 px-4">Readiness</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#122244]">
              {filteredAssets.map((asset) => (
                <tr
                  key={asset.id}
                  className="hover:bg-[#0C1B3B]/60 transition-colors cursor-pointer group"
                  onClick={() => setSelectedAsset(asset)}
                >
                  <td className="py-3 px-4 font-bold text-white group-hover:text-cyan-400 flex items-center space-x-2">
                    <Plane className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{asset.id}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    <div>{asset.type}</div>
                    <div className="text-[10px] text-slate-500">{asset.squadron}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-300">{asset.base}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getStatusBadge(asset.status)}`}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${asset.availability > 80 ? 'bg-emerald-400' : asset.availability > 0 ? 'bg-amber-400' : 'bg-rose-500'}`}
                          style={{ width: `${asset.availability}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-slate-400">{asset.availability}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-[11px] ${asset.maintenanceHours < 50 ? 'text-rose-400 font-bold' : 'text-slate-300'}`}>
                      {asset.maintenanceHours}h remaining
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-1.5">
                      <Fuel className="w-3 h-3 text-cyan-400" />
                      <span className="text-slate-200">{asset.fuelPercent}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-bold text-emerald-400">{asset.readiness}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAsset(asset);
                      }}
                      className="px-2 py-1 rounded bg-[#0E1F42] hover:bg-cyan-500 hover:text-black text-cyan-300 text-[10px] transition-colors border border-cyan-500/30"
                    >
                      DETAILS
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Asset Modal / Drawer Popup */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#081329] border border-cyan-400/50 rounded-xl max-w-lg w-full p-5 shadow-glow-cyan">
            <div className="flex items-center justify-between pb-2 border-b border-[#1A2E56] mb-4">
              <div className="flex items-center space-x-2">
                <Plane className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-white tracking-wider">
                  {selectedAsset.id} — TELEMETRY & AVIONICS STATUS
                </h3>
              </div>
              <button
                onClick={() => setSelectedAsset(null)}
                className="text-slate-400 hover:text-white px-2 py-0.5 rounded"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded bg-[#050C1B] border border-[#142548]">
                <span className="text-slate-500 text-[10px] block">TYPE / SQUADRON:</span>
                <span className="text-slate-200 font-bold">{selectedAsset.type}</span>
                <span className="text-slate-400 block text-[10px]">{selectedAsset.squadron}</span>
              </div>
              <div className="p-2.5 rounded bg-[#050C1B] border border-[#142548]">
                <span className="text-slate-500 text-[10px] block">HOME STATION:</span>
                <span className="text-slate-200 font-bold">{selectedAsset.base}</span>
                <span className="text-emerald-400 block text-[10px]">RWY ALLOCATED</span>
              </div>
              <div className="p-2.5 rounded bg-[#050C1B] border border-[#142548]">
                <span className="text-slate-500 text-[10px] block">FUEL STATE:</span>
                <span className="text-cyan-300 font-bold text-sm">{selectedAsset.fuelPercent}%</span>
                <span className="text-slate-400 block text-[10px]">Range: {selectedAsset.maxRange}</span>
              </div>
              <div className="p-2.5 rounded bg-[#050C1B] border border-[#142548]">
                <span className="text-slate-500 text-[10px] block">MAINTENANCE BUFFER:</span>
                <span className="text-amber-400 font-bold text-sm">{selectedAsset.maintenanceHours} Hours</span>
                <span className="text-slate-400 block text-[10px]">Next 200hr Phase: Safe</span>
              </div>
            </div>

            <div className="mt-3 p-2.5 rounded bg-[#050C1B] border border-[#142548] text-xs">
              <span className="text-slate-500 text-[10px] block">CONFIGURED PAYLOAD / HARDPOINTS:</span>
              <span className="text-slate-200 font-mono">{selectedAsset.hardpoints}</span>
            </div>

            <div className="mt-4 pt-3 border-t border-[#142E56] flex justify-end">
              <button
                onClick={() => setSelectedAsset(null)}
                className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

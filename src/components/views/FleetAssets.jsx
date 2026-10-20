// VIKRAM1 — Page 3: Fleet & Assets Status Monitor (Realistic Defence Enterprise Theme)
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
        return 'bg-[#EDF7F2] text-[#2E7D5B] border-[#C4E5D4]';
      case 'AVAILABLE':
        return 'bg-[#EBF2F7] text-[#1E3A5F] border-[#CFDFEC]';
      case 'ASSIGNED':
        return 'bg-[#F0F4F8] text-[#526B82] border-[#D5DCE3]';
      case 'STANDBY':
        return 'bg-[#FFF8EB] text-[#B7791F] border-[#F5E1B5]';
      case 'MAINTENANCE':
        return 'bg-[#FDF2F2] text-[#B84242] border-[#F7C8C8]';
      case 'UNAVAILABLE':
        return 'bg-[#FDF2F2] text-[#B84242] border-[#F7C8C8]';
      default:
        return 'bg-[#F4F6F8] text-[#526B82] border-[#D5DCE3]';
    }
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#D5DCE3] gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold tracking-tight text-[#1E3A5F]">
              FLEET & RESOURCE STATUS
            </h2>
            <span className="text-[10px] bg-[#EBF2F7] text-[#1E3A5F] px-2 py-0.5 rounded border border-[#CFDFEC] font-semibold font-mono">
              32 AIRFRAMES
            </span>
          </div>
          <p className="text-xs text-[#60717D]">
            Real-time airframe telemetry, maintenance ceilings, and fuel readiness across Base Alpha & Base Bravo.
          </p>
        </div>

        {/* Quick Fleet Counter Chips */}
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-[#EDF7F2] border border-[#C4E5D4] text-[#2E7D5B] font-semibold">
            24 READY / AVAILABLE
          </span>
          <span className="px-2.5 py-1 rounded bg-[#FFF8EB] border border-[#F5E1B5] text-[#B7791F] font-semibold">
            4 STANDBY
          </span>
          <span className="px-2.5 py-1 rounded bg-[#FDF2F2] border border-[#F7C8C8] text-[#B84242] font-semibold">
            4 DEPOT/MAINT
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#D5DCE3] rounded-md p-3 flex flex-wrap items-center justify-between gap-3 text-xs shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-[#60717D] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tail number, type, base..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#D5DCE3] rounded pl-9 pr-3 py-1.5 text-[#263238] placeholder-[#9AA5B1] focus:outline-none focus:border-[#1E3A5F]"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center space-x-1.5 overflow-x-auto">
          <span className="text-[#60717D] text-[11px] font-semibold">STATUS:</span>
          {['ALL', 'READY', 'AVAILABLE', 'STANDBY', 'MAINTENANCE'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-2.5 py-1 rounded text-[10px] font-mono transition-colors ${
                filterStatus === status
                  ? 'bg-[#1E3A5F] text-white font-semibold'
                  : 'bg-[#F4F6F8] text-[#526B82] hover:bg-[#E8ECF0]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Type Filter */}
        <div className="flex items-center space-x-1.5">
          <span className="text-[#60717D] text-[11px] font-semibold">TYPE:</span>
          {['ALL', 'Fighter', 'Transport', 'Trainer', 'Support'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-2 py-1 rounded text-[10px] transition-colors ${
                filterType === type
                  ? 'bg-[#EBF2F7] text-[#1E3A5F] border border-[#CFDFEC] font-semibold'
                  : 'text-[#60717D] hover:text-[#263238]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Fleet Table */}
      <div className="bg-white border border-[#D5DCE3] rounded-md overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAFCFD] border-b border-[#D5DCE3] text-[#60717D] uppercase text-[10px] tracking-wider font-semibold font-mono">
              <tr>
                <th className="py-2.5 px-4">Asset ID</th>
                <th className="py-2.5 px-4">Aircraft Type</th>
                <th className="py-2.5 px-4">Base Station</th>
                <th className="py-2.5 px-4">Operational Status</th>
                <th className="py-2.5 px-4">Availability</th>
                <th className="py-2.5 px-4">Maint Buffer</th>
                <th className="py-2.5 px-4">Fuel State</th>
                <th className="py-2.5 px-4">Readiness</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAEF]">
              {filteredAssets.map((asset) => (
                <tr
                  key={asset.id}
                  className="hover:bg-[#F8FAFC] transition-colors cursor-pointer group"
                  onClick={() => setSelectedAsset(asset)}
                >
                  <td className="py-2.5 px-4 font-bold text-[#1E3A5F] flex items-center space-x-2 font-mono">
                    <Plane className="w-3.5 h-3.5 text-[#526B82] shrink-0" />
                    <span>{asset.id}</span>
                  </td>
                  <td className="py-2.5 px-4 text-[#263238]">
                    <div className="font-semibold">{asset.type}</div>
                    <div className="text-[10px] text-[#60717D]">{asset.squadron}</div>
                  </td>
                  <td className="py-2.5 px-4 text-[#263238]">{asset.base}</td>
                  <td className="py-2.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${getStatusBadge(asset.status)}`}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-[#E2E8F0] h-1.5 rounded overflow-hidden">
                        <div
                          className={`h-full ${asset.availability > 80 ? 'bg-[#2E7D5B]' : asset.availability > 0 ? 'bg-[#B7791F]' : 'bg-[#B84242]'}`}
                          style={{ width: `${asset.availability}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-[#60717D] font-mono">{asset.availability}%</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-4 font-mono">
                    <span className={`text-[11px] ${asset.maintenanceHours < 50 ? 'text-[#B84242] font-bold' : 'text-[#263238]'}`}>
                      {asset.maintenanceHours}h remaining
                    </span>
                  </td>
                  <td className="py-2.5 px-4 font-mono">
                    <div className="flex items-center space-x-1.5">
                      <Fuel className="w-3 h-3 text-[#526B82]" />
                      <span className="text-[#263238]">{asset.fuelPercent}%</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-4 font-bold text-[#2E7D5B] font-mono">{asset.readiness}</td>
                  <td className="py-2.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAsset(asset);
                      }}
                      className="px-2 py-1 rounded bg-[#F4F6F8] hover:bg-[#E8ECF0] text-[#1E3A5F] text-[10px] font-semibold transition-colors border border-[#D5DCE3]"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-none animate-fadeIn">
          <div className="bg-white border border-[#D5DCE3] rounded-md max-w-lg w-full p-5 shadow-lg">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5EAEF] mb-4">
              <div className="flex items-center space-x-2">
                <Plane className="w-5 h-5 text-[#1E3A5F]" />
                <h3 className="text-sm font-bold text-[#1E3A5F] tracking-wide">
                  {selectedAsset.id} — TELEMETRY & AVIONICS STATUS
                </h3>
              </div>
              <button
                onClick={() => setSelectedAsset(null)}
                className="text-[#60717D] hover:text-[#263238] px-2 py-0.5 rounded"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded bg-[#F8FAFC] border border-[#E5EAEF]">
                <span className="text-[#60717D] text-[10px] block font-semibold">TYPE / SQUADRON:</span>
                <span className="text-[#263238] font-bold">{selectedAsset.type}</span>
                <span className="text-[#60717D] block text-[10px]">{selectedAsset.squadron}</span>
              </div>
              <div className="p-2.5 rounded bg-[#F8FAFC] border border-[#E5EAEF]">
                <span className="text-[#60717D] text-[10px] block font-semibold">HOME STATION:</span>
                <span className="text-[#263238] font-bold">{selectedAsset.base}</span>
                <span className="text-[#2E7D5B] block text-[10px] font-semibold">RWY ALLOCATED</span>
              </div>
              <div className="p-2.5 rounded bg-[#F8FAFC] border border-[#E5EAEF]">
                <span className="text-[#60717D] text-[10px] block font-semibold">FUEL STATE:</span>
                <span className="text-[#1E3A5F] font-bold text-sm font-mono">{selectedAsset.fuelPercent}%</span>
                <span className="text-[#60717D] block text-[10px]">Range: {selectedAsset.maxRange}</span>
              </div>
              <div className="p-2.5 rounded bg-[#F8FAFC] border border-[#E5EAEF]">
                <span className="text-[#60717D] text-[10px] block font-semibold">MAINTENANCE BUFFER:</span>
                <span className="text-[#B7791F] font-bold text-sm font-mono">{selectedAsset.maintenanceHours} Hours</span>
                <span className="text-[#60717D] block text-[10px]">Next 200hr Phase: Safe</span>
              </div>
            </div>

            <div className="mt-3 p-2.5 rounded bg-[#F8FAFC] border border-[#E5EAEF] text-xs">
              <span className="text-[#60717D] text-[10px] block font-semibold">CONFIGURED PAYLOAD / HARDPOINTS:</span>
              <span className="text-[#263238] font-mono">{selectedAsset.hardpoints}</span>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E5EAEF] flex justify-end">
              <button
                onClick={() => setSelectedAsset(null)}
                className="px-4 py-1.5 rounded bg-[#1E3A5F] hover:bg-[#162C47] text-white font-semibold text-xs transition-colors shadow-sm"
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

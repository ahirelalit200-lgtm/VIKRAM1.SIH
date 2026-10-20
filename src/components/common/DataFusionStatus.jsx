// VIKRAM1 — Multi-Source Data Fusion Status Panel (Realistic Defence Enterprise Theme)
import React from 'react';
import { DATA_FUSION_SOURCES } from '../../data/mockData';
import { Database, CheckCircle2, RefreshCw } from 'lucide-react';

export default function DataFusionStatus() {
  return (
    <div className="bg-white border border-[#D5DCE3] rounded-md p-4 shadow-sm">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5EAEF]">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded bg-[#EDF7F2] border border-[#C4E5D4] text-[#2E7D5B]">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#1E3A5F] tracking-wide uppercase flex items-center gap-2">
              MULTI-SOURCE DATA FUSION
              <span className="text-[10px] text-[#2E7D5B] bg-[#EDF7F2] px-2 py-0.5 rounded border border-[#C4E5D4] font-semibold">
                7 CHANNELS SYNCHRONIZED
              </span>
            </h3>
            <p className="text-[10px] text-[#60717D]">
              Unified real-time ingestion layer eliminating fragmented aviation information
            </p>
          </div>
        </div>

        <button className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#F4F6F8] hover:bg-[#E8ECF0] border border-[#D5DCE3] text-[#1E3A5F] text-[10px] font-semibold transition-colors">
          <RefreshCw className="w-3 h-3 text-[#526B82]" />
          <span>FORCE SYNC</span>
        </button>
      </div>

      {/* Grid of 7 Data Sources */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-2.5">
        {DATA_FUSION_SOURCES.map((source) => (
          <div
            key={source.id}
            className="p-2.5 rounded bg-[#F8FAFC] border border-[#E5EAEF] hover:border-[#D5DCE3] transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] text-[#60717D] uppercase font-semibold font-mono">
                  {source.category}
                </span>
                <span className="text-[9px] text-[#2E7D5B] bg-[#EDF7F2] px-1.5 py-0.2 rounded border border-[#C4E5D4] font-bold font-mono">
                  {source.status}
                </span>
              </div>
              <h4 className="text-[11px] font-bold text-[#263238] leading-tight truncate">
                {source.name}
              </h4>
            </div>

            <div className="mt-2.5 pt-1.5 border-t border-[#E5EAEF] flex items-center justify-between text-[9px] font-mono text-[#60717D]">
              <span>LATENCY: <strong className="text-[#1E3A5F]">{source.latency}</strong></span>
              <span>RATE: <strong className="text-[#263238]">{source.updateRate}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {/* Problem statement insight footer */}
      <div className="mt-3 px-3 py-2 rounded bg-[#F4F6F8] border border-[#D5DCE3] text-[10px] text-[#263238] flex items-center justify-between">
        <span>
          <strong className="text-[#1E3A5F]">System Architecture:</strong> Aggregates telemetry, maintenance records, crew duty hours, weather forecasts, and NOTAM restrictions into a single decision-support bus.
        </span>
        <span className="text-[#2E7D5B] font-bold font-mono ml-2 shrink-0">FUSION INTEGRITY: 99.4%</span>
      </div>
    </div>
  );
}

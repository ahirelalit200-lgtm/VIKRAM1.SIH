// VIKRAM1 — Multi-Source Data Fusion Status Panel
// Demonstrates integration across fragmented defence information systems
import React from 'react';
import { DATA_FUSION_SOURCES } from '../../data/mockData';
import { Database, Wifi, Shield, CheckCircle2, RefreshCw } from 'lucide-react';

export default function DataFusionStatus() {
  return (
    <div className="bg-[#091224]/90 border border-[#1A2D54] rounded-xl p-4 font-mono reticle-box">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#142344]">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-emerald-950 border border-emerald-500/40 text-emerald-400">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white tracking-wider uppercase flex items-center gap-2">
              MULTI-SOURCE DATA FUSION
              <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                ALL 7 CHANNELS SYNCED
              </span>
            </h3>
            <p className="text-[10px] text-slate-400">
              Aggregated real-time ingestion layer eliminating siloed aviation information
            </p>
          </div>
        </div>

        <button className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#0D1C3D] hover:bg-[#132A5C] border border-[#1E3A70] text-cyan-300 text-[10px] transition-colors">
          <RefreshCw className="w-3 h-3 text-cyan-400" />
          <span>FORCE SYNC</span>
        </button>
      </div>

      {/* Grid of 7 Data Sources */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-2.5">
        {DATA_FUSION_SOURCES.map((source) => (
          <div
            key={source.id}
            className="p-2.5 rounded-lg bg-[#070E1F] border border-[#142344] hover:border-cyan-500/40 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] text-slate-500 uppercase font-semibold">
                  {source.category}
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9px] text-emerald-400 font-bold">
                    {source.status}
                  </span>
                </span>
              </div>
              <h4 className="text-[11px] font-bold text-slate-200 leading-tight truncate">
                {source.name}
              </h4>
            </div>

            <div className="mt-2.5 pt-1.5 border-t border-[#122040] flex items-center justify-between text-[9px] text-slate-400">
              <span>LATENCY: <strong className="text-cyan-300">{source.latency}</strong></span>
              <span>RATE: <strong className="text-slate-300">{source.updateRate}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {/* Problem statement insight footer */}
      <div className="mt-3 px-3 py-2 rounded bg-cyan-950/30 border border-cyan-500/20 text-[10px] text-cyan-200/90 flex items-center justify-between">
        <span>
          💡 <strong>Core Architectural Solution:</strong> Ingests telemetry, maintenance schedules, crew duty hours, weather radars, and airspace NOTAMs into a unified in-memory graph.
        </span>
        <span className="text-emerald-400 font-bold ml-2 shrink-0">FUSION INTEGRITY: 99.4%</span>
      </div>
    </div>
  );
}

// VIKRAM1 — Page 6: Weather & Environment Monitor
import React from 'react';
import { SYNTHETIC_WEATHER } from '../../data/mockData';
import {
  CloudSun,
  Wind,
  Eye,
  Thermometer,
  CloudRain,
  Compass,
  Gauge,
  AlertTriangle,
  Activity,
  CheckCircle2
} from 'lucide-react';

export default function WeatherEnvironment() {
  return (
    <div className="space-y-5 animate-fadeIn font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#1A2D54] gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold font-display tracking-wider text-white">
              ENVIRONMENT & METEOROLOGICAL MONITOR
            </h2>
            <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
              SYNTHETIC RADAR & METAR
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Real-time environmental ingestion assessing turbulence, convective storms, crosswind envelopes, and visibility minimums.
          </p>
        </div>

        <div className="px-3 py-1 rounded bg-[#09152B] border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>OVERALL ENVIRONMENT: {SYNTHETIC_WEATHER.overall}</span>
        </div>
      </div>

      {/* 5 Main Weather Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="p-4 rounded-xl bg-[#091224] border border-[#1A2D54] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 uppercase">Visibility</span>
            <Eye className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl font-bold text-emerald-400 my-1">10+ km</div>
          <span className="text-[10px] text-emerald-400/80">VFR CONDITIONS (GOOD)</span>
        </div>

        <div className="p-4 rounded-xl bg-[#091224] border border-[#1A2D54] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 uppercase">Surface Wind</span>
            <Wind className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl font-bold text-white my-1">14 kts</div>
          <span className="text-[10px] text-slate-400">260° WSW (MODERATE)</span>
        </div>

        <div className="p-4 rounded-xl bg-[#091224] border border-[#1A2D54] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 uppercase">Cloud Ceiling</span>
            <CloudSun className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl font-bold text-white my-1">18,000 ft</div>
          <span className="text-[10px] text-slate-400">Overcast (SAFE FLIGHT)</span>
        </div>

        <div className="p-4 rounded-xl bg-[#091224] border border-[#1A2D54] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 uppercase">Ambient Temp</span>
            <Thermometer className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl font-bold text-cyan-300 my-1">24°C</div>
          <span className="text-[10px] text-slate-400">Dew Point: 14°C</span>
        </div>

        <div className="p-4 rounded-xl bg-[#091224] border border-amber-500/40 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 uppercase">Turbulence</span>
            <Activity className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-bold text-amber-400 my-1">MODERATE</div>
          <span className="text-[10px] text-amber-400/80">Sector B Cell Delta</span>
        </div>
      </div>

      {/* Synthetic Environmental Timeline Forecast Chart */}
      <div className="bg-[#091224]/90 border border-[#1A2D54] rounded-xl p-5 reticle-box space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#142344]">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              SIMULATED ENVIRONMENTAL RISK TIMELINE (08:00 – 18:00)
            </h3>
          </div>
          <div className="flex items-center space-x-3 text-[10px]">
            <span className="flex items-center gap-1 text-cyan-400">
              <span className="w-2.5 h-1 bg-cyan-400 rounded-sm inline-block" /> Visibility (km)
            </span>
            <span className="flex items-center gap-1 text-amber-400">
              <span className="w-2.5 h-1 bg-amber-400 rounded-sm inline-block" /> Wind Speed (kts)
            </span>
            <span className="flex items-center gap-1 text-rose-400">
              <span className="w-2.5 h-1 bg-rose-400 rounded-sm inline-block" /> Risk Index %
            </span>
          </div>
        </div>

        {/* Visual Timeline Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 pt-3">
          {SYNTHETIC_WEATHER.forecastTimeline.map((slot) => {
            const isStormPeak = slot.riskIndex > 60;
            return (
              <div
                key={slot.time}
                className={`p-3 rounded-lg border flex flex-col justify-between text-xs ${
                  isStormPeak
                    ? 'bg-rose-950/40 border-rose-500/60 shadow-glow-red'
                    : 'bg-[#060D1E] border-[#142548]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white text-xs">{slot.time} IST</span>
                    {isStormPeak && (
                      <span className="text-[9px] bg-rose-900 text-rose-200 px-1.5 py-0.2 rounded font-bold">
                        STORM
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 text-[11px]">
                    <div className="flex justify-between text-slate-400">
                      <span>Visibility:</span>
                      <span className="text-cyan-300 font-bold">{slot.visibilityKm} km</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Winds:</span>
                      <span className="text-amber-400 font-bold">{slot.windKnots} kts</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Ceiling:</span>
                      <span className="text-slate-200">{slot.ceilingFt} ft</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-[#142344]">
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span>Risk Index:</span>
                    <span className={slot.riskIndex > 50 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                      {slot.riskIndex}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        slot.riskIndex > 60 ? 'bg-rose-500' : slot.riskIndex > 30 ? 'bg-amber-400' : 'bg-emerald-400'
                      }`}
                      style={{ width: `${slot.riskIndex}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* METAR Synthetic Feed */}
        <div className="p-3 rounded-lg bg-[#050C1B] border border-[#142548] text-xs">
          <span className="text-slate-500 text-[10px] block mb-1">
            SYNTHETIC RAW METAR TELEMETRY FEED (SECTOR A & B):
          </span>
          <div className="text-cyan-300 font-mono text-[11px] leading-relaxed">
            BASE_ALPHA 201045Z 26014KT 9999 FEW030 SCT180 24/14 Q1013 NOSIG RMK CORRIDOR_ALPHA NOMINAL<br />
            BASE_BRAVO 201045Z 28018G26KT 8000 -RA BKN025 OVC120 22/16 Q1012 TEMPO TS_SECTOR_B
          </div>
        </div>
      </div>
    </div>
  );
}

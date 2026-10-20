// VIKRAM1 — Page 6: Weather & Environment Monitor (Realistic Defence Enterprise Theme)
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
    <div className="space-y-4 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#D5DCE3] gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold tracking-tight text-[#1E3A5F]">
              ENVIRONMENT & METEOROLOGICAL MONITOR
            </h2>
            <span className="text-[10px] bg-[#EBF2F7] text-[#1E3A5F] px-2 py-0.5 rounded border border-[#CFDFEC] font-semibold font-mono">
              SYNTHETIC RADAR & METAR
            </span>
          </div>
          <p className="text-xs text-[#60717D]">
            Real-time environmental ingestion assessing turbulence, convective storms, crosswind envelopes, and visibility minimums.
          </p>
        </div>

        <div className="px-3 py-1 rounded bg-[#EDF7F2] border border-[#C4E5D4] text-[#2E7D5B] text-xs font-semibold flex items-center gap-1.5 font-mono">
          <CheckCircle2 className="w-4 h-4 text-[#2E7D5B]" />
          <span>OVERALL ENVIRONMENT: {SYNTHETIC_WEATHER.overall}</span>
        </div>
      </div>

      {/* 5 Main Weather Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="p-4 rounded-md bg-white border border-[#D5DCE3] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#60717D] uppercase font-semibold">Visibility</span>
            <Eye className="w-4 h-4 text-[#526B82]" />
          </div>
          <div className="text-xl font-bold text-[#2E7D5B] font-mono my-1">10+ km</div>
          <span className="text-[10px] text-[#2E7D5B] font-medium">VFR CONDITIONS (GOOD)</span>
        </div>

        <div className="p-4 rounded-md bg-white border border-[#D5DCE3] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#60717D] uppercase font-semibold">Surface Wind</span>
            <Wind className="w-4 h-4 text-[#526B82]" />
          </div>
          <div className="text-xl font-bold text-[#263238] font-mono my-1">14 kts</div>
          <span className="text-[10px] text-[#60717D]">260° WSW (MODERATE)</span>
        </div>

        <div className="p-4 rounded-md bg-white border border-[#D5DCE3] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#60717D] uppercase font-semibold">Cloud Ceiling</span>
            <CloudSun className="w-4 h-4 text-[#526B82]" />
          </div>
          <div className="text-xl font-bold text-[#263238] font-mono my-1">18,000 ft</div>
          <span className="text-[10px] text-[#60717D]">Overcast (SAFE FLIGHT)</span>
        </div>

        <div className="p-4 rounded-md bg-white border border-[#D5DCE3] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#60717D] uppercase font-semibold">Ambient Temp</span>
            <Thermometer className="w-4 h-4 text-[#526B82]" />
          </div>
          <div className="text-xl font-bold text-[#1E3A5F] font-mono my-1">24°C</div>
          <span className="text-[10px] text-[#60717D]">Dew Point: 14°C</span>
        </div>

        <div className="p-4 rounded-md bg-white border border-[#D5DCE3] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#60717D] uppercase font-semibold">Turbulence</span>
            <Activity className="w-4 h-4 text-[#B7791F]" />
          </div>
          <div className="text-xl font-bold text-[#B7791F] font-mono my-1">MODERATE</div>
          <span className="text-[10px] text-[#B7791F] font-medium">Sector B Cell Delta</span>
        </div>
      </div>

      {/* Synthetic Environmental Timeline Forecast Chart */}
      <div className="bg-white border border-[#D5DCE3] rounded-md p-4 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#E5EAEF]">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-[#1E3A5F]" />
            <h3 className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wide">
              SIMULATED ENVIRONMENTAL RISK TIMELINE (08:00 – 18:00)
            </h3>
          </div>
          <div className="flex items-center space-x-3 text-[10px] font-mono">
            <span className="flex items-center gap-1 text-[#1E3A5F]">
              <span className="w-2.5 h-1 bg-[#1E3A5F] rounded-sm inline-block" /> Visibility (km)
            </span>
            <span className="flex items-center gap-1 text-[#B7791F]">
              <span className="w-2.5 h-1 bg-[#B7791F] rounded-sm inline-block" /> Wind (kts)
            </span>
            <span className="flex items-center gap-1 text-[#B84242]">
              <span className="w-2.5 h-1 bg-[#B84242] rounded-sm inline-block" /> Risk Index %
            </span>
          </div>
        </div>

        {/* Visual Timeline Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 pt-2">
          {SYNTHETIC_WEATHER.forecastTimeline.map((slot) => {
            const isStormPeak = slot.riskIndex > 60;
            return (
              <div
                key={slot.time}
                className={`p-3 rounded border flex flex-col justify-between text-xs ${
                  isStormPeak
                    ? 'bg-[#FFF8F8] border-[#F7C8C8]'
                    : 'bg-[#F8FAFC] border-[#E5EAEF]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-[#263238] text-xs font-mono">{slot.time} IST</span>
                    {isStormPeak && (
                      <span className="text-[9px] bg-[#FDF2F2] text-[#B84242] border border-[#F7C8C8] px-1.5 py-0.2 rounded font-bold font-mono">
                        STORM
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 text-[11px]">
                    <div className="flex justify-between text-[#60717D]">
                      <span>Visibility:</span>
                      <span className="text-[#1E3A5F] font-bold font-mono">{slot.visibilityKm} km</span>
                    </div>
                    <div className="flex justify-between text-[#60717D]">
                      <span>Winds:</span>
                      <span className="text-[#B7791F] font-bold font-mono">{slot.windKnots} kts</span>
                    </div>
                    <div className="flex justify-between text-[#60717D]">
                      <span>Ceiling:</span>
                      <span className="text-[#263238] font-mono">{slot.ceilingFt} ft</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-[#E5EAEF]">
                  <div className="flex justify-between text-[10px] text-[#60717D] mb-1 font-mono">
                    <span>Risk Index:</span>
                    <span className={slot.riskIndex > 50 ? 'text-[#B84242] font-bold' : 'text-[#2E7D5B]'}>
                      {slot.riskIndex}%
                    </span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-1.5 rounded overflow-hidden">
                    <div
                      className={`h-full ${
                        slot.riskIndex > 60 ? 'bg-[#B84242]' : slot.riskIndex > 30 ? 'bg-[#B7791F]' : 'bg-[#2E7D5B]'
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
        <div className="p-3 rounded bg-[#F8FAFC] border border-[#E5EAEF] text-xs">
          <span className="text-[#60717D] text-[10px] font-semibold block mb-1">
            SYNTHETIC RAW METAR TELEMETRY FEED (SECTOR A & B):
          </span>
          <div className="text-[#263238] font-mono text-[11px] leading-relaxed">
            BASE_ALPHA 201045Z 26014KT 9999 FEW030 SCT180 24/14 Q1013 NOSIG RMK CORRIDOR_ALPHA NOMINAL<br />
            BASE_BRAVO 201045Z 28018G26KT 8000 -RA BKN025 OVC120 22/16 Q1012 TEMPO TS_SECTOR_B
          </div>
        </div>
      </div>
    </div>
  );
}

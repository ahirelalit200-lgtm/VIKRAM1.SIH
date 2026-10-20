// VIKRAM1 — Interactive Synthetic Airspace Map (Tactical Display)
// 100% Synthetic & Non-Geographic Airspace Representation
import React, { useState } from 'react';
import {
  Plane,
  Navigation,
  CloudRain,
  ShieldAlert,
  Layers,
  Crosshair,
  Radio,
  Eye,
  Info
} from 'lucide-react';

export default function TacticalMap({ interactive = true, highlightedPlan = null }) {
  // Layer toggles
  const [showAircraft, setShowAircraft] = useState(true);
  const [showCorridors, setShowCorridors] = useState(true);
  const [showWeather, setShowWeather] = useState(true);
  const [showRestricted, setShowRestricted] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState(null);

  // Synthetic Airframe Positions on the 800x500 Grid
  const flightAssets = [
    { id: 'VKR-101', type: 'Multi-Role Fighter', x: 280, y: 160, heading: 65, fl: 'FL320', speed: '480 kt', fuel: '94%', pilot: 'Sqn Ldr A. Mehta', status: 'ON_STATION', role: 'CAP Lead', base: 'Base Alpha' },
    { id: 'VKR-102', type: 'Multi-Role Fighter', x: 310, y: 185, heading: 65, fl: 'FL320', speed: '480 kt', fuel: '88%', pilot: 'Flt Lt K. Verma', status: 'ON_STATION', role: 'CAP Wingman', base: 'Base Alpha' },
    { id: 'VKR-103', type: 'Multi-Role Fighter', x: 440, y: 270, heading: 140, fl: 'FL260', speed: '420 kt', fuel: '91%', pilot: 'Sqn Ldr R. Iyer', status: 'TRANSIT', role: 'Sector Transit', base: 'Base Alpha', warning: 'Entering Sector B Weather Fringe' },
    { id: 'VKR-104', type: 'Multi-Role Fighter', x: 620, y: 350, heading: 320, fl: 'FL340', speed: '490 kt', fuel: '96%', pilot: 'Flt Lt P. Roy', status: 'PATROL', role: 'Reserve CAP', base: 'Base Bravo' },
    { id: 'VKR-106', type: 'Heavy Transport', x: 210, y: 320, heading: 90, fl: 'FL240', speed: '360 kt', fuel: '82%', pilot: 'Sqn Ldr D. Kaul', status: 'TRANSIT', role: 'Aero-Logistics', base: 'Base Alpha' },
    { id: 'VKR-110', type: 'AEW&C Support', x: 230, y: 110, heading: 270, fl: 'FL380', speed: '340 kt', fuel: '98%', pilot: 'Flt Lt S. Nair', status: 'ORBIT', role: 'Radar Surveillance Orbit', base: 'Base Alpha' },
    { id: 'VKR-111', type: 'Electronic Recon', x: 490, y: 220, heading: 180, fl: 'FL290', speed: '390 kt', fuel: '76%', pilot: 'Flt Lt M. Gill', status: 'RECON', role: 'Signal Correlator', base: 'Base Bravo' },
  ];

  return (
    <div className="relative w-full h-[460px] bg-[#050C1B] rounded-xl border border-[#1A2E56] overflow-hidden select-none flex flex-col justify-between">
      {/* Map Control Bar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center space-x-2 bg-[#081226]/90 backdrop-blur border border-[#1A2E56] px-3 py-1.5 rounded-lg pointer-events-auto">
          <Crosshair className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-bold text-white tracking-wider">
            SYNTHETIC AIRSPACE GRID — TACTICAL RADAR
          </span>
          <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
            NON-GEOGRAPHIC
          </span>
        </div>

        {/* Layer Toggles */}
        <div className="flex items-center space-x-1.5 bg-[#081226]/90 backdrop-blur border border-[#1A2E56] p-1 rounded-lg pointer-events-auto text-[11px] font-mono">
          <button
            onClick={() => setShowAircraft(!showAircraft)}
            className={`px-2.5 py-1 rounded transition-colors ${
              showAircraft ? 'bg-cyan-500 text-black font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            AIRCRAFT
          </button>
          <button
            onClick={() => setShowCorridors(!showCorridors)}
            className={`px-2.5 py-1 rounded transition-colors ${
              showCorridors ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            CORRIDORS
          </button>
          <button
            onClick={() => setShowWeather(!showWeather)}
            className={`px-2.5 py-1 rounded transition-colors ${
              showWeather ? 'bg-amber-950 text-amber-300 border border-amber-500/40 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            WEATHER
          </button>
          <button
            onClick={() => setShowRestricted(!showRestricted)}
            className={`px-2.5 py-1 rounded transition-colors ${
              showRestricted ? 'bg-red-950 text-red-300 border border-red-500/40 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            RESTRICTED
          </button>
        </div>
      </div>

      {/* Main SVG Vector Canvas */}
      <svg
        viewBox="0 0 800 500"
        className="w-full h-full object-cover"
        style={{ background: 'radial-gradient(circle at 50% 50%, #071329 0%, #040914 100%)' }}
      >
        <defs>
          {/* Grid Pattern */}
          <pattern id="tacGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 240, 255, 0.05)" strokeWidth="0.8" />
          </pattern>

          {/* Diagonal Hazard Pattern */}
          <pattern id="hazardPattern" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="10" stroke="rgba(255, 51, 85, 0.35)" strokeWidth="3" />
          </pattern>

          {/* Weather Cloud Pattern */}
          <pattern id="weatherPattern" width="12" height="12" patternTransform="rotate(25 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="12" stroke="rgba(245, 158, 11, 0.25)" strokeWidth="2.5" />
          </pattern>

          {/* Radial Gradient for Radar Sweep */}
          <linearGradient id="sweepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 240, 255, 0.2)" />
            <stop offset="100%" stopColor="rgba(0, 240, 255, 0)" />
          </linearGradient>
        </defs>

        {/* Background Grid */}
        <rect width="800" height="500" fill="url(#tacGrid)" />

        {/* Range Rings (Center: Base Alpha ~ 180, 260) */}
        <circle cx="200" cy="240" r="100" fill="none" stroke="rgba(0, 240, 255, 0.08)" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="200" cy="240" r="190" fill="none" stroke="rgba(0, 240, 255, 0.08)" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="200" cy="240" r="280" fill="none" stroke="rgba(0, 240, 255, 0.06)" strokeWidth="1" strokeDasharray="4 4" />
        <text x="205" y="145" fill="rgba(0, 240, 255, 0.3)" fontSize="9" fontFamily="monospace">50 NM</text>
        <text x="205" y="55" fill="rgba(0, 240, 255, 0.3)" fontSize="9" fontFamily="monospace">100 NM</text>

        {/* SECTORS BOUNDARIES */}
        {/* Sector A: Northern Corridor */}
        <polygon
          points="80,40 460,40 420,200 60,190"
          fill="rgba(0, 240, 255, 0.03)"
          stroke="rgba(0, 240, 255, 0.2)"
          strokeWidth="1.2"
          strokeDasharray="6 3"
        />
        <text x="90" y="60" fill="#00F0FF" fontSize="11" fontWeight="bold" fontFamily="monospace" letterSpacing="1">
          SECTOR A [NORTHERN CORRIDORS] • FL150-FL450
        </text>

        {/* Sector B: Central Transit Area */}
        <polygon
          points="420,200 750,140 760,330 360,340"
          fill="rgba(245, 158, 11, 0.03)"
          stroke="rgba(245, 158, 11, 0.25)"
          strokeWidth="1.2"
          strokeDasharray="6 3"
        />
        <text x="540" y="170" fill="#F59E0B" fontSize="11" fontWeight="bold" fontFamily="monospace" letterSpacing="1">
          SECTOR B [TRANSIT ZONE]
        </text>

        {/* Sector C: Southern Training Arc */}
        <polygon
          points="60,360 400,360 400,470 60,470"
          fill="rgba(16, 185, 129, 0.03)"
          stroke="rgba(16, 185, 129, 0.2)"
          strokeWidth="1.2"
          strokeDasharray="6 3"
        />
        <text x="80" y="385" fill="#10B981" fontSize="11" fontWeight="bold" fontFamily="monospace" letterSpacing="1">
          SECTOR C [TRAINING ARC] • SFC-FL250
        </text>

        {/* SAFE FLIGHT CORRIDORS */}
        {showCorridors && (
          <g>
            {/* Corridor Alpha: Base Alpha -> Sector A */}
            <path
              d="M 180,240 Q 230,170 330,160 T 520,120"
              fill="none"
              stroke="#00F0FF"
              strokeWidth="2.5"
              strokeDasharray="8 6"
              opacity="0.8"
            />
            <text x="240" y="145" fill="#00F0FF" fontSize="9" fontFamily="monospace">CORRIDOR ALPHA (FL320)</text>

            {/* Corridor Echo: Weather Bypass Arc */}
            <path
              d="M 180,240 Q 260,80 500,80 T 670,220"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="1.8"
              strokeDasharray="5 5"
              opacity="0.6"
            />
            <text x="360" y="75" fill="#38BDF8" fontSize="9" fontFamily="monospace">CORRIDOR ECHO [HIGH BYPASS FL380]</text>

            {/* Corridor Bravo: Base Alpha -> Base Bravo */}
            <path
              d="M 180,240 L 660,370"
              fill="none"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <text x="400" y="315" fill="rgba(255, 255, 255, 0.5)" fontSize="9" fontFamily="monospace">CORRIDOR BRAVO (TRANSIT)</text>
          </g>
        )}

        {/* RESTRICTED ZONE ZULU-9 */}
        {showRestricted && (
          <g>
            <polygon
              points="450,220 540,200 560,280 470,300"
              fill="url(#hazardPattern)"
              stroke="#FF3355"
              strokeWidth="2"
            />
            <circle cx="505" cy="250" r="4" fill="#FF3355" />
            <text x="455" y="215" fill="#FF3355" fontSize="10" fontWeight="bold" fontFamily="monospace">
              ⚠ RESTRICTED ZONE ZULU-9 (PROHIBITED)
            </text>
          </g>
        )}

        {/* WEATHER CELL DELTA (Convective Thunderstorm Cluster) */}
        {showWeather && (
          <g>
            <ellipse cx="580" cy="240" rx="65" ry="42" fill="url(#weatherPattern)" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 3" />
            <circle cx="580" cy="240" r="5" fill="#F59E0B" />
            <text x="525" y="235" fill="#F59E0B" fontSize="10" fontWeight="bold" fontFamily="monospace">
              ⚡ WEATHER CELL DELTA
            </text>
            <text x="525" y="248" fill="#F59E0B" fontSize="8" fontFamily="monospace">
              FL180-FL380 | CONVECTIVE
            </text>
          </g>
        )}

        {/* BASES */}
        {/* Base Alpha */}
        <g transform="translate(180, 240)">
          <circle cx="0" cy="0" r="14" fill="#0B1C3D" stroke="#00F0FF" strokeWidth="2" />
          <circle cx="0" cy="0" r="6" fill="#00F0FF" />
          <rect x="-16" y="-3" width="32" height="6" fill="rgba(0, 240, 255, 0.25)" />
          <text x="-35" y="28" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">
            BASE ALPHA
          </text>
          <text x="-35" y="39" fill="#00FF88" fontSize="8" fontFamily="monospace">
            MAIN HUB • RWY 09L/27R
          </text>
        </g>

        {/* Base Bravo */}
        <g transform="translate(660, 370)">
          <circle cx="0" cy="0" r="12" fill="#0B1C3D" stroke="#00F0FF" strokeWidth="2" />
          <circle cx="0" cy="0" r="5" fill="#00F0FF" />
          <text x="-40" y="26" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">
            BASE BRAVO
          </text>
          <text x="-40" y="37" fill="#00D8F6" fontSize="8" fontFamily="monospace">
            FORWARD BASE • RWY 14/32
          </text>
        </g>

        {/* AIRCRAFT MARKERS */}
        {showAircraft &&
          flightAssets.map((asset) => {
            const isSelected = selectedAsset?.id === asset.id;
            return (
              <g
                key={asset.id}
                transform={`translate(${asset.x}, ${asset.y})`}
                className="cursor-pointer group"
                onClick={() => setSelectedAsset(asset)}
              >
                {/* Ping beacon */}
                <circle cx="0" cy="0" r="10" fill="none" stroke="#00F0FF" strokeWidth="1" className="animate-ping" opacity="0.4" />
                
                {/* Aircraft Body with Rotation */}
                <g transform={`rotate(${asset.heading})`}>
                  <polygon
                    points="0,-8 6,6 0,3 -6,6"
                    fill={asset.warning ? '#F59E0B' : '#00F0FF'}
                    stroke="#040914"
                    strokeWidth="1.5"
                  />
                </g>

                {/* Telemetry Tag */}
                <rect
                  x="8"
                  y="-12"
                  width="72"
                  height="16"
                  fill="rgba(4, 9, 20, 0.85)"
                  stroke={isSelected ? '#00FF88' : 'rgba(0, 240, 255, 0.4)'}
                  strokeWidth="1"
                  rx="3"
                />
                <text x="12" y="-1" fill="#FFFFFF" fontSize="8.5" fontWeight="bold" fontFamily="monospace">
                  {asset.id}
                </text>
                <text x="54" y="-1" fill="#00F0FF" fontSize="7.5" fontFamily="monospace">
                  {asset.fl}
                </text>
              </g>
            );
          })}
      </svg>

      {/* Selected Aircraft Tactical HUD Card Popup */}
      {selectedAsset && (
        <div className="absolute bottom-3 left-3 bg-[#081329]/95 border border-cyan-400/50 p-3 rounded-lg shadow-glow-cyan backdrop-blur-md max-w-xs z-30 font-mono text-xs text-slate-200">
          <div className="flex items-center justify-between pb-1.5 border-b border-[#1A2E56] mb-2">
            <span className="font-bold text-cyan-300 flex items-center gap-1.5">
              <Plane className="w-3.5 h-3.5 text-cyan-400" />
              {selectedAsset.id} — {selectedAsset.type}
            </span>
            <button
              onClick={() => setSelectedAsset(null)}
              className="text-slate-400 hover:text-white px-1"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
            <div><span className="text-slate-500">PILOT:</span> <span className="text-white">{selectedAsset.pilot}</span></div>
            <div><span className="text-slate-500">ROLE:</span> <span className="text-cyan-200">{selectedAsset.role}</span></div>
            <div><span className="text-slate-500">ALTITUDE:</span> <span className="text-emerald-400 font-bold">{selectedAsset.fl}</span></div>
            <div><span className="text-slate-500">SPEED:</span> <span className="text-white">{selectedAsset.speed}</span></div>
            <div><span className="text-slate-500">FUEL:</span> <span className="text-white">{selectedAsset.fuel}</span></div>
            <div><span className="text-slate-500">HOME:</span> <span className="text-white">{selectedAsset.base}</span></div>
          </div>
          {selectedAsset.warning && (
            <div className="mt-2 p-1.5 rounded bg-amber-950/60 border border-amber-600/50 text-amber-300 text-[10px] flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-amber-400" />
              {selectedAsset.warning}
            </div>
          )}
        </div>
      )}

      {/* Bottom Status Ticker inside Map */}
      <div className="bg-[#040A18]/90 border-t border-[#14264A] px-3 py-1.5 flex items-center justify-between text-[10px] font-mono text-slate-400 z-10">
        <div className="flex items-center space-x-3">
          <span className="text-cyan-400 flex items-center gap-1">
            <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
            SYNTHETIC RADAR: ACTIVE (SWEEP 4.0s)
          </span>
          <span>AIRFRAME VECTORS: 7 TRACKED</span>
          <span>SAFE CORRIDORS: 3 NOMINAL</span>
        </div>
        <div className="text-slate-500 hidden sm:block">
          GRID COORDINATES: 28°34'N 77°12'E SYNTH-DATUM
        </div>
      </div>
    </div>
  );
}

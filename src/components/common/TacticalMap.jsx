// VIKRAM1 — Interactive Synthetic Airspace Map (Tactical Display - Realistic Aviation Theme)
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
    <div className="relative w-full h-[460px] bg-white rounded-md border border-[#D5DCE3] shadow-sm overflow-hidden select-none flex flex-col justify-between">
      {/* Map Control Bar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center space-x-2 bg-white/95 border border-[#D5DCE3] px-3 py-1.5 rounded shadow-sm pointer-events-auto">
          <Crosshair className="w-4 h-4 text-[#1E3A5F]" />
          <span className="text-xs font-mono font-bold text-[#1E3A5F] tracking-wide">
            SYNTHETIC AIRSPACE MONITOR
          </span>
          <span className="text-[10px] font-mono text-[#526B82] bg-[#F4F6F8] px-2 py-0.5 rounded border border-[#D5DCE3] font-semibold">
            NON-GEOGRAPHIC
          </span>
        </div>

        {/* Layer Toggles */}
        <div className="flex items-center space-x-1.5 bg-white/95 border border-[#D5DCE3] p-1 rounded shadow-sm pointer-events-auto text-[11px] font-mono">
          <button
            onClick={() => setShowAircraft(!showAircraft)}
            className={`px-2.5 py-0.5 rounded transition-colors ${
              showAircraft ? 'bg-[#1E3A5F] text-white font-semibold' : 'text-[#526B82] hover:text-[#263238]'
            }`}
          >
            AIRCRAFT
          </button>
          <button
            onClick={() => setShowCorridors(!showCorridors)}
            className={`px-2.5 py-0.5 rounded transition-colors ${
              showCorridors ? 'bg-[#EBF2F7] text-[#1E3A5F] border border-[#CFDFEC] font-semibold' : 'text-[#526B82] hover:text-[#263238]'
            }`}
          >
            CORRIDORS
          </button>
          <button
            onClick={() => setShowWeather(!showWeather)}
            className={`px-2.5 py-0.5 rounded transition-colors ${
              showWeather ? 'bg-[#FFF8EB] text-[#B7791F] border border-[#F5E1B5] font-semibold' : 'text-[#526B82] hover:text-[#263238]'
            }`}
          >
            WEATHER
          </button>
          <button
            onClick={() => setShowRestricted(!showRestricted)}
            className={`px-2.5 py-0.5 rounded transition-colors ${
              showRestricted ? 'bg-[#FDF2F2] text-[#B84242] border border-[#F7C8C8] font-semibold' : 'text-[#526B82] hover:text-[#263238]'
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
        style={{ backgroundColor: '#1E2833' }}
      >
        <defs>
          {/* Subtle Grid Pattern */}
          <pattern id="tacGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.8" />
          </pattern>

          {/* Diagonal Hazard Pattern */}
          <pattern id="hazardPattern" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="10" stroke="rgba(184, 66, 66, 0.45)" strokeWidth="2.5" />
          </pattern>

          {/* Weather Cloud Pattern */}
          <pattern id="weatherPattern" width="12" height="12" patternTransform="rotate(25 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="12" stroke="rgba(183, 121, 31, 0.35)" strokeWidth="2" />
          </pattern>
        </defs>

        {/* Background Grid */}
        <rect width="800" height="500" fill="url(#tacGrid)" />

        {/* Range Rings (Center: Base Alpha ~ 180, 260) */}
        <circle cx="200" cy="240" r="100" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="200" cy="240" r="190" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="200" cy="240" r="280" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" strokeDasharray="4 4" />
        <text x="205" y="145" fill="rgba(255, 255, 255, 0.4)" fontSize="9" fontFamily="monospace">50 NM</text>
        <text x="205" y="55" fill="rgba(255, 255, 255, 0.4)" fontSize="9" fontFamily="monospace">100 NM</text>

        {/* SECTORS BOUNDARIES */}
        {/* Sector A: Northern Corridor */}
        <polygon
          points="80,40 460,40 420,200 60,190"
          fill="rgba(82, 107, 130, 0.1)"
          stroke="#526B82"
          strokeWidth="1.2"
          strokeDasharray="6 3"
        />
        <text x="90" y="60" fill="#E2E8F0" fontSize="11" fontWeight="bold" fontFamily="monospace" letterSpacing="0.5">
          SECTOR A [NORTHERN CORRIDORS] • FL150-FL450
        </text>

        {/* Sector B: Central Transit Area */}
        <polygon
          points="420,200 750,140 760,330 360,340"
          fill="rgba(183, 121, 31, 0.08)"
          stroke="#B7791F"
          strokeWidth="1.2"
          strokeDasharray="6 3"
        />
        <text x="540" y="170" fill="#F6AD55" fontSize="11" fontWeight="bold" fontFamily="monospace" letterSpacing="0.5">
          SECTOR B [TRANSIT ZONE]
        </text>

        {/* Sector C: Southern Training Arc */}
        <polygon
          points="60,360 400,360 400,470 60,470"
          fill="rgba(46, 125, 91, 0.08)"
          stroke="#2E7D5B"
          strokeWidth="1.2"
          strokeDasharray="6 3"
        />
        <text x="80" y="385" fill="#68D391" fontSize="11" fontWeight="bold" fontFamily="monospace" letterSpacing="0.5">
          SECTOR C [TRAINING ARC] • SFC-FL250
        </text>

        {/* SAFE FLIGHT CORRIDORS */}
        {showCorridors && (
          <g>
            {/* Corridor Alpha: Base Alpha -> Sector A */}
            <path
              d="M 180,240 Q 230,170 330,160 T 520,120"
              fill="none"
              stroke="#6BA4D9"
              strokeWidth="2"
              strokeDasharray="8 5"
              opacity="0.85"
            />
            <text x="240" y="145" fill="#A5C7E8" fontSize="9" fontFamily="monospace">CORRIDOR ALPHA (FL320)</text>

            {/* Corridor Echo: Weather Bypass Arc */}
            <path
              d="M 180,240 Q 260,80 500,80 T 670,220"
              fill="none"
              stroke="#81A3C4"
              strokeWidth="1.6"
              strokeDasharray="5 5"
              opacity="0.7"
            />
            <text x="360" y="75" fill="#CBD5E1" fontSize="9" fontFamily="monospace">CORRIDOR ECHO [HIGH BYPASS FL380]</text>

            {/* Corridor Bravo: Base Alpha -> Base Bravo */}
            <path
              d="M 180,240 L 660,370"
              fill="none"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <text x="400" y="315" fill="rgba(255, 255, 255, 0.6)" fontSize="9" fontFamily="monospace">CORRIDOR BRAVO (TRANSIT)</text>
          </g>
        )}

        {/* RESTRICTED ZONE ZULU-9 */}
        {showRestricted && (
          <g>
            <polygon
              points="450,220 540,200 560,280 470,300"
              fill="url(#hazardPattern)"
              stroke="#B84242"
              strokeWidth="1.8"
            />
            <circle cx="505" cy="250" r="3" fill="#B84242" />
            <text x="455" y="215" fill="#FEB2B2" fontSize="10" fontWeight="bold" fontFamily="monospace">
              ⚠ RESTRICTED ZONE ZULU-9 (PROHIBITED)
            </text>
          </g>
        )}

        {/* WEATHER CELL DELTA (Convective Thunderstorm Cluster) */}
        {showWeather && (
          <g>
            <ellipse cx="580" cy="240" rx="65" ry="42" fill="url(#weatherPattern)" stroke="#B7791F" strokeWidth="1.5" strokeDasharray="4 3" />
            <circle cx="580" cy="240" r="4" fill="#B7791F" />
            <text x="525" y="235" fill="#FBD38D" fontSize="10" fontWeight="bold" fontFamily="monospace">
              WEATHER CELL DELTA
            </text>
            <text x="525" y="248" fill="#E2E8F0" fontSize="8" fontFamily="monospace">
              FL180-FL380 | CONVECTIVE
            </text>
          </g>
        )}

        {/* BASES */}
        {/* Base Alpha */}
        <g transform="translate(180, 240)">
          <circle cx="0" cy="0" r="12" fill="#24303E" stroke="#526B82" strokeWidth="2" />
          <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
          <rect x="-14" y="-2" width="28" height="4" fill="rgba(255, 255, 255, 0.4)" />
          <text x="-32" y="26" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">
            BASE ALPHA
          </text>
          <text x="-32" y="37" fill="#68D391" fontSize="8" fontFamily="monospace">
            MAIN HUB • RWY 09L/27R
          </text>
        </g>

        {/* Base Bravo */}
        <g transform="translate(660, 370)">
          <circle cx="0" cy="0" r="10" fill="#24303E" stroke="#526B82" strokeWidth="2" />
          <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
          <text x="-36" y="24" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">
            BASE BRAVO
          </text>
          <text x="-36" y="35" fill="#A5C7E8" fontSize="8" fontFamily="monospace">
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
                {/* Aircraft Body with Rotation */}
                <g transform={`rotate(${asset.heading})`}>
                  <polygon
                    points="0,-8 5,5 0,3 -5,5"
                    fill={asset.warning ? '#B7791F' : '#FFFFFF'}
                    stroke="#1E2833"
                    strokeWidth="1.2"
                  />
                </g>

                {/* Telemetry Tag */}
                <rect
                  x="8"
                  y="-12"
                  width="72"
                  height="16"
                  fill="#15202B"
                  stroke={isSelected ? '#2E7D5B' : '#3E4F60'}
                  strokeWidth="1"
                  rx="2"
                />
                <text x="12" y="-1" fill="#FFFFFF" fontSize="8.5" fontWeight="bold" fontFamily="monospace">
                  {asset.id}
                </text>
                <text x="54" y="-1" fill="#A5C7E8" fontSize="7.5" fontFamily="monospace">
                  {asset.fl}
                </text>
              </g>
            );
          })}
      </svg>

      {/* Selected Aircraft Tactical HUD Card Popup */}
      {selectedAsset && (
        <div className="absolute bottom-3 left-3 bg-white border border-[#D5DCE3] p-3 rounded shadow-md max-w-xs z-30 font-mono text-xs text-[#263238]">
          <div className="flex items-center justify-between pb-1.5 border-b border-[#E5EAEF] mb-2">
            <span className="font-bold text-[#1E3A5F] flex items-center gap-1.5">
              <Plane className="w-3.5 h-3.5 text-[#526B82]" />
              {selectedAsset.id} — {selectedAsset.type}
            </span>
            <button
              onClick={() => setSelectedAsset(null)}
              className="text-[#60717D] hover:text-[#263238] px-1"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
            <div><span className="text-[#60717D]">PILOT:</span> <span className="text-[#263238] font-semibold">{selectedAsset.pilot}</span></div>
            <div><span className="text-[#60717D]">ROLE:</span> <span className="text-[#1E3A5F]">{selectedAsset.role}</span></div>
            <div><span className="text-[#60717D]">ALTITUDE:</span> <span className="text-[#2E7D5B] font-bold">{selectedAsset.fl}</span></div>
            <div><span className="text-[#60717D]">SPEED:</span> <span className="text-[#263238]">{selectedAsset.speed}</span></div>
            <div><span className="text-[#60717D]">FUEL:</span> <span className="text-[#263238]">{selectedAsset.fuel}</span></div>
            <div><span className="text-[#60717D]">BASE:</span> <span className="text-[#263238]">{selectedAsset.base}</span></div>
          </div>
          {selectedAsset.warning && (
            <div className="mt-2 p-1.5 rounded bg-[#FFF8EB] border border-[#F5E1B5] text-[#B7791F] text-[10px] flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
              {selectedAsset.warning}
            </div>
          )}
        </div>
      )}

      {/* Bottom Status Ticker inside Map */}
      <div className="bg-[#FAFCFD] border-t border-[#D5DCE3] px-3 py-1.5 flex items-center justify-between text-[10px] font-mono text-[#60717D] z-10">
        <div className="flex items-center space-x-3">
          <span className="text-[#1E3A5F] font-semibold flex items-center gap-1">
            <Radio className="w-3 h-3 text-[#526B82]" />
            RADAR: OPERATIONAL (4.0s SWEEP)
          </span>
          <span>AIRFRAME TRACKS: 7 ACTIVE</span>
          <span>CORRIDORS: 3 NOMINAL</span>
        </div>
        <div className="text-[#8295A5] hidden sm:block">
          GRID: 28°34'N 77°12'E SYNTH-DATUM
        </div>
      </div>
    </div>
  );
}

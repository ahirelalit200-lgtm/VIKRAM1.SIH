// VIKRAM1 — Synthetic Data Store
// 100% Synthetic & Demo Data for SIH 2026 Problem Statement ID: 26250
// Organization: Ministry of Defence | Department: Defence Services Staff College

export const INITIAL_SYSTEM_METRICS = {
  aircraftAvailable: 24,
  aircraftTotal: 32,
  aircraftPercentage: 75,
  missionReadiness: 87,
  missionReadinessDelta: '+4.2% today',
  crewAvailability: 91,
  fuelReadiness: 78,
  activeConstraints: 6,
  recommendations: 4,
  systemStatus: 'OPERATIONAL',
  confidenceScore: 92,
  averageTurnaroundTime: '42 min',
  activeSortiesCount: 8,
};

export const DATA_FUSION_SOURCES = [
  { id: 'src-1', name: 'Telemetry (ADS-B/IFF Synced)', category: 'Aircraft Status', status: 'CONNECTED', latency: '24ms', updateRate: '1.0s', health: 99 },
  { id: 'src-2', name: 'Fleet Maintenance Hub', category: 'Health & Avionics', status: 'CONNECTED', latency: '48ms', updateRate: '5.0s', health: 98 },
  { id: 'src-3', name: 'Crew Rostering & Duty Tracker', category: 'Crew Readiness', status: 'CONNECTED', latency: '35ms', updateRate: '10.0s', health: 100 },
  { id: 'src-4', name: 'Synthetic METAR/Weather Radar', category: 'Environment', status: 'CONNECTED', latency: '110ms', updateRate: '30.0s', health: 95 },
  { id: 'src-5', name: 'Synthetic Airspace Sector Grid', category: 'Airspace Restrictions', status: 'CONNECTED', latency: '18ms', updateRate: '2.0s', health: 100 },
  { id: 'src-6', name: 'Operations HQ Directive Queue', category: 'Mission Priority', status: 'CONNECTED', latency: '62ms', updateRate: '3.0s', health: 97 },
  { id: 'src-7', name: 'Base Logistics & Fuel Reserves', category: 'Turnaround & Munitions', status: 'CONNECTED', latency: '85ms', updateRate: '15.0s', health: 94 },
];

export const SYNTHETIC_AIRCRAFT = [
  { id: 'VKR-101', type: 'Multi-Role Fighter', squadron: '101 Falcon SQN', base: 'Base Alpha', status: 'READY', availability: 100, maintenanceHours: 184, fuelPercent: 94, readiness: '98%', maxRange: '2,400 km', hardpoints: 'Standard Recon' },
  { id: 'VKR-102', type: 'Multi-Role Fighter', squadron: '101 Falcon SQN', base: 'Base Alpha', status: 'READY', availability: 100, maintenanceHours: 142, fuelPercent: 88, readiness: '96%', maxRange: '2,400 km', hardpoints: 'Standard Patrol' },
  { id: 'VKR-103', type: 'Multi-Role Fighter', squadron: '101 Falcon SQN', base: 'Base Alpha', status: 'ASSIGNED', availability: 95, maintenanceHours: 89, fuelPercent: 91, readiness: '94%', maxRange: '2,400 km', hardpoints: 'Quick Response' },
  { id: 'VKR-104', type: 'Multi-Role Fighter', squadron: '101 Falcon SQN', base: 'Base Bravo', status: 'READY', availability: 100, maintenanceHours: 210, fuelPercent: 96, readiness: '99%', maxRange: '2,400 km', hardpoints: 'Standard Patrol' },
  { id: 'VKR-105', type: 'Multi-Role Fighter', squadron: '102 Lightning SQN', base: 'Base Bravo', status: 'MAINTENANCE', availability: 0, maintenanceHours: 4, fuelPercent: 32, readiness: '12%', maxRange: '2,400 km', hardpoints: 'Avionics Calibration' },
  { id: 'VKR-106', type: 'Heavy Tactical Transport', squadron: '204 Mammoth SQN', base: 'Base Alpha', status: 'READY', availability: 100, maintenanceHours: 320, fuelPercent: 82, readiness: '91%', maxRange: '4,800 km', hardpoints: 'Cargo Config-B' },
  { id: 'VKR-107', type: 'Heavy Tactical Transport', squadron: '204 Mammoth SQN', base: 'Base Alpha', status: 'STANDBY', availability: 80, maintenanceHours: 275, fuelPercent: 74, readiness: '85%', maxRange: '4,800 km', hardpoints: 'Cargo Config-A' },
  { id: 'VKR-108', type: 'Advanced Jet Trainer', squadron: '305 Surya SQN', base: 'Base Bravo', status: 'AVAILABLE', availability: 100, maintenanceHours: 160, fuelPercent: 90, readiness: '95%', maxRange: '1,800 km', hardpoints: 'Dual Controls' },
  { id: 'VKR-109', type: 'Advanced Jet Trainer', squadron: '305 Surya SQN', base: 'Base Bravo', status: 'AVAILABLE', availability: 100, maintenanceHours: 140, fuelPercent: 85, readiness: '93%', maxRange: '1,800 km', hardpoints: 'Dual Controls' },
  { id: 'VKR-110', type: 'Airborne Early Warning & Support', squadron: '401 Netra SQN', base: 'Base Alpha', status: 'READY', availability: 100, maintenanceHours: 410, fuelPercent: 98, readiness: '99%', maxRange: '3,600 km', hardpoints: 'Radar Dome Active' },
  { id: 'VKR-111', type: 'Electronic Recon & Support', squadron: '401 Netra SQN', base: 'Base Bravo', status: 'ASSIGNED', availability: 90, maintenanceHours: 95, fuelPercent: 76, readiness: '88%', maxRange: '3,200 km', hardpoints: 'Sensor Pods' },
  { id: 'VKR-112', type: 'Multi-Role Fighter', squadron: '102 Lightning SQN', base: 'Base Alpha', status: 'UNAVAILABLE', availability: 0, maintenanceHours: 0, fuelPercent: 15, readiness: '0%', maxRange: '2,400 km', hardpoints: 'Scheduled Depot Check' },
  { id: 'VKR-113', type: 'Multi-Role Fighter', squadron: '102 Lightning SQN', base: 'Base Bravo', status: 'READY', availability: 100, maintenanceHours: 198, fuelPercent: 92, readiness: '97%', maxRange: '2,400 km', hardpoints: 'Escort Array' },
  { id: 'VKR-114', type: 'Heavy Tactical Transport', squadron: '204 Mammoth SQN', base: 'Base Bravo', status: 'STANDBY', availability: 85, maintenanceHours: 150, fuelPercent: 68, readiness: '84%', maxRange: '4,800 km', hardpoints: 'Palletized Delivery' },
  { id: 'VKR-115', type: 'Airborne Early Warning & Support', squadron: '401 Netra SQN', base: 'Base Alpha', status: 'READY', availability: 100, maintenanceHours: 360, fuelPercent: 95, readiness: '98%', maxRange: '3,600 km', hardpoints: 'Comms Relay Pod' },
  { id: 'VKR-116', type: 'Multi-Role Fighter', squadron: '101 Falcon SQN', base: 'Base Alpha', status: 'AVAILABLE', availability: 100, maintenanceHours: 230, fuelPercent: 89, readiness: '96%', maxRange: '2,400 km', hardpoints: 'Intercept Fit' },
];

export const SYNTHETIC_CREW = [
  { id: 'CRW-01', name: 'Sqn Ldr A. Mehta', role: 'Flight Lead / Pilot', squadron: '101 Falcon', base: 'Base Alpha', availability: 'AVAILABLE', dutyStatus: 'ON-DUTY', restHoursRemaining: 0, flightHoursMonth: 38, medicalClearance: 'CURRENT', readiness: 98 },
  { id: 'CRW-02', name: 'Flt Lt K. Verma', role: 'Wingman / Pilot', squadron: '101 Falcon', base: 'Base Alpha', availability: 'AVAILABLE', dutyStatus: 'ON-DUTY', restHoursRemaining: 0, flightHoursMonth: 42, medicalClearance: 'CURRENT', readiness: 96 },
  { id: 'CRW-03', name: 'Sqn Ldr R. Iyer', role: 'Flight Lead / Pilot', squadron: '101 Falcon', base: 'Base Alpha', availability: 'ASSIGNED', dutyStatus: 'AIRBORNE', restHoursRemaining: 0, flightHoursMonth: 45, medicalClearance: 'CURRENT', readiness: 94 },
  { id: 'CRW-04', name: 'Flt Lt S. Nair', role: 'Tactical Navigator', squadron: '401 Netra', base: 'Base Alpha', availability: 'AVAILABLE', dutyStatus: 'ON-DUTY', restHoursRemaining: 0, flightHoursMonth: 32, medicalClearance: 'CURRENT', readiness: 99 },
  { id: 'CRW-05', name: 'Wing Cdr T. Sen', role: 'Mission Commander', squadron: 'HQ Staff', base: 'Base Alpha', availability: 'AVAILABLE', dutyStatus: 'COMMAND OPS', restHoursRemaining: 0, flightHoursMonth: 28, medicalClearance: 'CURRENT', readiness: 100 },
  { id: 'CRW-06', name: 'Flt Lt P. Roy', role: 'Pilot / Multi-Role', squadron: '102 Lightning', base: 'Base Bravo', availability: 'AVAILABLE', dutyStatus: 'STANDBY', restHoursRemaining: 0, flightHoursMonth: 36, medicalClearance: 'CURRENT', readiness: 95 },
  { id: 'CRW-07', name: 'Sqn Ldr V. Deshmukh', role: 'Flight Lead / Pilot', squadron: '102 Lightning', base: 'Base Bravo', availability: 'RESTING', dutyStatus: 'CREW REST (8h MANDATORY)', restHoursRemaining: 5.5, flightHoursMonth: 54, medicalClearance: 'CURRENT', readiness: 60 },
  { id: 'CRW-08', name: 'Flt Lt M. Gill', role: 'Tactical Officer', squadron: '401 Netra', base: 'Base Bravo', availability: 'ASSIGNED', dutyStatus: 'AIRBORNE', restHoursRemaining: 0, flightHoursMonth: 40, medicalClearance: 'CURRENT', readiness: 92 },
  { id: 'CRW-09', name: 'Sqn Ldr D. Kaul', role: 'Heavy Transport Pilot', squadron: '204 Mammoth', base: 'Base Alpha', availability: 'AVAILABLE', dutyStatus: 'ON-DUTY', restHoursRemaining: 0, flightHoursMonth: 29, medicalClearance: 'CURRENT', readiness: 97 },
  { id: 'CRW-10', name: 'Flt Lt N. Joshi', role: 'Co-Pilot Transport', squadron: '204 Mammoth', base: 'Base Alpha', availability: 'AVAILABLE', dutyStatus: 'ON-DUTY', restHoursRemaining: 0, flightHoursMonth: 31, medicalClearance: 'CURRENT', readiness: 96 },
  { id: 'CRW-11', name: 'Flt Lt H. Chawla', role: 'Instructor Pilot', squadron: '305 Surya', base: 'Base Bravo', availability: 'AVAILABLE', dutyStatus: 'STANDBY', restHoursRemaining: 0, flightHoursMonth: 24, medicalClearance: 'CURRENT', readiness: 94 },
  { id: 'CRW-12', name: 'Fg Offr J. Bannerjee', role: 'Trainee Pilot', squadron: '305 Surya', base: 'Base Bravo', availability: 'AVAILABLE', dutyStatus: 'TRAINING OPS', restHoursRemaining: 0, flightHoursMonth: 18, medicalClearance: 'CURRENT', readiness: 88 },
  { id: 'CRW-13', name: 'Sqn Ldr B. Rathore', role: 'Flight Lead / Pilot', squadron: '101 Falcon', base: 'Base Alpha', availability: 'UNAVAILABLE', dutyStatus: 'MEDICAL REVIEW', restHoursRemaining: 24, flightHoursMonth: 12, medicalClearance: 'PENDING CHECK', readiness: 20 },
  { id: 'CRW-14', name: 'Flt Lt Z. Khan', role: 'Systems Operator', squadron: '401 Netra', base: 'Base Alpha', availability: 'AVAILABLE', dutyStatus: 'ON-DUTY', restHoursRemaining: 0, flightHoursMonth: 34, medicalClearance: 'CURRENT', readiness: 98 },
];

export const SYNTHETIC_AIRSPACE_SECTORS = [
  { id: 'SEC-A', name: 'Sector A (Northern Corridors)', status: 'OPEN', flightLevelRange: 'FL150 - FL450', capacity: '12 / 18 Sorties', activeCorridors: 3, riskLevel: 'LOW' },
  { id: 'SEC-B', name: 'Sector B (Central Transit Area)', status: 'WARNING', flightLevelRange: 'FL100 - FL400', capacity: '14 / 16 Sorties', activeCorridors: 2, riskLevel: 'MODERATE', note: 'Weather cell encroaching FL280-340' },
  { id: 'SEC-C', name: 'Sector C (Southern Training Arc)', status: 'RESTRICTED', flightLevelRange: 'SFC - FL250', capacity: '0 / 8 Sorties', activeCorridors: 0, riskLevel: 'RESTRICTED', note: 'Temporary Airspace Restriction (TFR-04) active until 16:00' },
  { id: 'BASE-ALPHA', name: 'Base Alpha (Main Operational Hub)', status: 'OPEN', runwayAvailability: '100% (Runways 09L/27R)', fuelSupply: 'Adequate (94%)', groundTurnaround: 'Nominal (38 min)' },
  { id: 'BASE-BRAVO', name: 'Base Bravo (Forward Support Base)', status: 'OPEN', runwayAvailability: '100% (Runway 14/32)', fuelSupply: '78%', groundTurnaround: 'Nominal (45 min)' },
  { id: 'ZONE-RESTRICTED', name: 'Restricted Zone Zulu-9', status: 'ACTIVE RESTRICTION', flightLevelRange: 'All Levels', riskLevel: 'PROHIBITED', note: 'Synthetic High Hazard Airspace' },
  { id: 'CELL-DELTA', name: 'Weather Cell Delta', status: 'ACTIVE HAZARD', flightLevelRange: 'FL180 - FL380', riskLevel: 'SEVERE', note: 'Severe Convective Activity / Wind Shear' },
];

export const SYNTHETIC_CONSTRAINTS = [
  { id: 'CON-001', name: 'Weather Hazard in Sector B Transit', category: 'Environmental', status: 'WARNING', severity: 'MEDIUM', impactedSector: 'Sector B', affectedAssets: ['VKR-103', 'VKR-111'], recommendation: 'Reroute via Corridor Echo FL240' },
  { id: 'CON-002', name: 'Airframe 200hr Scheduled Maintenance', category: 'Fleet/Maintenance', status: 'FAIL', severity: 'HIGH', impactedSector: 'Base Bravo', affectedAssets: ['VKR-105'], recommendation: 'Assign backup asset VKR-104' },
  { id: 'CON-003', name: 'Crew Flight Duty Limitation (FDL)', category: 'Crew Readiness', status: 'FAIL', severity: 'HIGH', impactedSector: 'Squadron 102', affectedAssets: ['CRW-07'], recommendation: 'Substitute with CRW-06 (Rest compliant)' },
  { id: 'CON-004', name: 'Temporary Flight Restriction (TFR-04)', category: 'Airspace', status: 'FAIL', severity: 'HIGH', impactedSector: 'Sector C', affectedAssets: ['Training Flights'], recommendation: 'Shift training sortie to Sector A sub-arc' },
  { id: 'CON-005', name: 'Runway Turnaround Buffer Overrun', category: 'Ground Ops', status: 'WARNING', severity: 'LOW', impactedSector: 'Base Alpha', affectedAssets: ['VKR-107'], recommendation: 'Stagger departure slot by +12 mins' },
  { id: 'CON-006', name: 'Fuel Pressure Deviation at Hydrant 3', category: 'Resource/Logistics', status: 'WARNING', severity: 'MEDIUM', impactedSector: 'Base Bravo', affectedAssets: ['Heavy Transports'], recommendation: 'Utilize mobile bowsers for VKR-114' },
];

export const SYNTHETIC_WEATHER = {
  overall: 'ACCEPTABLE',
  visibility: '10+ km (EXCELLENT)',
  wind: '260° at 14 kts (MODERATE)',
  cloudCeiling: 'Overcast at 18,000 ft',
  temperature: '24°C',
  barometricPressure: '1013.2 hPa',
  dewPoint: '14°C',
  turbulence: 'Light to Moderate in Sector B',
  forecastTimeline: [
    { time: '08:00', visibilityKm: 12, windKnots: 10, ceilingFt: 22000, riskIndex: 12 },
    { time: '10:00', visibilityKm: 11, windKnots: 14, ceilingFt: 18000, riskIndex: 18 },
    { time: '12:00', visibilityKm: 9, windKnots: 22, ceilingFt: 14000, riskIndex: 38 },
    { time: '14:00', visibilityKm: 6, windKnots: 31, ceilingFt: 9000, riskIndex: 72 }, // Storm peak
    { time: '16:00', visibilityKm: 8, windKnots: 20, ceilingFt: 12000, riskIndex: 44 },
    { time: '18:00', visibilityKm: 10, windKnots: 12, ceilingFt: 16000, riskIndex: 20 },
  ]
};

export const INITIAL_AUDIT_LOGS = [
  { id: 'AUD-901', timestamp: '10:41:02', actor: 'SYSTEM_FUSION', action: 'Telemetry & Asset Ingestion Synchronized', details: '32 Aircraft, 24 Crew profiles, 7 Data sources updated', status: 'SUCCESS' },
  { id: 'AUD-902', timestamp: '10:41:18', actor: 'VIKRAM1_ENGINE', action: 'Constraint Matrix Evaluated', details: 'Evaluated 48 operational boundaries; 4 warnings, 2 hard blocks flagged', status: 'VERIFIED' },
  { id: 'AUD-903', timestamp: '10:41:31', actor: 'VIKRAM1_ENGINE', action: 'Synthetic Mission Plan Alpha Generated', details: 'Formulated 4-ship flight package with 96% constraint feasibility', status: 'OPTIMAL' },
  { id: 'AUD-904', timestamp: '10:41:45', actor: 'VIKRAM1_ENGINE', action: 'Alternative Frontier Solved (Pareto Analysis)', details: 'Computed Plans A, B, C; Plan A chosen for minimal fuel & risk profile', status: 'SOLVED' },
  { id: 'AUD-905', timestamp: '10:42:02', actor: 'VIKRAM1_ENGINE', action: 'Explainable AI Recommendation Synthesized', details: 'Generated 5 explainability nodes justifying resource allocation', status: 'EXPLAINED' },
  { id: 'AUD-906', timestamp: '10:42:15', actor: 'HUMAN_OPERATOR', action: 'Commander Review Session Initiated', details: 'Session opened by Wing Cdr. R. Sharma (ID: DSSC-OPS-04)', status: 'IN_REVIEW' },
  { id: 'AUD-907', timestamp: '10:42:34', actor: 'COMMANDER_SIGN_OFF', action: 'Plan Alpha Signed & Authorized', details: 'Cryptographic hash generated: 0x8F3C...A291; Tasking dispatches queued', status: 'APPROVED' },
];

export const INITIAL_NOTIFICATIONS = [
  { id: 'notif-1', type: 'INFO', title: 'Fleet Data Synchronized', text: 'Telemetry confirmed for 32 tail numbers across Base Alpha and Base Bravo.', time: '2m ago', read: false },
  { id: 'notif-2', type: 'WARNING', title: 'Synthetic Weather Alert', text: 'Convective cell forming over Sector B. Route adjustment recommended for Corridor-2.', time: '5m ago', read: false },
  { id: 'notif-3', type: 'ALERT', title: 'Maintenance Constraint Triggered', text: 'VKR-105 reached 200hr inspection ceiling. Automatic ground hold enforced.', time: '11m ago', read: true },
  { id: 'notif-4', type: 'AI', title: 'Alternative Plan Formulated', text: 'AI engine generated Plan B with 14% less fuel burn for Scenario Alpha-07.', time: '14m ago', read: true },
];

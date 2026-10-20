// VIKRAM1 — Scenario & Dynamic Replanning Data
// Models multi-plan evaluation, minimal churn analysis, and replanning triggers

export const INITIAL_MISSION_PLAN_A = {
  id: 'PLAN-A',
  name: 'Plan Alpha (Base Feasible Baseline)',
  missionId: 'SCENARIO-ALPHA-07',
  objective: 'Combat Air Patrol & Correlated Reconnaissance',
  status: 'FEASIBLE',
  feasibilityScore: 96,
  confidenceScore: 92,
  resourceEfficiency: '+14%',
  constraintViolations: 0,
  riskIndex: 'LOW',
  assignedAircraft: [
    { id: 'VKR-101', role: 'Lead Fighter (CAP)', base: 'Base Alpha', fuelReady: '94%', pilot: 'CRW-01 (Sqn Ldr A. Mehta)' },
    { id: 'VKR-102', role: 'Wingman (CAP)', base: 'Base Alpha', fuelReady: '88%', pilot: 'CRW-02 (Flt Lt K. Verma)' },
    { id: 'VKR-110', role: 'Airborne Early Warning', base: 'Base Alpha', fuelReady: '98%', pilot: 'CRW-04 (Flt Lt S. Nair)' },
    { id: 'VKR-116', role: 'Air Defense Intercept Reserve', base: 'Base Alpha', fuelReady: '89%', pilot: 'CRW-05 (Wing Cdr T. Sen)' },
  ],
  assignedCrew: ['CRW-01', 'CRW-02', 'CRW-04', 'CRW-05', 'CRW-14', 'CRW-09', 'CRW-10', 'CRW-06'],
  routing: 'Corridor Alpha -> Sector A Northern Edge -> Sector B Buffer -> Base Alpha',
  fuelConsumptionEst: '14,200 kg',
  timeWindow: '10:30 - 13:00 IST',
  reasons: [
    'Optimal aircraft availability and fuel readiness prioritised from Base Alpha.',
    'Satisfies 100% of hard constraints (crew duty hours, maintenance limits, corridor clearances).',
    'Minimizes transit distance through congested transit sectors by utilizing Corridor Alpha.',
    'Alternative plans required 18% additional fuel burn due to detour profiles.',
    'Remains well within defined safety margins for the synthetic operational profile.',
  ],
};

export const REPLANNING_SCENARIOS = {
  WEATHER_CHANGE: {
    key: 'WEATHER_CHANGE',
    title: 'Simulate Severe Weather in Sector B',
    conditionDetected: 'Convective storm cell Delta expanded across Sector B transit corridor (FL220-FL360). Turbulence severe; icing potential detected.',
    violatedConstraint: {
      id: 'CON-001',
      title: 'Sector B Environmental Ceiling Violation',
      severity: 'CRITICAL',
      impact: 'Corridor Alpha transit unusable for low/medium-altitude flight profile.',
    },
    previousPlan: 'Plan A (Direct Corridor Alpha)',
    newPlan: {
      id: 'PLAN-B-WX',
      name: 'Plan Bravo-Adaptive (Weather Bypass Profile)',
      status: 'FEASIBLE (RE-OPTIMISED)',
      feasibilityScore: 94,
      confidenceScore: 91,
      resourceEfficiency: '+9%',
      constraintViolations: 0,
      routing: 'Corridor Echo (FL380 High Arc) -> Sector A -> Base Alpha',
      fuelConsumptionEst: '15,350 kg (+8.1%)',
      timeWindow: '10:45 - 13:15 IST (+15 min delta)',
      churn: {
        churnIndex: '18% (Minimal Churn)',
        changedAircraft: 1, // VKR-116 swapped to higher-ceiling asset VKR-104 from Base Bravo
        unchangedAircraft: 3,
        changedCrew: 1,
        unchangedCrew: 7,
        fuelImpact: '+8.1%',
        details: 'Only 1 aircraft and 1 crew rerouted. 82% of flight and logistics assignments kept intact to prevent operational churn.',
      },
      explanation: 'VIKRAM1 identified high-altitude bypass via Corridor Echo. Kept 3 of 4 original aircraft and 7 of 8 crew members to avoid cascading base logistical disruption.',
    }
  },

  AIRCRAFT_UNAVAILABLE: {
    key: 'AIRCRAFT_UNAVAILABLE',
    title: 'Simulate Aircraft Mechanical Hold',
    conditionDetected: 'Telemetry warning on VKR-101: Hydraulic pressure fluctuation detected during pre-flight spool. Ground abort mandatory.',
    violatedConstraint: {
      id: 'CON-007',
      title: 'Primary Lead Aircraft Technical Disqualification',
      severity: 'HIGH',
      impact: 'Lead CAP aircraft VKR-101 unavailable for departure.',
    },
    previousPlan: 'Plan A (VKR-101 as Flight Lead)',
    newPlan: {
      id: 'PLAN-C-MECH',
      name: 'Plan Charlie-HotSwap (Quick Reaction Substitute)',
      status: 'FEASIBLE (RE-OPTIMISED)',
      feasibilityScore: 95,
      confidenceScore: 93,
      resourceEfficiency: '+12%',
      constraintViolations: 0,
      routing: 'Original Corridor Alpha flight path maintained',
      fuelConsumptionEst: '14,400 kg (+1.4%)',
      timeWindow: '10:35 - 13:00 IST (+5 min slot delay)',
      churn: {
        churnIndex: '12% (Near-Zero Churn)',
        changedAircraft: 1, // VKR-101 replaced by immediate hot-standby VKR-102 & VKR-116
        unchangedAircraft: 3,
        changedCrew: 0, // Crew transferred to hot-spare
        unchangedCrew: 8,
        fuelImpact: '+1.4%',
        details: 'Only VKR-101 substituted with hot-standby airframe VKR-113. Pilot CRW-01 retained without crew re-briefing.',
      },
      explanation: 'VIKRAM1 identified cold-standby airframe with identical avionics configuration at Base Alpha. Assigned hot-swap in under 4 minutes with 0 crew disruption.',
    }
  },

  CREW_UNAVAILABLE: {
    key: 'CREW_UNAVAILABLE',
    title: 'Simulate Crew Duty Exceeded (FDL)',
    conditionDetected: 'Fatigue tracker flagged CRW-01 (Sqn Ldr A. Mehta): Night sortie extension caused mandatory 8-hour rest violation.',
    violatedConstraint: {
      id: 'CON-003',
      title: 'Statutory Crew Flight Duty Limit Breach',
      severity: 'CRITICAL',
      impact: 'Designated Mission Lead CRW-01 cannot legally command flight.',
    },
    previousPlan: 'Plan A (CRW-01 as Lead Pilot)',
    newPlan: {
      id: 'PLAN-D-CREW',
      name: 'Plan Delta-CrewBal (Roster Balanced)',
      status: 'FEASIBLE (RE-OPTIMISED)',
      feasibilityScore: 97,
      confidenceScore: 94,
      resourceEfficiency: '+13.5%',
      constraintViolations: 0,
      routing: 'Corridor Alpha nominal transit',
      fuelConsumptionEst: '14,200 kg (0% change)',
      timeWindow: '10:30 - 13:00 IST (On-time)',
      churn: {
        churnIndex: '8% (Ultra-Low Churn)',
        changedAircraft: 0,
        unchangedAircraft: 4,
        changedCrew: 1, // Only pilot replaced
        unchangedCrew: 7,
        fuelImpact: '0.0%',
        details: 'Airframes 100% unchanged. Only Sqn Ldr Mehta replaced by Sqn Ldr R. Iyer who has 100% currency on type.',
      },
      explanation: 'VIKRAM1 scanned qualified lead pilots with 100% rest compliance. Selected Sqn Ldr Iyer already briefed on Sector A operating procedures, resulting in zero aircraft reallocation.',
    }
  },

  AIRSPACE_RESTRICTION: {
    key: 'AIRSPACE_RESTRICTION',
    title: 'Simulate Airspace Restriction (TFR)',
    conditionDetected: 'Synthetic NOTAM received: Sector A Upper Band (FL280-FL420) placed under Immediate Emergency Exclusion Zone.',
    violatedConstraint: {
      id: 'CON-004',
      title: 'Temporary Flight Restriction Sector A Conflict',
      severity: 'HIGH',
      impact: 'High-altitude intercept patrol corridor blocked.',
    },
    previousPlan: 'Plan A (Sector A FL340 Cap)',
    newPlan: {
      id: 'PLAN-E-AIRSPACE',
      name: 'Plan Echo-LowBand (Altitude Separation Strategy)',
      status: 'FEASIBLE (RE-OPTIMISED)',
      feasibilityScore: 91,
      confidenceScore: 89,
      resourceEfficiency: '+10%',
      constraintViolations: 0,
      routing: 'Sector A Lower Block FL180-FL240 with Base Bravo Support Vector',
      fuelConsumptionEst: '15,100 kg (+6.3%)',
      timeWindow: '10:30 - 13:00 IST',
      churn: {
        churnIndex: '22% (Targeted Churn)',
        changedAircraft: 1,
        unchangedAircraft: 3,
        changedCrew: 1,
        unchangedCrew: 7,
        fuelImpact: '+6.3%',
        details: 'Altitude and waypoint stepped down to FL220. Swapped 1 Support aircraft to Base Bravo tanker for mid-mission endurance.',
      },
      explanation: 'VIKRAM1 replanned flight levels under the exclusion ceiling while activating Base Bravo forward reserve to maintain patrol station time.',
    }
  }
};

export const PARETO_PLANS = [
  {
    id: 'Plan A',
    title: 'Plan A (Recommended Balance)',
    feasibility: 96,
    resourceScore: 94,
    fuelScore: 92,
    stabilityScore: 95,
    riskRating: 'Very Low',
    timeScore: 96,
    isRecommended: true,
    tagline: 'Satisfies all hard constraints with optimal fuel and minimal base disruption.',
  },
  {
    id: 'Plan B',
    title: 'Plan B (Max Asset Utilization)',
    feasibility: 88,
    resourceScore: 98,
    fuelScore: 81,
    stabilityScore: 78,
    riskRating: 'Moderate',
    timeScore: 90,
    isRecommended: false,
    tagline: 'Higher sortie capability but strains turnaround crews at Base Alpha.',
  },
  {
    id: 'Plan C',
    title: 'Plan C (Conservative / Low Risk)',
    feasibility: 92,
    resourceScore: 78,
    fuelScore: 89,
    stabilityScore: 98,
    riskRating: 'Lowest',
    timeScore: 82,
    isRecommended: false,
    tagline: 'Avoids all marginal weather boundaries but burns 18% additional transit fuel.',
  },
  {
    id: 'Plan D',
    title: 'Plan D (Fast Response Profile)',
    feasibility: 79,
    resourceScore: 85,
    fuelScore: 72,
    stabilityScore: 65,
    riskRating: 'High',
    timeScore: 99,
    isRecommended: false,
    tagline: 'Rapid launch within 15 min, but creates maintenance queue backlog.',
  },
];

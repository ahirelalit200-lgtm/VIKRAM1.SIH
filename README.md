# VIKRAM1 — AI-Powered Air Operations Decision Support System

> **Smart India Hackathon 2026**  
> **Problem Statement ID:** 26250  
> **Title:** Air Power – Dynamic Air Operations & Resource Optimisation  
> **Organization:** Ministry of Defence  
> **Department:** Defence Services Staff College (DSSC)  
> **Classification:** Unclassified / 100% Synthetic & Demo Data  

---

## 📌 Executive Summary

**VIKRAM1** is an AI-assisted decision-support system prototype designed for dynamic air operations management and aviation resource optimization under uncertain, rapidly evolving tactical conditions.

Traditional military air operations face the challenge of fragmented data: telemetry, aircraft availability, crew duty cycles, scheduled maintenance, weather radar, and temporary flight restrictions (TFRs) exist across separate silos. VIKRAM1 brings these streams into a **unified in-memory decision-support framework** that:
- Evaluates multi-boundary operational hard constraints in real-time.
- Synthesizes explainable recommendations on the Pareto efficiency frontier.
- Performs **adaptive minimal-churn replanning** when unexpected disruptions occur (convective storms, aircraft mechanical holds, crew duty expirations, or airspace exclusions).
- Preserves **Human-in-the-Loop** authority with digital cryptographic sign-offs and an immutable decision audit trail.

---

## 🚀 Key Modules & Capabilities

1. **Command Dashboard**
   - 6 Tactical KPIs: Fleet Availability (`24/32`, 75%), Mission Readiness (`87%`), Crew Availability (`91%`), Fuel Reserves (`78%`), Active Constraints (`06`), and AI Recommendations (`04`).
   - **Current Operational Picture:** Interactive SVG/Canvas synthetic radar airspace map with Sector A, B, and C, Base Alpha & Bravo, Restricted Zone Zulu-9, Weather Cell Delta, aircraft markers, and telemetry HUD cards.
   - **Multi-Source Data Fusion:** Real-time status for 7 ingestion streams (Telemetry, Fleet, Crew, Weather, Airspace, HQ Directives, Logistics).
   - **Live System Feed:** Filterable, color-coded event stream (`INFO`, `WARNING`, `ALERT`, `AI`).
   - **Decision Pipeline:** 6-stage AI workflow visualizer with measured latencies.

2. **Synthetic Mission Planner**
   - Scenario form configuring *Scenario Alpha-07* (Priority, Aircraft, Crew, Fuel, Time Window).
   - **Hard Constraints Panel:** Real-time satisfiability checking across airworthiness, crew duty limitations (FDL), maintenance windows, and airspace restrictions with `✓ PASS` / `⚠ WARNING` badges.
   - AI recommendation card for `PLAN A` (96% feasibility, +14% resource efficiency, 0 violations, 92% confidence).

3. **Explainable AI Engine ("WHY THIS PLAN?")**
   - 5 transparent decision pillars justifying the selected allocation over alternative options.
   - **Pareto Tradeoff Matrix:** Comparative analysis of candidate plans across feasibility, resource conservation, and operational stability.

4. **Dynamic Retasking & Minimal-Churn Replanning**
   - **Disruption Triggers:** 1-click simulation for *Weather Change*, *Aircraft Mechanical Abort*, *Crew Duty Exceeded (FDL)*, and *Airspace TFR Restriction*.
   - **Automated Lifecycle Animation:** `INITIAL PLAN` → `CONDITION DETECTED` → `CONSTRAINT RECHECK` → `PLAN SUBOPTIMAL` → `VIKRAM1 IS RE-OPTIMISING...` → `NEW RECOMMENDED PLAN`.
   - **Minimal-Churn Visualisation:** Visualizes changed vs. unchanged resources (**82% baseline resources preserved**, only 1 aircraft swapped) avoiding organizational chaos.

5. **Human-in-the-Loop Commander Authorization**
   - Officer directive notes, security clearance validation, and digital authorization certificate with cryptographic hash generation (`SHA256-SYNTH-...`).

6. **Decision Audit Trail & Export**
   - Chronological ledger of all system, AI, and commander actions.
   - 1-click **Export Audit Report** generating an official compliance preview and downloadable JSON report.

7. **Operational Fleet, Crew, Airspace & Weather Monitors**
   - 32 airframes with maintenance hours remaining and fuel gauges.
   - 24 aircrew with Flight Duty Limitation (FDL) compliance and fatigue tracking.
   - Flight level corridor capacities and active constraint dossiers.
   - METAR telemetry and simulated 08:00–18:00 environmental risk forecast chart.
   - Objective function sliders ($\alpha / \beta / \gamma$) tuning solver weights.

8. **Automated 15-Second Evaluation Tour**
   - High-visibility **RUN DEMO SCENARIO** button in the header triggers a guided 13-step demonstration of the full lifecycle with a live progress banner.

---

## 🛠️ Technology Stack

- **Frontend:** React 18, Vite, JavaScript (ESNext)
- **Styling:** Vanilla CSS & Tailwind CSS (Custom Dark Command-Centre / Defence HUD design tokens)
- **Icons:** Lucide React
- **Visualization:** Non-Geographic Synthetic Vector Airspace Map (SVG), Custom HUD Reticles, Radar Sweeps
- **State Management:** React Context API with Service Layer Abstraction

---

## 💻 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm`

### Installation & Run

```bash
# 1. Clone repository
git clone https://github.com/ahirelalit200-lgtm/VIKRAM1.SIH.git

# 2. Enter project directory
cd VIKRAM1.SIH

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 📂 Project Structure

```text
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx                # Top banner with live clock, status badge, demo trigger
│   │   │   ├── Sidebar.jsx               # Left navigation with 10 operational modules
│   │   │   ├── MetricCard.jsx            # Tactical KPI card with military reticles & status colors
│   │   │   ├── TacticalMap.jsx           # Interactive SVG synthetic radar airspace & vector tracks
│   │   │   ├── LiveFeed.jsx              # Color-coded real-time event feed with category filters
│   │   │   ├── DecisionPipeline.jsx      # 6-stage AI decision workflow with node latencies
│   │   │   ├── DataFusionStatus.jsx      # Multi-source ingestion health for all 7 channels
│   │   │   ├── NotificationDropdown.jsx  # Real-time alerts & advisory dismissals
│   │   │   └── DemoTourBanner.jsx        # Floating step indicator for automated 15-sec demo
│   │   ├── modals/
│   │   │   ├── ExplainabilityModal.jsx   # 5 explainable decision pillars & Pareto tradeoff matrix
│   │   │   ├── ApprovalModal.jsx         # Commander digital sign-off with cryptographic hash
│   │   │   └── AuditExportModal.jsx      # Formatted official military compliance export
│   │   └── views/
│   │       ├── LoginView.jsx             # Landing / Login screen with demo credentials
│   │       ├── CommandDashboard.jsx      # Page 1: Primary Command Overview
│   │       ├── MissionPlanner.jsx        # Page 2: Scenario creator & Hard constraints
│   │       ├── FleetAssets.jsx           # Page 3: Airframe telemetry & maintenance
│   │       ├── CrewStatus.jsx            # Page 4: Flight duty limitations & fatigue tracking
│   │       ├── AirspaceConstraints.jsx   # Page 5: Flight levels, corridors, and active TFRs
│   │       ├── WeatherEnvironment.jsx    # Page 6: METAR telemetry & risk timeline forecast
│   │       ├── AIDecisionEngine.jsx      # Page 7: Objective function weights & Pareto candidates
│   │       ├── DynamicScenario.jsx       # Page 8: Retasking triggers & Minimal-Churn engine
│   │       ├── AuditTrail.jsx            # Page 9: Immutable decision ledger & export
│   │       └── SystemSettings.jsx        # Page 10: Solver thresholds & node health diagnostics
│   ├── context/
│   │   └── AppContext.jsx                # Global state, automated tour runner, event handlers
│   ├── data/
│   │   ├── mockData.js                   # 100% synthetic fleet, crew, constraints, weather, audit logs
│   │   └── scenarioData.js               # Adaptive scenarios, minimal churn deltas, Pareto plans
│   ├── services/
│   │   └── decisionEngineService.js      # Mock service layer for API / Decision Engine abstraction
│   ├── App.jsx                           # Root application shell & view router
│   ├── index.css                         # Tactical themes, glowing reticles, radar sweeps
│   └── main.jsx                          # React root with AppProvider
├── index.html                            # Google Fonts Inter, Rajdhani, JetBrains Mono
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🔒 Synthetic Data Notice
*This prototype uses 100% synthetic, non-geographic, demonstrative tactical data. It does not contain or process classified operational information, real-world military locations, or actual weapons data.*

// VIKRAM1 — Main Application Shell & View Orchestrator
import React from 'react';
import { useApp } from './context/AppContext';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import DemoTourBanner from './components/common/DemoTourBanner';
import NotificationDropdown from './components/common/NotificationDropdown';
import ExplainabilityModal from './components/modals/ExplainabilityModal';
import ApprovalModal from './components/modals/ApprovalModal';
import AuditExportModal from './components/modals/AuditExportModal';

// Views
import LoginView from './components/views/LoginView';
import CommandDashboard from './components/views/CommandDashboard';
import MissionPlanner from './components/views/MissionPlanner';
import FleetAssets from './components/views/FleetAssets';
import CrewStatus from './components/views/CrewStatus';
import AirspaceConstraints from './components/views/AirspaceConstraints';
import WeatherEnvironment from './components/views/WeatherEnvironment';
import AIDecisionEngine from './components/views/AIDecisionEngine';
import DynamicScenario from './components/views/DynamicScenario';
import AuditTrail from './components/views/AuditTrail';
import SystemSettings from './components/views/SystemSettings';

export default function App() {
  const { isAuthenticated, currentView } = useApp();

  // If not authenticated, render Login/Landing View
  if (!isAuthenticated) {
    return <LoginView />;
  }

  // View Router
  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <CommandDashboard />;
      case 'planner':
        return <MissionPlanner />;
      case 'fleet':
        return <FleetAssets />;
      case 'crew':
        return <CrewStatus />;
      case 'airspace':
        return <AirspaceConstraints />;
      case 'weather':
        return <WeatherEnvironment />;
      case 'engine':
        return <AIDecisionEngine />;
      case 'scenario':
        return <DynamicScenario />;
      case 'audit':
        return <AuditTrail />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <CommandDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#040812] bg-tactical-grid text-slate-100 flex flex-col font-sans select-none relative">
      {/* Top Header Bar */}
      <Header />

      {/* Main Container: Sidebar + Content */}
      <div className="flex flex-1 relative">
        <Sidebar />

        <main className="flex-1 p-4 lg:p-6 overflow-y-auto max-w-[1600px] w-full mx-auto">
          {renderCurrentView()}
        </main>
      </div>

      {/* Global Modals & Floating Overlays */}
      <NotificationDropdown />
      <ExplainabilityModal />
      <ApprovalModal />
      <AuditExportModal />
      <DemoTourBanner />
    </div>
  );
}

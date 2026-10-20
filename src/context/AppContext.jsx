// VIKRAM1 Global Application State Context
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_SYSTEM_METRICS,
  INITIAL_AUDIT_LOGS,
  INITIAL_NOTIFICATIONS,
} from '../data/mockData';
import { INITIAL_MISSION_PLAN_A, REPLANNING_SCENARIOS } from '../data/scenarioData';
import { DecisionEngineService } from '../services/decisionEngineService';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Authentication & Session
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'Wing Cdr. R. Sharma',
    serviceNumber: 'DSSC-AF-26250',
    role: 'Operations Lead & DSSC Controller',
    clearance: 'LEVEL-4 TACTICAL (SYNTHETIC)',
    base: 'Base Alpha Command HQ',
  });

  // Navigation
  const [currentView, setCurrentView] = useState('dashboard');

  // Operational State
  const [systemMetrics, setSystemMetrics] = useState(INITIAL_SYSTEM_METRICS);
  const [demoMode, setDemoMode] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const [activePlan, setActivePlan] = useState(INITIAL_MISSION_PLAN_A);
  const [planApproved, setPlanApproved] = useState(false);
  const [approvalRecord, setApprovalRecord] = useState(null);

  // Modals & Panels
  const [explainModalOpen, setExplainModalOpen] = useState(false);
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [auditExportModalOpen, setAuditExportModalOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  // Dynamic Replanning State
  const [activeScenarioKey, setActiveScenarioKey] = useState('WEATHER_CHANGE');
  const [scenarioState, setScenarioState] = useState({
    stage: 'IDLE', // 'IDLE', 'CONDITION_DETECTED', 'RECHECKING', 'INVALID_DETECTED', 'REPLANNING', 'RESOLVED'
    scenarioData: null,
  });

  // Logs & Notifications
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // 15-second Automated Demo Scenario Tour
  const [tourRunning, setTourRunning] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  // Clock Ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
      const dateStr = now.toISOString().split('T')[0];
      setCurrentTime(`${dateStr} ${timeStr} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Helper to add audit log
  const addAuditLog = (actor, action, details, status = 'VERIFIED') => {
    const newEntry = {
      id: `AUD-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      actor,
      action,
      details,
      status,
    };
    setAuditLogs((prev) => [newEntry, ...prev]);
  };

  // Helper to add notification
  const addNotification = (type, title, text) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      type,
      title,
      text,
      time: 'Just now',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Commander Approval Action
  const approveCurrentPlan = (officerNotes = 'Approved under standard rules of engagement.') => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    const digitalHash = `SHA256-SYNTH-${Math.random().toString(36).substring(2, 10).toUpperCase()}-APPR`;

    const record = {
      approver: userProfile.name,
      role: userProfile.role,
      serviceNo: userProfile.serviceNumber,
      timestamp,
      hash: digitalHash,
      notes: officerNotes,
      planId: activePlan.id,
      planName: activePlan.name,
    };

    setPlanApproved(true);
    setApprovalRecord(record);
    addAuditLog('COMMANDER_SIGN_OFF', `Plan ${activePlan.id} Officially Approved`, `Digitally authorized by ${userProfile.name} | Hash: ${digitalHash}`, 'APPROVED');
    addNotification('AI', `Plan ${activePlan.id} Approved`, `Dispatches queued for Flight Operations Base Alpha & Bravo.`);
  };

  // Execute Automated Demo Tour (10-20 seconds interactive presentation)
  const runAutomatedDemo = () => {
    if (tourRunning) return;
    setTourRunning(true);
    setTourStep(1);
    setCurrentView('dashboard');
    addAuditLog('DEMO_TOUR', 'Automated 13-Step SIH Evaluation Tour Initiated', 'Walkthrough triggered from header', 'ACTIVE');

    const steps = [
      { step: 1, delay: 1500, action: () => { setCurrentView('dashboard'); } },
      { step: 2, delay: 3000, action: () => { setCurrentView('planner'); } },
      { step: 3, delay: 5000, action: () => {
        addNotification('AI', 'Feasibility Check Complete', 'Evaluated 48 operational boundaries: 100% hard constraints satisfied.');
      } },
      { step: 4, delay: 7500, action: () => { setExplainModalOpen(true); } },
      { step: 5, delay: 10500, action: () => {
        setExplainModalOpen(false);
        setCurrentView('scenario');
      } },
      { step: 6, delay: 12500, action: () => {
        // Trigger condition change in Scenario view
        setScenarioState({ stage: 'CONDITION_DETECTED', scenarioData: REPLANNING_SCENARIOS.WEATHER_CHANGE });
      } },
      { step: 7, delay: 14500, action: () => {
        setScenarioState({ stage: 'REPLANNING', scenarioData: REPLANNING_SCENARIOS.WEATHER_CHANGE });
      } },
      { step: 8, delay: 17000, action: () => {
        setScenarioState({ stage: 'RESOLVED', scenarioData: REPLANNING_SCENARIOS.WEATHER_CHANGE });
        setActivePlan({ ...INITIAL_MISSION_PLAN_A, ...REPLANNING_SCENARIOS.WEATHER_CHANGE.newPlan });
      } },
      { step: 9, delay: 19500, action: () => {
        approveCurrentPlan('Automated Demo: Plan Bravo-Adaptive authorized.');
      } },
      { step: 10, delay: 21500, action: () => {
        setCurrentView('audit');
      } },
      { step: 11, delay: 24000, action: () => {
        setTourRunning(false);
        setTourStep(0);
      } },
    ];

    steps.forEach(({ delay, action, step }) => {
      setTimeout(() => {
        setTourStep(step);
        action();
      }, delay);
    });
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userProfile,
        setUserProfile,
        currentView,
        setCurrentView,
        systemMetrics,
        setSystemMetrics,
        demoMode,
        setDemoMode,
        currentTime,
        activePlan,
        setActivePlan,
        planApproved,
        setPlanApproved,
        approvalRecord,
        approveCurrentPlan,
        explainModalOpen,
        setExplainModalOpen,
        approvalModalOpen,
        setApprovalModalOpen,
        auditExportModalOpen,
        setAuditExportModalOpen,
        notificationOpen,
        setNotificationOpen,
        activeScenarioKey,
        setActiveScenarioKey,
        scenarioState,
        setScenarioState,
        auditLogs,
        setAuditLogs,
        addAuditLog,
        notifications,
        setNotifications,
        addNotification,
        tourRunning,
        setTourRunning,
        tourStep,
        runAutomatedDemo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);

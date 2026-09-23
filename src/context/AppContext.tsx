import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  Challenge,
  Startup,
  StartupMatch,
  EligibilityRecord,
  ExpertEvaluation,
  PilotRecord,
  EvidenceItem,
  IndependentValidation,
  ProcurementReviewRecord,
  ScalePlanItem,
  InnovationProof,
  YouthChallenge,
  YouthContribution,
  NotificationItem,
  AuditLog,
  KPIItem,
} from '../types';
import {
  DEMO_USERS,
  INITIAL_CHALLENGES,
  DEMO_STARTUPS,
  INITIAL_MATCHES,
  INITIAL_ELIGIBILITY,
  INITIAL_EVALUATIONS,
  INITIAL_PILOT,
  INITIAL_EVIDENCES,
  INITIAL_VALIDATION,
  INITIAL_PROCUREMENT_REVIEW,
  INITIAL_SCALE_PLAN,
  INITIAL_INNOVATION_PROOF,
  INITIAL_YOUTH_CHALLENGES,
  INITIAL_YOUTH_CONTRIBUTIONS,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOGS,
} from '../data/mockData';

export interface ToastItem {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export interface DemoStepInfo {
  step: number;
  title: string;
  subtitle: string;
  targetView: string;
  actor: string;
  description: string;
}

export const DEMO_WORKFLOW_STEPS: DemoStepInfo[] = [
  {
    step: 1,
    title: 'Government Operational Problem',
    subtitle: 'Municipal Sanitation Inefficiency',
    targetView: 'challenges',
    actor: 'Government Department Officer',
    description: 'A municipal department experiences inefficient waste collection routes, high diesel burn, and irregular pickups.',
  },
  {
    step: 2,
    title: 'AI Challenge Builder',
    subtitle: 'Structuring Problem into Procurement Spec',
    targetView: 'challenge-builder',
    actor: 'AI Innovation Engine (Gemini 3.8 Flash)',
    description: 'Raw problem text is transformed into 15 structured parameters including objectives, technology, KPIs, constraints, and risk controls.',
  },
  {
    step: 3,
    title: 'AI Startup Discovery & Semantic Matching',
    subtitle: 'Matching Startups & Explaining Why',
    targetView: 'matching',
    actor: 'G-SolveNation Matching Engine',
    description: 'System ranks matching startups based on capability, prior pilots, and DPIIT standing. EcoRoute AI scores 94% match.',
  },
  {
    step: 4,
    title: 'Transparent Eligibility Screening',
    subtitle: 'Statutory Verification & Due Diligence',
    targetView: 'eligibility',
    actor: 'Departmental Verification Officer',
    description: 'Human officer reviews DPIIT certificate, zero-conflict declaration, cybersecurity ISO 27001 standing, and hardware compatibility.',
  },
  {
    step: 5,
    title: 'Human Expert Evaluation',
    subtitle: 'Independent 7-Criteria Academic Scoring',
    targetView: 'evaluation',
    actor: 'Prof. A. Venkatraman (IIT Delhi Evaluator)',
    description: 'Domain experts evaluate technical feasibility, algorithm robustness, and driver usability, awarding composite 8.9/10 score.',
  },
  {
    step: 6,
    title: 'Controlled Pilot Initiation',
    subtitle: 'Pilot Control Center & 90-Day Cohort',
    targetView: 'pilot',
    actor: 'Municipal Solid Waste Management Lead',
    description: 'A controlled 90-day pilot is initiated across 40 municipal compactors with 6 structured milestones and risk tracking.',
  },
  {
    step: 7,
    title: 'KPI Engine & Live Telemetry',
    subtitle: 'Verifiable Outcome Benchmarking',
    targetView: 'kpi',
    actor: 'Automated Telemetry Stream & Field Auditor',
    description: 'Fleet distance drops from 1,000 km to 820 km/day (Target: 850 km/day). Diesel burn reduced by 18.2%. Target achieved.',
  },
  {
    step: 8,
    title: 'Evidence Docket Management',
    subtitle: 'Cryptographic Telemetry & Audit Logs',
    targetView: 'evidence',
    actor: 'Transport Accounts & Field GIS Cell',
    description: 'Immutable daily GPS logs, fuel pump reconciliations, and driver usability reports are uploaded with SHA-256 hashes.',
  },
  {
    step: 9,
    title: 'Independent Multi-Party Validation',
    subtitle: 'Human-in-the-Loop Sign-off Panel',
    targetView: 'validation',
    actor: 'Joint Academic & Government Evaluation Panel',
    description: 'IIT Delhi, Smart Cities Advisory, and Municipal Engineer independently attest Certificate GSN-VAL-2026-MH-001.',
  },
  {
    step: 10,
    title: 'Procurement Pathway Readiness',
    subtitle: 'Ready for Applicable Procurement Review',
    targetView: 'procurement',
    actor: 'Public Procurement Committee',
    description: 'Status codified as "Ready for Applicable Procurement Pathway Review" under GeM Startup Runway & GFR Rule 194.',
  },
  {
    step: 11,
    title: 'Reusable Innovation Proof Record',
    subtitle: 'Permanent Verifiable Pilot Certificate',
    targetView: 'proof',
    actor: 'Central Innovation Mission Registry',
    description: 'Permanent record GSN-PILOT-2026-001 issued for inter-departmental trust without redundant re-piloting.',
  },
  {
    step: 12,
    title: 'Scale & Replication Workflow',
    subtitle: 'City-wide to State & National Expansion',
    targetView: 'scale',
    actor: 'Urban Development Directorate',
    description: 'Proven solution scale plan initiated: expanding from 40 compactors in Central Zone to 420 city-wide and 3,500 regional vehicles.',
  },
];

interface AppContextType {
  // Current user & role
  currentUser: User;
  currentRole: UserRole;
  switchRole: (role: UserRole) => void;

  // Navigation
  currentView: string;
  setCurrentView: (view: string) => void;

  // Challenges
  challenges: Challenge[];
  selectedChallenge: Challenge;
  setSelectedChallenge: (challenge: Challenge) => void;
  createChallenge: (challenge: Challenge) => void;
  updateChallengeStatus: (challengeId: string, status: Challenge['status']) => void;

  // Startups & Matching
  startups: Startup[];
  matches: StartupMatch[];
  selectedMatch: StartupMatch;
  setSelectedMatch: (match: StartupMatch) => void;
  updateMatchStatus: (matchId: string, status: StartupMatch['status']) => void;

  // Eligibility
  eligibility: EligibilityRecord;
  toggleEligibilityItem: (key: string) => void;
  setOverallEligibility: (status: EligibilityRecord['overallStatus']) => void;

  // Evaluations
  evaluations: ExpertEvaluation[];
  addEvaluation: (evalItem: ExpertEvaluation) => void;

  // Pilot & KPIs
  pilot: PilotRecord;
  kpis: KPIItem[];
  advancePilotDay: (days: number) => void;
  toggleSimulatedTelemetry: () => void;
  updateMilestoneStatus: (milestoneId: string, status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING') => void;
  updateKPIValue: (kpiId: string, current: string, status: 'ON_TRACK' | 'TARGET_ACHIEVED' | 'NEEDS_ATTENTION') => void;

  // Evidence
  evidences: EvidenceItem[];
  addEvidence: (evidence: Omit<EvidenceItem, 'id' | 'uploadedAt' | 'sha256Hash'>) => void;

  // Validation
  validation: IndependentValidation;
  toggleValidationCheckpoint: (index: number) => void;
  signValidationCertificate: (validatorIndex: number) => void;

  // Procurement & Scale
  procurementReview: ProcurementReviewRecord;
  scalePlan: ScalePlanItem[];
  innovationProof: InnovationProof;
  executeScaleDecision: (decision: string) => void;

  // Youth Hub
  youthChallenges: YouthChallenge[];
  youthContributions: YouthContribution[];
  submitYouthContribution: (contribution: Omit<YouthContribution, 'id' | 'submittedAt' | 'verifiedBadge'>) => void;

  // System
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  auditLogs: AuditLog[];
  logAction: (action: string, targetEntity: string, details: string) => void;

  // Toasts
  toasts: ToastItem[];
  showToast: (title: string, message: string, type?: ToastItem['type']) => void;
  dismissToast: (id: string) => void;

  // Demo Presentation Tour
  demoModeActive: boolean;
  demoStep: number;
  startDemoMode: () => void;
  stopDemoMode: () => void;
  nextDemoStep: () => void;
  prevDemoStep: () => void;
  jumpToDemoStep: (stepNumber: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('GOVERNMENT');
  const [currentUser, setCurrentUser] = useState<User>(DEMO_USERS.government);
  const [currentView, setCurrentView] = useState<string>('dashboard');

  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge>(INITIAL_CHALLENGES[0]);

  const [startups] = useState<Startup[]>(DEMO_STARTUPS);
  const [matches, setMatches] = useState<StartupMatch[]>(INITIAL_MATCHES);
  const [selectedMatch, setSelectedMatch] = useState<StartupMatch>(INITIAL_MATCHES[0]);

  const [eligibility, setEligibility] = useState<EligibilityRecord>(INITIAL_ELIGIBILITY);
  const [evaluations, setEvaluations] = useState<ExpertEvaluation[]>(INITIAL_EVALUATIONS);

  const [pilot, setPilot] = useState<PilotRecord>(INITIAL_PILOT);
  const [kpis, setKpis] = useState<KPIItem[]>(INITIAL_CHALLENGES[0].suggestedKPIs);
  const [evidences, setEvidences] = useState<EvidenceItem[]>(INITIAL_EVIDENCES);
  const [validation, setValidation] = useState<IndependentValidation>(INITIAL_VALIDATION);
  const [procurementReview, setProcurementReview] = useState<ProcurementReviewRecord>(INITIAL_PROCUREMENT_REVIEW);
  const [scalePlan] = useState<ScalePlanItem[]>(INITIAL_SCALE_PLAN);
  const [innovationProof] = useState<InnovationProof>(INITIAL_INNOVATION_PROOF);

  const [youthChallenges, setYouthChallenges] = useState<YouthChallenge[]>(INITIAL_YOUTH_CHALLENGES);
  const [youthContributions, setYouthContributions] = useState<YouthContribution[]>(INITIAL_YOUTH_CONTRIBUTIONS);

  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Demo Presentation Tour
  const [demoModeActive, setDemoModeActive] = useState<boolean>(false);
  const [demoStep, setDemoStep] = useState<number>(1);

  // Switch role handler
  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    switch (role) {
      case 'GOVERNMENT':
        setCurrentUser(DEMO_USERS.government);
        break;
      case 'STARTUP':
        setCurrentUser(DEMO_USERS.startup);
        break;
      case 'EXPERT':
        setCurrentUser(DEMO_USERS.expert);
        break;
      case 'YOUTH':
        setCurrentUser(DEMO_USERS.youth);
        break;
      case 'ADMIN':
        setCurrentUser(DEMO_USERS.admin);
        break;
    }
    showToast('Role Switched', `Now viewing as ${role} persona (${DEMO_USERS[role.toLowerCase()]?.name || role})`, 'info');
  };

  // Toast handler
  const showToast = (title: string, message: string, type: ToastItem['type'] = 'info') => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Audit log helper
  const logAction = (action: string, targetEntity: string, details: string) => {
    const now = new Date();
    const formattedDate = now.toISOString().replace('T', ' ').substring(0, 19);
    const newLog: AuditLog = {
      id: 'log-' + Math.random().toString(36).substring(2, 9),
      timestamp: formattedDate,
      actor: currentUser.name,
      role: currentRole,
      action,
      targetEntity,
      details,
      ipAddress: '10.14.88.21 (GovNIC Secure)',
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Challenge actions
  const createChallenge = (newCh: Challenge) => {
    setChallenges((prev) => [newCh, ...prev]);
    setSelectedChallenge(newCh);
    logAction('CHALLENGE_CREATED', `Challenge: ${newCh.title}`, `Published under domain ${newCh.domain}`);
    showToast('Challenge Published', `${newCh.title} is now open for AI matching and startup applications.`, 'success');
  };

  const updateChallengeStatus = (challengeId: string, status: Challenge['status']) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === challengeId ? { ...c, status } : c))
    );
    logAction('CHALLENGE_STATUS_UPDATED', `Challenge: ${challengeId}`, `Status changed to ${status}`);
  };

  // Match actions
  const updateMatchStatus = (matchId: string, status: StartupMatch['status']) => {
    setMatches((prev) =>
      prev.map((m) => (m.id === matchId ? { ...m, status } : m))
    );
    const targetMatch = matches.find((m) => m.id === matchId);
    if (targetMatch) {
      logAction('MATCH_STATUS_CHANGED', `Startup: ${targetMatch.startup.name}`, `Application status updated to ${status}`);
      showToast('Startup Status Updated', `${targetMatch.startup.name} marked as ${status}`, 'success');
    }
  };

  // Eligibility actions
  const toggleEligibilityItem = (key: string) => {
    setEligibility((prev) => {
      const updated = prev.items.map((it) => (it.key === key ? { ...it, passed: !it.passed } : it));
      const allPassed = updated.every((it) => it.passed);
      return {
        ...prev,
        items: updated,
        overallStatus: allPassed ? 'ELIGIBLE_FOR_EVALUATION' : 'UNDER_REVIEW',
      };
    });
    logAction('ELIGIBILITY_CHECKLIST_TOGGLED', `Key: ${key}`, `Toggled verification status`);
  };

  const setOverallEligibility = (status: EligibilityRecord['overallStatus']) => {
    setEligibility((prev) => ({
      ...prev,
      overallStatus: status,
      reviewDate: new Date().toISOString(),
    }));
    logAction('ELIGIBILITY_OVERALL_VERDICT', `Startup: EcoRoute AI`, `Verdict: ${status}`);
    showToast('Eligibility Verdict Updated', `Status confirmed as ${status}`, 'success');
  };

  // Evaluation actions
  const addEvaluation = (evalItem: ExpertEvaluation) => {
    setEvaluations((prev) => [evalItem, ...prev]);
    logAction('EXPERT_EVALUATION_ADDED', `Expert: ${evalItem.expertName}`, `Scored ${evalItem.overallScore}/10 - ${evalItem.recommendation}`);
    showToast('Evaluation Submitted', `Expert assessment recorded with overall score ${evalItem.overallScore}/10`, 'success');
  };

  // Pilot & KPIs
  const advancePilotDay = (increment: number) => {
    setPilot((prev) => {
      const nextDay = Math.min(prev.durationDays, Math.max(1, prev.currentDay + increment));
      return {
        ...prev,
        currentDay: nextDay,
      };
    });
  };

  const toggleSimulatedTelemetry = () => {
    setPilot((prev) => {
      const next = !prev.simulatedTelemetryActive;
      showToast('Telemetry Stream', next ? 'Simulated live telemetry streaming enabled' : 'Live stream paused', 'info');
      return { ...prev, simulatedTelemetryActive: next };
    });
  };

  const updateMilestoneStatus = (milestoneId: string, status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING') => {
    setPilot((prev) => ({
      ...prev,
      milestones: prev.milestones.map((m) =>
        m.id === milestoneId ? { ...m, status, completedDate: status === 'COMPLETED' ? new Date().toISOString() : undefined } : m
      ),
    }));
    logAction('PILOT_MILESTONE_UPDATED', `Milestone ID: ${milestoneId}`, `Status changed to ${status}`);
    showToast('Milestone Updated', `Milestone status set to ${status}`, 'success');
  };

  const updateKPIValue = (kpiId: string, current: string, status: 'ON_TRACK' | 'TARGET_ACHIEVED' | 'NEEDS_ATTENTION') => {
    setKpis((prev) =>
      prev.map((k) => (k.id === kpiId ? { ...k, current, status } : k))
    );
    showToast('KPI Updated', `Telemetry metric calibrated: ${current} (${status})`, 'info');
  };

  // Evidence actions
  const addEvidence = (evidence: Omit<EvidenceItem, 'id' | 'uploadedAt' | 'sha256Hash'>) => {
    const randomHash = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const newEv: EvidenceItem = {
      ...evidence,
      id: 'ev-' + Math.random().toString(36).substring(2, 9),
      uploadedAt: new Date().toISOString(),
      sha256Hash: randomHash,
    };
    setEvidences((prev) => [newEv, ...prev]);
    logAction('EVIDENCE_DOCKET_UPLOADED', `File: ${newEv.fileName}`, `Cryptographic SHA-256: ${randomHash.substring(0, 16)}...`);
    showToast('Evidence Docket Logged', `${newEv.title} successfully uploaded and cryptographically hashed.`, 'success');
  };

  // Validation actions
  const toggleValidationCheckpoint = (index: number) => {
    setValidation((prev) => {
      const updatedCheckpoints = [...prev.checkpoints];
      updatedCheckpoints[index].verified = !updatedCheckpoints[index].verified;
      return { ...prev, checkpoints: updatedCheckpoints };
    });
  };

  const signValidationCertificate = (validatorIndex: number) => {
    setValidation((prev) => {
      const updatedValidators = [...prev.validators];
      updatedValidators[validatorIndex].signed = true;
      updatedValidators[validatorIndex].signedAt = new Date().toISOString();
      return { ...prev, validators: updatedValidators };
    });
    logAction('VALIDATION_CERTIFICATE_SIGNED', `Certificate: ${validation.certificateNumber}`, `Signed by validator index ${validatorIndex}`);
    showToast('Validation Attested', 'Digital signature affixed to Validation Certificate GSN-VAL-2026-MH-001', 'success');
  };

  // Scale decision
  const executeScaleDecision = (decision: string) => {
    logAction('SCALE_DECISION_EXECUTED', `Pilot: Smart Waste Route Optimization`, `Decision: ${decision}`);
    showToast('Scale Decision Registered', `Scale pathway "${decision}" confirmed and scheduled for inter-departmental rollout.`, 'success');
  };

  // Youth Hub actions
  const submitYouthContribution = (contribution: Omit<YouthContribution, 'id' | 'submittedAt' | 'verifiedBadge'>) => {
    const newCon: YouthContribution = {
      ...contribution,
      id: 'con-' + Math.random().toString(36).substring(2, 9),
      submittedAt: new Date().toISOString(),
      verifiedBadge: true,
    };
    setYouthContributions((prev) => [newCon, ...prev]);
    setYouthChallenges((prev) =>
      prev.map((yc) => (yc.id === contribution.challengeId ? { ...yc, contributionsCount: yc.contributionsCount + 1 } : yc))
    );
    logAction('YOUTH_CONTRIBUTION_SUBMITTED', `Challenge ID: ${contribution.challengeId}`, `By: ${contribution.developerName}`);
    showToast('Prototype Submitted', `Contribution "${contribution.contributionTitle}" submitted with Verified Innovation Portfolio Badge!`, 'success');
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Demo Presentation Tour Controller
  const startDemoMode = () => {
    setDemoModeActive(true);
    setDemoStep(1);
    setCurrentView(DEMO_WORKFLOW_STEPS[0].targetView);
    showToast('Demo Presentation Mode Active', '12-Step Smart India Hackathon walkthrough initiated.', 'info');
  };

  const stopDemoMode = () => {
    setDemoModeActive(false);
    showToast('Demo Mode Exited', 'Free exploration mode restored.', 'info');
  };

  const jumpToDemoStep = (stepNumber: number) => {
    if (stepNumber < 1 || stepNumber > DEMO_WORKFLOW_STEPS.length) return;
    setDemoStep(stepNumber);
    const target = DEMO_WORKFLOW_STEPS[stepNumber - 1];
    setCurrentView(target.targetView);
    // Auto switch persona to match the actor if beneficial
    if (target.step === 5) {
      switchRole('EXPERT');
    } else if (target.step === 3 && currentRole !== 'GOVERNMENT') {
      switchRole('GOVERNMENT');
    }
  };

  const nextDemoStep = () => {
    if (demoStep < DEMO_WORKFLOW_STEPS.length) {
      jumpToDemoStep(demoStep + 1);
    } else {
      stopDemoMode();
    }
  };

  const prevDemoStep = () => {
    if (demoStep > 1) {
      jumpToDemoStep(demoStep - 1);
    }
  };

  // Simulated live telemetry minor drift when pilot telemetry is active
  useEffect(() => {
    if (!pilot.simulatedTelemetryActive) return;
    const interval = setInterval(() => {
      setKpis((prev) =>
        prev.map((kpi) => {
          if (kpi.id === 'kpi-1') {
            // fleet distance jitter around 818 - 822
            const drift = (Math.random() * 4 - 2).toFixed(1);
            const val = (820 + parseFloat(drift)).toFixed(1);
            return { ...kpi, current: `${val} km/day` };
          }
          if (kpi.id === 'kpi-2') {
            // diesel burn around 261.2 - 262.4
            const drift = (Math.random() * 1.2 - 0.6).toFixed(1);
            const val = (261.8 + parseFloat(drift)).toFixed(1);
            return { ...kpi, current: `${val} L/day` };
          }
          return kpi;
        })
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [pilot.simulatedTelemetryActive]);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        switchRole,
        currentView,
        setCurrentView,
        challenges,
        selectedChallenge,
        setSelectedChallenge,
        createChallenge,
        updateChallengeStatus,
        startups,
        matches,
        selectedMatch,
        setSelectedMatch,
        updateMatchStatus,
        eligibility,
        toggleEligibilityItem,
        setOverallEligibility,
        evaluations,
        addEvaluation,
        pilot,
        kpis,
        advancePilotDay,
        toggleSimulatedTelemetry,
        updateMilestoneStatus,
        updateKPIValue,
        evidences,
        addEvidence,
        validation,
        toggleValidationCheckpoint,
        signValidationCertificate,
        procurementReview,
        scalePlan,
        innovationProof,
        executeScaleDecision,
        youthChallenges,
        youthContributions,
        submitYouthContribution,
        notifications,
        markNotificationRead,
        auditLogs,
        logAction,
        toasts,
        showToast,
        dismissToast,
        demoModeActive,
        demoStep,
        startDemoMode,
        stopDemoMode,
        nextDemoStep,
        prevDemoStep,
        jumpToDemoStep,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

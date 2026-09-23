import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { DemoModeBar } from './components/demo/DemoModeBar';
import { WorkflowStepper } from './components/common/WorkflowStepper';
import { ToastContainer } from './components/common/ToastContainer';

// Views
import { ExecutiveDashboard } from './components/dashboard/ExecutiveDashboard';
import { ChallengeList } from './components/challenge/ChallengeList';
import { AIChallengeBuilder } from './components/challenge/AIChallengeBuilder';
import { MatchingEngine } from './components/matching/MatchingEngine';
import { EligibilityScreening } from './components/evaluation/EligibilityScreening';
import { ExpertEvaluationView } from './components/evaluation/ExpertEvaluationView';
import { PilotControlCenter } from './components/pilot/PilotControlCenter';
import { KPIEngine } from './components/pilot/KPIEngine';
import { EvidenceManager } from './components/evidence/EvidenceManager';
import { ValidationCenter } from './components/validation/ValidationCenter';
import { ProcurementReadiness } from './components/procurement/ProcurementReadiness';
import { ScaleDecisionView } from './components/scale/ScaleDecisionView';
import { InnovationProofCard } from './components/proof/InnovationProofCard';
import { YouthInnovationHub } from './components/youth/YouthInnovationHub';
import { AuditTrailView } from './components/audit/AuditTrailView';
import { ArchitectureView } from './components/system/ArchitectureView';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <ExecutiveDashboard />;
      case 'challenges':
        return <ChallengeList />;
      case 'challenge-builder':
        return <AIChallengeBuilder />;
      case 'matching':
        return <MatchingEngine />;
      case 'eligibility':
        return <EligibilityScreening />;
      case 'evaluation':
        return <ExpertEvaluationView />;
      case 'pilot':
        return <PilotControlCenter />;
      case 'kpi':
        return <KPIEngine />;
      case 'evidence':
        return <EvidenceManager />;
      case 'validation':
        return <ValidationCenter />;
      case 'procurement':
        return <ProcurementReadiness />;
      case 'scale':
        return <ScaleDecisionView />;
      case 'proof':
        return <InnovationProofCard />;
      case 'youth':
        return <YouthInnovationHub />;
      case 'audit':
        return <AuditTrailView />;
      case 'system':
        return <ArchitectureView />;
      default:
        return <ExecutiveDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Global Header */}
      <Header />

      {/* Demo Tour Controller */}
      <DemoModeBar />

      {/* Horizontal 12-Step Lifecycle Stepper */}
      <WorkflowStepper />

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Sidebar */}
        <Sidebar />

        {/* Dynamic Center Stage */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
          {renderView()}
        </main>
      </div>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

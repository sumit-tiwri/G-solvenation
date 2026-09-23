export type UserRole = 'GOVERNMENT' | 'STARTUP' | 'EXPERT' | 'YOUTH' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  departmentOrOrg: string;
  avatarUrl?: string;
}

export type ChallengeStatus = 
  | 'DRAFT' 
  | 'PUBLISHED' 
  | 'MATCHING' 
  | 'EVALUATION' 
  | 'PILOT_ACTIVE' 
  | 'VALIDATED' 
  | 'PROCUREMENT_READY' 
  | 'SCALED';

export interface KPIItem {
  id: string;
  name: string;
  baseline: string;
  target: string;
  unit: string;
  current?: string;
  status?: 'ON_TRACK' | 'TARGET_ACHIEVED' | 'NEEDS_ATTENTION';
  history?: { day: number; value: number }[];
}

export interface EvaluationCriterion {
  id: string;
  criterion: string;
  weight: number;
}

export interface Challenge {
  id: string;
  code: string;
  title: string;
  department: string;
  district: string;
  state: string;
  domain: string;
  problemDescription: string;
  status: ChallengeStatus;
  objectives: string[];
  requiredTechnology: string[];
  expectedOutcomes: string[];
  constraints: string[];
  pilotDuration: string;
  suggestedKPIs: KPIItem[];
  evaluationCriteria: EvaluationCriterion[];
  requiredStartupCapabilities: string[];
  dataRequirements: string[];
  securityConsiderations: string[];
  riskConsiderations: string[];
  createdAt: string;
  deadline: string;
  pilotBudgetEstimated: string;
  matchedStartupsCount: number;
  activePilotId?: string;
}

export interface Startup {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  domain: string;
  technologies: string[];
  dpiitNumber: string;
  location: string;
  stage: 'Seed' | 'Early Growth' | 'Series A' | 'Bootstrapped';
  foundedYear: number;
  pilotReadinessScore: number; // 0 - 100
  previousPilotsCount: number;
  verifiedBadges: string[];
  capabilities: string[];
  certifications: string[];
  contactEmail: string;
  website: string;
}

export interface StartupMatch {
  id: string;
  challengeId: string;
  startupId: string;
  startup: Startup;
  matchScore: number; // percentage
  matchReasons: string[];
  status: 'DISCOVERED' | 'APPLIED' | 'SHORTLISTED' | 'PILOT_SELECTED' | 'REJECTED';
  proposalTitle?: string;
  proposalSummary?: string;
  proposedBudget?: string;
  proposedTimeline?: string;
  matchDate: string;
}

export interface EligibilityCheckItem {
  key: string;
  label: string;
  description: string;
  passed: boolean;
  notes: string;
}

export interface EligibilityRecord {
  id: string;
  challengeId: string;
  startupId: string;
  items: EligibilityCheckItem[];
  overallStatus: 'ELIGIBLE_FOR_EVALUATION' | 'UNDER_REVIEW' | 'INELIGIBLE';
  reviewedBy: string;
  reviewDate: string;
  statutoryDisclaimer: string;
}

export interface ExpertScoreItem {
  criterion: string;
  score: number; // 1 to 10
  maxScore: number;
  notes: string;
}

export interface ExpertEvaluation {
  id: string;
  challengeId: string;
  startupId: string;
  expertId: string;
  expertName: string;
  expertDesignation: string;
  organization: string;
  scores: ExpertScoreItem[];
  overallScore: number; // 10-scale
  qualitativeComments: string;
  recommendation: 'RECOMMENDED_FOR_PILOT' | 'CONDITIONAL_PILOT' | 'NOT_RECOMMENDED';
  evaluationDate: string;
}

export interface PilotMilestone {
  id: string;
  title: string;
  description: string;
  dayStart: number;
  dayEnd: number;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING';
  deliverables: string[];
  completedDate?: string;
}

export interface PilotRisk {
  id: string;
  description: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  mitigation: string;
  status: 'MONITORED' | 'RESOLVED';
}

export interface PilotRecord {
  id: string;
  challengeId: string;
  startupId: string;
  title: string;
  department: string;
  location: string;
  durationDays: number;
  currentDay: number;
  startDate: string;
  expectedEndDate: string;
  status: 'SETUP' | 'ACTIVE_EXECUTION' | 'MID_REVIEW' | 'FINAL_MEASUREMENT' | 'COMPLETED' | 'VALIDATED' | 'SCALED';
  milestones: PilotMilestone[];
  risks: PilotRisk[];
  fieldOfficerInCharge: string;
  simulatedTelemetryActive: boolean;
}

export interface EvidenceItem {
  id: string;
  pilotId: string;
  title: string;
  category: 'GPS_LOGS' | 'FUEL_AUDIT' | 'PERFORMANCE_ANALYSIS' | 'FIELD_INSPECTION' | 'FINAL_REPORT';
  dayNumber: number;
  uploadedAt: string;
  fileName: string;
  fileSize: string;
  sha256Hash: string;
  verifiedByOfficer: string;
  status: 'VERIFIED' | 'UNDER_REVIEW';
  summary: string;
  downloadUrl?: string;
}

export interface IndependentValidation {
  id: string;
  pilotId: string;
  certificateNumber: string;
  validationDate: string;
  status: 'VERIFIED_FOR_PROCUREMENT_REVIEW' | 'IN_PROGRESS' | 'REJECTED';
  validators: {
    name: string;
    designation: string;
    organization: string;
    signed: boolean;
    signedAt: string;
  }[];
  checkpoints: {
    title: string;
    description: string;
    verified: boolean;
  }[];
  verdictSummary: string;
  governanceNote: string;
}

export interface ProcurementReviewRecord {
  id: string;
  pilotId: string;
  status: 'READY_FOR_PATHWAY_REVIEW' | 'PATHWAY_DELIBERATION' | 'EXEMPTION_FRAMEWORK_APPLIED';
  eligiblePathways: {
    pathwayName: string;
    legalBasis: string;
    description: string;
    applicabilityScore: number;
  }[];
  riskAndSecuritySignoff: boolean;
  statutoryNotice: string;
  preparedDate: string;
}

export interface ScalePlanItem {
  phase: string;
  targetDepartment: string;
  district: string;
  state: string;
  vehiclesOrScaleUnits: string;
  estimatedCostSaving: string;
  readiness: 'READY_NOW' | 'PLANNED_Q3' | 'EXPANSION_Q4';
}

export interface InnovationProof {
  id: string;
  proofNumber: string;
  challengeTitle: string;
  problemStatement: string;
  startupName: string;
  dpiitNumber: string;
  departmentName: string;
  pilotDuration: string;
  completionDate: string;
  verifiedKPIs: {
    metric: string;
    baseline: string;
    achieved: string;
    netImpact: string;
  }[];
  keyTechnologies: string[];
  verifiableHash: string;
  qrPayload: string;
  scaleStatus: string;
  issuerAuthority: string;
}

export interface YouthChallenge {
  id: string;
  title: string;
  department: string;
  domain: string;
  description: string;
  skills: string[];
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  stipendOrPrize: string;
  openUntil: string;
  contributionsCount: number;
  status: 'OPEN' | 'IN_REVIEW' | 'AWARDED';
}

export interface YouthContribution {
  id: string;
  challengeId: string;
  developerName: string;
  collegeOrOrg: string;
  githubUrl: string;
  demoUrl: string;
  contributionTitle: string;
  description: string;
  techUsed: string[];
  submittedAt: string;
  verifiedBadge: boolean;
  mentorFeedback: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT';
  read: boolean;
  actionRoute?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  role: UserRole;
  action: string;
  targetEntity: string;
  details: string;
  ipAddress: string;
}

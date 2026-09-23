import { Challenge, Startup, StartupMatch, YouthContribution, EvidenceItem, IndependentValidation } from '../types';
import { INITIAL_CHALLENGES, DEMO_STARTUPS, INITIAL_MATCHES } from '../data/mockData';

export interface GenerateChallengeParams {
  problemStatement: string;
  department?: string;
  domain?: string;
}

export interface GeneratedChallengeResponse {
  title: string;
  department: string;
  domain: string;
  problemDescription: string;
  objectives: string[];
  requiredTechnology: string[];
  expectedOutcomes: string[];
  constraints: string[];
  pilotDuration: string;
  suggestedKPIs: { name: string; baseline: string; target: string; unit: string }[];
  evaluationCriteria: { criterion: string; weight: number }[];
  requiredStartupCapabilities: string[];
  dataRequirements: string[];
  securityConsiderations: string[];
  riskConsiderations: string[];
  isAIGenerated: boolean;
  modelUsed: string;
}

export const apiService = {
  // Check backend server health
  async checkHealth(): Promise<{ status: string; aiEngine: string; database: string }> {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // offline / client-only fallback
    }
    return {
      status: 'ONLINE (Client Engine)',
      aiEngine: 'Deterministic Innovation Engine (Built-in Fallback)',
      database: 'PostgreSQL-Compatible Local Reactive Store',
    };
  },

  // Call Gemini or fallback for Challenge Generation
  async generateChallenge(params: GenerateChallengeParams): Promise<GeneratedChallengeResponse> {
    try {
      const res = await fetch('/api/ai/generate-challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('API call failed, falling back to local deterministic engine:', err);
    }

    // Deterministic fallback matching the problem statement
    const isWasteRoute = params.problemStatement.toLowerCase().includes('waste') || params.problemStatement.toLowerCase().includes('route') || params.problemStatement.toLowerCase().includes('garbage');
    
    if (isWasteRoute) {
      return {
        title: 'Smart Waste Route Optimization & Fleet Decarbonization System',
        department: params.department || 'Municipal Solid Waste Management & Urban Governance',
        domain: params.domain || 'Smart Cities, Urban Logistics & Clean Mobility',
        problemDescription: params.problemStatement,
        objectives: [
          'Reduce redundant municipal garbage collection travel distance by at least 15%',
          'Deploy real-time telematics and dynamic AI route dispatch based on bin fill levels and traffic patterns',
          'Lower municipal vehicle fleet fuel consumption and carbon footprint',
          'Establish automated audit logs for bin clearance verification and on-time collection SLA tracking',
        ],
        requiredTechnology: [
          'Geographic Information Systems (GIS) & Spatial Mapping',
          'Dynamic Heuristic / Genetic Algorithm Route Optimization',
          'IoT Fleet Telematics & GPS Tracker Ingestion',
          'Mobile Driver Application with Regional Language & Offline Guidance',
        ],
        expectedOutcomes: [
          'Demonstrated 15-20% reduction in vehicle distance traveled per day (Baseline: 1,000 km/day -> Target: <=850 km/day)',
          '18% reduction in fleet diesel consumption',
          '>95% on-time waste clearance rate across test municipal wards',
          'Consolidated operational dashboard with verifiable audit trails',
        ],
        constraints: [
          'Must interface with legacy GPS trackers without replacing entire vehicle hardware',
          'Driver mobile interface must support regional languages and low-bandwidth connectivity',
          'Data privacy: Zero citizen surveillance data retention',
        ],
        pilotDuration: '90 Days (Field Deployment & Controlled Telemetry Cohort)',
        suggestedKPIs: [
          { name: 'Average Daily Fleet Distance', baseline: '1,000 km/day', target: '850 km/day', unit: 'km/day' },
          { name: 'Fleet Diesel Consumption', baseline: '320 L/day', target: '262 L/day', unit: 'L/day' },
          { name: 'On-Time Ward Waste Clearance SLA', baseline: '74.2%', target: '95.0%', unit: '%' },
          { name: 'Operational Cost per Ton Collected', baseline: '₹1,450 / ton', target: '₹1,180 / ton', unit: '₹/ton' },
        ],
        evaluationCriteria: [
          { criterion: 'Technical Feasibility & Algorithm Robustness', weight: 25 },
          { criterion: 'Integration with Legacy Municipal GPS Fleet', weight: 20 },
          { criterion: 'Pilot Readiness & Prior Deployment Track Record', weight: 20 },
          { criterion: 'Information Security & Data Sovereignty', weight: 15 },
          { criterion: 'Cost Effectiveness & 3-Year Scale Viability', weight: 20 },
        ],
        requiredStartupCapabilities: [
          'Demonstrated capability in route planning or spatial optimization software',
          'Prior deployment or working prototype with vehicle telematics / GPS APIs',
          'ISO/IEC 27001 or equivalent cybersecurity compliance commitment',
          'DPIIT recognized or eligible startup status under national innovation guidelines',
        ],
        dataRequirements: [
          'Ward boundary shapefiles and transfer station coordinates',
          'Historic 6-month vehicle trip logs and fuel issue receipts',
          'Commercial and residential bin density location maps',
        ],
        securityConsiderations: [
          'End-to-end TLS 1.3 encryption for vehicle telemetry data in transit',
          'Role-based access control (RBAC) separating field drivers, supervisors, and administrative officers',
          'Local data residency on sovereign cloud infrastructure',
        ],
        riskConsiderations: [
          'Field driver resistance or tech adoption lag: Mitigation through peer training and intuitive local-language UI',
          'Intermittent cellular network dead zones: Mitigation via local device offline queueing',
        ],
        isAIGenerated: false,
        modelUsed: 'deterministic-fallback (Local Engine)',
      };
    }

    // Generic structured fallback for other domains
    return {
      title: `AI-Assisted Innovation Initiative: ${params.domain || 'Civic Infrastructure Transformation'}`,
      department: params.department || 'Public Technology & Infrastructure Directorate',
      domain: params.domain || 'Public Sector Digital Modernization',
      problemDescription: params.problemStatement,
      objectives: [
        'Establish automated, data-driven telemetry and decision support for field operations',
        'Quantify operational inefficiencies and implement outcome-based digital controls',
        'Validate startup proprietary algorithm under controlled departmental pilot conditions',
      ],
      requiredTechnology: ['Edge Computing & IoT', 'Predictive AI / ML Models', 'Cloud Telemetry Pipeline', 'Mobile Operations Portal'],
      expectedOutcomes: ['Minimum 20% operational efficiency lift over baseline', 'Verifiable compliance audit logs', 'Zero field service downtime'],
      constraints: ['Integration with legacy government databases without data egress', 'Strict sovereign cloud hosting compliance'],
      pilotDuration: '60 to 90 Days',
      suggestedKPIs: [
        { name: 'Core Operational Metric', baseline: 'Current Baseline', target: '20% Improvement', unit: 'Index' },
        { name: 'Resolution / Processing Turnaround', baseline: '48 Hours', target: '<= 12 Hours', unit: 'Hours' },
      ],
      evaluationCriteria: [
        { criterion: 'Technical Architecture & Algorithmic Soundness', weight: 30 },
        { criterion: 'Security, Privacy & Data Sovereignty', weight: 25 },
        { criterion: 'Prior Pilot Experience & Startup Capability', weight: 25 },
        { criterion: 'Commercial Viability & Scale Cost Profile', weight: 20 },
      ],
      requiredStartupCapabilities: ['DPIIT recognized startup', 'Proprietary IP ownership', 'ISO 27001 or equivalent security compliance'],
      dataRequirements: ['Department operational logs', 'GIS or boundary geometry maps if applicable'],
      securityConsiderations: ['TLS 1.3 encryption', 'Role-based access control', 'Indian data residency'],
      riskConsiderations: ['User adoption curve', 'Sensor hardware battery life'],
      isAIGenerated: false,
      modelUsed: 'deterministic-fallback (Local Engine)',
    };
  },
};

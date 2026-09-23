import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini SDK if API key is present
const geminiApiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (geminiApiKey && geminiApiKey !== 'MY_GEMINI_API_KEY') {
  try {
    aiClient = new GoogleGenAI({ apiKey: geminiApiKey });
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI client, will use deterministic fallback:', err);
  }
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ONLINE',
    service: 'G-SolveNation Core Engine',
    version: '1.0.0-sih26136',
    database: 'PostgreSQL-Compatible In-Memory Layer (Production: Cloud SQL / Spring Data JPA)',
    aiEngine: aiClient ? 'Gemini 3.8 Flash (Active)' : 'Deterministic Innovation Fallback Engine (Active)',
    timestamp: new Date().toISOString(),
  });
});

// AI Challenge Generation Endpoint
app.post('/api/ai/generate-challenge', async (req: Request, res: Response) => {
  const { problemStatement, department, domain } = req.body;

  if (!problemStatement || typeof problemStatement !== 'string') {
    return res.status(400).json({ error: 'problemStatement is required' });
  }

  // Deterministic fallback structure
  const fallbackResult = {
    title: 'Smart Waste Route Optimization & Fuel Efficiency System',
    department: department || 'Municipal Solid Waste Management & Urban Governance',
    domain: domain || 'Smart City & Sustainable Urban Logistics',
    problemDescription: problemStatement.trim(),
    objectives: [
      'Reduce redundant municipal garbage collection travel distance by at least 15%',
      'Deploy real-time telematics and dynamic AI route dispatch based on bin fill levels and traffic patterns',
      'Lower municipal vehicle fleet fuel consumption and carbon footprint',
      'Establish automated audit logs for bin clearance verification and on-time collection SLA tracking'
    ],
    requiredTechnology: [
      'Geographic Information Systems (GIS) & Spatial Mapping',
      'Heuristic / Genetic Algorithm or ML Route Optimization',
      'IoT Fleet Telematics & GPS Tracking Integration',
      'Mobile Driver Application with Offline-Capable Route Guidance'
    ],
    expectedOutcomes: [
      'Demonstrated 15-20% reduction in vehicle distance traveled per day (Baseline: 1,000 km/day -> Target: <=850 km/day)',
      '18% reduction in fleet diesel consumption',
      '>95% on-time waste clearance rate across test municipal wards',
      'Consolidated operational dashboard with verifiable audit trails'
    ],
    constraints: [
      'Must interface with legacy GPS trackers without replacing entire vehicle hardware',
      'Driver mobile interface must support regional languages and low-bandwidth connectivity',
      'Data privacy: Zero citizen surveillance data retention'
    ],
    pilotDuration: '90 Days (Divided into Setup, Data Integration, Live Field Pilot, Mid-term Evaluation, and Final Verification)',
    suggestedKPIs: [
      { name: 'Average Daily Fleet Distance', baseline: '1,000 km/day', target: '850 km/day', unit: 'km/day' },
      { name: 'Fleet Diesel Consumption', baseline: '320 L/day', target: '262 L/day', unit: 'L/day' },
      { name: 'On-Time Ward Waste Clearance', baseline: '74.2%', target: '95.0%', unit: '%' },
      { name: 'Operational Cost per Metric Ton Collected', baseline: '₹1,450 / ton', target: '₹1,180 / ton', unit: 'INR/ton' }
    ],
    evaluationCriteria: [
      { criterion: 'Technical Feasibility & Algorithm Robustness', weight: 25 },
      { criterion: 'Integration with Legacy Municipal GPS Fleet', weight: 20 },
      { criterion: 'Pilot Readiness & Prior Deployment Track Record', weight: 20 },
      { criterion: 'Information Security & Data Sovereignty', weight: 15 },
      { criterion: 'Cost Effectiveness & 3-Year Scale Viability', weight: 20 }
    ],
    requiredStartupCapabilities: [
      'Demonstrated capability in route planning or spatial optimization software',
      'Prior deployment or working prototype with vehicle telematics / GPS APIs',
      'ISO/IEC 27001 or equivalent cybersecurity compliance commitment',
      'DPIIT recognized or eligible startup status under national innovation guidelines'
    ],
    dataRequirements: [
      'Ward boundary shapefiles and transfer station coordinates',
      'Historic 6-month vehicle trip logs and fuel issue receipts',
      'Commercial and residential bin density location maps'
    ],
    securityConsiderations: [
      'End-to-end TLS 1.3 encryption for vehicle telemetry data in transit',
      'Role-based access control (RBAC) separating field drivers, supervisors, and administrative officers',
      'Local data residency on sovereign cloud infrastructure'
    ],
    riskConsiderations: [
      'Field driver resistance or tech adoption lag: Mitigation through peer training and intuitive local-language UI',
      'Intermittent cellular network dead zones: Mitigation via local device offline queueing'
    ],
    isAIGenerated: false,
    modelUsed: 'deterministic-fallback'
  };

  if (!aiClient) {
    return res.json({ ...fallbackResult, isAIGenerated: false, modelUsed: 'deterministic-fallback' });
  }

  try {
    const prompt = `You are the lead Government Innovation Architect for G-SolveNation (SIH26136).
A government department officer has submitted this raw, unstructured operational problem:
"${problemStatement}"
Department: "${department || 'Municipal / Urban Governance'}"
Domain: "${domain || 'Urban Logistics & Public Services'}"

Transform this raw problem into a comprehensive, highly structured Government Innovation Challenge ready for startup discovery and pilot evaluation.
Return ONLY valid JSON matching this schema:
{
  "title": string,
  "department": string,
  "domain": string,
  "problemDescription": string,
  "objectives": string[],
  "requiredTechnology": string[],
  "expectedOutcomes": string[],
  "constraints": string[],
  "pilotDuration": string,
  "suggestedKPIs": [
    { "name": string, "baseline": string, "target": string, "unit": string }
  ],
  "evaluationCriteria": [
    { "criterion": string, "weight": number }
  ],
  "requiredStartupCapabilities": string[],
  "dataRequirements": string[],
  "securityConsiderations": string[],
  "riskConsiderations": string[]
}
Ensure the tone is professional, outcome-driven, and procurement-ready. Avoid generic fluff.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text?.trim();
    if (text) {
      const parsed = JSON.parse(text);
      return res.json({
        ...parsed,
        isAIGenerated: true,
        modelUsed: 'gemini-3.8-flash',
      });
    }
    return res.json(fallbackResult);
  } catch (error) {
    console.error('Error in AI challenge builder, falling back:', error);
    return res.json(fallbackResult);
  }
});

// Setup Vite or static serving
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`G-SolveNation Engine running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

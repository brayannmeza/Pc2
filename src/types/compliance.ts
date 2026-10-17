export type Jurisdiction = 'peru' | 'eu' | 'usa' | 'latam' | 'global';

export type ProductType = 
  | 'saas_web' 
  | 'mobile_app' 
  | 'fintech' 
  | 'healthtech' 
  | 'legaltech' 
  | 'ecommerce' 
  | 'b2b_enterprise' 
  | 'custom_agency';

export type CompanySize = 'micro' | 'small' | 'medium';

export interface AssessmentAnswers {
  companyName: string;
  contactEmail?: string;
  jurisdiction: Jurisdiction;
  companySize: CompanySize;
  productType: ProductType;
  productDescription: string;
  // Architecture & Hosting
  isCloudHosted: boolean;
  cloudProvider: 'aws' | 'azure' | 'gcp' | 'vps' | 'serverless' | 'other';
  hasDatabase: boolean;
  // Data handled
  storesPII: boolean; // Personal Identifiable Information (Names, IDs, emails)
  storesSensitiveData: boolean; // Health, biometric, criminal, union, political
  processesPayments: boolean; // Credit cards, gateways, bank tokens
  allowsFileUploads: boolean; // Documents, images, attachments
  // AI & Automation
  usesAI: boolean; // LLMs, OpenAI, Anthropic, Gemini, DeepSeek, custom models
  usesClientDataForTraining: boolean; // Does it train models on client data?
  makesAutomatedDecisions: boolean; // Scoring, autonomous actions
  // Current security practices
  hasMFA: boolean;
  hasBackups: boolean;
  hasPrivacyPolicy: boolean;
  hasRoleBasedAccess: boolean; // RBAC
  hasEncryptedAtRest: boolean;
}

export type StandardCategory = 'iso' | 'legal_pe' | 'legal_intl' | 'cybersecurity' | 'ai_governance';

export type ComplianceStatus = 'not_started' | 'in_progress' | 'compliant';

export interface CodeSnippet {
  title: string;
  language: 'typescript' | 'javascript' | 'python' | 'sql' | 'json';
  code: string;
  description: string;
  targetFile: string;
}

export interface ComplianceControl {
  id: string;
  code: string;
  name: string;
  description: string;
  technicalEvidence: string;
  status: ComplianceStatus;
  priority: 'critica' | 'alta' | 'media' | 'preventiva';
  codeSnippet?: CodeSnippet;
}

export interface ComplianceStandard {
  id: string;
  code: string; // e.g., "ISO/IEC 27001:2022"
  shortName: string; // e.g., "ISO 27001"
  title: string;
  category: StandardCategory;
  authority: string; // e.g., "Organización Internacional de Normalización (ISO)"
  applicabilityReason: string; // Why this applies to the user's specific answers
  priority: 'obligatorio' | 'altamente_recomendado' | 'recomendado' | 'opcional';
  summary: string;
  keyControls: ComplianceControl[];
  howToApplySteps: string[];
  requiredDocuments: string[];
  codeSnippets: CodeSnippet[];
}

export interface AuditResult {
  companyName: string;
  date: string;
  jurisdictionLabel: string;
  totalStandards: number;
  mandatoryStandards: number;
  recommendedStandards: number;
  estimatedComplianceScore: number;
  standards: ComplianceStandard[];
  summaryNarrative: string;
}

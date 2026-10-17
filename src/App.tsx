import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { DiagnosticWizard } from './components/DiagnosticWizard';
import { ComplianceDashboard } from './components/ComplianceDashboard';
import { AuditReportView } from './components/AuditReportView';
import { CodePlayground } from './components/CodePlayground';
import { HowToApplyModal } from './components/HowToApplyModal';
import type { AssessmentAnswers, AuditResult, ComplianceStandard } from './types/compliance';
import { runComplianceDiagnostic } from './data/diagnosticEngine';
import { ShieldCheck } from 'lucide-react';

const DEFAULT_ANSWERS: AssessmentAnswers = {
  companyName: '',
  contactEmail: '',
  jurisdiction: 'peru',
  companySize: 'micro',
  productType: 'saas_web',
  productDescription: '',
  isCloudHosted: true,
  cloudProvider: 'serverless',
  hasDatabase: true,
  storesPII: true,
  storesSensitiveData: false,
  processesPayments: true,
  allowsFileUploads: true,
  usesAI: false,
  usesClientDataForTraining: false,
  makesAutomatedDecisions: false,
  hasMFA: true,
  hasBackups: true,
  hasPrivacyPolicy: false,
  hasRoleBasedAccess: true,
  hasEncryptedAtRest: true,
};

export function App() {
  const [answers, setAnswers] = useState<AssessmentAnswers>(DEFAULT_ANSWERS);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [activeTab, setActiveTab] = useState<'wizard' | 'dashboard' | 'standards' | 'code' | 'audit'>('wizard');
  const [selectedStandardForGuide, setSelectedStandardForGuide] = useState<ComplianceStandard | null>(null);

  const handleDiagnosticComplete = (newAnswers: AssessmentAnswers) => {
    setAnswers(newAnswers);
    const result = runComplianceDiagnostic(newAnswers);
    setAuditResult(result);
    setActiveTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetToWizard = () => {
    setActiveTab('wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasAuditResult={!!auditResult}
        onReset={handleResetToWizard}
        onOpenAuditModal={() => setActiveTab('audit')}
      />

      {/* Main Page Body */}
      <main className="main-content">
        {/* TAB 1: DIAGNOSTIC WIZARD */}
        {activeTab === 'wizard' && (
          <DiagnosticWizard 
            onComplete={handleDiagnosticComplete}
            initialAnswers={answers}
          />
        )}

        {/* TAB 2: COMPLIANCE DASHBOARD */}
        {activeTab === 'dashboard' && auditResult && (
          <ComplianceDashboard 
            auditResult={auditResult}
            onSelectStandardForGuide={(std) => setSelectedStandardForGuide(std)}
            onOpenAuditModal={() => setActiveTab('audit')}
            onOpenCodePlayground={() => setActiveTab('code')}
          />
        )}

        {/* TAB 3: STANDARDS & LAWS CATALOGUE */}
        {activeTab === 'standards' && auditResult && (
          <ComplianceDashboard 
            auditResult={auditResult}
            onSelectStandardForGuide={(std) => setSelectedStandardForGuide(std)}
            onOpenAuditModal={() => setActiveTab('audit')}
            onOpenCodePlayground={() => setActiveTab('code')}
          />
        )}

        {/* TAB 4: HOW TO APPLY & CODE PLAYGROUND */}
        {activeTab === 'code' && (
          <CodePlayground />
        )}

        {/* TAB 5: OFFICIAL AUDIT STATEMENT */}
        {activeTab === 'audit' && auditResult && (
          <AuditReportView 
            auditResult={auditResult}
            answers={answers}
          />
        )}
      </main>

      {/* Deep-dive Modal: How to Apply Standard */}
      <HowToApplyModal 
        standard={selectedStandardForGuide}
        onClose={() => setSelectedStandardForGuide(null)}
      />

      {/* Institutional Legal Footer */}
      <footer style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        padding: '36px 24px 44px',
        marginTop: 'auto'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <ShieldCheck size={20} color="#2563eb" />
              <span style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>
                NORMATIVA.DEV — Auditoría & Cumplimiento Técnico
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#64748b', maxWidth: '600px' }}>
              Diseñado para pequeñas empresas de desarrollo de software y startups tecnológicas. Integra los estándares ISO/IEC 27001:2022, ISO/IEC 27701:2019, ISO 25010, ISO 42001 (IA), ISO 29110 (VSEs) y el marco legal peruano (Ley 29733, D.S. 003-2013-JUS y Ley 30096).
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <span className="badge badge-slate" style={{ fontSize: '0.75rem' }}>
              ISO 27001 SGSI
            </span>
            <span className="badge badge-slate" style={{ fontSize: '0.75rem' }}>
              Ley 29733 ANPD
            </span>
            <span className="badge badge-slate" style={{ fontSize: '0.75rem' }}>
              ISO 42001 IA
            </span>
            <span className="badge badge-slate" style={{ fontSize: '0.75rem' }}>
              GDPR UE
            </span>
            <span className="badge badge-slate" style={{ fontSize: '0.75rem' }}>
              OWASP 2025
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

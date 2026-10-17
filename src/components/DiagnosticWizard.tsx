import React, { useState } from 'react';
import { 
  Globe2, 
  Users, 
  Layers, 
  Server, 
  Database, 
  ShieldAlert, 
  CreditCard, 
  Bot, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles,
  Zap,
  Scale,
  FileCheck
} from 'lucide-react';
import type { AssessmentAnswers, Jurisdiction, ProductType, CompanySize } from '../types/compliance';

interface DiagnosticWizardProps {
  onComplete: (answers: AssessmentAnswers) => void;
  initialAnswers?: AssessmentAnswers;
}

export const DiagnosticWizard: React.FC<DiagnosticWizardProps> = ({
  onComplete,
  initialAnswers
}) => {
  const [step, setStep] = useState<number>(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState<AssessmentAnswers>(initialAnswers || {
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
    processesPayments: false,
    allowsFileUploads: true,
    usesAI: false,
    usesClientDataForTraining: false,
    makesAutomatedDecisions: false,
    hasMFA: false,
    hasBackups: true,
    hasPrivacyPolicy: false,
    hasRoleBasedAccess: true,
    hasEncryptedAtRest: true,
  });

  // Presets rápidos para 1-clic
  const applyPreset = (presetType: 'saas' | 'fintech' | 'ai' | 'health') => {
    if (presetType === 'saas') {
      setFormData(prev => ({
        ...prev,
        companyName: prev.companyName || 'CloudSaaS Solutions',
        productType: 'saas_web',
        productDescription: 'Plataforma B2B para gestión empresarial en la nube',
        jurisdiction: 'peru',
        companySize: 'small',
        isCloudHosted: true,
        cloudProvider: 'aws',
        hasDatabase: true,
        storesPII: true,
        storesSensitiveData: false,
        processesPayments: true,
        allowsFileUploads: true,
        usesAI: false,
      }));
    } else if (presetType === 'fintech') {
      setFormData(prev => ({
        ...prev,
        companyName: prev.companyName || 'PayFlow Latam',
        productType: 'fintech',
        productDescription: 'Billetera digital y pasarela de cobros recurrentes',
        jurisdiction: 'peru',
        companySize: 'small',
        isCloudHosted: true,
        cloudProvider: 'serverless',
        hasDatabase: true,
        storesPII: true,
        storesSensitiveData: true,
        processesPayments: true,
        allowsFileUploads: true,
        usesAI: false,
      }));
    } else if (presetType === 'ai') {
      setFormData(prev => ({
        ...prev,
        companyName: prev.companyName || 'CognitiveDev Labs',
        productType: 'saas_web',
        productDescription: 'Asistente de inteligencia artificial y automatización documental',
        jurisdiction: 'peru',
        companySize: 'micro',
        isCloudHosted: true,
        cloudProvider: 'serverless',
        hasDatabase: true,
        storesPII: true,
        storesSensitiveData: false,
        processesPayments: false,
        allowsFileUploads: true,
        usesAI: true,
        usesClientDataForTraining: false,
        makesAutomatedDecisions: false,
      }));
    } else if (presetType === 'health') {
      setFormData(prev => ({
        ...prev,
        companyName: prev.companyName || 'MedConnect Digital',
        productType: 'healthtech',
        productDescription: 'App de telemedicina e historias clínicas digitales',
        jurisdiction: 'peru',
        companySize: 'small',
        isCloudHosted: true,
        cloudProvider: 'gcp',
        hasDatabase: true,
        storesPII: true,
        storesSensitiveData: true,
        processesPayments: true,
        allowsFileUploads: true,
        usesAI: true,
      }));
    }
  };

  const handleNext = () => {
    if (step === 1 && !formData.companyName.trim()) {
      alert('Por favor, ingresa el nombre de tu empresa o proyecto de software para personalizar el dictamen.');
      return;
    }
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto' }}>
      {/* Hero Intro Card */}
      <div className="card" style={{ 
        marginBottom: '32px', 
        backgroundColor: '#ffffff',
        border: '1.5px solid #e2e8f0',
        padding: '28px 32px'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-blue">
                <Sparkles size={13} />
                <span>MOTOR DE DIAGNÓSTICO REGULATORIO</span>
              </span>
              <span className="badge badge-slate">
                <span>VERSIÓN 2026.4</span>
              </span>
            </div>
            <h1 style={{ 
              fontSize: '1.75rem', 
              fontWeight: 800, 
              letterSpacing: '-0.025em', 
              color: '#0f172a',
              marginBottom: '8px' 
            }}>
              ¿Qué normativas ISO y leyes debe cumplir tu software?
            </h1>
            <p style={{ color: '#475569', fontSize: '0.975rem', maxWidth: '640px' }}>
              Completa este cuestionario guiado en 2 minutos. Nuestro motor analizará tu arquitectura, datos y tecnología para entregarte el mapa exacto de normas ISO, leyes peruanas e internacionales y el código listo para implementarlas.
            </p>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: '12px',
            padding: '12px 18px',
            minWidth: '130px',
            textAlign: 'center'
          }}>
            <Scale size={24} color="#2563eb" style={{ marginBottom: '4px' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e40af' }}>100% CONFORME</span>
            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Ley 29733 & ISO</span>
          </div>
        </div>

        {/* Carga Rápida de Plantillas / Presets */}
        <div style={{ marginTop: '20px', paddingTop: '18px', borderTop: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '10px' }}>
            O CARGA UNA PLANTILLA PRECONFIGURADA:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <button 
              type="button" 
              onClick={() => applyPreset('saas')}
              className="btn btn-secondary btn-sm"
              style={{ padding: '6px 12px' }}
            >
              <Layers size={14} color="#2563eb" />
              <span>SaaS B2B en la Nube</span>
            </button>
            <button 
              type="button" 
              onClick={() => applyPreset('fintech')}
              className="btn btn-secondary btn-sm"
              style={{ padding: '6px 12px' }}
            >
              <CreditCard size={14} color="#059669" />
              <span>FinTech & Pagos</span>
            </button>
            <button 
              type="button" 
              onClick={() => applyPreset('ai')}
              className="btn btn-secondary btn-sm"
              style={{ padding: '6px 12px' }}
            >
              <Bot size={14} color="#7c3aed" />
              <span>Startup de IA & LLMs</span>
            </button>
            <button 
              type="button" 
              onClick={() => applyPreset('health')}
              className="btn btn-secondary btn-sm"
              style={{ padding: '6px 12px' }}
            >
              <ShieldAlert size={14} color="#dc2626" />
              <span>HealthTech & Salud</span>
            </button>
          </div>
        </div>
      </div>

      {/* Progress Stepper Bar */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: '24px',
        padding: '0 4px'
      }}>
        {[
          { num: 1, label: 'Empresa & Jurisdicción' },
          { num: 2, label: 'Producto & Hosting' },
          { num: 3, label: 'Datos & Privacidad' },
          { num: 4, label: 'IA & Algoritmos' },
          { num: 5, label: 'Seguridad Operativa' },
        ].map((s) => (
          <div 
            key={s.num} 
            onClick={() => s.num < step && setStep(s.num)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              cursor: s.num < step ? 'pointer' : 'default',
              opacity: s.num === step ? 1 : s.num < step ? 0.85 : 0.45
            }}
          >
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: s.num === step ? '#2563eb' : s.num < step ? '#10b981' : '#e2e8f0',
              color: s.num === step || s.num < step ? '#ffffff' : '#64748b',
              fontSize: '0.8rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}>
              {s.num < step ? <CheckCircle2 size={16} /> : s.num}
            </div>
            <span style={{ 
              fontSize: '0.825rem', 
              fontWeight: s.num === step ? 700 : 500,
              color: s.num === step ? '#0f172a' : '#64748b',
              display: 'none',
              ...(window.innerWidth > 640 ? { display: 'inline' } : {})
            }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Main Wizard Form Card */}
      <div className="card" style={{ padding: '32px' }}>
        {/* STEP 1 */}
        {step === 1 && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase' }}>
                Paso 1 de 5
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
                Identificación de la Empresa & Ámbito Territorial
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                Esto permite fijar la legislación de protección de datos personales y las normas de ingeniería aplicables.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px', color: '#1e293b' }}>
                  Nombre de tu Empresa, Startup o Razón Social *
                </label>
                <input 
                  type="text" 
                  placeholder="Ej. Acme Cloud Technologies S.A.C."
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px', color: '#1e293b' }}>
                  Jurisdicción Principal de Operación & Clientes
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                  {[
                    {
                      id: 'peru' as Jurisdiction,
                      title: 'República del Perú',
                      desc: 'Ley 29733, D.S. 003-2013-JUS, Ley 30096 Delitos Informáticos y D.U. 007-2020.',
                    },
                    {
                      id: 'eu' as Jurisdiction,
                      title: 'Unión Europea',
                      desc: 'Reglamento General GDPR (UE 2016/679) y EU Artificial Intelligence Act 2024.',
                    },
                    {
                      id: 'usa' as Jurisdiction,
                      title: 'Estados Unidos / Global',
                      desc: 'Marco NIST, CCPA California, SOC 2 Type II y estándares globales.',
                    },
                    {
                      id: 'latam' as Jurisdiction,
                      title: 'Latinoamérica',
                      desc: 'Red Iberoamericana de Protección de Datos (RIPD) y leyes locales.',
                    },
                  ].map((j) => (
                    <div 
                      key={j.id}
                      onClick={() => setFormData({ ...formData, jurisdiction: j.id })}
                      className={`option-card ${formData.jurisdiction === j.id ? 'selected' : ''}`}
                    >
                      <Globe2 size={20} color={formData.jurisdiction === j.id ? '#2563eb' : '#64748b'} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>{j.title}</div>
                        <div style={{ fontSize: '0.775rem', color: '#64748b', marginTop: '4px' }}>{j.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px', color: '#1e293b' }}>
                  Tamaño del Equipo de Desarrollo de Software
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  {[
                    {
                      id: 'micro' as CompanySize,
                      title: 'Microempresa (1 a 5 personas)',
                      desc: 'Aplica perfil ágil ISO/IEC 29110 para VSEs sin sobrecarga burocrática.',
                    },
                    {
                      id: 'small' as CompanySize,
                      title: 'Pequeña Empresa (6 a 20 personas)',
                      desc: 'Desarrollo en expansión con necesidad de control de versiones y auditorías.',
                    },
                    {
                      id: 'medium' as CompanySize,
                      title: 'Mediana / Scaleup (21 a 50+)',
                      desc: 'Exigencia de ISO 27001 completa, ISO 9001 y comités de seguridad.',
                    },
                  ].map((s) => (
                    <div 
                      key={s.id}
                      onClick={() => setFormData({ ...formData, companySize: s.id })}
                      className={`option-card ${formData.companySize === s.id ? 'selected' : ''}`}
                    >
                      <Users size={20} color={formData.companySize === s.id ? '#2563eb' : '#64748b'} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>{s.title}</div>
                        <div style={{ fontSize: '0.775rem', color: '#64748b', marginTop: '4px' }}>{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase' }}>
                Paso 2 de 5
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
                Tipo de Producto & Arquitectura de Software
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                Define la superficie de exposición y estándares de calidad técnica exigibles (ISO 25010, ISO 27018).
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px', color: '#1e293b' }}>
                  ¿Qué tipo de solución o software comercializas o desarrollas?
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                  {[
                    { id: 'saas_web' as ProductType, label: 'Plataforma SaaS Web / Cloud', desc: 'Software como servicio accesible desde navegador' },
                    { id: 'mobile_app' as ProductType, label: 'App Móvil (iOS / Android)', desc: 'Distribución en App Store / Play Store' },
                    { id: 'fintech' as ProductType, label: 'FinTech / Pagos / Billetera', desc: 'Manejo de dinero, transacciones y cobros' },
                    { id: 'healthtech' as ProductType, label: 'HealthTech / Salud Digital', desc: 'Historias clínicas, telemedicina o recetas' },
                    { id: 'legaltech' as ProductType, label: 'LegalTech / Expedientes', desc: 'Alto secreto profesional y documentos legales' },
                    { id: 'ecommerce' as ProductType, label: 'E-Commerce / Marketplace', desc: 'Catálogo de compras y datos de clientes' },
                    { id: 'b2b_enterprise' as ProductType, label: 'Software B2B Enterprise', desc: 'Integrado a corporaciones o bancos' },
                    { id: 'custom_agency' as ProductType, label: 'Software Factory / Agencia', desc: 'Desarrollo de software a medida para terceros' },
                  ].map((pt) => (
                    <div 
                      key={pt.id}
                      onClick={() => setFormData({ ...formData, productType: pt.id })}
                      className={`option-card ${formData.productType === pt.id ? 'selected' : ''}`}
                    >
                      <Layers size={18} color={formData.productType === pt.id ? '#2563eb' : '#64748b'} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0f172a' }}>{pt.label}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>{pt.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px', color: '#1e293b' }}>
                  ¿Qué modelo de infraestructura y hosting utilizas?
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                  {[
                    { id: 'serverless', label: 'Serverless / Neon / Supabase', icon: Zap },
                    { id: 'aws', label: 'AWS (Amazon Web Services)', icon: Server },
                    { id: 'gcp', label: 'Google Cloud Platform', icon: Server },
                    { id: 'azure', label: 'Microsoft Azure', icon: Server },
                    { id: 'vps', label: 'VPS Propio (DigitalOcean/Linode)', icon: Database },
                  ].map((hp) => {
                    const Icon = hp.icon;
                    return (
                      <div 
                        key={hp.id}
                        onClick={() => setFormData({ ...formData, cloudProvider: hp.id as any })}
                        className={`option-card ${formData.cloudProvider === hp.id ? 'selected' : ''}`}
                        style={{ padding: '12px' }}
                      >
                        <Icon size={18} color={formData.cloudProvider === hp.id ? '#2563eb' : '#64748b'} />
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>{hp.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase' }}>
                Paso 3 de 5
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
                Tratamiento de Datos & Nivel de Privacidad
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                Determina las exigencias de la Ley 29733 (ANPD), ISO 27701 (PIMS) y normativas de pagos (PCI-DSS).
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Question 1 */}
              <div 
                onClick={() => setFormData({ ...formData, storesPII: !formData.storesPII })}
                className={`option-card ${formData.storesPII ? 'selected' : ''}`}
              >
                <input 
                  type="checkbox" 
                  checked={formData.storesPII} 
                  onChange={() => {}} 
                  style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: '#2563eb' }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.925rem', color: '#0f172a' }}>
                    Almacena datos personales identificables (PII) de usuarios
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>
                    Nombres, correos electrónicos, números de DNI/Pasaporte, teléfonos, direcciones o perfiles de clientes.
                    <span style={{ display: 'block', color: '#2563eb', fontWeight: 600, marginTop: '2px' }}>
                      Obliga registro de banco de datos ante el MINJUS e ISO 27701.
                    </span>
                  </div>
                </div>
              </div>

              {/* Question 2 */}
              <div 
                onClick={() => setFormData({ ...formData, storesSensitiveData: !formData.storesSensitiveData })}
                className={`option-card ${formData.storesSensitiveData ? 'selected' : ''}`}
              >
                <input 
                  type="checkbox" 
                  checked={formData.storesSensitiveData} 
                  onChange={() => {}} 
                  style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: '#2563eb' }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.925rem', color: '#0f172a' }}>
                    Trata datos de especial sensibilidad (Salud, Biometría, Finanzas o Legal)
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>
                    Historias médicas, huellas dactilares/facial, ingresos financieros, secretos profesionales o datos de menores.
                    <span style={{ display: 'block', color: '#991b1b', fontWeight: 600, marginTop: '2px' }}>
                      Exige medidas de seguridad de Nivel Alto en D.S. 003-2013-JUS y cifrado obligatorio AES-256.
                    </span>
                  </div>
                </div>
              </div>

              {/* Question 3 */}
              <div 
                onClick={() => setFormData({ ...formData, processesPayments: !formData.processesPayments })}
                className={`option-card ${formData.processesPayments ? 'selected' : ''}`}
              >
                <input 
                  type="checkbox" 
                  checked={formData.processesPayments} 
                  onChange={() => {}} 
                  style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: '#2563eb' }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.925rem', color: '#0f172a' }}>
                    Procesa cobros con tarjeta, suscripciones o pasarelas de pago
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>
                    Integración con Stripe, Culqi, MercadoPago, Niubiz o procesamiento directo de transacciones.
                    <span style={{ display: 'block', color: '#065f46', fontWeight: 600, marginTop: '2px' }}>
                      Activa estándar de seguridad bancaria PCI-DSS v4.0 (prohibición de guardar CVV).
                    </span>
                  </div>
                </div>
              </div>

              {/* Question 4 */}
              <div 
                onClick={() => setFormData({ ...formData, allowsFileUploads: !formData.allowsFileUploads })}
                className={`option-card ${formData.allowsFileUploads ? 'selected' : ''}`}
              >
                <input 
                  type="checkbox" 
                  checked={formData.allowsFileUploads} 
                  onChange={() => {}} 
                  style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: '#2563eb' }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.925rem', color: '#0f172a' }}>
                    Permite a los usuarios cargar archivos, documentos, PDFs o adjuntos
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>
                    Almacenamiento en buckets S3, Cloudflare R2 o storage local con necesidad de URLs prefirmadas.
                    <span style={{ display: 'block', color: '#3730a3', fontWeight: 600, marginTop: '2px' }}>
                      Requiere control de acceso ISO 27018 y prevención de subida de ejecutables maliciosos.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase' }}>
                Paso 4 de 5
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
                Inteligencia Artificial, Modelos & Automatización
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                Evalúa la necesidad de la nueva norma ISO/IEC 42001 (AIMS) y el Reglamento Europeo de IA (EU AI Act).
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Question AI 1 */}
              <div 
                onClick={() => setFormData({ ...formData, usesAI: !formData.usesAI })}
                className={`option-card ${formData.usesAI ? 'selected' : ''}`}
              >
                <input 
                  type="checkbox" 
                  checked={formData.usesAI} 
                  onChange={() => {}} 
                  style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: '#2563eb' }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.925rem', color: '#0f172a' }}>
                    El software integra Inteligencia Artificial o Modelos de Lenguaje (LLMs)
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>
                    Uso de APIs como OpenAI (GPT-4), Anthropic (Claude), Google (Gemini), DeepSeek o modelos locales en HuggingFace.
                    <span style={{ display: 'block', color: '#7c3aed', fontWeight: 600, marginTop: '2px' }}>
                      Activa ISO/IEC 42001:2023 (Sistema de Gestión de IA) y mitigación de alucinaciones.
                    </span>
                  </div>
                </div>
              </div>

              {formData.usesAI && (
                <>
                  {/* Question AI 2 */}
                  <div 
                    onClick={() => setFormData({ ...formData, usesClientDataForTraining: !formData.usesClientDataForTraining })}
                    className={`option-card ${formData.usesClientDataForTraining ? 'selected' : ''}`}
                    style={{ marginLeft: '16px' }}
                  >
                    <input 
                      type="checkbox" 
                      checked={formData.usesClientDataForTraining} 
                      onChange={() => {}} 
                      style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: '#2563eb' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>
                        ¿Reentrenas o ajustas modelos usando los datos confidenciales ingresados por clientes?
                      </div>
                      <div style={{ fontSize: '0.775rem', color: '#64748b', marginTop: '2px' }}>
                        Si es afirmativo, la ley exige consentimiento expreso previo y cláusula de disociación de identidad.
                      </div>
                    </div>
                  </div>

                  {/* Question AI 3 */}
                  <div 
                    onClick={() => setFormData({ ...formData, makesAutomatedDecisions: !formData.makesAutomatedDecisions })}
                    className={`option-card ${formData.makesAutomatedDecisions ? 'selected' : ''}`}
                    style={{ marginLeft: '16px' }}
                  >
                    <input 
                      type="checkbox" 
                      checked={formData.makesAutomatedDecisions} 
                      onChange={() => {}} 
                      style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: '#2563eb' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>
                        ¿La IA toma decisiones automáticas vinculantes (scoring crediticio, selección o bloqueo)?
                      </div>
                      <div style={{ fontSize: '0.775rem', color: '#64748b', marginTop: '2px' }}>
                        Clasificado como sistema de Alto Riesgo en el EU AI Act: exige obligatoriamente supervisión humana (Human-in-the-loop).
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase' }}>
                Paso 5 de 5
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
                Seguridad Operativa Actual (Índice de Madurez)
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                Marca las prácticas que ya tienes activas para calcular tu porcentaje de cumplimiento inicial.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                {
                  key: 'hasRoleBasedAccess' as const,
                  title: 'Control de Acceso Basado en Roles (RBAC)',
                  desc: 'Separación estricta de permisos entre administradores, desarrolladores y clientes en el backend.',
                  icon: Lock,
                },
                {
                  key: 'hasEncryptedAtRest' as const,
                  title: 'Cifrado en Reposo y en Tránsito (AES-256 / TLS 1.3)',
                  desc: 'Tablas de base de datos cifradas y forzado de certificados SSL en todas las comunicaciones.',
                  icon: Lock,
                },
                {
                  key: 'hasBackups' as const,
                  title: 'Copias de Seguridad (Backups) Cifradas y Diarias',
                  desc: 'Snapshots automáticos con prueba de restauración para continuidad del negocio.',
                  icon: Database,
                },
                {
                  key: 'hasMFA' as const,
                  title: 'Autenticación Multifactor (MFA / 2FA)',
                  desc: 'Exigencia de código OTP o llaves para accesos administrativos a la consola o servidores.',
                  icon: ShieldAlert,
                },
                {
                  key: 'hasPrivacyPolicy' as const,
                  title: 'Política de Privacidad y Términos Publicados',
                  desc: 'Documentos legales adaptados a la normativa peruana o internacional con canal de atención ARCO.',
                  icon: FileCheck,
                },
              ].map((item) => {
                const isChecked = formData[item.key];
                const Icon = item.icon;
                return (
                  <div 
                    key={item.key}
                    onClick={() => setFormData({ ...formData, [item.key]: !isChecked })}
                    className={`option-card ${isChecked ? 'selected' : ''}`}
                    style={{ padding: '14px 18px' }}
                  >
                    <input 
                      type="checkbox" 
                      checked={isChecked} 
                      onChange={() => {}} 
                      style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: '#2563eb' }}
                    />
                    <Icon size={18} color={isChecked ? '#2563eb' : '#64748b'} style={{ marginTop: '2px' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>{item.title}</div>
                      <div style={{ fontSize: '0.775rem', color: '#64748b', marginTop: '2px' }}>{item.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Wizard Navigation Footer - RESPETO TOTAL A MÁRGENES DE BOTONES */}
        <div style={{ 
          marginTop: '32px', 
          paddingTop: '24px', 
          borderTop: '1px solid #f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div>
            {step > 1 && (
              <button 
                type="button" 
                onClick={handleBack}
                className="btn btn-outline"
                style={{ padding: '12px 20px' }}
              >
                <ArrowLeft size={16} />
                <span>Paso Anterior</span>
              </button>
            )}
          </div>

          <div>
            <button 
              type="button" 
              onClick={handleNext}
              className="btn btn-primary"
              style={{ 
                padding: '12px 24px', 
                backgroundColor: step === totalSteps ? '#2563eb' : '#0f172a',
                borderColor: step === totalSteps ? '#2563eb' : '#0f172a',
              }}
            >
              {step < totalSteps ? (
                <>
                  <span>Continuar al Paso {step + 1}</span>
                  <ArrowRight size={16} />
                </>
              ) : (
                <>
                  <CheckCircle2 size={18} />
                  <span>Generar Dictamen y Normativas</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

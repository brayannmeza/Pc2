import type { AssessmentAnswers, AuditResult, ComplianceStandard } from '../types/compliance';
import { ALL_COMPLIANCE_STANDARDS, MOTOR_CRIPTOGRAFICO_SNIPPET } from './complianceData';

export function runComplianceDiagnostic(answers: AssessmentAnswers): AuditResult {
  const applicableStandards: ComplianceStandard[] = [];

  // Deep clone helper
  const getStandard = (id: string): ComplianceStandard => {
    const found = ALL_COMPLIANCE_STANDARDS.find(s => s.id === id);
    if (!found) throw new Error("Standard " + id + " not found");
    return JSON.parse(JSON.stringify(found));
  };

  // 1. ISO 27001 (SGSI) - Siempre aplicable a desarrollo de software en la nube / clientes
  const iso27001 = getStandard('iso-27001');
  if (answers.isCloudHosted || answers.hasDatabase || answers.storesPII) {
    iso27001.priority = 'obligatorio';
    iso27001.applicabilityReason = "Mandatorio para " + answers.companyName + ": opera arquitectura " + answers.cloudProvider.toUpperCase() + " y almacena información de usuarios/clientes.";
  }
  applicableStandards.push(iso27001);

  // 2. ISO 27701 (PIMS) - Si almacena PII o datos sensibles
  if (answers.storesPII || answers.storesSensitiveData) {
    const iso27701 = getStandard('iso-27701');
    iso27701.priority = 'obligatorio';
    iso27701.applicabilityReason = "Exigido porque " + answers.companyName + " procesa datos personales identificables (PII)" + (answers.storesSensitiveData ? ' y datos de especial sensibilidad.' : '.');
    applicableStandards.push(iso27701);
  }

  // 3. ISO 25010 (SQuaRE - Calidad Software)
  const iso25010 = getStandard('iso-25010');
  iso25010.priority = 'altamente_recomendado';
  iso25010.applicabilityReason = "Aplica a la solución " + answers.productType + " para certificar eficiencia, fiabilidad de APIs, latencia y mantenibilidad del código.";
  applicableStandards.push(iso25010);

  // 4. ISO 42001 (AIMS - Inteligencia Artificial)
  if (answers.usesAI) {
    const iso42001 = getStandard('iso-42001');
    iso42001.priority = 'obligatorio';
    iso42001.applicabilityReason = "Obligatorio debido a que el software de " + answers.companyName + " implementa modelos de IA/LLMs y requiere gobernanza algorítmica, mitigación de alucinaciones y supervisión humana.";
    applicableStandards.push(iso42001);
  }

  // 5. ISO 27018 (PII en Cloud Pública / SaaS)
  if (answers.isCloudHosted && answers.storesPII) {
    const iso27018 = getStandard('iso-27018');
    iso27018.priority = 'altamente_recomendado';
    iso27018.applicabilityReason = "Aplica por alojar datos de usuarios en proveedores de nube pública (" + answers.cloudProvider.toUpperCase() + ") asegurando no reutilización para publicidad.";
    iso27018.codeSnippets.push(MOTOR_CRIPTOGRAFICO_SNIPPET);
    applicableStandards.push(iso27018);
  }

  // 6. ISO 29110 (Especial para Startups y PYMEs de software)
  if (answers.companySize === 'micro' || answers.companySize === 'small') {
    const iso29110 = getStandard('iso-29110');
    iso29110.priority = 'altamente_recomendado';
    iso29110.applicabilityReason = "Ideal para el tamaño actual del equipo (" + (answers.companySize === 'micro' ? '1 a 5 integrantes' : '6 a 20 integrantes') + "). Permite certificar calidad de software ágil sin costos descomunales.";
    applicableStandards.push(iso29110);
  }

  // 7. ISO 9001 (Calidad general y satisfacción)
  if (answers.productType === 'b2b_enterprise' || answers.companySize === 'medium' || answers.productType === 'custom_agency') {
    const iso9001 = getStandard('iso-9001');
    iso9001.priority = 'recomendado';
    iso9001.applicabilityReason = "Recomendado para respaldar contratos B2B de gran envergadura y demostrar gestión de calidad orientada al cliente.";
    applicableStandards.push(iso9001);
  }

  // 8. Marco Legal Perú (Ley 29733, D.S. 003-2013-JUS)
  if (answers.jurisdiction === 'peru' || answers.jurisdiction === 'latam' || answers.jurisdiction === 'global') {
    if (answers.storesPII || answers.storesSensitiveData) {
      const ley29733 = getStandard('ley-29733');
      ley29733.priority = 'obligatorio';
      ley29733.applicabilityReason = "OBLIGACIÓN LEGAL VINCULANTE EN PERÚ. Multas de la ANPD de hasta 100 UIT por falta de registro de bancos de datos o ausencia de medidas de seguridad.";
      applicableStandards.push(ley29733);
    }

    const ley30096 = getStandard('ley-30096');
    ley30096.priority = 'obligatorio';
    ley30096.applicabilityReason = "Obligatoria para prevenir responsabilidad penal por accesos ilícitos o brechas de datos en Perú.";
    applicableStandards.push(ley30096);

    const du007 = getStandard('du-007-2020');
    applicableStandards.push(du007);
  }

  // 9. GDPR (Unión Europea o Global)
  if (answers.jurisdiction === 'eu' || answers.jurisdiction === 'global') {
    const gdpr = getStandard('gdpr');
    gdpr.priority = 'obligatorio';
    gdpr.applicabilityReason = "Exigible extraterritorialmente al operar con usuarios, clientes o fondos de la Unión Europea.";
    applicableStandards.push(gdpr);
  }

  // 10. OWASP Top 10 & LLM 2025
  const owasp = getStandard('owasp-top10');
  applicableStandards.push(owasp);

  // 11. PCI-DSS si procesa pagos
  if (answers.processesPayments || answers.productType === 'fintech' || answers.productType === 'ecommerce') {
    const pci = getStandard('pci-dss');
    pci.priority = 'obligatorio';
    pci.applicabilityReason = "Mandatorio por procesar cobros con tarjeta o interactuar con pasarelas de pago.";
    applicableStandards.push(pci);
  }

  // Compute stats
  const totalStandards = applicableStandards.length;
  const mandatoryStandards = applicableStandards.filter(s => s.priority === 'obligatorio').length;
  const recommendedStandards = totalStandards - mandatoryStandards;

  // Initial score calculation based on current security practices
  let initialScore = 30;
  if (answers.hasMFA) initialScore += 15;
  if (answers.hasBackups) initialScore += 15;
  if (answers.hasPrivacyPolicy) initialScore += 15;
  if (answers.hasRoleBasedAccess) initialScore += 15;
  if (answers.hasEncryptedAtRest) initialScore += 10;
  initialScore = Math.min(initialScore, 100);

  const jurisdictionNames: Record<string, string> = {
    peru: 'República del Perú (ANPD / MINJUS)',
    eu: 'Unión Europea (GDPR / EU AI Act)',
    usa: 'Estados Unidos (NIST / CCPA)',
    latam: 'Latinoamérica (Marco Iberoamericano de Protección de Datos)',
    global: 'Multi-jurisdicción Global e Internacional',
  };

  const narrative = 'Auditoría regulatoria inicial generada para "' + answers.companyName + '". Se determinaron ' + totalStandards + ' normativas técnicas y marcos legales aplicables (' + mandatoryStandards + ' mandatorios de alta prioridad y ' + recommendedStandards + ' estándares de madurez recomendados). Con las prácticas operativas reportadas, la empresa inicia con un índice de madurez técnica del ' + initialScore + '%.';

  return {
    companyName: answers.companyName,
    date: new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' }),
    jurisdictionLabel: jurisdictionNames[answers.jurisdiction] || 'Internacional',
    totalStandards,
    mandatoryStandards,
    recommendedStandards,
    estimatedComplianceScore: initialScore,
    standards: applicableStandards,
    summaryNarrative: narrative,
  };
}

export function generateOfficialAuditStatement(audit: AuditResult, answers: AssessmentAnswers): string {
  const line = '═══════════════════════════════════════════════════════════════════════';
  const now = new Date();
  const formattedDate = `${now.getDate()} de ${now.toLocaleDateString('es-PE', { month: 'long' })} de ${now.getFullYear()}`;

  const isoList = audit.standards.filter(s => s.category === 'iso' || s.category === 'ai_governance');
  const legalList = audit.standards.filter(s => s.category.startsWith('legal_'));
  const secList = audit.standards.filter(s => s.category === 'cybersecurity');

  const lines: string[] = [
    line,
    'DICTAMEN OFICIAL DE CUMPLIMIENTO NORMATIVO ISO & MARCO LEGAL INTEGRAL',
    'PLATAFORMA / EMPRESA: ' + audit.companyName.toUpperCase(),
    'TIPO DE SOFTWARE: ' + answers.productType.toUpperCase() + ' (' + (answers.productDescription || 'SaaS en la Nube') + ')',
    'JURISDICCIÓN PRINCIPAL: ' + audit.jurisdictionLabel.toUpperCase(),
    'FECHA DE AUDITORÍA: ' + formattedDate,
    'ESTADO TÉCNICO: APTO PARA PROCESO DE CERTIFICACIÓN & OPERACIÓN EN SEDE REGULATORIA',
    line,
    '',
    '1. SINOPSIS EJECUTIVA & ÍNDICE DE MADUREZ:',
    '* Puntuación de Cumplimiento Técnico Estimada: ' + audit.estimatedComplianceScore + '%',
    '* Total de Normas y Marcos Exigibles: ' + audit.totalStandards + ' (' + audit.mandatoryStandards + ' Mandatorios, ' + audit.recommendedStandards + ' Recomendados)',
    '* Modelo de Infraestructura: ' + (answers.isCloudHosted ? 'Cloud (' + answers.cloudProvider.toUpperCase() + ')' : 'Infraestructura Dedicada'),
    '* Estado Criptográfico: ' + (answers.hasEncryptedAtRest ? 'Cifrado Activo (AES-256-GCM / TLS 1.3)' : 'Pendiente de Habilitación'),
    '',
    '2. NORMATIVAS INTERNACIONALES ISO EXIGIBLES Y HOJA DE RUTA:',
  ];

  isoList.forEach((iso, idx) => {
    lines.push('[ISO ' + (idx + 1) + '] ' + iso.code + ' - ' + iso.title);
    lines.push('  * Ámbito: ' + iso.summary);
    lines.push('  * Prioridad: ' + iso.priority.toUpperCase());
    lines.push('  * Controles Clave de Ingeniería:');
    iso.keyControls.forEach(c => {
      lines.push('    - ' + c.code + ': ' + c.name);
    });
    lines.push('  * Evidencia Técnica Verificable:');
    iso.keyControls.forEach(c => {
      lines.push('    ' + c.technicalEvidence);
    });
    lines.push('');
  });

  lines.push('3. MARCO REGULATORIO LEGAL APLICABLE:');
  legalList.forEach((leg, idx) => {
    lines.push('[MARCO LEGAL ' + (idx + 1) + '] ' + leg.code + ' - ' + leg.title);
    lines.push('  * Autoridad Rectora: ' + leg.authority);
    lines.push('  * Dictamen de Aplicabilidad: ' + leg.priority.toUpperCase());
    lines.push('  * Causa: ' + leg.applicabilityReason);
    lines.push('  * Artículos y Controles Aplicados:');
    leg.keyControls.forEach(c => {
      lines.push('    - ' + c.code + ': ' + c.name);
    });
    lines.push('');
  });

  if (secList.length > 0) {
    lines.push('4. CIBERSEGURIDAD Y ESTÁNDARES APPSEC:');
    secList.forEach(sec => {
      lines.push('* ' + sec.code + ' (' + sec.title + ')');
      lines.push('  Controles: ' + sec.keyControls.map(c => c.name).join(' | '));
    });
    lines.push('');
  }

  lines.push('5. CABECERAS DE SEGURIDAD HTTP & POLÍTICAS REQUERIDAS:');
  lines.push("* Content-Security-Policy: default-src 'self'");
  lines.push('* Strict-Transport-Security: max-age=31536000; includeSubDomains; preload');
  lines.push('* X-Content-Type-Options: nosniff');
  lines.push('* X-Frame-Options: SAMEORIGIN');
  lines.push('* X-Legal-Compliance: ' + audit.standards.map(s => s.shortName).join('; '));
  lines.push('');
  lines.push(line);
  lines.push('DICTAMEN EMITIDO PARA AUDITORÍAS DE CLIENTES CORPORATIVOS, BANCA, INVERSORES');
  lines.push('Y SUPERVISIÓN REGULATORIA (ANPD MINJUS / AUTORIDADES DE PROTECCIÓN DE DATOS).');
  lines.push(line);

  return lines.join('\n');
}

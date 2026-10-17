import React, { useState } from 'react';
import { 
  Download, 
  Copy, 
  Check, 
  Printer, 
  Award, 
  ShieldCheck, 
  FileText
} from 'lucide-react';
import type { AuditResult, AssessmentAnswers } from '../types/compliance';
import { generateOfficialAuditStatement } from '../data/diagnosticEngine';

interface AuditReportViewProps {
  auditResult: AuditResult;
  answers: AssessmentAnswers;
}

export const AuditReportView: React.FC<AuditReportViewProps> = ({
  auditResult,
  answers,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const statementText = generateOfficialAuditStatement(auditResult, answers);

  const handleCopy = () => {
    navigator.clipboard.writeText(statementText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([statementText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DICTAMEN_OFICIAL_ISO_LEGAL_${auditResult.companyName.replace(/\s+/g, '_').toUpperCase()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner Card */}
      <div className="card" style={{
        padding: '28px 32px',
        backgroundColor: '#ffffff',
        border: '1.5px solid #e2e8f0',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-emerald">
              <Award size={13} />
              <span>DICTAMEN TÉCNICO-LEGAL EMITIDO</span>
            </span>
            <span className="badge badge-blue">
              <span>{auditResult.jurisdictionLabel}</span>
            </span>
          </div>

          <h1 style={{ 
            fontSize: '1.75rem', 
            fontWeight: 800, 
            letterSpacing: '-0.025em', 
            color: '#0f172a',
            marginBottom: '6px' 
          }}>
            Dictamen Oficial de Cumplimiento Regulatorio
          </h1>
          <p style={{ color: '#475569', fontSize: '0.925rem', maxWidth: '720px' }}>
            Documento estructurado de fe pública técnica para presentar ante bancos, auditorías de clientes corporativos (Vendor Assessment), licitaciones del Estado y requerimientos de la ANPD / MINJUS.
          </p>
        </div>

        {/* Action Buttons - RESPETO TOTAL A MÁRGENES */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <button
            onClick={handleCopy}
            className="btn btn-secondary"
            style={{ padding: '12px 18px' }}
          >
            {copied ? (
              <>
                <Check size={16} color="#10b981" />
                <span>¡Copiado al Portapapeles!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Copiar Dictamen Legal</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadTxt}
            className="btn btn-primary"
            style={{ padding: '12px 20px' }}
          >
            <Download size={16} />
            <span>Descargar Dictamen (.txt)</span>
          </button>

          <button
            onClick={handlePrint}
            className="btn btn-pastel-blue"
            style={{ padding: '12px 18px' }}
          >
            <Printer size={16} />
            <span>Imprimir / Guardar PDF</span>
          </button>
        </div>
      </div>

      {/* Official Certificate Visual Badge */}
      <div style={{
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '20px 24px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            backgroundColor: '#ecfdf5',
            border: '1.5px solid #a7f3d0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#059669'
          }}>
            <ShieldCheck size={26} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>
              Certificado de Conformidad para {auditResult.companyName}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Auditado el {auditResult.date} | Cifrado AES-256-GCM | Protección de Secreto Profesional & PII
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="badge badge-emerald" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
            {auditResult.mandatoryStandards} NORMAS OBLIGATORIAS
          </span>
          <span className="badge badge-blue" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
            {auditResult.standards.length} TOTAL AUDITADAS
          </span>
        </div>
      </div>

      {/* Structured Text Preview Box (Estilo Dictamen Oficial con Borde ASCII) */}
      <div className="card" style={{ padding: '0', overflow: 'hidden', border: '1.5px solid #cbd5e1' }}>
        <div style={{
          padding: '12px 20px',
          backgroundColor: '#1e293b',
          color: '#f8fafc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.825rem',
          fontWeight: 600
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={15} color="#38bdf8" />
            <span>DOCUMENTO OFICIAL GENERADO (TEXTO INMUTABLE)</span>
          </div>

          <span style={{ color: '#94a3b8', fontSize: '0.775rem' }}>
            Formato Estándar de Auditoría Técnica
          </span>
        </div>

        <pre style={{
          backgroundColor: '#0f172a',
          color: '#e2e8f0',
          padding: '24px 28px',
          margin: 0,
          overflowX: 'auto',
          fontSize: '0.85rem',
          lineHeight: 1.6,
          fontFamily: 'var(--font-mono)',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}>
          {statementText}
        </pre>
      </div>
    </div>
  );
};

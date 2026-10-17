import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  CheckCircle2, 
  FileText, 
  Code2, 
  Copy, 
  Check, 
  Terminal, 
  FileCheck
} from 'lucide-react';
import type { ComplianceStandard } from '../types/compliance';

interface HowToApplyModalProps {
  standard: ComplianceStandard | null;
  onClose: () => void;
}

export const HowToApplyModal: React.FC<HowToApplyModalProps> = ({
  standard,
  onClose,
}) => {
  const [copiedSnippetIdx, setCopiedSnippetIdx] = useState<number | null>(null);

  if (!standard) return null;

  const copyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetIdx(idx);
    setTimeout(() => setCopiedSnippetIdx(null), 2500);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.55)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 60,
      padding: '20px',
    }}>
      <div 
        className="card"
        style={{
          width: '100%',
          maxWidth: '850px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '0',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '24px 28px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          backgroundColor: '#f8fafc',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: '#eff6ff',
              border: '1.5px solid #bfdbfe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#2563eb'
            }}>
              <BookOpen size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#0f172a' }}>
                  {standard.code}
                </span>
                <span className={`badge ${standard.priority === 'obligatorio' ? 'badge-rose' : 'badge-blue'}`}>
                  {standard.priority.toUpperCase()}
                </span>
              </div>
              <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>
                {standard.title} — Autoridad: {standard.authority}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn btn-outline btn-sm"
            style={{ padding: '8px', borderRadius: '50%', width: '36px', height: '36px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Summary Box */}
          <div style={{
            backgroundColor: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: '10px',
            padding: '16px 20px',
            fontSize: '0.9rem',
            color: '#1e3a8a',
            lineHeight: 1.6
          }}>
            <strong style={{ display: 'block', marginBottom: '4px', color: '#1e40af' }}>
              Objetivo & Resumen Ejecutivo:
            </strong>
            {standard.summary}
          </div>

          {/* Step-by-Step Implementation Guide */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={20} color="#2563eb" />
              <span>Hoja de Ruta: Cómo Aplicarla Paso a Paso en tu Software</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {standard.howToApplySteps.map((step, idx) => (
                <div 
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '12px 16px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                  }}
                >
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#eff6ff',
                    color: '#2563eb',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    {idx + 1}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.5 }}>
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents */}
          {standard.requiredDocuments.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={20} color="#7c3aed" />
                <span>Documentos & Políticas Exigidas en Auditoría</span>
              </h3>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '10px' 
              }}>
                {standard.requiredDocuments.map((doc, idx) => (
                  <div 
                    key={idx}
                    style={{
                      padding: '12px 14px',
                      backgroundColor: '#faf5ff',
                      border: '1px solid #e9d5ff',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '0.85rem',
                      color: '#581c87',
                      fontWeight: 600,
                    }}
                  >
                    <FileCheck size={16} color="#7c3aed" style={{ flexShrink: 0 }} />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Code Snippets Section */}
          {standard.codeSnippets.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Code2 size={20} color="#059669" />
                <span>Código Fuente de Implementación Listo para Copiar</span>
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {standard.codeSnippets.map((snippet, sIdx) => (
                  <div 
                    key={sIdx}
                    style={{
                      border: '1px solid #cbd5e1',
                      borderRadius: '10px',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Snippet Header */}
                    <div style={{
                      padding: '10px 16px',
                      backgroundColor: '#1e293b',
                      color: '#f8fafc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.825rem',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Terminal size={14} color="#38bdf8" />
                        <span style={{ fontWeight: 600 }}>{snippet.title}</span>
                        <span style={{ color: '#94a3b8' }}>({snippet.targetFile})</span>
                      </div>

                      <button
                        onClick={() => copyCode(snippet.code, sIdx)}
                        className="btn btn-sm"
                        style={{
                          backgroundColor: '#334155',
                          color: '#ffffff',
                          padding: '4px 10px',
                          fontSize: '0.75rem',
                          border: 'none',
                        }}
                      >
                        {copiedSnippetIdx === sIdx ? (
                          <>
                            <Check size={13} color="#4ade80" />
                            <span>¡Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Copiar Código</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre style={{
                      backgroundColor: '#0f172a',
                      color: '#e2e8f0',
                      padding: '16px',
                      margin: 0,
                      overflowX: 'auto',
                      fontSize: '0.825rem',
                      lineHeight: 1.5,
                      fontFamily: 'var(--font-mono)'
                    }}>
                      <code>{snippet.code}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '16px 28px',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'flex-end',
          backgroundColor: '#f8fafc',
          position: 'sticky',
          bottom: 0,
        }}>
          <button
            onClick={onClose}
            className="btn btn-primary"
            style={{ padding: '10px 22px' }}
          >
            <span>Entendido y Cerrar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Code2, 
  Copy, 
  Check, 
  Terminal 
} from 'lucide-react';
import { MOTOR_CRIPTOGRAFICO_SNIPPET, ALL_COMPLIANCE_STANDARDS } from '../data/complianceData';
import type { CodeSnippet } from '../types/compliance';

export const CodePlayground: React.FC = () => {
  // Aggregate all snippets
  const allSnippets: CodeSnippet[] = [
    MOTOR_CRIPTOGRAFICO_SNIPPET,
    ...ALL_COMPLIANCE_STANDARDS.flatMap(s => s.codeSnippets).filter(s => s.title !== MOTOR_CRIPTOGRAFICO_SNIPPET.title)
  ];

  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const activeSnippet = allSnippets[selectedIdx] || allSnippets[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Banner */}
      <div className="card" style={{
        padding: '28px 32px',
        backgroundColor: '#ffffff',
        border: '1.5px solid #e2e8f0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge badge-emerald">
            <Code2 size={13} />
            <span>LABORATORIO DE CÓDIGO TÉCNICO</span>
          </span>
          <span className="badge badge-blue">
            <span>NODE.JS / TYPESCRIPT / POSTGRESQL</span>
          </span>
        </div>

        <h1 style={{ 
          fontSize: '1.75rem', 
          fontWeight: 800, 
          letterSpacing: '-0.02em', 
          color: '#0f172a',
          marginBottom: '6px' 
        }}>
          Controles Técnicos Listos para Copiar y Pegar
        </h1>
        <p style={{ color: '#475569', fontSize: '0.925rem', maxWidth: '750px' }}>
          No tienes que reinventar la rueda ni contratar costosas consultoras para redactar código de seguridad. Aquí tienes los módulos exactos testeados en producción para cumplir con ISO 27001, 27701, 42001 y leyes de privacidad.
        </p>
      </div>

      {/* Code Layout: Left Snippet Selector + Right Code Viewer */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'minmax(280px, 340px) 1fr', 
        gap: '20px',
        alignItems: 'start'
      }}>
        {/* Left List of Snippets */}
        <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', padding: '4px 8px' }}>
            Módulos de Seguridad ({allSnippets.length})
          </div>

          {allSnippets.map((snippet, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className={`option-card ${selectedIdx === idx ? 'selected' : ''}`}
              style={{
                padding: '12px 14px',
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                backgroundColor: selectedIdx === idx ? '#eff6ff' : '#f8fafc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: selectedIdx === idx ? '#2563eb' : '#64748b',
                flexShrink: 0
              }}>
                <Code2 size={16} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ 
                  fontWeight: 700, 
                  fontSize: '0.85rem', 
                  color: selectedIdx === idx ? '#1e40af' : '#0f172a',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis' 
                }}>
                  {snippet.title}
                </div>
                <div style={{ fontSize: '0.725rem', color: '#64748b', marginTop: '2px' }}>
                  {snippet.targetFile}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Code Display */}
        <div className="card" style={{ padding: '0', overflow: 'hidden', border: '1.5px solid #cbd5e1' }}>
          {/* Header Bar */}
          <div style={{
            padding: '16px 20px',
            backgroundColor: '#1e293b',
            color: '#f8fafc',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal size={16} color="#38bdf8" />
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{activeSnippet.title}</span>
              </div>
              <div style={{ fontSize: '0.775rem', color: '#94a3b8', marginTop: '2px' }}>
                Ubicación sugerida en tu repositorio: <code style={{ color: '#38bdf8' }}>{activeSnippet.targetFile}</code>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="btn btn-primary btn-sm"
              style={{
                backgroundColor: '#2563eb',
                borderColor: '#2563eb',
                padding: '8px 16px',
              }}
            >
              {copied ? (
                <>
                  <Check size={14} color="#4ade80" />
                  <span>¡Código Copiado!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copiar Módulo Completo</span>
                </>
              )}
            </button>
          </div>

          {/* Description banner */}
          <div style={{
            padding: '12px 20px',
            backgroundColor: '#f1f5f9',
            borderBottom: '1px solid #e2e8f0',
            fontSize: '0.85rem',
            color: '#334155'
          }}>
            <strong>Propósito del control: </strong> {activeSnippet.description}
          </div>

          {/* Code Viewer */}
          <pre style={{
            backgroundColor: '#0f172a',
            color: '#e2e8f0',
            padding: '24px',
            margin: 0,
            overflowX: 'auto',
            fontSize: '0.85rem',
            lineHeight: 1.6,
            fontFamily: 'var(--font-mono)',
          }}>
            <code>{activeSnippet.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

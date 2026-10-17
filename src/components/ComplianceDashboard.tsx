import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Lock, 
  Search, 
  Download, 
  Code2, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  FileCheck2 
} from 'lucide-react';
import type { AuditResult, ComplianceStandard } from '../types/compliance';

interface ComplianceDashboardProps {
  auditResult: AuditResult;
  onSelectStandardForGuide: (standard: ComplianceStandard) => void;
  onOpenAuditModal: () => void;
  onOpenCodePlayground: () => void;
}

export const ComplianceDashboard: React.FC<ComplianceDashboardProps> = ({
  auditResult,
  onSelectStandardForGuide,
  onOpenAuditModal,
  onOpenCodePlayground,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedStandards, setExpandedStandards] = useState<Record<string, boolean>>({});
  
  // Interactive checklist status map (stored locally per control id)
  const [controlStatuses, setControlStatuses] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(`compliance_controls_${auditResult.companyName}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleControl = (controlId: string) => {
    const next = { ...controlStatuses, [controlId]: !controlStatuses[controlId] };
    setControlStatuses(next);
    try {
      localStorage.setItem(`compliance_controls_${auditResult.companyName}`, JSON.stringify(next));
    } catch (e) {
      console.error(e);
    }
  };

  const toggleExpand = (standardId: string) => {
    setExpandedStandards(prev => ({
      ...prev,
      [standardId]: !prev[standardId]
    }));
  };

  // Calculate live compliance progress based on checked controls
  const allControls = auditResult.standards.flatMap(s => s.keyControls);
  const totalControlsCount = allControls.length;
  const completedControlsCount = allControls.filter(c => controlStatuses[c.id]).length;
  
  const liveScore = totalControlsCount > 0 
    ? Math.round((completedControlsCount / totalControlsCount) * 100) 
    : auditResult.estimatedComplianceScore;

  // Filter standards
  const filteredStandards = auditResult.standards.filter(s => {
    if (filterCategory === 'iso' && s.category !== 'iso') return false;
    if (filterCategory === 'legal_pe' && s.category !== 'legal_pe') return false;
    if (filterCategory === 'cybersecurity' && s.category !== 'cybersecurity') return false;
    if (filterCategory === 'ai_governance' && s.category !== 'ai_governance') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = s.title.toLowerCase().includes(q) || s.code.toLowerCase().includes(q);
      const matchControls = s.keyControls.some(c => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
      return matchTitle || matchControls;
    }
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Banner Header */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-emerald">
              <CheckCircle2 size={13} />
              <span>AUDITORÍA INTEGRAL GENERADA</span>
            </span>
            <span className="badge badge-blue">
              <span>{auditResult.jurisdictionLabel}</span>
            </span>
          </div>

          <h1 style={{ 
            fontSize: '1.75rem', 
            fontWeight: 800, 
            letterSpacing: '-0.02em', 
            color: '#0f172a',
            marginBottom: '6px' 
          }}>
            Panel de Cumplimiento: {auditResult.companyName}
          </h1>
          <p style={{ color: '#475569', fontSize: '0.925rem', maxWidth: '750px' }}>
            Mapa regulatorio activo conforme a estándares internacionales ISO y marco legal peruano. Monitorea los controles técnicos, descarga la evidencia y certifica tu plataforma ante auditorías corporativas.
          </p>
        </div>

        {/* Action Buttons - RESPETO A MÁRGENES Y ERGONOMÍA */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <button
            onClick={onOpenAuditModal}
            className="btn btn-primary"
            style={{ padding: '12px 20px' }}
          >
            <Download size={16} />
            <span>Descargar Dictamen Oficial</span>
          </button>

          <button
            onClick={onOpenCodePlayground}
            className="btn btn-secondary"
            style={{ padding: '12px 18px' }}
          >
            <Code2 size={16} color="#2563eb" />
            <span>Ver Código Técnico</span>
          </button>
        </div>
      </div>

      {/* 4 Metric KPI Cards - COLORES CLAROS Y PASTELES */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '16px' 
      }}>
        {/* Metric 1 */}
        <div className="card" style={{ 
          padding: '20px', 
          backgroundColor: '#eff6ff', 
          borderColor: '#bfdbfe',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1e40af', textTransform: 'uppercase' }}>
                Índice de Cumplimiento
              </span>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '8px', 
                backgroundColor: '#ffffff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#2563eb'
              }}>
                <ShieldCheck size={18} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em' }}>
                {liveScore}%
              </span>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1e40af' }}>
                {completedControlsCount} de {totalControlsCount} controles
              </span>
            </div>
          </div>
          {/* Progress bar */}
          <div style={{ width: '100%', height: '8px', backgroundColor: '#dbeafe', borderRadius: '4px', overflow: 'hidden', marginTop: '12px' }}>
            <div style={{ 
              width: `${liveScore}%`, 
              height: '100%', 
              backgroundColor: liveScore > 75 ? '#10b981' : '#2563eb',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="card" style={{ 
          padding: '20px', 
          backgroundColor: '#ecfdf5', 
          borderColor: '#a7f3d0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#065f46', textTransform: 'uppercase' }}>
                Normas ISO Aplicables
              </span>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '8px', 
                backgroundColor: '#ffffff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#059669'
              }}>
                <FileCheck2 size={18} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em' }}>
                {auditResult.standards.filter(s => s.category === 'iso' || s.category === 'ai_governance').length}
              </span>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#065f46' }}>
                Estándares Internacionales
              </span>
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 500, marginTop: '12px' }}>
            ISO 27001, 27701, 25010, 27018, 29110
          </div>
        </div>

        {/* Metric 3 */}
        <div className="card" style={{ 
          padding: '20px', 
          backgroundColor: '#faf5ff', 
          borderColor: '#e9d5ff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6b21a8', textTransform: 'uppercase' }}>
                Marco Legal Vinculante
              </span>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '8px', 
                backgroundColor: '#ffffff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#7c3aed'
              }}>
                <FileText size={18} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em' }}>
                {auditResult.standards.filter(s => s.category.startsWith('legal_')).length}
              </span>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6b21a8' }}>
                Leyes & Decretos
              </span>
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#6b21a8', fontWeight: 500, marginTop: '12px' }}>
            Ley N° 29733, D.S. 003-2013-JUS, Ley 30096
          </div>
        </div>

        {/* Metric 4 */}
        <div className="card" style={{ 
          padding: '20px', 
          backgroundColor: '#fffbeb', 
          borderColor: '#fde68a',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#92400e', textTransform: 'uppercase' }}>
                Criptografía & AppSec
              </span>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '8px', 
                backgroundColor: '#ffffff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#d97706'
              }}>
                <Lock size={18} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
                AES-256-GCM
              </span>
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#92400e', fontWeight: 600, marginTop: '12px' }}>
            HKDF SHA-256 & TLS 1.3 HSTS Activo
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        gap: '14px',
        padding: '6px 0'
      }}>
        {/* Category Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {[
            { id: 'all', label: `Todos (${auditResult.standards.length})` },
            { id: 'iso', label: 'Normativas ISO' },
            { id: 'legal_pe', label: 'Marco Legal Perú' },
            { id: 'cybersecurity', label: 'Ciberseguridad & AppSec' },
            { id: 'ai_governance', label: 'Gobernanza de IA' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              className={filterCategory === tab.id ? 'btn btn-pastel-blue btn-sm' : 'btn btn-outline btn-sm'}
              style={{ padding: '8px 14px' }}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text"
            placeholder="Buscar por artículo, control o ley..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              paddingLeft: '36px', 
              paddingRight: '12px', 
              paddingTop: '8px', 
              paddingBottom: '8px', 
              fontSize: '0.85rem' 
            }}
          />
        </div>
      </div>

      {/* Standards List Accordions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredStandards.map((standard) => {
          const isExpanded = expandedStandards[standard.id] ?? true; // expanded by default
          const standardControls = standard.keyControls;
          const completedInStandard = standardControls.filter(c => controlStatuses[c.id]).length;

          return (
            <div 
              key={standard.id} 
              className="card"
              style={{ 
                padding: '0', 
                overflow: 'hidden',
                borderColor: standard.priority === 'obligatorio' ? '#cbd5e1' : '#e2e8f0',
              }}
            >
              {/* Card Header */}
              <div 
                style={{ 
                  padding: '20px 24px',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  cursor: 'pointer',
                  borderBottom: isExpanded ? '1px solid #f1f5f9' : 'none',
                }}
                onClick={() => toggleExpand(standard.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: standard.category === 'iso' ? '#eff6ff' : standard.category === 'legal_pe' ? '#faf5ff' : '#ecfdf5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: standard.category === 'iso' ? '#2563eb' : standard.category === 'legal_pe' ? '#7c3aed' : '#059669',
                    flexShrink: 0
                  }}>
                    {standard.category === 'iso' ? <ShieldCheck size={20} /> : <FileText size={20} />}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0f172a' }}>
                        {standard.code}
                      </span>
                      <span className={`badge ${standard.priority === 'obligatorio' ? 'badge-rose' : 'badge-blue'}`}>
                        {standard.priority.toUpperCase()}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        ({completedInStandard}/{standardControls.length} Controles)
                      </span>
                    </div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginTop: '2px' }}>
                      {standard.title}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectStandardForGuide(standard);
                    }}
                    className="btn btn-pastel-blue btn-sm"
                    style={{ padding: '6px 14px' }}
                  >
                    <BookOpen size={14} />
                    <span>Guía & Código</span>
                  </button>

                  <div style={{ color: '#94a3b8', padding: '4px' }}>
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>
              </div>

              {/* Card Body (If expanded) */}
              {isExpanded && (
                <div style={{ padding: '20px 24px', backgroundColor: '#fafbfc' }}>
                  {/* Applicability Context */}
                  <div style={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '8px', 
                    padding: '12px 16px',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px'
                  }}>
                    <Sparkles size={16} color="#2563eb" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ fontSize: '0.85rem', color: '#334155' }}>
                      <strong style={{ color: '#0f172a' }}>Por qué aplica a tu software: </strong>
                      {standard.applicabilityReason}
                    </div>
                  </div>

                  {/* Key Controls Interactive List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>
                      Controles Técnicos Exigidos en Auditoría:
                    </div>

                    {standard.keyControls.map((control) => {
                      const isChecked = !!controlStatuses[control.id];
                      return (
                        <div 
                          key={control.id}
                          style={{
                            backgroundColor: '#ffffff',
                            border: `1.5px solid ${isChecked ? '#a7f3d0' : '#e2e8f0'}`,
                            borderRadius: '8px',
                            padding: '14px 16px',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '12px',
                            transition: 'all 0.2s'
                          }}
                        >
                          <input 
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleControl(control.id)}
                            style={{ 
                              width: '18px', 
                              height: '18px', 
                              marginTop: '2px', 
                              accentColor: '#10b981',
                              cursor: 'pointer' 
                            }}
                          />

                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                              <span style={{ 
                                fontWeight: 700, 
                                fontSize: '0.875rem', 
                                color: isChecked ? '#065f46' : '#0f172a',
                                textDecoration: isChecked ? 'line-through' : 'none' 
                              }}>
                                {control.code}: {control.name}
                              </span>
                              <span className={`badge ${control.priority === 'critica' ? 'badge-rose' : 'badge-slate'}`} style={{ fontSize: '0.675rem' }}>
                                {control.priority.toUpperCase()}
                              </span>
                              {isChecked && (
                                <span className="badge badge-emerald" style={{ fontSize: '0.675rem' }}>
                                  CUMPLIDO
                                </span>
                              )}
                            </div>

                            <p style={{ fontSize: '0.825rem', color: '#475569', marginTop: '4px' }}>
                              {control.description}
                            </p>

                            <div style={{ 
                              marginTop: '8px', 
                              padding: '6px 10px', 
                              backgroundColor: '#f8fafc', 
                              borderRadius: '6px',
                              fontSize: '0.775rem',
                              color: '#334155',
                              border: '1px solid #f1f5f9'
                            }}>
                              <strong style={{ color: '#0f172a' }}>Evidencia Técnica Verificable: </strong>
                              <code>{control.technicalEvidence}</code>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer actions for this card */}
                  <div style={{ 
                    marginTop: '16px', 
                    paddingTop: '12px', 
                    borderTop: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ fontSize: '0.775rem', color: '#64748b' }}>
                      Autoridad Rectora: {standard.authority}
                    </span>

                    <button
                      type="button"
                      onClick={() => onSelectStandardForGuide(standard)}
                      className="btn btn-outline btn-sm"
                      style={{ padding: '6px 14px' }}
                    >
                      <BookOpen size={14} />
                      <span>Ver Pasos de Aplicación y Documentos</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

import { 
  ShieldCheck, 
  SlidersHorizontal, 
  LayoutDashboard, 
  FileCheck2, 
  Code2, 
  Award, 
  RotateCcw, 
  FileDown
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'wizard' | 'dashboard' | 'standards' | 'code' | 'audit';
  setActiveTab: (tab: 'wizard' | 'dashboard' | 'standards' | 'code' | 'audit') => void;
  hasAuditResult: boolean;
  onReset: () => void;
  onOpenAuditModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  hasAuditResult,
  onReset,
  onOpenAuditModal,
}) => {
  return (
    <header style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px',
      }}>
        {/* Brand Logo & Name */}
        <div 
          onClick={() => setActiveTab(hasAuditResult ? 'dashboard' : 'wizard')}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            cursor: 'pointer' 
          }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            backgroundColor: '#eff6ff',
            border: '1.5px solid #bfdbfe',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#2563eb'
          }}>
            <ShieldCheck size={24} strokeWidth={2.2} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ 
                fontWeight: 800, 
                fontSize: '1.25rem', 
                letterSpacing: '-0.02em', 
                color: '#0f172a' 
              }}>
                NORMATIVA<span style={{ color: '#2563eb' }}>.DEV</span>
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Navigation Items */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={() => setActiveTab('wizard')}
            className={activeTab === 'wizard' ? 'btn btn-pastel-blue btn-sm' : 'btn btn-outline btn-sm'}
            style={{ padding: '8px 14px' }}
          >
            <SlidersHorizontal size={16} />
            <span>Diagnóstico</span>
          </button>

          {hasAuditResult && (
            <>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={activeTab === 'dashboard' ? 'btn btn-pastel-blue btn-sm' : 'btn btn-outline btn-sm'}
                style={{ padding: '8px 14px' }}
              >
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab('standards')}
                className={activeTab === 'standards' ? 'btn btn-pastel-blue btn-sm' : 'btn btn-outline btn-sm'}
                style={{ padding: '8px 14px' }}
              >
                <FileCheck2 size={16} />
                <span>Normativas & Leyes</span>
              </button>

              <button
                onClick={() => setActiveTab('code')}
                className={activeTab === 'code' ? 'btn btn-pastel-blue btn-sm' : 'btn btn-outline btn-sm'}
                style={{ padding: '8px 14px' }}
              >
                <Code2 size={16} />
                <span>Cómo Aplicarlas</span>
              </button>

              <button
                onClick={() => setActiveTab('audit')}
                className={activeTab === 'audit' ? 'btn btn-pastel-blue btn-sm' : 'btn btn-outline btn-sm'}
                style={{ padding: '8px 14px' }}
              >
                <Award size={16} />
                <span>Dictamen Oficial</span>
              </button>
            </>
          )}
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {hasAuditResult ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={onOpenAuditModal}
                className="btn btn-primary btn-sm"
                title="Ver y Descargar Dictamen Oficial de Auditoría"
                style={{ padding: '8px 14px' }}
              >
                <FileDown size={15} />
                <span>Descargar Dictamen</span>
              </button>

              <button
                onClick={onReset}
                className="btn btn-outline btn-sm"
                title="Iniciar nuevo diagnóstico con otra empresa o producto"
                style={{ padding: '8px 10px', color: '#64748b' }}
              >
                <RotateCcw size={15} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setActiveTab('wizard')}
              className="btn btn-primary btn-sm"
              style={{ padding: '8px 16px' }}
            >
              <SlidersHorizontal size={16} />
              <span>Iniciar Auditoría</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

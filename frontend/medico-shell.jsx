// medico-shell.jsx
// Layout principal do portal: sidebar escura + área de conteúdo + topbar.
// Responsivo: sidebar colapsa para drawer abaixo de 900px.

const _KMshell = window.KM;

function useViewport() {
  const [w, setW] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1280);
  React.useEffect(() => {
    const on = () => setW(window.innerWidth);
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return { w, isCompact: w < 900, isMobile: w < 640 };
}

function MedicoShell({ active, go, doctor, alertsCount = 3, children }) {
  const { isCompact } = useViewport();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const nav = [
    { k: 'dashboard', label: 'Dashboard', icon: 'grid' },
    { k: 'patients',  label: 'Pacientes', icon: 'people' },
    { k: 'alerts',    label: 'Alertas',   icon: 'bell', badge: alertsCount },
    { k: 'agenda',    label: 'Agenda',    icon: 'calendar' },
  ];

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      background: KM.surface.app,
      fontFamily: 'var(--sans)', color: KM.ink.primary,
    }}>
      {/* Sidebar */}
      {!isCompact && (
        <Sidebar nav={nav} active={active} go={go} doctor={doctor} />
      )}

      {/* Drawer mobile */}
      {isCompact && drawerOpen && (
        <>
          <div onClick={() => setDrawerOpen(false)} style={{
            position: 'fixed', inset: 0, background: 'rgba(31,26,29,0.45)', zIndex: 80,
          }} />
          <div style={{
            position: 'fixed', top: 0, bottom: 0, left: 0, width: 260, zIndex: 90,
          }}>
            <Sidebar nav={nav} active={active} go={(s) => { setDrawerOpen(false); go(s); }} doctor={doctor} />
          </div>
        </>
      )}

      {/* Main */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <Topbar
          isCompact={isCompact}
          onMenu={() => setDrawerOpen(true)}
          active={active}
          doctor={doctor}
        />
        <div style={{ flex: 1, padding: isCompact ? '20px 16px 32px' : '28px 36px 40px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function Sidebar({ nav, active, go, doctor }) {
  return (
    <aside style={{
      width: 240, flexShrink: 0,
      background: `linear-gradient(180deg, ${KM.surface.sidebar} 0%, #2A0F18 100%)`,
      color: KM.ink.onDark,
      display: 'flex', flexDirection: 'column',
      padding: '22px 16px 18px',
      height: '100vh', position: 'sticky', top: 0,
    }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 8px 22px' }}>
        <div style={{
          width: 38, height: 38, borderRadius: 11,
          background: `linear-gradient(135deg, ${KM.brand.coral}, ${KM.brand.deep})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 6px 16px ${KM.brand.coral}55`,
        }}>
          <KairosMark size={18} color="#fff" />
        </div>
        <div>
          <div style={{
            fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 500,
            letterSpacing: -0.3, lineHeight: 1, color: '#fff',
          }}>Kairos</div>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: 1.6,
            textTransform: 'uppercase', color: KM.ink.onDarkDim, marginTop: 4,
          }}>Portal Clínico</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 6 }}>
        {nav.map(n => (
          <SidebarItem key={n.k} item={n} active={active === n.k} onClick={() => go(n.k)} />
        ))}
      </nav>

      <div style={{ flex: 1 }} />

      {/* Doctor card */}
      <div style={{
        marginTop: 8, paddingTop: 14,
        borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{
          width: 38, height: 38, borderRadius: '50%',
          background: `linear-gradient(135deg, ${KM.brand.coral}, ${KM.brand.wine})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--serif)', fontSize: 14, fontWeight: 500, color: '#fff',
          flexShrink: 0,
        }}>{(doctor?.initials || 'HM')}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {doctor?.name || 'Dra. Helena M.'}
          </div>
          <div style={{ fontSize: 11, color: KM.ink.onDarkDim, marginTop: 1 }}>
            {doctor?.role || 'Obstetrícia'}
          </div>
        </div>
        <button onClick={() => go('login')} title="Sair" style={{
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)',
          cursor: 'pointer', color: KM.ink.onDark,
          width: 30, height: 30, borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M15 12H4M4 12l4-4M4 12l4 4M11 4h6a2 2 0 012 2v12a2 2 0 01-2 2h-6"
              stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </aside>
  );
}

function SidebarItem({ item, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '11px 14px', borderRadius: KM.radius.md,
      background: active ? KM.brand.coral : 'transparent',
      border: 'none', cursor: 'pointer',
      color: active ? '#fff' : KM.ink.onDarkDim,
      fontFamily: 'var(--sans)', fontSize: 14, fontWeight: active ? 600 : 400,
      width: '100%', textAlign: 'left', position: 'relative',
      transition: 'background 0.15s, color 0.15s',
    }}
    onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff'; } }}
    onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = KM.ink.onDarkDim; } }}>
      <NavIcon name={item.icon} color={active ? '#fff' : 'currentColor'} />
      <span style={{ flex: 1 }}>{item.label}</span>
      {item.badge ? (
        <span style={{
          background: active ? 'rgba(255,255,255,0.25)' : KM.brand.coral,
          color: '#fff',
          fontSize: 10, fontWeight: 600,
          padding: '2px 7px', borderRadius: 999,
          fontFamily: 'var(--mono)', letterSpacing: 0.5,
        }}>{item.badge}</span>
      ) : null}
    </button>
  );
}

function NavIcon({ name, color }) {
  const s = { stroke: color, strokeWidth: 1.7, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (name === 'grid') return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <rect x="4" y="4" width="7" height="7" rx="1.5" {...s} />
      <rect x="13" y="4" width="7" height="7" rx="1.5" {...s} />
      <rect x="4" y="13" width="7" height="7" rx="1.5" {...s} />
      <rect x="13" y="13" width="7" height="7" rx="1.5" {...s} />
    </svg>
  );
  if (name === 'people') return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <circle cx="9" cy="8" r="3.5" {...s} />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" {...s} />
      <circle cx="17" cy="9" r="2.8" {...s} />
      <path d="M15.5 14.2c2.4.4 4.5 2.3 5 4.8" {...s} />
    </svg>
  );
  if (name === 'bell') return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M6 16V11a6 6 0 0112 0v5l1.5 2h-15L6 16z" {...s} />
      <path d="M10 20a2 2 0 004 0" {...s} />
    </svg>
  );
  if (name === 'calendar') return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <rect x="3.5" y="5" width="17" height="15" rx="2" {...s} />
      <path d="M3.5 10h17M8 3v4M16 3v4" {...s} />
    </svg>
  );
  if (name === 'chat') return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v9a2 2 0 01-2 2h-7l-4 3v-3H6a2 2 0 01-2-2V6z" {...s} />
    </svg>
  );
  if (name === 'cog') return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" {...s} />
      <path d="M19.4 14a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V20a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H4a2 2 0 110-4h.1A1.7 1.7 0 005.6 8a1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H10a1.7 1.7 0 001-1.5V2a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V8a1.7 1.7 0 001.5 1H22a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" {...s} />
    </svg>
  );
  return null;
}

function Topbar({ isCompact, onMenu, active, doctor }) {
  const titles = {
    patients: 'Pacientes',
    'patient-detail': 'Detalhe da paciente',
    alerts: 'Alertas',
    agenda: 'Agenda',
  };
  const showTitle = active !== 'dashboard';
  return (
    <header style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: isCompact ? '14px 16px' : '18px 36px',
      background: KM.surface.app,
      borderBottom: `1px solid ${KM.line2}`,
      position: 'sticky', top: 0, zIndex: 50,
      backdropFilter: 'blur(8px)',
    }}>
      {isCompact && (
        <button onClick={onMenu} style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          padding: 6, display: 'flex', color: KM.ink.primary,
        }} aria-label="Menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
      )}

      {/* Search central */}
      {!isCompact ? (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: KM.surface.panel,
          border: `1px solid ${KM.line}`,
          borderRadius: 999,
          padding: '10px 16px', flex: 1, maxWidth: 560,
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke={KM.ink.tertiary} strokeWidth="1.7"/>
            <path d="M20 20l-3.5-3.5" stroke={KM.ink.tertiary} strokeWidth="1.7" strokeLinecap="round"/>
          </svg>
          <input
            placeholder="Pesquisar pacientes, leituras, alertas..."
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontFamily: 'var(--sans)', fontSize: 13.5, color: KM.ink.primary,
            }}
          />
        </div>
      ) : (
        showTitle && (
          <div style={{
            fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 500,
            color: KM.ink.primary, letterSpacing: -0.4, flex: 1,
          }}>{titles[active] || 'Kairos'}</div>
        )
      )}

      <div style={{ flex: isCompact ? 0 : 1 }} />

      {/* Status pill */}
      {!isCompact && (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 14px', borderRadius: 999,
          background: KM.surface.panel, border: `1px solid ${KM.line2}`,
          fontSize: 12, color: KM.ink.secondary, fontWeight: 500,
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%', background: '#3FA572',
            boxShadow: '0 0 0 3px rgba(63,165,114,0.18)',
          }} />
          Sistema operacional
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button title="Notificações" style={iconBtnStyle()}>
          <NavIcon name="bell" color={KM.ink.secondary} />
          <span style={{
            position: 'absolute', top: 7, right: 8,
            width: 7, height: 7, borderRadius: '50%',
            background: KM.brand.coral, border: '1.5px solid #fff',
          }} />
        </button>
        <button title="Definições" style={iconBtnStyle()}>
          <NavIcon name="cog" color={KM.ink.secondary} />
        </button>
      </div>
    </header>
  );
}

function iconBtnStyle() {
  return {
    width: 38, height: 38, borderRadius: '50%',
    background: KM.surface.panel, border: `1px solid ${KM.line}`,
    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: KM.ink.secondary, position: 'relative',
    padding: 0,
  };
}

// Componentes utilitários partilhados
function Card({ children, padding = 20, style = {} }) {
  return (
    <div style={{
      background: KM.surface.panel,
      border: `1px solid ${KM.line2}`,
      borderRadius: KM.radius.lg,
      boxShadow: KM.shadow.sm,
      padding,
      ...style,
    }}>{children}</div>
  );
}

function RiskBadge({ level, size = 'md' }) {
  const r = KM.risk[level] || KM.risk.safe;
  const labelMap = { safe: 'Normal', watch: 'Elevado', alert: 'Crítico' };
  const sm = size === 'sm';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: r.bg, color: r.fg,
      padding: sm ? '2px 8px' : '4px 10px',
      borderRadius: 999,
      fontFamily: 'var(--sans)', fontSize: sm ? 11 : 12, fontWeight: 600,
      letterSpacing: 0.2,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: r.dot }} />
      {labelMap[level]}
    </span>
  );
}

function SectionTitle({ children, action }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
      marginBottom: 14,
    }}>
      <div style={{
        fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 500,
        color: KM.ink.primary, letterSpacing: -0.3,
      }}>{children}</div>
      {action}
    </div>
  );
}

function MetaLabel({ children, style = {} }) {
  return (
    <div style={{
      fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 1.4,
      textTransform: 'uppercase', color: KM.ink.tertiary, fontWeight: 500,
      ...style,
    }}>{children}</div>
  );
}

Object.assign(window, {
  MedicoShell, Sidebar, Topbar, Card, RiskBadge, SectionTitle, MetaLabel,
  NavIcon, useViewport, iconBtnStyle,
});

// medico-screens-patients.jsx
// Lista de pacientes (triagem) + detalhe individual.

const PACIENTES_MOCK = [
  { id: 'p1', name: 'Maria Silva',     age: 32, city: 'Lisboa',  week: 28, lastReading: '10:21', risk: 'alert', sys: 138, dia: 89, hr: 84, alerts: 2, doctor: 'Dra. Helena',
    obs: 'Hipocondríaca. Histórico de hipertensão na gravidez anterior (2022). Alergia a paracetamol.' },
  { id: 'p2', name: 'Ana Pereira',     age: 29, city: 'Coimbra', week: 22, lastReading: '09:48', risk: 'watch', sys: 128, dia: 82, hr: 76, alerts: 1, doctor: 'Dra. Helena',
    obs: 'Primigesta. Vegetariana. Toma suplementação de ferro desde a semana 14.' },
  { id: 'p3', name: 'Sofia Martins',   age: 35, city: 'Porto',   week: 34, lastReading: '08:12', risk: 'safe',  sys: 118, dia: 74, hr: 72, alerts: 0, doctor: 'Dra. Helena', obs: '' },
  { id: 'p4', name: 'Rita Ferreira',   age: 27, city: 'Faro',    week: 16, lastReading: 'Ontem', risk: 'safe',  sys: 110, dia: 70, hr: 68, alerts: 0, doctor: 'Dra. Helena', obs: '' },
  { id: 'p5', name: 'Beatriz Costa',   age: 31, city: 'Braga',   week: 30, lastReading: '11:02', risk: 'watch', sys: 132, dia: 86, hr: 81, alerts: 1, doctor: 'Dra. Helena',
    obs: 'Diabetes gestacional diagnosticada na semana 24. Dieta controlada.' },
  { id: 'p6', name: 'Inês Lopes',      age: 24, city: 'Aveiro',  week: 12, lastReading: 'Ontem', risk: 'safe',  sys: 114, dia: 72, hr: 70, alerts: 0, doctor: 'Dra. Helena', obs: '' },
  { id: 'p7', name: 'Joana Almeida',   age: 38, city: 'Porto',   week: 36, lastReading: '07:55', risk: 'alert', sys: 144, dia: 92, hr: 88, alerts: 3, doctor: 'Dra. Helena',
    obs: 'Idade materna avançada. Pré-eclâmpsia em gravidez anterior (2019). Vigilância semanal.' },
  { id: 'p8', name: 'Carla Mendes',    age: 30, city: 'Setúbal', week: 20, lastReading: 'Ontem', risk: 'safe',  sys: 116, dia: 73, hr: 71, alerts: 0, doctor: 'Dra. Helena', obs: '' },
];

window.PACIENTES_MOCK = PACIENTES_MOCK;

// ─────────────────────────────────────────────────────────────
// Lista
// ─────────────────────────────────────────────────────────────
function ScreenMedicoPatients({ go, setPatientId }) {
  const { isCompact, isMobile } = useViewport();
  const [filter, setFilter] = React.useState('all');
  const [query, setQuery] = React.useState('');

  const counts = React.useMemo(() => ({
    all:   PACIENTES_MOCK.length,
    alert: PACIENTES_MOCK.filter(p => p.risk === 'alert').length,
    watch: PACIENTES_MOCK.filter(p => p.risk === 'watch').length,
    safe:  PACIENTES_MOCK.filter(p => p.risk === 'safe').length,
  }), []);

  const list = PACIENTES_MOCK
    .filter(p => filter === 'all' || p.risk === filter)
    .filter(p => !query || p.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      const order = { alert: 0, watch: 1, safe: 2 };
      return order[a.risk] - order[b.risk];
    });

  const open = (id) => { setPatientId(id); go('patient-detail'); };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 18,
      minHeight: 'calc(100vh - 130px)',
    }}>
      {/* KPIs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
        gap: 12,
      }}>
        <KPI label="Pacientes ativas" value={counts.all} tone="neutral" />
        <KPI label="Risco elevado"   value={counts.alert} tone="alert" />
        <KPI label="Em vigilância"   value={counts.watch} tone="watch" />
        <KPI label="Estáveis"        value={counts.safe}  tone="safe" />
      </div>

      {/* Lista */}
      <Card padding={0} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Header */}
        <div style={{
          padding: '16px 18px',
          display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
          borderBottom: `1px solid ${KM.line2}`,
        }}>
          <div style={{
            fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 500,
            color: KM.ink.primary, letterSpacing: -0.3, marginRight: 'auto',
          }}>
            Fila de pacientes
          </div>

          {/* Mobile search */}
          {isCompact && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: KM.surface.sunken, borderRadius: KM.radius.sm,
              padding: '7px 10px', flex: '1 1 100%',
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke={KM.ink.tertiary} strokeWidth="1.7"/>
                <path d="M20 20l-3.5-3.5" stroke={KM.ink.tertiary} strokeWidth="1.7" strokeLinecap="round"/>
              </svg>
              <input
                value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder="Procurar paciente..."
                style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 13, fontFamily: 'var(--sans)' }}
              />
            </div>
          )}

          {/* Filtros */}
          <div style={{
            display: 'flex', gap: 4, padding: 3,
            background: KM.surface.sunken, borderRadius: KM.radius.sm,
          }}>
            {[
              { k: 'all',   label: 'Todas' },
              { k: 'alert', label: 'Crítico' },
              { k: 'watch', label: 'Elevado' },
              { k: 'safe',  label: 'Normal' },
            ].map(f => (
              <button key={f.k} onClick={() => setFilter(f.k)} style={{
                padding: '6px 12px', borderRadius: 6, border: 'none', cursor: 'pointer',
                background: filter === f.k ? '#fff' : 'transparent',
                color: filter === f.k ? KM.ink.primary : KM.ink.tertiary,
                fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 500,
                boxShadow: filter === f.k ? KM.shadow.sm : 'none',
                transition: 'background 0.15s',
              }}>{f.label}</button>
            ))}
          </div>
        </div>

        {/* Tabela / Cards */}
        {isCompact ? (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {list.map(p => <PatientRowCard key={p.id} p={p} onClick={() => open(p.id)} />)}
          </div>
        ) : (
          <div>
            <div style={{
              display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.2fr 1fr 0.6fr',
              gap: 14, padding: '12px 18px',
              borderBottom: `1px solid ${KM.line2}`,
              fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 1.3,
              textTransform: 'uppercase', color: KM.ink.tertiary, fontWeight: 500,
            }}>
              <div>Paciente</div>
              <div>Semana</div>
              <div>Tensão</div>
              <div>Última leitura</div>
              <div>Risco</div>
              <div style={{ textAlign: 'right' }}>Alertas</div>
            </div>
            {list.map(p => <PatientRow key={p.id} p={p} onClick={() => open(p.id)} />)}
          </div>
        )}

        {list.length === 0 && (
          <div style={{ padding: 40, textAlign: 'center', color: KM.ink.tertiary, fontSize: 13 }}>
            Sem pacientes que correspondam ao filtro.
          </div>
        )}
      </Card>
    </div>
  );
}

function KPI({ label, value, tone, icon, sub, delta }) {
  // Cor do número é sempre wine (uniforme); o accent dá a "cor do tom" ao ícone/dot
  const map = {
    neutral: { fg: KM.brand.wine, accent: KM.brand.deep },
    safe:    { fg: KM.brand.wine, accent: KM.risk.safe.dot },
    watch:   { fg: KM.brand.wine, accent: KM.risk.watch.dot },
    alert:   { fg: KM.brand.wine, accent: KM.risk.alert.dot },
  };
  const t = map[tone] || map.neutral;
  return (
    <Card padding={18}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <MetaLabel>{label}</MetaLabel>
        {icon ? (
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: KM.surface.kpiIcon,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <KpiIcon name={icon} color={t.accent} />
          </div>
        ) : (
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: t.accent, marginTop: 6 }} />
        )}
      </div>
      <div style={{
        fontFamily: 'var(--serif)', fontSize: 44, fontWeight: 500,
        color: t.fg, letterSpacing: -1.4, marginTop: 10, lineHeight: 1,
        fontVariationSettings: '"opsz" 36',
      }}>{value}</div>
      {sub ? (
        <div style={{ fontSize: 12, color: KM.ink.tertiary, marginTop: 8, lineHeight: 1.4 }}>{sub}</div>
      ) : null}
      {delta ? (
        <div style={{
          marginTop: sub ? 8 : 12,
          display: 'inline-flex', alignItems: 'center', gap: 5,
          fontSize: 12, fontWeight: 500,
          color: delta.tone === 'down' ? KM.risk.alert.fg : KM.risk.safe.fg,
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            {delta.tone === 'down'
              ? <path d="M5 9l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              : <path d="M5 15l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
          </svg>
          {delta.value} {delta.label}
        </div>
      ) : null}
    </Card>
  );
}

function KpiIcon({ name, color }) {
  const s = { stroke: color, strokeWidth: 1.8, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (name === 'people') return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <circle cx="9" cy="9" r="3.2" {...s} />
      <path d="M3 19c0-3 2.7-5.4 6-5.4s6 2.4 6 5.4" {...s} />
      <circle cx="17" cy="10" r="2.5" {...s} />
      <path d="M15.5 14.4c2.3.4 4.5 2.2 4.5 4.6" {...s} />
    </svg>
  );
  if (name === 'alert') return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M12 3l10 18H2L12 3z" {...s} />
      <path d="M12 10v4M12 17v.5" {...s} />
    </svg>
  );
  if (name === 'pulse') return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M3 12h3l2-5 4 10 2-5h7" {...s} />
    </svg>
  );
  if (name === 'heart') return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M12 19s-7-4.5-7-10a3.5 3.5 0 017-2 3.5 3.5 0 017 2c0 5.5-7 10-7 10z" {...s} />
    </svg>
  );
  return null;
}

function PatientRow({ p, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', textAlign: 'left',
      display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.2fr 1fr 0.6fr',
      gap: 14, padding: '14px 18px',
      background: 'transparent', border: 'none',
      borderBottom: `1px solid ${KM.line2}`,
      cursor: 'pointer', fontFamily: 'var(--sans)',
      alignItems: 'center', color: KM.ink.primary,
    }}
    onMouseEnter={(e) => e.currentTarget.style.background = KM.surface.panel2}
    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Avatar name={p.name} />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 500, letterSpacing: -0.2 }}>{p.name}</div>
          <div style={{ fontSize: 11, color: KM.ink.tertiary, marginTop: 1 }}>{p.age} anos</div>
        </div>
      </div>
      <div style={{ fontSize: 13, color: KM.ink.secondary }}>
        Sem. <span style={{ fontWeight: 600, color: KM.ink.primary }}>{p.week}</span>
      </div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: KM.ink.primary, fontWeight: 500 }}>
        {p.sys}/{p.dia} <span style={{ color: KM.ink.tertiary, fontWeight: 400 }}>mmHg</span>
      </div>
      <div style={{ fontSize: 13, color: KM.ink.secondary }}>{p.lastReading}</div>
      <div><RiskBadge level={p.risk} size="sm" /></div>
      <div style={{ textAlign: 'right' }}>
        {p.alerts > 0 ? (
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            minWidth: 22, height: 22, padding: '0 6px',
            background: KM.risk.alert.bg, color: KM.risk.alert.fg,
            borderRadius: 999, fontSize: 11, fontWeight: 700,
            fontFamily: 'var(--mono)',
          }}>{p.alerts}</span>
        ) : (
          <span style={{ color: KM.ink.muted, fontSize: 18 }}>·</span>
        )}
      </div>
    </button>
  );
}

function PatientRowCard({ p, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', textAlign: 'left',
      padding: '14px 16px',
      background: 'transparent', border: 'none',
      borderBottom: `1px solid ${KM.line2}`,
      cursor: 'pointer', fontFamily: 'var(--sans)',
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Avatar name={p.name} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 500, color: KM.ink.primary }}>{p.name}</div>
          <div style={{ fontSize: 11, color: KM.ink.tertiary, marginTop: 1 }}>
            {p.age} anos · Semana {p.week}
          </div>
        </div>
        <RiskBadge level={p.risk} size="sm" />
      </div>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingLeft: 48, fontSize: 12, color: KM.ink.secondary,
      }}>
        <span>
          <span style={{ fontFamily: 'var(--mono)', color: KM.ink.primary, fontWeight: 600 }}>
            {p.sys}/{p.dia}
          </span> mmHg · {p.lastReading}
        </span>
        {p.alerts > 0 && (
          <span style={{
            background: KM.risk.alert.bg, color: KM.risk.alert.fg,
            padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 600,
          }}>{p.alerts} alertas</span>
        )}
      </div>
    </button>
  );
}

function Avatar({ name, size = 38 }) {
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('');
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: KM.surface.kpiIcon,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--serif)', fontSize: size * 0.36, fontWeight: 500,
      color: KM.brand.wine, letterSpacing: -0.3,
    }}>{initials}</div>
  );
}

// ─────────────────────────────────────────────────────────────
// Detalhe da paciente
// ─────────────────────────────────────────────────────────────
function ScreenMedicoPatientDetail({ go, patientId }) {
  const { isCompact, isMobile } = useViewport();
  const p = PACIENTES_MOCK.find(x => x.id === patientId) || PACIENTES_MOCK[0];

  // Histórico mock
  const history = [
    { day: 'Seg', sys: 122, dia: 78 },
    { day: 'Ter', sys: 124, dia: 80 },
    { day: 'Qua', sys: 128, dia: 82 },
    { day: 'Qui', sys: 132, dia: 85 },
    { day: 'Sex', sys: 134, dia: 86 },
    { day: 'Sáb', sys: 136, dia: 88 },
    { day: 'Dom', sys: p.sys, dia: p.dia },
  ];

  const recentAlerts = [
    { t: 'Hoje, 10:21', label: 'Tensão sistólica acima de 135 mmHg', level: 'alert' },
    { t: 'Ontem, 09:30', label: 'Edema reportado nos membros inferiores', level: 'watch' },
    { t: 'Há 3 dias', label: 'Proteinúria +1', level: 'watch' },
  ];

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 18,
      minHeight: 'calc(100vh - 130px)',
    }}>
      {/* Breadcrumb + back */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={() => go('patients')} style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6,
          color: KM.ink.tertiary, fontSize: 13, fontFamily: 'var(--sans)', padding: 0,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M14 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Pacientes
        </button>
      </div>

      {/* Header card */}
      <Card padding={isCompact ? 18 : 24}>
        <div style={{
          display: 'flex', alignItems: isCompact ? 'flex-start' : 'center',
          gap: 18, flexWrap: 'wrap',
          flexDirection: isMobile ? 'column' : 'row',
        }}>
          <Avatar name={p.name} size={isCompact ? 56 : 68} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <div style={{
                fontFamily: 'var(--serif)', fontSize: isCompact ? 26 : 30, fontWeight: 500,
                color: KM.ink.primary, letterSpacing: -0.6, lineHeight: 1.1,
              }}>{p.name}</div>
              <RiskBadge level={p.risk} />
            </div>
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 8,
              fontSize: 13, color: KM.ink.secondary,
            }}>
              <span><MetaInline>Idade</MetaInline> {p.age} anos</span>
              <span><MetaInline>Gestação</MetaInline> {p.week} sem · 3º trim</span>
              <span><MetaInline>Última leitura</MetaInline> {p.lastReading}</span>
              <span><MetaInline>Médica</MetaInline> {p.doctor}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            <button style={btnPrimaryDark()}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M3 4a1 1 0 011-1h2.5l1.5 4-2 1c1 2 3 4 5 5l1-2 4 1.5V15a1 1 0 01-1 1A12 12 0 013 4z" fill="#fff"/>
              </svg>
              Contactar
            </button>
          </div>
        </div>
      </Card>

      {/* Grid principal */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isCompact ? '1fr' : '2fr 1fr',
        gap: 18, flex: 1, alignItems: 'stretch',
      }}>
        {/* Coluna esquerda */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Última leitura */}
          <Card>
            <SectionTitle action={
              <span style={{ fontSize: 12, color: KM.ink.tertiary }}>Hoje, {p.lastReading}</span>
            }>Última leitura</SectionTitle>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
              gap: 12,
            }}>
              <Vital label="Tensão" value={`${p.sys}/${p.dia}`} unit="mmHg" warn={p.risk !== 'safe'} />
              <Vital label="Frequência" value={p.hr} unit="bpm" />
              <Vital label="Peso" value="71.2" unit="kg" />
              <Vital label="Glicemia" value="98" unit="mg/dL" />
            </div>
          </Card>

          {/* Tendência */}
          <Card>
            <SectionTitle action={
              <div style={{ display: 'flex', gap: 14, fontSize: 11, color: KM.ink.tertiary }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 8, height: 2, background: KM.brand.deep, borderRadius: 1 }} /> Sistólica
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 8, height: 2, background: KM.ink.tertiary, borderRadius: 1 }} /> Diastólica
                </span>
              </div>
            }>Tendência (7 dias)</SectionTitle>
            <TrendChart data={history} />
          </Card>

          {/* Notas clínicas */}
          <Card>
            <SectionTitle action={
              <button style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                color: KM.brand.deep, fontSize: 12, fontWeight: 500, fontFamily: 'var(--sans)',
              }}>+ Nova nota</button>
            }>Notas clínicas</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Note
                date="2026-04-28"
                author="Dra. Helena M."
                text="Consulta de rotina sem intercorrências. Tensão controlada. Manter vigilância semanal e repetir análises antes da próxima consulta."
              />
              <Note
                date="2026-04-14"
                author="Dra. Helena M."
                text="Paciente refere cefaleia ocasional ao final do dia. Sem alterações visuais. Continuar monitorização diária via Kairos."
              />
            </div>
          </Card>
        </div>

        {/* Coluna direita */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Risco */}
          <Card>
            <SectionTitle>Risco atual</SectionTitle>
            <RiskScore level={p.risk} score={p.risk === 'alert' ? 78 : p.risk === 'watch' ? 38 : 12} />
          </Card>

          {/* Observações sobre a paciente */}
          <PatientObservations initial={p.obs} />

          {/* Alertas recentes */}
          <Card>
            <SectionTitle action={
              <button onClick={() => go('alerts')} style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                color: KM.brand.deep, fontSize: 12, fontWeight: 500, fontFamily: 'var(--sans)',
              }}>Ver tudo</button>
            }>Alertas recentes</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {recentAlerts.map((a, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 10, alignItems: 'flex-start',
                  padding: '10px 12px', background: KM.surface.panel2,
                  borderRadius: KM.radius.sm,
                  borderLeft: `3px solid ${KM.risk[a.level].dot}`,
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, color: KM.ink.primary, lineHeight: 1.4 }}>{a.label}</div>
                    <div style={{ fontSize: 11, color: KM.ink.tertiary, marginTop: 3 }}>{a.t}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MetaInline({ children }) {
  return (
    <span style={{
      fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 1.2,
      textTransform: 'uppercase', color: KM.ink.tertiary, marginRight: 5,
    }}>{children}</span>
  );
}

function Vital({ label, value, unit, warn }) {
  return (
    <div style={{
      padding: '14px 14px',
      background: KM.surface.panel2,
      border: `1px solid ${KM.line2}`,
      borderRadius: KM.radius.md,
      position: 'relative',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <MetaLabel>{label}</MetaLabel>
        {warn && <span style={{ width: 6, height: 6, borderRadius: '50%', background: KM.risk.watch.dot }} />}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginTop: 6 }}>
        <span style={{
          fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 500,
          color: KM.ink.primary, letterSpacing: -0.5, lineHeight: 1,
        }}>{value}</span>
        <span style={{ fontSize: 11, color: KM.ink.tertiary }}>{unit}</span>
      </div>
    </div>
  );
}

function TrendChart({ data }) {
  const W = 600, H = 180, padX = 30, padY = 24;
  const minY = 60, maxY = 150;
  const x = (i) => padX + i * ((W - padX * 2) / (data.length - 1));
  const y = (v) => padY + (1 - (v - minY) / (maxY - minY)) * (H - padY * 2);

  const linePath = (key) => data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(d[key])}`).join(' ');

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
        {/* Faixa de risco — sistólica >135 */}
        <rect x={padX} y={padY} width={W - padX * 2} height={y(135) - padY}
          fill={KM.risk.alert.dot} fillOpacity="0.06" />
        {/* Grid horizontal */}
        {[80, 100, 120, 140].map(v => (
          <g key={v}>
            <line x1={padX} y1={y(v)} x2={W - padX} y2={y(v)} stroke={KM.line} strokeDasharray="2 4" />
            <text x={padX - 6} y={y(v) + 3} textAnchor="end" fontSize="9" fill={KM.ink.tertiary} fontFamily="var(--mono)">{v}</text>
          </g>
        ))}
        {/* Linhas */}
        <path d={linePath('sys')} fill="none" stroke={KM.brand.deep} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d={linePath('dia')} fill="none" stroke={KM.ink.tertiary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3" />
        {/* Pontos sistólica */}
        {data.map((d, i) => (
          <circle key={i} cx={x(i)} cy={y(d.sys)} r="3.5" fill="#fff" stroke={KM.brand.deep} strokeWidth="1.8" />
        ))}
        {/* Labels x */}
        {data.map((d, i) => (
          <text key={i} x={x(i)} y={H - 4} textAnchor="middle" fontSize="9" fill={KM.ink.tertiary} fontFamily="var(--mono)">{d.day}</text>
        ))}
      </svg>
    </div>
  );
}

function RiskScore({ level, score }) {
  const r = KM.risk[level];
  const labelMap = { safe: 'Normal', watch: 'Elevado', alert: 'Crítico' };
  const pos = Math.min(100, Math.max(0, score));

  // Decomposição mock — em produção viria do back-end
  const factors = {
    safe: [
      { name: 'Tensão arterial',  value: 8,  weight: 40 },
      { name: 'Sintomas',         value: 2,  weight: 30 },
      { name: 'Proteinúria',      value: 0,  weight: 20 },
      { name: 'Outros',           value: 2,  weight: 10 },
    ],
    watch: [
      { name: 'Tensão arterial',  value: 18, weight: 40 },
      { name: 'Sintomas',         value: 12, weight: 30 },
      { name: 'Proteinúria',      value: 4,  weight: 20 },
      { name: 'Outros',           value: 4,  weight: 10 },
    ],
    alert: [
      { name: 'Tensão arterial',  value: 34, weight: 40 },
      { name: 'Sintomas',         value: 24, weight: 30 },
      { name: 'Proteinúria',      value: 14, weight: 20 },
      { name: 'Outros',           value: 6,  weight: 10 },
    ],
  }[level];

  return (
    <div>
      {/* Score + estado */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 16,
        paddingBottom: 16, borderBottom: `1px solid ${KM.line2}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{
            fontFamily: 'var(--serif)', fontSize: 56, fontWeight: 500,
            color: r.fg, letterSpacing: -1.6, lineHeight: 0.9,
          }}>{score}</span>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: 11, color: KM.ink.tertiary,
            letterSpacing: 0.5,
          }}>/100</span>
        </div>
        <div style={{ flex: 1, paddingTop: 6 }}>
          <MetaLabel>Estado</MetaLabel>
          <div style={{
            fontFamily: 'var(--serif)', fontSize: 18, fontStyle: 'italic',
            fontWeight: 500, color: r.fg, marginTop: 4, letterSpacing: -0.3,
            lineHeight: 1.1,
          }}>{labelMap[level]}</div>
        </div>
      </div>

      {/* Barra horizontal de zonas */}
      <div style={{ marginTop: 18 }}>
        <div style={{ position: 'relative', height: 8, marginBottom: 8 }}>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 4,
            background: `linear-gradient(90deg,
              ${KM.risk.safe.dot}  0%,
              ${KM.risk.safe.dot}  30%,
              ${KM.risk.watch.dot} 30%,
              ${KM.risk.watch.dot} 70%,
              ${KM.risk.alert.dot} 70%,
              ${KM.risk.alert.dot} 100%)`,
            opacity: 0.30,
          }} />
          {/* Marcador */}
          <div style={{
            position: 'absolute', top: '50%', left: `${pos}%`,
            transform: 'translate(-50%, -50%)',
            width: 16, height: 16, borderRadius: '50%',
            background: '#fff', border: `3px solid ${r.fg}`,
            boxShadow: `0 1px 4px ${r.dot}88`,
          }} />
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: 1.2,
          textTransform: 'uppercase', color: KM.ink.tertiary, fontWeight: 500,
        }}>
          <span>0</span>
          <span style={{ position: 'absolute', left: 'calc(15% + 24px)' }}>Normal</span>
          <span style={{ position: 'absolute', left: 'calc(50% - 24px)' }}>Elevado</span>
          <span style={{ position: 'absolute', right: 'calc(15% + 16px)' }}>Crítico</span>
          <span>100</span>
        </div>
      </div>

      {/* Decomposição */}
      <div style={{ marginTop: 22 }}>
        <MetaLabel style={{ marginBottom: 10 }}>Contributo por fator</MetaLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {factors.map(f => (
            <FactorRow key={f.name} f={f} />
          ))}
        </div>
      </div>

      <div style={{
        marginTop: 16, paddingTop: 12, borderTop: `1px solid ${KM.line2}`,
        fontSize: 11, color: KM.ink.tertiary, lineHeight: 1.5,
      }}>
        Score consolidado das últimas 24h. Considera tensão, sintomas reportados
        e proteinúria.
      </div>
    </div>
  );
}

function FactorRow({ f }) {
  const pct = Math.min(100, (f.value / f.weight) * 100);
  const tone = pct < 25 ? KM.risk.safe : pct < 65 ? KM.risk.watch : KM.risk.alert;
  return (
    <div>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontSize: 12, color: KM.ink.secondary, marginBottom: 4,
      }}>
        <span>{f.name}</span>
        <span style={{ fontFamily: 'var(--mono)', color: KM.ink.primary, fontWeight: 500 }}>
          {f.value}<span style={{ color: KM.ink.tertiary }}>/{f.weight}</span>
        </span>
      </div>
      <div style={{
        height: 4, borderRadius: 2, background: KM.surface.sunken, overflow: 'hidden',
      }}>
        <div style={{
          width: `${pct}%`, height: '100%',
          background: tone.dot, borderRadius: 2,
        }} />
      </div>
    </div>
  );
}

function PatientObservations({ initial = '' }) {
  const [text, setText] = React.useState(initial);
  const [editing, setEditing] = React.useState(false);
  const [saved, setSaved] = React.useState(initial);

  React.useEffect(() => { setText(initial); setSaved(initial); setEditing(false); }, [initial]);

  const save = () => { setSaved(text); setEditing(false); };
  const cancel = () => { setText(saved); setEditing(false); };

  return (
    <Card>
      <SectionTitle action={
        !editing ? (
          <button onClick={() => setEditing(true)} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: KM.brand.deep, fontSize: 12, fontWeight: 500, fontFamily: 'var(--sans)',
            display: 'inline-flex', alignItems: 'center', gap: 4,
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M4 20h4l10-10-4-4L4 16v4z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
            </svg>
            {saved ? 'Editar' : 'Adicionar'}
          </button>
        ) : (
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={cancel} style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: KM.ink.tertiary, fontSize: 12, fontWeight: 500, fontFamily: 'var(--sans)',
            }}>Cancelar</button>
            <button onClick={save} style={{
              background: KM.ink.primary, border: 'none', cursor: 'pointer',
              color: '#fff', fontSize: 12, fontWeight: 500, fontFamily: 'var(--sans)',
              padding: '5px 10px', borderRadius: KM.radius.sm,
            }}>Guardar</button>
          </div>
        )
      }>Observações</SectionTitle>

      {editing ? (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
          rows={4}
          placeholder="Características relevantes da paciente — antecedentes, alergias, traços de comportamento, etc."
          style={{
            width: '100%', boxSizing: 'border-box', resize: 'vertical', minHeight: 100,
            padding: '10px 12px', borderRadius: KM.radius.sm,
            border: `1px solid ${KM.line}`, background: KM.surface.panel,
            fontFamily: 'var(--sans)', fontSize: 13.5, color: KM.ink.primary,
            outline: 'none', lineHeight: 1.5,
          }}
        />
      ) : saved ? (
        <div style={{
          fontSize: 13.5, color: KM.ink.secondary, lineHeight: 1.55,
          padding: '10px 12px', background: KM.surface.panel2,
          border: `1px solid ${KM.line2}`, borderRadius: KM.radius.sm,
          whiteSpace: 'pre-wrap',
        }}>{saved}</div>
      ) : (
        <div style={{
          fontSize: 13, color: KM.ink.tertiary, fontStyle: 'italic',
          padding: '14px 12px', textAlign: 'center',
          background: KM.surface.panel2, border: `1px dashed ${KM.line}`,
          borderRadius: KM.radius.sm,
        }}>
          Sem observações registadas. Clique em "Adicionar" para começar.
        </div>
      )}
    </Card>
  );
}

function Note({ date, author, text }) {
  return (
    <div style={{
      padding: '12px 14px',
      background: KM.surface.panel2,
      border: `1px solid ${KM.line2}`,
      borderRadius: KM.radius.sm,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: KM.ink.primary }}>{author}</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: KM.ink.tertiary, letterSpacing: 0.5 }}>{date}</span>
      </div>
      <div style={{ fontSize: 13, color: KM.ink.secondary, lineHeight: 1.55 }}>{text}</div>
    </div>
  );
}

function btnPrimaryDark() {
  return {
    padding: '9px 14px', borderRadius: KM.radius.sm, border: 'none',
    background: KM.ink.primary, color: '#fff',
    fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 500, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 6,
  };
}
function btnSecondary() {
  return {
    padding: '9px 14px', borderRadius: KM.radius.sm,
    background: KM.surface.panel, color: KM.ink.primary,
    border: `1px solid ${KM.line}`,
    fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 500, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 6,
  };
}

Object.assign(window, {
  ScreenMedicoPatients, ScreenMedicoPatientDetail,
  Avatar, KPI, KpiIcon, Vital, TrendChart, RiskScore, FactorRow, Note,
  PatientObservations,
  btnPrimaryDark, btnSecondary,
});

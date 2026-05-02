// medico-screens-dashboard.jsx
// Landing do portal: saudação, KPIs, alertas recentes + tabela "pacientes a vigiar".

function ScreenMedicoDashboard({ go, doctor, setPatientId }) {
  const { isCompact, isMobile } = useViewport();
  const pacientes = window.PACIENTES_MOCK || [];
  const alerts = window.ALERTS_MOCK || [];

  // KPIs derivados do mock
  const total = pacientes.length;
  const elevado = pacientes.filter(p => p.risk === 'alert').length;
  const leiturasHoje = pacientes.filter(p => /^\d/.test(p.lastReading)).length;
  const scoreMedio = Math.round(
    (pacientes.filter(p => p.risk === 'alert').length * 78 +
     pacientes.filter(p => p.risk === 'watch').length * 38 +
     pacientes.filter(p => p.risk === 'safe').length * 12) / Math.max(1, total)
  );

  // Pacientes a vigiar — não-safe + ordem por gravidade
  const watchList = [...pacientes]
    .sort((a, b) => ({ alert: 0, watch: 1, safe: 2 }[a.risk] - { alert: 0, watch: 1, safe: 2 }[b.risk]));

  // Alertas pendentes
  const pendentes = alerts.filter(a => !a.ack);
  const recentAlerts = pendentes;

  // Saudação baseada na hora
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Bom dia' : hour < 19 ? 'Boa tarde' : 'Boa noite';
  const firstName = (doctor?.name || 'Doutora').split(' ').slice(0, 2).join(' ');

  // Data em pt-PT — formato "SÁBADO, 2 MAIO" (sem "DE")
  const today = new Date();
  const weekday = today.toLocaleDateString('pt-PT', { weekday: 'long' });
  const month = today.toLocaleDateString('pt-PT', { month: 'long' });
  const dateLabel = `${weekday}, ${today.getDate()} ${month}`.toUpperCase();

  const openPatient = (id) => { setPatientId(id); go('patient-detail'); };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 22,
      minHeight: 'calc(100vh - 130px)',
    }}>
      {/* Header de saudação */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        gap: 18, flexWrap: 'wrap',
      }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: 1.6,
            textTransform: 'uppercase', color: KM.ink.tertiary, fontWeight: 500,
          }}>{dateLabel}</div>
          <div style={{
            fontFamily: 'var(--serif)', fontSize: isMobile ? 36 : 48, fontWeight: 500,
            color: KM.ink.primary, letterSpacing: -1.2, marginTop: 8,
            lineHeight: 1.05,
            fontVariationSettings: '"opsz" 24',
          }}>
            {greeting}, {firstName}
          </div>
          <div style={{
            fontSize: 14, color: KM.ink.secondary, marginTop: 8, lineHeight: 1.5,
            maxWidth: 560,
          }}>
            Tem <strong style={{ color: KM.ink.primary, fontWeight: 600 }}>{elevado} pacientes</strong> em risco elevado para acompanhar hoje.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, flexShrink: 0, flexWrap: 'wrap' }}>
          <button style={btnGhost()}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 4v12M6 10l6 6 6-6M4 20h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Exportar relatório
          </button>
          <button onClick={() => go('patients')} style={btnPrimaryGradient()}>
            Ver todas as pacientes
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
        gap: 14,
      }}>
        <KPI
          label="Pacientes ativas"
          value={total}
          tone="neutral"
          icon="people"
          sub="Em monitorização contínua"
          delta={{ value: '+2', label: 'esta semana', tone: 'up' }}
        />
        <KPI
          label="Risco elevado"
          value={elevado}
          tone="alert"
          icon="alert"
          sub="Requerem revisão"
        />
        <KPI
          label="Leituras hoje"
          value={leiturasHoje}
          tone="neutral"
          icon="pulse"
          sub={`De ${total} esperadas`}
        />
        <KPI
          label="Score médio"
          value={scoreMedio}
          tone={scoreMedio >= 60 ? 'alert' : scoreMedio >= 30 ? 'watch' : 'neutral'}
          icon="heart"
          sub="Estável vs. semana anterior"
        />
      </div>

      {/* Grelha 2 colunas — estica para preencher viewport */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isCompact ? '1fr' : '1fr 1.6fr',
        gap: 18, flex: 1, alignItems: 'stretch',
      }}>
        {/* Alertas recentes */}
        <Card padding={0} style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            padding: '22px 24px 16px',
          }}>
            <div style={{
              fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500,
              color: KM.ink.primary, letterSpacing: -0.4,
              fontVariationSettings: '"opsz" 24',
            }}>Alertas recentes</div>
            <div style={{ fontSize: 12, color: KM.brand.deep, fontWeight: 500 }}>
              {pendentes.length} novos
            </div>
          </div>
          <div style={{
            padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: 12,
            flex: 1,
          }}>
            {recentAlerts.length === 0 && (
              <div style={{ padding: 24, textAlign: 'center', color: KM.ink.tertiary, fontSize: 13 }}>
                Sem alertas pendentes.
              </div>
            )}
            {recentAlerts.map(a => <DashboardAlertCard key={a.id} a={a} onClick={() => openPatient(a.patientId)} />)}
            <div style={{ flex: 1 }} />
            <button onClick={() => go('alerts')} style={{
              background: KM.surface.sunken, border: 'none', cursor: 'pointer',
              color: KM.brand.deep, fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 500,
              padding: '12px 14px', textAlign: 'center',
              borderRadius: KM.radius.md, marginTop: 4,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
              Ver todos os alertas
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M14 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </Card>

        {/* Pacientes a vigiar */}
        <Card padding={0} style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            padding: '22px 24px 16px',
          }}>
            <div style={{
              fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500,
              color: KM.ink.primary, letterSpacing: -0.4,
              fontVariationSettings: '"opsz" 24',
            }}>Pacientes a vigiar</div>
            <button onClick={() => go('patients')} style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 500,
              color: KM.brand.deep,
              display: 'inline-flex', alignItems: 'center', gap: 4,
            }}>
              Ver todas
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {isMobile ? (
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              {watchList.map(p => <DashboardPatientCard key={p.id} p={p} onClick={() => openPatient(p.id)} />)}
            </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{
                display: 'grid', gridTemplateColumns: '2fr 1.2fr 0.8fr 1fr 1fr',
                gap: 14, padding: '12px 24px',
                borderTop: `1px solid ${KM.line2}`,
                fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 1.3,
                textTransform: 'uppercase', color: KM.ink.tertiary, fontWeight: 500,
              }}>
                <div>Paciente</div>
                <div>Semanas</div>
                <div>Score</div>
                <div>Risco</div>
                <div>Última leitura</div>
              </div>
              {watchList.map(p => <DashboardPatientRow key={p.id} p={p} onClick={() => openPatient(p.id)} />)}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function DashboardAlertCard({ a, onClick }) {
  // Paleta lavada — todos na família rosa, transição suave magenta → blush → sálvia
  const palette = {
    alert: { bg: 'rgba(217,75,149,0.16)',  border: 'rgba(217,75,149,0.26)', time: '#9E2E5C' }, // magenta
    watch: { bg: 'rgba(216,135,153,0.20)', border: 'rgba(216,135,153,0.30)', time: '#9A4854' }, // rosa mid
    safe:  { bg: 'rgba(134,164,114,0.16)', border: 'rgba(134,164,114,0.26)', time: '#4A6B3F' }, // sálvia
  };
  const p = palette[a.level] || palette.alert;
  return (
    <button onClick={onClick} style={{
      display: 'block', textAlign: 'left', width: '100%',
      padding: '16px 18px',
      background: p.bg, color: KM.ink.primary,
      border: `1px solid ${p.border}`,
      borderRadius: KM.radius.md,
      cursor: 'pointer', fontFamily: 'var(--sans)',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8,
      }}>
        <div style={{
          fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 600, color: KM.ink.primary,
          fontVariationSettings: '"opsz" 18', letterSpacing: -0.2,
        }}>
          {a.patient}
        </div>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 10, color: p.time,
          letterSpacing: 0.5, fontWeight: 500,
        }}>{(a.t || '').replace(/^Hoje, /, '')}</div>
      </div>
      <div style={{ fontSize: 13, color: KM.ink.secondary, marginTop: 6, lineHeight: 1.45 }}>
        {a.title}
      </div>
    </button>
  );
}

function DashboardPatientRow({ p, onClick }) {
  const score = p.risk === 'alert' ? (70 + Math.round(p.dia / 8)) : p.risk === 'watch' ? (35 + Math.round(p.dia / 12)) : 12;
  return (
    <button onClick={onClick} style={{
      width: '100%', textAlign: 'left',
      display: 'grid', gridTemplateColumns: '2fr 1.2fr 0.8fr 1fr 1fr',
      gap: 14, padding: '18px 24px',
      background: 'transparent', border: 'none',
      borderTop: `1px solid ${KM.line2}`,
      cursor: 'pointer', fontFamily: 'var(--sans)',
      alignItems: 'center', color: KM.ink.primary,
    }}
    onMouseEnter={(e) => e.currentTarget.style.background = KM.surface.panel2}
    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
        <Avatar name={p.name} size={38} />
        <div style={{ minWidth: 0 }}>
          <div style={{
            fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 500, letterSpacing: -0.2,
            fontVariationSettings: '"opsz" 18',
          }}>
            {p.name}
          </div>
          <div style={{ fontSize: 11, color: KM.ink.tertiary, marginTop: 2 }}>
            {p.age} anos{p.city ? ` · ${p.city}` : ''}
          </div>
        </div>
      </div>
      <div style={{ fontSize: 13, color: KM.ink.secondary }}>
        {p.week} sem · {p.week >= 28 ? '3º' : p.week >= 14 ? '2º' : '1º'} tri
      </div>
      <div style={{
        fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500,
        color: KM.brand.wine, letterSpacing: -0.6,
        fontVariationSettings: '"opsz" 24',
      }}>{score}</div>
      <div><RiskBadge level={p.risk} size="sm" /></div>
      <div style={{ fontSize: 13, color: KM.ink.secondary }}>
        {/^\d/.test(p.lastReading) ? `Hoje, ${p.lastReading}` : p.lastReading}
      </div>
    </button>
  );
}

function DashboardPatientCard({ p, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', textAlign: 'left',
      padding: '12px 18px',
      background: 'transparent', border: 'none',
      borderTop: `1px solid ${KM.line2}`,
      cursor: 'pointer', fontFamily: 'var(--sans)',
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <Avatar name={p.name} size={36} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 14, fontWeight: 500, color: KM.ink.primary }}>
          {p.name}
        </div>
        <div style={{ fontSize: 11, color: KM.ink.tertiary, marginTop: 2 }}>
          {p.week} sem · {p.lastReading}
        </div>
      </div>
      <RiskBadge level={p.risk} size="sm" />
    </button>
  );
}

// Placeholder "Em breve" para Agenda — preenche o viewport
function ScreenMedicoSoon({ title }) {
  return (
    <div style={{
      minHeight: 'calc(100vh - 130px)',
      display: 'flex', flexDirection: 'column',
    }}>
      <Card padding={48} style={{
        flex: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
          textAlign: 'center', maxWidth: 420,
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: 20,
            background: KM.surface.kpiIcon,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <rect x="3.5" y="5" width="17" height="15" rx="2" stroke={KM.brand.deep} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.5 10h17M8 3v4M16 3v4" stroke={KM.brand.deep} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{
            fontFamily: 'var(--serif)', fontSize: 32, fontWeight: 500,
            color: KM.ink.primary, letterSpacing: -0.6,
            fontVariationSettings: '"opsz" 24',
          }}>{title}</div>
          <div style={{ fontSize: 15, color: KM.ink.tertiary, lineHeight: 1.55 }}>
            Esta secção estará disponível em breve. Permitirá agendar consultas,
            definir lembretes e sincronizar com o calendário do hospital.
          </div>
        </div>
      </Card>
    </div>
  );
}

function btnPrimaryGradient() {
  return {
    padding: '11px 20px', borderRadius: KM.radius.md, border: 'none',
    background: KM.brand.gradient, color: '#fff',
    fontFamily: 'var(--sans)', fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
    boxShadow: `0 6px 18px ${KM.brand.coral}55`,
    display: 'inline-flex', alignItems: 'center', gap: 6,
  };
}
function btnGhost() {
  return {
    padding: '11px 18px', borderRadius: KM.radius.md,
    background: KM.surface.panel, color: KM.ink.primary,
    border: `1px solid ${KM.line}`,
    fontFamily: 'var(--sans)', fontSize: 13.5, fontWeight: 500, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 8,
  };
}

Object.assign(window, {
  ScreenMedicoDashboard, ScreenMedicoSoon,
  DashboardAlertCard, DashboardPatientRow, DashboardPatientCard,
  btnPrimaryGradient, btnGhost,
});

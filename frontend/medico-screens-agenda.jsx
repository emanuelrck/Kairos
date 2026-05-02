// medico-screens-agenda.jsx
// Página de Agenda — calendário mensal simples + lista de próximas consultas.

const APPOINTMENTS_MOCK = [
  { id: 'c1', date: '2026-05-04', time: '10:30', patient: 'Maria Silva',     week: 28, type: 'Consulta de rotina',     risk: 'alert' },
  { id: 'c2', date: '2026-05-06', time: '14:00', patient: 'Joana Almeida',   week: 36, type: 'Acompanhamento risco',   risk: 'alert' },
  { id: 'c3', date: '2026-05-12', time: '09:00', patient: 'Ana Pereira',     week: 22, type: 'Ecografia 22 semanas',   risk: 'watch' },
];

window.APPOINTMENTS_MOCK = APPOINTMENTS_MOCK;

function ScreenMedicoAgenda() {
  const { isCompact, isMobile } = useViewport();
  const [cursor, setCursor] = React.useState(() => {
    const t = new Date();
    return new Date(t.getFullYear(), t.getMonth(), 1);
  });
  const [selected, setSelected] = React.useState(() => {
    const t = new Date();
    return new Date(t.getFullYear(), t.getMonth(), t.getDate()).toISOString().slice(0, 10);
  });

  const monthLabel = cursor.toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' });

  // Dias do mês a apresentar — incluindo padding inicial para alinhar com Segunda
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // pt-PT: Segunda = 0
  const startWeekday = (firstDay.getDay() + 6) % 7;

  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const apptByDate = {};
  for (const a of APPOINTMENTS_MOCK) {
    apptByDate[a.date] = apptByDate[a.date] || [];
    apptByDate[a.date].push(a);
  }

  const todayISO = new Date().toISOString().slice(0, 10);
  const dateISO = (d) => `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  const upcoming = [...APPOINTMENTS_MOCK]
    .filter(a => a.date >= todayISO)
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));

  const navMonth = (delta) => {
    setCursor(c => new Date(c.getFullYear(), c.getMonth() + delta, 1));
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 22,
      minHeight: 'calc(100vh - 130px)',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        gap: 18, flexWrap: 'wrap',
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: 1.6,
            textTransform: 'uppercase', color: KM.ink.tertiary, fontWeight: 500,
          }}>Agenda</div>
          <div style={{
            fontFamily: 'var(--serif)', fontSize: isMobile ? 32 : 40, fontWeight: 500,
            color: KM.ink.primary, letterSpacing: -1, marginTop: 6, lineHeight: 1.05,
            fontVariationSettings: '"opsz" 24',
          }}>
            Próximas consultas
          </div>
          <div style={{ fontSize: 14, color: KM.ink.secondary, marginTop: 8, lineHeight: 1.5 }}>
            Tem <strong style={{ color: KM.ink.primary, fontWeight: 600 }}>{upcoming.length} consultas</strong> agendadas para os próximos dias.
          </div>
        </div>

        <button onClick={() => alert('Marcar nova consulta')} style={{
          padding: '11px 20px', borderRadius: KM.radius.md, border: 'none',
          background: KM.brand.gradient, color: '#fff',
          fontFamily: 'var(--sans)', fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
          boxShadow: `0 6px 18px ${KM.brand.coral}55`,
          display: 'inline-flex', alignItems: 'center', gap: 8,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Marcar consulta
        </button>
      </div>

      {/* Grelha 2 colunas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isCompact ? '1fr' : '1.6fr 1fr',
        gap: 18, flex: 1, alignItems: 'stretch',
      }}>
        {/* Calendário */}
        <Card padding={0} style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '20px 24px 14px',
          }}>
            <div style={{
              fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500,
              color: KM.ink.primary, letterSpacing: -0.4,
              fontVariationSettings: '"opsz" 24',
              textTransform: 'capitalize',
            }}>
              {monthLabel}
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <CalNavBtn direction="prev" onClick={() => navMonth(-1)} />
              <button onClick={() => {
                const t = new Date();
                setCursor(new Date(t.getFullYear(), t.getMonth(), 1));
                setSelected(t.toISOString().slice(0, 10));
              }} style={{
                padding: '7px 12px', borderRadius: KM.radius.sm,
                background: KM.surface.sunken, border: 'none', cursor: 'pointer',
                fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 500, color: KM.ink.secondary,
              }}>Hoje</button>
              <CalNavBtn direction="next" onClick={() => navMonth(1)} />
            </div>
          </div>

          {/* Cabeçalho dos dias da semana */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
            padding: '4px 16px 8px', gap: 2,
          }}>
            {['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'].map(w => (
              <div key={w} style={{
                fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 1.4,
                textTransform: 'uppercase', color: KM.ink.tertiary, fontWeight: 500,
                textAlign: 'center', padding: '8px 0',
              }}>{w}</div>
            ))}
          </div>

          {/* Grelha dos dias */}
          <div style={{
            flex: 1, display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 2, padding: '0 16px 20px',
          }}>
            {cells.map((d, i) => {
              if (d === null) return <div key={i} />;
              const iso = dateISO(d);
              const appts = apptByDate[iso] || [];
              const isToday = iso === todayISO;
              const isSelected = iso === selected;
              return (
                <button key={i} onClick={() => setSelected(iso)} style={{
                  position: 'relative',
                  aspectRatio: '1', minHeight: 56,
                  background: isSelected ? KM.brand.coral
                            : isToday    ? KM.surface.kpiIcon
                            : 'transparent',
                  color: isSelected ? '#fff'
                       : isToday    ? KM.brand.wine
                       : KM.ink.primary,
                  border: 'none', borderRadius: KM.radius.md, cursor: 'pointer',
                  fontFamily: 'var(--sans)', fontSize: 14,
                  fontWeight: (isSelected || isToday) ? 600 : 400,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 3,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => { if (!isSelected && !isToday) e.currentTarget.style.background = KM.surface.panel2; }}
                onMouseLeave={(e) => { if (!isSelected && !isToday) e.currentTarget.style.background = 'transparent'; }}>
                  <span>{d}</span>
                  {appts.length > 0 && (
                    <div style={{ display: 'flex', gap: 3 }}>
                      {appts.slice(0, 3).map((a, idx) => (
                        <span key={idx} style={{
                          width: 5, height: 5, borderRadius: '50%',
                          background: isSelected ? '#fff' : KM.risk[a.risk].dot,
                        }} />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Lista de próximas consultas */}
        <Card padding={0} style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{
            padding: '20px 24px 14px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          }}>
            <div style={{
              fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 500,
              color: KM.ink.primary, letterSpacing: -0.3,
              fontVariationSettings: '"opsz" 24',
            }}>Próximas</div>
            <div style={{ fontSize: 12, color: KM.ink.tertiary }}>
              {upcoming.length} consultas
            </div>
          </div>

          <div style={{
            padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1,
          }}>
            {upcoming.length === 0 && (
              <div style={{ padding: 24, textAlign: 'center', color: KM.ink.tertiary, fontSize: 13 }}>
                Sem consultas agendadas.
              </div>
            )}
            {upcoming.map(a => <AppointmentRow key={a.id} a={a} />)}
          </div>
        </Card>
      </div>
    </div>
  );
}

function CalNavBtn({ direction, onClick }) {
  return (
    <button onClick={onClick} aria-label={direction === 'prev' ? 'Mês anterior' : 'Mês seguinte'} style={{
      width: 32, height: 32, borderRadius: KM.radius.sm,
      background: KM.surface.sunken, border: 'none', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: KM.ink.secondary,
    }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        {direction === 'prev'
          ? <path d="M14 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          : <path d="M10 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>}
      </svg>
    </button>
  );
}

function AppointmentRow({ a }) {
  const r = KM.risk[a.risk];
  const d = new Date(a.date + 'T00:00:00');
  const dayLabel = d.toLocaleDateString('pt-PT', { weekday: 'short', day: 'numeric', month: 'short' });
  return (
    <div style={{
      display: 'flex', gap: 12, alignItems: 'center',
      padding: '12px 14px',
      background: KM.surface.panel2, border: `1px solid ${KM.line2}`,
      borderRadius: KM.radius.md,
    }}>
      {/* Bloco de data */}
      <div style={{
        width: 56, flexShrink: 0,
        background: KM.surface.kpiIcon, borderRadius: KM.radius.sm,
        padding: '8px 6px', textAlign: 'center',
        border: `1px solid ${r.dot}33`,
      }}>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: 1.2,
          textTransform: 'uppercase', color: KM.brand.wine, fontWeight: 600,
        }}>{d.toLocaleDateString('pt-PT', { month: 'short' }).replace('.', '')}</div>
        <div style={{
          fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500,
          color: KM.brand.wine, lineHeight: 1, marginTop: 2,
          fontVariationSettings: '"opsz" 18',
        }}>{d.getDate()}</div>
      </div>

      {/* Detalhe */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: r.dot }} />
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 1.2,
            textTransform: 'uppercase', color: KM.ink.tertiary, fontWeight: 500 }}>
            {a.time} · {dayLabel}
          </span>
        </div>
        <div style={{
          fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 600,
          color: KM.ink.primary, letterSpacing: -0.2,
          fontVariationSettings: '"opsz" 18',
        }}>{a.patient}</div>
        <div style={{ fontSize: 12, color: KM.ink.secondary, marginTop: 2 }}>
          {a.type} · {a.week} sem
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenMedicoAgenda, AppointmentRow, CalNavBtn });

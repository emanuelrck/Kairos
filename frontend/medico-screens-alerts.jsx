// medico-screens-alerts.jsx
// Feed de alertas com triagem (acknowledge / abrir paciente).

const ALERTS_MOCK = [
  { id: 'a1', t: 'Hoje, 10:21', patientId: 'p1', patient: 'Maria Silva',     week: 28, level: 'alert', title: 'Tensão sistólica 138 mmHg', desc: 'Acima do limite com cefaleia reportada.', ack: false },
  { id: 'a2', t: 'Hoje, 09:48', patientId: 'p7', patient: 'Joana Almeida',   week: 36, level: 'alert', title: 'Tensão 144/92 mmHg + visão turva', desc: 'Combinação compatível com pré-eclâmpsia. Avaliação urgente.', ack: false },
  { id: 'a3', t: 'Hoje, 08:30', patientId: 'p2', patient: 'Ana Pereira',     week: 22, level: 'watch', title: 'Edema nos tornozelos', desc: 'Reportado pela paciente esta manhã.', ack: false },
  { id: 'a4', t: 'Ontem',       patientId: 'p5', patient: 'Beatriz Costa',   week: 30, level: 'watch', title: 'Proteinúria +1', desc: 'Tira reativa positiva. Repetir em 48h.', ack: true },
  { id: 'a5', t: 'Há 2 dias',   patientId: 'p1', patient: 'Maria Silva',     week: 28, level: 'watch', title: 'Aumento de peso fora do esperado', desc: '+1.4 kg numa semana.', ack: true },
];

function ScreenMedicoAlerts({ go, setPatientId }) {
  const { isCompact, isMobile } = useViewport();
  const [tab, setTab] = React.useState('open');
  const [items, setItems] = React.useState(ALERTS_MOCK);

  const visible = items.filter(a => tab === 'all' ? true : tab === 'open' ? !a.ack : a.ack);
  const openCount = items.filter(a => !a.ack).length;
  const ackCount = items.filter(a => a.ack).length;

  const ack = (id) => setItems(arr => arr.map(a => a.id === id ? { ...a, ack: true } : a));
  const openPatient = (pid) => { setPatientId(pid); go('patient-detail'); };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 18,
      minHeight: 'calc(100vh - 130px)',
    }}>
      {/* Tabs */}
      <Card padding={0} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          padding: '12px 14px',
          borderBottom: `1px solid ${KM.line2}`, flexWrap: 'wrap',
        }}>
          {[
            { k: 'open', label: 'Por triar', count: openCount },
            { k: 'ack',  label: 'Triados',   count: ackCount },
            { k: 'all',  label: 'Todos',     count: items.length },
          ].map(t => (
            <button key={t.k} onClick={() => setTab(t.k)} style={{
              padding: '7px 12px', borderRadius: KM.radius.sm, border: 'none', cursor: 'pointer',
              background: tab === t.k ? KM.surface.sunken : 'transparent',
              color: tab === t.k ? KM.ink.primary : KM.ink.tertiary,
              fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 500,
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              {t.label}
              <span style={{
                fontFamily: 'var(--mono)', fontSize: 10,
                padding: '1px 6px', borderRadius: 999,
                background: tab === t.k ? '#fff' : KM.surface.sunken,
                color: KM.ink.tertiary,
              }}>{t.count}</span>
            </button>
          ))}
        </div>

        {/* Lista */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {visible.length === 0 && (
            <div style={{ padding: 40, textAlign: 'center', color: KM.ink.tertiary, fontSize: 13 }}>
              Sem alertas {tab === 'open' ? 'pendentes' : ''}.
            </div>
          )}
          {visible.map(a => (
            <AlertRow key={a.id}
              a={a}
              isCompact={isMobile}
              onOpen={() => openPatient(a.patientId)}
              onAck={() => ack(a.id)}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}

function AlertRow({ a, isCompact, onOpen, onAck }) {
  const r = KM.risk[a.level];
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isCompact ? '1fr' : 'auto 1fr auto',
      gap: 16, padding: '16px 18px',
      borderBottom: `1px solid ${KM.line2}`,
      alignItems: isCompact ? 'stretch' : 'center',
      opacity: a.ack ? 0.65 : 1,
    }}>
      {/* Indicador + paciente */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: isCompact ? 0 : 200 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, flexShrink: 0,
          background: r.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 3l10 18H2L12 3z" stroke={r.fg} strokeWidth="1.7" strokeLinejoin="round" />
            <path d="M12 10v4M12 17.5v.5" stroke={r.fg} strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 14, fontWeight: 500, color: KM.ink.primary }}>{a.patient}</div>
          <div style={{ fontSize: 11, color: KM.ink.tertiary, marginTop: 1 }}>
            Semana {a.week} · {a.t}
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 14, color: KM.ink.primary, fontWeight: 500, lineHeight: 1.4 }}>{a.title}</div>
        <div style={{ fontSize: 12, color: KM.ink.tertiary, marginTop: 4, lineHeight: 1.5 }}>{a.desc}</div>
      </div>

      {/* Ações */}
      <div style={{
        display: 'flex', gap: 8, flexShrink: 0,
        justifyContent: isCompact ? 'flex-end' : 'flex-end',
      }}>
        <button onClick={onOpen} style={btnSecondary()}>
          Abrir paciente
        </button>
        {!a.ack && (
          <button onClick={onAck} style={btnPrimaryDark()}>
            Triar
          </button>
        )}
        {a.ack && (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 10px', fontSize: 12, color: KM.risk.safe.fg,
            background: KM.risk.safe.bg, borderRadius: KM.radius.sm, fontWeight: 500,
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Triado
          </span>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { ScreenMedicoAlerts, ALERTS_MOCK });

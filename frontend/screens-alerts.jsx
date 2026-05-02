// screens-alerts.jsx
// Página de Alertas (notificações)

const KA = window.KAIROS;

function ScreenAlerts({ go }) {
  const items = [
    {
      kind: 'warn', unread: true,
      title: 'Risco moderado detetado',
      body: 'A sua tensão arterial subiu para 138/89. Recomendamos contactar a Dra. Helena nas próximas 24 horas.',
      time: '02 de maio às 10:21',
    },
    {
      kind: 'warn', unread: true,
      title: 'Proteinúria em traços',
      body: 'Detetámos uma alteração subtil na tira urinária. Mantenha a hidratação e registe novamente amanhã.',
      time: '01 de maio às 10:21',
    },
    {
      kind: 'good', unread: false,
      title: 'Boa semana ❤',
      body: 'Os seus valores estiveram estáveis durante 7 dias. Continue assim!',
      time: '25 de abril às 10:21',
    },
    {
      kind: 'info', unread: false,
      title: 'Lembrete de consulta',
      body: 'Tem consulta com a Dra. Helena Pereira no dia 12 de maio às 15:00.',
      time: '20 de abril às 09:00',
    },
  ];

  return (
    <div style={{
      height: '100%',
      background: `linear-gradient(180deg, ${KA.pink.blush} 0%, ${KA.pink.powder} 280px, ${KA.paper} 520px)`,
      paddingTop: 60, paddingBottom: 110, overflow: 'auto', boxSizing: 'border-box',
    }}>
      <div style={{ padding: '14px 24px 18px' }}>
        <div style={{ fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: 1.4, textTransform: 'uppercase', color: KA.ink3, fontWeight: 500 }}>
          Notificações
        </div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 400, color: KA.pink.wine, marginTop: 2, letterSpacing: -0.8, lineHeight: 1 }}>
          Alertas
        </div>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map((it, i) => <AlertCard key={i} {...it}/>)}
      </div>

      <TabBar active="alert" go={go} />
    </div>
  );
}

function AlertCard({ kind, unread, title, body, time }) {
  const icons = {
    warn: { bg: '#FBEFD9', fg: '#C99334', svg: <><path d="M12 4l9 16H3L12 4z" stroke="#C99334" strokeWidth="1.8" fill="#FBE5B8" strokeLinejoin="round"/><path d="M12 11v4M12 18v.5" stroke="#C99334" strokeWidth="1.8" strokeLinecap="round"/></> },
    good: { bg: '#E5F0E1', fg: '#5C8A4F', svg: <path d="M12 19s-7-4.5-7-10a3.5 3.5 0 017-2 3.5 3.5 0 017 2c0 5.5-7 10-7 10z" stroke="#5C8A4F" strokeWidth="1.8" fill="#CFE2C3" strokeLinejoin="round"/> },
    info: { bg: '#E5EAF5', fg: '#4F6BA0', svg: <><circle cx="12" cy="12" r="9" stroke="#4F6BA0" strokeWidth="1.8" fill="#D4DDF0"/><path d="M12 8v.5M12 11v6" stroke="#4F6BA0" strokeWidth="1.8" strokeLinecap="round"/></> },
  };
  const ic = icons[kind];

  return (
    <div style={{
      background: '#fff', borderRadius: 22, padding: '16px 18px',
      boxShadow: '0 2px 14px rgba(122,15,77,0.05)',
      display: 'flex', gap: 14, position: 'relative',
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: '50%',
        background: ic.bg, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">{ic.svg}</svg>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: 'var(--serif)', fontSize: 17, fontWeight: 500,
          color: KA.pink.wine, letterSpacing: -0.3, lineHeight: 1.2,
        }}>{title}</div>
        <div style={{
          fontFamily: 'var(--sans)', fontSize: 13, lineHeight: 1.5,
          color: KA.ink2, marginTop: 6,
        }}>{body}</div>
        <div style={{
          fontFamily: 'var(--sans)', fontSize: 11, color: KA.ink3, marginTop: 10,
        }}>{time}</div>
      </div>
      {unread && (
        <div style={{
          position: 'absolute', top: 16, right: 16,
          width: 8, height: 8, borderRadius: '50%', background: KA.pink.coral,
        }}/>
      )}
    </div>
  );
}

Object.assign(window, { ScreenAlerts, AlertCard });

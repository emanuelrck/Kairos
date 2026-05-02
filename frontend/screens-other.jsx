// screens-other.jsx
// Histórico/Tendências, Alerta crítico, Perfil

const KO = window.KAIROS;

// ───────────────────────────────────────────────
// Histórico / Tendências
// ───────────────────────────────────────────────
function ScreenHistory({ go }) {
  const [tab, setTab] = React.useState('bp');

  return (
    <div style={{
      height: '100%',
      background: `linear-gradient(180deg, ${KO.pink.blush} 0%, ${KO.pink.powder} 280px, ${KO.paper} 520px)`,
      paddingTop: 60, paddingBottom: 110, overflow: 'auto', boxSizing: 'border-box',
    }}>
      {/* Header — matches Dashboard/Alerts pattern */}
      <div style={{ padding: '14px 24px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: 1.4, textTransform: 'uppercase', color: KO.ink3, fontWeight: 500 }}>
            Últimos 7 dias
          </div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 400, color: KO.pink.wine, marginTop: 2, letterSpacing: -0.8, lineHeight: 1 }}>
            Tendências
          </div>
        </div>
      </div>

      {/* Score evolution card */}
      <div style={{ padding: '0 20px' }}>
        <div style={{
          background: '#fff', borderRadius: 22, padding: '18px 20px',
          boxShadow: '0 2px 14px rgba(122,15,77,0.05)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: 1.2, textTransform: 'uppercase', color: KO.ink3, fontWeight: 500 }}>
                Score médio · 7 dias
              </div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 44, fontWeight: 500, color: KO.pink.wine, letterSpacing: -1.5, lineHeight: 1, marginTop: 4 }}>
                14<span style={{ fontSize: 20 }}>%</span>
              </div>
            </div>
            <div style={{
              fontFamily: 'var(--sans)', fontSize: 12, color: '#9B4D55', fontWeight: 600,
              background: '#FBE6EE', padding: '6px 10px', borderRadius: 999,
            }}>↘ 3% vs semana anterior</div>
          </div>
          <Sparkline />
        </div>
      </div>

      {/* Vital tabs */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', gap: 6, padding: 4, background: '#fff', borderRadius: 14, boxShadow: '0 2px 14px rgba(122,15,77,0.05)' }}>
          {[
            { k: 'bp', t: 'Tensão' },
            { k: 'hr', t: 'Frequência' },
            { k: 'weight', t: 'Peso' },
          ].map(o => (
            <button key={o.k} onClick={() => setTab(o.k)} style={{
              flex: 1, height: 36, borderRadius: 10, border: 'none',
              background: tab === o.k ? KO.pink.powder : 'transparent',
              fontFamily: 'var(--sans)', fontSize: 13,
              fontWeight: tab === o.k ? 600 : 500,
              color: tab === o.k ? KO.pink.wine : KO.ink3,
              cursor: 'pointer',
            }}>{o.t}</button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div style={{ padding: '12px 20px 0' }}>
        <div style={{
          background: '#fff', borderRadius: 22, padding: '18px 20px',
          boxShadow: '0 2px 14px rgba(122,15,77,0.05)',
        }}>
          {tab === 'bp' && <BPChart />}
          {tab === 'hr' && <LineChart data={[78,76,80,82,79,77,78]} unit="bpm" min={60} max={100} color={KO.pink.coral} />}
          {tab === 'weight' && <LineChart data={[67.5,67.7,67.9,68.0,68.0,68.1,68.2]} unit="kg" min={66} max={70} color={KO.pink.deep} />}
        </div>
      </div>

      {/* Recent readings list */}
      <div style={{ padding: '24px 20px 0' }}>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500, color: KO.pink.wine, letterSpacing: -0.4, marginBottom: 12, padding: '0 4px' }}>
          Leituras recentes
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <ReadingRow date="Hoje · 06:15" risk="safe" score={12} bp="118/76" />
          <ReadingRow date="Ontem · 07:02" risk="safe" score={14} bp="122/78" />
          <ReadingRow date="Qua · 06:48" risk="watch" score={32} bp="135/86" />
          <ReadingRow date="Ter · 07:20" risk="safe" score={18} bp="124/80" />
          <ReadingRow date="Seg · 06:32" risk="safe" score={15} bp="120/77" />
        </div>
      </div>

      <TabBar active="history" go={go} />
    </div>
  );
}

function Sparkline() {
  const data = [22, 18, 28, 32, 18, 14, 12];
  const w = 280, h = 64;
  const max = 40, min = 0;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * h;
    return [x, y];
  });
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');
  const fill = `${path} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} style={{ marginTop: 12, display: 'block' }}>
      <defs>
        <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={KO.pink.coral} stopOpacity="0.35"/>
          <stop offset="100%" stopColor={KO.pink.coral} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={fill} fill="url(#spark)"/>
      <path d={path} stroke={KO.pink.deep} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={i === pts.length - 1 ? 4 : 2.5}
          fill={i === pts.length - 1 ? KO.pink.deep : '#fff'}
          stroke={KO.pink.deep} strokeWidth="2"/>
      ))}
    </svg>
  );
}

function BPChart() {
  const w = 300, h = 180;
  const days = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];
  const sysData = [122, 118, 135, 124, 120, 119, 118];
  const diaData = [80, 78, 86, 80, 77, 76, 76];
  const max = 150, min = 60;
  const px = (i) => 30 + (i / 6) * (w - 50);
  const py = (v) => 16 + (1 - (v - min) / (max - min)) * (h - 50);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 12, color: KO.ink3 }}>Tensão arterial</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 500, color: KO.ink, lineHeight: 1, marginTop: 4 }}>
            120<span style={{ fontSize: 16, color: KO.ink3 }}>/77</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: KO.ink3, marginLeft: 6 }}>mmHg méd.</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, fontFamily: 'var(--sans)', fontSize: 11 }}>
          <span style={{ color: KO.pink.deep }}>● Sistólica</span>
          <span style={{ color: KO.pink.coral }}>● Diastólica</span>
        </div>
      </div>
      <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} style={{ marginTop: 12, overflow: 'visible' }}>
        {/* threshold band 140 sys = pre-eclampsia line */}
        <line x1={30} y1={py(140)} x2={w-20} y2={py(140)} stroke={KO.risk.alert.dot} strokeOpacity="0.4" strokeDasharray="3,3"/>
        <text x={w-20} y={py(140)-4} textAnchor="end" fontFamily="var(--mono)" fontSize="9" fill={KO.risk.alert.dot}>140 / pré-ecl.</text>

        {/* y axis labels */}
        {[80, 100, 120, 140].map(v => (
          <text key={v} x={6} y={py(v)+3} fontFamily="var(--mono)" fontSize="9" fill={KO.ink4}>{v}</text>
        ))}

        {/* sys line */}
        <path d={sysData.map((v,i) => `${i===0?'M':'L'} ${px(i)} ${py(v)}`).join(' ')}
          stroke={KO.pink.deep} strokeWidth="2" fill="none" strokeLinecap="round"/>
        {sysData.map((v,i) => (
          <circle key={'s'+i} cx={px(i)} cy={py(v)} r="3" fill={KO.pink.deep}/>
        ))}

        {/* dia line */}
        <path d={diaData.map((v,i) => `${i===0?'M':'L'} ${px(i)} ${py(v)}`).join(' ')}
          stroke={KO.pink.coral} strokeWidth="2" fill="none" strokeLinecap="round"/>
        {diaData.map((v,i) => (
          <circle key={'d'+i} cx={px(i)} cy={py(v)} r="3" fill={KO.pink.coral}/>
        ))}

        {/* x days */}
        {days.map((d,i) => (
          <text key={i} x={px(i)} y={h-4} textAnchor="middle" fontFamily="var(--mono)" fontSize="10" fill={KO.ink3}>{d}</text>
        ))}
      </svg>
    </div>
  );
}

function LineChart({ data, unit, min, max, color }) {
  const w = 300, h = 180;
  const days = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];
  const px = (i) => 30 + (i / (data.length-1)) * (w - 50);
  const py = (v) => 16 + (1 - (v - min) / (max - min)) * (h - 50);
  return (
    <div>
      <div>
        <div style={{ fontFamily: 'var(--sans)', fontSize: 12, color: KO.ink3 }}>Média</div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 500, color: KO.ink, lineHeight: 1, marginTop: 4 }}>
          {(data.reduce((a,b) => a+b, 0)/data.length).toFixed(1)}
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: KO.ink3, marginLeft: 6 }}>{unit}</span>
        </div>
      </div>
      <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} style={{ marginTop: 8 }}>
        <path d={data.map((v,i) => `${i===0?'M':'L'} ${px(i)} ${py(v)}`).join(' ')}
          stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/>
        {data.map((v,i) => (
          <circle key={i} cx={px(i)} cy={py(v)} r="3" fill={color}/>
        ))}
        {days.map((d,i) => (
          <text key={i} x={px(i)} y={h-4} textAnchor="middle" fontFamily="var(--mono)" fontSize="10" fill={KO.ink3}>{d}</text>
        ))}
      </svg>
    </div>
  );
}

function ReadingRow({ date, risk, score, bp }) {
  const r = KO.risk[risk];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '14px 16px', borderRadius: 18,
      background: '#fff',
      boxShadow: '0 2px 14px rgba(122,15,77,0.05)',
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        background: r.bg, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: r.dot }}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 500, color: KO.pink.wine, letterSpacing: -0.2 }}>{date}</div>
        <div style={{ fontFamily: 'var(--sans)', fontSize: 12, color: KO.ink3, marginTop: 2 }}>{bp} mmHg · score {score}%</div>
      </div>
      <svg width="7" height="12" viewBox="0 0 7 12"><path d="M1 1l5 5-5 5" stroke={KO.ink4} strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
    </div>
  );
}

// ───────────────────────────────────────────────
// Alert (critical)
// ───────────────────────────────────────────────
function ScreenAlert({ go }) {
  const [pulse, setPulse] = React.useState(false);
  React.useEffect(() => {
    const t = setInterval(() => setPulse(p => !p), 1200);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{
      height: '100%',
      background: `linear-gradient(180deg, #F7DEDC 0%, #E8B5B0 100%)`,
      paddingTop: 60, boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Pulsing ring */}
      <div style={{ position: 'relative', marginTop: 50 }}>
        <div style={{
          position: 'absolute', inset: -20, borderRadius: '50%',
          background: '#C7515144', transform: pulse ? 'scale(1.4)' : 'scale(1)',
          opacity: pulse ? 0 : 0.6, transition: 'all 1.2s ease-out',
        }} />
        <div style={{
          width: 100, height: 100, borderRadius: '50%',
          background: '#8B2E2E', display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', zIndex: 1,
          boxShadow: '0 8px 30px rgba(139,46,46,0.4)',
        }}>
          <svg width="40" height="40" viewBox="0 0 40 40">
            <path d="M20 8v16M20 30v2" stroke="#fff" strokeWidth="3.5" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      <div style={{ padding: '32px 32px 0', textAlign: 'center', maxWidth: 340 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: '#8B2E2E', opacity: 0.8 }}>
          Alerta · Risco elevado
        </div>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 500, color: '#5F2A33', margin: '12px 0 0', letterSpacing: -0.8, lineHeight: 1.1 }}>
          Contacte já a sua obstetra
        </h1>
        <div style={{ fontFamily: 'var(--sans)', fontSize: 14, lineHeight: '20px', color: '#5F2A33', opacity: 0.85, marginTop: 14 }}>
          Tensão de <b>148/96</b> com cefaleia forte e alterações visuais. A combinação destes sinais requer avaliação médica imediata.
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ width: '100%', padding: '20px 24px 40px', display: 'flex', flexDirection: 'column', gap: 10, boxSizing: 'border-box' }}>
        <button style={{
          width: '100%', height: 64, borderRadius: 18, border: 'none',
          background: '#8B2E2E', color: '#fff',
          fontFamily: 'var(--sans)', fontSize: 17, fontWeight: 600, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          boxShadow: '0 8px 24px rgba(139,46,46,0.35)',
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20"><path d="M3 4a1 1 0 011-1h2.5l1.5 4-2 1c1 2 3 4 5 5l1-2 4 1.5V15a1 1 0 01-1 1A12 12 0 013 4z" fill="#fff"/></svg>
          Ligar à Dra. Ana Costa
        </button>
        <button style={{
          width: '100%', height: 52, borderRadius: 16, border: '1px solid rgba(95,42,51,0.3)',
          background: 'rgba(255,255,255,0.5)', color: '#5F2A33',
          fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 500, cursor: 'pointer',
        }}>Ligar 112 · Emergência</button>
        <button onClick={() => go('dashboard')} style={{
          width: '100%', height: 44, borderRadius: 14, border: 'none',
          background: 'transparent', color: '#5F2A33', opacity: 0.7,
          fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 500, cursor: 'pointer',
        }}>Voltar (não recomendado)</button>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────
// Profile
// ───────────────────────────────────────────────
function ScreenProfile({ go }) {
  return (
    <div style={{
      height: '100%',
      background: `linear-gradient(180deg, ${KO.pink.blush} 0%, ${KO.pink.powder} 280px, ${KO.paper} 520px)`,
      paddingTop: 60, paddingBottom: 110, overflow: 'auto', boxSizing: 'border-box',
    }}>
      {/* Header — matches Dashboard/Alerts pattern */}
      <div style={{ padding: '14px 24px 18px' }}>
        <div style={{ fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: 1.4, textTransform: 'uppercase', color: KO.ink3, fontWeight: 500 }}>
          A minha conta
        </div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 400, color: KO.pink.wine, marginTop: 2, letterSpacing: -0.8, lineHeight: 1 }}>
          Perfil
        </div>
      </div>

      {/* Identity card */}
      <div style={{ padding: '0 20px' }}>
        <div style={{
          background: '#fff', borderRadius: 22, padding: '18px 20px',
          display: 'flex', alignItems: 'center', gap: 16,
          boxShadow: '0 2px 14px rgba(122,15,77,0.05)',
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: `linear-gradient(135deg, ${KO.pink.rose}, ${KO.pink.coral})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 500,
            flexShrink: 0,
          }}>MS</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500, color: KO.pink.wine, letterSpacing: -0.4, lineHeight: 1.1 }}>Maria Silva</div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: 12, color: KO.ink3, marginTop: 4 }}>32 anos · Lisboa</div>
          </div>
        </div>
      </div>

      {/* Pregnancy */}
      <div style={{ padding: '20px 20px 0' }}>
        <ProfileSection title="Gravidez" />
        <ProfileCard rows={[
          ['Semana atual', '24 sem'],
          ['Data prevista parto', '14 Ago 2026'],
          ['Trimestre', '2º'],
          ['Primeira gravidez', 'Sim'],
        ]} />
      </div>

      {/* Health team */}
      <div style={{ padding: '20px 20px 0' }}>
        <ProfileSection title="Equipa de saúde" />
        <div style={{
          background: '#fff', borderRadius: 22, padding: 18,
          boxShadow: '0 2px 14px rgba(122,15,77,0.05)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: KO.pink.blush,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: KO.pink.deep, fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 600,
            }}>AC</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 500, color: KO.pink.wine, letterSpacing: -0.2 }}>Dra. Ana Costa</div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: 12, color: KO.ink3, marginTop: 2 }}>Obstetra · Maternidade A. da Costa</div>
            </div>
          </div>
          <div style={{
            marginTop: 14, padding: '10px 12px', borderRadius: 12,
            background: KO.pink.blush,
            fontFamily: 'var(--sans)', fontSize: 12, color: KO.pink.deep,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: KO.pink.coral }} />
            Recebe alertas em tempo real do seu score de risco.
          </div>
        </div>
      </div>

      {/* History */}
      <div style={{ padding: '20px 20px 0' }}>
        <ProfileSection title="Antecedentes" />
        <ProfileCard rows={[
          ['Pré-eclâmpsia anterior', 'Não'],
          ['Histórico familiar', 'Sim · mãe'],
          ['Hipertensão crónica', 'Não'],
          ['Diabetes', 'Não'],
        ]} />
      </div>

      {/* Account */}
      <div style={{ padding: '20px 20px 24px' }}>
        <ProfileSection title="Conta" />
        <ProfileCard rows={[
          ['Email', 'maria.silva@email.pt'],
          ['Notificações', 'Ativadas'],
          ['Idioma', 'Português'],
          ['Modelo de risco', 'XGBoost · v2.4'],
        ]} />
      </div>

      {/* Sign out */}
      <div style={{ padding: '0 20px 28px' }}>
        <button onClick={() => go('welcome')} style={{
          width: '100%', padding: '15px 18px', borderRadius: 18,
          border: `1px solid ${KO.line}`, background: '#fff',
          fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 500,
          color: KO.pink.wine, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          boxShadow: '0 2px 10px rgba(122,15,77,0.04)',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M15 4h3a2 2 0 012 2v12a2 2 0 01-2 2h-3M10 17l-5-5 5-5M5 12h12" stroke={KO.pink.wine} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Terminar sessão
        </button>
        <div style={{
          marginTop: 14, textAlign: 'center',
          fontFamily: 'var(--sans)', fontSize: 11, color: KO.ink3,
        }}>
          Kairos · v1.0.0
        </div>
      </div>

      <TabBar active="profile" go={go} />
    </div>
  );
}

function ProfileSection({ title }) {
  return (
    <div style={{
      fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500,
      color: KO.pink.wine, letterSpacing: -0.4,
      marginBottom: 12, padding: '0 4px',
    }}>{title}</div>
  );
}

function ProfileCard({ rows }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 22,
      boxShadow: '0 2px 14px rgba(122,15,77,0.05)',
      overflow: 'hidden',
    }}>
      {rows.map(([k, v], i) => (
        <div key={i} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '14px 18px',
          borderTop: i > 0 ? `1px solid ${KO.pink.blush}` : 'none',
        }}>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 13, color: KO.ink3 }}>{k}</span>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, color: KO.pink.wine }}>{v}</span>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, {
  ScreenHistory, ScreenAlert, ScreenProfile, ProfileCard, ReadingRow,
});

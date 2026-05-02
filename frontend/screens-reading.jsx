// screens-reading.jsx
// Nova Leitura: 3 passos (vitais, sintomas, proteinúria) + resultado

const KR = window.KAIROS;

const PINK_BG = `linear-gradient(180deg, ${KR.pink.blush} 0%, ${KR.pink.powder} 280px, ${KR.paper} 520px)`;
const PINK_BTN = `linear-gradient(135deg, ${KR.pink.coral} 0%, ${KR.pink.deep} 100%)`;

// ───────────────────────────────────────────────
// STEP 1 — Sinais vitais
// ───────────────────────────────────────────────
function ScreenReading1({ go, data, setData }) {
  return (
    <FlowShell step={1} onBack={() => go('dashboard')}>
      <Eyebrow>Passo 1 de 3</Eyebrow>
      <FlowTitle>Sinais vitais</FlowTitle>

      <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <BPHero
          sys={data.sys} dia={data.dia}
          onSys={(v) => setData({ ...data, sys: v })}
          onDia={(v) => setData({ ...data, dia: v })}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <VitalTile icon="heart" label="FC" value={data.hr} unit="bpm"
            onChange={(v) => setData({ ...data, hr: v })} min={40} max={180} />
          <VitalTile icon="scale" label="Peso" value={data.weight} unit="kg" decimals={1}
            onChange={(v) => setData({ ...data, weight: v })} min={40} max={150} step={0.1} />
          <VitalTile icon="thermo" label="Temp." value={data.temp} unit="°C" decimals={1}
            onChange={(v) => setData({ ...data, temp: v })} min={35} max={42} step={0.1} />
          <VitalTile icon="drop" label="Glicemia" value={data.glu} unit="mg/dL"
            onChange={(v) => setData({ ...data, glu: v })} min={40} max={400} />
        </div>
      </div>

      <FlowFooter>
        <ContinueBtn onClick={() => go('reading2')}>Continuar</ContinueBtn>
      </FlowFooter>
    </FlowShell>
  );
}

// ───────────────────────────────────────────────
// STEP 2 — Sintomas
// ───────────────────────────────────────────────
function ScreenReading2({ go, data, setData }) {
  return (
    <FlowShell step={2} onBack={() => go('reading1')}>
      <Eyebrow>Passo 2 de 3</Eyebrow>
      <FlowTitle>Sintomas</FlowTitle>

      <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SymptomCard label="Cefaleia (dor de cabeça)" value={data.head}
          onChange={(v) => setData({ ...data, head: v })} />
        <SymptomCard label="Dor epigástrica" value={data.epi}
          onChange={(v) => setData({ ...data, epi: v })} />
        <SymptomCard label="Edema (inchaço)" value={data.edema}
          onChange={(v) => setData({ ...data, edema: v })} />
        <CheckCard
          label="Alterações visuais (visão turva, manchas)"
          value={data.visual}
          onChange={(v) => setData({ ...data, visual: v })} />
      </div>

      <FlowFooter>
        <ContinueBtn onClick={() => go('reading3')}>Continuar</ContinueBtn>
      </FlowFooter>
    </FlowShell>
  );
}

// ───────────────────────────────────────────────
// STEP 3 — Proteinúria
// ───────────────────────────────────────────────
const PROTEIN_OPTIONS = [
  { k: 'neg',    title: 'Negativo', sub: 'Sem proteínas detetadas' },
  { k: 'trace',  title: 'Traços',   sub: 'Pequena quantidade' },
  { k: 'plus1',  title: '+',        sub: 'Quantidade ligeira' },
  { k: 'plus2',  title: '++',       sub: 'Quantidade moderada' },
  { k: 'plus3',  title: '+++',      sub: 'Quantidade elevada' },
];

function ScreenReading3({ go, data, setData }) {
  const value = data.proteinuria || 'plus1';
  return (
    <FlowShell step={3} onBack={() => go('reading2')}>
      <Eyebrow>Passo 3 de 3</Eyebrow>
      <FlowTitle>Proteinúria</FlowTitle>
      <div style={{
        fontFamily: 'var(--sans)', fontSize: 14, color: KR.ink2, marginTop: 14,
      }}>Selecione o resultado da tira urinária:</div>

      <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {PROTEIN_OPTIONS.map(o => (
          <RadioCard key={o.k}
            title={o.title} sub={o.sub}
            selected={value === o.k}
            onClick={() => setData({ ...data, proteinuria: o.k })} />
        ))}
      </div>

      <FlowFooter>
        <ContinueBtn onClick={() => go('reading4')}>Calcular risco</ContinueBtn>
      </FlowFooter>
    </FlowShell>
  );
}

// ───────────────────────────────────────────────
// STEP 4 — Resultado
// ───────────────────────────────────────────────
// STEP 4 — Resultado (cinematic dark)
// ───────────────────────────────────────────────
function ScreenReading4({ go, riskLevel, score }) {
  const messages = {
    safe:  'Os seus valores estão dentro do esperado para a sua idade gestacional. Bom trabalho.',
    watch: 'Detetámos sinais a vigiar. Repita a leitura em algumas horas e contacte o seu obstetra se persistir.',
    alert: 'A combinação de tensão elevada com sintomas requer avaliação médica imediata.',
  };
  const labels = { safe: 'Tudo bem', watch: 'Atenção', alert: 'Risco elevado' };
  const verdicts = {
    safe:  { glow: '#D4798A', text: '#5F2A33', accent: '#9B4D55', deep: '#5F2A33' },
    watch: { glow: '#D89060', text: '#5C3320', accent: '#A06448', deep: '#5C3320' },
    alert: { glow: '#C24050', text: '#4A1822', accent: '#8B2E3A', deep: '#4A1822' },
  };
  const v = verdicts[riskLevel];
  const bg = `linear-gradient(180deg, ${KR.pink.blush} 0%, ${KR.pink.powder} 60%, ${KR.pink.rose} 100%)`;

  return (
    <div style={{
      height: '100%', background: bg,
      paddingTop: 60, boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      position: 'relative', color: v.text,
    }}>
      {/* Radial aura behind score */}
      <div style={{
        position: 'absolute', top: '15%', left: '50%',
        transform: 'translate(-50%, -25%)',
        width: 480, height: 480, borderRadius: '50%',
        background: `radial-gradient(circle, ${v.glow}55 0%, ${v.glow}22 35%, transparent 65%)`,
        filter: 'blur(10px)', pointerEvents: 'none',
      }}/>

      {/* Subtle grain */}
      <svg style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        opacity: 0.05, pointerEvents: 'none', mixBlendMode: 'multiply',
      }}>
        <filter id="r4noise"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2"/></filter>
        <rect width="100%" height="100%" filter="url(#r4noise)"/>
      </svg>

      {/* Top edge labels */}
      <div style={{
        padding: '18px 28px 0',
        display: 'flex', justifyContent: 'space-between',
        position: 'relative', zIndex: 2,
      }}>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 2,
          textTransform: 'uppercase', color: v.text, opacity: 0.4,
        }}>Kairos / 02·05·26</div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 2,
          textTransform: 'uppercase', color: v.glow, opacity: 0.85,
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: '50%', background: v.glow,
            boxShadow: `0 0 10px ${v.glow}, 0 0 18px ${v.glow}80`,
          }}/>
          Live
        </div>
      </div>

      {/* Hero */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        position: 'relative', zIndex: 2, padding: '0 24px',
      }}>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: 3,
          textTransform: 'uppercase', color: v.text, opacity: 0.5,
        }}>Score · Risco</div>

        <div style={{
          fontFamily: 'var(--serif)', fontWeight: 400,
          fontSize: 220, lineHeight: 0.86, letterSpacing: -10,
          color: v.glow, marginTop: 4,
          textShadow: `0 0 30px ${v.glow}50, 0 2px 4px ${v.glow}30`,
        }}>{score}</div>

        <div style={{
          fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: 1.5,
          color: v.text, opacity: 0.5, marginTop: 6,
        }}>/ 100</div>

        <div style={{
          width: 32, height: 1, marginTop: 26,
          background: `linear-gradient(90deg, transparent 0%, ${v.glow}80 50%, transparent 100%)`,
        }}/>

        <div style={{
          fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400,
          fontSize: 36, letterSpacing: -0.6, lineHeight: 1,
          color: v.text, marginTop: 22,
        }}>{labels[riskLevel]}</div>

        <div style={{
          fontFamily: 'var(--sans)', fontSize: 13, lineHeight: 1.55,
          color: v.text, opacity: 0.65, textAlign: 'center',
          marginTop: 16, maxWidth: 280, letterSpacing: 0.1,
        }}>{messages[riskLevel]}</div>
      </div>

      {/* Vital snapshot row at bottom */}
      <div style={{
        padding: '0 28px 16px',
        display: 'flex', justifyContent: 'space-between',
        position: 'relative', zIndex: 2,
      }}>
        {[
          { label: 'TA', value: '118/76' },
          { label: 'FC', value: '78' },
          { label: 'PROT', value: 'NEG' },
        ].map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: 2,
              color: v.text, opacity: 0.4,
            }}>{s.label}</div>
            <div style={{
              fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 400,
              color: v.text, opacity: 0.85, marginTop: 4, letterSpacing: -0.2,
            }}>{s.value}</div>
          </div>
        ))}
      </div>

      {(riskLevel === 'watch' || riskLevel === 'alert') && (
        <div style={{
          padding: '0 28px 14px', position: 'relative', zIndex: 2,
          fontFamily: 'var(--sans)', fontSize: 11, color: v.glow,
          opacity: 0.85, textAlign: 'center', letterSpacing: 0.3,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <div style={{
            width: 4, height: 4, borderRadius: '50%', background: v.glow,
            boxShadow: `0 0 8px ${v.glow}`,
          }}/>
          Aviso enviado à Dra. Helena
        </div>
      )}

      {/* CTAs */}
      <div style={{
        padding: '12px 24px 32px',
        display: 'flex', flexDirection: 'column', gap: 8,
        flexShrink: 0, position: 'relative', zIndex: 2,
      }}>
        <button onClick={() => go(riskLevel === 'alert' ? 'alert' : 'dashboard')} style={{
          width: '100%', padding: '16px 18px', borderRadius: 22, border: 'none',
          background: `linear-gradient(135deg, ${v.accent} 0%, ${v.deep} 100%)`,
          color: '#fff', cursor: 'pointer',
          fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 600,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          boxShadow: `0 10px 30px ${v.accent}80`,
        }}>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path d="M3 4l3 1 1 4-2 1c1 3 3 5 6 6l1-2 4 1 1 3a1 1 0 01-1 1c-7 0-13-6-13-13a1 1 0 011-1z" fill="#fff"/>
          </svg>
          Contactar Dra. Helena
        </button>
        <button onClick={() => go('dashboard')} style={{
          width: '100%', padding: '13px 18px', borderRadius: 16, border: 'none',
          background: 'transparent', color: v.text, opacity: 0.55, cursor: 'pointer',
          fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 500, letterSpacing: 0.2,
        }}>Voltar ao início</button>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────
// Shell helpers
// ───────────────────────────────────────────────
function FlowShell({ step, onBack, children }) {
  return (
    <div style={{
      height: '100%', background: PINK_BG,
      display: 'flex', flexDirection: 'column', paddingTop: 60, boxSizing: 'border-box',
    }}>
      <div style={{
        padding: '14px 24px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <button onClick={onBack} style={{
          width: 40, height: 40, borderRadius: '50%', border: 'none',
          background: '#fff', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(122,15,77,0.08)',
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16"><path d="M10 3L4 8l6 5" stroke={KR.pink.wine} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <StepDots step={step} />
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '12px 24px 16px' }}>
        {children}
      </div>
    </div>
  );
}

function StepDots({ step }) {
  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      {[1,2,3].map(i => (
        <div key={i} style={{
          width: i === step ? 28 : 18, height: 5, borderRadius: 3,
          background: i === step ? KR.pink.deep : (i < step ? KR.pink.coral : 'rgba(155,77,85,0.18)'),
          transition: 'all 0.2s',
        }}/>
      ))}
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <div style={{
      fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: 1.4, textTransform: 'uppercase',
      color: KR.ink3, fontWeight: 500, marginTop: 8,
    }}>{children}</div>
  );
}

function FlowTitle({ children }) {
  return (
    <h1 style={{
      fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 400,
      color: KR.pink.wine, margin: '2px 0 0', letterSpacing: -0.8, lineHeight: 1,
    }}>{children}</h1>
  );
}

function FlowFooter({ children }) {
  return (
    <div style={{ padding: '12px 24px 36px' }}>{children}</div>
  );
}

function ContinueBtn({ onClick, children }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', padding: '16px 18px', borderRadius: 22, border: 'none',
      background: PINK_BTN, color: '#fff', cursor: 'pointer',
      fontFamily: 'var(--sans)', fontSize: 16, fontWeight: 600, letterSpacing: -0.1,
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      boxShadow: `0 10px 24px ${KR.pink.coral}40`,
    }}>
      {children}
      <svg width="18" height="18" viewBox="0 0 18 18"><path d="M3 9h12M11 4l5 5-5 5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </button>
  );
}

// ───────────────────────────────────────────────
// BP hero card (top of step 1)
// ───────────────────────────────────────────────
function BPHero({ sys, dia, onSys, onDia }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 22, padding: '16px 20px 18px',
      boxShadow: '0 10px 26px rgba(122,15,77,0.06)',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: 1.4, textTransform: 'uppercase',
        color: KR.ink3, fontWeight: 600,
      }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M1 8h3l1.5-4 3 8 1.5-4H15" stroke={KR.pink.deep} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Tensão arterial
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 12 }}>
        <BPField label="Sistólica" value={sys} onChange={onSys} min={70} max={220}/>
        <BPField label="Diastólica" value={dia} onChange={onDia} min={40} max={140}/>
      </div>
    </div>
  );
}

function BPField({ label, value, onChange, min, max }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--sans)', fontSize: 12, color: KR.ink3, marginBottom: 6 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <input
          type="text" inputMode="numeric" value={value}
          onChange={(e) => { const v = parseInt(e.target.value, 10); if (!isNaN(v)) onChange(Math.min(max, Math.max(min, v))); }}
          style={{
            border: `1px solid ${KR.line2}`, background: '#FFF7FA', borderRadius: 12,
            padding: '8px 10px', width: '100%', minWidth: 0, boxSizing: 'border-box',
            fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 500,
            color: KR.pink.wine, letterSpacing: -1, outline: 'none', textAlign: 'left',
          }}
        />
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: KR.ink3, flexShrink: 0 }}>mmHg</span>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────
// Vital tile (2x2 grid item on step 1)
// ───────────────────────────────────────────────
function VitalTile({ icon, label, value, unit, onChange, min, max, step = 1, decimals = 0 }) {
  const I = {
    heart: <path d="M10 16s-6-4-6-9a3 3 0 016-1 3 3 0 016 1c0 5-6 9-6 9z" stroke={KR.pink.deep} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>,
    scale: <><path d="M4 7h12l-1 9a2 2 0 01-2 2H7a2 2 0 01-2-2L4 7z" stroke={KR.pink.deep} strokeWidth="1.5" fill="none" strokeLinejoin="round"/><path d="M7 7V5a3 3 0 016 0v2" stroke={KR.pink.deep} strokeWidth="1.5" fill="none"/></>,
    thermo: <path d="M10 3a2 2 0 00-2 2v7a3 3 0 104 0V5a2 2 0 00-2-2z" stroke={KR.pink.deep} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>,
    drop: <path d="M10 3s-5 5-5 9a5 5 0 0010 0c0-4-5-9-5-9z" stroke={KR.pink.deep} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>,
  };
  const display = decimals > 0 ? value.toFixed(decimals).replace('.', ',') : String(value);
  return (
    <div style={{
      background: '#fff', borderRadius: 22, padding: '14px 16px 14px',
      boxShadow: '0 6px 18px rgba(122,15,77,0.05)', minWidth: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">{I[icon]}</svg>
        <span style={{ fontFamily: 'var(--sans)', fontSize: 13, color: KR.ink2, fontWeight: 500 }}>{label}</span>
      </div>
      <div
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          const v = parseFloat(e.target.textContent.replace(',', '.'));
          if (!isNaN(v)) onChange(Math.min(max, Math.max(min, v)));
          else e.target.textContent = display;
        }}
        style={{
          fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 500,
          color: KR.pink.wine, letterSpacing: -1.2, marginTop: 10,
          lineHeight: 1, outline: 'none',
        }}>{display}</div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: KR.ink3, marginTop: 6 }}>{unit}</div>
    </div>
  );
}

// ───────────────────────────────────────────────
// Symptom card (step 2)
// ───────────────────────────────────────────────
function SymptomCard({ label, value, onChange }) {
  // value 0..100 → 0..5 scale display
  const scaleVal = Math.round(value / 20);
  // tint shifts from pink to amber at high
  const tint = value >= 60 ? '#D9A04A' : KR.pink.deep;
  return (
    <div style={{
      background: '#fff', borderRadius: 22, padding: '16px 18px 18px',
      boxShadow: '0 6px 18px rgba(122,15,77,0.05)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontFamily: 'var(--sans)', fontSize: 14, color: KR.ink, fontWeight: 500 }}>{label}</div>
        <div style={{
          fontFamily: 'var(--serif)', fontSize: 26, fontWeight: 500,
          color: tint, lineHeight: 1, fontStyle: 'italic',
        }}>{scaleVal}</div>
      </div>
      <div style={{ position: 'relative', height: 28, marginTop: 14 }}>
        <div style={{
          position: 'absolute', top: 12, left: 0, right: 0, height: 4, borderRadius: 2,
          background: 'rgba(155,77,85,0.14)',
        }}/>
        <div style={{
          position: 'absolute', top: 12, left: 0, height: 4, borderRadius: 2,
          width: `${value}%`, background: KR.pink.deep,
        }}/>
        <input type="range" min={0} max={100} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            opacity: 0, cursor: 'pointer', margin: 0,
          }}/>
        <div style={{
          position: 'absolute', top: 4, left: `calc(${value}% - 10px)`,
          width: 20, height: 20, borderRadius: '50%',
          background: '#fff', border: `2.4px solid ${KR.pink.deep}`,
          boxShadow: '0 2px 6px rgba(217,75,149,0.25)',
          pointerEvents: 'none',
        }}/>
      </div>
      <div style={{
        marginTop: 8, display: 'flex', justifyContent: 'space-between',
        fontFamily: 'var(--sans)', fontSize: 11, color: KR.ink3,
      }}>
        <span>Nada</span><span>Moderado</span><span>Intenso</span>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────
// Check card (step 2 — visual changes)
// ───────────────────────────────────────────────
function CheckCard({ label, value, onChange }) {
  return (
    <button onClick={() => onChange(!value)} style={{
      background: '#fff', borderRadius: 22, padding: '16px 18px',
      boxShadow: '0 6px 18px rgba(122,15,77,0.05)',
      border: 'none', cursor: 'pointer', textAlign: 'left',
      display: 'flex', alignItems: 'center', gap: 12, width: '100%',
    }}>
      <div style={{
        flex: 1, fontFamily: 'var(--sans)', fontSize: 14, color: KR.ink, fontWeight: 500,
      }}>{label}</div>
      <div style={{
        width: 22, height: 22, borderRadius: '50%',
        border: `1.6px solid ${value ? KR.pink.deep : 'rgba(155,77,85,0.35)'}`,
        background: value ? KR.pink.deep : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        {value && <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff' }}/>}
      </div>
    </button>
  );
}

// ───────────────────────────────────────────────
// Radio card (step 3 — proteinuria)
// ───────────────────────────────────────────────
function RadioCard({ title, sub, selected, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', textAlign: 'left', cursor: 'pointer',
      background: selected ? 'rgba(255,255,255,0.7)' : '#fff',
      border: selected ? `1.8px solid ${KR.pink.deep}` : '1px solid rgba(155,77,85,0.10)',
      borderRadius: 18, padding: '14px 18px',
      display: 'flex', alignItems: 'center', gap: 12,
      boxShadow: selected ? '0 6px 18px rgba(217,75,149,0.10)' : '0 4px 12px rgba(122,15,77,0.04)',
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 500,
          color: KR.pink.wine, lineHeight: 1.1,
        }}>{title}</div>
        <div style={{
          fontFamily: 'var(--sans)', fontSize: 12, color: KR.ink3, marginTop: 3,
        }}>{sub}</div>
      </div>
      <div style={{
        width: 22, height: 22, borderRadius: '50%',
        border: `1.8px solid ${selected ? KR.pink.deep : 'rgba(155,77,85,0.30)'}`,
        background: selected ? KR.pink.deep : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        {selected && <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff' }}/>}
      </div>
    </button>
  );
}

// ───────────────────────────────────────────────
// Severity scale — distinctive 3-tier vertical display
// ───────────────────────────────────────────────
function SeverityScale({ score, riskLevel }) {
  const zones = [
    { k: 'safe',  label: 'Tudo bem',    range: '0 – 30',   color: '#D88FA0', bg: 'rgba(216,143,160,0.18)', fg: '#9B4D55' },
    { k: 'watch', label: 'Atenção',     range: '31 – 65',  color: '#D9A04A', bg: 'rgba(217,160,74,0.20)',  fg: '#8A5A1A' },
    { k: 'alert', label: 'Risco elevado', range: '66 – 100', color: '#C75151', bg: 'rgba(199,81,81,0.18)',  fg: '#8B2E2E' },
  ];

  return (
    <div style={{ marginTop: 28, width: '100%', maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {zones.map(z => {
        const active = z.k === riskLevel;
        return (
          <div key={z.k} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: active ? '14px 16px' : '8px 16px',
            background: active ? z.bg : 'transparent',
            borderRadius: 16,
            border: active ? `1.5px solid ${z.color}` : '1px solid rgba(155,77,85,0.10)',
            transition: 'all 0.3s',
          }}>
            {/* Marker column */}
            <div style={{ width: 22, display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
              {active ? (
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 0 0 3px ${z.color}, 0 4px 10px ${z.color}40`,
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: z.color }}/>
                </div>
              ) : (
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: z.color, opacity: 0.4 }}/>
              )}
            </div>
            {/* Label */}
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: 'var(--serif)', fontStyle: active ? 'italic' : 'normal',
                fontSize: active ? 18 : 15, fontWeight: 500,
                color: active ? z.fg : KR.ink3,
                lineHeight: 1,
                letterSpacing: -0.2,
              }}>{z.label}</div>
            </div>
            {/* Range */}
            <div style={{
              fontFamily: 'var(--mono)', fontSize: active ? 13 : 11,
              color: active ? z.fg : KR.ink4, fontWeight: 500,
              flexShrink: 0,
            }}>
              {active && <span style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 500, marginRight: 6 }}>{score}</span>}
              <span style={{ opacity: active ? 0.6 : 1 }}>{z.range}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ───────────────────────────────────────────────
// Severity ribbon (legacy)
// ───────────────────────────────────────────────
function SeverityRibbon({ score, fg }) {
  // 3 zones: 0-30 safe, 30-65 watch, 65-100 alert
  const zones = [
    { label: 'Tudo bem',    color: '#D88FA0', range: [0, 30] },
    { label: 'Atenção',     color: '#D9A04A', range: [30, 65] },
    { label: 'Risco',       color: '#C75151', range: [65, 100] },
  ];
  const totalRange = 100;
  return (
    <div style={{ width: '100%', maxWidth: 320, marginTop: 26 }}>
      <div style={{ position: 'relative', height: 14 }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', borderRadius: 7, overflow: 'hidden' }}>
          {zones.map((z, i) => (
            <div key={i} style={{
              flex: z.range[1] - z.range[0],
              background: z.color, opacity: 0.35,
            }}/>
          ))}
        </div>
        {/* marker */}
        <div style={{
          position: 'absolute', top: -4, left: `calc(${score}% - 11px)`,
          width: 22, height: 22, borderRadius: '50%',
          background: '#fff', border: `3px solid ${fg}`,
          boxShadow: '0 4px 12px rgba(122,15,77,0.20)',
        }}/>
      </div>
      <div style={{
        marginTop: 10, display: 'flex', justifyContent: 'space-between',
        fontFamily: 'var(--sans)', fontSize: 11, color: KR.ink3, fontWeight: 500,
      }}>
        {zones.map((z, i) => (
          <span key={i} style={{ flex: z.range[1] - z.range[0], textAlign: i === 0 ? 'left' : i === zones.length - 1 ? 'right' : 'center' }}>
            {z.label}
          </span>
        ))}
      </div>
      <div style={{ position: 'relative', marginTop: 4, height: 12 }}>
        {[0, 30, 65, 100].map(t => (
          <span key={t} style={{
            position: 'absolute', left: `${t}%`, transform: 'translateX(-50%)',
            fontFamily: 'var(--mono)', fontSize: 9, color: KR.ink4,
          }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────
// Result gauge (legacy, kept for any callers)
// ───────────────────────────────────────────────
function ResultGauge({ score, color, fg, label }) {
  const w = 220, h = 140;
  const cx = w / 2, cy = h - 14;
  const r = 88, stroke = 14;
  const startAngle = -180;
  const endAngle = -180 + (score / 100) * 180;
  const arc = (a1, a2) => {
    const r1 = a1 * Math.PI / 180, r2 = a2 * Math.PI / 180;
    const x1 = cx + r * Math.cos(r1), y1 = cy + r * Math.sin(r1);
    const x2 = cx + r * Math.cos(r2), y2 = cy + r * Math.sin(r2);
    const large = Math.abs(a2 - a1) > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  };
  return (
    <div style={{ position: 'relative', width: w, height: h + 8 }}>
      <svg width={w} height={h + 8}>
        <path d={arc(startAngle, 0)} stroke="rgba(255,255,255,0.55)" strokeWidth={stroke} fill="none" strokeLinecap="round"/>
        <path d={arc(startAngle, endAngle)} stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round"/>
      </svg>
      <div style={{
        position: 'absolute', inset: 0, top: 28,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        pointerEvents: 'none',
      }}>
        <div style={{
          fontFamily: 'var(--sans)', fontSize: 10, letterSpacing: 1.6, textTransform: 'uppercase',
          color: KR.ink3, fontWeight: 500,
        }}>Risco hoje</div>
        <div style={{
          fontFamily: 'var(--serif)', fontSize: 50, fontWeight: 500,
          color: fg, lineHeight: 1, marginTop: 4, letterSpacing: -1.5,
        }}>{score}</div>
        <div style={{ fontFamily: 'var(--sans)', fontSize: 11, color: KR.ink3, marginTop: 2 }}>/100</div>
        <div style={{
          fontFamily: 'var(--sans)', fontSize: 13, color: fg, marginTop: 4, fontWeight: 600,
        }}>{label}</div>
      </div>
    </div>
  );
}

Object.assign(window, {
  ScreenReading1, ScreenReading2, ScreenReading3, ScreenReading4,
  SeverityRibbon, SeverityScale,
});

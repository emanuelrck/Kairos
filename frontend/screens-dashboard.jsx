// screens-dashboard.jsx — refeito segundo referência (Maio 2026)

const KD = window.KAIROS;

function ScreenDashboard({ go, riskLevel = 'watch', score = 58, showPercent = true, indicator = 'gauge' }) {
  const r = KD.risk[riskLevel];
  const messages = {
    safe: { title: 'Tudo normal', sub: 'Os seus valores estão dentro do esperado. Continue com a sua rotina e meça novamente amanhã de manhã.' },
    watch: { title: 'Atenção', sub: 'Detetámos sinais a vigiar. Repita a leitura em algumas horas e contacte o seu obstetra se persistir.' },
    alert: { title: 'Risco elevado', sub: 'A combinação de sinais hoje requer avaliação médica imediata. Contacte já a sua obstetra.' }
  };
  const msg = messages[riskLevel];
  const labelMap = { safe: 'Tudo bem', watch: 'Atenção', alert: 'Urgente' };

  return (
    <div style={{
      height: '100%',
      background: `linear-gradient(180deg, ${KD.pink.blush} 0%, ${KD.pink.powder} 240px, ${KD.paper} 480px)`,
      paddingTop: 60, paddingBottom: 110, overflow: 'auto', boxSizing: 'border-box'
    }}>
      {/* Greeting header */}
      <div style={{ padding: '14px 24px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: 1.4, textTransform: 'uppercase', color: KD.ink3, fontWeight: 500 }}>
            Bom dia
          </div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 400, color: KD.pink.wine, marginTop: 2, letterSpacing: -0.8, lineHeight: 1 }}>
            Maria
          </div>
        </div>
        <button onClick={() => go('alert')} style={{
          width: 44, height: 44, borderRadius: '50%', border: 'none',
          background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(122,15,77,0.08)'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M6 16V11a6 6 0 0112 0v5l1.5 2h-15L6 16z" stroke={KD.pink.wine} strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M10 20a2 2 0 004 0" stroke={KD.pink.wine} strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <div style={{
            position: 'absolute', top: 10, right: 11, width: 8, height: 8, borderRadius: '50%',
            background: KD.pink.coral, border: '1.5px solid #fff'
          }} />
        </button>
      </div>

      {/* Pregnancy week pill */}
      <div style={{ padding: '0 20px' }}>
        <div style={{
          background: '#fff', borderRadius: 22, padding: '12px 14px',
          display: 'flex', alignItems: 'center', gap: 12,
          boxShadow: '0 2px 14px rgba(122,15,77,0.05)'
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: KD.pink.blush,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24"><path d="M12 21s-7-4.5-7-10a4.5 4.5 0 017-3.7A4.5 4.5 0 0119 11c0 5.5-7 10-7 10z" fill={KD.pink.coral} /></svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--sans)', fontSize: 11, color: KD.ink3, letterSpacing: 0.2 }}>Semana de gestação</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 17, fontWeight: 500, color: KD.pink.wine, marginTop: 1, letterSpacing: -0.3 }}>
              Semana 28 · 3º trimestre
            </div>
          </div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 11, color: KD.ink3, textAlign: 'right', flexShrink: 0, lineHeight: 1.3 }}>
            12 sem.<br />para o parto
          </div>
        </div>
      </div>

      {/* Risk gauge card */}
      <div style={{ padding: '14px 20px 0' }}>
        {indicator === 'bold' ? (
          <RiskBold score={score} riskLevel={riskLevel} msg={msg} go={go} />
        ) : (
        <div style={{
          background: '#fff', borderRadius: 26, padding: '24px 22px 22px',
          boxShadow: '0 2px 20px rgba(122,15,77,0.06)'
        }}>
          <RiskIndicator score={score} riskLevel={riskLevel} indicator={indicator} />
          <div style={{
            fontFamily: 'var(--serif)', fontSize: 16, lineHeight: 1.5,
            color: KD.ink2, textAlign: 'center', marginTop: 18, padding: '0 8px'
          }}>{msg.sub}</div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
            <button onClick={() => go('alert')} style={{
              padding: '12px 22px', borderRadius: 999, border: 'none',
              background: r.bg, color: r.fg,
              fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 600,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8
            }}>
              <svg width="16" height="16" viewBox="0 0 20 20"><path d="M3 4a1 1 0 011-1h2.5l1.5 4-2 1c1 2 3 4 5 5l1-2 4 1.5V15a1 1 0 01-1 1A12 12 0 013 4z" fill={r.fg} /></svg>
              Contactar Dra. Helena
            </button>
          </div>
        </div>
        )}
      </div>

      {/* Last reading */}
      <div style={{ padding: '24px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12, padding: '0 4px' }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500, color: KD.pink.wine, letterSpacing: -0.4 }}>
            Última leitura
          </div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 12, color: KD.ink3 }}>Hoje, 10:21</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <VitalCard icon="pulse" label="Tensão" value="138/89" unit="mmHg" warn />
          <VitalCard icon="heart" label="Frequência" value="84" unit="bpm" />
          <VitalCard icon="scale" label="Peso" value="71.2" unit="kg" />
          <VitalCard icon="drop" label="Glicemia" value="98" unit="mg/dL" />
        </div>
      </div>

      {/* New reading CTA */}
      <div style={{ padding: '20px 20px 0' }}>
        <button onClick={() => go('reading1')} style={{
          width: '100%', padding: '16px 18px', borderRadius: 22, border: 'none',
          background: `linear-gradient(135deg, ${KD.pink.coral} 0%, ${KD.pink.deep} 100%)`,
          color: '#fff', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 14,
          boxShadow: `0 10px 24px ${KD.pink.coral}40`
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(255,255,255,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M3 12h3l2-5 4 10 2-5h7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontFamily: 'var(--sans)', fontSize: 16, fontWeight: 600, letterSpacing: -0.1 }}>
              Registar nova leitura
            </div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: 12, opacity: 0.85, marginTop: 2 }}>
              Demora menos de 60 segundos
            </div>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24"><path d="M5 12h14M14 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
        </button>
      </div>

      {/* Disclaimer */}
      <div style={{
        padding: '18px 32px 0',
        fontFamily: 'var(--sans)', fontSize: 12, lineHeight: 1.5,
        color: KD.ink3, textAlign: 'center'
      }}>
        Triagem, não diagnóstico. Em caso de dúvida, contacte sempre o seu obstetra.
      </div>

      <TabBar active="dashboard" go={go} />
    </div>);

}

// BOLD — full-bleed dramatic statement card (centered, maximum presence)
function RiskBold({ score, riskLevel, msg, go }) {
  // Per-level palette: bg gradient, decorative blob color, ink color
  const palettes = {
    safe: {
      bgFrom: '#F5C9D2', bgTo: '#D87890',
      blob: '#F0AABA', ink: '#4A1A26', accent: '#9B2D4A',
      ctaBg: '#5F2A33', ctaInk: '#fff',
      label: 'Tudo bem'
    },
    watch: {
      bgFrom: '#F8DBA8', bgTo: '#DC8A4A',
      blob: '#F2C284', ink: '#4A2A0E', accent: '#A0541A',
      ctaBg: '#5C3320', ctaInk: '#fff',
      label: 'Atenção'
    },
    alert: {
      bgFrom: '#F0A8A8', bgTo: '#C84545',
      blob: '#E88A8A', ink: '#3A0E18', accent: '#8B1F2C',
      ctaBg: '#4A1822', ctaInk: '#fff',
      label: 'Risco elevado'
    },
  };
  const p = palettes[riskLevel];

  return (
    <div style={{
      borderRadius: 32,
      background: `linear-gradient(165deg, ${p.bgFrom} 0%, ${p.bgTo} 100%)`,
      padding: '32px 24px 26px',
      position: 'relative', overflow: 'hidden',
      boxShadow: `0 16px 40px ${p.bgTo}66, 0 2px 12px rgba(122,15,77,0.10)`,
      textAlign: 'center'
    }}>
      {/* Decorative organic blobs */}
      <div style={{
        position: 'absolute', top: -80, right: -70,
        width: 280, height: 280, borderRadius: '50%',
        background: `radial-gradient(circle, ${p.blob}cc 0%, ${p.blob}00 70%)`,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: -120, left: -90,
        width: 300, height: 300, borderRadius: '50%',
        background: `radial-gradient(circle, ${p.bgFrom}aa 0%, ${p.bgFrom}00 70%)`,
        pointerEvents: 'none'
      }} />
      {/* Subtle grain */}
      <svg style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        opacity: 0.07, pointerEvents: 'none', mixBlendMode: 'overlay',
      }}>
        <filter id="rb-noise"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2"/></filter>
        <rect width="100%" height="100%" filter="url(#rb-noise)"/>
      </svg>

      {/* Top eyebrow — centered */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'inline-flex', alignItems: 'center', gap: 10,
        fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 2.4,
        textTransform: 'uppercase', color: p.ink, opacity: 0.75,
        fontWeight: 600
      }}>
        <span style={{
          width: 6, height: 6, borderRadius: '50%', background: p.accent,
          boxShadow: `0 0 0 3px ${p.accent}33`
        }} />
        Risco · Hoje · 10:21
      </div>

      {/* Massive centered number */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 8,
        marginTop: 8
      }}>
        <div style={{
          fontFamily: 'var(--serif)', fontWeight: 500,
          fontSize: 168, lineHeight: 0.82, letterSpacing: -8,
          color: p.ink, fontVariationSettings: '"opsz" 144',
          textShadow: `0 3px 0 ${p.bgFrom}55, 0 0 60px ${p.accent}22`
        }}>{score}</div>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 13, color: p.ink,
          opacity: 0.55, letterSpacing: 0.5, fontWeight: 500
        }}>/ 100</div>
      </div>

      {/* Thin centered divider */}
      <div style={{
        position: 'relative', zIndex: 1,
        width: 40, height: 1, marginTop: 18, marginBottom: 14, marginLeft: 'auto', marginRight: 'auto',
        background: `linear-gradient(90deg, transparent 0%, ${p.ink}66 50%, transparent 100%)`
      }} />

      {/* Status italic — centered, big */}
      <div style={{
        position: 'relative', zIndex: 1,
        fontFamily: 'var(--serif)', fontSize: 40, fontStyle: 'italic',
        fontWeight: 500, color: p.ink, letterSpacing: -1, lineHeight: 1,
      }}>{p.label}</div>

      {/* Message — centered */}
      <div style={{
        position: 'relative', zIndex: 1,
        fontFamily: 'var(--serif)', fontSize: 15, lineHeight: 1.5,
        color: p.ink, opacity: 0.78, marginTop: 14,
        padding: '0 8px',
        maxWidth: 320, marginLeft: 'auto', marginRight: 'auto'
      }}>{msg.sub}</div>

      {/* CTA — centered */}
      <button onClick={() => go('alert')} style={{
        position: 'relative', zIndex: 1,
        marginTop: 22,
        padding: '14px 24px', borderRadius: 999, border: 'none',
        background: p.ctaBg, color: p.ctaInk, cursor: 'pointer',
        fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 600,
        display: 'inline-flex', alignItems: 'center', gap: 8,
        boxShadow: `0 8px 22px ${p.ctaBg}66`
      }}>
        <svg width="15" height="15" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h2.5l1.5 4-2 1c1 2 3 4 5 5l1-2 4 1.5V15a1 1 0 01-1 1A12 12 0 013 4z" fill={p.ctaInk} />
        </svg>
        Contactar Dra. Helena
      </button>
    </div>
  );
}

// Risk indicator — switch between editorial / banner / thermo / legacy
function RiskIndicator({ score, riskLevel, indicator }) {
  if (indicator === 'banner') return <RiskBanner score={score} riskLevel={riskLevel} />;
  if (indicator === 'thermo') return <RiskThermo score={score} riskLevel={riskLevel} />;
  if (indicator === 'ring' || indicator === 'breath' || indicator === 'gauge') {
    const r = KD.risk[riskLevel];
    const labelMap = { safe: 'Tudo bem', watch: 'Atenção', alert: 'Urgente' };
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <SemiGauge score={score} color={r.dot} fg={r.fg} label={labelMap[riskLevel]} indicator={indicator} />
      </div>
    );
  }
  return <RiskEditorial score={score} riskLevel={riskLevel} />;
}

// A · Editorial — number left, vertical zone bar right
function RiskEditorial({ score, riskLevel }) {
  const r = KD.risk[riskLevel];
  const labelMap = { safe: 'Tudo bem', watch: 'Atenção', alert: 'Urgente' };
  // marker position from bottom (0 → 0%, 100 → 100%)
  const barH = 110;
  const markerY = barH - (Math.min(100, score) / 100) * barH;

  return (
    <div>
      {/* Top eyebrow */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 4px 14px',
        borderBottom: '1px solid #F2E8E6'
      }}>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: 2,
          textTransform: 'uppercase', color: KD.ink3, fontWeight: 500
        }}>Risco · Hoje</div>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: 1.4,
          color: KD.ink3, fontWeight: 500
        }}>10:21</div>
      </div>

      {/* Main row: number left · zone bar right */}
      <div style={{
        display: 'flex', alignItems: 'stretch', gap: 22,
        padding: '20px 4px 4px'
      }}>
        {/* Number */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <div style={{
              fontFamily: 'var(--serif)', fontWeight: 500,
              fontSize: 80, lineHeight: 0.85, letterSpacing: -3,
              color: r.fg, fontVariationSettings: '"opsz" 144'
            }}>{score}</div>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: 11, color: KD.ink3,
              letterSpacing: 0.5
            }}>/100</div>
          </div>
          <div style={{
            fontFamily: 'var(--serif)', fontSize: 22, fontStyle: 'italic',
            color: r.fg, fontWeight: 500, marginTop: 6, letterSpacing: -0.4
          }}>{labelMap[riskLevel]}</div>
        </div>

        {/* Vertical zone bar */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'stretch', paddingRight: 4 }}>
          {/* Tick labels */}
          <div style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            fontFamily: 'var(--mono)', fontSize: 8, color: KD.ink3,
            letterSpacing: 1, textAlign: 'right', textTransform: 'uppercase',
            fontWeight: 500, paddingTop: 2, paddingBottom: 2
          }}>
            <span>Alerta</span>
            <span>Atenção</span>
            <span>Bem</span>
          </div>
          {/* Bar */}
          <div style={{
            position: 'relative', width: 10, height: barH, borderRadius: 6,
            background: `linear-gradient(180deg,
              ${KD.risk.alert.dot} 0%,
              ${KD.risk.alert.dot} 30%,
              ${KD.risk.watch.dot} 30%,
              ${KD.risk.watch.dot} 60%,
              ${KD.risk.safe.dot} 60%,
              ${KD.risk.safe.dot} 100%)`,
            opacity: 0.35
          }}>
            {/* Marker */}
            <div style={{
              position: 'absolute', left: '50%', top: markerY,
              transform: 'translate(-50%, -50%)',
              width: 22, height: 22, borderRadius: '50%',
              background: '#fff',
              border: `3px solid ${r.fg}`,
              boxShadow: `0 2px 8px ${r.dot}66`,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: '50%', background: r.fg
              }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// B · Banner — full-width colored band, status big italic, score discreet
function RiskBanner({ score, riskLevel }) {
  const r = KD.risk[riskLevel];
  const labelMap = { safe: 'Tudo bem', watch: 'Atenção a sinais', alert: 'Risco elevado' };
  return (
    <div style={{
      borderRadius: 20, padding: '22px 22px',
      background: r.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
      position: 'relative', overflow: 'hidden'
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: 2,
          textTransform: 'uppercase', color: r.fg, opacity: 0.7,
          fontWeight: 600
        }}>Risco hoje</div>
        <div style={{
          fontFamily: 'var(--serif)', fontSize: 32, fontWeight: 500,
          fontStyle: 'italic', color: r.fg, lineHeight: 1, marginTop: 6,
          letterSpacing: -0.8
        }}>{labelMap[riskLevel]}</div>
      </div>
      <div style={{
        flexShrink: 0, textAlign: 'right',
        paddingLeft: 18,
        borderLeft: `1px solid ${r.fg}33`
      }}>
        <div style={{
          fontFamily: 'var(--serif)', fontSize: 44, fontWeight: 500,
          color: r.fg, lineHeight: 0.9, letterSpacing: -1.5,
          fontVariationSettings: '"opsz" 144'
        }}>{score}</div>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 9, color: r.fg,
          opacity: 0.65, letterSpacing: 1, marginTop: 4, fontWeight: 500
        }}>/100</div>
      </div>
    </div>
  );
}

// C · Thermometer — horizontal bar with marker
function RiskThermo({ score, riskLevel }) {
  const r = KD.risk[riskLevel];
  const labelMap = { safe: 'Tudo bem', watch: 'Atenção', alert: 'Urgente' };
  const pos = Math.min(100, Math.max(0, score));

  return (
    <div style={{ padding: '4px 4px' }}>
      {/* Top label row */}
      <div style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        marginBottom: 16
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: 2,
            textTransform: 'uppercase', color: KD.ink3, fontWeight: 500
          }}>Risco hoje</div>
          <div style={{
            fontFamily: 'var(--serif)', fontSize: 26, fontWeight: 500,
            fontStyle: 'italic', color: r.fg, marginTop: 3, letterSpacing: -0.5,
            lineHeight: 1
          }}>{labelMap[riskLevel]}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <div style={{
            fontFamily: 'var(--serif)', fontSize: 50, fontWeight: 500,
            color: r.fg, lineHeight: 0.85, letterSpacing: -1.6,
            fontVariationSettings: '"opsz" 144'
          }}>{score}</div>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 10, color: KD.ink3,
            letterSpacing: 0.5
          }}>/100</div>
        </div>
      </div>

      {/* Horizontal zoned bar */}
      <div style={{ position: 'relative', marginTop: 8, marginBottom: 16 }}>
        <div style={{
          height: 10, borderRadius: 6,
          background: `linear-gradient(90deg,
            ${KD.risk.safe.dot} 0%,
            ${KD.risk.safe.dot} 30%,
            ${KD.risk.watch.dot} 30%,
            ${KD.risk.watch.dot} 70%,
            ${KD.risk.alert.dot} 70%,
            ${KD.risk.alert.dot} 100%)`,
          opacity: 0.32
        }} />
        {/* Marker */}
        <div style={{
          position: 'absolute', top: '50%', left: `${pos}%`,
          transform: 'translate(-50%, -50%)',
          width: 24, height: 24, borderRadius: '50%',
          background: '#fff', border: `3px solid ${r.fg}`,
          boxShadow: `0 2px 10px ${r.dot}66`,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: r.fg }} />
        </div>
      </div>

      {/* Tick legend */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: 1.2,
        textTransform: 'uppercase', color: KD.ink3, fontWeight: 500,
        padding: '0 2px'
      }}>
        <span>Bem</span>
        <span style={{ marginLeft: '14%' }}>Atenção</span>
        <span>Alerta</span>
      </div>
    </div>
  );
}

// Semicircular gauge — primary indicator
function SemiGauge({ score, color, fg, label, indicator }) {
  const w = 240,h = 150;
  const cx = w / 2,cy = h - 18;
  const r = 95;
  const stroke = 16;
  const startAngle = -180;
  const endAngle = -180 + score / 100 * 180;
  const arc = (a1, a2) => {
    const r1 = a1 * Math.PI / 180;
    const r2 = a2 * Math.PI / 180;
    const x1 = cx + r * Math.cos(r1),y1 = cy + r * Math.sin(r1);
    const x2 = cx + r * Math.cos(r2),y2 = cy + r * Math.sin(r2);
    const large = Math.abs(a2 - a1) > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  };

  return (
    <div style={{ width: w, height: h + 10, position: 'relative' }}>
      <svg width={w} height={h + 10}>
        {/* track */}
        <path d={arc(startAngle, 0)} stroke="#F5EFEE" strokeWidth={stroke} fill="none" strokeLinecap="round" />
        {/* progress */}
        <path d={arc(startAngle, endAngle)} stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round"
        style={{ filter: `drop-shadow(0 2px 6px ${color}55)` }} />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, top: 30,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
        pointerEvents: 'none'
      }}>
        <div style={{
          fontFamily: 'var(--sans)', fontSize: 10, letterSpacing: 1.6, textTransform: 'uppercase',
          color: KD.ink3, fontWeight: 500
        }}>Risco hoje</div>
        <div style={{
          fontFamily: 'var(--serif)', fontSize: 48, fontWeight: 500,
          color: fg, lineHeight: 1, marginTop: 6, letterSpacing: -1.5,
          fontVariationSettings: '"opsz" 144'
        }}>{score}</div>
        <div style={{ fontFamily: 'var(--sans)', fontSize: 10, color: KD.ink3, marginTop: 2 }}>/100</div>
        <div style={{
          fontFamily: 'var(--serif)', fontSize: 15, fontStyle: 'italic',
          color: fg, marginTop: 4, fontWeight: 500
        }}>{label}</div>
      </div>
    </div>);

}

function VitalCard({ icon, label, value, unit, warn }) {
  const icons = {
    pulse: <path d="M3 12h3l2-5 4 10 2-5h7" stroke={KD.pink.coral} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    heart: <path d="M12 19s-7-4.5-7-10a3.5 3.5 0 017-2 3.5 3.5 0 017 2c0 5.5-7 10-7 10z" fill={KD.pink.coral} />,
    scale: <><path d="M5 9h14l-1.5 11a2 2 0 01-2 2h-9a2 2 0 01-2-2L5 9z" stroke={KD.pink.coral} strokeWidth="1.8" fill="none" strokeLinejoin="round" /><path d="M9 9V6a3 3 0 016 0v3" stroke={KD.pink.coral} strokeWidth="1.8" fill="none" /></>,
    drop: <path d="M12 3s-6 6-6 11a6 6 0 0012 0c0-5-6-11-6-11z" stroke={KD.pink.coral} strokeWidth="1.8" fill="none" strokeLinejoin="round" />
  };
  return (
    <div style={{
      background: '#fff', borderRadius: 18, padding: '14px 16px',
      boxShadow: '0 2px 10px rgba(122,15,77,0.04)',
      position: 'relative'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">{icons[icon]}</svg>
        <span style={{ fontFamily: 'var(--sans)', fontSize: 13, color: KD.ink2, fontWeight: 500 }}>{label}</span>
        {warn && <div style={{ width: 6, height: 6, borderRadius: '50%', background: KD.risk.watch.dot, marginLeft: 'auto' }} />}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 8 }}>
        <span style={{
          fontFamily: 'var(--serif)', fontSize: 26, fontWeight: 500,
          color: KD.pink.wine, letterSpacing: -0.6, lineHeight: 1
        }}>{value}</span>
        <span style={{ fontFamily: 'var(--sans)', fontSize: 11, color: KD.ink3 }}>{unit}</span>
      </div>
    </div>);

}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: 1.4, textTransform: 'uppercase',
      color: KD.ink3, marginBottom: 10, fontWeight: 500
    }}>{children}</div>);

}

// ── Tab bar (kept from previous step) ────────────────────────────────
function TabBar({ active, go }) {
  const tabs = [
  { k: 'dashboard', icon: 'home' },
  { k: 'history', icon: 'history' },
  { k: 'fab', center: true },
  { k: 'alert', icon: 'bell' },
  { k: 'profile', icon: 'person' }];


  const Icon = ({ name, color }) => {
    const s = { stroke: color, strokeWidth: 2, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
    if (name === 'home') return <svg width="28" height="28" viewBox="0 0 24 24"><path d="M3 11l9-8 9 8v9a2 2 0 01-2 2h-3v-7H8v7H5a2 2 0 01-2-2v-9z" {...s} /></svg>;
    if (name === 'history') return <svg width="28" height="28" viewBox="0 0 24 24"><circle cx="12" cy="13" r="8" {...s} /><path d="M12 8v5l3 2M5 6l-2 1M19 6l2 1" {...s} /></svg>;
    if (name === 'bell') return <svg width="28" height="28" viewBox="0 0 24 24"><path d="M6 16V11a6 6 0 0112 0v5l1.5 2h-15L6 16z" {...s} /><path d="M10 20a2 2 0 004 0" {...s} /></svg>;
    if (name === 'person') return <svg width="28" height="28" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" {...s} /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" {...s} /></svg>;
    return null;
  };

  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 30, pointerEvents: 'none' }}>
      <div style={{
        position: 'relative', height: 86,
        background: KD.pink.coral,
        borderTopLeftRadius: 26, borderTopRightRadius: 26,
        boxShadow: '0 -8px 26px rgba(217,75,149,0.28)',
        pointerEvents: 'auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 18px 22px'
      }}>
        <div style={{ display: 'flex', flex: 1, justifyContent: 'space-around' }}>
          {tabs.slice(0, 2).map((t) => <NavTab key={t.k} t={t} active={active === t.k} onClick={() => go(t.k)} Icon={Icon} />)}
        </div>
        <div style={{ width: 80 }} />
        <div style={{ display: 'flex', flex: 1, justifyContent: 'space-around' }}>
          {tabs.slice(3).map((t) => <NavTab key={t.k} t={t} active={active === t.k} onClick={() => go(t.k)} Icon={Icon} />)}
        </div>
      </div>

      <button onClick={() => go('reading1')} style={{
        position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)',
        width: 60, height: 60, borderRadius: '50%', border: 'none',
        background: KD.pink.coral, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', pointerEvents: 'auto',
        boxShadow: '0 6px 20px rgba(217,75,149,0.50), 0 0 0 4px rgba(255,255,255,0.95)'
      }}>
        <svg width="26" height="26" viewBox="0 0 28 28"><path d="M14 6v16M6 14h16" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" /></svg>
      </button>
    </div>);

}

function NavTab({ t, active, onClick, Icon }) {
  return (
    <button onClick={onClick} style={{
      background: 'transparent', border: 'none', cursor: 'pointer',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: 4, padding: '10px 12px', minWidth: 48, position: 'relative'
    }}>
      <Icon name={t.icon} color="#fff" />
      <div style={{
        width: 4, height: 4, borderRadius: '50%',
        background: active ? '#fff' : 'transparent',
        marginTop: 2
      }} />
    </button>);

}

// Backward-compatible exports (kept names referenced by other files)
function PregnancyWeek() {return null;}
function RiskRing() {return null;}
function RiskBreath() {return null;}
function RiskGauge() {return null;}
function QuickRow() {return null;}

Object.assign(window, {
  ScreenDashboard, SemiGauge, RiskIndicator, RiskBold, RiskEditorial, RiskBanner, RiskThermo, VitalCard, SectionLabel, TabBar, NavTab,
  PregnancyWeek, RiskRing, RiskBreath, RiskGauge, QuickRow
});
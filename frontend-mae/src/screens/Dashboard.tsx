import React from 'react';
import { KAIROS } from '@/theme';
import { RiskIndicator } from '@/components/risk';
import { TabBar } from '@/components/nav';
import type { Go, RiskLevel, IndicatorStyle } from '@/types';

const KD = KAIROS;

interface RiskMessage { title: string; sub: string; }

export function ScreenDashboard({
  go, riskLevel = 'watch', score = 58, showPercent: _showPercent = true, indicator = 'gauge',
}: {
  go: Go;
  riskLevel?: RiskLevel;
  score?: number;
  showPercent?: boolean;
  indicator?: IndicatorStyle;
}) {
  const r = KD.risk[riskLevel];
  const messages: Record<RiskLevel, RiskMessage> = {
    safe: { title: 'Tudo normal', sub: 'Os seus valores estão dentro do esperado. Continue com a sua rotina e meça novamente amanhã de manhã.' },
    watch: { title: 'Atenção', sub: 'Detetámos sinais a vigiar. Repita a leitura em algumas horas e contacte o seu obstetra se persistir.' },
    alert: { title: 'Risco elevado', sub: 'A combinação de sinais hoje requer avaliação médica imediata. Contacte já a sua obstetra.' }
  };
  const msg = messages[riskLevel];

  return (
    <div style={{
      height: '100%',
      background: `linear-gradient(180deg, ${KD.pink.blush} 0%, ${KD.pink.powder} 240px, ${KD.paper} 480px)`,
      paddingTop: 60, paddingBottom: 110, overflow: 'auto', boxSizing: 'border-box'
    }}>
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

      <div style={{
        padding: '18px 32px 0',
        fontFamily: 'var(--sans)', fontSize: 12, lineHeight: 1.5,
        color: KD.ink3, textAlign: 'center'
      }}>
        Triagem, não diagnóstico. Em caso de dúvida, contacte sempre o seu obstetra.
      </div>

      <TabBar active="dashboard" go={go} />
    </div>
  );
}

interface BoldPalette {
  bgFrom: string; bgTo: string; blob: string; ink: string; accent: string;
  ctaBg: string; ctaInk: string; label: string;
}

function RiskBold({
  score, riskLevel, msg, go,
}: {
  score: number;
  riskLevel: RiskLevel;
  msg: RiskMessage;
  go: Go;
}) {
  const palettes: Record<RiskLevel, BoldPalette> = {
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
      <svg style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        opacity: 0.07, pointerEvents: 'none', mixBlendMode: 'overlay',
      }}>
        <filter id="rb-noise"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2"/></filter>
        <rect width="100%" height="100%" filter="url(#rb-noise)"/>
      </svg>

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

      <div style={{
        position: 'relative', zIndex: 1,
        width: 40, height: 1, marginTop: 18, marginBottom: 14, marginLeft: 'auto', marginRight: 'auto',
        background: `linear-gradient(90deg, transparent 0%, ${p.ink}66 50%, transparent 100%)`
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        fontFamily: 'var(--serif)', fontSize: 40, fontStyle: 'italic',
        fontWeight: 500, color: p.ink, letterSpacing: -1, lineHeight: 1,
      }}>{p.label}</div>

      <div style={{
        position: 'relative', zIndex: 1,
        fontFamily: 'var(--serif)', fontSize: 15, lineHeight: 1.5,
        color: p.ink, opacity: 0.78, marginTop: 14,
        padding: '0 8px',
        maxWidth: 320, marginLeft: 'auto', marginRight: 'auto'
      }}>{msg.sub}</div>

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

function VitalCard({
  icon, label, value, unit, warn,
}: {
  icon: 'pulse' | 'heart' | 'scale' | 'drop';
  label: React.ReactNode;
  value: React.ReactNode;
  unit: React.ReactNode;
  warn?: boolean;
}) {
  const icons: Record<string, React.ReactNode> = {
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
    </div>
  );
}

import { KAIROS } from '@/theme';
import type { Go, RiskLevel } from '@/types';

const KR = KAIROS;

interface Verdict { glow: string; text: string; accent: string; deep: string; }

export function ScreenReading4({
  go, riskLevel, score,
}: { go: Go; riskLevel: RiskLevel; score: number }) {
  const messages: Record<RiskLevel, string> = {
    safe:  'Os seus valores estão dentro do esperado para a sua idade gestacional. Bom trabalho.',
    watch: 'Detetámos sinais a vigiar. Repita a leitura em algumas horas e contacte o seu obstetra se persistir.',
    alert: 'A combinação de tensão elevada com sintomas requer avaliação médica imediata.',
  };
  const labels: Record<RiskLevel, string> = { safe: 'Tudo bem', watch: 'Atenção', alert: 'Risco elevado' };
  const verdicts: Record<RiskLevel, Verdict> = {
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
      <div style={{
        position: 'absolute', top: '15%', left: '50%',
        transform: 'translate(-50%, -25%)',
        width: 480, height: 480, borderRadius: '50%',
        background: `radial-gradient(circle, ${v.glow}55 0%, ${v.glow}22 35%, transparent 65%)`,
        filter: 'blur(10px)', pointerEvents: 'none',
      }}/>

      <svg style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        opacity: 0.05, pointerEvents: 'none', mixBlendMode: 'multiply',
      }}>
        <filter id="r4noise"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2"/></filter>
        <rect width="100%" height="100%" filter="url(#r4noise)"/>
      </svg>

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

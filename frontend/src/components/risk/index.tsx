// Risk visualisation primitives:
// RiskIndicator (style switch), RiskEditorial, RiskBanner, RiskThermo, SemiGauge.

import { KAIROS } from '@/theme';
import type { RiskLevel, IndicatorStyle } from '@/types';

const KD = KAIROS;

export function RiskIndicator({
  score, riskLevel, indicator,
}: {
  score: number;
  riskLevel: RiskLevel;
  indicator: IndicatorStyle;
}) {
  if (indicator === 'banner') return <RiskBanner score={score} riskLevel={riskLevel} />;
  if (indicator === 'thermo') return <RiskThermo score={score} riskLevel={riskLevel} />;
  if (indicator === 'ring' || indicator === 'breath' || indicator === 'gauge') {
    const r = KD.risk[riskLevel];
    const labelMap: Record<RiskLevel, string> = { safe: 'Tudo bem', watch: 'Atenção', alert: 'Urgente' };
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <SemiGauge score={score} color={r.dot} fg={r.fg} label={labelMap[riskLevel]} indicator={indicator} />
      </div>
    );
  }
  return <RiskEditorial score={score} riskLevel={riskLevel} />;
}

export function RiskEditorial({ score, riskLevel }: { score: number; riskLevel: RiskLevel }) {
  const r = KD.risk[riskLevel];
  const labelMap: Record<RiskLevel, string> = { safe: 'Tudo bem', watch: 'Atenção', alert: 'Urgente' };
  const barH = 110;
  const markerY = barH - (Math.min(100, score) / 100) * barH;

  return (
    <div>
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

      <div style={{
        display: 'flex', alignItems: 'stretch', gap: 22,
        padding: '20px 4px 4px'
      }}>
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

        <div style={{ display: 'flex', gap: 10, alignItems: 'stretch', paddingRight: 4 }}>
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

export function RiskBanner({ score, riskLevel }: { score: number; riskLevel: RiskLevel }) {
  const r = KD.risk[riskLevel];
  const labelMap: Record<RiskLevel, string> = { safe: 'Tudo bem', watch: 'Atenção a sinais', alert: 'Risco elevado' };
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

export function RiskThermo({ score, riskLevel }: { score: number; riskLevel: RiskLevel }) {
  const r = KD.risk[riskLevel];
  const labelMap: Record<RiskLevel, string> = { safe: 'Tudo bem', watch: 'Atenção', alert: 'Urgente' };
  const pos = Math.min(100, Math.max(0, score));

  return (
    <div style={{ padding: '4px 4px' }}>
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

export function SemiGauge({
  score, color, fg, label, indicator: _indicator,
}: {
  score: number;
  color: string;
  fg: string;
  label: string;
  indicator?: IndicatorStyle;
}) {
  const w = 240, h = 150;
  const cx = w / 2, cy = h - 18;
  const r = 95;
  const stroke = 16;
  const startAngle = -180;
  const endAngle = -180 + score / 100 * 180;
  const arc = (a1: number, a2: number) => {
    const r1 = a1 * Math.PI / 180;
    const r2 = a2 * Math.PI / 180;
    const x1 = cx + r * Math.cos(r1), y1 = cy + r * Math.sin(r1);
    const x2 = cx + r * Math.cos(r2), y2 = cy + r * Math.sin(r2);
    const large = Math.abs(a2 - a1) > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  };

  return (
    <div style={{ width: w, height: h + 10, position: 'relative' }}>
      <svg width={w} height={h + 10}>
        <path d={arc(startAngle, 0)} stroke="#F5EFEE" strokeWidth={stroke} fill="none" strokeLinecap="round" />
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
    </div>
  );
}

import React from 'react';
import { KAIROS } from '@/theme';

export const KR = KAIROS;

export const PINK_BG = `linear-gradient(180deg, ${KR.pink.blush} 0%, ${KR.pink.powder} 280px, ${KR.paper} 520px)`;
export const PINK_BTN = `linear-gradient(135deg, ${KR.pink.coral} 0%, ${KR.pink.deep} 100%)`;

export function FlowShell({
  step, onBack, children,
}: {
  step: number;
  onBack: () => void;
  children?: React.ReactNode;
}) {
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

function StepDots({ step }: { step: number }) {
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

export function Eyebrow({ children }: { children?: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: 1.4, textTransform: 'uppercase',
      color: KR.ink3, fontWeight: 500, marginTop: 8,
    }}>{children}</div>
  );
}

export function FlowTitle({ children }: { children?: React.ReactNode }) {
  return (
    <h1 style={{
      fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 400,
      color: KR.pink.wine, margin: '2px 0 0', letterSpacing: -0.8, lineHeight: 1,
    }}>{children}</h1>
  );
}

export function FlowFooter({ children }: { children?: React.ReactNode }) {
  return (
    <div style={{ padding: '12px 24px 36px' }}>{children}</div>
  );
}

export function ContinueBtn({ onClick, children }: { onClick?: React.MouseEventHandler; children?: React.ReactNode }) {
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

// BP hero card (top of step 1)
export function BPHero({
  sys, dia, onSys, onDia,
}: {
  sys: number; dia: number; onSys: (v: number) => void; onDia: (v: number) => void;
}) {
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

function BPField({
  label, value, onChange, min, max,
}: {
  label: string; value: number; onChange: (v: number) => void; min: number; max: number;
}) {
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

type VitalIcon = 'heart' | 'scale' | 'thermo' | 'drop';

export function VitalTile({
  icon, label, value, unit, onChange, min, max, step: _step = 1, decimals = 0,
}: {
  icon: VitalIcon;
  label: React.ReactNode;
  value: number;
  unit: React.ReactNode;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  decimals?: number;
}) {
  const I: Record<VitalIcon, React.ReactNode> = {
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
          const target = e.currentTarget;
          const v = parseFloat((target.textContent || '').replace(',', '.'));
          if (!isNaN(v)) onChange(Math.min(max, Math.max(min, v)));
          else target.textContent = display;
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

export function SymptomCard({
  label, value, onChange,
}: {
  label: React.ReactNode; value: number; onChange: (v: number) => void;
}) {
  const scaleVal = Math.round(value / 20);
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

export function CheckCard({
  label, value, onChange,
}: {
  label: React.ReactNode; value: boolean; onChange: (v: boolean) => void;
}) {
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

export function RadioCard({
  title, sub, selected, onClick,
}: {
  title: React.ReactNode; sub: React.ReactNode; selected: boolean; onClick: () => void;
}) {
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

// Reusable form primitives: BackBtn, Divider, Field, FieldCard,
// button style helpers, KairosMark.

import React from 'react';
import { KAIROS } from '@/theme';

const K = KAIROS;

export function BackBtn({ onClick }: { onClick?: React.MouseEventHandler }) {
  return (
    <button onClick={onClick} style={{
      width: 40, height: 40, borderRadius: '50%', border: 'none',
      background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', flexShrink: 0,
      boxShadow: '0 2px 8px rgba(122,15,77,0.08)'
    }}>
      <svg width="9" height="16" viewBox="0 0 9 16">
        <path d="M8 1L1 8l7 7" stroke={K.pink.wine} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export function Divider() {
  return <div style={{ height: 1, background: K.line2, margin: '0 14px' }} />;
}

export function FieldCard({
  label, value, onChange, type = 'text', suffix,
}: {
  label?: React.ReactNode;
  value?: string | number;
  onChange?: (v: string) => void;
  type?: string;
  suffix?: React.ReactNode;
}) {
  return (
    <div style={{
      padding: '12px 16px', borderRadius: 18,
      background: '#fff',
      display: 'flex', flexDirection: 'column', gap: 4,
      boxShadow: '0 2px 10px rgba(122,15,77,0.05)', width: '170px'
    }}>
      <div style={{
        fontFamily: 'var(--sans)', fontSize: 10, color: K.ink3,
        letterSpacing: 1.2, textTransform: 'uppercase', fontWeight: 500
      }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <input
          type={type}
          defaultValue={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          style={{
            flex: 1, border: 'none', background: 'transparent', outline: 'none',
            fontFamily: 'var(--serif)', fontSize: 18, color: K.pink.wine, fontWeight: 500,
            minWidth: 0, padding: 0, letterSpacing: -0.2
          }} />
        {suffix && <span style={{ fontFamily: 'var(--sans)', fontSize: 11, color: K.ink3, letterSpacing: 0.4 }}>{suffix}</span>}
      </div>
    </div>
  );
}

export function Field({
  label, value, onChange, type = 'text', suffix, flat,
}: {
  label?: React.ReactNode;
  value?: string | number;
  onChange?: (v: string) => void;
  type?: string;
  suffix?: React.ReactNode;
  flat?: boolean;
}) {
  if (flat) {
    return (
      <div style={{
        padding: '12px 16px',
        display: 'flex', flexDirection: 'column', gap: 4
      }}>
        <div style={{
          fontFamily: 'var(--sans)', fontSize: 10, color: K.ink3,
          letterSpacing: 1.2, textTransform: 'uppercase', fontWeight: 500
        }}>{label}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <input
            type={type}
            defaultValue={value}
            onChange={onChange ? (e) => onChange(e.target.value) : undefined}
            style={{
              flex: 1, border: 'none', background: 'transparent', outline: 'none',
              fontFamily: 'var(--serif)', fontSize: 18, color: K.pink.wine, fontWeight: 500,
              minWidth: 0, padding: 0, letterSpacing: -0.2
            }} />
          {suffix && <span style={{ fontFamily: 'var(--sans)', fontSize: 11, color: K.ink3 }}>{suffix}</span>}
        </div>
      </div>
    );
  }
  return <FieldCard label={label} value={value} onChange={onChange} type={type} suffix={suffix} />;
}

export function btnPrimary(): React.CSSProperties {
  return {
    width: '100%', height: 54, borderRadius: 18, border: 'none',
    background: `linear-gradient(135deg, ${K.pink.coral} 0%, ${K.pink.deep} 100%)`,
    color: '#fff',
    fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 600, letterSpacing: 0.1,
    cursor: 'pointer',
    boxShadow: `0 10px 24px ${K.pink.coral}40`
  };
}

export function btnGhost(): React.CSSProperties {
  return {
    width: '100%', height: 48, borderRadius: 16, border: 'none',
    background: 'transparent', color: K.pink.deep,
    fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 500,
    cursor: 'pointer', marginTop: 4
  };
}

export function btnSecondary(): React.CSSProperties {
  return {
    width: '100%', height: 50, borderRadius: 16, border: `1px solid ${K.line2}`,
    background: '#fff', color: K.ink,
    fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 500,
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 2px 10px rgba(122,15,77,0.04)'
  };
}

export function KairosMark({ size = 24, color = '#fff' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M8 6v20M8 16l10-10M8 16l10 10" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="16" r="2" fill={color} />
    </svg>
  );
}

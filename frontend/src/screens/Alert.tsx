import React from 'react';
import type { Go } from '@/types';

export function ScreenAlert({ go }: { go: Go }) {
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

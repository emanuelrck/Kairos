import React from 'react';
import { KAIROS } from '@/theme';
import { BackBtn, Field, Divider, btnPrimary, btnSecondary } from '@/components/form';
import type { Go } from '@/types';

const K = KAIROS;

const SHARED_BG = `linear-gradient(180deg, ${K.pink.blush} 0%, ${K.pink.powder} 280px, ${K.paper} 520px)`;

export function ScreenLogin({ go }: { go: Go }) {
  const [email, setEmail] = React.useState('maria.silva@email.pt');
  const [pw, setPw] = React.useState('••••••••');
  return (
    <div style={{
      height: '100%', boxSizing: 'border-box',
      background: SHARED_BG,
      paddingTop: 60, paddingBottom: 28,
      display: 'flex', flexDirection: 'column',
      overflow: 'auto'
    }}>
      <div style={{ padding: '14px 24px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <BackBtn onClick={() => go('welcome')} />
        </div>
        <div style={{
          fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: 1.4,
          textTransform: 'uppercase', color: K.ink3, fontWeight: 500
        }}>Acesso</div>
        <div style={{
          fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 400,
          color: K.pink.wine, marginTop: 2, letterSpacing: -0.8, lineHeight: 1,
          fontVariationSettings: '"opsz" 144'
        }}>
          <em style={{ fontStyle: 'italic' }}>Bem-vinda</em> de volta
        </div>
        <div style={{
          fontFamily: 'var(--serif)', fontSize: 15, lineHeight: 1.5,
          color: K.ink2, marginTop: 8, fontStyle: 'italic'
        }}>
          Inicie sessão para continuar o seu acompanhamento.
        </div>
      </div>

      <div style={{ padding: '8px 20px 0' }}>
        <div style={{
          background: '#fff', borderRadius: 22, padding: '8px 6px',
          boxShadow: '0 2px 14px rgba(122,15,77,0.05)',
          display: 'flex', flexDirection: 'column'
        }}>
          <Field label="Email" value={email} onChange={setEmail} flat />
          <Divider />
          <Field label="Palavra-passe" value={pw} onChange={setPw} type="password" flat />
        </div>
        <div style={{ textAlign: 'right', marginTop: 10, padding: '0 4px' }}>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 13, color: K.pink.deep, fontWeight: 500 }}>Esqueci-me da palavra-passe</span>
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 24 }} />

      <div style={{ padding: '20px 20px 0' }}>
        <button onClick={() => go('dashboard')} style={btnPrimary()}>Entrar</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '16px 0' }}>
          <div style={{ flex: 1, height: 1, background: K.line2 }} />
          <span style={{ fontFamily: 'var(--sans)', fontSize: 11, color: K.ink3, letterSpacing: 1, textTransform: 'uppercase' }}>ou</span>
          <div style={{ flex: 1, height: 1, background: K.line2 }} />
        </div>
        <button style={btnSecondary()}>
          <svg width="16" height="16" viewBox="0 0 24 24" style={{ marginRight: 10 }}>
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" fill={K.ink} />
          </svg>
          Continuar com Apple
        </button>
      </div>
    </div>
  );
}

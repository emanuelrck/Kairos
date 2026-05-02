import React from 'react';
import { KAIROS } from '@/theme';
import { BackBtn, Field, FieldCard, Divider, btnPrimary } from '@/components/form';
import type { Go } from '@/types';

const K = KAIROS;

const SHARED_BG = `linear-gradient(180deg, ${K.pink.blush} 0%, ${K.pink.powder} 280px, ${K.paper} 520px)`;

export function ScreenRegister({ go }: { go: Go }) {
  const [step, setStep] = React.useState(0);
  const steps = ['Conta', 'Gravidez', 'Antecedentes'];

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
          <BackBtn onClick={() => step === 0 ? go('welcome') : setStep(step - 1)} />
          <div style={{ flex: 1, display: 'flex', gap: 5 }}>
            {steps.map((_, i) =>
              <div key={i} style={{
                flex: 1, height: 4, borderRadius: 2,
                background: i <= step ? K.pink.coral : K.line2,
                transition: 'background 0.3s'
              }} />
            )}
          </div>
        </div>
        <div style={{
          fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: 1.4,
          textTransform: 'uppercase', color: K.ink3, fontWeight: 500
        }}>
          Passo {step + 1} de 3 · {steps[step]}
        </div>
        {step === 0 && <RegStepAccountHeader />}
        {step === 1 && <RegStepPregnancyHeader />}
        {step === 2 && <RegStepHistoryHeader />}
      </div>

      <div style={{ padding: '8px 20px 0' }}>
        {step === 0 && <RegStepAccount />}
        {step === 1 && <RegStepPregnancy />}
        {step === 2 && <RegStepHistory />}
      </div>

      <div style={{ flex: 1, minHeight: 28 }} />

      <div style={{ padding: '20px 20px 0' }}>
        <button
          onClick={() => step < 2 ? setStep(step + 1) : go('dashboard')}
          style={btnPrimary()}>
          {step < 2 ? 'Continuar' : 'Tudo pronto'}
        </button>
      </div>
    </div>
  );
}

function RegStepAccountHeader() {
  return (
    <>
      <div style={{
        fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 400,
        color: K.pink.wine, marginTop: 2, letterSpacing: -0.8, lineHeight: 1,
        fontVariationSettings: '"opsz" 144'
      }}>
        Vamos <em style={{ fontStyle: 'italic' }}>começar</em>.
      </div>
      <div style={{
        fontFamily: 'var(--serif)', fontSize: 15, lineHeight: 1.5,
        color: K.ink2, marginTop: 8, fontStyle: 'italic'
      }}>
        Os seus dados são privados e cifrados.
      </div>
    </>
  );
}

function RegStepAccount() {
  return (
    <div style={{
      background: '#fff', borderRadius: 22, padding: '8px 6px',
      boxShadow: '0 2px 14px rgba(122,15,77,0.05)'
    }}>
      <Field label="Nome" value="Maria Silva" flat />
      <Divider />
      <Field label="Email" value="maria.silva@email.pt" flat />
      <Divider />
      <Field label="Palavra-passe" value="••••••••••" type="password" flat />
    </div>
  );
}

function RegStepPregnancyHeader() {
  return (
    <>
      <div style={{
        fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 400,
        color: K.pink.wine, marginTop: 2, letterSpacing: -0.8, lineHeight: 1,
        fontVariationSettings: '"opsz" 144'
      }}>
        A sua <em style={{ fontStyle: 'italic' }}>gravidez</em>.
      </div>
      <div style={{
        fontFamily: 'var(--serif)', fontSize: 15, lineHeight: 1.5,
        color: K.ink2, marginTop: 8, fontStyle: 'italic'
      }}>
        Para personalizar o seu acompanhamento.
      </div>
    </>
  );
}

function RegStepPregnancy() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <FieldCard label="Idade" value="32" suffix="anos" />
        <FieldCard label="Semana" value="24" suffix="sem" />
      </div>
      <FieldCard label="Data prevista de parto" value="14 Ago 2026" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <FieldCard label="Peso pré-gravidez" value="62" suffix="kg" />
        <FieldCard label="Altura" value="165" suffix="cm" />
      </div>
    </div>
  );
}

function RegStepHistoryHeader() {
  return (
    <>
      <div style={{
        fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 400,
        color: K.pink.wine, marginTop: 2, letterSpacing: -0.8, lineHeight: 1,
        fontVariationSettings: '"opsz" 144'
      }}>
        <em style={{ fontStyle: 'italic' }}>Antecedentes</em>.
      </div>
      <div style={{
        fontFamily: 'var(--serif)', fontSize: 15, lineHeight: 1.5,
        color: K.ink2, marginTop: 8, fontStyle: 'italic'
      }}>
        Selecione tudo o que se aplica. Pode editar depois.
      </div>
    </>
  );
}

function RegStepHistory() {
  const [items, setItems] = React.useState<Record<string, boolean>>({
    prev: false,
    family: true,
    htn: false,
    diabetes: false,
    first: true
  });
  const opts = [
    { k: 'prev', t: 'Pré-eclâmpsia em gravidez anterior' },
    { k: 'family', t: 'Pré-eclâmpsia na família' },
    { k: 'htn', t: 'Hipertensão crónica' },
    { k: 'diabetes', t: 'Diabetes (tipo 1, 2 ou gestacional)' },
    { k: 'first', t: 'Primeira gravidez' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {opts.map((o) =>
        <button key={o.k}
          onClick={() => setItems({ ...items, [o.k]: !items[o.k] })}
          style={{
            padding: '14px 16px', borderRadius: 18,
            border: items[o.k] ? `1.5px solid ${K.pink.coral}` : `1px solid ${K.line2}`,
            background: items[o.k] ? K.pink.powder : '#fff',
            fontFamily: 'var(--sans)', fontSize: 14, color: K.ink2,
            textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12,
            cursor: 'pointer',
            boxShadow: items[o.k] ? `0 4px 14px ${K.pink.coral}22` : '0 2px 10px rgba(122,15,77,0.04)',
            transition: 'all 0.15s'
          }}>
          <div style={{
            width: 22, height: 22, borderRadius: 7,
            border: items[o.k] ? `1.5px solid ${K.pink.coral}` : `1.5px solid ${K.ink4}`,
            background: items[o.k] ? K.pink.coral : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0
          }}>
            {items[o.k] &&
              <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 7l3 3 7-7" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            }
          </div>
          <span style={{ flex: 1 }}>{o.t}</span>
        </button>
      )}
    </div>
  );
}

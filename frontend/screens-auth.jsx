// screens-auth.jsx
// Welcome, Login, Registo — alinhados com a estética Dashboard/Alertas/Histórico/Perfil

const K = window.KAIROS;

const SHARED_BG = `linear-gradient(180deg, ${K.pink.blush} 0%, ${K.pink.powder} 280px, ${K.paper} 520px)`;

// ───────────────────────────────────────────────
// Welcome
// ───────────────────────────────────────────────
function ScreenWelcome({ go }) {
  return (
    <div style={{
      height: '100%', position: 'relative', overflow: 'hidden',
      background: `linear-gradient(180deg, ${K.pink.blush} 0%, ${K.pink.powder} 50%, ${K.paper} 100%)`
    }}>
      {/* Decorative organic shapes */}
      <div style={{
        position: 'absolute', top: -120, right: -120, width: 340, height: 340,
        borderRadius: '50%',
        background: `radial-gradient(circle at 30% 30%, ${K.pink.rose}66, transparent 70%)`,
        filter: 'blur(8px)'
      }} />
      <div style={{
        position: 'absolute', bottom: 180, left: -140, width: 300, height: 300,
        borderRadius: '50%',
        background: `radial-gradient(circle at 60% 60%, ${K.pink.coral}33, transparent 70%)`,
        filter: 'blur(12px)'
      }} />

      <div style={{
        position: 'relative', height: '100%', overflowY: 'auto',
        display: 'flex', flexDirection: 'column',
        padding: '90px 32px 44px', boxSizing: 'border-box'
      }}>
        {/* Eyebrow + logo */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 16,
            background: `linear-gradient(135deg, ${K.pink.coral}, ${K.pink.deep})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 8px 22px ${K.pink.coral}55`
          }}>
            <KairosMark size={26} color="#fff" />
          </div>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: 1.6,
            textTransform: 'uppercase', color: K.ink3, fontWeight: 500
          }}>Kairos · Saúde materna</div>
        </div>

        {/* Headline */}
        <div style={{
          fontFamily: 'var(--serif)', fontSize: 48, lineHeight: 1.05,
          fontWeight: 400, letterSpacing: -1.4, color: K.pink.wine,
          fontVariationSettings: '"opsz" 144', marginBottom: 18
        }}>
          Cuidar de si<br />
          e do bebé,<br />
          <em style={{ fontStyle: 'italic', color: K.pink.coral }}>todos os dias.</em>
        </div>

        <div style={{
          fontFamily: 'var(--serif)', fontSize: 16, lineHeight: 1.5,
          color: K.ink2, marginBottom: 32, maxWidth: 320,
          fontStyle: 'italic'
        }}>
          Acompanhamento diário da sua gravidez, com deteção precoce de pré-eclâmpsia.
        </div>

        <div style={{ flex: 1, minHeight: 12 }} />

        <button onClick={() => go('register')} style={btnPrimary()}>
          Começar
        </button>
        <button onClick={() => go('login')} style={btnGhost()}>
          Já tenho conta
        </button>

        <div style={{
          textAlign: 'center', marginTop: 18,
          fontFamily: 'var(--sans)', fontSize: 11, color: K.ink3, lineHeight: 1.5
        }}>
          Triagem, não diagnóstico.
        </div>
      </div>
    </div>);

}

// ───────────────────────────────────────────────
// Login
// ───────────────────────────────────────────────
function ScreenLogin({ go }) {
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
      {/* Header — Dashboard-style eyebrow + title with back button */}
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

      {/* Form card */}
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

      {/* CTAs */}
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
    </div>);

}

// ───────────────────────────────────────────────
// Register — onboarding 3 passos
// ───────────────────────────────────────────────
function ScreenRegister({ go }) {
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
      {/* Header */}
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

      {/* Form */}
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
    </div>);

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
    </>);

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
    </div>);

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
    </>);

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
    </div>);

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
    </>);

}

function RegStepHistory() {
  const [items, setItems] = React.useState({
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
  { k: 'first', t: 'Primeira gravidez' }];

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
    </div>);

}

// ───────────────────────────────────────────────
// shared bits
// ───────────────────────────────────────────────
function BackBtn({ onClick }) {
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
    </button>);

}

function Divider() {
  return <div style={{ height: 1, background: K.line2, margin: '0 14px' }} />;
}

// Single bordered card field (used inside step 1 grids)
function FieldCard({ label, value, onChange, type = 'text', suffix }) {
  return (
    <div style={{
      padding: '12px 16px', borderRadius: 18,
      background: '#fff',
      display: 'flex', flexDirection: 'column', gap: 4,
      boxShadow: '0 2px 10px rgba(122,15,77,0.05)', width: "170px"
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
    </div>);

}

// Flat field row (used inside grouped white card with Dividers)
function Field({ label, value, onChange, type = 'text', suffix, flat }) {
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
      </div>);

  }
  return <FieldCard label={label} value={value} onChange={onChange} type={type} suffix={suffix} />;
}

function btnPrimary() {
  return {
    width: '100%', height: 54, borderRadius: 18, border: 'none',
    background: `linear-gradient(135deg, ${K.pink.coral} 0%, ${K.pink.deep} 100%)`,
    color: '#fff',
    fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 600, letterSpacing: 0.1,
    cursor: 'pointer',
    boxShadow: `0 10px 24px ${K.pink.coral}40`
  };
}
function btnGhost() {
  return {
    width: '100%', height: 48, borderRadius: 16, border: 'none',
    background: 'transparent', color: K.pink.deep,
    fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 500,
    cursor: 'pointer', marginTop: 4
  };
}
function btnSecondary() {
  return {
    width: '100%', height: 50, borderRadius: 16, border: `1px solid ${K.line2}`,
    background: '#fff', color: K.ink,
    fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 500,
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 2px 10px rgba(122,15,77,0.04)'
  };
}

function KairosMark({ size = 24, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M8 6v20M8 16l10-10M8 16l10 10" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="16" r="2" fill={color} />
    </svg>);

}

Object.assign(window, {
  ScreenWelcome, ScreenLogin, ScreenRegister,
  BackBtn, Field, FieldCard, Divider, btnPrimary, btnGhost, btnSecondary, KairosMark
});
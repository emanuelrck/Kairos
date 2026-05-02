// medico-screens-auth.jsx
// Login do médico — split layout (painel marca + formulário), responsivo.

function ScreenMedicoLogin({ go }) {
  const { isCompact } = useViewport();
  const [email, setEmail] = React.useState('helena.matos@hospital.pt');
  const [pw, setPw] = React.useState('••••••••••');

  const submit = (e) => { e.preventDefault(); go('dashboard'); };

  return (
    <div style={{
      minHeight: '100vh',
      background: KM.surface.app,
      display: 'flex',
      fontFamily: 'var(--sans)', color: KM.ink.primary,
    }}>
      {/* Painel de marca (desktop only) */}
      {!isCompact && (
        <div style={{
          flex: '1 1 50%',
          background: KM.surface.sidebar,
          color: KM.ink.onDark,
          padding: '56px 56px',
          display: 'flex', flexDirection: 'column',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 13,
              background: `linear-gradient(135deg, ${KM.brand.coral}, ${KM.brand.deep})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 8px 22px ${KM.brand.coral}66`,
            }}>
              <KairosMark size={22} color="#fff" />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500, letterSpacing: -0.4, color: '#fff' }}>Kairos</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 1.6, textTransform: 'uppercase', color: KM.ink.onDarkDim, marginTop: 3 }}>
                Portal Clínico
              </div>
            </div>
          </div>

          <div style={{ flex: 1 }} />

          <div style={{
            fontFamily: 'var(--serif)', fontSize: 44, fontWeight: 400,
            letterSpacing: -1, lineHeight: 1.1, color: '#fff', marginBottom: 18,
          }}>
            Acompanhamento contínuo<br />
            <em style={{ fontStyle: 'italic', color: KM.brand.coral }}>das suas pacientes.</em>
          </div>
          <div style={{
            fontFamily: 'var(--serif)', fontSize: 16, fontStyle: 'italic',
            color: KM.ink.onDarkDim, lineHeight: 1.55, maxWidth: 420,
          }}>
            Visualize leituras diárias, alertas precoces de pré-eclâmpsia e comunique
            diretamente com as grávidas que segue.
          </div>

          <div style={{ flex: 1 }} />

          <div style={{
            fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 1.5,
            textTransform: 'uppercase', color: KM.ink.onDarkDim,
          }}>
            Acesso reservado a profissionais de saúde
          </div>

          {/* sutil acento */}
          <div style={{
            position: 'absolute', bottom: -120, right: -120,
            width: 360, height: 360, borderRadius: '50%',
            background: `radial-gradient(circle, ${KM.brand.coral}22 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />
        </div>
      )}

      {/* Formulário */}
      <div style={{
        flex: '1 1 50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: isCompact ? '32px 20px' : '56px',
      }}>
        <form onSubmit={submit} style={{
          width: '100%', maxWidth: 380,
          display: 'flex', flexDirection: 'column', gap: 18,
        }}>
          {isCompact && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 11,
                background: `linear-gradient(135deg, ${KM.brand.coral}, ${KM.brand.deep})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <KairosMark size={18} color="#fff" />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 500, letterSpacing: -0.3 }}>Kairos</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: 1.5, textTransform: 'uppercase', color: KM.ink.tertiary }}>
                  Portal Clínico
                </div>
              </div>
            </div>
          )}

          <div>
            <div style={{
              fontFamily: 'var(--serif)', fontSize: 30, fontWeight: 500,
              letterSpacing: -0.6, color: KM.ink.primary, marginBottom: 6,
            }}>
              Bem-vindo
            </div>
            <div style={{ fontSize: 14, color: KM.ink.tertiary, lineHeight: 1.5 }}>
              Aceda ao portal com as suas credenciais profissionais.
            </div>
          </div>

          <Field label="Email institucional">
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              style={inputStyle()}
            />
          </Field>

          <Field label="Palavra-passe" extra={
            <a href="#" style={{ fontSize: 12, color: KM.brand.deep, textDecoration: 'none', fontWeight: 500 }}>
              Esqueci-me
            </a>
          }>
            <input
              type="password" value={pw} onChange={(e) => setPw(e.target.value)}
              style={inputStyle()}
            />
          </Field>

          <label style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontSize: 13, color: KM.ink.secondary, cursor: 'pointer', userSelect: 'none',
          }}>
            <input type="checkbox" defaultChecked style={{ accentColor: KM.brand.deep }} />
            Manter sessão neste dispositivo
          </label>

          <button type="submit" style={{
            padding: '13px 18px', borderRadius: KM.radius.md, border: 'none',
            background: KM.ink.primary, color: '#fff',
            fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 600, cursor: 'pointer',
            letterSpacing: 0.1,
            boxShadow: KM.shadow.md,
          }}>Entrar</button>

          <div style={{
            marginTop: 8, padding: '12px 14px',
            background: KM.surface.sunken, borderRadius: KM.radius.sm,
            fontSize: 12, lineHeight: 1.5, color: KM.ink.tertiary,
            display: 'flex', gap: 10, alignItems: 'flex-start',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
              <circle cx="12" cy="12" r="9" stroke={KM.ink.tertiary} strokeWidth="1.6"/>
              <path d="M12 8v5M12 16v.5" stroke={KM.ink.tertiary} strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            Os dados clínicos visualizados são protegidos e auditados. Acesso individual,
            não partilhe credenciais.
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children, extra }) {
  return (
    <div>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        marginBottom: 6,
      }}>
        <label style={{
          fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 1.4,
          textTransform: 'uppercase', color: KM.ink.tertiary, fontWeight: 500,
        }}>{label}</label>
        {extra}
      </div>
      {children}
    </div>
  );
}

function inputStyle() {
  return {
    width: '100%', boxSizing: 'border-box',
    padding: '11px 13px', borderRadius: KM.radius.sm,
    border: `1px solid ${KM.line}`, background: KM.surface.panel,
    fontFamily: 'var(--sans)', fontSize: 14, color: KM.ink.primary,
    outline: 'none',
  };
}

Object.assign(window, { ScreenMedicoLogin, Field, inputStyle });

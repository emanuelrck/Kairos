// medico-chatbot.jsx
// Botão flutuante (canto inferior direito) + painel de chatbot assistente.

function ChatbotFAB() {
  const [open, setOpen] = React.useState(false);
  const { isMobile } = useViewport();
  const [draft, setDraft] = React.useState('');
  const [messages, setMessages] = React.useState([
    { from: 'bot', text: 'Olá Dra. Helena. Sou o assistente Kairos. Posso ajudar a interpretar leituras, sugerir condutas ou responder a dúvidas clínicas. Como posso ajudar?', t: 'agora' },
  ]);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages(m => [...m, { from: 'user', text, t: 'agora' }]);
    setDraft('');
    // Resposta simulada
    setTimeout(() => {
      setMessages(m => [...m, {
        from: 'bot',
        text: 'Com base nas leituras recentes, recomendaria repetir a tensão em 1h e vigiar sintomas como cefaleia, alterações visuais ou dor epigástrica. Quer que prepare uma nota clínica?',
        t: 'agora',
      }]);
    }, 700);
  };

  const suggestions = [
    'Resumo das pacientes em risco hoje',
    'Critérios para suspeita de pré-eclâmpsia',
    'Sugerir conduta para tensão 138/89',
  ];

  return (
    <>
      {/* Backdrop + Modal */}
      {open && (
        <div onClick={() => setOpen(false)} style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(31,26,29,0.55)',
          backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: isMobile ? 0 : 32,
          animation: 'kairosFadeIn 0.18s ease-out',
        }}>
        <style>{`
          @keyframes kairosFadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes kairosSlideUp { from { opacity: 0; transform: translateY(12px) scale(0.985); } to { opacity: 1; transform: translateY(0) scale(1); } }
        `}</style>
        <div onClick={(e) => e.stopPropagation()} style={{
          width: isMobile ? '100%' : 'min(900px, 100%)',
          height: isMobile ? '100%' : 'min(720px, 100%)',
          background: KM.surface.panel,
          borderRadius: isMobile ? 0 : KM.radius.xl,
          boxShadow: '0 24px 60px rgba(31,26,29,0.35), 0 8px 24px rgba(31,26,29,0.20)',
          border: `1px solid ${KM.line2}`,
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          fontFamily: 'var(--sans)',
          animation: 'kairosSlideUp 0.22s ease-out',
        }}>
          {/* Header */}
          <div style={{
            padding: '18px 24px',
            background: KM.surface.sidebar,
            color: '#fff',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 13,
              background: `linear-gradient(135deg, ${KM.brand.coral}, ${KM.brand.deep})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 6px 16px ${KM.brand.coral}66`,
              flexShrink: 0,
            }}>
              <KairosMark size={22} color="#fff" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 19, fontWeight: 500, letterSpacing: -0.3 }}>
                Assistente Kairos
              </div>
              <div style={{ fontSize: 12, color: KM.ink.onDarkDim, marginTop: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7AA882' }} />
                Online · IA clínica
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Fechar" style={{
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)',
              cursor: 'pointer', color: KM.ink.onDark,
              width: 36, height: 36, borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} style={{
            flex: 1, overflowY: 'auto',
            padding: isMobile ? '20px 16px' : '28px 32px',
            background: KM.surface.app,
            display: 'flex', flexDirection: 'column', gap: 12,
          }}>
            <div style={{
              maxWidth: 760, width: '100%', margin: '0 auto',
              display: 'flex', flexDirection: 'column', gap: 12,
            }}>
              {messages.map((m, i) => <ChatbotBubble key={i} m={m} />)}

              {messages.length <= 1 && (
                <div style={{ marginTop: 14 }}>
                  <div style={{
                    fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 1.4,
                    textTransform: 'uppercase', color: KM.ink.tertiary, fontWeight: 500,
                    marginBottom: 10,
                  }}>Sugestões</div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: 8,
                  }}>
                    {suggestions.map((s, i) => (
                      <button key={i} onClick={() => setDraft(s)} style={{
                        textAlign: 'left',
                        padding: '12px 14px', borderRadius: KM.radius.md,
                        background: KM.surface.panel, border: `1px solid ${KM.line2}`,
                        cursor: 'pointer', fontSize: 13, color: KM.ink.secondary,
                        fontFamily: 'var(--sans)', lineHeight: 1.4,
                        transition: 'border-color 0.15s, background 0.15s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = KM.line; e.currentTarget.style.background = KM.surface.panel2; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = KM.line2; e.currentTarget.style.background = KM.surface.panel; }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Composer */}
          <div style={{
            padding: isMobile ? '14px 16px' : '18px 32px',
            borderTop: `1px solid ${KM.line2}`,
            background: KM.surface.panel,
          }}>
            <div style={{
              maxWidth: 760, margin: '0 auto',
              display: 'flex', gap: 10, alignItems: 'flex-end',
            }}>
              <textarea
                value={draft} onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder="Pergunte ao assistente..."
                rows={1}
                style={{
                  flex: 1, resize: 'none', maxHeight: 160,
                  padding: '12px 14px', borderRadius: KM.radius.md,
                  border: `1px solid ${KM.line}`, outline: 'none',
                  fontFamily: 'var(--sans)', fontSize: 14, color: KM.ink.primary,
                  background: KM.surface.panel,
                }}
              />
              <button onClick={send} disabled={!draft.trim()} style={{
                padding: '12px 16px', borderRadius: KM.radius.md, border: 'none',
                background: draft.trim() ? KM.ink.primary : KM.surface.sunken,
                color: draft.trim() ? '#fff' : KM.ink.muted,
                cursor: draft.trim() ? 'pointer' : 'default',
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 500,
              }} aria-label="Enviar">
                Enviar
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M14 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div style={{
            padding: '10px 16px',
            fontSize: 11, color: KM.ink.tertiary,
            textAlign: 'center', borderTop: `1px solid ${KM.line2}`,
            background: KM.surface.panel2,
          }}>
            Sugestões geradas por IA. Não substituem juízo clínico.
          </div>
        </div>
        </div>
      )}

      {/* FAB — balão de fala com 3 pontos */}
      {!open && (
        <button onClick={() => setOpen(true)} aria-label="Abrir assistente" style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 999,
          width: 72, height: 64, padding: 0, border: 'none',
          background: 'transparent', cursor: 'pointer', display: 'block',
          filter: `drop-shadow(0 8px 18px ${KM.brand.coral}66) drop-shadow(0 2px 4px rgba(31,26,29,0.20))`,
          transition: 'transform 0.15s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
          <svg width="72" height="64" viewBox="0 0 72 64" style={{ display: 'block' }}>
            <defs>
              <linearGradient id="kairos-fab-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={KM.brand.coral} />
                <stop offset="100%" stopColor={KM.brand.deep} />
              </linearGradient>
            </defs>
            {/* Corpo: rounded rect 72x52, cauda no canto inferior esquerdo */}
            <path d="
              M 16 0
              H 56
              A 16 16 0 0 1 72 16
              V 36
              A 16 16 0 0 1 56 52
              H 22
              L 12 64
              L 14 52
              H 16
              A 16 16 0 0 1 0 36
              V 16
              A 16 16 0 0 1 16 0
              Z
            " fill="url(#kairos-fab-grad)" />
            {/* 3 pontos brancos */}
            <circle cx="24" cy="26" r="3.2" fill="#fff" />
            <circle cx="36" cy="26" r="3.2" fill="#fff" />
            <circle cx="48" cy="26" r="3.2" fill="#fff" />
          </svg>
        </button>
      )}
    </>
  );
}

function ChatbotBubble({ m }) {
  const isUser = m.from === 'user';
  return (
    <div style={{
      display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start',
    }}>
      <div style={{
        maxWidth: '78%',
        padding: '12px 16px',
        borderRadius: 16,
        borderBottomRightRadius: isUser ? 4 : 16,
        borderBottomLeftRadius: isUser ? 16 : 4,
        background: isUser ? KM.ink.primary : KM.surface.panel,
        color: isUser ? '#fff' : KM.ink.primary,
        border: isUser ? 'none' : `1px solid ${KM.line2}`,
        fontSize: 14.5, lineHeight: 1.55,
        boxShadow: KM.shadow.sm,
      }}>{m.text}</div>
    </div>
  );
}

Object.assign(window, { ChatbotFAB, ChatbotBubble });

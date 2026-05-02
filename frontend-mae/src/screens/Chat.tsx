import React from 'react';
import { KAIROS } from '@/theme';
import type { Go, ScreenName } from '@/types';

const KC = KAIROS;

const MOTHER_ID = 'web-maria';

interface ChatMessage { role: 'user' | 'assistant'; content: string; }

export function ScreenChat({ go }: { go: Go }) {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Olá Maria. Estou aqui se tiveres alguma dúvida — sobre sintomas, alimentação, exames, o que sentes hoje. O que te apetece perguntar?'
    }
  ]);
  const [input, setInput] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, busy]);

  const send = async (text?: string) => {
    const trimmed = (text ?? input).trim();
    if (!trimmed || busy) return;
    const next: ChatMessage[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(next);
    setInput('');
    setBusy(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, motherId: MOTHER_ID }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { reply: string };
      setMessages([...next, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages([...next, {
        role: 'assistant',
        content: 'Desculpa, não consegui responder agora. Tenta de novo daqui a pouco.'
      }]);
    } finally {
      setBusy(false);
    }
  };

  const suggestions = [
    'Posso tomar paracetamol?',
    'Que sintomas devo vigiar?',
    'O que comer ao pequeno-almoço?',
    'Sinto pés inchados — é normal?'
  ];

  return (
    <div style={{
      height: '100%',
      background: `linear-gradient(180deg, ${KC.pink.blush} 0%, ${KC.pink.powder} 60%, ${KC.paper} 100%)`,
      paddingTop: 60,
      display: 'flex', flexDirection: 'column',
      boxSizing: 'border-box', overflow: 'hidden'
    }}>
      <div style={{
        padding: '14px 20px 12px',
        display: 'flex', alignItems: 'center', gap: 12,
        flexShrink: 0
      }}>
        <button onClick={() => go('dashboard')} style={{
          width: 40, height: 40, borderRadius: '50%', border: 'none',
          background: '#fff', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(122,15,77,0.08)', flexShrink: 0
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path d="M10 3L4 8l6 5" stroke={KC.pink.wine} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: 'var(--sans)', fontSize: 10, letterSpacing: 1.6,
            textTransform: 'uppercase', color: KC.ink3, fontWeight: 500
          }}>Assistente</div>
          <div style={{
            fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 500,
            color: KC.pink.wine, letterSpacing: -0.5, lineHeight: 1, marginTop: 2,
            display: 'flex', alignItems: 'center', gap: 8
          }}>
            Kairos
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '3px 9px', borderRadius: 999,
              background: '#E8F5EC', fontFamily: 'var(--sans)', fontSize: 10,
              fontWeight: 500, color: '#2F7A48', letterSpacing: 0.3,
              textTransform: 'uppercase'
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%', background: '#3B9A5A',
                boxShadow: '0 0 0 2px #C4ECCF'
              }} />
              online
            </span>
          </div>
        </div>
      </div>

      <div ref={scrollRef} style={{
        flex: 1, overflow: 'auto',
        padding: '10px 20px 4px',
        display: 'flex', flexDirection: 'column', gap: 10
      }}>
        {messages.map((m, i) => (
          <Bubble key={i} role={m.role} content={m.content} />
        ))}
        {busy && <TypingBubble />}
      </div>

      {messages.filter(m => m.role === 'user').length === 0 && !busy && (
        <div style={{
          padding: '4px 16px 8px',
          display: 'flex', gap: 8, overflowX: 'auto', flexShrink: 0
        }}>
          {suggestions.map(s => (
            <button key={s} onClick={() => send(s)} style={{
              padding: '8px 14px', borderRadius: 999,
              background: 'rgba(255,255,255,0.85)',
              border: `1px solid ${KC.pink.rose}`,
              fontFamily: 'var(--sans)', fontSize: 12, color: KC.pink.wine,
              fontWeight: 500, whiteSpace: 'nowrap', cursor: 'pointer',
              flexShrink: 0
            }}>{s}</button>
          ))}
        </div>
      )}

      <div style={{
        padding: '8px 16px 28px',
        flexShrink: 0,
        display: 'flex', alignItems: 'center', gap: 8
      }}>
        <div style={{
          flex: 1,
          display: 'flex', alignItems: 'center',
          background: '#fff', borderRadius: 999,
          padding: '4px 4px 4px 18px',
          boxShadow: '0 2px 14px rgba(122,15,77,0.07)'
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
            placeholder="Pergunta-me alguma coisa…"
            disabled={busy}
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontFamily: 'var(--sans)', fontSize: 14, color: KC.pink.wine,
              padding: '10px 0'
            }}
          />
          <button
            onClick={() => send()}
            disabled={busy || !input.trim()}
            style={{
              width: 40, height: 40, borderRadius: '50%', border: 'none',
              background: input.trim() && !busy
                ? `linear-gradient(135deg, ${KC.pink.coral} 0%, ${KC.pink.deep} 100%)`
                : KC.pink.rose,
              cursor: input.trim() && !busy ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              boxShadow: input.trim() && !busy ? `0 4px 12px ${KC.pink.coral}55` : 'none',
              transition: 'all 0.2s'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8l12-5-5 12-2-5-5-2z" fill="#fff" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function Bubble({ role, content }: { role: ChatMessage['role']; content: string }) {
  const isUser = role === 'user';
  return (
    <div style={{
      display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start',
      gap: 8, alignItems: 'flex-end'
    }}>
      {!isUser && (
        <div style={{
          width: 26, height: 26, borderRadius: '50%',
          background: `linear-gradient(135deg, ${KC.pink.coral} 0%, ${KC.pink.deep} 100%)`,
          flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--serif)', fontSize: 12, color: '#fff', fontWeight: 500,
          marginBottom: 2
        }}>K</div>
      )}
      <div style={{
        maxWidth: '78%',
        padding: '10px 14px',
        borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        background: isUser
          ? `linear-gradient(135deg, ${KC.pink.coral} 0%, ${KC.pink.deep} 100%)`
          : '#fff',
        color: isUser ? '#fff' : KC.ink2,
        fontFamily: 'var(--sans)', fontSize: 14, lineHeight: 1.5,
        boxShadow: isUser
          ? `0 2px 10px ${KC.pink.coral}40`
          : '0 2px 10px rgba(122,15,77,0.05)',
        whiteSpace: 'pre-wrap'
      }}>
        {content}
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
      <div style={{
        width: 26, height: 26, borderRadius: '50%',
        background: `linear-gradient(135deg, ${KC.pink.coral} 0%, ${KC.pink.deep} 100%)`,
        flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--serif)', fontSize: 12, color: '#fff', fontWeight: 500,
        marginBottom: 2
      }}>K</div>
      <div style={{
        padding: '12px 16px', borderRadius: '18px 18px 18px 4px',
        background: '#fff', boxShadow: '0 2px 10px rgba(122,15,77,0.05)',
        display: 'flex', gap: 4, alignItems: 'center'
      }}>
        <Dot delay={0} />
        <Dot delay={0.2} />
        <Dot delay={0.4} />
      </div>
      <style>{`
        @keyframes kairosDot {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-3px); }
        }
      `}</style>
    </div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <div style={{
      width: 6, height: 6, borderRadius: '50%',
      background: KC.pink.coral,
      animation: `kairosDot 1.2s ease-in-out ${delay}s infinite`
    }} />
  );
}

export function ChatFAB({ screen, go }: { screen: ScreenName | string; go: Go }) {
  const hiddenOn = ['chat', 'welcome', 'login', 'register', 'alert-critical',
                    'reading1', 'reading2', 'reading3', 'reading4'];
  if (hiddenOn.includes(screen)) return null;

  const hasTabBar = ['dashboard', 'history', 'alert', 'profile'].includes(screen);
  const bottom = hasTabBar ? 102 : 28;

  return (
    <>
      <button
        onClick={() => go('chat')}
        aria-label="Abrir assistente Kairos"
        style={{
          position: 'absolute',
          bottom, right: 18,
          width: 56, height: 56, borderRadius: '50%',
          border: 'none', cursor: 'pointer',
          background: `linear-gradient(135deg, ${KC.pink.coral} 0%, ${KC.pink.deep} 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 6px 20px ${KC.pink.coral}66, 0 2px 6px rgba(122,15,77,0.18)`,
          zIndex: 40,
          padding: 0
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M4 6a3 3 0 013-3h10a3 3 0 013 3v8a3 3 0 01-3 3h-5l-4 3v-3H7a3 3 0 01-3-3V6z"
                fill="#fff" />
          <circle cx="9" cy="10" r="1" fill={KC.pink.deep} />
          <circle cx="12" cy="10" r="1" fill={KC.pink.deep} />
          <circle cx="15" cy="10" r="1" fill={KC.pink.deep} />
        </svg>
        <div style={{
          position: 'absolute', top: 4, right: 4,
          width: 12, height: 12, borderRadius: '50%',
          background: '#3B9A5A',
          border: '2.5px solid #fff',
          boxShadow: `0 0 0 0 ${'#3B9A5A'}80`,
          animation: 'kairosFabPulse 2.4s ease-in-out infinite'
        }} />
      </button>
      <style>{`
        @keyframes kairosFabPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59,154,90,0.6); }
          50% { box-shadow: 0 0 0 6px rgba(59,154,90,0); }
        }
      `}</style>
    </>
  );
}

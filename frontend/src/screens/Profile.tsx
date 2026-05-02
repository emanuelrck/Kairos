import React from 'react';
import { KAIROS } from '@/theme';
import { TabBar } from '@/components/nav';
import type { Go } from '@/types';

const KO = KAIROS;

export function ScreenProfile({ go }: { go: Go }) {
  return (
    <div style={{
      height: '100%',
      background: `linear-gradient(180deg, ${KO.pink.blush} 0%, ${KO.pink.powder} 280px, ${KO.paper} 520px)`,
      paddingTop: 60, paddingBottom: 110, overflow: 'auto', boxSizing: 'border-box',
    }}>
      <div style={{ padding: '14px 24px 18px' }}>
        <div style={{ fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: 1.4, textTransform: 'uppercase', color: KO.ink3, fontWeight: 500 }}>
          A minha conta
        </div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 400, color: KO.pink.wine, marginTop: 2, letterSpacing: -0.8, lineHeight: 1 }}>
          Perfil
        </div>
      </div>

      <div style={{ padding: '0 20px' }}>
        <div style={{
          background: '#fff', borderRadius: 22, padding: '18px 20px',
          display: 'flex', alignItems: 'center', gap: 16,
          boxShadow: '0 2px 14px rgba(122,15,77,0.05)',
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: `linear-gradient(135deg, ${KO.pink.rose}, ${KO.pink.coral})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 500,
            flexShrink: 0,
          }}>MS</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500, color: KO.pink.wine, letterSpacing: -0.4, lineHeight: 1.1 }}>Maria Silva</div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: 12, color: KO.ink3, marginTop: 4 }}>32 anos · Lisboa</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        <ProfileSection title="Gravidez" />
        <ProfileCard rows={[
          ['Semana atual', '24 sem'],
          ['Data prevista parto', '14 Ago 2026'],
          ['Trimestre', '2º'],
          ['Primeira gravidez', 'Sim'],
        ]} />
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        <ProfileSection title="Equipa de saúde" />
        <div style={{
          background: '#fff', borderRadius: 22, padding: 18,
          boxShadow: '0 2px 14px rgba(122,15,77,0.05)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: KO.pink.blush,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: KO.pink.deep, fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 600,
            }}>AC</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 500, color: KO.pink.wine, letterSpacing: -0.2 }}>Dra. Ana Costa</div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: 12, color: KO.ink3, marginTop: 2 }}>Obstetra · Maternidade A. da Costa</div>
            </div>
          </div>
          <div style={{
            marginTop: 14, padding: '10px 12px', borderRadius: 12,
            background: KO.pink.blush,
            fontFamily: 'var(--sans)', fontSize: 12, color: KO.pink.deep,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: KO.pink.coral }} />
            Recebe alertas em tempo real do seu score de risco.
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        <ProfileSection title="Antecedentes" />
        <ProfileCard rows={[
          ['Pré-eclâmpsia anterior', 'Não'],
          ['Histórico familiar', 'Sim · mãe'],
          ['Hipertensão crónica', 'Não'],
          ['Diabetes', 'Não'],
        ]} />
      </div>

      <div style={{ padding: '20px 20px 24px' }}>
        <ProfileSection title="Conta" />
        <ProfileCard rows={[
          ['Email', 'maria.silva@email.pt'],
          ['Notificações', 'Ativadas'],
          ['Idioma', 'Português'],
          ['Modelo de risco', 'XGBoost · v2.4'],
        ]} />
      </div>

      <div style={{ padding: '0 20px 28px' }}>
        <button onClick={() => go('welcome')} style={{
          width: '100%', padding: '15px 18px', borderRadius: 18,
          border: `1px solid ${KO.line}`, background: '#fff',
          fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 500,
          color: KO.pink.wine, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          boxShadow: '0 2px 10px rgba(122,15,77,0.04)',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M15 4h3a2 2 0 012 2v12a2 2 0 01-2 2h-3M10 17l-5-5 5-5M5 12h12" stroke={KO.pink.wine} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Terminar sessão
        </button>
        <div style={{
          marginTop: 14, textAlign: 'center',
          fontFamily: 'var(--sans)', fontSize: 11, color: KO.ink3,
        }}>
          Kairos · v1.0.0
        </div>
      </div>

      <TabBar active="profile" go={go} />
    </div>
  );
}

function ProfileSection({ title }: { title: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500,
      color: KO.pink.wine, letterSpacing: -0.4,
      marginBottom: 12, padding: '0 4px',
    }}>{title}</div>
  );
}

function ProfileCard({ rows }: { rows: [React.ReactNode, React.ReactNode][] }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 22,
      boxShadow: '0 2px 14px rgba(122,15,77,0.05)',
      overflow: 'hidden',
    }}>
      {rows.map(([k, v], i) => (
        <div key={i} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '14px 18px',
          borderTop: i > 0 ? `1px solid ${KO.pink.blush}` : 'none',
        }}>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 13, color: KO.ink3 }}>{k}</span>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, color: KO.pink.wine }}>{v}</span>
        </div>
      ))}
    </div>
  );
}

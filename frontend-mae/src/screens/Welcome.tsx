import { KAIROS } from '@/theme';
import { btnPrimary, btnGhost, KairosMark } from '@/components/form';
import type { Go } from '@/types';

const K = KAIROS;

export function ScreenWelcome({ go }: { go: Go }) {
  return (
    <div style={{
      height: '100%', position: 'relative', overflow: 'hidden',
      background: `linear-gradient(180deg, ${K.pink.blush} 0%, ${K.pink.powder} 50%, ${K.paper} 100%)`
    }}>
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
    </div>
  );
}

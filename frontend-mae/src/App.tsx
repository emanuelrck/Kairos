import React from 'react';
import { IOSDevice } from '@/components/ios';
import { TweaksPanel, TweakSection, TweakRadio, TweakToggle, TweakSelect, useTweaks } from '@/components/tweaks';
import { KairosMark } from '@/components/form';
import {
  ScreenWelcome, ScreenLogin, ScreenRegister, ScreenDashboard,
  ScreenReading1, ScreenReading2, ScreenReading3, ScreenReading4,
  ScreenHistory, ScreenAlert, ScreenProfile, ScreenAlerts, ScreenChat, ChatFAB,
} from '@/screens';
import type { ReadingData, RiskLevel, IndicatorStyle, ScreenName } from '@/types';

interface Tweaks {
  indicator: IndicatorStyle;
  showPercent: boolean;
  scenario: RiskLevel;
  screen: ScreenName | string;
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "indicator": "bold",
  "showPercent": true,
  "scenario": "safe",
  "screen": "welcome"
}/*EDITMODE-END*/ satisfies Tweaks;

export default function App() {
  const [t, setTweak] = useTweaks<Tweaks>(TWEAK_DEFAULTS);
  const [screen, setScreen] = React.useState<ScreenName | string>(t.screen || 'welcome');
  const [readingData, setReadingData] = React.useState<ReadingData>({
    sys: 138, dia: 89, hr: 84, weight: 71.2, temp: 36.7, glu: 98,
    head: 50, epi: 25, edema: 70, visual: false,
    proteinuria: 'plus1',
  });

  const { score, level } = React.useMemo<{ score: number; level: RiskLevel }>(() => {
    if (t.scenario === 'watch') return { score: 38, level: 'watch' };
    if (t.scenario === 'alert') return { score: 78, level: 'alert' };
    return { score: 12, level: 'safe' };
  }, [t.scenario]);

  const go = (s: ScreenName | string) => {
    setScreen(s);
    if (s === 'dashboard' || s === 'history' || s === 'profile' || s === 'welcome') {
      setTweak('screen', s);
    }
  };

  const renderScreen = () => {
    switch (screen) {
      case 'welcome': return <ScreenWelcome go={go} />;
      case 'login': return <ScreenLogin go={go} />;
      case 'register': return <ScreenRegister go={go} />;
      case 'dashboard': return <ScreenDashboard go={go} riskLevel={level} score={score} showPercent={t.showPercent} indicator={t.indicator} />;
      case 'reading1': return <ScreenReading1 go={go} data={readingData} setData={setReadingData} />;
      case 'reading2': return <ScreenReading2 go={go} data={readingData} setData={setReadingData} />;
      case 'reading3': return <ScreenReading3 go={go} data={readingData} setData={setReadingData} />;
      case 'reading4': return <ScreenReading4 go={go} riskLevel={level} score={score} />;
      case 'history': return <ScreenHistory go={go} />;
      case 'alert': return <ScreenAlerts go={go} />;
      case 'alert-critical': return <ScreenAlert go={go} />;
      case 'profile': return <ScreenProfile go={go} />;
      case 'chat': return <ScreenChat go={go} />;
      case 'tips': return <ScreenDashboard go={go} riskLevel={level} score={score} showPercent={t.showPercent} indicator={t.indicator} />;
      default: return <ScreenWelcome go={go} />;
    }
  };

  return (
    <div data-screen-label={`Kairos · ${screen}`} style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px', gap: 24,
    }}>
      <div style={{ textAlign: 'center', maxWidth: 520 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '6px 12px', borderRadius: 999,
          background: 'rgba(255,255,255,0.6)',
          border: '1px solid rgba(155,77,85,0.12)',
          backdropFilter: 'blur(20px)',
        }}>
          <div style={{
            width: 22, height: 22, borderRadius: 7,
            background: 'linear-gradient(135deg, #D87878, #9B4D55)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><KairosMark size={13} color="#fff" /></div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: '#5F2A33', fontWeight: 500 }}>
            Kairos · App da Grávida
          </span>
        </div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 15, color: '#5F2A33', opacity: 0.7, marginTop: 10, fontStyle: 'italic' }}>
          ecrã: {screen}
        </div>
      </div>

      <IOSDevice dark={false}>
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          {renderScreen()}
          <ChatFAB screen={screen} go={go} />
        </div>
      </IOSDevice>

      <div style={{
        fontFamily: 'var(--mono)', fontSize: 10, color: '#5F2A3399', letterSpacing: 1,
        textAlign: 'center', maxWidth: 380, lineHeight: 1.6, textTransform: 'uppercase',
      }}>
        Toque em &quot;Tweaks&quot; para alternar cenário de risco, indicador, e percentagem
      </div>

      <TweaksPanel title="Kairos · Tweaks">
        <TweakSection label="Cenário" />
        <TweakRadio<RiskLevel> label="Risco" value={t.scenario}
          options={[
            { value: 'safe', label: 'Normal' },
            { value: 'watch', label: 'Atenção' },
            { value: 'alert', label: 'Alerta' },
          ]}
          onChange={(v) => setTweak('scenario', v)} />

        <TweakSection label="Indicador de risco" />
        <TweakRadio<IndicatorStyle> label="Estilo" value={t.indicator}
          options={[
            { value: 'bold', label: 'Bold' },
            { value: 'editorial', label: 'Editorial' },
            { value: 'banner', label: 'Banner' },
            { value: 'thermo', label: 'Termómetro' },
            { value: 'gauge', label: 'Gauge' },
          ]}
          onChange={(v) => setTweak('indicator', v)} />
        <TweakToggle label="Mostrar percentagem"
          value={t.showPercent} onChange={(v) => setTweak('showPercent', v)} />

        <TweakSection label="Navegação rápida" />
        <TweakSelect label="Ir para ecrã"
          value={screen}
          options={[
            { value: 'welcome', label: 'Bem-vinda' },
            { value: 'login', label: 'Login' },
            { value: 'register', label: 'Registo (3 passos)' },
            { value: 'dashboard', label: 'Dashboard' },
            { value: 'reading1', label: 'Leitura · Vitais' },
            { value: 'reading2', label: 'Leitura · Sintomas' },
            { value: 'reading3', label: 'Leitura · Proteinúria' },
            { value: 'reading4', label: 'Leitura · Resultado' },
            { value: 'history', label: 'Histórico/Tendências' },
            { value: 'alert', label: 'Alertas (lista)' },
            { value: 'alert-critical', label: 'Alerta crítico' },
            { value: 'profile', label: 'Perfil' },
            { value: 'chat', label: 'Chat / Assistente' },
          ]}
          onChange={(v) => { setScreen(v); setTweak('screen', v); }} />
      </TweaksPanel>
    </div>
  );
}

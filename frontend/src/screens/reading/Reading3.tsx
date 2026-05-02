import { KAIROS } from '@/theme';
import type { Go, ReadingData, ProteinuriaValue, SetReadingData } from '@/types';
import { FlowShell, Eyebrow, FlowTitle, FlowFooter, ContinueBtn, RadioCard } from './shared';

const KR = KAIROS;

const PROTEIN_OPTIONS: { k: ProteinuriaValue; title: string; sub: string }[] = [
  { k: 'neg',    title: 'Negativo', sub: 'Sem proteínas detetadas' },
  { k: 'trace',  title: 'Traços',   sub: 'Pequena quantidade' },
  { k: 'plus1',  title: '+',        sub: 'Quantidade ligeira' },
  { k: 'plus2',  title: '++',       sub: 'Quantidade moderada' },
  { k: 'plus3',  title: '+++',      sub: 'Quantidade elevada' },
];

export function ScreenReading3({
  go, data, setData,
}: { go: Go; data: ReadingData; setData: SetReadingData }) {
  const value = data.proteinuria || 'plus1';
  return (
    <FlowShell step={3} onBack={() => go('reading2')}>
      <Eyebrow>Passo 3 de 3</Eyebrow>
      <FlowTitle>Proteinúria</FlowTitle>
      <div style={{
        fontFamily: 'var(--sans)', fontSize: 14, color: KR.ink2, marginTop: 14,
      }}>Selecione o resultado da tira urinária:</div>

      <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {PROTEIN_OPTIONS.map(o => (
          <RadioCard key={o.k}
            title={o.title} sub={o.sub}
            selected={value === o.k}
            onClick={() => setData({ ...data, proteinuria: o.k })} />
        ))}
      </div>

      <FlowFooter>
        <ContinueBtn onClick={() => go('reading4')}>Calcular risco</ContinueBtn>
      </FlowFooter>
    </FlowShell>
  );
}

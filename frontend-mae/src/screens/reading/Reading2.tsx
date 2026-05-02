import type { Go, ReadingData, SetReadingData } from '@/types';
import { FlowShell, Eyebrow, FlowTitle, FlowFooter, ContinueBtn, SymptomCard, CheckCard } from './shared';

export function ScreenReading2({
  go, data, setData,
}: { go: Go; data: ReadingData; setData: SetReadingData }) {
  return (
    <FlowShell step={2} onBack={() => go('reading1')}>
      <Eyebrow>Passo 2 de 3</Eyebrow>
      <FlowTitle>Sintomas</FlowTitle>

      <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SymptomCard label="Cefaleia (dor de cabeça)" value={data.head}
          onChange={(v) => setData({ ...data, head: v })} />
        <SymptomCard label="Dor epigástrica" value={data.epi}
          onChange={(v) => setData({ ...data, epi: v })} />
        <SymptomCard label="Edema (inchaço)" value={data.edema}
          onChange={(v) => setData({ ...data, edema: v })} />
        <CheckCard
          label="Alterações visuais (visão turva, manchas)"
          value={data.visual}
          onChange={(v) => setData({ ...data, visual: v })} />
      </div>

      <FlowFooter>
        <ContinueBtn onClick={() => go('reading3')}>Continuar</ContinueBtn>
      </FlowFooter>
    </FlowShell>
  );
}

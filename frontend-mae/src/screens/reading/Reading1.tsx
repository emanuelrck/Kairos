import type { Go, ReadingData, SetReadingData } from '@/types';
import { FlowShell, Eyebrow, FlowTitle, FlowFooter, ContinueBtn, BPHero, VitalTile } from './shared';

export function ScreenReading1({
  go, data, setData,
}: { go: Go; data: ReadingData; setData: SetReadingData }) {
  return (
    <FlowShell step={1} onBack={() => go('dashboard')}>
      <Eyebrow>Passo 1 de 3</Eyebrow>
      <FlowTitle>Sinais vitais</FlowTitle>

      <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <BPHero
          sys={data.sys} dia={data.dia}
          onSys={(v) => setData({ ...data, sys: v })}
          onDia={(v) => setData({ ...data, dia: v })}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <VitalTile icon="heart" label="FC" value={data.hr} unit="bpm"
            onChange={(v) => setData({ ...data, hr: v })} min={40} max={180} />
          <VitalTile icon="scale" label="Peso" value={data.weight} unit="kg" decimals={1}
            onChange={(v) => setData({ ...data, weight: v })} min={40} max={150} step={0.1} />
          <VitalTile icon="thermo" label="Temp." value={data.temp} unit="°C" decimals={1}
            onChange={(v) => setData({ ...data, temp: v })} min={35} max={42} step={0.1} />
          <VitalTile icon="drop" label="Glicemia" value={data.glu} unit="mg/dL"
            onChange={(v) => setData({ ...data, glu: v })} min={40} max={400} />
        </div>
      </div>

      <FlowFooter>
        <ContinueBtn onClick={() => go('reading2')}>Continuar</ContinueBtn>
      </FlowFooter>
    </FlowShell>
  );
}

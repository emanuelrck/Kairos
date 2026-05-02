// medico-tokens.jsx
// Extensão dos tokens KAIROS para o portal do médico.
// Mesma família cromática da app da grávida, mas reposicionada para clínica:
// neutros frios dominantes, magenta como acento de marca, mais densidade.

const KM = (() => {
  const base = window.KAIROS;
  return {
    // Reaproveita a marca, com um wine ligeiramente mais quente para os números
    brand: {
      coral: base.pink.coral,
      deep:  base.pink.deep,
      wine:  '#8E2D5E',                  // wine mais quente (era #7A0F4D)
      wineDeep: base.pink.wine,          // wine original p/ contextos onde é preciso mais escuro
      blush: base.pink.blush,
      gradient: `linear-gradient(135deg, ${base.pink.coral} 0%, ${base.pink.deep} 100%)`,
    },
    // Paleta: gradiente coerente de rosas claros — tudo no mesmo undertone
    surface: {
      app:    '#F6EDEC',   // fundo: rosa-cremoso muito claro
      panel:  '#FEFBFA',   // cards: branco com tinta rosa imperceptível (warmer than pure)
      panel2: '#FBF5F4',   // cards alternados / linhas zebra
      sunken: '#F1E5E5',   // áreas afundadas (search, inputs) — pink-ish
      sidebar:'#3A1822',   // sidebar wine profundo
      kpiIcon:'#F6DCE5',   // círculo rosa p/ ícones e avatars (menos saturado, mesma família)
    },
    ink: {
      primary:   '#2A1620',  // wine bem escuro p/ texto principal
      secondary: '#5C4650',
      tertiary:  '#8E7C84',
      muted:     '#BAACB2',
      onDark:    '#F6EEEF',
      onDarkDim: '#A89094',
    },
    line:  'rgba(58, 24, 34, 0.10)',
    line2: 'rgba(58, 24, 34, 0.06)',
    // Cores de risco — paleta unificada na família rosa/wine + sálvia para o normal.
    // O âmbar foi substituído por coral-rosado para harmonizar com a marca.
    risk: {
      safe:  { bg: '#E8EEE2', fg: '#4A6B3F', dot: '#86A472', soft: '#D6E0C5' },   // sálvia warm, fica para o Normal
      watch: { bg: '#F8DEE2', fg: '#9A4854', dot: '#D88799', soft: '#F0C5CD' },   // rosa mid (Elevado) — todo na família rosa
      alert: { bg: '#F8DCE6', fg: '#9E2E5C', dot: '#D94B95', soft: '#F0BFD4' },   // magenta da marca (Crítico)
    },
    // Sombras com tinta wine subtil
    shadow: {
      sm: '0 1px 2px rgba(122,15,77,0.04), 0 1px 3px rgba(58,24,34,0.05)',
      md: '0 2px 6px rgba(122,15,77,0.05), 0 8px 20px rgba(58,24,34,0.06)',
      lg: '0 8px 24px rgba(122,15,77,0.10), 0 24px 48px rgba(58,24,34,0.10)',
    },
    radius: { sm: 8, md: 12, lg: 16, xl: 20 },
  };
})();

// Brand mark — réplica do KairosMark da app da grávida, isolada para o portal médico
function KairosMark({ size = 24, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M8 6v20M8 16l10-10M8 16l10 10" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="16" r="2" fill={color} />
    </svg>
  );
}

Object.assign(window, { KM, KairosMark });

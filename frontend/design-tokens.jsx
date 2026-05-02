// design-tokens.jsx
// Sistema visual do Kairos. Tons de rosa, tipografia, escalas.

const KAIROS = {
  // Magenta / pink vibrante (estilo referência)
  pink: {
    powder: '#FDF2F8',     // bg ultra-suave
    blush:  '#FCE4F1',     // bg cards quentes
    rose:   '#F5A8CC',     // acento médio
    coral:  '#D94B95',     // magenta-rosa (primary, suavizado)
    deep:   '#C71585',     // magenta profundo (CTA)
    wine:   '#7A0F4D',     // tipografia escura
  },
  // Neutros quentes
  ink:    '#2A1F23',
  ink2:   '#5C4A50',
  ink3:   '#8A7A7E',
  ink4:   '#B8AAAE',
  paper:  '#FCFAF9',
  paper2: '#F5EFEE',
  line:   'rgba(95, 42, 51, 0.10)',
  line2:  'rgba(95, 42, 51, 0.06)',
  // Estados de risco
  risk: {
    safe:  { bg: '#FBF4F3', fg: '#9B4D55', dot: '#D88FA0', ring: 'oklch(78% 0.08 10)' },
    watch: { bg: '#FBEFD9', fg: '#8A5A1A', dot: '#D9A04A', ring: 'oklch(78% 0.14 75)' },
    alert: { bg: '#F7DEDC', fg: '#8B2E2E', dot: '#C75151', ring: 'oklch(62% 0.18 25)' },
  },
};

const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
  :root {
    --serif: 'Fraunces', 'Cormorant Garamond', Georgia, serif;
    --sans: 'Inter', -apple-system, system-ui, sans-serif;
    --mono: 'JetBrains Mono', ui-monospace, monospace;
  }
`;

Object.assign(window, { KAIROS, FONTS });

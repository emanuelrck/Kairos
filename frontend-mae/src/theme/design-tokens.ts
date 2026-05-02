// Sistema visual do Kairos. Tons de rosa, tipografia, escalas.

export type RiskLevel = 'safe' | 'watch' | 'alert';

export interface RiskTokens {
  bg: string;
  fg: string;
  dot: string;
  ring: string;
}

export interface KairosTokens {
  pink: {
    powder: string;
    blush: string;
    rose: string;
    coral: string;
    deep: string;
    wine: string;
  };
  ink: string;
  ink2: string;
  ink3: string;
  ink4: string;
  paper: string;
  paper2: string;
  line: string;
  line2: string;
  risk: Record<RiskLevel, RiskTokens>;
}

export const KAIROS: KairosTokens = {
  pink: {
    powder: '#FDF2F8',
    blush:  '#FCE4F1',
    rose:   '#F5A8CC',
    coral:  '#D94B95',
    deep:   '#C71585',
    wine:   '#7A0F4D',
  },
  ink:    '#2A1F23',
  ink2:   '#5C4A50',
  ink3:   '#8A7A7E',
  ink4:   '#B8AAAE',
  paper:  '#FCFAF9',
  paper2: '#F5EFEE',
  line:   'rgba(95, 42, 51, 0.10)',
  line2:  'rgba(95, 42, 51, 0.06)',
  risk: {
    safe:  { bg: '#FBF4F3', fg: '#9B4D55', dot: '#D88FA0', ring: 'oklch(78% 0.08 10)' },
    watch: { bg: '#FBEFD9', fg: '#8A5A1A', dot: '#D9A04A', ring: 'oklch(78% 0.14 75)' },
    alert: { bg: '#F7DEDC', fg: '#8B2E2E', dot: '#C75151', ring: 'oklch(62% 0.18 25)' },
  },
};

export const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
  :root {
    --serif: 'Fraunces', 'Cormorant Garamond', Georgia, serif;
    --sans: 'Inter', -apple-system, system-ui, sans-serif;
    --mono: 'JetBrains Mono', ui-monospace, monospace;
  }
`;

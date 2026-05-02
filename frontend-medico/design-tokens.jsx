// design-tokens.jsx
// Tokens visuais partilhados com a app da grávida (frontend-mae/src/theme/design-tokens.ts).
// Esta é a versão UMD/global usada pelo portal clínico — Babel-standalone in-browser, sem bundler.
// Mantém-se em paridade manual com o ficheiro TypeScript da outra app.

window.KAIROS = {
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

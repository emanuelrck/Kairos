# Kairos — Portal Clínico (frontend-medico)

Portal web para profissionais de saúde acompanharem grávidas que usam a app Kairos.

## Stack

HTML estático + React 18 (UMD, via CDN) + Babel-standalone para transformar JSX no browser. **Sem bundler**, sem `node_modules`, sem build.

Esta escolha é deliberada para esta fase: o portal é um protótipo iterado a alta velocidade. Quando estabilizar, migra-se para Vite + TypeScript, à semelhança da [app da mãe](../frontend-mae/).

## Correr

Qualquer servidor estático serve. Exemplos:

```bash
# Python (já vem instalado)
cd frontend-medico
python -m http.server 5174

# ou Node
npx serve -p 5174 .
```

Abre <http://localhost:5174>.

> O portal carrega o backend Kairos pelo mesmo endpoint `/api/chat` que a app da mãe — confirma que o backend Jakarta EE está a correr em `:9080`.

## Estrutura

```
frontend-medico/
├── index.html                       # entry point — carrega scripts UMD + JSX
├── design-tokens.jsx                # paleta KAIROS (espelha frontend-mae/src/theme/design-tokens.ts)
├── medico-tokens.jsx                # tokens específicos do portal (sidebar, KPIs)
├── medico-shell.jsx                 # layout: sidebar + topbar + área de conteúdo
├── medico-screens-auth.jsx          # login
├── medico-screens-dashboard.jsx     # dashboard inicial
├── medico-screens-patients.jsx      # lista + detalhe de pacientes
├── medico-screens-alerts.jsx        # alertas clínicos
├── medico-screens-agenda.jsx        # agenda
└── medico-chatbot.jsx               # FAB de assistente clínico
```

## Acoplamento com frontend-mae

`design-tokens.jsx` é uma **cópia manual** da paleta em [`../frontend-mae/src/theme/design-tokens.ts`](../frontend-mae/src/theme/design-tokens.ts). Se mexeres na paleta numa app, replica na outra — ou, melhor, sobe os tokens para um pacote partilhado quando o portal for migrado para TypeScript.

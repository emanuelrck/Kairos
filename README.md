# Kairos — Know-Me Engine para Saúde Materna

Assistente conversacional especializado em **saúde materna**, com tom acolhedor adaptado a mães portuguesas e **aprendizagem progressiva** (extracção de factos da conversa → persistência → reinjecção no *system prompt*).

Implementação de referência do **Jakarta EE Hackathon Challenge — "The Know-Me Engine"** com integração ponta-a-ponta:

- **Backend Jakarta EE 10/11** com CDI, JAX-RS, JPA e LangChain4j-CDI
- **App da grávida** ([frontend-mae/](frontend-mae/)) — React + TypeScript + Vite, consome `/api/chat`
- **Portal clínico** ([frontend-medico/](frontend-medico/)) — HTML estático + React UMD, dashboard para profissionais de saúde
- **Mesmos beans CDI** correm em CLI (Weld SE) e em servidor de aplicações (Open Liberty / WildFly / Payara / GlassFish)

> ⚠️ **Aviso clínico:** A Kairos não substitui consulta médica. Os *system prompts* forçam-na a remeter para o **SNS24 (808 24 24 24)** ou para o **112** em emergências.

---

## Índice

- [Arquitectura](#arquitectura)
- [Pré-requisitos](#pré-requisitos)
- [Configuração](#configuração)
- [Arrancar tudo (backend + frontend)](#arrancar-tudo-backend--frontend)
- [Modos individuais](#modos-individuais)
- [Estrutura do repositório](#estrutura-do-repositório)
- [Como satisfazemos as 4 pistas do Hackathon](#como-satisfazemos-as-4-pistas-do-hackathon)
- [Stack técnico](#stack-técnico)
- [Boas práticas adoptadas](#boas-práticas-adoptadas)
- [Resolução de problemas](#resolução-de-problemas)
- [Licença](#licença)

---

## Arquitectura

```
┌────────────────────────┐                                ┌─────────────────────────────┐
│  frontend-mae          │ ──── POST /api/chat ─────────▶ │  Backend Jakarta EE         │
│  React+TS+Vite, :5173  │ ◀─────────────────────────────│  JAX-RS · CDI · JPA · :9080 │
│  proxy /api → :9080    │                                │  LangChain4j-CDI            │
└────────────────────────┘                                └──────────────┬──────────────┘
                                                                         │
┌────────────────────────┐                                               │
│  frontend-medico       │ ──── POST /api/chat ──────────────────────────┤
│  HTML+React UMD, :5174 │ ◀─────────────────────────────────────────────┤
└────────────────────────┘                                               │
                                                          ┌──────────────┴──────────────┐
                                                          │                             │
                                                   ┌──────▼──────┐             ┌────────▼────────┐
                                                   │ OpenAI API  │             │  H2 (file)      │
                                                   │  (gpt-5 /   │             │  perfil + factos│
                                                   │  gpt-4o-mini│             │  aprendidos     │
                                                   └─────────────┘             └─────────────────┘
```

**Fluxo de uma pergunta:**

1. O utilizador escreve no chat (CLI ou web).
2. `ProfileService` carrega o `MotherProfile` do H2 e o `ContextRenderer` transforma-o em texto.
3. Esse texto é injectado como `{{motherContext}}` num *system prompt* com guardrails (`MaternalSystemPrompts`).
4. O `KairosAssistant` (AI service do LangChain4j-CDI) chama o modelo configurado.
5. Em paralelo, o `LearningExtractor` extrai factos novos da conversa e persiste-os para o turno seguinte.

---

## Pré-requisitos

| Componente | Versão mínima | Notas |
|---|---|---|
| **JDK** | 21 | Adoptium Temurin recomendado |
| **Maven** | 3.9.x | |
| **Node.js** | 20 LTS | Inclui `npm` |
| **OpenAI API key** | — | Obtida em <https://platform.openai.com/api-keys> |

---

## Configuração

Cria um ficheiro `.env` na raiz do repositório a partir do template:

```bash
cp "jakarta ee/.env.example" .env
```

Edita o `.env` e coloca a tua chave:

```env
OPENAI_API_KEY=sk-...
```

> 🔒 O `.env` está no `.gitignore`. **Nunca** faças commit da chave. Se uma chave for exposta, revoga-a imediatamente em <https://platform.openai.com/api-keys>.

A configuração do modelo, locale e parâmetros de aprendizagem está em [`jakarta ee/src/main/resources/META-INF/microprofile-config.properties`](jakarta%20ee/src/main/resources/META-INF/microprofile-config.properties).

---

## Arrancar tudo (backend + frontend)

### Linux / macOS / WSL

```bash
./run.sh
```

### Windows (PowerShell)

```powershell
.\run.ps1
```

Ambos os scripts:

1. Carregam o `.env` da raiz.
2. Validam que `OPENAI_API_KEY` está definida.
3. Arrancam o backend Jakarta EE, a app da mãe e o portal médico em paralelo.
4. Encerram os processos com `Ctrl+C`.

| Endereço | Descrição |
|---|---|
| <http://localhost:5173> | App da grávida (React + Vite) |
| <http://localhost:5174> | Portal clínico (HTML estático) |
| <http://localhost:9080/api/chat> | Backend (endpoint REST) |

---

## Modos individuais

### CLI (REPL no terminal)

Útil para demonstrar a aprendizagem progressiva entre sessões.

```bash
cd "jakarta ee"
mvn -q compile
mvn -q exec:java "-Dexec.args=--mother ana"
```

```
Tu> Olá, estou na semana 28 e sou alérgica a penicilina.
Kairos> ...

Tu> E posso tomar algum medicamento para os enjoos?
Kairos> [reconhece as 28 semanas e a alergia sem precisares de repetir]
```

Sai com `sair`. O perfil persiste em `./kairos-data/maternal.mv.db` — reabrir mantém o contexto.

### Backend isolado (servidor JDK embebido)

```bash
cd "jakarta ee"
mvn -q exec:java "-Dkairos.main=pt.kairos.maternal.web.WebServer"
```

### Backend em Open Liberty (modo dev com hot reload)

```bash
cd "jakarta ee"
mvn -q liberty:dev
```

### Outros servidores Jakarta EE 10/11

```bash
mvn -q package wildfly:run        # WildFly
mvn -q -Pglassfish package cargo:run
mvn -q -Ppayara    package cargo:run
```

### App da grávida isolada

```bash
cd frontend-mae
npm install
npm run dev          # dev server (porta 5173)
npm run build        # build de produção
npm run typecheck    # validação TypeScript
npm run lint         # ESLint
npm run format       # Prettier
```

### Portal médico isolado

Sem build, sem `node_modules` — qualquer servidor estático serve:

```bash
cd frontend-medico
python -m http.server 5174
# ou
npx serve -p 5174 .
```

Mais detalhes em [frontend-medico/README.md](frontend-medico/README.md).

### Modo simulado (sem chamadas OpenAI)

Útil para CI ou demonstrações offline:

```bash
mvn -q exec:java \
  "-Ddev.langchain4j.cdi.plugin.chat-model.class=pt.kairos.maternal.model.chat.MockChatModel"
```

---

## Estrutura do repositório

```
Kairos/
├── jakarta ee/                  # Backend Jakarta EE 10/11
│   ├── src/main/java/pt/kairos/maternal/
│   │   ├── ai/                  # AI services, system prompts, records JSON-B
│   │   ├── cli/                 # Bootstrap Weld SE + REPL
│   │   ├── model/chat/          # MockChatModel (alternativa ao OpenAI)
│   │   ├── profile/             # Entidades JPA + ProfileService + ContextRenderer
│   │   ├── rest/                # ChatResource, CorsFilter, RunningResource
│   │   ├── tools/               # Function calling (datas, perfil, escrita)
│   │   ├── web/WebServer.java   # Servidor JDK embebido para dev
│   │   └── KnowMeEngine.java    # JAX-RS Application root
│   ├── src/main/resources/META-INF/
│   │   ├── beans.xml
│   │   ├── persistence.xml
│   │   └── microprofile-config.properties
│   └── pom.xml
│
├── frontend-mae/                # App da grávida — React + TypeScript + Vite
│   ├── src/
│   │   ├── App.tsx              # Routing por estado + tweaks panel
│   │   ├── components/          # ios, form, nav, risk, tweaks
│   │   ├── screens/             # Welcome, Login, Dashboard, Chat, Alerts, …
│   │   └── theme/               # Design tokens (KAIROS)
│   ├── vite.config.ts           # Proxy /api → :9080
│   └── package.json
│
├── frontend-medico/             # Portal clínico — HTML estático + React UMD
│   ├── index.html               # Entry point (sem bundler)
│   ├── design-tokens.jsx        # Espelha frontend-mae/src/theme/design-tokens.ts
│   ├── medico-tokens.jsx        # Tokens específicos do portal
│   ├── medico-shell.jsx         # Layout: sidebar + topbar
│   ├── medico-screens-*.jsx     # Auth, Dashboard, Patients, Alerts, Agenda
│   └── medico-chatbot.jsx       # FAB de assistente clínico
│
├── redlight/                    # Demo standalone para pitch (Python)
│   └── gitblood.py
│
├── run.sh                       # Arranque conjunto (Unix)
├── run.ps1                      # Arranque conjunto (Windows)
├── .env                         # OPENAI_API_KEY (NÃO versionado)
├── .gitignore
├── LICENSE
└── README.md
```

---

## Como satisfazemos as 4 pistas do Hackathon

| Pista | Onde | Como |
|---|---|---|
| **#1 LLM plugável via CDI** | [`MockChatModel.java`](jakarta%20ee/src/main/java/pt/kairos/maternal/model/chat/MockChatModel.java) + chave `dev.langchain4j.cdi.plugin.chat-model.class` | Trocar de provedor (OpenAI / Mock / outro) é uma alteração de propriedade. |
| **#2 Saída estruturada com JSON-B / records** | [`MaternalAdvice.java`](jakarta%20ee/src/main/java/pt/kairos/maternal/ai/MaternalAdvice.java), [`ExtractedFacts.java`](jakarta%20ee/src/main/java/pt/kairos/maternal/ai/ExtractedFacts.java), [`LearnedFactDto.java`](jakarta%20ee/src/main/java/pt/kairos/maternal/ai/LearnedFactDto.java) | *Records* Java como tipos de retorno dos AI services. Yasson serializa/desserializa. |
| **#3 System prompts como guardrails** | [`MaternalSystemPrompts.java`](jakarta%20ee/src/main/java/pt/kairos/maternal/ai/MaternalSystemPrompts.java) | Define âmbito materno-infantil, tom acolhedor, regras inquebráveis (não diagnosticar, redirecionar para SNS24 / 112). |
| **#4 Jakarta Persistence + Know-Me filter** | [`MotherProfile.java`](jakarta%20ee/src/main/java/pt/kairos/maternal/profile/MotherProfile.java), [`LearnedFact.java`](jakarta%20ee/src/main/java/pt/kairos/maternal/profile/LearnedFact.java), [`ProfileService.java`](jakarta%20ee/src/main/java/pt/kairos/maternal/profile/ProfileService.java) | Cada turno carrega o perfil do H2, renderiza-o em texto e injecta-o em `{{motherContext}}`. O `LearningExtractor` alimenta novos factos. |

---

## Stack técnico

**Backend**
- Jakarta EE 10/11 (CDI, JAX-RS, JPA, JSON-B, MicroProfile Config)
- LangChain4j 1.14.0 + langchain4j-open-ai
- langchain4j-cdi-portable-ext 1.2.0-Beta1 + langchain4j-cdi-config
- Weld SE 5.x (CDI standalone para CLI / WebServer)
- EclipseLink + H2 (JPA file-backed)
- Yasson (JSON-B), SmallRye Config

**Frontend**
- React 18 + TypeScript 5.6
- Vite 5 (dev server + build)
- ESLint + Prettier

---

## Boas práticas adoptadas

- **Segredos fora do código.** A `OPENAI_API_KEY` lê-se sempre de variável de ambiente. `.env` está no `.gitignore`.
- **Configuração externalizada** via MicroProfile Config — modelo, locale e thresholds de confiança alteráveis sem recompilar.
- **Portabilidade Jakarta** — sem imports vendor-specific. Os mesmos beans CDI funcionam em Weld SE e em qualquer servidor Jakarta EE 10/11.
- **Determinismo em testes** — `MockChatModel` permite correr sem chamadas reais à OpenAI.
- **Tipagem ponta-a-ponta** — *records* Java + TypeScript estrito.
- **Linting & formatação** — ESLint, Prettier e `tsc --noEmit` no frontend.
- **Guardrails clínicos** — *system prompt* impede a IA de diagnosticar e redirecciona para SNS24 / 112.
- **Aprendizagem auditável** — cada `LearnedFact` é persistido com confidência e origem, permitindo revisão.

---

## Resolução de problemas

| Sintoma | Causa provável | Resolução |
|---|---|---|
| `OPENAI_API_KEY não está definida` | `.env` em falta ou mal carregado | Verifica que existe `.env` na raiz com `OPENAI_API_KEY=sk-...` |
| Backend não responde em `:9080` | Porta ocupada / Liberty ainda a arrancar | `mvn liberty:stop` e tentar de novo; verifica `backend.log` |
| Frontend não chama o backend | Proxy do Vite | Confirma `vite.config.ts` aponta `/api` → `http://localhost:9080` |
| Aprendizagem desaparece entre sessões | `kairos-data/` foi apagada | Pasta é o H2 file-backed; basta voltar a conversar |
| Erros de CDI no arranque | Jandex desactualizado | `mvn clean compile` (regenera o índice) |

---

## Licença

Este projecto está disponibilizado nos termos descritos em [`LICENSE`](LICENSE).

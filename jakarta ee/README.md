# Kairos — Know-Me Engine para Saúde Materna

Implementação do **Jakarta EE Hackathon Challenge** ("The Know-Me Engine"),
especializada em **saúde materna**, com tom acolhedor para mães portuguesas
e **aprendizagem progressiva** a partir das conversas.

Esta primeira fase é um **agente de terminal (CLI)** assente nos mesmos
beans CDI / AI services / entidades JPA que mais tarde serão empacotados
como WAR Jakarta EE 11 — só muda quem hospeda o contentor (Weld SE no CLI,
o app server na fase web).

## Pré-requisitos

- **JDK 21** ou superior (Adoptium Temurin recomendado).
- **Maven 3.9.x**.
- Variável de ambiente `OPENAI_API_KEY` definida.

```powershell
# PowerShell — apenas para a sessão actual
$env:OPENAI_API_KEY = "sk-..."

# PowerShell — persistente para o utilizador
[Environment]::SetEnvironmentVariable("OPENAI_API_KEY","sk-...","User")
```

> ⚠️ Nunca faças commit da chave. Existe um `.env.example` como referência.

## Correr o agente CLI

```powershell
cd "c:\Users\Emanuel\Desktop\Kairos\jakarta ee"
mvn -q compile
mvn -q exec:java "-Dexec.args=--mother ana"
```

Sessão exemplo:

```
Tu> Olá, estou na semana 28 e sou alérgica a penicilina.
Kairos> ...

Tu> E posso tomar algum medicamento para os enjoos?
Kairos> [refere-se às 28 semanas e à alergia sem precisares de repetir]
```

Sai com `sair`. Ao reabrir, o perfil persistido em `./kairos-data/` mantém o
contexto — a aprendizagem sobrevive entre sessões.

## Trocar para o modelo simulado (sem chamadas OpenAI)

Útil para CI ou para experimentar sem custo. Na configuração ou via override:

```powershell
mvn -q exec:java `
  "-Ddev.langchain4j.cdi.plugin.chat-model.class=pt.kairos.maternal.model.chat.MockChatModel"
```

## Empacotar como WAR (Phase 2 — futuro)

```powershell
mvn -q package liberty:run     # Open Liberty
mvn -q package wildfly:run     # WildFly
mvn -q -Pglassfish package cargo:run
mvn -q -Ppayara    package cargo:run
```

## Como satisfazemos as 4 pistas do PDF

| Pista do PDF | Onde está | Como funciona |
|---|---|---|
| **#1 Pluggable LLM via CDI** | [src/main/java/pt/kairos/maternal/model/chat/MockChatModel.java](src/main/java/pt/kairos/maternal/model/chat/MockChatModel.java) + chave `dev.langchain4j.cdi.plugin.chat-model.class` em [microprofile-config.properties](src/main/resources/META-INF/microprofile-config.properties) | Trocar de provedor (OpenAI / Mock / outro) é só mudar uma propriedade — sem tocar no código. |
| **#2 Saída estruturada com JSON-B / records** | [MaternalAdvice.java](src/main/java/pt/kairos/maternal/ai/MaternalAdvice.java), [ExtractedFacts.java](src/main/java/pt/kairos/maternal/ai/ExtractedFacts.java), [LearnedFactDto.java](src/main/java/pt/kairos/maternal/ai/LearnedFactDto.java) | Records Java usados como tipos de retorno dos AI services. Yasson serializa/desserializa. |
| **#3 System prompts como guardrails** | [MaternalSystemPrompts.java](src/main/java/pt/kairos/maternal/ai/MaternalSystemPrompts.java) | Define âmbito materno-infantil, tom acolhedor, regras inquebráveis (não diagnosticar, "Não tenho a certeza", emergências → 112 / SNS24). |
| **#4 Jakarta Persistence + Know-Me filter** | [MotherProfile.java](src/main/java/pt/kairos/maternal/profile/MotherProfile.java) + [LearnedFact.java](src/main/java/pt/kairos/maternal/profile/LearnedFact.java) + [ProfileService.java](src/main/java/pt/kairos/maternal/profile/ProfileService.java) | Cada turno carrega o perfil do H2, renderiza-o em texto e injecta-o no `{{motherContext}}` do system prompt. O `LearningExtractor` alimenta novos factos. |

## Stack

- **Jakarta EE 10/11** (CDI, JAX-RS, JPA, JSON-B).
- **LangChain4j 1.12.2** + **langchain4j-cdi-portable-ext 1.2.0-Beta1** + **langchain4j-cdi-config 1.2.0-Beta1** (`dev.langchain4j.cdi.mp`).
- **Weld SE 5.x** para hospedar o CDI no CLI.
- **EclipseLink** + **H2 (file)** para JPA standalone.
- **Yasson** (JSON-B) e **SmallRye Config** (MicroProfile Config) para o modo CLI.

## Layout

```
src/main/java/pt/kairos/maternal/
├── ai/                  # AI services (KairosAssistant, LearningExtractor),
│                          system prompts e records JSON-B
├── model/chat/          # MockChatModel (alternativa ao OpenAI)
├── profile/             # JPA entities + ProfileService + ContextRenderer
├── cli/                 # Main + CliArgs (Weld SE bootstrap + REPL)
├── rest/RunningResource # /status (Phase 2)
└── KnowMeEngine         # Application JAX-RS root (Phase 2)
```

## Avisos

- A chave OpenAI partilhada em texto durante o desenvolvimento **deve ser
  revogada** em https://platform.openai.com/api-keys e regenerada — a
  aplicação só lê de `OPENAI_API_KEY`, nunca a tem em código.
- Nada do que a Kairos diz substitui consulta médica. Os prompts forçam-na
  a recomendar o SNS24 (808 24 24 24) ou o 112 em emergências.

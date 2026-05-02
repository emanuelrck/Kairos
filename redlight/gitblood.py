#!/usr/bin/env python3
"""
GitBlood — demo ao vivo para pitch
===================================

Corre:  python3 gitblood.py

Cenário: o paciente foi para a cama perfeitamente bem
         e acordou com uma constipação. Sem razão. Sem aviso.
         A imunidade fez deploy direto para produção.

Comandos durante a pitch:
  git status
  git log
  git diff
  git merge sistema-imunitario
  git revert HEAD~5..HEAD
  git push origin vida

Especiais:
  clear   — limpa o ecrã
  exit    — sai
"""

import os
import sys
import time

try:
    import readline  # noqa: F401  (ativa setas para histórico no input)
except ImportError:
    pass

# Ativa cores ANSI no Windows 10+
if os.name == 'nt':
    os.system('')

# === Códigos ANSI (iguais ao esquema default do git) ===
G = '\033[32m'        # verde  — branch, sucesso
Y = '\033[33m'        # amarelo — commit hashes, decorations
R = '\033[31m'        # vermelho — modified, deleted, conflitos
C = '\033[36m'        # ciano — HEAD pointer
B = '\033[1m'         # bold
D = '\033[2m'         # dim (cinzento)
X = '\033[0m'         # reset


def prompt():
    return f"{G}paciente@gitblood{X}:{C}~/corpo{X} {Y}(segunda-de-manha){X}$ "


# ============================================================
#  COMANDOS
#  Edita o texto à vontade — basta mudar as strings cá em baixo
# ============================================================

def cmd_status():
    return f"""On branch {G}{B}segunda-de-manha{X}
A tua branch divergiu de 'origin/domingo-noite-saudavel'.

Alterações por dar commit:
  (usa "git add <orgao>" para preparar o commit)

\t{R}modified:   garganta.c           (inflamada){X}
\t{R}modified:   nariz.h              (entupido){X}
\t{R}modified:   cabeca.h             (pesada){X}
\t{R}modified:   niveis_energia.json  (-87%){X}
\t{R}deleted:    vontade_de_viver.txt{X}

Ficheiros não rastreados:
  (usa "git add <ficheiro>" para incluir no commit)

\t{R}sintoma_febre.log{X}
\t{R}sintoma_tosse.log{X}
\t{R}sintoma_dores_corpo.log{X}
\t{R}rinovirus_47.dll{X}

nada para fazer commit (usa "git add" e/ou "git commit -a")"""


def cmd_log():
    return f"""{Y}a3f9b2e{X} {Y}({X}{C}{B}HEAD -> {X}{G}{B}segunda-de-manha{X}{Y}){X} acordei doente. porquê.
{Y}7d4c1ab{X} {D}03:47{X}  arranhão involuntário na garganta
{Y}9f2e3c4{X} {D}02:15{X}  unhandled exception nos seios nasais
{Y}b1a7d8e{X} {D}23:30{X}  fui dormir a sentir-me ótimo
{Y}e5c9f1d{X} {D}22:00{X}  "eu nunca fico doente"
{Y}c2d6a8f{X} {D}18:00{X}  abracei um colega (sem testes)
{Y}4f8e2b1{X} {D}14:00{X}  toquei no botão do elevador
{Y}9a4d2f7{X} {D}09:00{X}  domingo: a sentir-me perfeitamente bem"""


def cmd_diff():
    return f"""{B}diff --git a/sistema_imunitario.ts b/sistema_imunitario.ts{X}
{B}index 4f2b1a..7d9c3e 100644{X}
{B}--- a/sistema_imunitario.ts{X}
{B}+++ b/sistema_imunitario.ts{X}
{C}@@ -1,8 +1,8 @@{X}
 interface Corpo {{
   estado: EstadoSaude;
{R}-  energia: 100;{X}
{G}+  energia: 13;{X}
{R}-  garganta: "ok";{X}
{G}+  garganta: "em chamas";{X}
{R}-  humor: "pronto para segunda";{X}
{G}+  humor: "porque é que sou assim";{X}
 }}

{D}# 1 ficheiro alterado, 3 inserções(+), 3 remoções(-){X}
{D}# este PR não foi revisto.{X}"""


def cmd_merge():
    return f"""Auto-merging sistema_imunitario.ts
{R}CONFLITO (rinovirus):{X} Merge conflict em sistema_imunitario.ts
Auto-merge falhou; branch estrangeira detetada em main.

{R}<<<<<<< HEAD (domingo-noite-saudavel){X}
  estado: "saudavel"
  sintomas: []
  produtividade: "pronto para segunda"
{R}======={X}
  estado: "infetado"
  sintomas: ["febre", "tosse", "arrependimento"]
  produtividade: null
{R}>>>>>>> rinovirus-47{X}

{D}# o vírus abriu um pull request às 03:47.{X}
{D}# ninguém o reviu.{X}
{D}# fez auto-merge.{X}"""


def cmd_revert():
    return f"""A reverter "acordei doente. porquê."...           {G}[ok]{X}
A reverter "arranhão involuntário na garganta"...  {G}[ok]{X}
A reverter "unhandled exception nos seios nasais".{G}[ok]{X}
A reverter "abracei um colega"...                  {G}[ok]{X}
A reverter "toquei no botão do elevador"...        {G}[ok]{X}

[{G}segunda-de-manha{X} {Y}1f4e2d8{X}] revert: rollback para domingo-noite-saudavel

  {G}✓{X} garganta restaurada
  {G}✓{X} seios nasais limpos
  {G}✓{X} níveis de energia de volta a 100
  {G}✓{X} rinovirus_47.dll removido do node_modules"""


def cmd_push():
    """Imprime progressivamente — efeito dramático para o clímax."""
    lines = [
        "A contar células: 37,200,000,000,000, feito.",
        "A comprimir anticorpos: 100% (imunidade reconstruída)",
        "A escrever objetos: 100% (37.2T/37.2T), 2.3 PB | 1.21 GB/s",
        "",
        f"remote: {G}✓{X} temperatura: 36.6°C",
        f"remote: {G}✓{X} ritmo cardíaco: estável",
        f"remote: {G}✓{X} build passou",
        f"remote: {G}✓{X} deploy para produção feito",
        "",
        "Para gitblood.io:humanidade/tu.git",
        f"   {Y}a3f9b2e..1f4e2d8{X}  segunda-de-manha -> vida",
        "",
        f"{B}{G}Estás saudável.{X}",
        f"{B}{G}Faz commit cedo. Faz commit muitas vezes.{X}",
        f"{B}{G}Não morras em produção.{X}",
    ]
    for line in lines:
        print(line)
        time.sleep(0.18)
    return None  # já imprimiu


# ============================================================
#  Matcher — aceita qualquer variante (só procura keyword)
# ============================================================

def find_handler(cmd):
    c = cmd.lower().strip()
    if 'status' in c:
        return cmd_status
    if 'diff' in c:
        return cmd_diff
    if 'log' in c:
        return cmd_log
    if 'merge' in c:
        return cmd_merge
    if 'revert' in c:
        return cmd_revert
    if 'push' in c:
        return cmd_push
    return None


def main():
    os.system('cls' if os.name == 'nt' else 'clear')
    print(f"{D}Última sessão: {time.strftime('%a %d %b %H:%M:%S')} em ttys001{X}")
    print()

    while True:
        try:
            cmd = input(prompt()).strip()
        except (EOFError, KeyboardInterrupt):
            print()
            break

        if not cmd:
            continue
        if cmd in ('exit', 'quit', 'sair'):
            break
        if cmd == 'clear':
            os.system('cls' if os.name == 'nt' else 'clear')
            continue

        handler = find_handler(cmd)
        if handler:
            result = handler()
            if result is not None:
                print(result)
        else:
            print(f"{R}-bash: {cmd}: comando não encontrado{X}")


if __name__ == '__main__':
    main()

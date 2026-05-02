#!/usr/bin/env bash
# Arranca backend (Open Liberty) + frontend-mae (Vite) + frontend-medico (servidor estático).
# Usa: ./run.sh   (Ctrl+C pára os três)

set -e
cd "$(dirname "$0")"

if [ -f .env ]; then
  set -a
  . ./.env
  set +a
fi

if [ -z "${OPENAI_API_KEY:-}" ]; then
  echo "OPENAI_API_KEY não está definida (verifica o .env na raiz)."
  exit 1
fi

cleanup() {
  echo
  echo "A parar serviços…"
  [ -n "${BACK_PID:-}"   ] && kill "$BACK_PID"   2>/dev/null || true
  [ -n "${MAE_PID:-}"    ] && kill "$MAE_PID"    2>/dev/null || true
  [ -n "${MEDICO_PID:-}" ] && kill "$MEDICO_PID" 2>/dev/null || true
  wait 2>/dev/null || true
}
trap cleanup INT TERM EXIT

echo "[backend]         mvn liberty:dev em ./jakarta ee (porta 9080)"
(cd "jakarta ee" && mvn -q liberty:dev) &
BACK_PID=$!

echo "[frontend-mae]    npm install + vite dev em ./frontend-mae (porta 5173)"
(cd frontend-mae && [ -d node_modules ] || npm install --silent; npm run dev) &
MAE_PID=$!

echo "[frontend-medico] servidor estático em ./frontend-medico (porta 5174)"
(cd frontend-medico && python -m http.server 5174 >/dev/null 2>&1) &
MEDICO_PID=$!

echo
echo "Backend:          http://localhost:9080/kairos-maternal/api/chat"
echo "Frontend (mãe):    http://localhost:5173"
echo "Frontend (médico): http://localhost:5174"
echo "Ctrl+C para parar."
wait

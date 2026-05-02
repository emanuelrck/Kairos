#!/usr/bin/env bash
# Arranca backend (Open Liberty) + frontend (Vite) em paralelo.
# Usa: ./run.sh   (Ctrl+C pára os dois)

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
  [ -n "${BACK_PID:-}" ] && kill "$BACK_PID" 2>/dev/null || true
  [ -n "${FRONT_PID:-}" ] && kill "$FRONT_PID" 2>/dev/null || true
  wait 2>/dev/null || true
}
trap cleanup INT TERM EXIT

echo "[backend] mvn liberty:dev em ./jakarta ee (porta 9080)"
(cd "jakarta ee" && mvn -q liberty:dev) &
BACK_PID=$!

echo "[frontend] npm install + vite dev em ./frontend (porta 5173)"
(cd frontend && [ -d node_modules ] || npm install --silent; npm run dev) &
FRONT_PID=$!

echo
echo "Backend: http://localhost:9080/kairos-maternal/api/chat"
echo "Frontend: http://localhost:5173"
echo "Ctrl+C para parar."
wait

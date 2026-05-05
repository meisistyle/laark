#!/bin/zsh
cd "/Users/elena/Documents/LAARK-github" || exit 1

PORT=3040
URL="http://localhost:${PORT}/dashboard"
LOG="/tmp/laark-3040.log"

echo "LAARK_AUTO_START: preparando LAARK en ${URL}"

open_laark() {
  /usr/bin/open -a "Arc" "$URL" 2>/dev/null || /usr/bin/open "$URL" 2>/dev/null || true
}

if /usr/sbin/lsof -nP -iTCP:${PORT} -sTCP:LISTEN >/dev/null 2>&1; then
  open_laark
  echo "LAARK ya estaba encendido en ${URL}"
  exit 0
fi

(
  for attempt in {1..60}; do
    if /usr/bin/curl -sI "http://127.0.0.1:${PORT}/dashboard" >/dev/null 2>&1; then
      open_laark
      break
    fi
    sleep 1
  done
) &

npm run dev:laark 2>&1 | tee "$LOG"

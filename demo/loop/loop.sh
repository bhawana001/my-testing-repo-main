#!/usr/bin/env bash
# ============================================================
# The loop: kane-cli verifies the checkout in a real browser, and every failure
# is handed straight back to Claude Code to fix. It stops on its own when the
# browser sees "Payment successful".
#
#   ./demo/loop/loop.sh                       # against http://localhost:3000
#   BASE_URL=https://my-testing-repo-main.vercel.app ./demo/loop/loop.sh
#
# Reset the demo to its failing state first:  node demo/demo-toggle.mjs paybug
# ============================================================
set -uo pipefail

BASE_URL="${BASE_URL:-http://localhost:3000}"
MAX_ATTEMPTS="${MAX_ATTEMPTS:-3}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
OBJECTIVE="$(cat "$ROOT/demo/loop/objective.txt")"
LOG_DIR="$ROOT/demo/loop/.runs"
mkdir -p "$LOG_DIR"

for attempt in $(seq 1 "$MAX_ATTEMPTS"); do
  LOG="$LOG_DIR/attempt-$attempt.ndjson"
  echo ""
  echo "──────── attempt $attempt/$MAX_ATTEMPTS — verifying checkout in a real browser ────────"

  kane-cli run "$OBJECTIVE" \
    --agent \
    --max-steps 35 \
    --timeout 300 \
    --variables "{\"base_url\":{\"value\":\"$BASE_URL\"}}" \
    | tee "$LOG"
  status="${PIPESTATUS[0]}"

  if [ "$status" -eq 0 ]; then
    echo ""
    echo "✅ GREEN on attempt $attempt — the browser saw \"Payment successful\". Loop stops."
    exit 0
  fi

  if [ "$attempt" -eq "$MAX_ATTEMPTS" ]; then
    echo ""
    echo "🔴 Still failing after $MAX_ATTEMPTS attempts. Stopping so a human can look."
    exit 1
  fi

  echo ""
  echo "🔴 Failed. Handing the failure to Claude Code…"

  # --permission-mode acceptEdits lets Claude apply file edits unattended while
  # still prompting for anything riskier. Swap for --dangerously-skip-permissions
  # only in a sandbox you are willing to lose.
  { cat "$ROOT/demo/loop/fix-prompt.md"; tail -c 8000 "$LOG"; } \
    | claude -p --permission-mode acceptEdits

  echo "…fix applied. Re-running the same objective."
  sleep 3   # let the Next.js dev server hot-reload
done

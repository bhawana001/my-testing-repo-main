#!/bin/bash
# Synthetic monitoring: critical prod journeys for the Acme app.
VARS="./tests/variables.json"

run_test() {
  local name="$1"
  local objective="$2"
  echo ""
  echo "=== Monitoring: $name ==="
  if kane-cli run "$objective" \
      --variables-file "$VARS" \
      --username "$LT_USERNAME" \
      --access-key "$LT_ACCESS_KEY" \
      --agent --headless \
      --timeout 120 --max-steps 20; then
    echo "OK: $name"
  else
    echo "ALERT: $name is broken in production (exit $?)"
    exit 1
  fi
}

run_test "Login page reachable" \
  "go to {{app_url}}, assert the page contains 'Ship your idea faster', assert the navigation contains 'Pricing'"

run_test "Money path: checkout total" \
  "go to {{app_url}}, click the 'Buy Pro' button, assert the page contains 'Total due today', assert the total due today shows '\$19.00'"

echo ""
echo "All critical journeys healthy."
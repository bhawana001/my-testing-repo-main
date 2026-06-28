#!/bin/bash
# Kane CLI smoke suite for the Acme landing page.
# Runs locally (visible browser) and in CI (headless). Exits non-zero if any flow fails.

# APP_URL defaults to live prod, but CI overrides it to the freshly-built PR code
# (e.g. http://localhost:3000) so we test what was pushed, not what's already live.
APP_URL="${APP_URL:-https://my-testing-repo-main.vercel.app}"

# Build a runtime variables file with app_url pointed at APP_URL.
VARS="./tests/variables.ci.json"
TEST_EMAIL="qa@example.com"
EXPECTED_PRO_PRICE="\$19"
cat > "$VARS" <<JSON
{
  "app_url": { "value": "$APP_URL" },
  "test_email": { "value": "$TEST_EMAIL" },
  "expected_pro_price": { "value": "$EXPECTED_PRO_PRICE" }
}
JSON
echo "Testing against: $APP_URL"

# In CI, force headless. Locally, leave the browser visible so you can watch it.
HEADLESS_FLAG=""
if [[ -n "$CI" ]]; then
  HEADLESS_FLAG="--headless"
fi

PASS=0
FAIL=0
FAILED_TESTS=()

run_test() {
  local name="$1"
  local objective="$2"
  echo ""
  echo "=== Running: $name ==="
  if kane-cli run "$objective" \
      --variables-file "$VARS" \
      --username "$LT_USERNAME" \
      --access-key "$LT_ACCESS_KEY" \
      --agent $HEADLESS_FLAG \
      --timeout 180 \
      --max-steps 25; then
    echo "PASS: $name"
    ((PASS++))
  else
    echo "FAIL: $name (exit $?)"
    ((FAIL++))
    FAILED_TESTS+=("$name")
  fi
}

# 1. Landing page loads and the hero is correct
run_test "Landing page smoke" \
  "go to {{app_url}}, assert the page contains 'Ship your idea faster', assert the navigation contains 'Pricing', store the main hero heading as 'hero'"

# 2. Pricing integrity: Free is free, Pro costs what it should
run_test "Pricing integrity" \
  "go to {{app_url}}, scroll to the Pricing section, assert the page contains 'Free', assert the page contains '\$0', assert the page contains '$19', store the Pro plan price as 'pro_price'"

# 3. The money path: Buy Pro -> checkout shows correct total
run_test "Checkout flow" \
  "go to {{app_url}}, click the 'Buy Pro' button, assert the page contains 'Total due today', assert the total due today shows '\$19.00', assert the page contains 'Pay \$19.00', store the total due as 'total'"

# 4. Newsletter signup accepts a valid email
run_test "Newsletter signup" \
  "go to {{app_url}}, scroll to the newsletter section, fill the email field with '{{test_email}}', click the Subscribe button, confirm no error message is visible"

echo ""
echo "=================================="
echo "Results: $PASS passed, $FAIL failed"
if [[ $FAIL -gt 0 ]]; then
  echo "Failed flows: ${FAILED_TESTS[*]}"
  exit 1
fi
echo "All critical flows verified."

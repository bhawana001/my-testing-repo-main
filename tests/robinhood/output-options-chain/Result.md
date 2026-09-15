---
test: ../options-chain_test.md
status: passed
started: 2026-09-13T11:44:30.757Z
duration_s: 137
session_id: 6162c6b3-75e3-4acd-95f6-4a51583e85e7
---

# Robinhoot 16.5: Options chain display — Result

## Open the chain ✓ passed (23.8s)
md5: 31e23438886d457904c8e82234ceb7ec
Go to https://my-testing-repo-main.vercel.app/robinhood/options-chain?reset=true and verify "NOVA options chain" with expiry "Sep 25" and "Calls" selected, strikes from $170.00 to $195.00, and the text "Select a strike to see premium and Greeks."

## Change expiry and back ✓ passed (35s)
md5: 00061f713fec8bbb7fc005721e6cdb39
Click the "Oct 16" expiry, then click "Sep 25" again and verify the chain still lists six strikes.

## Select a strike ✓ passed (27.4s)
md5: f40f5539896d900eb0f85d8cec49baa1
Click "Select" on the $185.00 row and verify "Selected contract" reads "NOVA $185.00 Call · Sep 25".

## Verify premium and Greeks ✓ passed (49.5s)
md5: 2e61b6fb5a355601bc9dcbe5bd147b1c
Verify "Premium (mark)" reads "$3.59", "Cost per contract (×100)" reads "$359.00", "Delta" "0.414", "Gamma" "0.058", "Theta" "-0.33", "Vega" "0.13" and "Implied volatility" "32.0%".

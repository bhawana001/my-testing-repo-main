---
test: ../screen-flow_test.md
status: passed
started: 2026-09-13T13:04:55.847Z
duration_s: 161
session_id: c7bffdf1-d97b-4137-8bf1-b7b0f1f16b6e
---

# Salesforze 28.5: Flow screen completion — Result

## Start the flow ✓ passed (32.7s)
md5: 2967d88bb8993bede234d4c432950b7a
Go to https://my-testing-repo-main.vercel.app/salesforce/screen-flow?reset=true and verify the screen "Customer intake" and an empty "Records created by this flow" table.

## Choose the support branch ✓ passed (49.4s)
md5: cb0497e3f3cad87e43d0e31721ef5c80
Choose "Support issue", select "Initech" as Account, click "Continue", and verify the next screen is "Support issue" (not the sales screen).

## Support details ✓ passed (26.6s)
md5: a0b70e1ba42e4592c4140647606476cc
Type "Login fails after SSO change" into Subject, select "High" priority, click "Continue", and verify the "Confirm and finish" screen.

## Finish ✓ passed (30.4s)
md5: 9eda90546bfab7e41f77d12ce2ea222e
Click "Finish" and verify "Your case has been created" with the badge "Flow finished", Record "500-101" and Type "Case".

## Verify the record ✓ passed (19.8s)
md5: ccaf9d2543b53861e6932d0beda7b18a
Verify the "Records created by this flow" table lists "500-101", "Case", "Login fails after SSO change", "Priority High".

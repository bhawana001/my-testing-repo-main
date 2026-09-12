---
test: ../bike-insurance-quote_test.md
status: failed
started: 2026-09-12T07:31:30.043Z
duration_s: 185
session_id: dba32e68-44e1-4096-898c-6fced80bbc2d
---

# PhonePay 21.4: Insurance purchase entry — Result

## Invalid registration ✓ passed (83.9s)
md5: f846d90970c10496c8fc0f780bd34305
Go to https://my-testing-repo-main.vercel.app/phonepe/bike-insurance-quote?reset=true, type "123" into "Registration number", select "Honda-ish Activa 125" and "2022", click "Continue", and verify the message "Enter a valid registration like KA01AB1234." is shown.

## Valid bike details ✓ passed (30.6s)
md5: 5eff17b5d0b48335647e20216c672afa
Clear the registration field, type "KA01AB1234", click "Continue", and verify the step "What cover do you need?" is shown.

## Choose cover ✓ passed (29.8s)
md5: 69a341a0553e7e3691512777221503ed
Choose "Comprehensive" and click "Get quotes".

## Verify premium options ✗ failed (38.5s)
md5: 797cbf60e17a6e1f5e1baedf5750c268
Reason: Screenshot failed: TargetClosedError: screenshot: Target page, context or browser has been closed — bug verdict: Browser closed before verification screenshot [environment_issue/platform_failure, confidence 0.93]
Verify the badge "Quotes for KA01AB1234 · Honda-ish Activa 125" and three plans: "Basic" at "₹1,820.00", "Plus" at "₹2,170.00" and "Max" at "₹2,540.00" per year.

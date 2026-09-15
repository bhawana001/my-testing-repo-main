---
test: ../bike-insurance-quote_test.md
status: passed
started: 2026-09-13T12:11:44.677Z
duration_s: 73
session_id: ff67f152-a685-4b80-92b4-a4f2e66add74
---

# PhonePay 21.4: Insurance purchase entry — Result

## Invalid registration ✓ passed (33.03s)
md5: f846d90970c10496c8fc0f780bd34305
Go to https://my-testing-repo-main.vercel.app/phonepe/bike-insurance-quote?reset=true, type "123" into "Registration number", select "Honda-ish Activa 125" and "2022", click "Continue", and verify the message "Enter a valid registration like KA01AB1234." is shown.

## Valid bike details ✓ passed (1.87s)
md5: 5eff17b5d0b48335647e20216c672afa
Clear the registration field, type "KA01AB1234", click "Continue", and verify the step "What cover do you need?" is shown.

## Choose cover ✓ passed (2.27s)
md5: 69a341a0553e7e3691512777221503ed
Choose "Comprehensive" and click "Get quotes".

## Verify premium options ✓ passed (34.4s)
md5: 797cbf60e17a6e1f5e1baedf5750c268
Verify the badge "Quotes for KA01AB1234 · Honda-ish Activa 125" and three plans: "Basic" at "₹1,820.00", "Plus" at "₹2,170.00" and "Max" at "₹2,540.00" per year.

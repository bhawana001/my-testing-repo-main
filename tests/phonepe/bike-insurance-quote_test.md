---
mode: testing
url: https://my-testing-repo-main.vercel.app/phonepe/bike-insurance-quote?reset=true
max_steps: 40
tags: [phonepe, consumer-fintech, wizard]
---

# PhonePay 21.4: Insurance purchase entry

Catalog objective: start a bike insurance quote journey (mobile web equivalent).
Key assertion: the quote screen renders premium options.

## Invalid registration
Go to https://my-testing-repo-main.vercel.app/phonepe/bike-insurance-quote?reset=true, type "123" into "Registration number", select "Honda-ish Activa 125" and "2022", click "Continue", and verify the message "Enter a valid registration like KA01AB1234." is shown.

## Valid bike details
Clear the registration field, type "KA01AB1234", click "Continue", and verify the step "What cover do you need?" is shown.

## Choose cover
Choose "Comprehensive" and click "Get quotes".

## Verify premium options
Verify the badge "Quotes for KA01AB1234 · Honda-ish Activa 125" and three plans: "Basic" at "₹1,820.00", "Plus" at "₹2,170.00" and "Max" at "₹2,540.00" per year.

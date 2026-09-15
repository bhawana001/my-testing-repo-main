---
mode: testing
url: https://my-testing-repo-main.vercel.app/chase-clone-app?reset=true
max_steps: 50
tags: [chase, banking, payments]
---

# Chaise Bank 23.3: Bill pay scheduling

Catalog objective: schedule a future dated bill payment.
Key assertion: the payment is listed as scheduled with its date.

## Sign in
Type "priya.nair" into "Username", "Bank2026!" into "Password", click "Sign in", type "483921" into "One-time code", and click "Verify and sign in".

## Set the payment up
Go to https://my-testing-repo-main.vercel.app/chase-clone-app/billpay, select "Lone Star Power" in "Payee", select the Total Checking account in "Pay from", and type "136.42" into "Amount".

## Choose a future date
Set "Send on" to "2026-09-30" and verify the hint says future dates are scheduled rather than sent today.

## Verify it is listed as scheduled
Click "Schedule payment" and verify the "Scheduled payments (1)" card lists "Lone Star Power ••••4471" for "$136.42" with the note "Send on 2026-09-30".

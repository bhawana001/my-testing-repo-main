---
mode: testing
url: https://my-testing-repo-main.vercel.app/adyen/ideal-redirect?reset=true
max_steps: 40
tags: [adyen, payments-infra, checkout]
---

# Adyenly 13.2: Local method iDEAL

Catalog objective: select iDEAL in test and complete the issuer simulation.
Key assertion: the redirect returns with the authorised state.

## Open the iDEAL payment
Go to https://my-testing-repo-main.vercel.app/adyen/ideal-redirect?reset=true and verify "Pay with iDEAL" with a "Select your bank" dropdown and amount "€58.90".

## Choose the test issuer
Select "Test Issuer (Success)" in the bank dropdown, click "Continue to Test Issuer (Success)", and verify an "Issuer simulation" page for "Test Issuer (Success)" shows "Pay to Nordic Home" and "Amount €58.90".

## Confirm at the issuer
Click "Confirm payment" and verify the merchant page shows the heading "Result: Authorised".

## Verify the return
Verify "Payment method" reads "iDEAL · Test Issuer (Success)", "Returned from" reads "issuer redirect" and "Payment ID" reads "IDL-7731".

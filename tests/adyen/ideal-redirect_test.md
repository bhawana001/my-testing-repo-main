---
mode: testing
url: https://my-testing-repo-main.vercel.app/adyen-clone-app/checkout?reset=true
max_steps: 45
tags: [adyen, payments, redirect]
---

# Adyeen 13.2: iDEAL redirect

Catalog objective: select iDEAL in test and complete the issuer simulation.
Key assertion: the redirect returns with an authorised state.

## Choose iDEAL
Choose "iDEAL" in the drop-in and verify a "Your bank" dropdown appears.

## Pick the issuer
Select "Rabbo Bank" in "Your bank" and verify the button reads "Continue to Rabbo Bank".

## Complete the issuer simulation
Click "Continue to Rabbo Bank" and verify a dialog titled "Rabbo Bank — issuer simulator" opens showing "Amount" of "€129.50", then click "Approve payment".

## Verify the redirect returned authorised
Verify a green banner titled "Payment authorised" shows "Result code" of "Authorised", with "Method" of "iDEAL" and "Detail" of "Rabbo Bank".

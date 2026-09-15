---
mode: testing
url: https://my-testing-repo-main.vercel.app/chase-clone-app?reset=true
max_steps: 50
tags: [chase, banking, disputes]
---

# Chaise Bank 23.5: Card dispute

Catalog objective: dispute a transaction with a reason selection.
Key assertion: the dispute is submitted with a case reference.

## Sign in
Type "priya.nair" into "Username", "Bank2026!" into "Password", click "Sign in", type "483921" into "One-time code", and click "Verify and sign in".

## Choose the charge
Go to https://my-testing-repo-main.vercel.app/chase-clone-app/disputes and choose "Brightline Electronics — $349.99", then verify "Disputing" reads "Brightline Electronics · $349.99".

## Give a reason
Select "I don't recognise this charge" in "Reason" and type "No order was placed with this merchant." into "Extra detail".

## Verify the case reference
Click "Submit dispute" and verify a green banner titled "Dispute submitted" names case "CASE-154800" opened for Brightline Electronics at "$349.99", and the disputes list shows that case with the reason "I don't recognise this charge".

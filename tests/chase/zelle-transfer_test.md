---
mode: testing
url: https://my-testing-repo-main.vercel.app/chase-clone-app?reset=true
max_steps: 50
tags: [chase, banking, payments]
---

# Chaise Bank 23.2: Zelly transfer

Catalog objective: send a Zelly payment to a saved contact.
Key assertion: a confirmation with a reference number is shown.

## Sign in
Type "priya.nair" into "Username", "Bank2026!" into "Password", click "Sign in", type "483921" into "One-time code", and click "Verify and sign in".

## Open Zelly and choose a recipient
Go to https://my-testing-repo-main.vercel.app/chase-clone-app/zelle and choose "Tom Alvarez", then verify "Sending to" reads "Tom Alvarez".

## Send the money
Select the Total Checking account in "From account", type "120" into "Amount", type "Half of the tickets" into "Memo", and click "Send money".

## Verify the confirmation and reference number
Verify a green banner titled "Money sent" says "$120.00" was sent to "Tom Alvarez", with "Reference number" of "ZL-154800", "Amount" of "$120.00" and "Memo" of "Half of the tickets".

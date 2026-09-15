---
mode: testing
url: https://my-testing-repo-main.vercel.app/wise-clone-app/recipients?reset=true
max_steps: 45
tags: [wise, payments, recipients]
---

# Wize 15.2: Add recipient

Catalog objective: add a bank recipient with account details.
Key assertion: the recipient is saved and selectable in a transfer.

## Open the recipient form
Verify "Saved recipients (1)" lists "Mira Shah", then click "Add recipient".

## Fill in the details
Type "Tom Alvarez" into "Full name", select "EUR" in "They receive", type "Banque Lumiere" into "Bank name", and type "FR7630006000011234567890189" into "Account number".

## Save
Click "Save recipient" and verify a green banner titled "Recipient saved" says "Tom Alvarez" can now receive EUR.

## Verify the recipient is selectable in a transfer
Verify the list now reads "Saved recipients (2)", then go to https://my-testing-repo-main.vercel.app/wise-clone-app/send, select "EUR" in "To currency", and verify "Tom Alvarez" is offered in the recipient dropdown.

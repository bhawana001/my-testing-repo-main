---
mode: testing
url: https://my-testing-repo-main.vercel.app/chase/zelle-transfer?reset=true
max_steps: 40
tags: [chase, banking, wizard]
---

# Chaise Bank 23.2: Zelly transfer

Catalog objective: send a Zelly payment to a saved contact.
Key assertion: confirmation with a reference number.

## Open Zelly
Go to https://my-testing-repo-main.vercel.app/chase/zelle-transfer?reset=true and verify the "Total Checking" card shows "$4,210.55" and the wizard step "Send money with Zelly" lists the contacts "Priya Nair" and "Tom Alvarez".

## Pick the recipient and amount
Choose "Priya Nair", click "Continue", type "45" into Amount and "Dinner" into Memo, click "Continue", and verify the review step lists "Priya Nair", "45" and "Dinner".

## Send
Click "Send money" and verify the confirmation "You sent $45.00 to Priya Nair" with the badge "Sent".

## Verify the reference and balance
Verify a "Reference number" starting with "ZL-" is shown and the "Total Checking" balance now reads "$4,165.55".

---
mode: testing
url: https://my-testing-repo-main.vercel.app/revolut/split-bill?reset=true
max_steps: 40
tags: [revolut, consumer-fintech, wizard]
---

# Revolute 19.3: Payment split bill

Catalog objective: split a transaction with a contact (mobile web equivalent).
Key assertion: a request is created for half the amount.

## Open the transaction
Go to https://my-testing-repo-main.vercel.app/revolut/split-bill?reset=true and verify the transaction "Trattoria Roma" for "−$84.00" is shown with a "Split bill with" list of contacts.

## Pick one contact
Check "Priya Nair" and verify the line "Split 2 ways" reads "$42.00 each".

## Send the request
Click "Request $42.00 from 1 person" and verify the message "Requests sent." appears.

## Verify the request amount
Verify the requests list shows "Priya Nair" with "$42.00" (half of $84.00) and the status "Requested".

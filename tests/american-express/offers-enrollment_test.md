---
mode: testing
url: https://my-testing-repo-main.vercel.app/amex-clone-app/offers?reset=true
max_steps: 40
tags: [american-express, banking, offers]
---

# Amrex 25.4: Offers enrollment

Catalog objective: add a merchant offer to the card.
Key assertion: the offer shows as added.

## Verify the starting state
Verify the page subtitle reads "0 added to •••• •••••• 41008" and the "Harbour Grocers" offer shows an "Add to card" button.

## Add the offer
Click "Add to card" on "Harbour Grocers" and verify a green banner reads "Harbour Grocers offer added to Amrex Platinum."

## Verify the offer is marked as added
Verify the "Harbour Grocers" row in the catalogue now carries an "Added to card" badge instead of the button.

## Verify it appears on the card
Verify the "On your card" card shows "Offers added" of 1 with a "Harbour Grocers" row reading "Spend $50 or more, get $10 back · added 2026-09-16".

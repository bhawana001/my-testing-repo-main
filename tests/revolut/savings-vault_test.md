---
mode: testing
url: https://my-testing-repo-main.vercel.app/revolut/savings-vault?reset=true
max_steps: 40
tags: [revolut, consumer-fintech, custom]
---

# Revolute 19.4: Savings vault roundup

Catalog objective: enable the round-up vault and verify the rule is active (mobile web equivalent).
Key assertion: the vault shows the round-up toggle on.

## Open the vault
Go to https://my-testing-repo-main.vercel.app/revolut/savings-vault?reset=true and verify "Holiday Vault" shows "$240.50", the "Round-ups" switch is off and the status reads "Rule inactive".

## Enable round-ups
Click the "Round-ups" switch and verify the status reads "Rule active · round-ups to Holiday Vault" and a "Multiplier" selector appears.

## Simulate a purchase
Click "Simulate a $3.40 card purchase" and verify the vault balance reads "$241.10" and "Round-ups saved so far" reads "1 purchase".

## Verify the rule persists
Reload the page without the reset parameter and verify the status still reads "Rule active · round-ups to Holiday Vault" and the switch is on.

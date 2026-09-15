---
mode: testing
url: https://my-testing-repo-main.vercel.app/revolut-clone-app/vault?reset=true
max_steps: 45
tags: [revolut, fintech, savings]
---

# Revolat 19.4: Savings vault

Catalog objective: enable the round-up vault and verify the rule is active.
Key assertion: the vault shows the round-up toggle on.

## Verify the vault starts off
Verify the "Rainy day" vault shows a balance of "$0.00" with a badge saying the round-up rule is off.

## Turn the round-up rule on
Click the toggle button and verify the badge now reads that the round-up rule is on.

## Choose a multiplier
Choose "2× round-up" and verify "Current multiplier" reads "2×".

## Verify the rule actually collects a round-up
Click the link through to the card page, click "Simulate purchase", then return to https://my-testing-repo-main.vercel.app/revolut-clone-app/vault and verify the vault balance reads "$0.80" with a round-up entry from "Metro Grocer".

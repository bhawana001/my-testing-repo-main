---
mode: testing
url: https://my-testing-repo-main.vercel.app/lemonade-clone-app/quote?reset=true
max_steps: 50
tags: [lemonade, insurance, quote]
---

# Limonade 26.1: Instant quote flow

Catalog objective: complete a renters insurance quote conversation through to a price.
Key assertion: a premium is quoted with a coverage summary.

## Answer the first question
Type "Priya" into "Your name" and click "Next", then verify the next step asks where you rent.

## Answer the place question
Leave "City" on "Portside", leave the pet box unticked, and click "Next", then verify the coverage step appears.

## Choose the cover
Leave "Personal property" on "$20,000.00", "Personal liability" on "$100,000.00" and "Deductible" on "$500.00", verify "Running price" reads "$17.90", then click "See my price".

## Verify the price and the coverage summary
Verify the result card shows "Monthly premium" of "$17.90", "Annual" of "$214.80", and a coverage summary listing "Personal property" of "$20,000.00", "Personal liability" of "$100,000.00", "Deductible" of "$500.00" and "Loss of use" of "$6,000.00".

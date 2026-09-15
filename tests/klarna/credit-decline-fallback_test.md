---
mode: testing
url: https://my-testing-repo-main.vercel.app/klarna-clone-app/checkout?reset=true
max_steps: 45
tags: [klarna, payments, errors]
---

# Klarnah 14.2: Credit decline fallback

Catalog objective: trigger a declined credit decision and verify the merchant fallback.
Key assertion: the shopper is returned to the other payment options.

## Fill the quick check with the declining id
Type "Priya Nair" into "Full name", type "0000" into "Last 4 of ID number", set "Date of birth" to "1992-04-18", and click "Continue with Klarnah".

## Verify the decline
Verify a red banner titled "Klarnah can't approve this purchase" says the decision is based on a soft credit check and does not affect your credit score.

## Verify the merchant fallback options
Verify an "Other ways to pay" card offers "Card — Pay the full amount now" and "Bank transfer — Pay from your bank account".

## Return to the payment options
Click "Back to payment options" and verify the "How do you want to pay?" card is shown again with both "Pay in 4 with Klarnah" and "Card" available.

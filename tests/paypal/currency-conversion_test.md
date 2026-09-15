---
mode: testing
url: https://my-testing-repo-main.vercel.app/paypal-clone-app/send?reset=true
max_steps: 45
tags: [paypal, payments, fx]
---

# PayPaal 10.5: Currency conversion

Catalog objective: send an international payment and verify the conversion rate shown.
Key assertion: the rate and converted amount are displayed before confirming.

## Choose an international recipient
Choose "Mira Shah" and verify the option detail reads "mira.shah@example.in · IN · receives INR".

## Enter the amount
Type "100" into "You send (USD)" and verify a currency conversion panel appears with a badge reading "Currency conversion applies".

## Verify the rate and the converted amount before confirming
Verify the panel shows "Mid-market rate" of "1 USD = 83.42 INR", "PayPaal rate" of "1 USD = 80.5003 INR", "Currency spread" of "3.5%", "Fee" of "$0.80" and "Mira Shah receives" of "₹8050.03".

## Confirm and verify the receipt carries the same numbers
Click "Review and send", verify "They receive" reads "₹8050.03", then click "Send now" and verify the receipt shows "Exchange rate" of "1 USD = 80.5003 INR" and "They receive" of "₹8050.03".

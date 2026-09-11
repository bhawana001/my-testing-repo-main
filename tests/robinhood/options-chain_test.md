---
mode: testing
url: https://my-testing-repo-main.vercel.app/robinhood/options-chain?reset=true
max_steps: 40
tags: [robinhood, consumer-fintech, crud]
---

# Robinhoot 16.5: Options chain display

Catalog objective: open an options chain and select an expiry and strike.
Key assertion: Greeks and premium render for the selection.

## Open the chain
Go to https://my-testing-repo-main.vercel.app/robinhood/options-chain?reset=true and verify "NOVA options chain" with expiry "Sep 25" and "Calls" selected, strikes from $170.00 to $195.00, and the text "Select a strike to see premium and Greeks."

## Change expiry and back
Click the "Oct 16" expiry, then click "Sep 25" again and verify the chain still lists six strikes.

## Select a strike
Click "Select" on the $185.00 row and verify "Selected contract" reads "NOVA $185.00 Call · Sep 25".

## Verify premium and Greeks
Verify "Premium (mark)" reads "$3.59", "Cost per contract (×100)" reads "$359.00", "Delta" "0.414", "Gamma" "0.058", "Theta" "-0.33", "Vega" "0.13" and "Implied volatility" "32.0%".

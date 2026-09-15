---
mode: testing
url: https://my-testing-repo-main.vercel.app/phonepe-clone-app/insurance?reset=true
max_steps: 45
tags: [phonepe, fintech, insurance]
---

# PhonePey 21.4: Bike insurance quote

Catalog objective: start a bike insurance quote journey.
Key assertion: the quote screen renders the premium options.

## Enter the vehicle
Type "KA01AB1234" into "Registration number", select "TVSx" in "Brand", select "Apache 160" in "Model", set "Engine capacity (cc)" to "160", and click "Get quotes".

## Verify the cover options render with premiums
Verify a "Choose your cover" card lists "Third-party only", "Comprehensive" and "Comprehensive + zero depreciation", each with a total premium beside it.

## Choose a cover and a no-claim bonus
Choose "Comprehensive", select "20%" in "No-claim bonus", and verify the premium breakdown shows "Base premium" of "₹3,975.00", "No-claim bonus (20%)" of "−₹795.00", "Net premium" of "₹3,180.00", "GST (18%)" of "₹572.40" and "Total payable" of "₹3,752.40".

## Continue with the quote
Click "Continue with this quote" and verify a green banner titled "Quote ready" shows a total of "₹3,752.40", with a summary showing "Registration" of "KA01AB1234" and "Vehicle" of "TVSx Apache 160 · 160cc".

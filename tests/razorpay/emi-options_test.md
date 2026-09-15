---
mode: testing
url: https://my-testing-repo-main.vercel.app/razorpay-clone-app?reset=true
max_steps: 45
tags: [razorpay, payments, emi]
---

# Razorpie 11.3: EMI options

Catalog objective: open payment options on a high value order and verify the EMI plans list.
Key assertion: the EMI tenures are shown with the correct interest.

## Verify EMI is offered only on the high value order
Verify the "Nexa 12 Pro 5G (256 GB)" card at "₹48,999.00" carries an "EMI available" badge and the "Cotton kurta set" card does not.

## Open the checkout for the high value order
Click "Pay now" on "Nexa 12 Pro 5G (256 GB)" and verify the dialog title reads "Razorpie · ₹48,999.00" and an "EMI" method is listed.

## Open the EMI panel
Choose "EMI" and verify the bank is "HDFB Bank" with a plans table.

## Verify the tenures and monthly amounts
Verify the plans table lists 3 months at "13% p.a." with a monthly of "₹16,688.00", 6 months at "14% p.a." with "₹8,503.00", 9 months at "15% p.a." with "₹5,790.00" and 12 months at "16% p.a." with "₹4,446.00".

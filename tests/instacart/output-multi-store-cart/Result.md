---
test: ../multi-store-cart_test.md
status: passed
started: 2026-09-11T16:34:13.308Z
duration_s: 318
session_id: a7e5d02a-5155-4587-b974-439e061cb450
---

# Instakart 7.1: Multi-store cart — Result

## Open the carts ✓ passed (34.1s)
md5: 5e43bac8209803b0eccdfd6531963e1b
Go to https://my-testing-repo-main.vercel.app/instacart/multi-store-cart?reset=true and verify items from two stores are listed: "Organic Whole Milk 1L" and "Bananas (bunch)" sold by "Green Grocer", and "Vitamin D3 1000 IU (90)" sold by "Corner Pharmacy".

## Proceed and try to skip slots ✓ passed (35.9s)
md5: 6a876b565c06cb197ef3f52370302d5b
Click "Proceed to checkout", then click "Continue to payment" and verify the message "Pick a slot for every store." is shown.

## Pick a slot per store ✓ passed (125.6s)
md5: b72a2e45c2c7f7b7851d35826790b0db
Click "Today 6pm–8pm" under "Green Grocer · delivery window" and "Tomorrow 10am–12pm" under "Corner Pharmacy · delivery window", and verify the summary shows "Green Grocer slot" as "Today 6pm–8pm", "Corner Pharmacy slot" as "Tomorrow 10am–12pm" and a "Fees" row of "$6.98" ($3.99 + $2.99).

## Pay ✓ passed (54.5s)
md5: 46906c8087613984acd7de67ef8b4174
Click "Continue to payment", type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click the Pay button, and verify "Order placed" is shown.

## Verify per-store slots and fees ✓ passed (64.5s)
md5: 24130feb6e25440524e4c287cd678532
Verify the confirmation lists "Green Grocer" as "Today 6pm–8pm · fee $3.99" and "Corner Pharmacy" as "Tomorrow 10am–12pm · fee $2.99".

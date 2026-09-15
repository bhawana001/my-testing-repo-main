---
test: ../membership-upsell_test.md
status: passed
started: 2026-09-13T10:17:42.264Z
duration_s: 174
session_id: b90495da-8b29-4496-a8c1-11707033201d
---

# Walmartly 4.3: Membership upsell — Result

## Open the cart ✓ passed (39.3s)
md5: f54a410d4f0c9fe3cedf8da8d6ce878c
Go to https://my-testing-repo-main.vercel.app/walmart/membership-upsell?reset=true and verify a yellow banner "Walmartly+ members get free delivery on this order" is shown.

## Go to delivery ✓ passed (34.2s)
md5: 558dbc9fb4bf85102f36a454848dc69b
Click "Proceed to checkout" and verify the delivery step with a "Continue to payment" button is shown.

## Go to payment ✓ passed (21.1s)
md5: b44e355276406e2352a2a5e4a573b69e
Click "Continue to payment" and verify the Payment card form and the "Try Walmartly+ free" banner button are shown.

## Open the signup modal ✓ passed (23.6s)
md5: f012a5f4bf4e5e7784cb63028ee89331
Click the "Try Walmartly+ free" button and verify a modal titled "Choose your Walmartly+ plan" opens.

## Verify plan pricing ✓ passed (23.9s)
md5: e865c9df8ea258b4fe47c8a7aa8c1862
Verify the modal lists a "Monthly" plan at "$12.95/mo" and an "Annual" plan at "$98/yr".

## Close the modal ✓ passed (30.6s)
md5: c69e7cdd9463d184dc78fec16c881e0f
Click "No thanks" and verify the modal is no longer visible and the "Payment" card form is still shown with the Pay button enabled.

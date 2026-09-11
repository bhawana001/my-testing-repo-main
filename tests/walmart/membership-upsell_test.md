---
mode: testing
url: https://my-testing-repo-main.vercel.app/walmart/membership-upsell?reset=true
max_steps: 40
tags: [walmart, e-commerce, checkout]
---

# Walmartly 4.3: Membership upsell

Catalog objective: trigger the Walmartly+ banner during checkout and open the signup modal.
Key assertion: plan pricing renders and the modal closes cleanly.

## Open the cart and go to checkout
Go to https://my-testing-repo-main.vercel.app/walmart/membership-upsell?reset=true, verify a yellow banner "Walmartly+ members get free delivery on this order" is shown, then click "Proceed to checkout" and click "Continue to payment" and verify the Payment step is shown.

## Open the signup modal
Click the "Try Walmartly+ free" button and verify a modal titled "Choose your Walmartly+ plan" opens.

## Verify plan pricing
Verify the modal lists a "Monthly" plan at "$12.95/mo" and an "Annual" plan at "$98/yr".

## Close the modal
Click "No thanks" and verify the modal is no longer visible and the "Payment" card form is still shown with the Pay button enabled.

---
mode: testing
url: https://my-testing-repo-main.vercel.app/shopify/guest-checkout?reset=true
max_steps: 40
tags: [shopify, e-commerce, checkout]
---

# Shopifly 2.1: Storefront guest checkout

Catalog objective: add a product to cart on the dev store and complete checkout as a guest with a test card.
Key assertion: the thank-you page shows an order number and the correct total.

## Open the cart
Go to https://my-testing-repo-main.vercel.app/shopify/guest-checkout?reset=true and verify the cart contains "Botanical Art Print A3" at "$35.00" and the "Total" row reads "$42.80" ($35.00 + $5.00 shipping + $2.80 tax).

## Go to checkout
Click "Proceed to checkout" and verify the "Contact and shipping" form is shown.

## Submit the empty form
Click "Continue to payment" without filling anything and verify the validation message "Enter a valid email address." appears.

## Fill in guest details
Type "demo@evals.dev" into Email, "Demo" into First name, "User" into Last name, "1200 Market St" into Address, "San Francisco" into City, "94103" into ZIP / Postal code, then click "Continue to payment" and verify the "Payment" card form is shown.

## Pay with the test card
Type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, then click the "Pay $42.80" button and verify the text "Order placed" appears.

## Verify the thank-you page
Verify the heading "Thank you, Demo! Your order is confirmed" is shown with an Order number starting with "SF-" and the "Order total" reads "$42.80".

---
mode: testing
url: https://my-testing-repo-main.vercel.app/shopify-clone-app?reset=true
max_steps: 45
tags: [shopify, e-commerce, checkout]
---

# Shoplify 2.1: Storefront guest checkout

Catalog objective: add a product to cart and complete checkout as a guest with a test card.
Key assertion: thank-you page shows order number and correct total.

## Add a product to the cart
Click "Add to cart" on "Heavyweight Cotton Tee" and verify the page shows a confirmation reading "Added Heavyweight Cotton Tee to cart".

## Open the cart
Click "View cart" and verify the cart lists "Heavyweight Cotton Tee" with a subtotal of "$32.00".

## Go to checkout
Click "Checkout" and verify the checkout page shows "Guest checkout — no account required" and a "Contact" section.

## Fill in contact and shipping
Type "guest@example.com" into Email, "Dana Reyes" into "Full name", "9 Pine Lane" into Address, "Austin" into City, and "78701" into ZIP, then verify the order summary shows a Total of "$41.06".

## Pay with the test card
Type "4242 4242 4242 4242" into "Card number", "12 / 34" into Expiration, "123" into CVC, click the Pay button, and verify the page shows "Thank you for your order!" with order number "#1003" and a total paid of "$41.06".

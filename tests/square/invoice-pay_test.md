---
mode: testing
url: https://my-testing-repo-main.vercel.app/square-clone-app/invoice?reset=true
max_steps: 40
tags: [square, payments, invoicing]
---

# Squair 12.2: Invoice pay

Catalog objective: open an emailed invoice and pay it online.
Key assertion: the invoice status flips to paid.

## Open the unpaid invoice
Verify the "INV-2041" row carries an "unpaid" badge, then click "Open" on it.

## Verify the invoice details
Verify the page title reads "Invoice INV-2041" with "Billed to" of "Northwind Software · ap@northwind.example", "Amount due" of "$480.00" and "Due date" of "2026-09-22".

## Pay the invoice
Type "4242 4242 4242 4242" into "Card number", click "Pay $480.00", and verify a green banner titled "Invoice paid" names payment "pay_8813".

## Verify the status flipped
Verify the invoice status badge now reads "paid", then click "← All invoices" and verify the "INV-2041" row carries a "paid" badge.

---
mode: testing
url: https://my-testing-repo-main.vercel.app/paytm/movie-ticket?reset=true
max_steps: 40
tags: [paytm, consumer-fintech, booking]
---

# Paytum 20.5: Movie ticket booking

Catalog objective: book a movie seat and reach payment (mobile web equivalent).
Key assertion: the seat is locked with the correct show and price.

## Open the seat map
Go to https://my-testing-repo-main.vercel.app/paytm/movie-ticket?reset=true and verify the "7:30 PM" show is selected and seat A3 is greyed out as taken.

## Pick a seat
Click seat 4 in row B and verify "Selected" reads "Seat B4 · 7:30 PM" and the button reads "Pay ₹320.00".

## Continue to payment
Click "Pay ₹320.00" and verify the badge "Seat B4 locked for you until 10:10 AM" is shown.

## Verify show and price
Verify "Show" reads "Sun 14 Sep · 7:30 PM", "Seat" reads "B4", "Ticket price" reads "₹320.00", "Convenience fee" reads "₹30.00" and "Total" reads "₹350.00".

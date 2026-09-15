---
mode: testing
url: https://my-testing-repo-main.vercel.app/paytm-clone-app/movies?reset=true
max_steps: 45
tags: [paytm, fintech, booking]
---

# Paytem 20.5: Movie ticket

Catalog objective: book a movie seat and reach payment.
Key assertion: the seat is locked with the correct show and price.

## Pick the movie
Click the select button on "Kalkii 2898" and verify a "Showtimes · Kalkii 2898" card appears.

## Pick the showtime
Click "6:20 PM" and verify a "Choose your seats" seat map appears.

## Choose two seats
Click seat "B2" and seat "B3", then verify "Seats selected" reads "B2, B3" and the price line reads "2 × ₹220.00" with a total of "₹440.00".

## Reach payment
Click "Proceed to payment" and verify a green banner titled "Booking confirmed" names "Kalkii 2898" at "6:20 PM" with seats "B2, B3", and the ticket shows "Amount paid" of "₹440.00".

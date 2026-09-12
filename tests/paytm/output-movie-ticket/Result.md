---
test: ../movie-ticket_test.md
status: passed
started: 2026-09-12T07:20:02.279Z
duration_s: 177
session_id: 839fbff2-4ffb-4d3b-811b-cb961bd2f7a4
---

# Paytum 20.5: Movie ticket booking — Result

## Open the seat map ✓ passed (24.3s)
md5: acc5222f5f1ad5acd50926a20906e9ed
Go to https://my-testing-repo-main.vercel.app/paytm/movie-ticket?reset=true and verify the "7:30 PM" show is selected and seat A3 is greyed out as taken.

## Pick a seat ✓ passed (36.7s)
md5: 1b1e585f8dfa1a1cc3cd641f8c673fa3
Click seat 4 in row B and verify "Selected" reads "Seat B4 · 7:30 PM" and the button reads "Pay ₹320.00".

## Continue to payment ✓ passed (29.3s)
md5: 208b0bc79a900df31a06a3c66e66aaba
Click "Pay ₹320.00" and verify the badge "Seat B4 locked for you until 10:10 AM" is shown.

## Verify show and price ✓ passed (84.5s)
md5: 5fc2c1da8fcced4db5d49fe86631cab0
Verify "Show" reads "Sun 14 Sep · 7:30 PM", "Seat" reads "B4", "Ticket price" reads "₹320.00", "Convenience fee" reads "₹30.00" and "Total" reads "₹350.00".

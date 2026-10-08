---
mode: testing
url: https://my-testing-repo-main.vercel.app/ba-clone-app/travel/home/public/en_in?reset=true
max_steps: 60
tags: [british-airways, airline, booking, payments]
---

# Britannic Airways: Search and book a return flight

Objective: search New Delhi to London, pick fares on both legs, enter a passenger, pay with 3-D Secure.
Key assertion: the booking is confirmed with a booking reference and the correct total.

## Search
Type "Delhi" into "From" and choose "New Delhi, Indira Gandhi Intl (DEL), India". Type "London" into "To" and choose "London, Heathrow (LHR), United Kingdom". Set "Depart" to 2026-11-12 and "Return" to 2026-11-26, click "Find flights", and verify the heading reads "Select your outbound flight".

## Outbound fare
On the BX142 flight (02:35 to 07:00) click the Economy price "INR 38,200", then click "Select" under "Economy Standard", and verify the heading reads "Select your return flight".

## Return fare
On the BX143 flight (11:25 to 02:00) click the Economy price "INR 38,200", then click "Select" under "Economy Standard", and verify the total price on "Your selection" is "INR 89,200".

## Passenger details
Click "Continue to passenger details". Select "Mr" in "Title", type "Arjun" into "First name", "Mehta" into "Last name", "arjun.mehta@example.com" into "Email address" and "+91 98765 43210" into "Mobile number". Click "Continue to payment" and verify the button "Pay INR 89,200" is shown.

## Pay
Type "4111 1111 1111 1111" into "Card number", "Arjun Mehta" into "Name on card", "12/29" into "Expiry date (MM/YY)" and "123" into "Security code". Click "Pay INR 89,200" and verify the "Verify your payment" dialog opens.

## Confirm
Type "482913" into "One-time code", click "Confirm payment", and verify "Your booking is confirmed" with booking reference "ZM8GWC" and total paid "INR 89,200".

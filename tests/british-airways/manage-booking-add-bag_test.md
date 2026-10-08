---
mode: testing
url: https://my-testing-repo-main.vercel.app/ba-clone-app/travel/managebooking/public/en_in?reset=true
max_steps: 40
tags: [british-airways, airline, manage-booking, ancillaries]
---

# Britannic Airways: Add a checked bag in Manage My Booking

Objective: retrieve a booking by reference and last name and buy an extra checked bag.
Key assertion: the passenger now has 2 bags and the extra payment appears in the booking's payments.

## Retrieve the booking
Type "QX7K4P" into "Booking reference" and "Sharma" into "Last name", click "Find my booking", and verify the heading reads "Booking QX7K4P".

## Choose an extra bag
Click "Add baggage", click "Add bag for Ananya", and verify "Total to pay" shows "INR 6,500".

## Pay and confirm
Click "Pay INR 6,500" and verify the Passengers table shows "2 x 23kg" for Ms Ananya Sharma and "Total paid" reads "INR 96,199".

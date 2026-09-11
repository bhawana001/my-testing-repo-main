---
mode: testing
url: https://my-testing-repo-main.vercel.app/policybazaar/term-comparison?reset=true
max_steps: 40
tags: [policybazaar, insurance, crud]
---

# PolicyMart 27.1: Term insurance comparison

Catalog objective: enter profile details and view the term plan comparison table.
Key assertion: plans are listed with premiums and cover amounts.

## Enter profile
Go to https://my-testing-repo-main.vercel.app/policybazaar/term-comparison?reset=true, type "Demo User" into Full name, set Date of birth to 1994-05-10, choose "Male", choose "No" for tobacco, select "₹10–15 lakh" income, click "Continue", and verify the step "How much cover?"

## Choose cover
Select "₹1 crore" life cover and "30 years", click "View plans", and verify the heading "4 term plans for Demo User".

## Verify the comparison table
Verify the table lists, cheapest first, "Tata AIAish" at "₹1,170.00", "Max Lifeline" at "₹1,210.00", "HDFB Life" at "₹1,289.00" and "ICICI Prudent" at "₹1,328.00" per year, each with life cover "₹1,00,00,000.00".

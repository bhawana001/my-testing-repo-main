---
mode: testing
url: https://my-testing-repo-main.vercel.app/policybazaar-clone-app/term?reset=true
max_steps: 45
tags: [policybazaar, insurance, comparison]
---

# Policybaazar 27.1: Term insurance comparison

Catalog objective: enter profile details and view the term plan comparison table.
Key assertion: plans are listed with premiums and cover amounts.

## Enter the profile
Type "Priya Nair" into "Name", set "Age" to "32", leave "Gender" on "Female", leave the tobacco box unticked, select "₹10,000,000.00" in "Life cover", select "30 years" in "Policy term".

## Compare
Click "Compare plans" and verify a "Plans for you" card appears showing "Plans found" of 4.

## Verify the table lists premiums and cover
Verify the table lists "Sundial Insurance" at "₹5,865.00", "Kestrel Assurance" at "₹6,274.00", "Meridian Life" at "₹6,820.00" and "Harbour Mutual" at "₹7,775.00", each with a cover of "₹10,000,000.00" and a term of "30 years".

## Verify the cheapest plan is called out
Verify "Cheapest" reads "Sundial Insurance at ₹5,865.00".

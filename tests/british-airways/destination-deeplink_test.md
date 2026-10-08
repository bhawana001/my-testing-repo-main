---
mode: testing
url: https://my-testing-repo-main.vercel.app/ba-clone-app/content/en/in/flights/england/london?reset=true
max_steps: 30
tags: [british-airways, airline, deep-link, search]
---

# Britannic Airways: Destination deep link pre-fills the search

Objective: open the London destination page directly and search from it.
Key assertion: the destination is pre-filled and the search lands on London results.

## Destination page
Verify the heading reads "Flights to London" and the "To" field already contains "London, Heathrow (LHR), United Kingdom".

## Search from the page
Type "Mumbai" into "From" and choose "Mumbai, Chhatrapati Shivaji Intl (BOM), India", select "One way" in "Trip type", set "Depart" to 2026-12-03, click "Find flights", and verify the results summary reads "Mumbai (BOM) → London (LHR)".

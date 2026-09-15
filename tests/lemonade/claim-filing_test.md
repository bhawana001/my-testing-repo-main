---
mode: testing
url: https://my-testing-repo-main.vercel.app/lemonade-clone-app/quote?reset=true
max_steps: 60
tags: [lemonade, insurance, claims]
---

# Limonade 26.3: Claim filing video flow

Catalog objective: file a claim describing an incident.
Key assertion: the claim is submitted with a claim id.

## Get a policy in place
Type "Priya" into "Your name", click "Next", click "Next", click "See my price", click "Buy this policy", type "4242 4242 4242 4242" into "Card number", click "Activate my policy", and verify the policy shows an "Active" badge.

## Describe the incident
Go to https://my-testing-repo-main.vercel.app/lemonade-clone-app/claims, select "Theft" in "Type of claim", leave "Roughly what is it worth" as "850", type "My bike was taken from the building's bike store overnight." into "Tell us in your own words", and click "Next".

## Record the statement
Verify the recorder reads "Ready to record", click "Record statement", and verify it now reads "Statement recorded".

## Submit and verify the claim id
Click "Submit the claim" and verify a green card titled "Claim submitted" shows "Claim id" of "CLM-48120", "Type" of "Theft", "Claimed" of "$850.00", "Deductible" of "$500.00", "Expected payout" of "$350.00" and a "Submitted" badge.

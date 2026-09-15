---
mode: testing
url: https://my-testing-repo-main.vercel.app/revolut-clone-app/split?reset=true
max_steps: 40
tags: [revolut, fintech, p2p]
---

# Revolat 19.3: Split bill

Catalog objective: split a transaction with a contact.
Key assertion: a request is created for half the amount.

## Open the split panel
Click the split button on the "Metro Grocer" transaction and verify a panel titled "Split Metro Grocer · $42.15" appears.

## Choose one contact
Tick "Tom Alvarez" and verify "Split between" reads "2 people (including you)".

## Verify the share is half
Verify "Each pays" reads "$21.07".

## Request the money
Click "Request money" and verify a green banner titled "Split requested" says "$21.07" was requested from "Tom Alvarez" for Metro Grocer, split 2 ways, and the transaction row now shows a badge reading "Split 2 ways · $21.07 each".

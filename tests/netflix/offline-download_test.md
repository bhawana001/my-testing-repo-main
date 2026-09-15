---
mode: testing
url: https://my-testing-repo-main.vercel.app/stream-clone-app/signup?reset=true
max_steps: 50
tags: [netflix, streaming, offline]
---

# StreamFlix 47.4: Offline download

Catalog objective: download an episode and verify it reaches a playable state.
Key assertion: the download completes and is listed on the device.

## Start a membership first
Choose "Standard — $15.49/month", type "priya@example.test" into "Email", type "4242 4242 4242 4242" into "Card number", and click "Start membership".

## Open downloads
Go to https://my-testing-repo-main.vercel.app/stream-clone-app/downloads and verify the page subtitle reads "Standard plan · 2 download devices".

## Download an episode
Click "Download" on "Brooklyn Nine-Nine · S1:E1 Pilot" and verify it moves into the on-device list.

## Verify the device list and the plan limit
Verify the "On this device (1/2)" card lists the Pilot episode with its size, and a remove control is offered for it.

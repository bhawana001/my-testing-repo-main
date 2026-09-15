---
mode: testing
url: https://my-testing-repo-main.vercel.app/slack-clone-app/huddle?reset=true
max_steps: 40
tags: [slack, work-collab, media]
---

# Slaick 35.4: Huddle start

Catalog objective: start a huddle in a channel.
Key assertion: the huddle active indicator is visible.

## Pick the channel
Select "#design" in the "Channel" dropdown and verify the dropdown now reads "#design".

## Start the huddle
Click "Start huddle" and verify a green banner reads "Huddle started in #design".

## Verify the active huddle card
Verify the page shows a card titled "Huddle in #design" with a "Huddle active" badge, "Channel" of "#design", "Started by" of "Priya Nair", "Participants" of 1 and "Microphone" of "Live".

## Verify the indicator follows you across the app
Verify the top bar shows the indicator "🎧 Huddle active in #design".

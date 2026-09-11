---
mode: testing
url: https://my-testing-repo-main.vercel.app/slack/huddle-start?reset=true
max_steps: 45
tags: [slack, work-collab, media]
---

# Slacky 35.4: Huddle start

Catalog objective: start a huddle in a channel.
Key assertion: the huddle active indicator is visible.

## Open the channel
Go to https://my-testing-repo-main.vercel.app/slack/huddle-start?reset=true and verify "# design" with a "🎧 Start huddle" button and no huddle indicator.

## Start the huddle
Click "🎧 Start huddle" and verify the huddle bar reads "Huddle active in #design" with Mute and Leave buttons.

## Verify indicators
Verify the channel header shows the badge "🎧 Huddle", the sidebar shows "🎧 Huddle in #design", and the huddle timer is counting up from 0:00.

---
mode: testing
url: https://my-testing-repo-main.vercel.app/stream-clone-app/profiles?reset=true
max_steps: 45
tags: [netflix, streaming, profiles]
---

# StreamFlix 47.3: PIN protected profile

Catalog objective: switch to a PIN protected profile.
Key assertion: the PIN gate is enforced and then the profile content loads.

## Switch to the protected profile
Click the switch button on the "Marco" profile and verify a card titled "Enter PIN for Marco" appears.

## Verify a wrong PIN is refused
Type "1111" into "Profile PIN", click "Unlock profile", and verify an error is shown and the profile content does not load.

## Enter the correct PIN
Replace the PIN with "4821" and click "Unlock profile".

## Verify the profile content loads
Verify a card titled "Watching as Marco" appears with "Active profile" of "Marco" and title tiles rendered beneath it.

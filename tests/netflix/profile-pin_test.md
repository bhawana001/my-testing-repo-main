---
mode: testing
url: https://my-testing-repo-main.vercel.app/netflix/profile-pin?reset=true
max_steps: 45
tags: [netflix, streaming, auth]
---

# Netflixy 47.3: Profile switch with PIN

Catalog objective: switch to a PIN-protected profile.
Key assertion: the PIN gate is enforced and the profile content loads.

## Pick the locked profile
Go to https://my-testing-repo-main.vercel.app/netflix/profile-pin?reset=true, verify "Who's watching?" with Demo, Kids and Priya 🔒, click "Priya", and verify "Profile Lock is on for Priya".

## Wrong PIN
Type "0000" into the PIN box, click "Unlock", and verify "Incorrect PIN. Try again."

## Correct PIN
Type "1234", click "Unlock", and verify "Profile: Priya".

## Verify profile content
Verify "Continue watching for Priya" lists "The Long Con", "Midnight Kitchen" and "Northern Line".

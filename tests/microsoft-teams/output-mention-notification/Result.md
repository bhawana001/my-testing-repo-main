---
test: ../mention-notification_test.md
status: passed
started: 2026-09-14T10:56:28.235Z
duration_s: 121
session_id: 5e08d727-1c41-404d-bb1b-bffea67cb6d4
---

# Teamz 36.2: Channel post with mention — Result

## Mention a teammate ✓ passed (26.1s)
md5: ce1fab8add9dfc4e979eb60bdc3c0c33
Go to https://my-testing-repo-main.vercel.app/microsoft-teams/mention-notification?reset=true, type "@pri" into "Start a post", and verify a mention picker suggests "Priya Nair".

## Pick and post ✓ passed (56s)
md5: 7825d3500b9e54b2d655fd22f2e63ee8
Click "Priya Nair" in the picker, then type "please review the release notes" at the end of the post, click "Post", and verify the post "@PriyaNair please review the release notes" appears in General.

## Check Priya's activity ✓ passed (36s)
md5: a3ea15da4b0a358bd5396627cfbce88d
Click "Priya" in the top bar and verify the Activity feed shows an unread badge "1" and the entry "Demo User mentioned you in General: @PriyaNair please review the release notes".

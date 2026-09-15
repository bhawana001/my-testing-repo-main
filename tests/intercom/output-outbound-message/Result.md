---
test: ../outbound-message_test.md
status: passed
started: 2026-09-14T10:47:28.813Z
duration_s: 144
session_id: c36aaeaf-82bd-4826-872a-4d0eaa4be74a
---

# Intercomm 31.4: Outbound message display — Result

## Non-matching page ✓ passed (30.3s)
md5: f2ade63acb14ae40cc84e74b898fe082
Go to https://my-testing-repo-main.vercel.app/intercom/outbound-message?reset=true and verify the simulated page is "/home", the visitor plan is "Free", "Matches current visitor" reads "No", and no "Upgrade to Pro" message is shown.

## Matching page ✓ passed (51.8s)
md5: 021086c6670075a9ca217763597403af
Click "/pricing" and verify "Matches current visitor" reads "Yes" and a message "Upgrade to Pro and save 20% 🎉" with a "See Pro plans" button appears in the bottom-right.

## Use the CTA ✓ passed (41.3s)
md5: d06ec66870eed1128c0c4476461206cd
Click "See Pro plans" and verify the message closes, the confirmation "You followed the message's CTA." appears, and the Pro plan card shows "20% discount applied: $23.20/mo".

---
test: ../version-history_test.md
status: failed
started: 2026-09-15T07:06:15.354Z
duration_s: 48
session_id: 0479b25d-90fd-408e-8809-103ef9ef2932
---

# Dropboxy 44.4: Version history restore — Result

## Open history ✓ passed (1s)
md5: 07f9ad77627b4d4dfac04f4dbf70e585
Go to https://my-testing-repo-main.vercel.app/dropbox/version-history?reset=true and verify the current content (v3) reads "Starter: $12/mo", "Pro: $35/mo", "Business: $120/mo" and versions v3, v2, v1 are listed.

## Preview v1 ✗ failed (44.9s)
md5: cc46ed791ca7a83806647c7a060649ca
Reason: AP produced no action for 3 consecutive steps — bug verdict: Agent stalled after successful preview verification [automation_bug/agent_misstep, confidence 0.98]
Click "Preview" on v1 and verify the preview shows "Starter: $9/mo".

## Restore v1 ⏭ skipped

## Verify the content reverted ⏭ skipped

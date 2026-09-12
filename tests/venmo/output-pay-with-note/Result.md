---
test: ../pay-with-note_test.md
status: passed
started: 2026-09-12T07:34:54.153Z
duration_s: 14658
session_id: f8c0c1cc-3167-4dd8-a04a-075f919c704e
---

# Venmoo 22.1: P2P payment with emoji note — Result

## Open pay ✓ passed (150.9s)
md5: be6468aa3668cb5269e530f0bd656234
Go to https://my-testing-repo-main.vercel.app/venmo/pay-with-note?reset=true and verify the Pay form with To "Tom Alvarez" and a Feed containing one entry "You paid Priya Nair" marked "Friends".

## Pay privately with an emoji note ✓ passed (168.6s)
md5: 308b48075fa0f2d43b5ae4ee4c6f14fb
Type "25" into Amount, "🍕 Pizza night" into "What's it for?", select "Private" in Privacy, click "Pay", and verify the message "You paid Tom Alvarez $25.00 · “🍕 Pizza night” · Private" appears.

## View as yourself ✓ passed (158.3s)
md5: 0fe2e40d6d1cd29410180bd20fb5cf30
Verify the feed note reads "Viewing as yourself (all entries) · 2 visible" and the "You paid Tom Alvarez" entry with "🍕 Pizza night" is listed.

## View as a friend ✓ passed (54.3s)
md5: d2b4bfb1626886b3d6630e36a2edb379
Click "As a friend" and verify the note reads "Viewing as a friend (Public + Friends) · 1 visible" and the "🍕 Pizza night" entry is not shown, while the "Concert tix" entry to Priya Nair is still shown.

---
test: ../file-coauthor_test.md
status: passed
started: 2026-09-14T10:58:47.964Z
duration_s: 127
session_id: e63be2b2-8166-4b9e-93f8-1698b0e5c0ad
---

# Teamz 36.3: File coauthor open — Result

## Open the doc ✓ passed (36.8s)
md5: 2aba6121463c54e3adb6dcd5633b34e4
Go to https://my-testing-repo-main.vercel.app/microsoft-teams/file-coauthor?reset=true, click "Open in Teamz" next to "Q3 plan.docx", and verify the editor shows "Q3 plan" with two plan lines and presence "Priya Nair is editing".

## Type a line ✓ passed (50s)
md5: 7086262099d6b50722e6d453cfd226e9
Type "3. Expand to two new regions" into the new-line box, click "Add line", and verify the line appears and the save badge reads "Saved".

## Verify persistence ✓ passed (37.9s)
md5: 644f6bbdce2c80bfff1a18fd2bf511b0
Reload the page without the reset parameter and verify the document still contains "3. Expand to two new regions" and still shows "Priya Nair is editing".

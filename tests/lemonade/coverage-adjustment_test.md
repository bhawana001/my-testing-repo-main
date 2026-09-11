---
mode: testing
url: https://my-testing-repo-main.vercel.app/lemonade/coverage-adjustment?reset=true
max_steps: 40
tags: [lemonade, insurance, wizard]
---

# Lemonaid 26.4: Coverage adjustment

Catalog objective: increase personal property coverage and verify the premium change.
Key assertion: the new premium reflects the change.

## Open coverage
Go to https://my-testing-repo-main.vercel.app/lemonade/coverage-adjustment?reset=true and verify Personal property is "$20,000.00", "Current premium" and "New premium" both read "$15.00/mo", and "Save changes" is disabled.

## Increase property coverage
Select "$50,000.00" for Personal property and verify "New premium" reads "$27.00/mo" and "Change" reads "+$12.00/mo".

## Save
Click "Save changes" and verify the message "Coverage updated. Your premium is now $27.00/month." and "Current premium" reads "$27.00/mo".

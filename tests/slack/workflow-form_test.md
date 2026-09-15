---
mode: testing
url: https://my-testing-repo-main.vercel.app/slack-clone-app/workflows?reset=true
max_steps: 40
tags: [slack, work-collab, automation]
---

# Slaick 35.5: Workflow form submission

Catalog objective: trigger a workflow form and submit it.
Key assertion: a confirmation message is posted to the channel.

## Trigger the workflow
Click "Start" on the "Time off request" workflow and verify a form titled "Time off request" appears with the fields "Dates", "Type" and "Who is covering".

## Fill the form
Type "Oct 2 to Oct 6" into "Dates", select "Vacation" in "Type", type "Tom Alvarez" into "Who is covering", and verify "Dates" reads "Oct 2 to Oct 6" and "Type" reads "Vacation".

## Submit it
Click "Submit" and verify a green banner titled "Confirmation posted" says the result was posted to "#general" and includes "Dates: Oct 2 to Oct 6 · Type: Vacation · Who is covering: Tom Alvarez".

## Verify the submission is recorded
Verify the "Submissions" card lists a row for "Time off request → #general" with the summary "Dates: Oct 2 to Oct 6 · Type: Vacation · Who is covering: Tom Alvarez".

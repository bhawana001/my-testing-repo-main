# PRD — Golden Oak Bank: Savings Onboarding & Tax Calculator

**Version:** 1.0
**Date:** 2026-08-27
**Owner:** Growth & Deposits
**Surface:** Web (`/bank-clone-app`), desktop Chrome first
**Base URL (test):** http://localhost:3000/bank-clone-app

---

## 1. Purpose

Prospective customers need to (a) compare our savings products and open an
account without visiting a branch, and (b) estimate their federal tax
refund so they can decide how much to deposit. This PRD covers the
**Open Account** flow and the **Federal Income Tax Calculator**.

## 2. Goals

- A first-time visitor can open a savings account in under 5 minutes.
- Rates and product terms are visible before any personal data is requested.
- The tax calculator returns a correct estimate that updates instantly as
  inputs change, with no page reload.

## 3. Non-goals

- Real KYC, credit checks, or money movement. This is a demo surface.
- Mobile-specific layouts, native apps, and localization.
- Saving or persisting applicant data between sessions.

---

## 4. Feature A — Savings account products

The Open Account page presents exactly three savings products. Every
product is fee-free and shows its annual percentage yield and minimum
opening deposit up front.

| Product | APY | Minimum opening deposit |
|---|---|---|
| High-Yield Savings | 4.34% | $0 |
| Everyday Savings | 3.10% | $0 |
| Money Market | 4.00% | $100 |

**High-Yield Savings is selected by default** when the page loads, since it
is our most popular account. Selecting a different product highlights it as
the chosen option.

### Acceptance criteria

- **AC-A1** — Visiting `/bank-clone-app/open-account` displays all three
  savings products: High-Yield Savings, Everyday Savings, and Money Market.
- **AC-A2** — The High-Yield Savings product advertises an APY of 4.34%.
- **AC-A3** — The Money Market product states a minimum opening deposit of
  $100.00, and both savings products state a minimum of $0.
- **AC-A4** — High-Yield Savings is the selected product on page load,
  without the user clicking anything.

---

## 5. Feature B — Four-step application flow

The application is a four-step wizard with a visible stepper:
**Account type → About you → Fund it → Review**. The primary button reads
"Continue →" on the first three steps and "Open account" on the final step.
A "← Back" control returns to the previous step from step two onward.

The stepper always shows which step is current; completed steps are marked
with a check.

### Acceptance criteria

- **AC-B1** — The stepper lists all four steps by name: Account type,
  About you, Fund it, and Review.
- **AC-B2** — With a product selected, clicking "Continue →" from the
  Account type step advances to the "About you" step.
- **AC-B3** — On the "About you" step, a "← Back" control is present and
  returns the user to the Account type step.
- **AC-B4** — The Account type step is the active step when the page first
  loads.

---

## 6. Feature C — Identity validation

Step two collects identity and contact details. We must not let an
applicant advance with incomplete or malformed data, because downstream
verification would reject it.

Validation runs when the user attempts to continue. Invalid fields show an
inline error message beneath the field, and the user stays on the step.

Rules:

- First name, last name, street address, city, and state are required.
- Email must be a well-formed address.
- Phone must contain at least 10 digits.
- SSN field takes exactly the last 4 digits.
- ZIP must be exactly 5 digits.

### Acceptance criteria

- **AC-C1** — Clicking "Continue →" on the "About you" step with every
  field left empty keeps the user on the "About you" step rather than
  advancing to "Fund it".
- **AC-C2** — Submitting the "About you" step with all fields empty
  displays inline validation errors on the required fields.
- **AC-C3** — Entering a malformed email such as `notanemail` and
  continuing shows the message "Enter a valid email".
- **AC-C4** — Entering a ZIP of fewer than 5 digits and continuing shows a
  ZIP validation error.

---

## 7. Feature D — Federal Income Tax Calculator

At `/bank-clone-app/calculators`, the calculator estimates a federal refund
or amount owed. It is a live calculation — results update as the user types,
with no submit button and no page reload.

The estimate panel shows, in order: Gross income, Deductions, Taxable
income, Tax liability, and Taxes withheld, followed by a total labelled
either "Estimated refund" or "Estimated amount you owe".

Behavior:

- Filing status selects the standard deduction: Single $14,600, Married
  filing jointly $29,200, Head of household $21,900.
- Gross income is the annual income the user entered, shown as currency.
- Taxable income is gross income minus the deduction, floored at zero.
- Choosing "Itemized" reveals an itemized deductions input.
- Amounts are displayed as whole-dollar US currency.

### Acceptance criteria

- **AC-D1** — Entering an annual income of 85000 makes the estimate panel
  show a Gross income of $85,000.
- **AC-D2** — With Single filing status and the standard deduction, the
  Deductions row shows $14,600.
- **AC-D3** — With an annual income of 85000, Single, and the standard
  deduction, the Taxable income row shows $70,400.
- **AC-D4** — The estimate updates without a page reload and without the
  user pressing any submit button.
- **AC-D5** — Selecting "Married filing jointly" changes the Deductions row
  to $29,200.
- **AC-D6** — Selecting the "Itemized" deduction type reveals an itemized
  deductions input field.

---

## 8. Feature E — Cross-page navigation

A persistent header lets a visitor move between the main areas of the site
without using the browser's back button.

### Acceptance criteria

- **AC-E1** — The bank header is present on both the Open Account page and
  the Calculators page.
- **AC-E2** — From the Calculators page, the header link to Open Account
  navigates to `/bank-clone-app/open-account`.

---

## 9. Out of scope for v1

Account funding via real ACH, document upload, joint applicants, and
e-signature capture.

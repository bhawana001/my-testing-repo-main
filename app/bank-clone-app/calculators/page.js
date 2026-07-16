"use client";

import { useMemo, useState } from "react";
import BankHeader from "../BankHeader";
import BankFooter from "../BankFooter";
import { demo } from "../demo";

const STANDARD_DEDUCTION = {
  single: 14600,
  married: 29200,
  head: 21900,
};

// Simplified 2024-style single-filer brackets (demo only).
const BRACKETS = {
  single: [
    [0, 0.1],
    [11600, 0.12],
    [47150, 0.22],
    [100525, 0.24],
    [191950, 0.32],
    [243725, 0.35],
    [609350, 0.37],
  ],
  married: [
    [0, 0.1],
    [23200, 0.12],
    [94300, 0.22],
    [201050, 0.24],
    [383900, 0.32],
    [487450, 0.35],
    [731200, 0.37],
  ],
  head: [
    [0, 0.1],
    [16550, 0.12],
    [63100, 0.22],
    [100500, 0.24],
    [191950, 0.32],
    [243700, 0.35],
    [609350, 0.37],
  ],
};

function taxFor(taxable, status) {
  const brackets = BRACKETS[status];
  let tax = 0;
  for (let i = 0; i < brackets.length; i++) {
    const [floor, rate] = brackets[i];
    const ceil = brackets[i + 1] ? brackets[i + 1][0] : Infinity;
    if (taxable > floor) {
      tax += (Math.min(taxable, ceil) - floor) * rate;
    } else {
      break;
    }
  }
  return tax;
}

const usd = (n) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

export default function CalculatorPage() {
  const [status, setStatus] = useState("single");
  const [income, setIncome] = useState(60000);
  const [deductionType, setDeductionType] = useState("standard");
  const [otherDeductions, setOtherDeductions] = useState(0);
  const [withheld, setWithheld] = useState(6000);
  const [credits, setCredits] = useState(0);

  const result = useMemo(() => {
    // Bug Diagnosis demo: the "$" is prepended BEFORE Number(), so gross
    // becomes NaN and the whole estimate reads "$NaN". A real, diagnosable
    // logic bug that Playwright reports only as a bare failure.
    const gross = demo.bug
      ? Number("$" + income)
      : Number(income) || 0;
    const deduction =
      deductionType === "standard"
        ? STANDARD_DEDUCTION[status]
        : Number(otherDeductions) || 0;
    const taxable = Math.max(0, gross - deduction);
    const liability = Math.max(0, taxFor(taxable, status) - (Number(credits) || 0));
    const balance = (Number(withheld) || 0) - liability;
    return { gross, deduction, taxable, liability, balance };
  }, [income, deductionType, otherDeductions, status, credits, withheld]);

  return (
    <>
      <BankHeader active="Calculators" />

      <main>
        <section
          className="b-section"
          style={{
            background:
              "linear-gradient(135deg, var(--b-cream), var(--b-cream-2))",
            paddingBottom: 30,
          }}
        >
          <div className="b-container">
            <span className="b-eyebrow">Calculators</span>
            <h1 style={{ fontSize: 38, marginTop: 6, letterSpacing: "-0.02em" }}>
              Federal Income Tax Calculator
            </h1>
            <p style={{ color: "var(--b-muted)", maxWidth: 560, marginTop: 8 }}>
              Estimate your tax refund or what you may owe. Enter a few details
              and the numbers update instantly.
            </p>
          </div>
        </section>

        <section className="b-section">
          <div className="b-container">
            <div className="b-calc">
              {/* Input panel */}
              <div className="b-calc__panel">
                <div className="b-calc__panel-head">
                  Federal Income Tax Calculator
                </div>
                <div className="b-calc__body">
                  <h3 style={{ fontSize: 16, marginBottom: 16 }}>
                    Personal Information
                  </h3>
                  <div className="b-field-row">
                    <div className="b-field">
                      <label htmlFor="status">Filing status</label>
                      <select
                        id="status"
                        className="b-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="single">Single</option>
                        <option value="married">Married filing jointly</option>
                        <option value="head">Head of household</option>
                      </select>
                    </div>
                    <div className="b-field">
                      <label htmlFor="income">Annual income</label>
                      <input
                        id="income"
                        className="b-input"
                        type="number"
                        min="0"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                      />
                      <small>Enter your annual earned income.</small>
                    </div>
                  </div>

                  <div className="b-divider" />

                  <h3 style={{ fontSize: 16, marginBottom: 12 }}>Deductions</h3>
                  <div className="b-field">
                    <label>Deduction type</label>
                    <div className="b-radio-row">
                      <label className="b-radio">
                        <input
                          type="radio"
                          name="deduction"
                          checked={deductionType === "standard"}
                          onChange={() => setDeductionType("standard")}
                        />
                        Standard ({usd(STANDARD_DEDUCTION[status])})
                      </label>
                      <label className="b-radio">
                        <input
                          type="radio"
                          name="deduction"
                          checked={deductionType === "itemized"}
                          onChange={() => setDeductionType("itemized")}
                        />
                        Itemized
                      </label>
                    </div>
                  </div>

                  {deductionType === "itemized" && (
                    <div className="b-field">
                      <label htmlFor="other">Itemized deductions</label>
                      <input
                        id="other"
                        className="b-input"
                        type="number"
                        min="0"
                        value={otherDeductions}
                        onChange={(e) => setOtherDeductions(e.target.value)}
                      />
                    </div>
                  )}

                  <div className="b-divider" />

                  <h3 style={{ fontSize: 16, marginBottom: 12 }}>
                    Withholdings &amp; Credits
                  </h3>
                  <div className="b-field-row">
                    <div className="b-field">
                      <label htmlFor="withheld">Taxes withheld</label>
                      <input
                        id="withheld"
                        className="b-input"
                        type="number"
                        min="0"
                        value={withheld}
                        onChange={(e) => setWithheld(e.target.value)}
                      />
                      <small>Withheld from your paycheck.</small>
                    </div>
                    <div className="b-field">
                      <label htmlFor="credits">Tax credits</label>
                      <input
                        id="credits"
                        className="b-input"
                        type="number"
                        min="0"
                        value={credits}
                        onChange={(e) => setCredits(e.target.value)}
                      />
                      <small>Credits reduce the tax you owe.</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Result panel */}
              <div className="b-result">
                <h3>Your estimate</h3>
                <p style={{ color: "var(--b-muted)", fontSize: 13, margin: "0 0 12px" }}>
                  Based on the information you provided.
                </p>
                <div className="b-result__row">
                  <span>Gross income</span>
                  <b>{usd(result.gross)}</b>
                </div>
                <div className="b-result__row">
                  <span>Deductions</span>
                  <b>−{usd(result.deduction)}</b>
                </div>
                <div className="b-result__row">
                  <span>Taxable income</span>
                  <b>{usd(result.taxable)}</b>
                </div>
                <div className="b-result__row">
                  <span>Tax liability</span>
                  <b>{usd(result.liability)}</b>
                </div>
                <div className="b-result__row">
                  <span>Taxes withheld</span>
                  <b>{usd(Number(withheld) || 0)}</b>
                </div>

                <div className="b-result__total">
                  <span style={{ fontWeight: 700 }}>
                    {result.balance >= 0
                      ? "Estimated refund"
                      : "Estimated amount you owe"}
                  </span>
                  <span className="amount">{usd(Math.abs(result.balance))}</span>
                </div>

                <p className="b-note">
                  This calculator provides a federal estimate for demo purposes
                  only and is not tax advice.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <BankFooter />
    </>
  );
}

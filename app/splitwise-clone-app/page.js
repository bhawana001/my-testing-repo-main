"use client";
// Group page: add people, add an expense split equally between the people
// ticked, and read the Balances panel for who owes whom.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Banner, Field, Input, Select, Check, Empty, Badge } from "../clones/kit/ui";
import { BRAND, BASE, useStore, money, settlements, shares, validateExpense } from "./shared";

export default function GroupPage() {
  const [s, update] = useStore();
  const [person, setPerson] = useState("");
  const [personErr, setPersonErr] = useState("");
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  // Track who is unticked, so everyone (including people loaded after a reload) starts ticked.
  const [excluded, setExcluded] = useState([]);
  const [errs, setErrs] = useState({});
  const [added, setAdded] = useState(null);

  const nameOf = (id) => s.people.find((p) => p.id === id)?.name || id;
  // Fall back to the first person so the payer select is never blank.
  const payer = s.people.some((p) => p.id === paidBy) ? paidBy : s.people[0]?.id || "";
  const owes = settlements(s.people, s.expenses);

  function addPerson() {
    const name = person.trim();
    if (!name) { setPersonErr("Enter a name."); return; }
    if (s.people.some((p) => p.name.toLowerCase() === name.toLowerCase())) {
      setPersonErr(`${name} is already in this group.`); return;
    }
    setPersonErr("");
    const id = "u" + (s.counter + 1);
    update((st) => {
      st.people.push({ id, name });
      st.counter += 1;
      return st;
    });
    setPerson("");
  }

  function toggle(id) {
    setExcluded((x) => (x.includes(id) ? x.filter((y) => y !== id) : [...x, id]));
  }

  function addExpense() {
    const split = s.people.map((p) => p.id).filter((id) => !excluded.includes(id));
    const errors = validateExpense({ description: desc, amount, payer, splitWith: split });
    setErrs(errors);
    if (Object.keys(errors).length) { setAdded(null); return; }
    const id = "e" + (s.counter + 1);
    const expense = { id, description: desc.trim(), amount: +Number(amount).toFixed(2), paidBy: payer, splitWith: split };
    update((st) => {
      st.expenses.unshift(expense);
      st.counter += 1;
      return st;
    });
    setAdded(expense);
    setDesc(""); setAmount("");
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} right={
        s.auth?.email ? (
          <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Badge tone="ok" testId="signed-in-as">Signed in as {s.auth.email}</Badge>
            <Btn size="sm" variant="secondary" data-testid="sign-out"
                 onClick={() => update((st) => { st.auth = { email: null, pending: null }; return st; })}>Sign out</Btn>
          </span>
        ) : (
          <Btn size="sm" variant="secondary" as="link" href={`${BASE}/login`} data-testid="header-signin">Sign in</Btn>
        )
      } />
      <Page title={s.group.name} sub={`${s.people.length} people · ${s.expenses.length} expenses`}>
        {added && (
          <Banner tone="ok" title="Expense added" testId="expense-added" onClose={() => setAdded(null)}>
            <strong>{added.description}</strong> · {money(added.amount)} paid by {nameOf(added.paidBy)}, split
            between {added.splitWith.map(nameOf).join(", ")}
          </Banner>
        )}

        <div className="ck-split">
          <div>
            <Card title="People" testId="people-card">
              {s.people.length === 0 ? <Empty>No one in this group yet.</Empty> : (
                <ul className="ck-list" data-testid="people-list">
                  {s.people.map((p) => <li key={p.id} data-testid={`person-${p.id}`}>{p.name}</li>)}
                </ul>
              )}
              <Field label="Name" error={personErr}>
                <Input value={person} onChange={(e) => setPerson(e.target.value)} aria-label="Name"
                       data-testid="person-name" onKeyDown={(e) => e.key === "Enter" && addPerson()} />
              </Field>
              <Btn onClick={addPerson} data-testid="add-person">Add person</Btn>
            </Card>

            <Card title="Add an expense" testId="expense-card">
              <Field label="Description" error={errs.description}>
                <Input value={desc} onChange={(e) => setDesc(e.target.value)} aria-label="Description" data-testid="expense-description"
                       aria-invalid={!!errs.description} />
              </Field>
              <Field label="Amount ($)" error={errs.amount}>
                <Input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal"
                       aria-label="Amount" data-testid="expense-amount" aria-invalid={!!errs.amount} />
              </Field>
              <Field label="Paid by" error={errs.paidBy}>
                <Select value={payer} onChange={(e) => setPaidBy(e.target.value)} aria-label="Paid by" data-testid="expense-paid-by">
                  {s.people.length === 0 && <option value="">No people yet</option>}
                  {s.people.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </Select>
              </Field>
              <div className="ck-strong" style={{ marginBottom: 6 }}>Split equally between</div>
              {s.people.length === 0 ? <Empty>Add people to split with.</Empty> : s.people.map((p) => (
                <Check key={p.id} label={p.name} testId={`split-${p.id}`}
                       checked={!excluded.includes(p.id)} onChange={() => toggle(p.id)} />
              ))}
              {errs.split && <div className="ck-field-error" role="alert" data-testid="split-error">{errs.split}</div>}
              <Btn block onClick={addExpense} data-testid="add-expense">Add expense</Btn>
            </Card>

            <Card title="Expenses" testId="expense-list">
              {s.expenses.length === 0 ? <Empty>No expenses yet.</Empty> : s.expenses.map((e) => (
                <div key={e.id} className="sw-expense" data-testid={`expense-${e.id}`}>
                  <Row label={e.description} value={money(e.amount)} strong />
                  <div className="ck-muted">
                    {nameOf(e.paidBy)} paid · split between{" "}
                    {Object.entries(shares(e.amount, e.splitWith)).map(([id, c]) => `${nameOf(id)} ${money(c / 100)}`).join(", ")}
                  </div>
                </div>
              ))}
            </Card>
          </div>

          <Card title="Balances" testId="balances-panel" className="sw-balances">
            {owes.length === 0 ? <Empty>Everyone is settled up.</Empty> : (
              <ul className="ck-list">
                {owes.map((o, i) => (
                  <li key={`${o.from}-${o.to}`} className="sw-balance-line" data-testid={`balance-${i}`}>
                    {o.from} owes {o.to} {money(o.amount)}
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </Page>
    </Shell>
  );
}

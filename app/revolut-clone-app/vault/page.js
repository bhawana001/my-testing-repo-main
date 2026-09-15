"use client";
// Savings vault with round-ups (19.4). Turning the rule on makes it active, and
// each card purchase then rounds up into the vault by the chosen multiplier.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Radio, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, ROUNDUP_MULTIPLIERS, useStore, fmt, roundUpFor } from "../shared";

export default function VaultPage() {
  const [s, update] = useStore();
  const [notice, setNotice] = useState(null);

  const v = s.vault;

  function toggle() {
    const next = !v.enabled;
    update((st) => { st.vault.enabled = next; return st; });
    setNotice(next ? "Round-up rule is now active." : "Round-up rule turned off.");
  }
  function setMultiplier(m) {
    update((st) => { st.vault.multiplier = m; return st; });
    setNotice(`Round-ups will now be ${m}×.`);
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Accounts" }, { href: `${BASE}/card`, label: "Card" }]} />
      <Page title="Vaults">
        {notice && <Banner tone="ok" testId="vault-notice" onClose={() => setNotice(null)}>{notice}</Banner>}

        <Card title={v.name} testId="vault-card">
          <div style={{ fontSize: 30, fontWeight: 700 }} data-testid="vault-balance">{fmt(v.balance, "USD")}</div>
          <Badge tone={v.enabled ? "ok" : "neutral"} testId="rule-state">
            {v.enabled ? "Round-up rule active" : "Round-up rule off"}
          </Badge>
          <Btn block style={{ marginTop: 10 }} onClick={toggle} data-testid="toggle-roundup">
            {v.enabled ? "Turn off round-ups" : "Turn on round-ups"}
          </Btn>
        </Card>

        <Card title="Round-up multiplier" testId="multiplier-panel">
          {ROUNDUP_MULTIPLIERS.map((m) => (
            <Radio key={m} name="mult" label={`${m}× round-up`}
                   detail={`A ${fmt(24.6, "USD")} purchase would add ${fmt(roundUpFor(24.6, m), "USD")}`}
                   testId={`multiplier-${m}`} checked={v.multiplier === m} onChange={() => setMultiplier(m)} />
          ))}
          <Row label="Current multiplier" value={`${v.multiplier}×`} strong testId="current-multiplier" />
        </Card>

        <Card title={`Round-ups (${v.roundups.length})`} testId="roundup-history">
          {v.roundups.length === 0 ? (
            <Empty>No round-ups yet. Make a card purchase with the rule active.</Empty>
          ) : v.roundups.map((r, i) => (
            <Row key={i} label={`${r.from} · ${r.at}`} value={fmt(r.amount, "USD")} testId={`roundup-${i}`} />
          ))}
          <Btn as="link" href={`${BASE}/card`} variant="secondary" data-testid="go-simulate">
            Simulate a purchase to feed the vault
          </Btn>
        </Card>
      </Page>
    </Shell>
  );
}

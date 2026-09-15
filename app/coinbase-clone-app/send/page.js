"use client";
// Send to an address (18.3). The address is validated against the network's
// real shape, a wrong-network address is caught, and irreversibility is warned
// about before the send can go through.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Field, Input, Select, Check, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, ASSETS, ADDRESS_RULES, findAsset, useStore, money } from "../shared";

export default function SendPage() {
  const [s, update] = useStore();
  const [asset, setAsset] = useState("ETH");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [ack, setAck] = useState(false);
  const [err, setErr] = useState("");
  const [sent, setSent] = useState(null);

  const rule = ADDRESS_RULES[asset];
  const trimmed = address.trim();
  const valid = trimmed ? rule.re.test(trimmed) : null;
  // A 0x address pasted while sending BTC is the classic wrong-network mistake.
  const wrongNetwork = trimmed && !valid && Object.entries(ADDRESS_RULES)
    .find(([id, r]) => id !== asset && r.re.test(trimmed));
  const held = s.holdings[asset] || 0;
  const amt = Number(amount) || 0;

  function send() {
    if (!valid) { setErr("Enter a valid address for this network."); return; }
    if (!amt || amt <= 0) { setErr("Enter an amount above zero."); return; }
    if (amt > held) { setErr(`You only hold ${held} ${asset}.`); return; }
    if (!ack) { setErr("Confirm you understand this transfer cannot be reversed."); return; }
    setErr("");
    update((st) => {
      st.holdings[asset] = +(st.holdings[asset] - amt).toFixed(findAsset(asset).decimals);
      st.transactions.unshift({ id: "TX-" + (st.counter + 1), type: "send", asset, units: amt,
                                to: trimmed, at: "2026-09-15" });
      st.counter += 1;
      return st;
    });
    setSent({ asset, amt, to: trimmed });
    setAmount(""); setAddress(""); setAck(false);
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Portfolio" }, { href: `${BASE}/buy`, label: "Buy" }]} />
      <Page title="Send crypto">
        {sent && (
          <Banner tone="ok" title="Send submitted" testId="send-complete">
            Sent <strong data-testid="sent-units">{sent.amt} {sent.asset}</strong> to{" "}
            <span data-testid="sent-address">{sent.to.slice(0, 10)}…{sent.to.slice(-6)}</span>.
          </Banner>
        )}

        <Card title="Transfer">
          <Field label="Asset">
            <Select value={asset} onChange={(e) => { setAsset(e.target.value); setErr(""); }}
                    aria-label="Asset" data-testid="send-asset">
              {ASSETS.map((a) => <option key={a.id} value={a.id}>{a.id} — you hold {s.holdings[a.id] || 0}</option>)}
            </Select>
          </Field>

          <Field label="Recipient address" error={err} hint={rule.hint}>
            <Input value={address} onChange={(e) => setAddress(e.target.value)}
                   aria-label="Recipient address" data-testid="send-address" />
          </Field>

          {trimmed && valid && <Badge tone="ok" testId="address-valid">Valid {asset} address</Badge>}
          {trimmed && !valid && !wrongNetwork && (
            <Badge tone="bad" testId="address-invalid">Not a valid {asset} address — {rule.hint}</Badge>
          )}
          {wrongNetwork && (
            <Banner tone="bad" title="Wrong network" testId="wrong-network">
              That looks like a <strong>{wrongNetwork[0]}</strong> address. Sending {asset} to it would lose the funds.
            </Banner>
          )}

          <Field label={`Amount in ${asset}`}>
            <Input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal"
                   aria-label={`Amount in ${asset}`} data-testid="send-amount" />
          </Field>
          <Row label="Available" value={`${held} ${asset}`} testId="available" />

          <Banner tone="warn" title="Double-check the address" testId="irreversible-warning">
            Crypto transfers cannot be reversed. If the address is wrong the funds are gone.
          </Banner>
          <Check checked={ack} onChange={(e) => setAck(e.target.checked)}
                 label="I understand this transfer is irreversible" testId="ack-irreversible" />

          <Btn block disabled={!valid} onClick={send} data-testid="submit-send">Send {asset}</Btn>
        </Card>

        <Card title="Recent transfers" testId="transfers">
          {s.transactions.filter((t) => t.type === "send").length === 0
            ? <Empty>No sends yet.</Empty>
            : s.transactions.filter((t) => t.type === "send").map((t) => (
                <Row key={t.id} label={`${t.units} ${t.asset} → ${t.to.slice(0, 8)}…`} value={t.at} testId={`send-${t.id}`} />
              ))}
        </Card>
      </Page>
    </Shell>
  );
}

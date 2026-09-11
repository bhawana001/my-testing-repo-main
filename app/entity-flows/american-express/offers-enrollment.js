"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { BankShell } from "@/app/components/engines/BankShell";
import { Card, Btn, Badge } from "@/app/components/eval/ui";

const OFFERS = [
  { id: "o1", merchant: "Bloom & Co. Flowers", deal: "Spend $50 or more, get $10 back", expires: "Oct 31, 2026", emoji: "💐" },
  { id: "o2", merchant: "Trailhead Outfitters", deal: "Get 10% back on purchases, up to $30", expires: "Nov 15, 2026", emoji: "🎒" },
  { id: "o3", merchant: "Bean There Coffee", deal: "Spend $20, get $5 back", expires: "Sep 30, 2026", emoji: "☕" },
  { id: "o4", merchant: "Northwind Travel", deal: "Spend $500, get $75 back", expires: "Dec 31, 2026", emoji: "✈️" },
];
const seed = () => ({ added: [] });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const add = (id) => set({ added: s.added.includes(id) ? s.added : [...s.added, id] });
  return (
    <BankShell entity={ent} nav={["Account", "Rewards", "Offers", "Statements"]} active="Offers" title="Offers for you" sub="Add an offer to your Card, then use the Card at the merchant to earn.">
      <div className="ee-row ee-small ee-muted" style={{ marginBottom: 10 }} data-testid="added-count">{s.added.length} offer{s.added.length === 1 ? "" : "s"} added to Card</div>
      <div className="ee-grid ee-grid--2" data-testid="offers">
        {OFFERS.map((o) => {
          const added = s.added.includes(o.id);
          return (
            <Card key={o.id} tight data-testid={`offer-${o.id}`}>
              <div className="ee-row" style={{ alignItems: "flex-start" }}>
                <div className="ee-product__img ee-product__img--sm" aria-hidden="true">{o.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div className="ee-strong">{o.merchant}</div>
                  <div className="ee-small">{o.deal}</div>
                  <div className="ee-tiny ee-muted">Expires {o.expires}</div>
                </div>
                {added ? <Badge tone="ok" data-testid={`offer-${o.id}-added`}>✓ Added to Card</Badge> : <Btn size="sm" onClick={() => add(o.id)} data-testid={`offer-${o.id}-add`}>Add to Card</Btn>}
              </div>
            </Card>
          );
        })}
      </div>
    </BankShell>
  );
}

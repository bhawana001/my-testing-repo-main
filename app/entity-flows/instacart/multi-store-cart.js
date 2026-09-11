"use client";
import StoreCheckout from "@/app/components/engines/Store";
import { Card, RadioCard } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const STORES = {
  "Green Grocer": { slots: [{ id: "gg-1", label: "Today 2pm–4pm", fee: 3.99 }, { id: "gg-2", label: "Today 6pm–8pm", fee: 3.99 }, { id: "gg-3", label: "Tomorrow 9am–11am", fee: 1.99 }] },
  "Corner Pharmacy": { slots: [{ id: "cp-1", label: "Today 5pm–7pm", fee: 4.99 }, { id: "cp-2", label: "Tomorrow 10am–12pm", fee: 2.99 }] },
};
const CONFIG = {
  nav: ["Stores", "Orders"], active: "Stores", light: true,
  title: "Your carts", showSeller: true,
  seedCart: [
    { id: "p-milk-1", name: "Organic Whole Milk 1L", price: 3.49, qty: 1, emoji: "🥛", seller: "Green Grocer" },
    { id: "p-banana-1", name: "Bananas (bunch)", price: 1.29, qty: 2, emoji: "🍌", seller: "Green Grocer" },
    { id: "p-vit", name: "Vitamin D3 1000 IU (90)", price: 9.5, qty: 1, emoji: "💊", seller: "Corner Pharmacy" },
  ],
  seedExtra: { slotBy: {} },
  taxRate: 0, orderPrefix: "IC", primaryStyle: { background: "#0aad0a", color: "#fff", borderRadius: 999 },
  payment: { methods: ["card"], allow3ds: false },
  labels: { shipping: "Delivery" },
  fees: (s) => Object.entries(s.extra.slotBy || {}).map(([store, id]) => { const sl = STORES[store].slots.find((x) => x.id === id); return { label: `${store} delivery`, amount: sl ? sl.fee : 0 }; }),
  validateDelivery: (s) => (Object.keys(STORES).every((st) => s.extra.slotBy?.[st]) ? null : { _slots: "Pick a slot for every store." }),
  extras: {
    delivery: ({ s, set }, errs) => (
      <div className="ee-stack" data-testid="store-slots">
        {Object.entries(STORES).map(([store, cfg]) => (
          <Card key={store} title={`${store} · delivery window`} data-testid={`slots-${store.replace(/\s+/g, "-").toLowerCase()}`}>
            <div className="ee-stack" role="radiogroup" aria-label={`${store} delivery window`}>
              {cfg.slots.map((sl) => (
                <RadioCard key={sl.id} name={store} value={sl.id} checked={s.extra.slotBy?.[store] === sl.id} onChange={(v) => set({ ...s, extra: { ...s.extra, slotBy: { ...s.extra.slotBy, [store]: v } } })} title={sl.label} right={`+${money(sl.fee)}`} />
              ))}
            </div>
          </Card>
        ))}
        {errs._slots && <div className="ee-error" role="alert">{errs._slots}</div>}
      </div>
    ),
    summaryRows: ({ s }) => Object.entries(s.extra.slotBy || {}).map(([store, id]) => ({ k: `${store} slot`, v: STORES[store].slots.find((x) => x.id === id)?.label, testId: `summary-slot-${store.replace(/\s+/g, "-").toLowerCase()}` })),
    confirmRows: (order) => Object.entries(order.extra.slotBy || {}).map(([store, id]) => { const sl = STORES[store].slots.find((x) => x.id === id); return { k: `${store}`, v: `${sl.label} · fee ${money(sl.fee)}`, testId: `confirm-slot-${store.replace(/\s+/g, "-").toLowerCase()}` }; }),
  },
};
export default function Flow({ flow }) {
  return <StoreCheckout flow={flow} config={CONFIG} />;
}

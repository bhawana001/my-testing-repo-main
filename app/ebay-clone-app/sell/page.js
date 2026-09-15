"use client";
// Seller listing creation (6.4). A published listing joins the same catalog
// buyers browse, so "live and searchable by title" is literally true.
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shell, TopBar, Page, Card, Btn, Field, Input, Select, Textarea, Badge, Banner, Row, Check } from "../../clones/kit/ui";
import { BRAND, BASE, CONDITIONS, useStore, money } from "../shared";

const PHOTOS = ["front.jpg", "back.jpg", "detail.jpg", "box.jpg"];
const EMOJIS = ["📦", "📷", "⌚", "🎧", "🔭", "🛹", "💻", "🎸"];

export default function SellPage() {
  const [s, update] = useStore();
  const [title, setTitle] = useState("");
  const [condition, setCondition] = useState(CONDITIONS[0]);
  const [format, setFormat] = useState("bin");
  const [price, setPrice] = useState("");
  const [shipping, setShipping] = useState("0");
  const [emoji, setEmoji] = useState(EMOJIS[0]);
  const [photos, setPhotos] = useState([]);
  const [bestOffer, setBestOffer] = useState(true);
  const [desc, setDesc] = useState("");
  const [errors, setErrors] = useState({});
  const [published, setPublished] = useState(null);
  const router = useRouter();

  function publish() {
    const e = {};
    if (!title.trim()) e.title = "Give your listing a title.";
    if (!price || Number(price) <= 0) e.price = "Enter a price above zero.";
    if (photos.length === 0) e.photos = "Add at least one photo.";
    setErrors(e);
    if (Object.keys(e).length) return;

    const id = "lst_u" + (s.listings.length + 1);
    const listing = {
      id, title: title.trim(), emoji, condition, seller: "priya_n",
      shipping: Number(shipping) || 0, watchers: 0, photos, description: desc,
      ...(format === "auction"
        ? { format: "auction", currentBid: Number(price), bidIncrement: 2.5, bidCount: 0, highBidder: "—", endsIn: "7d 00h" }
        : { format: "bin", price: Number(price), bestOffer }),
    };
    update((st) => { st.listings.unshift(listing); return st; });
    setPublished(listing);
  }

  if (published) {
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} nav={[{ href: BASE, label: "Browse" }, { href: `${BASE}/activity`, label: "My eBid" }]} />
        <Page>
          <Banner tone="ok" title="Your listing is live" testId="listing-published">
            <strong data-testid="published-title">{published.title}</strong> is now live and searchable.
          </Banner>
          <Card title="Listing summary" testId="published-summary">
            <Row label="Listing ID" value={published.id} testId="published-id" />
            <Row label="Format" value={published.format === "auction" ? "Auction" : "Buy It Now"} testId="published-format" />
            <Row label={published.format === "auction" ? "Starting bid" : "Price"}
                 value={money(published.format === "auction" ? published.currentBid : published.price)} testId="published-price" />
            <Row label="Condition" value={published.condition} testId="published-condition" />
            <Row label="Photos" value={`${published.photos.length} uploaded`} testId="published-photos" />
            <Row label="Shipping" value={published.shipping === 0 ? "Free" : money(published.shipping)} />
          </Card>
          <Btn onClick={() => router.push(BASE)} data-testid="view-in-search">View it in listings</Btn>
        </Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Browse" }, { href: `${BASE}/activity`, label: "My eBid" }]} />
      <Page title="Create a listing" sub="Photos, condition and price — then publish">
        <div className="ck-split">
          <Card title="Item details">
            <Field label="Listing title" error={errors.title}>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} aria-label="Listing title"
                     placeholder="e.g. Vintage Film Camera 35mm" data-testid="listing-title" />
            </Field>
            <Field label="Condition">
              <Select value={condition} onChange={(e) => setCondition(e.target.value)} aria-label="Condition" data-testid="listing-condition">
                {CONDITIONS.map((c) => <option key={c}>{c}</option>)}
              </Select>
            </Field>
            <Field label="Photos" error={errors.photos} hint="Listings with 3+ photos sell faster">
              <div data-testid="photo-picker">
                {PHOTOS.map((p) => (
                  <Check key={p} label={p} testId={`photo-${p.replace(".jpg", "")}`}
                         checked={photos.includes(p)}
                         onChange={(e) => setPhotos((v) => e.target.checked ? [...v, p] : v.filter((x) => x !== p))} />
                ))}
              </div>
            </Field>
            <Field label="Thumbnail">
              <Select value={emoji} onChange={(e) => setEmoji(e.target.value)} aria-label="Thumbnail" data-testid="listing-emoji">
                {EMOJIS.map((x) => <option key={x}>{x}</option>)}
              </Select>
            </Field>
            <Field label="Description">
              <Textarea value={desc} onChange={(e) => setDesc(e.target.value)} aria-label="Description" data-testid="listing-description" />
            </Field>
          </Card>

          <Card title="Pricing">
            <Field label="Format">
              <Select value={format} onChange={(e) => setFormat(e.target.value)} aria-label="Format" data-testid="listing-format">
                <option value="bin">Buy It Now</option>
                <option value="auction">Auction — 7 days</option>
              </Select>
            </Field>
            <Field label={format === "auction" ? "Starting bid" : "Price"} error={errors.price}>
              <Input value={price} onChange={(e) => setPrice(e.target.value)} inputMode="decimal"
                     aria-label="Price" data-testid="listing-price" />
            </Field>
            <Field label="Shipping cost" hint="Enter 0 for free shipping">
              <Input value={shipping} onChange={(e) => setShipping(e.target.value)} inputMode="decimal"
                     aria-label="Shipping cost" data-testid="listing-shipping" />
            </Field>
            {format === "bin" && (
              <Check label="Accept Best Offers" detail="Buyers can negotiate below your price"
                     checked={bestOffer} onChange={(e) => setBestOffer(e.target.checked)} testId="listing-bestoffer" />
            )}
            <Badge tone="info">Seller: priya_n</Badge>
            <Btn block style={{ marginTop: 12 }} onClick={publish} data-testid="publish-listing">Publish listing</Btn>
          </Card>
        </div>
      </Page>
    </Shell>
  );
}

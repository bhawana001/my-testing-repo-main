import Link from "next/link";
import { notFound } from "next/navigation";
import TrvHeader from "../../TrvHeader";
import TrvFooter from "../../TrvFooter";
import { BASE, inr } from "../../lib";
import { getListing } from "../../data";

export default async function RoomDetail({ params }) {
  const { id } = await params;
  const l = getListing(id);
  if (!l) return notFound();

  return (
    <>
      <TrvHeader showSearch={false} />
      <div className="trv-container trv-detail">
        <h1>{l.title}</h1>
        <div className="trv-gallery">
          <div>{l.emoji}</div>
          <div>🛏️</div>
          <div>🚿</div>
          <div>🌇</div>
          <div>🍽️</div>
        </div>

        <div className="trv-detail__grid">
          <div>
            <div className="trv-detail__sub">
              <h3 style={{ fontSize: 20 }}>
                {l.type} in {l.city}, India
              </h3>
              <p>
                {l.beds} bed{l.beds > 1 ? "s" : ""} · {l.baths} bath
                {l.baths > 1 ? "s" : ""} · ★ {l.rating} ({l.reviews} reviews)
              </p>
              {l.host && <p>Hosted by {l.host}</p>}
            </div>
            <div className="trv-feature">
              <span>📶</span>
              <div>
                <b>Wifi</b>
                <div style={{ color: "var(--trv-muted)" }}>Fast wifi throughout the stay</div>
              </div>
            </div>
            <div className="trv-feature">
              <span>🧘</span>
              <div>
                <b>Shared common spaces</b>
                <div style={{ color: "var(--trv-muted)" }}>Yoga space and rooftop with river views</div>
              </div>
            </div>
            <p style={{ marginTop: 16, color: "var(--trv-muted)" }}>
              A blissful stay with a view of the gurgling Ganges from the rooftop. A brisk walk
              from the iconic Lakshman Jhula, with vibrant common areas to soothe your mind and
              soul.
            </p>
          </div>

          <div>
            <div className="trv-booking">
              <div className="trv-booking__price">
                {inr(l.price)} <span style={{ fontWeight: 400, fontSize: 15 }}>for 2 nights</span>
              </div>
              <div className="trv-booking__box">
                <div className="r">
                  <div className="trv-booking__field">
                    <small>Check-in</small>
                    <input defaultValue="8/21/2026" readOnly />
                  </div>
                  <div className="trv-booking__field">
                    <small>Checkout</small>
                    <input defaultValue="8/23/2026" readOnly />
                  </div>
                </div>
                <div className="trv-booking__field" style={{ borderTop: "1px solid var(--trv-border)" }}>
                  <small>Guests</small>
                  <input defaultValue="1 guest" readOnly />
                </div>
              </div>
              <Link href={`${BASE}/book/${l.id}`} className="trv-btn" style={{ display: "block", textAlign: "center" }}>
                Reserve
              </Link>
              <div className="trv-note">You won&apos;t be charged yet</div>
            </div>
          </div>
        </div>
      </div>
      <TrvFooter />
    </>
  );
}

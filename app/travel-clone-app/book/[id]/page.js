import Link from "next/link";
import { notFound } from "next/navigation";
import TrvHeader from "../../TrvHeader";
import { BASE, inr } from "../../lib";
import { getListing } from "../../data";

export default async function ConfirmPay({ params }) {
  const { id } = await params;
  const l = getListing(id);
  if (!l) return notFound();

  const nights = 2;
  const subtotal = l.price;
  const discount = Math.round(subtotal * 0.2);
  const taxes = Math.round((subtotal - discount) * 0.05);
  const total = subtotal - discount + taxes;

  return (
    <>
      <TrvHeader showSearch={false} />
      <div className="trv-container">
        <div className="trv-pay">
          <div>
            <h1>← Confirm and pay</h1>
            <h3 style={{ fontSize: 20, marginBottom: 6 }}>Proceed to payment</h3>
            <p style={{ color: "var(--trv-muted)", marginBottom: 20 }}>
              You&apos;ll be directed to StayPay to complete payment.
            </p>
            <p style={{ fontSize: 13, color: "var(--trv-muted)", marginBottom: 20 }}>
              By selecting the button, I agree to the booking terms and updated Terms of Service.
            </p>
            <Link
              href={`${BASE}/pay/${l.id}`}
              className="trv-btn trv-btn--dark"
              style={{ display: "block", textAlign: "center", maxWidth: 460 }}
            >
              Continue to StayPay
            </Link>
          </div>

          <div className="trv-summary">
            <div className="trv-summary__head">
              <div className="trv-summary__img">{l.emoji}</div>
              <div>
                <b>{l.title}</b>
                <div style={{ color: "var(--trv-muted)", fontSize: 13 }}>
                  {l.type} · ★ {l.rating}
                </div>
              </div>
            </div>
            <div style={{ padding: "16px 0", borderBottom: "1px solid #ebebeb" }}>
              <b>Free cancellation</b>
              <div style={{ color: "var(--trv-muted)", fontSize: 13 }}>
                Cancel before 16 August for a full refund.
              </div>
            </div>
            <h4 style={{ margin: "16px 0 6px" }}>Price details</h4>
            <div className="trv-priceline">
              <span>
                {nights} nights x {inr(Math.round(subtotal / nights))}
              </span>
              <span>{inr(subtotal)}</span>
            </div>
            <div className="trv-priceline">
              <span>Special offer</span>
              <span className="trv-green">-{inr(discount)}</span>
            </div>
            <div className="trv-priceline">
              <span>Taxes</span>
              <span>{inr(taxes)}</span>
            </div>
            <div className="trv-priceline total">
              <span>Total INR</span>
              <span>{inr(total)}</span>
            </div>
            <div className="trv-discount">🏷️ {inr(discount)} discount applied</div>
          </div>
        </div>
      </div>
    </>
  );
}

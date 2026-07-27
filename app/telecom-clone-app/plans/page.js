import Link from "next/link";
import TelHeader from "../TelHeader";
import TelFooter from "../TelFooter";
import { BASE } from "../lib";

export const metadata = { title: "Plans — AirWave" };

const PLANS = [
  { name: "Fiber 100", speed: "100 Mbps", price: 799, perks: "Unlimited calls + 1 OTT app" },
  { name: "Fiber 200", speed: "200 Mbps", price: 1199, perks: "Unlimited calls + 6 OTT apps" },
  { name: "Fiber 300", speed: "300 Mbps", price: 1499, perks: "Unlimited calls + 12 OTT apps" },
  { name: "Postpaid 449", speed: "Unlimited data", price: 449, perks: "Unlimited 5G + Disney+ Hotstar" },
];

export default function Plans() {
  return (
    <>
      <TelHeader />
      <div className="tel-container tel-section">
        <h2>All Plans</h2>
        <div className="tel-cards" style={{ marginTop: 20 }}>
          {PLANS.map((p) => (
            <div className="tel-plancard" key={p.name}>
              <div className="tel-plancard__img">📶</div>
              <div className="tel-plancard__body">
                <div className="ey">{p.speed}</div>
                <h4>
                  {p.name} — ₹{p.price}/mo
                </h4>
                <p>{p.perks}</p>
                <Link href={`${BASE}/recharge?type=postpaid`} className="tel-btn tel-btn--red">
                  BUY NOW
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <TelFooter />
    </>
  );
}

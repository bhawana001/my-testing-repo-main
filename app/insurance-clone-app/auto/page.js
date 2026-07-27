import Link from "next/link";
import InsHeader from "../InsHeader";
import InsFooter from "../InsFooter";
import { BASE } from "../lib";

export const metadata = { title: "Car Insurance — SafeGuard" };

export default function AutoProduct() {
  return (
    <>
      <InsHeader />
      <div className="ins-container">
        <div className="ins-breadcrumb">Home › Products › Car Insurance</div>
      </div>
      <div className="ins-hero-sm">
        <div className="ins-container">
          <h1>Car Insurance that Combines Affordability with Reliable Coverage</h1>
          <p style={{ marginTop: 12 }}>
            <Link href={`${BASE}/quote?product=auto`} className="ins-btn ins-btn--outline" style={{ background: "#fff" }}>
              Start Your Quote
            </Link>
          </p>
        </div>
      </div>

      <div className="ins-container ins-section ins-prose">
        <h2>How You Can Save on Car Insurance</h2>
        <p>
          Car insurance is one of the best ways to protect yourself financially on the road. Get
          peace of mind knowing you're covered. With SafeGuard, you get a variety of discounts,
          bundling options, and more ways to save.
        </p>
        <h2>What Do I Need to Get a Car Insurance Quote?</h2>
        <p>To take getting car insurance quick and painless, make sure to have the following on hand:</p>
        <ul>
          <li>A valid driver&apos;s license</li>
          <li>Your vehicle identification number (VIN)</li>
          <li>Your address and vehicle usage details</li>
          <li>Driving history, including accidents and tickets</li>
        </ul>
        <h2>Personalized Auto Insurance Coverage</h2>
        <p>
          Bodily injury and property damage liability, collision, comprehensive, medical payments,
          uninsured motorist, and rental reimbursement — build the coverage that fits your life.
        </p>
        <p style={{ marginTop: 20 }}>
          <Link href={`${BASE}/quote?product=auto`} className="ins-btn ins-btn--primary">
            Start Your Quote
          </Link>
        </p>
      </div>

      <InsFooter />
    </>
  );
}

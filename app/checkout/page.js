import Link from "next/link";

export default async function Checkout({ searchParams }) {
  const params = await searchParams;
  const plan = params?.plan || "Pro";

  const price = plan === "Pro" ? "$24.00" : "$0.00";

  return (
    <div className="checkout">
      <div className="checkout__card">
        <p className="checkout__brand">Stripe</p>

        <div className="checkout__row">
          <span>Plan</span>
          <span>{plan}</span>
        </div>
        <div className="checkout__row">
          <span>Billing</span>
          <span>Monthly</span>
        </div>
        <div className="checkout__total">
          <span>Total due today</span>
          <span>{price}</span>
        </div>

        <div className="checkout__field">
          <label htmlFor="card">Card number</label>
          <input id="card" placeholder="4242 4242 4242 4242" disabled />
        </div>
        <div className="checkout__field">
          <label htmlFor="exp">Expiration</label>
          <input id="exp" placeholder="MM / YY" disabled />
        </div>
        <div className="checkout__field">
          <label htmlFor="cvc">CVC</label>
          <input id="cvc" placeholder="123" disabled />
        </div>

        <button className="btn btn--primary btn--block" disabled>
          Pay {price}
        </button>

        <p className="checkout__note">
          This is a mock Stripe checkout screen for the {plan} plan. No real
          payment is processed.
        </p>

        <Link href="/" className="checkout__back">
          ← Back to site
        </Link>
      </div>
    </div>
  );
}

// Policyholder dashboard — the landing spot after a successful login (use case #13).
// Server component: it reads the httpOnly `safeguard_session` cookie and redirects
// anyone without one back to /login. That redirect is what makes "the saved session
// was reused" a real assertion instead of a page that renders for everybody.
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import InsHeader from "../InsHeader";
import InsFooter from "../InsFooter";
import { BASE } from "../lib";

export const metadata = { title: "Your Policy — SafeGuard" };
export const dynamic = "force-dynamic";

// Tokens look like safeguard_<base64url("email:timestamp")>.
function readSession(token) {
  try {
    const raw = Buffer.from(token.replace(/^safeguard_/, ""), "base64url").toString("utf8");
    const email = raw.slice(0, raw.lastIndexOf(":"));
    if (!email) return null;
    return { email, name: email.split("@")[0], since: Number(raw.slice(raw.lastIndexOf(":") + 1)) };
  } catch {
    return null;
  }
}

export default async function Dashboard() {
  const token = (await cookies()).get("safeguard_session")?.value;
  const session = token ? readSession(token) : null;
  if (!session) redirect(`${BASE}/login`);

  const signedInAt = Number.isFinite(session.since)
    ? new Date(session.since).toISOString().replace("T", " ").slice(0, 16) + " UTC"
    : "unknown";

  return (
    <>
      <InsHeader />
      <div className="ins-container">
        <div className="ins-breadcrumb">Home › Your Policy</div>
      </div>
      <div className="ins-hero-sm">
        <div className="ins-container">
          <h1>Welcome back, {session.name}</h1>
          <p style={{ marginTop: 8 }}>Signed in as {session.email} · session started {signedInAt}</p>
        </div>
      </div>

      <div className="ins-container ins-section">
        <div className="ins-policy" data-testid="active-policy-card">
          <h2>Active policy</h2>
          <table className="ins-policy__table">
            <tbody>
              <tr>
                <td>Policy number</td>
                <td>SG-AUTO-4417-2026</td>
              </tr>
              <tr>
                <td>Coverage</td>
                <td>Car Insurance — Comprehensive + Collision</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>
                  <b>Active</b>
                </td>
              </tr>
              <tr>
                <td>Next payment</td>
                <td>$142.60 due 2026-09-28</td>
              </tr>
            </tbody>
          </table>
          <p style={{ marginTop: 16 }}>
            <Link href={`${BASE}/claim`} className="ins-btn ins-btn--primary" style={{ color: "#fff" }}>
              File a claim
            </Link>{" "}
            <Link href={`${BASE}/quote?product=auto`} className="ins-btn ins-btn--outline">
              Add a vehicle
            </Link>
          </p>
        </div>
      </div>
      <InsFooter />
    </>
  );
}

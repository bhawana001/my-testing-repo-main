import Link from "next/link";
import IrsHeader from "../IrsHeader";
import GovFooter from "../GovFooter";
import { BASE } from "../lib";

export const metadata = { title: "Report fraud — IRS | USAServices" };

const CARDS = [
  { h: "Tax fraud or scam", p: "Confidentially report suspected tax fraud, scams, abusive schemes, evasion, or law violations." },
  { h: "Fake IRS email or message", p: "IRS and Treasury impersonators threaten or pressure for information or money. Report them." },
  { h: "Identity theft", p: "Report if you or your organization are the victim of tax-related ID theft." },
  { h: "Tax return preparer", p: "Report paid tax return preparers filing fraudulent returns or not following proper practices." },
];

export default function ReportFraud() {
  return (
    <>
      <IrsHeader />
      <div className="gov-container">
        <div className="gov-breadcrumb">
          <Link href={BASE}>Home</Link> › <Link href={`${BASE}/taxes`}>Help</Link> › Report fraud
        </div>
        <h1 className="gov-pagetitle" style={{ color: "#1b1b1b", borderBottom: "none" }}>
          Report fraud
        </h1>
        <div className="gov-prose">
          <h2>Submit a tip to the IRS</h2>
          <p>
            If you know about tax fraud, scams, illegal activity, had your tax information stolen,
            or have other similar information, report it to us.
          </p>
        </div>
        <div className="gov-cards2">
          {CARDS.map((c) => (
            <div className="gov-infocard" key={c.h}>
              <h3>{c.h}</h3>
              <p>{c.p}</p>
            </div>
          ))}
        </div>
        <p style={{ margin: "20px 0 40px" }}>
          <Link href={`${BASE}/report-fraud/form`} className="gov-btn gov-btn--primary" style={{ color: "#fff" }}>
            Report tax fraud, a scam or law violation →
          </Link>
        </p>
      </div>
      <GovFooter />
    </>
  );
}

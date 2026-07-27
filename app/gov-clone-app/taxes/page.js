import Link from "next/link";
import GovHeader from "../GovHeader";
import GovFooter from "../GovFooter";
import { BASE } from "../lib";

export const metadata = { title: "Taxes — USAServices" };

const CARDS = [
  { h: "File federal taxes", p: "Find out if you need to file a federal tax return and how to file." },
  { h: "Get help filing taxes", p: "Learn how to get assistance filing your taxes and explore free online tools." },
  { h: "Tax refunds", p: "Check your tax refund status. Find unclaimed refunds." },
  { h: "Federal tax forms", p: "Learn how to get tax forms and what to do if you don't get a W-2." },
  { h: "Report tax fraud or a scam", p: "Report suspected tax fraud, scams, and identity theft to the IRS.", href: `${BASE}/report-fraud` },
  { h: "Resolve tax disputes", p: "Find out how to resolve tax disputes with the IRS." },
];

export default function Taxes() {
  return (
    <>
      <GovHeader />
      <div className="gov-container">
        <div className="gov-breadcrumb">
          <Link href={BASE}>Home</Link> › Taxes
        </div>
        <h1 className="gov-pagetitle">Taxes</h1>
        <p style={{ color: "#1b1b1b", marginBottom: 20 }}>
          Learn about filing federal income tax. Find out how to pay, how to check your refund, and more.
        </p>
        <div className="gov-topics" style={{ marginBottom: 40 }}>
          {CARDS.map((c) => (
            <Link key={c.h} href={c.href || BASE} className="gov-topic">
              <h4>{c.h}</h4>
              <p>{c.p}</p>
            </Link>
          ))}
        </div>
      </div>
      <GovFooter />
    </>
  );
}

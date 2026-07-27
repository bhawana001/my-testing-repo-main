import Link from "next/link";
import GovHeader from "./GovHeader";
import GovFooter from "./GovFooter";
import { BASE } from "./lib";

const HOWDO = ["Check my tax refund", "Get or renew a passport", "Get housing help", "Find unclaimed money"];

const TOPICS = [
  { h: "The U.S. and its government", p: "Learn about U.S. laws, history, and more. Contact elected officials and federal agencies." },
  { h: "Complaints", p: "File complaints involving government agencies, products and services, travel, and more." },
  { h: "Disability services", p: "Find government benefits and programs for people with disabilities and their families." },
  { h: "Disasters and emergencies", p: "Learn about disaster assistance and find government benefits for emergencies." },
  { h: "Education", p: "Learn about Federal Student Aid and studying in the U.S. Find early intervention programs." },
  { h: "Government benefits", p: "Find government programs that may help pay for food, housing, health care, and more." },
  { h: "Health", p: "Get information about health insurance. Find help for medical conditions and paying bills." },
  { h: "Housing help", p: "Learn about rental and buyer assistance programs. Find emergency housing." },
  { h: "Immigration and U.S. citizenship", p: "Learn about U.S. residency, Green Cards, citizenship requirements, and related issues." },
  { h: "Jobs and unemployment", p: "Get resources for finding a job. Learn about unemployment insurance and labor laws." },
  { h: "Military and veterans", p: "Learn how to join the military. Find benefits and services as a member or veteran." },
  { h: "Money and credit", p: "Find government grants, loans, and unclaimed money. Learn about taxes and credit reports." },
  { h: "Scams and fraud", p: "Learn about identity theft, Social Security scams, and how to report scams and fraud.", href: `${BASE}/report-fraud` },
  { h: "Small business", p: "Learn how to start, fund, and manage your own business." },
  { h: "Taxes", p: "Learn about filing federal income tax. Find out how to pay, how to check your refund, and more.", href: `${BASE}/taxes` },
  { h: "Travel", p: "Learn about passports, travel documents for minors, and travel to, from, and within the U.S." },
];

export default function GovHome() {
  return (
    <>
      <GovHeader />

      <section className="gov-hero">
        <div className="gov-hero__inner">
          <h1>Making government services easier to find</h1>
          <p>USAServices helps you locate and understand government benefits, programs, and information.</p>
          <div className="gov-howdo">
            <h4>How do I ...</h4>
            {HOWDO.map((h) => (
              <a href="#" key={h}>
                {h}
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="gov-benefband">
        <div className="gov-benefband__inner">
          <span style={{ fontSize: 40 }}>🤝</span>
          <h2>Government benefits and financial assistance</h2>
          <Link href={`${BASE}/report-fraud`} className="gov-btn">
            Find benefits
          </Link>
        </div>
      </div>

      <div className="gov-container gov-section">
        <h2>All topics and services</h2>
        <div className="gov-topics">
          {TOPICS.map((t) => (
            <Link key={t.h} href={t.href || BASE} className="gov-topic">
              <h4>{t.h}</h4>
              <p>{t.p}</p>
            </Link>
          ))}
        </div>
      </div>

      <GovFooter />
    </>
  );
}

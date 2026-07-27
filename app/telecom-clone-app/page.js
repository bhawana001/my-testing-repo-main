"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TelHeader from "./TelHeader";
import TelFooter from "./TelFooter";
import { BASE } from "./lib";

const CONNECT = [
  { ic: "📶", l: "Wi-Fi" }, { ic: "📱", l: "Postpaid" }, { ic: "💳", l: "Financial Services" },
  { ic: "🔋", l: "Prepaid" }, { ic: "📺", l: "IPTV" }, { ic: "🎁", l: "Refer & Earn" },
  { ic: "🖤", l: "AirWave Black" }, { ic: "🛰️", l: "DTH" },
];
const RECHARGE_TABS = ["Prepaid", "Postpaid", "DTH", "Wi-Fi", "AirWave Black"];
const PLANS = [
  { ey: "Fiber", h: "Enjoy unlimited wi-fi at ₹999", p: "Up to 100 Mbps speed, unlimited calls & OTT apps", ic: "📡" },
  { ey: "Postpaid Advantage", h: "Faster speeds, just for you", p: "Experience faster speeds with unlimited data at just ₹449", ic: "🚀" },
  { ey: "Prepaid", h: "Enjoy high-speed, seamless network", p: "Home delivery of SIM & Quick activation", ic: "🔒" },
];

export default function TelecomHome() {
  const router = useRouter();
  const [tab, setTab] = useState("Prepaid");
  const [mobile, setMobile] = useState("");
  const [err, setErr] = useState("");

  // wifi wizard
  const [devices, setDevices] = useState("1-5");
  const [usage, setUsage] = useState(["General Browsing"]);
  const bestPlan = usage.includes("Gaming") || devices === "10+" ? "200 Mbps" : "100 Mbps";
  const bestPrice = bestPlan === "200 Mbps" ? 1199 : 799;

  function recharge() {
    if (!/^\d{10}$/.test(mobile)) {
      setErr("Enter a valid 10-digit mobile number");
      return;
    }
    router.push(`${BASE}/recharge?mobile=${mobile}&type=${tab.toLowerCase()}`);
  }
  function toggleUsage(u) {
    setUsage((arr) => (arr.includes(u) ? arr.filter((x) => x !== u) : [...arr, u]));
  }

  return (
    <>
      <TelHeader />

      <section className="tel-hero">
        <div className="tel-container">
          <h1>Turn your ideas into design</h1>
          <p>Premium creative tools worth ₹4000, FREE for all AirWave users, for 12 months.</p>
          <button className="tel-btn">LEARN MORE</button>
        </div>
      </section>

      <section className="tel-section" style={{ background: "#fafafa" }}>
        <div className="tel-container">
          <h2>Buy a new connection</h2>
          <div className="tel-icons">
            {CONNECT.map((c) => (
              <div className="tel-icon" key={c.l}>
                <div className="circle">{c.ic}</div>
                {c.l}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tel-section">
        <div className="tel-container">
          <h2>Recharge or pay bills</h2>
          <div className="tel-recharge">
            <div className="tel-recharge__tabs">
              {RECHARGE_TABS.map((t) => (
                <div
                  key={t}
                  className={"tel-recharge__tab" + (tab === t ? " is-active" : "")}
                  onClick={() => setTab(t)}
                >
                  {t}
                </div>
              ))}
            </div>
            <input
              className={err ? "err" : ""}
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value.replace(/\D/g, ""));
                setErr("");
              }}
              maxLength={10}
            />
            {err && <div className="tel-msg">{err}</div>}
            <button className="tel-btn tel-btn--block" onClick={recharge}>
              RECHARGE
            </button>
          </div>
        </div>
      </section>

      <section className="tel-section" style={{ background: "#fafafa" }}>
        <div className="tel-container">
          <h2>Recommended for you</h2>
          <div className="tel-cards">
            {PLANS.map((p) => (
              <div className="tel-plancard" key={p.h}>
                <div className="tel-plancard__img">{p.ic}</div>
                <div className="tel-plancard__body">
                  <div className="ey">{p.ey}</div>
                  <h4>{p.h}</h4>
                  <p>{p.p}</p>
                  <Link href={`${BASE}/plans`} className="tel-btn">
                    BUY NOW
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tel-section">
        <div className="tel-container">
          <h2>Find the best Wi-Fi plan for you</h2>
          <div className="tel-wizard">
            <div className="tel-wizard__col">
              <h4>Step 1 of 2 — How many devices?</h4>
              {["1-5", "6-10", "10+"].map((d) => (
                <button
                  key={d}
                  className={"tel-chip" + (devices === d ? " is-on" : "")}
                  onClick={() => setDevices(d)}
                >
                  {d}
                </button>
              ))}
            </div>
            <div className="tel-wizard__col">
              <h4>Step 2 of 2 — What will you use it for?</h4>
              {["General Browsing", "Gaming", "Streaming", "Work from home"].map((u) => (
                <button
                  key={u}
                  className={"tel-chip" + (usage.includes(u) ? " is-on" : "")}
                  onClick={() => toggleUsage(u)}
                >
                  {u}
                </button>
              ))}
            </div>
            <div className="tel-wizard__col tel-wizard__result">
              <div style={{ fontSize: 40 }}>📶</div>
              <p>The best plan for you is</p>
              <div className="big">{bestPlan}</div>
              <p style={{ color: "var(--tel-muted)" }}>Rs. {bestPrice} per month</p>
              <Link href={`${BASE}/plans`} className="tel-btn tel-btn--red">
                GET STARTED
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TelFooter />
    </>
  );
}

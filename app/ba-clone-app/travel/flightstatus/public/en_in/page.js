"use client";
import Link from "next/link";
import { Header, Footer } from "../../../../ui";
import { R, useStore } from "../../../../shared";
import StatusForm from "./StatusForm";

export default function FlightStatus() {
  useStore();
  return (
    <>
      <Header />
      <div className="bx-wrap bx-page">
        <div className="bx-crumb"><Link href={R.home}>Home</Link> › Flight status</div>
        <h1 className="bx-h1">Flight status</h1>
        <p className="bx-lead">Check live departure and arrival times for Britannic Airways flights from yesterday, today and tomorrow.</p>
        <StatusForm />
      </div>
      <Footer />
    </>
  );
}

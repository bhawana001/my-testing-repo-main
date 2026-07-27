import "./telecom.css";
import { demo } from "./demo";
import BackToEvals from "../BackToEvals";

export const metadata = {
  title: "AirWave — Recharge, Postpaid, Wi-Fi & DTH",
  description: "A demo telecom site clone: recharge, pay bills, and browse plans.",
};

export default function TelecomLayout({ children }) {
  const cls = "tel" + (demo.visual ? " tel-demo-visual" : "");
  return (
    <div className={cls}>
      <BackToEvals />
      {children}
    </div>
  );
}

import "./gov.css";
import { demo } from "./demo";
import BackToEvals from "../BackToEvals";

export const metadata = {
  title: "USAServices — Government services made easier to find",
  description: "A demo government services portal clone: find topics, taxes, and report fraud.",
};

export default function GovLayout({ children }) {
  const cls = "gov" + (demo.visual ? " gov-demo-visual" : "");
  return (
    <div className={cls}>
      <BackToEvals />
      {children}
    </div>
  );
}

import "./insurance.css";
import { demo } from "./demo";
import BackToEvals from "../BackToEvals";

export const metadata = {
  title: "SafeGuard — Insurance you expect. Protection you deserve.",
  description:
    "A demo insurance site clone: get a quote, manage a claim, and log in to your policy.",
};

export default function InsuranceLayout({ children }) {
  const cls = "ins" + (demo.visual ? " ins-demo-visual" : "");
  return (
    <div className={cls}>
      <BackToEvals />
      {children}
    </div>
  );
}

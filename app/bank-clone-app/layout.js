import "./bank.css";
import { demo } from "./demo";
import BackToEvals from "../BackToEvals";

export const metadata = {
  title: "GO Money Rates — Banking, Calculators & Savings",
  description:
    "A demo banking site clone: home, banking guides, financial calculators, and open a high-yield savings account.",
};

export default function BankLayout({ children }) {
  // Visual Validation demo: a CSS-only regression. The DOM is untouched,
  // every selector still resolves and every click still works — but the
  // primary CTAs render invisible (button color == background). Playwright
  // passes green; a visual layer catches it.
  const cls = "bank" + (demo.visual ? " b-demo-visual" : "");
  return (
    <div className={cls}>
      <BackToEvals />
      {children}
    </div>
  );
}

import "./health.css";
import { demo } from "./demo";
import BackToEvals from "../BackToEvals";

export const metadata = {
  title: "CareWell — Find Doctors, Video Consult & Lab Tests",
  description:
    "A demo healthcare site clone: consult doctors online, book in-clinic appointments, lab tests and surgeries.",
};

export default function HealthLayout({ children }) {
  // Namespace wrapper so health styles never collide with the dark globals.css
  // theme. Visual-demo modifier mirrors the bank clone.
  const cls = "health" + (demo.visual ? " h-demo-visual" : "");
  return (
    <div className={cls}>
      <BackToEvals />
      {children}
    </div>
  );
}

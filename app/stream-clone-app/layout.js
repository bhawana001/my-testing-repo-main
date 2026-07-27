import "./stream.css";
import { demo } from "./demo";
import BackToEvals from "../BackToEvals";

export const metadata = {
  title: "StreamFlix — Watch TV Shows & Movies",
  description: "A demo streaming site clone: browse titles and stream video.",
};

export default function StreamLayout({ children }) {
  const cls = "flx" + (demo.visual ? " flx-demo-visual" : "");
  return (
    <div className={cls}>
      <BackToEvals />
      {children}
    </div>
  );
}

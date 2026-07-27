import "./travel.css";
import { demo } from "./demo";
import BackToEvals from "../BackToEvals";

export const metadata = {
  title: "StayNest — Book homes, rooms & stays",
  description: "A demo travel/stays site clone: search listings, view a room, and book.",
};

export default function TravelLayout({ children }) {
  const cls = "trv" + (demo.visual ? " trv-demo-visual" : "");
  return (
    <div className={cls}>
      <BackToEvals />
      {children}
    </div>
  );
}

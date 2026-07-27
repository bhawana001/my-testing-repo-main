import "./shop.css";
import { demo } from "./demo";
import BackToEvals from "../BackToEvals";

export const metadata = {
  title: "ShopKart.com. Spend less. Smile more.",
  description:
    "A demo e-commerce site clone: browse departments, add to cart, and checkout.",
};

export default function ShopLayout({ children }) {
  // Namespace wrapper `.amz` so the Amazon-style light theme never collides
  // with the dark globals.css theme (which already owns `.shop` and `.card`).
  const cls = "amz" + (demo.visual ? " amz-demo-visual" : "");
  return (
    <div className={cls}>
      <BackToEvals />
      {children}
    </div>
  );
}

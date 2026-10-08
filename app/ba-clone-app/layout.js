import "./ba.css";
import BackToEvals from "../BackToEvals";

export const metadata = {
  title: "Britannic Airways | Book Flights, Holidays, City Breaks & Check In Online",
  description: "Britannic Airways clone of British Airways: flight search and booking, Manage My Booking, online check-in, flight status and The Britannic Club.",
};

export default function BaLayout({ children }) {
  return (
    <div className="bx">
      <BackToEvals />
      {children}
    </div>
  );
}

import { Link } from "react-router-dom";
import "../styles/nav.css";

export default function Navbar() {
  return (
    <nav>
      <div></div> {/* Empty div for spacing */}
      <div className="nav-center">
        <span className="text-xl font-bold">Tea Tracker</span>
        <Link to="/">Home</Link>
        <Link to="/history">History</Link>
        <Link to="/notes">Notes</Link>
      </div>
      <div></div> {/* Empty div for spacing */}
    </nav>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";

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

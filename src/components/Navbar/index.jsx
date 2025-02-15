import { Link } from "react-router-dom";
import { useState } from "react";
import "./index.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">🚀 MyApp</Link>
      </div>

      {/* Menu Toggle Button for Mobile */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        </li>
        <li>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        </li>
        <li>
          <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
        </li>
        <li>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </li>
        <li className="login-btn">
          <Link to="/login" className="btn" onClick={() => {
            localStorage.removeItem("auth");
            localStorage.removeItem("username");
            setMenuOpen(false) }}>Log out</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

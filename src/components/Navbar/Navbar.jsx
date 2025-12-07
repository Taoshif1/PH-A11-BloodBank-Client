import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { BiDonateBlood,  } from "react-icons/bi";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {}
    setOpen(false);
  };

  return (
    <header className="app-navbar">
      <div className="container">

        {/* LOGO */}
        <Link to="/" className="brand">
          <BiDonateBlood className="icon" />
          <span>
            <span style={{ color: "#ef4444" }}>Blood</span>Donor
          </span>
        </Link>

        {/* MAIN NAV (USED FOR BOTH DESKTOP & MOBILE) */}
        <nav
          className={`nav-links ${open ? "show" : ""}`}
          aria-label="main-navigation"
        >
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/donation-requests" onClick={() => setOpen(false)}>Donation Requests</NavLink>
          <NavLink to="/search-donors" onClick={() => setOpen(false)}>Search Donors</NavLink>
          {user && (
            <NavLink to="/funding" onClick={() => setOpen(false)}>Funding</NavLink>
          )}
        </nav>

        {/* RIGHT SIDE */}
        <div className="actions">
          {!user ? (
            <>
              <Link to="/login" className="link-cta">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="link-cta">Dashboard</Link>
              <button onClick={handleLogout} className="btn">Logout</button>
            </>
          )}

          {/* MOBILE TOGGLE BUTTON */}
          <button
            className="mobile-toggle"
            aria-label="menu"
            onClick={() => setOpen(prev => !prev)}
          >
            {open ? <IoMdClose /> : <CiMenuFries />}
          </button>
        </div>

      </div>
    </header>
  );
}

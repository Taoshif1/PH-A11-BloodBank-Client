import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { BiDonateBlood } from "react-icons/bi";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";
import "./Navbar.css";

export default function Navbar() {
  const { user, userData, logoutUser } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success('Logged out successfully');
    } catch (err) {
      console.error('Logout error:', err);
    }
    setOpen(false);
  };

  return (
    <header className="app-navbar">
      <div className="container">
        {/* LOGO */}
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <BiDonateBlood className="icon" />
          <span>
            <span style={{ color: "#ef4444" }}>Blood</span>Donor
          </span>
        </Link>

        {/* MAIN NAV */}
        <nav
          className={`nav-links ${open ? "show" : ""}`}
          aria-label="main-navigation"
        >
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/donation-requests" onClick={() => setOpen(false)}>
            Donation Requests
          </NavLink>
          <NavLink to="/search-donors" onClick={() => setOpen(false)}>
            Search Donors
          </NavLink>
          {user && (
            <NavLink to="/funding" onClick={() => setOpen(false)}>
              Funding
            </NavLink>
          )}
          <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
          <NavLink to="/about-us" onClick={() => setOpen(false)}>About Us</NavLink>

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
              <Link to="/dashboard" className="link-cta hidden sm:inline">
                Dashboard
              </Link>
              
              {/* User Dropdown */}
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full ring ring-error ring-offset-2">
                    {userData?.avatar ? (
                      <img alt="User" src={userData.avatar} />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-error text-white">
                        <FaUser />
                      </div>
                    )}
                  </div>
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52 mt-3">
                  <li className="menu-title">
                    <span className="text-gray-700">{userData?.name}</span>
                  </li>
                  <li><Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link></li>
                  <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            </>
          )}

          {/* MOBILE TOGGLE */}
          <button
            className="mobile-toggle"
            aria-label="menu"
            onClick={() => setOpen(prev => !prev)}
          >
            {open ? <IoMdClose /> : <CiMenuFries />}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="mobile-overlay"
          onClick={() => setOpen(false)}
        />
      )}
    </header>
  );
}
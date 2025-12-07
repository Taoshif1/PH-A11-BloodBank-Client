import { Link } from "react-router-dom";
import { FaSearch, FaHandHoldingHeart } from "react-icons/fa";
import banner from "../assets/banner.png"

const Banner = () => {
  return (
    <div className="hero min-h-[520px] bg-gradient-to-r from-red-50 to-pink-50 overflow-hidden">
      <div className="hero-content flex-col lg:flex-row-reverse max-w-7xl mx-auto px-6 py-10 gap-8">

        {/* IMAGE SECTION */}
        <div className="flex-1 flex justify-center">
          <div className="rounded-2xl animate-glow p-2">
            <img
              src={banner}
              className="max-w-sm w-full rounded-2xl animate-float"
              alt="Blood Donation"
            />
          </div>
        </div>

        {/* TEXT SECTION */}
        <div className="flex-1 animate-fadeInUp">
          <h1 className="text-5xl font-extrabold text-gray-800 leading-tight">
            Donate Blood, <br />
            <span className="text-error">Save Lives</span>
          </h1>

          <p className="py-6 text-lg text-gray-600 max-w-lg">
            Your single donation can save up to three lives. Be a hero and make a
            powerful impact in someone’s life today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/register" className="btn btn-error text-white gap-2">
              <FaHandHoldingHeart />
              Join as a Donor
            </Link>
            <Link to="/search-donors" className="btn btn-outline btn-error gap-2">
              <FaSearch />
              Search Donors
            </Link>
          </div>

          {/* Stats */}
          <div className="stats shadow mt-10 bg-white">
            <div className="stat">
              <div className="stat-title">Lives Saved</div>
              <div className="stat-value text-error">2.4K+</div>
            </div>

            <div className="stat">
              <div className="stat-title">Active Donors</div>
              <div className="stat-value text-error">850+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

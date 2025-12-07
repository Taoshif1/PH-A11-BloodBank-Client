import { Link } from "react-router-dom";
import { FaSearch, FaHandHoldingHeart } from "react-icons/fa";
import bannerImage from "../assets/banner.png";

const Banner = () => {
  return (
    <div className="relative w-full bg-gradient-to-r from-red-50 via-pink-50 to-red-50 overflow-hidden py-16 sm:py-24">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col items-center justify-center">
        <div className="relative w-full max-w-7xl bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden min-h-[500px] lg:min-h-[600px]">

          {/* Background overlay */}
          <div className="absolute inset-0 bg-red-100/50 backdrop-blur-sm">
            <div
              className="absolute top-0 left-0 w-full h-full bg-repeat opacity-5"
              style={{
                backgroundImage: `url(${bannerImage})`,
                backgroundSize: "200px",
                backgroundPosition: "center",
              }}
            ></div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between h-full">

            {/* Left Side: Text and Buttons */}
            <div className="text-center lg:text-left space-y-4 lg:w-1/2">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-gray-800 leading-none">
                Donate Blood
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-error mt-1 border-b-4 border-error/50 inline-block pb-1">
                Save Lives
              </h1>

              <p className="text-base sm:text-lg text-gray-700 max-w-md mx-auto lg:mx-0 pt-4">
                Your single donation can save up to three lives. Join our
                community of heroes and make a difference today. Every drop
                counts in saving precious lives.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start py-6">
                <Link
                  to="/register"
                  className="btn btn-lg bg-error text-white gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <FaHandHoldingHeart /> Join as Donor
                </Link>
                <Link
                  to="/search-donors"
                  className="btn btn-lg btn-outline border-error text-error gap-2"
                >
                  <FaSearch /> Search Donors
                </Link>
              </div>
            </div>

            {/* Right Side Image */}
            <div className="hidden lg:flex justify-center items-start lg:w-1/3 h-full py-10 mt-20">
              <img
                src={bannerImage}
                alt="Blood Donation Bag with Heartbeat"
                className="h-full max-h-full object-contain drop-shadow-2xl"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

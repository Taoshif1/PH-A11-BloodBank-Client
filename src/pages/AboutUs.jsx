import React from "react";
import { FaHandsHelping, FaEye } from "react-icons/fa";

export default function AboutUs() {
  return (
    <div className="py-16 bg-gray-50">
      {/* Hero Section */}
      <div className="text-center mb-12 px-4">
        <h1 className="text-5xl font-bold text-red-500 mb-4">About Us</h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto leading-8">
          Welcome to <span className="font-semibold">BloodDonor</span>! Our mission
          is to save lives by connecting donors with those in need. We are building
          a strong, compassionate community where blood donation is simple, fast, and impactful.
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="flex flex-col md:flex-row justify-center gap-8 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 w-full md:w-1/3 text-center">
          <FaHandsHelping className="text-red-500 text-4xl mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-3">Our Mission</h3>
          <p className="text-gray-700">
            Connect donors with recipients efficiently to save more lives and
            encourage voluntary blood donation.
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 w-full md:w-1/3 text-center">
          <FaEye className="text-red-500 text-4xl mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-3">Our Vision</h3>
          <p className="text-gray-700">
            Create a world where blood donation is accessible to everyone and
            communities thrive through helping one another.
          </p>
        </div>
      </div>

      {/* Optional: Team Section */}
      <div className="mt-16 px-4">
        <h2 className="text-4xl font-bold text-center text-red-500 mb-8">
          Meet Our Team
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full md:w-1/4 text-center hover:shadow-2xl transition transform hover:-translate-y-2">
            <img
              src="https://www.shutterstock.com/image-vector/minimalist-line-icon-businessman-ideal-260nw-2639268109.jpg"
              alt="Team member"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h4 className="font-semibold text-lg">Gazi Taoshif</h4>
            <p className="text-gray-600 text-sm">Founder & CEO</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg w-full md:w-1/4 text-center hover:shadow-2xl transition transform hover:-translate-y-2">
            <img
              src="https://www.shutterstock.com/image-vector/minimalist-line-icon-businessman-ideal-260nw-2639268109.jpg"
              alt="Team member"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h4 className="font-semibold text-lg">Mahafuza Moon</h4>
            <p className="text-gray-600 text-sm">Operations Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";

const donors = [
  { id: 1, name: "Rahim Ahmed", group: "A+", location: "Dhaka" },
  { id: 2, name: "Karim Uddin", group: "B+", location: "Chittagong" },
  { id: 3, name: "Nusrat Jahan", group: "O+", location: "Sylhet" },
  { id: 4, name: "Tanvir Hasan", group: "AB+", location: "Rajshahi" },
];

export default function SearchDonors() {
  const [query, setQuery] = useState("");

  const filtered = donors.filter(d =>
    d.name.toLowerCase().includes(query.toLowerCase()) ||
    d.group.toLowerCase().includes(query.toLowerCase()) ||
    d.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-red-500 mb-6">
        Search Blood Donors
      </h1>

      <input
        type="text"
        placeholder="Search by name, blood group, or location"
        className="input input-bordered w-full mb-6"
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((donor) => (
          <div key={donor.id} className="card bg-base-100 shadow-md p-4">
            <h2 className="text-xl font-semibold">{donor.name}</h2>
            <p>🩸 Group: {donor.group}</p>
            <p>📍 Location: {donor.location}</p>
            <button className="btn btn-error mt-3 text-white">
              Contact Donor
            </button>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-center col-span-full text-gray-500">
            No donors found.
          </p>
        )}
      </div>
    </div>
  );
}

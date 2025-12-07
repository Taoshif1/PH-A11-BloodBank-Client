import { useState } from "react";

export default function Funding() {
  const [amount, setAmount] = useState("");

  const handleDonate = () => {
    alert(`Stripe payment flow for ৳${amount} coming soon 🚀`);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-red-500 mb-6">
        Support Blood Donation
      </h1>

      <div className="card bg-white shadow-xl p-6">
        <label className="label font-semibold">Donation Amount (BDT)</label>
        <input
          type="number"
          placeholder="Enter amount"
          className="input input-bordered w-full mb-4"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          onClick={handleDonate}
          className="btn btn-error w-full text-white"
          disabled={!amount}
        >
          Donate Now
        </button>
      </div>
    </div>
  );
}

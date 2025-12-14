import { useEffect, useState } from "react";

const Ticker = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      // Replace with your actual API endpoint
      // const response = await fetch(
      //   `${import.meta.env.VITE_API_URL}/donation-requests/pending`
      // );
      // const data = await response.json();
      // setRequests(data.slice(0, 5));
      
      // Demo data for testing
      setRequests([
        { _id: "1", bloodGroup: "A+", recipientDistrict: "Dhaka" },
        { _id: "2", bloodGroup: "O-", recipientDistrict: "Chittagong" },
        { _id: "3", bloodGroup: "B+", recipientDistrict: "Sylhet" },
        { _id: "4", bloodGroup: "AB+", recipientDistrict: "Rajshahi" },
        { _id: "5", bloodGroup: "O+", recipientDistrict: "Khulna" },
      ]);
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  if (requests.length === 0) return null;

  // Duplicate items for seamless scroll
  const tickerItems = [...requests, ...requests];

  return (
    <div
      style={{
        backgroundColor: "#dc2626",
        color: "#fff",
        overflow: "hidden",
        fontSize: "1rem",
        padding: "0.75rem 0",
        whiteSpace: "nowrap",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "inline-block",
          animation: "scroll 25s linear infinite",
          willChange: "transform",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.animationPlayState = "running";
        }}
      >
        {tickerItems.map((req, idx) => (
          <span
            key={req._id + "-" + idx}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              marginRight: "3rem",
              fontWeight: 500,
            }}
          >
            <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>🩸 URGENT:</span>
            <span>
              {req.bloodGroup} needed in {req.recipientDistrict}
            </span>
          </span>
        ))}
      </div>

      <style>
        {`
          @keyframes scroll {
            0% { 
              transform: translateX(0); 
            }
            100% { 
              transform: translateX(-50%); 
            }
          }
        `}
      </style>
    </div>
  );
};

export default Ticker;
import { useEffect, useState } from "react";
import axios from "axios";

const Ticker = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/donation-requests/pending`
      );
      
      // Take first 5 requests
      setRequests(response.data.slice(0, 5));
    } catch (err) {
      console.error("Error fetching requests:", err);
      // Fallback to empty array on error
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  // Don't show ticker if no requests or still loading
  if (loading || requests.length === 0) return null;

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
            <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
              🩸 URGENT:
            </span>
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
// Ticker.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const Ticker = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      // Ensure VITE_API_URL is correctly defined in your environment
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/donation-requests/pending`);
      setRequests(response.data.slice(0, 5)); // Get only 5 recent
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  if (requests.length === 0) return null;

  return (
    <div className="bg-red-600 text-white py-2 overflow-hidden shadow-inner">
      <div className="flex animate-marquee whitespace-nowrap">
        {requests.map((request, index) => (
          <span key={request._id} className="mx-8 flex items-center gap-2 text-lg">
            <span className="font-extrabold">🩸 URGENT:</span>
            <span>{request.bloodGroup} needed in {request.recipientDistrict}</span>
            {index !== requests.length - 1 && <span className="mx-4">•</span>}
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {requests.map((request, index) => (
          <span key={`${request._id}-duplicate`} className="mx-8 flex items-center gap-2 text-lg">
            <span className="font-extrabold">🩸 URGENT:</span>
            <span>{request.bloodGroup} needed in {request.recipientDistrict}</span>
            {index !== requests.length - 1 && <span className="mx-4">•</span>}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
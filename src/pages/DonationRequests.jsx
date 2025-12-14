import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEye, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const DonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/donation-requests/pending`
      );
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-error"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Blood Donation Requests
          </h1>
          <p className="text-lg text-gray-600">
            Help save lives by donating blood to those in need
          </p>
        </motion.div>

        {requests.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No pending requests at the moment</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((request, index) => (
              <motion.div
                key={request._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 text-white">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold">{request.recipientName}</h3>
                      <p className="text-sm opacity-90">Needs Blood Donation</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">{request.bloodGroup}</div>
                      <div className="text-xs">Blood Group</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-start gap-2">
                    <FaMapMarkerAlt className="text-error mt-1" />
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-sm text-gray-600">
                        {request.recipientDistrict}, {request.recipientUpazila}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <FaClock className="text-error mt-1" />
                    <div>
                      <p className="font-semibold">Date & Time</p>
                      <p className="text-sm text-gray-600">
                        {new Date(request.donationDate).toLocaleDateString()} at {request.donationTime}
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`/donation-requests/${request._id}`}
                    className="btn btn-error text-white w-full mt-4 gap-2"
                  >
                    <FaEye /> View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationRequests;
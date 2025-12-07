import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import { FaHospital, FaMapMarkerAlt, FaClock, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';

const DonationDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchRequestDetails();
  }, [id]);

  const fetchRequestDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/donation-requests/${id}`
      );
      setRequest(response.data);
    } catch (error) {
      console.error('Error fetching details:', error);
      toast.error('Failed to fetch details');
    } finally {
      setLoading(false);
    }
  };

  const handleDonate = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/donation-requests/${id}/donate`,
        {},
        { withCredentials: true }
      );
      toast.success('Thank you for agreeing to donate!');
      setShowModal(false);
      navigate('/dashboard');
    } catch (error) {
      console.error('Donate error:', error);
      toast.error(error.response?.data?.message || 'Failed to process donation');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-error"></span>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Request not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-red-500 to-pink-500 p-8 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2">Blood Donation Request</h1>
                <p className="text-lg opacity-90">Help save a life today</p>
              </div>
              <div className="text-center bg-white text-error rounded-xl p-4">
                <div className="text-4xl font-bold">{request.bloodGroup}</div>
                <div className="text-sm">Required</div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800">Requester Information</h3>
                <div className="flex items-start gap-3">
                  <FaUser className="text-error mt-1" />
                  <div>
                    <p className="font-semibold">Name</p>
                    <p className="text-gray-600">{request.requesterName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaUser className="text-error mt-1" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-600">{request.requesterEmail}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800">Recipient Information</h3>
                <div className="flex items-start gap-3">
                  <FaUser className="text-error mt-1" />
                  <div>
                    <p className="font-semibold">Name</p>
                    <p className="text-gray-600">{request.recipientName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-error mt-1" />
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-gray-600">
                      {request.recipientDistrict}, {request.recipientUpazila}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6 space-y-4">
              <div className="flex items-start gap-3">
                <FaHospital className="text-error mt-1 text-xl" />
                <div>
                  <p className="font-semibold">Hospital</p>
                  <p className="text-gray-600">{request.hospitalName}</p>
                  <p className="text-sm text-gray-500">{request.fullAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaClock className="text-error mt-1 text-xl" />
                <div>
                  <p className="font-semibold">Date & Time</p>
                  <p className="text-gray-600">
                    {new Date(request.donationDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })} at {request.donationTime}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Request Message</h3>
              <p className="text-gray-600">{request.requestMessage}</p>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
              <span className="font-semibold">Current Status:</span>
              <span className={`badge badge-lg ${
                request.donationStatus === 'pending' ? 'badge-warning' :
                request.donationStatus === 'inprogress' ? 'badge-info' :
                request.donationStatus === 'done' ? 'badge-success' :
                'badge-error'
              }`}>
                {request.donationStatus}
              </span>
            </div>

            {/* Donate Button */}
            {request.donationStatus === 'pending' && (
              <button
                onClick={() => setShowModal(true)}
                className="btn btn-error text-white w-full text-lg"
              >
                I Want to Donate
              </button>
            )}

            {request.donationStatus === 'inprogress' && request.donorInfo && (
              <div className="alert alert-info">
                <div>
                  <h4 className="font-bold">Donor Information</h4>
                  <p>Name: {request.donorInfo.name}</p>
                  <p>Email: {request.donorInfo.email}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Confirm Donation</h3>
            <div className="space-y-3">
              <div>
                <p className="font-semibold">Your Name</p>
                <p className="text-gray-600">{user?.displayName}</p>
              </div>
              <div>
                <p className="font-semibold">Your Email</p>
                <p className="text-gray-600">{user?.email}</p>
            </div>
        </div>
        <div className="modal-action">
          <button onClick={() => setShowModal(false)} className="btn">
            Cancel
          </button>
          <button onClick={handleDonate} className="btn btn-error text-white">
            Confirm Donation
          </button>
        </div>
      </div>
    </div>
  )}
</div>
);
};

export default DonationDetails;
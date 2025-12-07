import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { FaUsers, FaDonate, FaDollarSign } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { userData } = useAuth();
  const [recentRequests, setRecentRequests] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFunding: 0,
    totalRequests: 0
  });

  useEffect(() => {
    if (userData?.role === 'donor') {
      fetchRecentRequests();
    } else {
      fetchStats();
    }
  }, [userData]);

  const fetchRecentRequests = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/donation-requests/recent`,
        { withCredentials: true }
      );
      setRecentRequests(response.data);
    } catch (error) {
      console.error('Error fetching recent requests:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const [usersRes, fundingRes, requestsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/users`, { withCredentials: true }),
        axios.get(`${import.meta.env.VITE_API_URL}/funding/total`, { withCredentials: true }),
        axios.get(`${import.meta.env.VITE_API_URL}/donation-requests`, { withCredentials: true })
      ]);

      setStats({
        totalUsers: usersRes.data.length,
        totalFunding: fundingRes.data.totalFunding,
        totalRequests: requestsRes.data.totalRequests
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl p-8 shadow-xl"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Welcome back, {userData?.name}! 👋
        </h1>
        <p className="text-lg opacity-90">
          {userData?.role === 'admin' && 'Manage your blood donation platform'}
          {userData?.role === 'volunteer' && 'Help manage donation requests'}
          {userData?.role === 'donor' && 'Thank you for being a life-saver!'}
        </p>
      </motion.div>

      {/* Admin/Volunteer Stats */}
      {(userData?.role === 'admin' || userData?.role === 'volunteer') && (
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Total Users</p>
                <h3 className="text-3xl font-bold text-gray-800">{stats.totalUsers}</h3>
              </div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <FaUsers className="text-3xl text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Total Funding</p>
                <h3 className="text-3xl font-bold text-gray-800">${stats.totalFunding}</h3>
              </div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <FaDollarSign className="text-3xl text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Total Requests</p>
                <h3 className="text-3xl font-bold text-gray-800">{stats.totalRequests}</h3>
              </div>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <FaDonate className="text-3xl text-red-600" />
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Donor Recent Requests */}
      {userData?.role === 'donor' && recentRequests.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Recent Requests</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Blood Group</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((request) => (
                  <tr key={request._id}>
                    <td>{request.recipientName}</td>
                    <td>{request.recipientDistrict}</td>
                    <td>
                      <span className="badge badge-error text-white">{request.bloodGroup}</span>
                    </td>
                    <td>
                      <span className={`badge ${
                        request.donationStatus === 'pending' ? 'badge-warning' :
                        request.donationStatus === 'inprogress' ? 'badge-info' :
                        request.donationStatus === 'done' ? 'badge-success' :
                        'badge-error'
                      }`}>
                        {request.donationStatus}
                      </span>
                    </td>
                    <td>{new Date(request.donationDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <Link to="/dashboard/my-donation-requests" className="btn btn-error text-white">
              View All Requests
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
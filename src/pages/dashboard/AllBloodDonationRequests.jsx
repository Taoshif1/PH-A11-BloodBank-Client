import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaEye, FaCheck, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';

const AllBloodDonationRequests = () => {
  const { userData } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');

  const isAdmin = userData?.role === 'admin';
  const isVolunteer = userData?.role === 'volunteer';

  useEffect(() => {
    fetchRequests();
  }, [currentPage, statusFilter]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/donation-requests`,
        {
          params: { page: currentPage, limit: 10, status: statusFilter },
          withCredentials: true
        }
      );
      setRequests(response.data.requests);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast.error('Failed to fetch requests');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!isAdmin) {
      toast.error('Only admins can delete requests');
      return;
    }

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/donation-requests/${id}`,
          { withCredentials: true }
        );
        toast.success('Request deleted successfully');
        fetchRequests();
      } catch (error) {
        console.error('Delete error:', error);
        toast.error('Failed to delete request');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/donation-requests/${id}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      toast.success('Status updated successfully');
      fetchRequests();
    } catch (error) {
      console.error('Status update error:', error);
      toast.error('Failed to update status');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'badge-warning',
      inprogress: 'badge-info',
      done: 'badge-success',
      canceled: 'badge-error'
    };
    return badges[status] || 'badge-ghost';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-error"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <h1 className="text-3xl font-bold text-gray-800">All Blood Donation Requests</h1>
        
        {/* Filter */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="select select-bordered"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-100">
              <tr>
                <th>Requester</th>
                <th>Recipient</th>
                <th>Location</th>
                <th>Blood Group</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request._id} className="hover">
                  <td>
                    <div className="text-sm">
                      <div className="font-semibold">{request.requesterName}</div>
                      <div className="text-gray-500">{request.requesterEmail}</div>
                    </div>
                  </td>
                  <td className="font-semibold">{request.recipientName}</td>
                  <td>
                    {request.recipientDistrict}, {request.recipientUpazila}
                  </td>
                  <td>
                    <span className="badge badge-error text-white">{request.bloodGroup}</span>
                  </td>
                  <td>
                    <div className="text-sm">
                      <div>{new Date(request.donationDate).toLocaleDateString()}</div>
                      <div className="text-gray-500">{request.donationTime}</div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${getStatusBadge(request.donationStatus)}`}>
                      {request.donationStatus}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <Link
                        to={`/donation-requests/${request._id}`}
                        className="btn btn-sm btn-info text-white"
                      >
                        <FaEye />
                      </Link>

                      {/* Volunteers can only update status */}
                      {isVolunteer && (
                        <div className="dropdown dropdown-end">
                          <div tabIndex={0} role="button" className="btn btn-sm btn-warning text-white">
                            Status
                          </div>
                          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40">
                            <li><button onClick={() => handleStatusChange(request._id, 'pending')}>Pending</button></li>
                            <li><button onClick={() => handleStatusChange(request._id, 'inprogress')}>In Progress</button></li>
                            <li><button onClick={() => handleStatusChange(request._id, 'done')}>Done</button></li>
                            <li><button onClick={() => handleStatusChange(request._id, 'canceled')}>Canceled</button></li>
                          </ul>
                        </div>
                      )}

                      {/* Admin has full access */}
                      {isAdmin && (
                        <>
                          <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-sm btn-warning text-white">
                              Status
                            </div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40">
                              <li><button onClick={() => handleStatusChange(request._id, 'pending')}>Pending</button></li>
                              <li><button onClick={() => handleStatusChange(request._id, 'inprogress')}>In Progress</button></li>
                              <li><button onClick={() => handleStatusChange(request._id, 'done')}>Done</button></li>
                              <li><button onClick={() => handleStatusChange(request._id, 'canceled')}>Canceled</button></li>
                            </ul>
                          </div>
                          <button
                            onClick={() => handleDelete(request._id)}
                            className="btn btn-sm btn-error text-white"
                          >
                            <FaTrash />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center p-4">
            <div className="join">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`join-item btn ${currentPage === index + 1 ? 'btn-error text-white' : ''}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AllBloodDonationRequests;
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaBan, FaCheckCircle, FaUserShield, FaUserTie } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [statusFilter]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users`,
        {
          params: { status: statusFilter },
          withCredentials: true
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/${userId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      toast.success(`User ${newStatus === 'blocked' ? 'blocked' : 'unblocked'} successfully`);
      fetchUsers();
    } catch (error) {
      console.error('Status change error:', error);
      toast.error('Failed to update status');
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/${userId}/role`,
        { role: newRole },
        { withCredentials: true }
      );
      toast.success(`User role updated to ${newRole}`);
      fetchUsers();
    } catch (error) {
      console.error('Role change error:', error);
      toast.error('Failed to update role');
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
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <h1 className="text-3xl font-bold text-gray-800">All Users</h1>
        
        {/* Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="select select-bordered"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
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
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>Blood Group</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover">
                  <td>
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full">
                        <img src={user.avatar} alt={user.name} />
                      </div>
                    </div>
                  </td>
                  <td className="font-semibold">{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className="badge badge-error text-white">{user.bloodGroup}</span>
                  </td>
                  <td>
                    <span className={`badge ${
                      user.role === 'admin' ? 'badge-error' :
                      user.role === 'volunteer' ? 'badge-info' :
                      'badge-success'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="btn btn-sm btn-ghost">
                        ⋮
                      </div>
                      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        {/* Block/Unblock */}
                        {user.status === 'active' ? (
                          <li>
                            <button onClick={() => handleStatusChange(user._id, 'blocked')}>
                              <FaBan className="text-error" /> Block User
                            </button>
                          </li>
                        ) : (
                          <li>
                            <button onClick={() => handleStatusChange(user._id, 'active')}>
                              <FaCheckCircle className="text-success" /> Unblock User
                            </button>
                          </li>
                        )}
                        
                        {/* Make Volunteer */}
                        {user.role !== 'volunteer' && user.role !== 'admin' && (
                          <li>
                            <button onClick={() => handleRoleChange(user._id, 'volunteer')}>
                              <FaUserTie className="text-info" /> Make Volunteer
                            </button>
                          </li>
                        )}
                        
                        {/* Make Admin */}
                        {user.role !== 'admin' && (
                          <li>
                            <button onClick={() => handleRoleChange(user._id, 'admin')}>
                              <FaUserShield className="text-error" /> Make Admin
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {users.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No users found</p>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
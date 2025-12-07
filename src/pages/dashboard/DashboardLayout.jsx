import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { FaHome, FaUser, FaPlus, FaList, FaUsers, FaDonate, FaDollarSign, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = () => {
  const { userData } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const donorLinks = [
    { to: '/dashboard', icon: <FaHome />, label: 'Home', end: true },
    { to: '/dashboard/profile', icon: <FaUser />, label: 'Profile' },
    { to: '/dashboard/create-donation-request', icon: <FaPlus />, label: 'Create Request' },
    { to: '/dashboard/my-donation-requests', icon: <FaList />, label: 'My Requests' },
  ];

  const adminLinks = [
    { to: '/dashboard', icon: <FaHome />, label: 'Home', end: true },
    { to: '/dashboard/profile', icon: <FaUser />, label: 'Profile' },
    { to: '/dashboard/all-users', icon: <FaUsers />, label: 'All Users' },
    { to: '/dashboard/all-blood-donation-request', icon: <FaDonate />, label: 'All Requests' },
  ];

  const volunteerLinks = [
    { to: '/dashboard', icon: <FaHome />, label: 'Home', end: true },
    { to: '/dashboard/profile', icon: <FaUser />, label: 'Profile' },
    { to: '/dashboard/all-blood-donation-request', icon: <FaDonate />, label: 'All Requests' },
  ];

  const getLinks = () => {
    if (userData?.role === 'admin') return adminLinks;
    if (userData?.role === 'volunteer') return volunteerLinks;
    return donorLinks;
  };

  const links = getLinks();

  return (
    <div className="min-h-screen bg-base-200">
      <div className="flex">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed top-4 left-4 z-50 btn btn-circle btn-error text-white"
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Sidebar */}
        <AnimatePresence>
          {(sidebarOpen || window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
              className="fixed lg:sticky top-0 left-0 h-screen w-64 bg-white shadow-xl z-40 overflow-y-auto"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-error mb-2">🩸 Dashboard</h2>
                <p className="text-sm text-gray-600 capitalize">{userData?.role || 'User'}</p>
              </div>

              <nav className="px-4 pb-6">
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.to}>
                      <NavLink
                        to={link.to}
                        end={link.end}
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                            isActive
                              ? 'bg-error text-white shadow-lg'
                              : 'text-gray-700 hover:bg-red-50'
                          }`
                        }
                      >
                        <span className="text-xl">{link.icon}</span>
                        <span className="font-medium">{link.label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
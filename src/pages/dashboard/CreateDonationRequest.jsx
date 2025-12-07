import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { allDistricts, getUpazilasByDistrict, bloodGroups } from '../../utils/geoData';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CreateDonationRequest = () => {
  const { userData } = useAuth();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const selectedDistrict = watch('recipientDistrict');
  const upazilas = selectedDistrict ? getUpazilasByDistrict(selectedDistrict) : [];

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/donation-requests`,
        data,
        { withCredentials: true }
      );

      toast.success('Donation request created successfully!');
      navigate('/dashboard/my-donation-requests');
    } catch (error) {
      console.error('Create request error:', error);
      toast.error(error.response?.data?.message || 'Failed to create request');
    } finally {
      setLoading(false);
    }
  };

  if (userData?.status === 'blocked') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="alert alert-error">
          <span>Your account has been blocked. You cannot create donation requests.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Create Donation Request
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Requester Name (Read-only) */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Your Name</span>
              </label>
              <input
                type="text"
                value={userData?.name || ''}
                className="input input-bordered w-full bg-gray-100"
                disabled
              />
            </div>

            {/* Requester Email (Read-only) */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Your Email</span>
              </label>
              <input
                type="email"
                value={userData?.email || ''}
                className="input input-bordered w-full bg-gray-100"
                disabled
              />
            </div>

            {/* Recipient Name */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Recipient Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter recipient name"
                className="input input-bordered w-full"
                {...register('recipientName', { required: 'Recipient name is required' })}
              />
              {errors.recipientName && (
                <span className="text-error text-sm mt-1">{errors.recipientName.message}</span>
              )}
            </div>

            {/* Blood Group */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Blood Group</span>
              </label>
              <select
                className="select select-bordered w-full"
                {...register('bloodGroup', { required: 'Blood group is required' })}
              >
                <option value="">Select blood group</option>
                {bloodGroups.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
              {errors.bloodGroup && (
                <span className="text-error text-sm mt-1">{errors.bloodGroup.message}</span>
              )}
            </div>

            {/* Recipient District */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Recipient District</span>
              </label>
              <select
                className="select select-bordered w-full"
                {...register('recipientDistrict', { required: 'District is required' })}
              >
                <option value="">Select district</option>
                {allDistricts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
              {errors.recipientDistrict && (
                <span className="text-error text-sm mt-1">{errors.recipientDistrict.message}</span>
              )}
            </div>

            {/* Recipient Upazila */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Recipient Upazila</span>
              </label>
              <select
                className="select select-bordered w-full"
                disabled={!selectedDistrict}
                {...register('recipientUpazila', { required: 'Upazila is required' })}
              >
                <option value="">Select upazila</option>
                {upazilas.map(upazila => (
                  <option key={upazila} value={upazila}>{upazila}</option>
                ))}
              </select>
              {errors.recipientUpazila && (
                <span className="text-error text-sm mt-1">{errors.recipientUpazila.message}</span>
              )}
            </div>

            {/* Hospital Name */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Hospital Name</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Dhaka Medical College Hospital"
                className="input input-bordered w-full"
                {...register('hospitalName', { required: 'Hospital name is required' })}
              />
              {errors.hospitalName && (
                <span className="text-error text-sm mt-1">{errors.hospitalName.message}</span>
              )}
            </div>

            {/* Full Address */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Full Address</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Zahir Raihan Rd, Dhaka"
                className="input input-bordered w-full"
                {...register('fullAddress', { required: 'Full address is required' })}
              />
              {errors.fullAddress && (
                <span className="text-error text-sm mt-1">{errors.fullAddress.message}</span>
              )}
            </div>

            {/* Donation Date */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Donation Date</span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full"
                {...register('donationDate', { required: 'Donation date is required' })}
              />
              {errors.donationDate && (
                <span className="text-error text-sm mt-1">{errors.donationDate.message}</span>
              )}
            </div>

            {/* Donation Time */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Donation Time</span>
              </label>
              <input
                type="time"
                className="input input-bordered w-full"
                {...register('donationTime', { required: 'Donation time is required' })}
              />
              {errors.donationTime && (
                <span className="text-error text-sm mt-1">{errors.donationTime.message}</span>
              )}
            </div>
          </div>

          {/* Request Message */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Request Message</span>
            </label>
            <textarea
              placeholder="Explain why you need blood donation..."
              className="textarea textarea-bordered h-32 w-full"
              {...register('requestMessage', { required: 'Request message is required' })}
            />
            {errors.requestMessage && (
              <span className="text-error text-sm mt-1">{errors.requestMessage.message}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-error text-white w-full"
            disabled={loading}
          >
            {loading ? <span className="loading loading-spinner"></span> : 'Create Request'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateDonationRequest;
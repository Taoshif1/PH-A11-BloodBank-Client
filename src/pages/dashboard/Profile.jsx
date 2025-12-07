import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { allDistricts, getUpazilasByDistrict, bloodGroups } from '../../utils/geoData';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaEdit, FaSave } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Profile = () => {
  const { userData, fetchUserData } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();

  const selectedDistrict = watch('district');
  const upazilas = selectedDistrict ? getUpazilasByDistrict(selectedDistrict) : [];

  useEffect(() => {
    if (userData) {
      setValue('name', userData.name);
      setValue('email', userData.email);
      setValue('bloodGroup', userData.bloodGroup);
      setValue('district', userData.district);
      setValue('upazila', userData.upazila);
    }
  }, [userData, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let avatarUrl = userData.avatar;

      // Upload new avatar if provided
      if (data.avatar && data.avatar[0]) {
        const imageFile = data.avatar[0];
        const formData = new FormData();
        formData.append('image', imageFile);

        const imgbbResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
          formData
        );
        avatarUrl = imgbbResponse.data.data.display_url;
      }

      // Update profile
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/profile`,
        {
          name: data.name,
          avatar: avatarUrl,
          bloodGroup: data.bloodGroup,
          district: data.district,
          upazila: data.upazila
        },
        { withCredentials: true }
      );

      toast.success('Profile updated successfully!');
      await fetchUserData();
      setIsEditing(false);
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-pink-500 p-8 text-white">
          <div className="flex items-center gap-6">
            <div className="avatar">
              <div className="w-24 h-24 rounded-full ring ring-white ring-offset-2">
                <img src={userData?.avatar} alt={userData?.name} />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{userData?.name}</h1>
              <p className="text-lg opacity-90">{userData?.email}</p>
              <span className="badge badge-lg bg-white text-error mt-2">
                {userData?.role?.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-error btn-sm text-white gap-2"
              >
                <FaEdit /> Edit Profile
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                className="btn btn-ghost btn-sm"
              >
                Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Full Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  disabled={!isEditing}
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <span className="text-error text-sm">{errors.name.message}</span>}
              </div>

              {/* Email (Read-only) */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full bg-gray-100"
                  disabled
                  {...register('email')}
                />
              </div>

              {/* Blood Group */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Blood Group</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  disabled={!isEditing}
                  {...register('bloodGroup', { required: 'Blood group is required' })}
                >
                  <option value="">Select blood group</option>
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              {/* District */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">District</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  disabled={!isEditing}
                  {...register('district', { required: 'District is required' })}
                >
                  <option value="">Select district</option>
                  {allDistricts.map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>

              {/* Upazila */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Upazila</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  disabled={!isEditing || !selectedDistrict}
                  {...register('upazila', { required: 'Upazila is required' })}
                >
                  <option value="">Select upazila</option>
                  {upazilas.map(upazila => (
                    <option key={upazila} value={upazila}>{upazila}</option>
                  ))}
                </select>
              </div>

              {/* Avatar Upload */}
              {isEditing && (
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">Update Profile Picture</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered w-full"
                    {...register('avatar')}
                  />
                </div>
              )}
            </div>

            {isEditing && (
              <button
                type="submit"
                className="btn btn-error text-white w-full gap-2"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>
                    <FaSave /> Save Changes
                  </>
                )}
              </button>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
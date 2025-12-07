import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import { allDistricts, getUpazilasByDistrict, bloodGroups } from '../utils/geoData';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const selectedDistrict = watch('district');
  const upazilas = selectedDistrict ? getUpazilasByDistrict(selectedDistrict) : [];

  const onSubmit = async (data) => {
    setLoading(true);

    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match!');
      setLoading(false);
      return;
    }

    try {
      const imageFile = data.avatar[0];
      const formData = new FormData();
      formData.append('image', imageFile);

      const imgbbResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
      );

      const avatarUrl = imgbbResponse.data.data.display_url;

      await createUser(data.email, data.password);
      await updateUserProfile(data.name, avatarUrl);

      const userData = {
        email: data.email,
        name: data.name,
        avatar: avatarUrl,
        bloodGroup: data.bloodGroup,
        district: data.district,
        upazila: data.upazila,
        password: data.password
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, userData, {
        withCredentials: true
      });

      toast.success('Registration successful!');
      reset();
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-12 px-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Register as a <span className="text-error">Donor</span>
          </h2>
          <p className="text-center text-gray-600 mb-8">Join our life-saving community</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="input input-bordered w-full"
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <span className="text-error text-sm mt-1">{errors.name.message}</span>}
              </div>

              {/* Email */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email'
                    }
                  })}
                />
                {errors.email && <span className="text-error text-sm mt-1">{errors.email.message}</span>}
              </div>
            </div>

            {/* Avatar */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Profile Picture</span>
              </label>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                {...register('avatar', { required: 'Profile picture is required' })}
              />
              {errors.avatar && <span className="text-error text-sm mt-1">{errors.avatar.message}</span>}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
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
                {errors.bloodGroup && <span className="text-error text-sm mt-1">{errors.bloodGroup.message}</span>}
              </div>

              {/* District */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">District</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  {...register('district', { required: 'District is required' })}
                >
                  <option value="">Select district</option>
                  {allDistricts.map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
                {errors.district && <span className="text-error text-sm mt-1">{errors.district.message}</span>}
              </div>
            </div>

            {/* Upazila */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Upazila</span>
              </label>
              <select
                className="select select-bordered w-full"
                {...register('upazila', { required: 'Upazila is required' })}
                disabled={!selectedDistrict}
              >
                <option value="">Select upazila</option>
                {upazilas.map(upazila => (
                  <option key={upazila} value={upazila}>{upazila}</option>
                ))}
              </select>
              {errors.upazila && <span className="text-error text-sm mt-1">{errors.upazila.message}</span>}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Password */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    className="input input-bordered w-full pr-10"
                    {...register('password', { 
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Min 6 characters' }
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && <span className="text-error text-sm mt-1">{errors.password.message}</span>}
              </div>

              {/* Confirm Password */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Confirm Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm password"
                    className="input input-bordered w-full pr-10"
                    {...register('confirmPassword', { required: 'Please confirm password' })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && <span className="text-error text-sm mt-1">{errors.confirmPassword.message}</span>}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-error text-white w-full mt-6"
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner"></span> : 'Register'}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-error font-semibold hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
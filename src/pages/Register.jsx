import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import { allDistricts, getUpazilasByDistrict, bloodGroups } from '../utils/geoData';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { auth } from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const { createUser: registerInBackend } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const selectedDistrict = watch('district');
  const upazilas = selectedDistrict ? getUpazilasByDistrict(selectedDistrict) : [];

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      // Validate passwords match
      if (data.password !== data.confirmPassword) {
        toast.error('Passwords do not match!');
        setLoading(false);
        return;
      }

      // Step 1: Upload avatar to ImgBB (optional)
      let avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=dc2626&color=fff`;
      
      if (data.avatar && data.avatar[0]) {
        try {
          const imageFile = data.avatar[0];
          const formData = new FormData();
          formData.append('image', imageFile);

          const imgbbResponse = await axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
            formData
          );

          avatarUrl = imgbbResponse.data.data.display_url;
          console.log('✅ Avatar uploaded:', avatarUrl);
        } catch (imgError) {
          console.warn('⚠️  ImgBB upload failed, using default avatar:', imgError.message);
        }
      }

      // Step 2: Create Firebase user
      console.log('📝 Creating Firebase user for:', data.email);
      const firebaseUser = await createUserWithEmailAndPassword(
        auth,
        data.email.trim().toLowerCase(),
        data.password
      );

      // Step 3: Update Firebase profile
      console.log('📝 Updating Firebase profile...');
      await updateProfile(firebaseUser.user, {
        displayName: data.name.trim(),
        photoURL: avatarUrl
      });

      console.log('✅ Firebase user created:', firebaseUser.user.email);

      // Step 4: Register in backend (MongoDB)
      const userData = {
        email: data.email.trim().toLowerCase(),
        name: data.name.trim(),
        avatar: avatarUrl,
        bloodGroup: data.bloodGroup.trim(),
        district: data.district.trim(),
        upazila: data.upazila.trim(),
        password: data.password
      };

      console.log('📝 Registering in backend with data:', userData);

      const response = await registerInBackend(userData);

      console.log('✅ Backend registration successful:', response);

      toast.success('Registration successful! Welcome to Blood Donation Community 🩸');
      reset();
      
      // Redirect after short delay
      setTimeout(() => {
        navigate('/');
      }, 1500);

    } catch (error) {
      console.error('❌ Registration error:', error);
      
      // Handle Firebase specific errors
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Email already exists! Please use a different email.');
      } else if (error.code === 'auth/weak-password') {
        toast.error('Password is too weak. Use at least 6 characters.');
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Invalid email address.');
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message || 'Registration failed');
      }
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
                      message: 'Invalid email format'
                    }
                  })}
                />
                {errors.email && <span className="text-error text-sm mt-1">{errors.email.message}</span>}
              </div>
            </div>

            {/* Avatar */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Profile Picture (Optional)</span>
              </label>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                {...register('avatar')}
              />
              <p className="text-gray-500 text-sm mt-1">If not provided, a default avatar will be generated</p>
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
                    placeholder="Enter password (min 6 chars)"
                    className="input input-bordered w-full pr-10"
                    {...register('password', { 
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Min 6 characters required' }
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
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
                    placeholder="Confirm your password"
                    className="input input-bordered w-full pr-10"
                    {...register('confirmPassword', { required: 'Please confirm your password' })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
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
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Registering...
                </>
              ) : (
                'Register'
              )}
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
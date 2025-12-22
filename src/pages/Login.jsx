import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { auth } from '../firebase/firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { loginUser: loginInBackend } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const email = data.email.trim().toLowerCase();

      console.log('📝 Logging in with email:', email);

      // Step 1: Login with Firebase
      console.log('🔐 Authenticating with Firebase...');
      const firebaseUser = await signInWithEmailAndPassword(auth, email, data.password);
      console.log('✅ Firebase login successful:', firebaseUser.user.email);

      // Step 2: Login with backend (get JWT token)
      console.log('📝 Authenticating with backend...');
      const response = await loginInBackend(email, data.password);
      console.log('✅ Backend login successful:', response);

      toast.success('Login successful!');
      navigate(from, { replace: true });

    } catch (error) {
      console.error('❌ Login error:', error);

      // Handle Firebase specific errors
      if (error.code === 'auth/user-not-found') {
        toast.error('User not found. Please register first.');
      } else if (error.code === 'auth/wrong-password') {
        toast.error('Invalid password. Please try again.');
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Invalid email address.');
      } else if (error.code === 'auth/user-disabled') {
        toast.error('User account is disabled.');
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message || 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center py-12">
      <div className="max-w-md w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Welcome <span className="text-error">Back!</span>
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div className="form-control">
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
                    message: 'Invalid email address'
                  }
                })}
              />
              {errors.email && <span className="text-error text-sm mt-1">{errors.email.message}</span>}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  className="input input-bordered w-full pr-10"
                  {...register('password', { required: 'Password is required' })}
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

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-error text-white w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-error font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
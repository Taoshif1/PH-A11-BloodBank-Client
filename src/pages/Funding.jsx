import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import { FaDollarSign, FaCalendar, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Load Stripe (replace with my publishable key)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
console.log(stripePromise)

const CheckoutForm = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !amount || parseFloat(amount) < 0.5) {
      toast.error('Please enter a valid amount (minimum $0.50)');
      return;
    }

    setLoading(true);

    try {
      // Create payment intent
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/funding/create-payment-intent`,
        { amount: Math.round(parseFloat(amount) * 100) }, // Convert to cents
        { withCredentials: true }
      );

      const { clientSecret } = data;

      // Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          // Save funding record
          await axios.post(
            `${import.meta.env.VITE_API_URL}/funding`,
            {
              amount: parseFloat(amount),
              transactionId: result.paymentIntent.id,
            },
            { withCredentials: true }
          );

          toast.success('Thank you for your contribution!');
          setAmount('');
          elements.getElement(CardElement).clear();
          onSuccess();
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-semibold">Amount (USD)</span>
        </label>
        <input
          type="number"
          step="0.01"
          min="0.50"
          placeholder="Enter amount (min $0.50)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input input-bordered w-full"
          required
        />
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-semibold">Card Details</span>
        </label>
        <div className="border border-gray-300 rounded-lg p-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
        <label className="label">
          <span className="label-text-alt text-gray-500">
            Test card: 4242 4242 4242 4242, any future date, any CVC
          </span>
        </label>
      </div>

      <button
        type="submit"
        className="btn btn-error text-white w-full"
        disabled={!stripe || loading}
      >
        {loading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          `Donate $${amount || '0.00'}`
        )}
      </button>
    </form>
  );
};

const Funding = () => {
  const [fundings, setFundings] = useState([]);
  const [totalFunding, setTotalFunding] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchFundings();
  }, []);

  const fetchFundings = async () => {
    setLoading(true);
    try {
      const [fundingsRes, totalRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/funding`),
        axios.get(`${import.meta.env.VITE_API_URL}/funding/total`)
      ]);

      setFundings(fundingsRes.data);
      setTotalFunding(totalRes.data.totalFunding);
    } catch (error) {
      console.error('Error fetching fundings:', error);
      toast.error('Failed to fetch funding data');
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    setShowModal(false);
    fetchFundings();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-error"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Support Our Mission
          </h1>
          <p className="text-lg text-gray-600">
            Help us save more lives by contributing to our organization
          </p>
        </motion.div>

        {/* Total Funding Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-xl p-8 mb-12 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg opacity-90 mb-2">Total Funds Raised</p>
              <h2 className="text-5xl font-bold">${totalFunding.toFixed(2)}</h2>
            </div>
            <FaDollarSign className="text-6xl opacity-50" />
          </div>
        </motion.div>

        {/* Give Fund Button */}
        <div className="text-center mb-12">
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-error text-white btn-lg gap-2"
          >
            <FaDollarSign /> Give Fund
          </button>
        </div>

        {/* Funding History */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-6 bg-gray-50 border-b">
            <h2 className="text-2xl font-bold text-gray-800">Funding History</h2>
          </div>

          {fundings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No funding records yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th>Donor</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Transaction ID</th>
                  </tr>
                </thead>
                <tbody>
                  {fundings.map((funding) => (
                    <tr key={funding._id} className="hover">
                      <td>
                        <div className="flex items-center gap-2">
                          <FaUser className="text-error" />
                          <div>
                            <div className="font-semibold">{funding.userName}</div>
                            <div className="text-sm text-gray-500">{funding.userEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-success text-white font-bold">
                          ${funding.amount.toFixed(2)}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <FaCalendar className="text-gray-400" />
                          {new Date(funding.fundingDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {funding.transactionId}
                        </code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>

      {/* Payment Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-md">
            <h3 className="font-bold text-2xl mb-6 text-center">Make a Contribution</h3>
            <Elements stripe={stripePromise}>
              <CheckoutForm onSuccess={handleSuccess} />
            </Elements>
            <div className="modal-action">
              <button onClick={() => setShowModal(false)} className="btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Funding;
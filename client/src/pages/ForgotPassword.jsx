import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { forgotPassword } from '../services/api';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await forgotPassword({ email });
      toast.success(res.data.message);
      localStorage.setItem('notelock_temp_userId', res.data.userId);
      navigate('/reset-password');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send reset code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-indigo-100 rounded-full text-indigo-600 mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
          <p className="text-gray-500 mt-2 text-center">Enter your email and we'll send you a reset code.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all disabled:opacity-70"
          >
            {loading ? 'Sending Code...' : 'Send Reset Code'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Remembered your password? <Link to="/login" className="font-semibold text-indigo-600 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;

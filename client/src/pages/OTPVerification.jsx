import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound } from 'lucide-react';
import { verifyOTP } from '../services/api';

const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    const userId = localStorage.getItem('notelock_temp_userId');

    if (!userId) {
      return setError('Session expired. Please login again.');
    }

    setLoading(true);

    try {
      const res = await verifyOTP({ userId, otp });
      // Login success
      localStorage.removeItem('notelock_temp_userId');
      localStorage.setItem('notelock_user', JSON.stringify(res.data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-indigo-100 rounded-full text-indigo-600 mb-4">
            <KeyRound className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Verify OTP</h2>
          <p className="text-gray-500 mt-2 text-center">We've sent a 6-digit code to your email. Enter it below to continue.</p>
        </div>

        {error && <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}

        <form onSubmit={handleVerify} className="space-y-5">
          <div>
            <input 
              type="text" 
              required 
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 text-center text-2xl tracking-[0.5em] border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="000000"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all disabled:opacity-70"
          >
            {loading ? 'Verifying...' : 'Verify & Proceed'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;

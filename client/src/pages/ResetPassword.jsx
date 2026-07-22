import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound } from 'lucide-react';
import { resetPassword } from '../services/api';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('notelock_temp_userId');

    if (!userId) {
      toast.error('Session expired. Please restart the process.');
      navigate('/forgot-password');
      return;
    }

    setLoading(true);

    try {
      const res = await resetPassword({ userId, otp, newPassword });
      toast.success(res.data.message);
      localStorage.removeItem('notelock_temp_userId');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Reset failed. Please try again.');
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
          <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
          <p className="text-gray-500 mt-2 text-center">Enter the code sent to your email and your new password.</p>
        </div>

        <form onSubmit={handleReset} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">6-Digit Reset Code</label>
            <input 
              type="text" 
              required 
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 text-center tracking-[0.3em] border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="000000"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">New Password</label>
            <input 
              type="password" 
              required 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all disabled:opacity-70"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { signup } from '../services/api';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);

    try {
      await signup({ name, email, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl my-8">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-indigo-100 rounded-full text-indigo-600 mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-500 mt-2">Start securing your digital life today</p>
        </div>

        {error && <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
            <input 
              type="text" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="John Doe"
            />
          </div>
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
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Confirm Password</label>
            <input 
              type="password" 
              required 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all disabled:opacity-70"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account? <Link to="/login" className="font-semibold text-indigo-600 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

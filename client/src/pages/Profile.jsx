import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { User, Mail, ShieldCheck } from 'lucide-react';
import { updateProfile } from '../services/api';
import toast from 'react-hot-toast';

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('notelock_user')));
  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await updateProfile({ name, password: password || undefined });
      toast.success('Profile updated successfully!');
      
      const updatedUser = { ...user, name: res.data.name, token: res.data.token };
      localStorage.setItem('notelock_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setPassword(''); // Clear password field
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sidebar>
      <div className="p-8 max-w-2xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-500 mt-1">Manage your account settings</p>
        </header>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-indigo-600 h-32 relative">
            <div className="absolute inset-0 bg-black opacity-10"></div>
          </div>
          <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-12 mb-6">
              <div className="w-24 h-24 bg-white rounded-full p-1 shadow-lg">
                <div className="w-full h-full bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-4xl font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>

            <form onSubmit={handleUpdate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Email Address (Read-only)</label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-600">{user?.email}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="flex items-center gap-3 relative">
                  <User className="w-5 h-5 text-gray-400 absolute left-3" />
                  <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password (Optional)</label>
                <div className="flex items-center gap-3 relative">
                  <ShieldCheck className="w-5 h-5 text-gray-400 absolute left-3" />
                  <input 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Leave blank to keep current password"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-70"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Profile;

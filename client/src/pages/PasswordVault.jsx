import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getPasswords, addPassword, updatePassword, deletePassword } from '../services/api';
import { Plus, Search, Copy, Edit, Trash2, Eye, EyeOff, Star, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

const PasswordVault = () => {
  const [passwords, setPasswords] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [strength, setStrength] = useState({ label: '', color: 'bg-gray-200' });
  const [formData, setFormData] = useState({
    id: null, websiteName: '', websiteURL: '', username: '', email: '', password: '', category: 'Others', notes: '', favorite: false
  });

  const fetchPasswords = async () => {
    try {
      const res = await getPasswords();
      setPasswords(res.data);
    } catch (err) {
      toast.error('Failed to fetch passwords');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFavorite = async (pwd) => {
    try {
      await updatePassword(pwd._id, { favorite: !pwd.favorite });
      fetchPasswords();
      toast.success(pwd.favorite ? 'Removed from favorites' : 'Added to favorites');
    } catch (err) {
      toast.error('Failed to update favorite status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this password?')) {
      try {
        await deletePassword(id);
        fetchPasswords();
        toast.success('Password deleted');
      } catch (err) {
        toast.error('Failed to delete password');
      }
    }
  };

  const openModal = (pwd = null) => {
    if (pwd) {
      setFormData({
        id: pwd._id, websiteName: pwd.websiteName, websiteURL: pwd.websiteURL,
        username: pwd.username, email: pwd.email, password: pwd.password,
        category: pwd.category, notes: pwd.notes, favorite: pwd.favorite
      });
      calculateStrength(pwd.password);
    } else {
      setFormData({
        id: null, websiteName: '', websiteURL: '', username: '', email: '', password: '', category: 'Others', notes: '', favorite: false
      });
      setStrength({ label: '', color: 'bg-gray-200' });
    }
    setIsModalOpen(true);
  };

  const calculateStrength = (pwd) => {
    if (!pwd) {
      setStrength({ label: '', color: 'bg-gray-200' });
      return;
    }
    let score = 0;
    if (pwd.length > 8) score += 1;
    if (pwd.length > 12) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score < 3) setStrength({ label: 'Weak', color: 'bg-red-500' });
    else if (score < 5) setStrength({ label: 'Medium', color: 'bg-yellow-500' });
    else setStrength({ label: 'Strong', color: 'bg-green-500' });
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setFormData({ ...formData, password: pwd });
    calculateStrength(pwd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await updatePassword(formData.id, formData);
        toast.success('Password updated successfully');
      } else {
        await addPassword(formData);
        toast.success('Password added successfully');
      }
      setIsModalOpen(false);
      fetchPasswords();
    } catch (err) {
      toast.error('Failed to save password');
    }
  };

  // Extract domain for favicon
  const getFaviconUrl = (url) => {
    try {
      const domain = new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
      return `https://s2.googleusercontent.com/s2/favicons?domain=${domain}&sz=64`;
    } catch (e) {
      return null;
    }
  };

  const filteredPasswords = passwords.filter(p => {
    const matchesSearch = p.websiteName.toLowerCase().includes(search.toLowerCase()) || p.username.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const categories = ['All', 'Social', 'Banking', 'Shopping', 'Education', 'Entertainment', 'Work', 'Others'];

  return (
    <Sidebar>
      <div className="p-8">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Password Vault</h1>
            <p className="text-gray-500 mt-1">Manage your saved credentials</p>
          </div>
          <button 
            onClick={() => openModal()}
            className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Password
          </button>
        </header>

        <div className="mb-6 flex gap-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search passwords..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div className="relative w-48 shrink-0">
            <Filter className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none appearance-none bg-white cursor-pointer"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-200">
                  <th className="px-6 py-4 font-medium">Website</th>
                  <th className="px-6 py-4 font-medium">Username</th>
                  <th className="px-6 py-4 font-medium">Password</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPasswords.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                      No passwords found. Add one to get started!
                    </td>
                  </tr>
                ) : filteredPasswords.map((pwd) => (
                  <tr key={pwd._id} className="border-b border-gray-100 hover:bg-gray-50 group transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-gray-100 border border-gray-200 shrink-0">
                        {pwd.websiteURL && getFaviconUrl(pwd.websiteURL) ? (
                          <img src={getFaviconUrl(pwd.websiteURL)} alt="favicon" className="w-5 h-5 object-contain" onError={(e) => e.target.style.display='none'} />
                        ) : (
                          <span className="text-gray-400 text-xs font-bold">{pwd.websiteName.charAt(0).toUpperCase()}</span>
                        )}
                      </div>
                      <div>
                        {pwd.websiteURL ? (
                          <a 
                            href={pwd.websiteURL.startsWith('http') ? pwd.websiteURL : `https://${pwd.websiteURL}`}
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="font-medium text-indigo-600 hover:text-indigo-800 hover:underline transition-colors block truncate"
                            title={`Visit ${pwd.websiteName}`}
                          >
                            {pwd.websiteName}
                          </a>
                        ) : (
                          <p className="font-medium text-gray-900">{pwd.websiteName}</p>
                        )}
                        <p className="text-xs text-gray-500">{pwd.category}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        {pwd.username || pwd.email}
                        <button onClick={() => handleCopy(pwd.username || pwd.email)} className="text-gray-400 hover:text-gray-600 hidden group-hover:block" title="Copy Username">
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm tracking-wider text-gray-800">
                          {visiblePasswords[pwd._id] ? pwd.password : '••••••••'}
                        </span>
                        <button onClick={() => togglePasswordVisibility(pwd._id)} className="text-gray-400 hover:text-gray-600">
                          {visiblePasswords[pwd._id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button onClick={() => handleCopy(pwd.password)} className="text-gray-400 hover:text-gray-600 hidden group-hover:block" title="Copy Password">
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => toggleFavorite(pwd)} className={`${pwd.favorite ? 'text-yellow-500' : 'text-gray-300'} hover:text-yellow-500 transition-colors`} title="Toggle Favorite">
                          <Star className="w-5 h-5 fill-current" />
                        </button>
                        <button onClick={() => openModal(pwd)} className="text-gray-400 hover:text-indigo-600 p-2 transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(pwd._id)} className="text-gray-400 hover:text-red-600 p-2 transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold">{formData.id ? 'Edit Password' : 'Add Password'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website Name</label>
                <input required type="text" value={formData.websiteName} onChange={e => setFormData({...formData, websiteName: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="GitHub" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                <input required type="url" value={formData.websiteURL} onChange={e => setFormData({...formData, websiteURL: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="https://github.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input type="text" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex justify-between">
                  <span>Password</span>
                  {strength.label && <span className={`text-xs font-bold ${strength.color.replace('bg-', 'text-')}`}>{strength.label}</span>}
                </label>
                <input required type="text" value={formData.password} onChange={handlePasswordChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none mb-1" />
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden flex gap-0.5">
                  <div className={`h-full ${strength.color} transition-all duration-300 w-1/3 ${strength.label ? 'opacity-100' : 'opacity-0'}`}></div>
                  <div className={`h-full ${strength.color} transition-all duration-300 w-1/3 ${(strength.label === 'Medium' || strength.label === 'Strong') ? 'opacity-100' : 'opacity-0'}`}></div>
                  <div className={`h-full ${strength.color} transition-all duration-300 w-1/3 ${strength.label === 'Strong' ? 'opacity-100' : 'opacity-0'}`}></div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                  {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Sidebar>
  );
};

export default PasswordVault;

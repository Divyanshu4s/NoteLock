import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Key, FileText, Settings2, LogOut, User } from 'lucide-react';

const Sidebar = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('notelock_user');
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Password Vault', path: '/vault', icon: Key },
    { name: 'Secure Notes', path: '/notes', icon: FileText },
    { name: 'Generator', path: '/generator', icon: Settings2 },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
            <Key className="w-6 h-6" /> NoteLock
          </h2>
        </div>
        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-700 font-semibold' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-3 w-full rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Sidebar;

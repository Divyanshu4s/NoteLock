import { Link } from 'react-router-dom';
import { Shield, Key, FileText, Globe } from 'lucide-react';

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 bg-white shadow-sm">
        <div className="flex items-center gap-2 text-2xl font-bold text-indigo-600">
          <Shield className="w-8 h-8" />
          NoteLock
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="px-4 py-2 font-semibold text-indigo-600 hover:text-indigo-800">Login</Link>
          <Link to="/signup" className="px-4 py-2 font-semibold text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700">Sign Up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-1 px-4 text-center">
        <h1 className="max-w-4xl mb-6 text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          Secure your digital life with <span className="text-indigo-600">NoteLock</span>
        </h1>
        <p className="max-w-2xl mb-10 text-xl text-gray-600">
          A production-quality manager for your passwords and private notes. Featuring 2FA, a built-in generator, and a Chrome extension for seamless autofill.
        </p>
        <div className="flex gap-4">
          <Link to="/signup" className="px-8 py-4 text-lg font-semibold text-white transition-colors shadow-lg bg-indigo-600 rounded-xl hover:bg-indigo-700 hover:shadow-xl">
            Get Started for Free
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-6xl w-full">
          <div className="flex flex-col items-center p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <div className="p-4 mb-4 bg-indigo-50 rounded-full text-indigo-600">
              <Key className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Password Vault</h3>
            <p className="text-gray-600 text-center">Store all your passwords securely in one place. Categorize and favorite your most used accounts.</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <div className="p-4 mb-4 bg-indigo-50 rounded-full text-indigo-600">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Notes</h3>
            <p className="text-gray-600 text-center">Keep your private thoughts, software keys, and sensitive text safely locked away.</p>
          </div>

          <div className="flex flex-col items-center p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <div className="p-4 mb-4 bg-indigo-50 rounded-full text-indigo-600">
              <Globe className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Chrome Extension</h3>
            <p className="text-gray-600 text-center">Automatically save new logins and autofill passwords directly from your browser.</p>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-gray-500 bg-white">
        <p>&copy; 2026 NoteLock. Built as a College Final Year Project.</p>
      </footer>
    </div>
  );
};

export default Landing;

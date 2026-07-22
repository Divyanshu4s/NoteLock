import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Key, FileText, Star, AlertTriangle } from 'lucide-react';
import { getPasswords, getNotes } from '../services/api';

const Dashboard = () => {
  const [passwords, setPasswords] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('notelock_user'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pwRes, noteRes] = await Promise.all([getPasswords(), getNotes()]);
        setPasswords(pwRes.data);
        setNotes(noteRes.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalPasswords = passwords.length;
  const totalNotes = notes.length;
  const favorites = passwords.filter(p => p.favorite).length;
  
  // Very basic weak password check (less than 8 chars or no numbers/special chars)
  const weakPasswordsList = passwords.filter(p => {
    const pw = p.password;
    return pw.length < 8 || !/\d/.test(pw) || !/[!@#$%^&*]/.test(pw);
  });
  const weakPasswords = weakPasswordsList.length;

  if (loading) {
    return (
      <Sidebar>
        <div className="flex items-center justify-center h-full">
          <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <div className="p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name?.split(' ')[0]}!</h1>
          <p className="text-gray-500 mt-1">Here is a summary of your secure vault.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Passwords</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{totalPasswords}</p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
              <Key className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Secure Notes</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{totalNotes}</p>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-full">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Favorites</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{favorites}</p>
            </div>
            <div className="p-3 bg-yellow-50 text-yellow-600 rounded-full">
              <Star className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Weak Passwords</p>
              <p className="text-3xl font-bold text-red-600 mt-1">{weakPasswords}</p>
            </div>
            <div className="p-3 bg-red-50 text-red-600 rounded-full">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
        </div>

        {weakPasswords > 0 && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-600 shrink-0" />
            <div>
              <h4 className="text-red-800 font-semibold">Security Warning</h4>
              <p className="text-red-600 mt-1 text-sm">
                You have {weakPasswords} weak {weakPasswords === 1 ? 'password' : 'passwords'} in your vault. 
                We recommend updating them using our password generator.
              </p>
              <ul className="mt-2 list-disc list-inside text-sm text-red-700 font-medium">
                {weakPasswordsList.map(p => (
                  <li key={p._id}>{p.websiteName} ({p.username})</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Sidebar>
  );
};

export default Dashboard;

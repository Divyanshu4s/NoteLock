import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import OTPVerification from './pages/OTPVerification';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import PasswordVault from './pages/PasswordVault';
import SecureNotes from './pages/SecureNotes';
import PasswordGenerator from './pages/PasswordGenerator';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<OTPVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vault" element={<PasswordVault />} />
            <Route path="/notes" element={<SecureNotes />} />
            <Route path="/generator" element={<PasswordGenerator />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

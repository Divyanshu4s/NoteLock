const User = require('../models/User');
const OTP = require('../models/OTP');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/emailService');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Generate 6 digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please add all fields' });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      passwordHash: password, // Pre-save hook will hash it
      isVerified: false
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        message: 'Registration successful. Please login to receive OTP.'
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Authenticate a user & send OTP
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      // Generate OTP
      const otpCode = generateOTP();
      
      // Save OTP to DB (valid for 10 minutes)
      await OTP.create({
        userId: user._id,
        otp: otpCode,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000)
      });

      // Send Email
      try {
        await sendEmail({
          email: user.email,
          subject: 'NoteLock - Your OTP Verification Code',
          message: `Your login OTP is ${otpCode}. It will expire in 10 minutes.`
        });
        
        res.status(200).json({
          message: 'OTP sent to your email',
          userId: user._id
        });
      } catch (emailError) {
        console.error('Email error:', emailError);
        res.status(500).json({ message: 'Email could not be sent' });
      }
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify OTP & Login
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res.status(400).json({ message: 'Missing user ID or OTP' });
    }

    const otpRecord = await OTP.findOne({ userId, otp });

    if (otpRecord) {
      // Check expiration manually just in case
      if (otpRecord.expiresAt < new Date()) {
        await OTP.deleteOne({ _id: otpRecord._id });
        return res.status(400).json({ message: 'OTP has expired' });
      }

      // Mark user as verified if they weren't already
      const user = await User.findById(userId);
      if (!user.isVerified) {
        user.isVerified = true;
        await user.save();
      }

      // Delete the used OTP
      await OTP.deleteOne({ _id: otpRecord._id });

      res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Logout User
// @route   POST /api/auth/logout
// @access  Public
const logout = (req, res) => {
  // In a stateless JWT setup, logout is typically handled client-side by deleting the token.
  // Providing an endpoint for consistency or if we switch to cookies later.
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Forgot Password
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a reset token (OTP for simplicity in this flow)
    const resetCode = generateOTP();
    
    await OTP.create({
      userId: user._id,
      otp: resetCode,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 mins
    });

    try {
      await sendEmail({
        email: user.email,
        subject: 'NoteLock - Password Reset Code',
        message: `Your password reset code is ${resetCode}. It will expire in 15 minutes.`
      });
      
      res.status(200).json({ message: 'Password reset code sent to email', userId: user._id });
    } catch (emailError) {
      console.error('Email error:', emailError);
      res.status(500).json({ message: 'Email could not be sent' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reset Password
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = async (req, res) => {
  try {
    const { userId, otp, newPassword } = req.body;

    if (!userId || !otp || !newPassword) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    const otpRecord = await OTP.findOne({ userId, otp });

    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired reset code' });
    }

    if (otpRecord.expiresAt < new Date()) {
      await OTP.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({ message: 'Reset code has expired' });
    }

    const user = await User.findById(userId);
    user.passwordHash = newPassword; // Pre-save hook will hash this
    await user.save();

    await OTP.deleteOne({ _id: otpRecord._id });

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      
      if (req.body.password) {
        user.passwordHash = req.body.password; // Pre-save hook will hash it
      }

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        token: generateToken(updatedUser._id) // Issue new token in case we needed it
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signup,
  login,
  verifyOTP,
  logout,
  forgotPassword,
  resetPassword,
  updateProfile
};

const express = require('express');
const router = express.Router();
const { signup, login, verifyOTP, logout, forgotPassword, resetPassword, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per `window`
  message: { message: 'Too many login attempts from this IP, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/signup', signup);
router.post('/login', loginLimiter, login);
router.post('/verify-otp', verifyOTP);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.put('/profile', protect, updateProfile);

module.exports = router;

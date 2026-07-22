const Password = require('../models/Password');

// @desc    Save credentials from extension
// @route   POST /api/extension/save
// @access  Private
const saveFromExtension = async (req, res) => {
  try {
    const { websiteName, websiteURL, username, email, password } = req.body;

    // Optional: check if exact credential already exists to avoid duplicates
    const existing = await Password.findOne({
      userId: req.user._id,
      websiteURL,
      username
    });

    if (existing) {
      // Just update it if it exists
      existing.password = password;
      await existing.save();
      return res.status(200).json(existing);
    }

    const newPassword = await Password.create({
      userId: req.user._id,
      websiteName,
      websiteURL,
      username,
      email,
      password,
      category: 'Others',
      notes: 'Saved from Chrome Extension'
    });

    res.status(201).json(newPassword);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch credentials for autofill
// @route   GET /api/extension/fetch
// @access  Private
const fetchForExtension = async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ message: 'URL is required' });
    }

    // A simple URL match (in production, we'd want more robust domain parsing)
    // Here we use regex to match domains
    const domainMatch = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    const domain = domainMatch && domainMatch.length > 2 && typeof domainMatch[2] === 'string' 
      ? domainMatch[2] 
      : url;

    // Find any passwords that match this domain in their websiteURL
    const passwords = await Password.find({
      userId: req.user._id,
      websiteURL: { $regex: domain, $options: 'i' }
    });

    res.status(200).json(passwords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  saveFromExtension,
  fetchForExtension
};

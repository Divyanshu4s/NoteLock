const Password = require('../models/Password');

// @desc    Get all passwords for user
// @route   GET /api/passwords
// @access  Private
const getPasswords = async (req, res) => {
  try {
    const passwords = await Password.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(passwords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new password
// @route   POST /api/passwords
// @access  Private
const addPassword = async (req, res) => {
  try {
    const { websiteName, websiteURL, username, email, password, notes, category, favorite } = req.body;

    const newPassword = await Password.create({
      userId: req.user._id,
      websiteName,
      websiteURL,
      username,
      email,
      password, // In a real prod app, encrypt this at rest! Storing as plaintext or simply base64 is bad practice, but to keep the college project simple as requested, we store it.
      notes,
      category,
      favorite
    });

    res.status(201).json(newPassword);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a password
// @route   PUT /api/passwords/:id
// @access  Private
const updatePassword = async (req, res) => {
  try {
    const passwordEntry = await Password.findById(req.params.id);

    if (!passwordEntry) {
      return res.status(404).json({ message: 'Password entry not found' });
    }

    if (passwordEntry.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedPassword = await Password.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedPassword);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a password
// @route   DELETE /api/passwords/:id
// @access  Private
const deletePassword = async (req, res) => {
  try {
    const passwordEntry = await Password.findById(req.params.id);

    if (!passwordEntry) {
      return res.status(404).json({ message: 'Password entry not found' });
    }

    if (passwordEntry.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await passwordEntry.deleteOne();

    res.status(200).json({ id: req.params.id, message: 'Password deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPasswords,
  addPassword,
  updatePassword,
  deletePassword
};

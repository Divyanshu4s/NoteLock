const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  websiteName: {
    type: String,
    required: true
  },
  websiteURL: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: 'Others'
  },
  favorite: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Password', passwordSchema);

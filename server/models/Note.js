const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: 'Others'
  }
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);

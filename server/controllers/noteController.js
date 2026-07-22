const Note = require('../models/Note');

// @desc    Get all notes for user
// @route   GET /api/notes
// @access  Private
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new note
// @route   POST /api/notes
// @access  Private
const addNote = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    const newNote = await Note.create({
      userId: req.user._id,
      title,
      content,
      category
    });

    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await note.deleteOne();

    res.status(200).json({ id: req.params.id, message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getNotes,
  addNote,
  updateNote,
  deleteNote
};

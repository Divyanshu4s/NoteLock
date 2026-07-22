const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const { saveFromExtension, fetchForExtension } = require('../controllers/extensionController');

router.post('/save', protect, saveFromExtension);
router.get('/fetch', protect, fetchForExtension);

module.exports = router;

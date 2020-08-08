const express = require('express');

const auth = require('../utilities/authValidation');

const router = express.Router();
const classHandler = require('../controllers/class.controller');

// Create class
router.post('/', auth, async (req, res) => {
  classHandler.createClassHandler(req, res);
});

// Get class list
router.get('/', auth, async (req, res) => {
  classHandler.getClassListHandler(req, res);
});

// Get class
router.get('/:classId', auth, async (req, res) => {
  classHandler.getClassHandler(req, res);
});

// Update class
router.patch('/:classId', auth, async (req, res) => {
  classHandler.updateClassHandler(req, res);
});

// Delete class
router.delete('/:classId', auth, async (req, res) => {
  classHandler.deleteClassHandler(req, res);
});

module.exports = router;
const express = require('express');

const auth = require('../utilities/authValidation');

const router = express.Router();
const studentHandler = require('../controllers/student.controller');

// Create student
router.post('/', auth, async (req, res) => {
  studentHandler.createStudentHandler(req, res);
});

// Get student list
router.get('/', auth, async (req, res) => {
  studentHandler.getStudentListHandler(req, res);
});

// Get student
router.get('/:studentId', auth, async (req, res) => {
  studentHandler.getStudentHandler(req, res);
});

// Update student
router.patch('/:studentId', auth, async (req, res) => {
  studentHandler.updateStudentHandler(req, res);
});

// Delete student
router.delete('/:studentId', auth, async (req, res) => {
  studentHandler.deleteStudentHandler(req, res);
});

module.exports = router;
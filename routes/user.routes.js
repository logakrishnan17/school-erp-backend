const express = require('express');

const auth = require('../utilities/authValidation');

const router = express.Router();
const userHandler = require('../controllers/user.controller');

// login handler
router.post('/login', async (req, res) => {
  userHandler.loginHandler(req, res);
});

// Create user
router.post('/', auth, async (req, res) => {
  userHandler.createUserHandler(req, res);
});

// // Get user list
// router.get('/', auth, async (req, res) => {
//   userHandler.getUserListHandler(req, res);
// });

// Get user
router.get('/:userId', auth, async (req, res) => {
  userHandler.getUserHandler(req, res);
});

// Update user
router.patch('/:userId', auth, async (req, res) => {
  userHandler.updateUserHandler(req, res);
});

// Delete user
router.delete('/:userId', auth, async (req, res) => {
  userHandler.deleteUserHandler(req, res);
});

// payment to student
router.post('/:userId/payment', auth, async (req, res) => {
  userHandler.paymentHandler(req, res);
});

module.exports = router;
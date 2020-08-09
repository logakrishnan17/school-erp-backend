const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const { Users } = require('../models/user.model');
const { Payment } = require('../models/payment-history.model');
const { Student } = require('../models/student.model');

const responseFormat = require('../utilities/response');

const allowedUserTypes = ['ADMIN'];

 
const loginHandler = async(req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  Users.findUser({email})
    .then((user) => {
      if (!user) {
        return res.status(400).send(responseFormat.errorMessage('Invalid login credentials!...'));
      }
        
      const userDetails = JSON.parse(JSON.stringify(user));
      
      bcrypt.compare(password, userDetails.password)
      .then((result) => {
        if (result) {

          // Create a Session entry
          Users.saveSession(userDetails._id, userDetails.type)
          .then( async (result) => {

            delete userDetails.password;

            return res.status(200).send(responseFormat.successMessage(
              'User logged in successfully',
              userDetails,
              result.user_token
            ));
          }).catch(() => {
            return res.status(400).send(responseFormat.errorMessage('Error in creating user session!...'));
          });
        } else {
          return res.status(400).send(responseFormat.errorMessage('Invalid Username / email / password!...'));
        }
      })
      .catch((err) => {
        return res.status(400).send(responseFormat.errorMessage(err.message));
      });
    })
    .catch((err) => {
      return res.status(400).send(responseFormat.errorMessage(err.message));
    });
};

const getUserListHandler = async(req, res) => {
  let accessToken = req.headers['authorization'];

  try {

    if(!allowedUserTypes.includes(req.auth.data.type)) {
      return res.status(400).send(responseFormat.errorMessage('unauthorized access!...'));
    }

    Users.findUserList()
    .then(async usersDetails => {

      return res.status(200).send(responseFormat.successMessage(
        'Users list is retrieved successfully',
        usersDetails,
        accessToken
      ));
    })
    .catch((e) => {
      return res.status(400).send(responseFormat.errorMessage(e.message));
    });
  } catch (e) {
    res.status(400).send(responseFormat.errorMessage(e.message));
  }
};

const getUserHandler = async(req, res) => {
  let accessToken = req.headers['authorization'];
  const userId = req.params.userId;

  try {

    if(!allowedUserTypes.includes(req.auth.data.type)) {
      return res.status(400).send(responseFormat.errorMessage('unauthorized access!...'));
    }

    Users.findUser({_id: mongoose.Types.ObjectId(userId)})
    .then(async userDetails => {

      if(!userDetails) {
        return res.status(400).send(responseFormat.errorMessage('User not found!...'));
      }

      return res.status(200).send(responseFormat.successMessage(
        'User is retrieved successfully',
        userDetails,
        accessToken
      ));
    })
    .catch((e) => {
      return res.status(400).send(responseFormat.errorMessage(e.message));
    });
  } catch (e) {
    res.status(400).send(responseFormat.errorMessage(e.message));
  }
};

const createUserHandler = async(req, res) => {
  let accessToken = req.headers['authorization'];

  try {

    if(!allowedUserTypes.includes(req.auth.data.type)) {
      return res.status(400).send(responseFormat.errorMessage('unauthorized access!...'));
    }

    req.body.password = await bcrypt.hash(process.env.DEFAULT_PASSWORD, parseInt(process.env.SALT_KEY)).catch((e) => {
      return res.status(400).send(responseFormat.errorMessage(e.message));
    });

    Users.addUser(req.body)
    .then(async userDetails => {

      return res.status(200).send(responseFormat.successMessage(
        'User is added successfully',
        userDetails,
        accessToken
      ));
    })
    .catch((e) => {
      return res.status(400).send(responseFormat.errorMessage(e.message));
    });
  } catch (e) {
    res.status(400).send(responseFormat.errorMessage(e.message));
  }
};

const updateUserHandler = async(req, res) => {
  let accessToken = req.headers['authorization'];
  const userId = req.params.userId;

  try {

    if(!allowedUserTypes.includes(req.auth.data.type)) {
      return res.status(400).send(responseFormat.errorMessage('unauthorized access!...'));
    }

    Users.updateUser(userId, req.body)
    .then(async userDetails => {

      if(!userDetails) {
        return res.status(400).send(responseFormat.errorMessage('User not found!...'));
      }

      return res.status(200).send(responseFormat.successMessage(
        'User is updated successfully',
        userDetails,
        accessToken
      ));
    })
    .catch((e) => {
      return res.status(400).send(responseFormat.errorMessage(e.message));
    });
  } catch (e) {
    res.status(400).send(responseFormat.errorMessage(e.message));
  }
};

const deleteUserHandler = async(req, res) => {
  let accessToken = req.headers['authorization'];
  const userId = req.params.userId;

  try {

    if(!allowedUserTypes.includes(req.auth.data.type)) {
      return res.status(400).send(responseFormat.errorMessage('unauthorized access!...'));
    }

    Users.deleteUser(userId)
    .then(async userDetails => {

      if(!userDetails) {
        return res.status(400).send(responseFormat.errorMessage('User not found!...'));
      }

      return res.status(200).send(responseFormat.successMessage(
        'User is deleted successfully',
        userDetails,
        accessToken
      ));
    })
    .catch((e) => {
      return res.status(400).send(responseFormat.errorMessage(e.message));
    });
  } catch (e) {
    res.status(400).send(responseFormat.errorMessage(e.message));
  }
};

const paymentHandler = async(req, res) => {
  let accessToken = req.headers['authorization'];
  const studentId = req.body.studentId;

  try {

    if(!allowedUserTypes.includes(req.auth.data.type)) {
      return res.status(400).send(responseFormat.errorMessage('unauthorized access!...'));
    }

    Payment.addPayment({
      paidBy: req.auth.data.id,
      studentId
    })
    .then(async paymentDetails => {

      if(!paymentDetails) {
        return res.status(400).send(responseFormat.errorMessage('User not found!...'));
      }

      Student.updateStudent(studentId, {isPaidFee: true}).then((paid) => {
        return res.status(200).send(responseFormat.successMessage(
          'Fee is paid successfully',
          {},
          accessToken
        ));
      });
    })
    .catch((e) => {
      return res.status(400).send(responseFormat.errorMessage(e.message));
    });
  } catch (e) {
    res.status(400).send(responseFormat.errorMessage(e.message));
  }
};
module.exports = {
  loginHandler,
  getUserListHandler,
  getUserHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
  paymentHandler
};

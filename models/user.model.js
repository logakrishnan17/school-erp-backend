const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
require('mongoose-type-email');

const jwt = require('jsonwebtoken');

const usersSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.ObjectId, auto: true },
  name: { type: String, minLength: 2, maxLength: 64, required: true },
  email: { type: mongoose.Schema.Types.Email, required: true },
  mobile: { type: String, minLength: 2, maxLength: 64 },
  type: { type: String, default:'PARENT', minLength: 2, maxLength: 64, required: true },
  password: { type: String, minLength: 2, maxLength: 64, required: true }
}, { capped: false, timestamps: true, versionKey: false });

usersSchema.plugin(idValidator);

usersSchema.index({ email: 1 }, { unique: true });
usersSchema.index({ mobile: 1 }, { sparse: true, unique: true });


//find all parent users
usersSchema.statics.findUserList = function findUserList () {

  return new Promise((resolve, reject) => {
    this.find({type: 'PARENT'})
      .then((response) => {
        return resolve(response);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

//find a user
usersSchema.statics.findUser = function findUser (query) {

  return new Promise((resolve, reject) => {
    this.findOne(query)
      .then((response) => {
        return resolve(response);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

//create a user
usersSchema.statics.addUser = function addUser (usersData) {
  return new Promise((resolve, reject) => {
    usersData = new Users(usersData);
    this.create(usersData)
      .then((response) => {
        return resolve(response);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

// A function to save the Session entry to the collection
usersSchema.statics.saveSession = function saveSession (userId, userType) {
  const that = this;
  return new Promise((resolve, reject) => {
    that.setSessionToken(userId, userType)
      .then((result) => {
        const userSession = ({
          user_id: userId,
          user_token: result,
          is_expired: false,
          created_at: new Date().toISOString()
        });
        return resolve(userSession);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

//store session to JWT
usersSchema.statics.setSessionToken = function setSessionToken (userId, userType) {
  const currentDate = new Date();
  const nextDate = new Date().setDate(currentDate.getDate() + 1);
  return new Promise((resolve, reject) => {
    var payload = {
      type: userType,
      userId: userId,
      request: {
        signed_on: currentDate.toISOString(),
        status: 'Active',
        expiry: new Date(nextDate).toISOString()
      }
    };

    // session sign in
    jwt.sign(payload, process.env.AUTH_TOKEN, { expiresIn: '1d' }, function (err, token) {
      if (err) {
        return reject(err.name, err.message);
      } else {
        return resolve(token);
      }
    });
  });
};

//to update a user
usersSchema.statics.updateUser = function updateUser (userId, usersData) {
  return new Promise((resolve, reject) => {
    this.findOneAndUpdate(
      {_id: mongoose.Types.ObjectId(userId)},
      {$set: usersData},
      { new: true } //will return updated record
    ).exec().then((response) => {
      return resolve(response);
    })
    .catch((err) => {
      return reject(err);
    });
  });
};

// to delete a user
usersSchema.statics.deleteUser = function deleteUser (userId) {
  return new Promise((resolve, reject) => {
    this.findOneAndRemove(
      { _id: mongoose.Types.ObjectId(userId) }
    ).then((response) => {
      return resolve(response);
    })
    .catch((err) => {
      return reject(err);
    });
  });
};

const Users = mongoose.model('Users', usersSchema, 'users');

module.exports = { Users };
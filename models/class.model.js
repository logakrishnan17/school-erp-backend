const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.ObjectId, auto: true },
  name: { type: String, minLength: 2, maxLength: 64, required: true },
  section: { type: String, minLength: 2, maxLength: 64, required: true }
}, { capped: false, timestamps: true, versionKey: false });

classSchema.index({ name: 1, section: 1 }, { unique: true });

//find a class
classSchema.statics.findClass = function findClass (classId) {
  return new Promise((resolve, reject) => {
    this.findOne({_id: mongoose.Types.ObjectId(classId)})
      .then((response) => {
        return resolve(response);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

//create a class
classSchema.statics.addClass = function addClass (classData) {
  return new Promise((resolve, reject) => {
    classData = new Class(classData);
    this.create(classData)
      .then((response) => {
        return resolve(response);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

//to update a class
classSchema.statics.updateClass = function updateClass (classId, classData) {
  return new Promise((resolve, reject) => {
    this.findOneAndUpdate(
      {_id: mongoose.Types.ObjectId(classId)},
      {$set: classData},
      { new: true } //will return updated record
    ).exec().then((response) => {
      return resolve(response);
    })
    .catch((err) => {
      return reject(err);
    });
  });
};

// to delete a class
classSchema.statics.deleteClass = function deleteClass (classId) {
  return new Promise((resolve, reject) => {
    this.findOneAndRemove(
      { _id: mongoose.Types.ObjectId(classId) }
    ).then((response) => {
      return resolve(response);
    })
    .catch((err) => {
      return reject(err);
    });
  });
};

//find all classes
classSchema.statics.findClassList = function findClassList () {
  return new Promise((resolve, reject) => {
    this.find({})
      .then((response) => {
        return resolve(response);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

const Class = mongoose.model('Class', classSchema, 'class');

module.exports = { Class };
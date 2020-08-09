const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const studentSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.ObjectId, auto: true },
  parentId: { type: mongoose.Schema.ObjectId, ref: 'Users' },
  classId: { type: mongoose.Schema.ObjectId, required: true, ref: 'Class' },
  name: { type: String, minLength: 2, maxLength: 64, required: true },
  DOB: { type: String, minLength: 2, maxLength: 64, required: true },
  year: { type: String, minLength: 2, maxLength: 64, required: true },
  fee: { type: String,  default:'5000', minLength: 2, maxLength: 64, required: true },
  isPaidFee: { type: Boolean,  default:false, required: true }
}, { capped: false, timestamps: true, versionKey: false });

studentSchema.plugin(idValidator);

studentSchema.index({ parentId: 1 }, { sparse: true, unique: true });

//find a student
studentSchema.statics.findStudent = function findStudent (query) {
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

//create a student
studentSchema.statics.addStudent = function addStudent (studentData) {
  return new Promise((resolve, reject) => {
    studentData = new Student(studentData);
    this.create(studentData)
      .then((response) => {
        return resolve(response);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

//to update a student
studentSchema.statics.updateStudent = function updateStudent (studentId, studentData) {
  return new Promise((resolve, reject) => {
    this.findOneAndUpdate(
      {_id: mongoose.Types.ObjectId(studentId)},
      {$set: studentData},
      { new: true } //will return updated record
    ).exec().then((response) => {
      return resolve(response);
    })
    .catch((err) => {
      return reject(err);
    });
  });
};

// to delete a student
studentSchema.statics.deleteStudent = function deleteStudent (studentId) {
  return new Promise((resolve, reject) => {
    this.findOneAndRemove(
      { _id: mongoose.Types.ObjectId(studentId) }
    ).then((response) => {
      return resolve(response);
    })
    .catch((err) => {
      return reject(err);
    });
  });
};

//find all students
studentSchema.statics.findStudentList = function findStudentList () {
  return new Promise((resolve, reject) => {

    this.aggregate([
      {
        '$match': {}
      }, {
        '$lookup': {
          'from': 'class',
          'localField': 'classId',
          'foreignField': '_id',
          'as': 'classDetails'
        }
      }, {
        '$unwind': {
          'path': '$classDetails',
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$lookup': {
          'from': 'users',
          'localField': 'parentId',
          'foreignField': '_id',
          'as': 'parentDetails'
        }
      }, {
        '$unwind': {
          'path': '$parentDetails',
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$project': {
          _id: 1.0,
          parentId: 1.0,
          classId: 1.0,
          name: 1.0,
          DOB: 1.0,
          year: 1.0,
          fee: 1.0,
          isPaidFee: 1.0,
          classDetails: 1.0,
          parentDetails: 1.0
        }
      }
    ]).allowDiskUse(true).exec(function (err, studentDetails) {
      if (err) reject(err);
      resolve(studentDetails);
    });
  });
};

const Student = mongoose.model('Student', studentSchema, 'student');

module.exports = { Student };
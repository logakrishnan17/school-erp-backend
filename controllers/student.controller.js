const { Student } = require('../models/student.model');
const responseFormat = require('../utilities/response');

const allowedUserTypes = ['ADMIN'];

const getStudentListHandler = async(req, res) => {
  let accessToken = req.headers['authorization'];

  try {

    if(!allowedUserTypes.includes(req.auth.data.type)) {
      return res.status(400).send(responseFormat.errorMessage('unauthorized access!...'));
    }

    Student.findStudentList()
    .then(async studentDetails => {

      return res.status(200).send(responseFormat.successMessage(
        'Student list is retrieved successfully',
        studentDetails,
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

const getStudentHandler = async(req, res) => {
  let accessToken = req.headers['authorization'];
  const studentId = req.params.studentId;

  try {

    if(!allowedUserTypes.includes(req.auth.data.type)) {
      return res.status(400).send(responseFormat.errorMessage('unauthorized access!...'));
    }

    Student.findStudent({_id: studentId})
    .then(async studentDetails => {

      if(!studentDetails) {
        return res.status(400).send(responseFormat.errorMessage('Student is not found!...'));
      }

      return res.status(200).send(responseFormat.successMessage(
        'Student is retrieved successfully',
        studentDetails,
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

const createStudentHandler = async(req, res) => {
  let accessToken = req.headers['authorization'];

  try {

    if(!allowedUserTypes.includes(req.auth.data.type)) {
      return res.status(400).send(responseFormat.errorMessage('unauthorized access!...'));
    }

    Student.addStudent(req.body)
    .then(async studentDetails => {

      return res.status(200).send(responseFormat.successMessage(
        'Student is added successfully',
        studentDetails,
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

const updateStudentHandler = async(req, res) => {
  let accessToken = req.headers['authorization'];
  const studentId = req.params.studentId;

  try {

    if(!allowedUserTypes.includes(req.auth.data.type)) {
      return res.status(400).send(responseFormat.errorMessage('unauthorized access!...'));
    }

    Student.updateStudent(studentId, req.body)
    .then(async studentDetails => {

      if(!studentDetails) {
        return res.status(400).send(responseFormat.errorMessage('Student is not found!...'));
      }

      return res.status(200).send(responseFormat.successMessage(
        'Student is updated successfully',
        studentDetails,
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

const deleteStudentHandler = async(req, res) => {
  let accessToken = req.headers['authorization'];
  const studentId = req.params.studentId;

  try {

    if(!allowedUserTypes.includes(req.auth.data.type)) {
      return res.status(400).send(responseFormat.errorMessage('unauthorized access!...'));
    }

    Student.deleteStudent(studentId)
    .then(async studentDetails => {

      if(!studentDetails) {
        return res.status(400).send(responseFormat.errorMessage('Student is not found!...'));
      }

      return res.status(200).send(responseFormat.successMessage(
        'Student is deleted successfully',
        studentDetails,
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

module.exports = {
  getStudentListHandler,
  getStudentHandler,
  createStudentHandler,
  updateStudentHandler,
  deleteStudentHandler
};

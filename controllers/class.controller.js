const { Class } = require('../models/class.model');
const responseFormat = require('../utilities/response');

const allowedUserTypes = ['ADMIN'];

const getClassListHandler = async(req, res) => {
  let accessToken = req.headers['authorization'];

  try {

    if(!allowedUserTypes.includes(req.auth.data.type)) {
      return res.status(400).send(responseFormat.errorMessage('unauthorized access!...'));
    }

    Class.findClassList()
    .then(async classDetails => {

      return res.status(200).send(responseFormat.successMessage(
        'Class list is retrieved successfully',
        classDetails,
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

const getClassHandler = async(req, res) => {
  let accessToken = req.headers['authorization'];
  const classId = req.params.classId;

  try {

    if(!allowedUserTypes.includes(req.auth.data.type)) {
      return res.status(400).send(responseFormat.errorMessage('unauthorized access!...'));
    }

    Class.findClass(classId)
    .then(async classDetails => {

      if(!classDetails) {
        return res.status(400).send(responseFormat.errorMessage('Class not found!...'));
      }

      return res.status(200).send(responseFormat.successMessage(
        'Class is retrieved successfully',
        classDetails,
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

const createClassHandler = async(req, res) => {
  let accessToken = req.headers['authorization'];

  try {

    if(!allowedUserTypes.includes(req.auth.data.type)) {
      return res.status(400).send(responseFormat.errorMessage('unauthorized access!...'));
    }

    Class.addClass(req.body)
    .then(async classDetails => {

      return res.status(200).send(responseFormat.successMessage(
        'Class is added successfully',
        classDetails,
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

const updateClassHandler = async(req, res) => {
  let accessToken = req.headers['authorization'];
  const classId = req.params.classId;

  try {

    if(!allowedUserTypes.includes(req.auth.data.type)) {
      return res.status(400).send(responseFormat.errorMessage('unauthorized access!...'));
    }

    Class.updateClass(classId, req.body)
    .then(async classDetails => {

      if(!classDetails) {
        return res.status(400).send(responseFormat.errorMessage('Class not found!...'));
      }

      return res.status(200).send(responseFormat.successMessage(
        'Class is updated successfully',
        classDetails,
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

const deleteClassHandler = async(req, res) => {
  let accessToken = req.headers['authorization'];
  const classId = req.params.classId;

  try {

    if(!allowedUserTypes.includes(req.auth.data.type)) {
      return res.status(400).send(responseFormat.errorMessage('unauthorized access!...'));
    }

    Class.deleteClass(classId)
    .then(async classDetails => {

      if(!classDetails) {
        return res.status(400).send(responseFormat.errorMessage('Class not found!...'));
      }

      return res.status(200).send(responseFormat.successMessage(
        'Class is deleted successfully',
        classDetails,
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
  getClassListHandler,
  getClassHandler,
  createClassHandler,
  updateClassHandler,
  deleteClassHandler
};

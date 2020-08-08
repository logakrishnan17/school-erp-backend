const jwt = require('jsonwebtoken');
const responseFormat = require('../utilities/response');

module.exports = async (req, res, next) => {

  try {

    const token = req.headers.authorization;

    if (!token) return res.status(400).send(responseFormat.errorMessage('provide valid token!...'));

    const decoded = jwt.verify(token, process.env.AUTH_TOKEN);

    if(decoded) {
      req.auth ={};
      req.auth.data ={};
      req.auth.data.type = decoded.type;
      req.auth.data.id = decoded.userId;
    }

    if (decoded && new Date() >= new Date(decoded.request.expiry)) {
      return res.status(400).send(responseFormat.errorMessage('Invalid token. Please login'));
    } else {
      return next();
    }
  } catch (ex) {
    return res.status(400).send(responseFormat.errorMessage('Invalid token. Please login'));
  }

};

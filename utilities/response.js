function errorMessage (msg, code = 400, sessionToken = null) {
  let outputData = {
    status: {}
  };
  outputData.token = sessionToken;
  outputData.data = {};
  outputData.status.code = code;
  outputData.status.status = 'Error';
  outputData.status.message = msg;
  return outputData;
}

function successMessage (
  msg,
  data = {},
  sessionToken = null,
  statusCode = 200
) {
  let outputData = {
    status: {}
  };
  outputData.token = sessionToken;
  outputData.data = data;
  outputData.status.code = statusCode;
  outputData.status.status = 'Success';
  outputData.status.message = msg;

  return outputData;
}

module.exports = { errorMessage, successMessage };
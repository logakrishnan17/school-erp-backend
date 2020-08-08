const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const responseFormat = require('./utilities/response');

app.use(bodyParser.json());
app.use(cors());
require('dotenv').config();
require('./db/mongoose');

//routes
app.use('/user', require('./routes/user.routes'));
app.use('/class', require('./routes/class.routes'));
app.use('/student', require('./routes/student.routes'));

// catch 404 and forward to error handler
app.use(function (req, res) {
  return res.status(404).send(responseFormat.errorMessage('Route not found!...'));
});

const server = http.listen(process.env.PORT || 3000, () => {
	// eslint-disable-next-line no-console
	console.log('server is running on port', server.address().port);
});

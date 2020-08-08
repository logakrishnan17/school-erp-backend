const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

if (process.env.DB_URI) {
  // eslint-disable-next-line no-console
  console.log('Connecting to DB...');
  mongoose.connect(process.env.DB_URI, {
    'keepAlive': true,
    'keepAliveInitialDelay': 300000,
    'socketTimeoutMS': 2000000,
    'useNewUrlParser': true,
    'useUnifiedTopology': true,
    'useCreateIndex': true
  }).then(() => {
    // eslint-disable-next-line no-console
    console.log('DB Connected...');
  }).catch((e) => {
    // eslint-disable-next-line no-console
    console.log(`mongoose connection error: ${e}`);
  });
} else {
  // eslint-disable-next-line no-console
  console.log('mongoose connection error: Host / PORT / DB Name empty');
}

module.exports.mongoose = mongoose;

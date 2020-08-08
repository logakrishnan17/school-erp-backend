const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const paymentSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.ObjectId, auto: true },
  paidBy: { type: mongoose.Schema.ObjectId, required: true, ref: 'Users' },
  studentId: { type: mongoose.Schema.ObjectId, required: true, ref: 'Student' },
}, { capped: false, timestamps: true, versionKey: false });

paymentSchema.plugin(idValidator);

//create a payment
paymentSchema.statics.addPayment = function addPayment (paymentData) {
  return new Promise((resolve, reject) => {
    paymentData = new Payment(paymentData);
    this.create(paymentData)
      .then((response) => {
        return resolve(response);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};


//find all payments
paymentSchema.statics.findPaymentList = function findPaymentList () {
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

const Payment = mongoose.model('Payment', paymentSchema, 'payment');

module.exports = { Payment };
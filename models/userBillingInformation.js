const { Schema } = require('mongoose');

const paymentOptionSchema = new Schema({
    cardName: {
        type: String
    },
    cardNumber: {
        type: Number
    },
    expiryDate: {
        type: String
    }
})

module.exports = new Schema({
    adresses: [String],
    paymentOptions: [paymentOptionSchema]
});
const { Schema, model } = require('mongoose');
const contactInformationSchema = require('./userContact');
const billingInformationSchema = require('./userBillingInformation');

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        minLength: 6,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contactInformation: {
        type: contactInformationSchema,
        default: {}
    },
    billingInformation: {
        type: billingInformationSchema,
        default: {
            adresses: [],
            paymentOptions: []
        }
    },
    metaInfo: {
        isActivated: {
            type: Boolean,
            default: true
        }
    }
});

module.exports = model('user', UserSchema);
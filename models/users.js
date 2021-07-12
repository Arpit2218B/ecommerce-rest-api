const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
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

UserSchema.pre('save', function (next) {
    let user = this;
    const SALT_WORK_FACTOR = 10;
    if (!user.isModified('password'))
        return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err)
                return next(err);
            user.password = hash;
            next();
        });
    });
});

module.exports = model('user', UserSchema);
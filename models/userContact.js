const { Schema } = require('mongoose');

module.exports = new Schema({
    email: {
        type: String
    },
    phone: {
        type: Number
    }
});
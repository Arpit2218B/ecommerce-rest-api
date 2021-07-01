const User = require('../models/users');

const users = {
    getUserList: (req, res, next) => {
        User
        .find()
        .then(data => {
            res
            .status(200)
            .json(data)
        })
        .catch(err => {
            next(`Internal server error. ${err}`);
        });
    },

    getUser: (req, res, next) => {
        User
        .findById(req.params.id)
        .then(data => {
            res
            .status(200)
            .json(data)
        })
        .catch(err => {
            next(`Internal server error. ${err}`);
        });
    },

    createUser: (req, res, next) => {
        const body = req.body;
        const user = new User(body);
        // const user = new User({
        //     userName: 'gal',
        //     name: 'Arpit Rathi',
        //     password: 'hashedPassword',
        //     contactInformation: {
        //         phone: 9881040011,
        //         email: 'arpit@gmail.com'
        //     },
        //     billingInformation: {
        //         adresses: [
        //             'Street 1',
        //             'Street 2'
        //         ],
        //         paymentOptions: [{
        //             cardName: 'Arpit Rathi',
        //             cardNumber: 4242424242424242,
        //             expiryDate: '02/26'
        //         }]
        //     }
        // });
        user
        .save()
        .then(data => {
            res
            .status(201)
            .json({
                message: 'User created successfully',
                _id: data._id
            });
        })
        .catch(err => {
            next(err);
        });
    }
}

module.exports = users;
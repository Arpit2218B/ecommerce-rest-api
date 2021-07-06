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
    },

    updateContactInfo: async (req, res, next) => {
        try {
            const userId = req.params.id;
            if (!req.body.email || !req.body.phone) {
                const err = new Error('Bad request body');
                err.statusCode = 400;
                return next(err);
            }
            const result = await User.findOneAndUpdate(
                { _id: userId },
                { contactInformation: req.body, "metaInfo.isActivated": true },
                { new: true }
            );
            if (!result) {
                const err = new Error();
                err.message = 'Cannot update contact info';
                err.statusCode = 404;
                return next(err);
            }
            res
                .status(201)
                .json({
                    message: 'User updated',
                    body: result
                });
        }
        catch (err) {
            next(err);
        }
    },

    updateBillingInfo: async (req, res, next) => {
        try {
            const userId = req.params.id;
            if (!req.body.adresses || !req.body.paymentOptions) {
                const err = new Error('Bad request body');
                err.statusCode = 400;
                return next(err);
            }
            const result = await User.findOneAndUpdate(
                { _id: userId, "metaInfo.isActivated": true },
                { billingInformation: req.body },
                { new: true }
            );
            if (!result) {
                const err = new Error();
                err.message = 'Cannot update billing information';
                err.statusCode = 404;
                return next(err);
            }
            res
                .status(201)
                .json({
                    message: 'User updated',
                    body: result
                });
        }
        catch (err) {
            next(err);
        }
    },

    deactivateUser: async (req, res, next) => {
        try {
            const userId = req.params.id;
            const result = await User.findOneAndUpdate(
                { _id: userId },
                { "metaInfo.isActivated": false }
            );
            if (!result) {
                const err = new Error();
                err.message = 'Cannot deactivate user';
                err.statusCode = 404;
                return next(err);
            }
            res
                .status(201)
                .json({
                    message: 'User deactivated'
                });
        }
        catch (err) {
            next(err);
        }
    }
}

module.exports = users;
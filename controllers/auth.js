const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/users');

const auth = {
    login: async (req, res, next) => {
        try {
            const { userName, password } = req.body;
            // 1. check if user is present
            const isUserPresent = await User.findOne({userName: userName, "metaInfo.isActivated": true});
            if(!isUserPresent) {
                const err = new Error('Invalid credentials');
                err.statusCode = 403;
                return next(err);
            }
            // 2. match password hash in request to password from db
            bcrypt.compare(password, isUserPresent.password, function (err, response) {
                if (err || !response) {
                    const err = new Error('Invalid credentials');
                    err.statusCode = 403;
                    return next(err);
                }
                // 3. generate jsonwebtoken
                let payload = {
                    username: userName
                }
                let token = jwt.sign(payload, 'some_secret', {
                    expiresIn: 20
                });
                // 4. send back the response
                res
                .status(200)
                .json({
                    message: 'Login successful',
                    jwt: token
                });
            });
        }
        catch(err) {
            next(err);
        }
    },

    verifyToken: (req, res, next) => {
        const header = req.headers['authorization'];
        const token = header && header.split(' ')[1];
        if(token == null) {
            const err = new Error('Invalid user');
            err.statusCode = 401;
            throw err;
        }
        jwt.verify(token, 'some_secret', (err, user) => {
            if(err) {
                const error = new Error(err);
                error.statusCode = 403;
                throw error;
            }
            req.loggedInUser = user;
            next();
        });
    }
    
}

module.exports = auth;
const jwt = require('jsonwebtoken');

const auth = {
    login: (req, res, next) => {
        try {
            // const { userName, password } = req.body;
            // 1. check if user is present
            // 2. match password hash in request to password from db
            // 3. generate jsonwebtoken
            let payload = {
                username: 'galjonit2218'
            }
            let token = jwt.sign(payload, 'some_secret');
            // 4. send back the response
            res
            .status(200)
            .json({
                message: 'Log in successful',
                jwt: token
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
            // add a check for expired tokens
            if(err) {
                const err = new Error('Invalid user');
                err.statusCode = 403;
                throw err;
            }
            req.loggedInUser = user;
            next();
        });
    }
    
}

module.exports = auth;
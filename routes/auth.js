const Router = require('express').Router();
const { 
    login,
} = require('../controllers/auth');

Router.post('/login', login);

module.exports = Router;
const Router = require('express').Router();
const { 
    getProductsList,
} = require('../controllers/products');

Router.get('/', getProductsList);

module.exports = Router;
const router = require('express').Router();

const {
    getUser,
    getUserList,
    createUser
} = require('../controllers/users');

router.get('/', getUserList);

router.get('/:id', getUser);

router.post('/', createUser);

module.exports = router;
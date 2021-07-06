const router = require('express').Router();

const {
    getUser,
    getUserList,
    createUser,
    updateContactInfo,
    updateBillingInfo,
    deactivateUser
} = require('../controllers/users');

router.get('/', getUserList);

router.get('/:id', getUser);

router.post('/', createUser);

router.put('/:id/contactInfo', updateContactInfo);

router.put('/:id/billingInfo', updateBillingInfo);

router.put('/:id/deactivate', deactivateUser);

module.exports = router;
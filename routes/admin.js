const express = require('express');
const router = express.Router();
const {
    userData,
    userDetail
} = require('../controllers/admin');




router.get('/', userData);
router.get('/users/:id', userDetail)


module.exports = router;
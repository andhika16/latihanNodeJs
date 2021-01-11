const express = require('express');
const router = express.Router();
const {userData,userDetail} = require('../controllers/admin');
const {ensureAuthenticated} = require('../config/auth');




router.get('/', ensureAuthenticated, userData);
router.get('/users/:id', ensureAuthenticated, userDetail)


module.exports = router;
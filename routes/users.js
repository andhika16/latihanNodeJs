const router = require('express').Router();
const {
    login,
    register,
    login_post,
    register_post,
    logout
} = require('../controllers/users');
const {
    forwardAuthenticated,
    authRole
} = require('../config/auth');
router.get('/logout', logout)
router.get('/login', forwardAuthenticated, login)
router.get('/register', forwardAuthenticated, register)
router.post('/login', forwardAuthenticated, login_post)
router.post('/register', forwardAuthenticated, register_post)

module.exports = router;
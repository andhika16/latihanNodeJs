const router = require('express').Router();
const {
    login,
    register,
    login_post,
    register_post,
    logout,
    users_delete
} = require('../controllers/users');
const {
    forwardAuthenticated
} = require('../config/auth');
router.get('/logout', logout)
router.delete('/:id', users_delete)
router.get('/login', forwardAuthenticated, login)
router.get('/register', forwardAuthenticated, register)
router.post('/login', forwardAuthenticated, login_post)
router.post('/register', forwardAuthenticated, register_post)

module.exports = router;